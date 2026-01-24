import React from 'react';
import { getStatusInfo } from '../services/orderService';
import { Clock, CheckCircle2 } from 'lucide-react';

const StatusBadge = ({ status }) => {
    const { label, color, bgColor } = getStatusInfo(status);
    const isProcessing = status === 'PROCESSING';
    const isDelivered = status === 'DELIVERED';

    return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${bgColor} ${color} border ${isDelivered ? 'border-green-200' : 'border-amber-200'
            }`}>
            {isProcessing && <Clock className="h-3 w-3 animate-pulse" />}
            {isDelivered && <CheckCircle2 className="h-3 w-3" />}
            {label}
        </span>
    );
};

export default StatusBadge;
