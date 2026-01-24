import { useState, useCallback } from 'react';
import { fetchOrdersByDate, ORDER_STATUS } from '../services/orderService';
import { format } from 'date-fns';

/**
 * Custom hook for fetching order history by date
 */
export const useOrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));
    const [statusFilter, setStatusFilter] = useState('all'); // 'all', 'completed', 'processing'

    const loadOrdersByDate = useCallback(async (date) => {
        try {
            setLoading(true);
            setError(null);
            setSelectedDate(date);

            const fetchedOrders = await fetchOrdersByDate(date);
            fetchedOrders.sort((a, b) => new Date(b.placedAt || b.createdAt) - new Date(a.placedAt || a.createdAt));
            setOrders(fetchedOrders);
        } catch (err) {
            setError(err.response?.data?.message || err.message || 'Failed to fetch orders');
            setOrders([]);
        } finally {
            setLoading(false);
        }
    }, []);

    const filteredOrders = orders.filter((order) => {
        if (statusFilter === 'all') return true;
        if (statusFilter === 'completed') return order.status === ORDER_STATUS.DELIVERED;
        if (statusFilter === 'processing') return order.status === ORDER_STATUS.PROCESSING;
        return true;
    });

    const refresh = useCallback(() => {
        if (selectedDate) loadOrdersByDate(selectedDate);
    }, [selectedDate, loadOrdersByDate]);

    return {
        orders: filteredOrders,
        allOrders: orders,
        loading,
        error,
        selectedDate,
        statusFilter,
        setStatusFilter,
        loadOrdersByDate,
        refresh,
    };
};

export default useOrderHistory;
