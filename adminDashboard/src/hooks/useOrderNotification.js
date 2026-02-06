import { useEffect, useRef, useCallback } from 'react';

/**
 * Hook that tracks new order arrivals, plays a notification sound,
 * and provides the current unacknowledged new order count.
 *
 * @param {Array} orders - Current list of orders
 * @returns {{ newOrderCount: number, acknowledgeAll: () => void }}
 */
const useOrderNotification = (orders) => {
    const prevOrderIdsRef = useRef(new Set());
    const newOrderIdsRef = useRef(new Set());
    const isFirstLoadRef = useRef(true);
    const audioRef = useRef(null);

    // Lazy-init the audio element
    const getAudio = useCallback(() => {
        if (!audioRef.current) {
            // Use a pleasant notification tone via Web Audio API
            audioRef.current = createNotificationSound();
        }
        return audioRef.current;
    }, []);

    useEffect(() => {
        if (!orders || orders.length === 0) {
            if (isFirstLoadRef.current) {
                isFirstLoadRef.current = false;
            }
            return;
        }

        const currentIds = new Set(orders.map((o) => o._id || o.orderId));

        // Skip sound on first load — just set baseline
        if (isFirstLoadRef.current) {
            prevOrderIdsRef.current = currentIds;
            isFirstLoadRef.current = false;
            return;
        }

        // Detect new orders (IDs in current but not in previous)
        let hasNew = false;
        currentIds.forEach((id) => {
            if (!prevOrderIdsRef.current.has(id)) {
                newOrderIdsRef.current.add(id);
                hasNew = true;
            }
        });

        // Clean up acknowledged IDs that are no longer present
        const toRemove = [];
        newOrderIdsRef.current.forEach((id) => {
            if (!currentIds.has(id)) toRemove.push(id);
        });
        toRemove.forEach((id) => newOrderIdsRef.current.delete(id));

        // Play sound if new orders detected
        if (hasNew) {
            playNotificationSound(getAudio);
        }

        prevOrderIdsRef.current = currentIds;
    }, [orders, getAudio]);

    const acknowledgeAll = useCallback(() => {
        newOrderIdsRef.current = new Set();
    }, []);

    return {
        newOrderCount: newOrderIdsRef.current.size,
        acknowledgeAll,
    };
};

/**
 * Create a notification sound using Web Audio API (no external file needed)
 */
function createNotificationSound() {
    return {
        play: () => {
            try {
                const AudioCtx = window.AudioContext || window.webkitAudioContext;
                if (!AudioCtx) return;

                const ctx = new AudioCtx();

                // Play two ascending tones for a pleasant "ding-ding"
                const playTone = (frequency, startTime, duration) => {
                    const oscillator = ctx.createOscillator();
                    const gainNode = ctx.createGain();

                    oscillator.connect(gainNode);
                    gainNode.connect(ctx.destination);

                    oscillator.type = 'sine';
                    oscillator.frequency.setValueAtTime(frequency, ctx.currentTime + startTime);

                    gainNode.gain.setValueAtTime(0.3, ctx.currentTime + startTime);
                    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + startTime + duration);

                    oscillator.start(ctx.currentTime + startTime);
                    oscillator.stop(ctx.currentTime + startTime + duration);
                };

                // First tone
                playTone(880, 0, 0.15);     // A5
                // Second tone (higher)
                playTone(1175, 0.18, 0.2);  // D6
                // Third tone (even higher — uplifting)
                playTone(1320, 0.4, 0.3);   // E6

                // Close context after sounds finish
                setTimeout(() => ctx.close(), 1500);
            } catch (e) {
                console.warn('Could not play notification sound:', e);
            }
        },
    };
}

function playNotificationSound(getAudio) {
    try {
        const audio = getAudio();
        audio.play();
    } catch (e) {
        console.warn('Notification sound failed:', e);
    }
}

export default useOrderNotification;
