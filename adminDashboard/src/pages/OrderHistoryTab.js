import React, { useEffect, useCallback } from 'react';
import { RefreshCw, Calendar, Filter, History, CheckCircle2, Clock, IndianRupee, TrendingUp, BarChart3 } from 'lucide-react';
import useOrderHistory from '../hooks/useOrderHistory';
import { ORDER_STATUS } from '../services/orderService';
import OrderCard from '../components/OrderCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import EmptyState from '../components/EmptyState';

const OrderHistoryTab = () => {
    const {
        orders,
        allOrders,
        loading,
        error,
        selectedDate,
        statusFilter,
        setStatusFilter,
        loadOrdersByDate,
        refresh,
    } = useOrderHistory();

    const loadInitialOrders = useCallback(() => {
        loadOrdersByDate(selectedDate);
    }, [loadOrdersByDate, selectedDate]);

    useEffect(() => {
        loadInitialOrders();
    }, [loadInitialOrders]);

    const handleDateChange = (e) => loadOrdersByDate(e.target.value);

    const completedCount = allOrders.filter((o) => o.status === ORDER_STATUS.DELIVERED).length;
    const processingCount = allOrders.filter((o) => o.status === ORDER_STATUS.PROCESSING).length;
    const totalRevenue = allOrders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
    const avgOrderValue = allOrders.length > 0 ? totalRevenue / allOrders.length : 0;

    return (
        <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Total Orders */}
                <div className="bg-white rounded-2xl p-5 shadow-card border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm font-medium">Total Orders</p>
                            <p className="text-3xl font-bold text-gray-900 mt-1">{allOrders.length}</p>
                        </div>
                        <div className="bg-gradient-to-br from-blue-100 to-blue-50 p-3 rounded-xl">
                            <BarChart3 className="h-6 w-6 text-blue-600" />
                        </div>
                    </div>
                    <div className="mt-3 flex items-center gap-2">
                        <span className="text-xs px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full font-medium">
                            {selectedDate}
                        </span>
                    </div>
                </div>

                {/* Completed */}
                <div className="bg-white rounded-2xl p-5 shadow-card border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm font-medium">Completed</p>
                            <p className="text-3xl font-bold text-emerald-600 mt-1">{completedCount}</p>
                        </div>
                        <div className="bg-gradient-to-br from-emerald-100 to-emerald-50 p-3 rounded-xl">
                            <CheckCircle2 className="h-6 w-6 text-emerald-600" />
                        </div>
                    </div>
                    <div className="mt-3">
                        <div className="w-full bg-gray-100 rounded-full h-1.5">
                            <div
                                className="bg-emerald-500 h-1.5 rounded-full transition-all duration-500"
                                style={{ width: allOrders.length > 0 ? `${(completedCount / allOrders.length) * 100}%` : '0%' }}
                            />
                        </div>
                    </div>
                </div>

                {/* Revenue */}
                <div className="bg-white rounded-2xl p-5 shadow-card border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm font-medium">Revenue</p>
                            <p className="text-3xl font-bold text-gray-900 mt-1">₹{totalRevenue.toFixed(0)}</p>
                        </div>
                        <div className="bg-gradient-to-br from-amber-100 to-amber-50 p-3 rounded-xl">
                            <IndianRupee className="h-6 w-6 text-amber-600" />
                        </div>
                    </div>
                    <div className="mt-3 flex items-center gap-1 text-xs text-gray-500">
                        <TrendingUp className="h-3 w-3 text-emerald-500" />
                        <span>For selected date</span>
                    </div>
                </div>

                {/* Avg Order Value */}
                <div className="bg-white rounded-2xl p-5 shadow-card border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm font-medium">Avg. Order Value</p>
                            <p className="text-3xl font-bold text-gray-900 mt-1">₹{avgOrderValue.toFixed(0)}</p>
                        </div>
                        <div className="bg-gradient-to-br from-purple-100 to-purple-50 p-3 rounded-xl">
                            <TrendingUp className="h-6 w-6 text-purple-600" />
                        </div>
                    </div>
                    <div className="mt-3 flex items-center gap-1 text-xs text-gray-500">
                        <span>Per order average</span>
                    </div>
                </div>
            </div>

            {/* Filters Card */}
            <div className="bg-white rounded-2xl shadow-card border border-gray-100 overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-slate-50 to-gray-50 px-6 py-4 border-b border-gray-100">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <div className="flex items-center gap-3">
                            <div className="bg-gradient-to-br from-slate-700 to-slate-800 p-2.5 rounded-xl">
                                <History className="h-5 w-5 text-white" />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-gray-900">Order History</h2>
                                <p className="text-sm text-gray-500">Browse and filter past orders</p>
                            </div>
                        </div>
                        <button
                            onClick={refresh}
                            disabled={loading}
                            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-slate-800 to-slate-700 text-white rounded-xl text-sm font-medium hover:from-slate-700 hover:to-slate-600 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                            Refresh
                        </button>
                    </div>
                </div>

                {/* Filters */}
                <div className="p-6">
                    <div className="flex flex-wrap items-center gap-6">
                        {/* Date Picker */}
                        <div className="flex items-center gap-3">
                            <div className="bg-blue-50 p-2 rounded-lg">
                                <Calendar className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                                <label htmlFor="date-picker" className="block text-xs font-medium text-gray-500 mb-1">
                                    Select Date
                                </label>
                                <input
                                    id="date-picker"
                                    type="date"
                                    value={selectedDate}
                                    onChange={handleDateChange}
                                    className="border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 hover:bg-white transition"
                                />
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="hidden sm:block w-px h-12 bg-gray-200" />

                        {/* Status Filter */}
                        <div className="flex items-center gap-3">
                            <div className="bg-purple-50 p-2 rounded-lg">
                                <Filter className="h-5 w-5 text-purple-600" />
                            </div>
                            <div>
                                <label htmlFor="status-filter" className="block text-xs font-medium text-gray-500 mb-1">
                                    Filter by Status
                                </label>
                                <select
                                    id="status-filter"
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    className="border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-gray-50 hover:bg-white transition min-w-[180px]"
                                >
                                    <option value="all">All Orders ({allOrders.length})</option>
                                    <option value="completed">✓ Completed ({completedCount})</option>
                                    <option value="processing">◐ Processing ({processingCount})</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Quick Stats Pills */}
                    <div className="flex flex-wrap gap-3 mt-5 pt-5 border-t border-gray-100">
                        <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-full">
                            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                            <span className="text-sm font-medium text-emerald-700">{completedCount} Completed</span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 rounded-full">
                            <Clock className="h-4 w-4 text-amber-600" />
                            <span className="text-sm font-medium text-amber-700">{processingCount} Processing</span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full">
                            <IndianRupee className="h-4 w-4 text-blue-600" />
                            <span className="text-sm font-medium text-blue-700">₹{totalRevenue.toFixed(2)} Total</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            {loading ? (
                <LoadingSpinner text="Loading orders..." />
            ) : error ? (
                <ErrorMessage message={error} onRetry={refresh} />
            ) : orders.length === 0 ? (
                <EmptyState
                    title="No orders found"
                    description={`No ${statusFilter !== 'all' ? statusFilter : ''} orders found for ${selectedDate}.`}
                    icon="search"
                />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                    {orders.map((order, index) => (
                        <div
                            key={order._id}
                            className="animate-fade-in"
                            style={{ animationDelay: `${index * 50}ms` }}
                        >
                            <OrderCard
                                order={order}
                                showDeliverButton={false}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OrderHistoryTab;
