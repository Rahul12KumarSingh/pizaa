import { useState, useEffect, useCallback, useRef } from 'react';
import { fetchProgressOrders, markOrderAsDelivered, ORDER_STATUS } from '../services/orderService';

const POLLING_INTERVAL = 60000; // 1 minute

/**
 * Custom hook for managing progress orders with polling
 */
export const useProgressOrders = ({ enablePolling = true } = {}) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [lastUpdated, setLastUpdated] = useState(null);
    const pollingRef = useRef(null);

    const loadOrders = useCallback(async (showLoading = false) => {
        try {
            if (showLoading) setLoading(true);
            setError(null);

            const { orders: fetchedOrders } = await fetchProgressOrders();

            // Filter today's processing orders only
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const todaysOrders = fetchedOrders.filter((order) => {
                const orderDate = new Date(order.placedAt || order.createdAt);
                orderDate.setHours(0, 0, 0, 0);
                return orderDate.getTime() === today.getTime() && order.status === ORDER_STATUS.PROCESSING;
            });

            // Sort by creation time (newest first)
            todaysOrders.sort((a, b) => new Date(b.placedAt || b.createdAt) - new Date(a.placedAt || a.createdAt));

            setOrders(todaysOrders);
            setLastUpdated(new Date());
        } catch (err) {
            setError(err.response?.data?.message || err.message || 'Failed to fetch orders');
        } finally {
            setLoading(false);
        }
    }, []);

    const markDelivered = useCallback(async (orderId) => {
        try {
            await markOrderAsDelivered(orderId);
            setOrders((prev) => prev.filter((order) => order.orderId !== orderId));
            return { success: true };
        } catch (err) {
            return { success: false, error: err.response?.data?.message || err.message };
        }
    }, []);

    const refresh = useCallback(() => loadOrders(true), [loadOrders]);

    // Initial load
    useEffect(() => {
        loadOrders(true);
    }, [loadOrders]);

    // Polling
    useEffect(() => {
        if (enablePolling) {
            pollingRef.current = setInterval(() => loadOrders(false), POLLING_INTERVAL);
        }
        return () => {
            if (pollingRef.current) clearInterval(pollingRef.current);
        };
    }, [enablePolling, loadOrders]);

    return { orders, loading, error, lastUpdated, markDelivered, refresh };
};

export default useProgressOrders;
