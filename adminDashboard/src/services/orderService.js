import api from './api';

/**
 * Order Status Constants (simplified)
 */
export const ORDER_STATUS = {
    PROCESSING: 'PROCESSING',
    DELIVERED: 'DELIVERED',
};

export const PROGRESS_STATUSES = [ORDER_STATUS.PROCESSING];

/**
 * Fetch progress orders (orders in progress status)
 */
export const fetchProgressOrders = async (params = {}) => {
    const response = await api.get('/orders/progress', { params });
    return {
        orders: response.data?.data || [],
        meta: response.data?.meta || {},
    };
};

/**
 * Mark an order as delivered
 */
export const markOrderAsDelivered = async (orderId) => {
    const response = await api.patch(`/orders/${orderId}/deliver`);
    return response.data?.data;
};

/**
 * Fetch orders by date
 */
export const fetchOrdersByDate = async (date) => {
    const response = await api.get('/orders/date', { params: { date } });
    return response.data?.data || [];
};

/**
 * Get status display info
 */
export const getStatusInfo = (status) => {
    const statusMap = {
        [ORDER_STATUS.PROCESSING]: {
            label: 'Processing',
            color: 'text-amber-700',
            bgColor: 'bg-amber-100',
        },
        [ORDER_STATUS.DELIVERED]: {
            label: 'Delivered',
            color: 'text-green-700',
            bgColor: 'bg-green-100',
        },
    };

    return statusMap[status] || {
        label: status,
        color: 'text-gray-700',
        bgColor: 'bg-gray-100',
    };
};