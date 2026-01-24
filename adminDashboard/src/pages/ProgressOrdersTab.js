import React from 'react';
import { RefreshCw, Clock, TrendingUp, ShoppingBag, DollarSign, Zap } from 'lucide-react';
import { format } from 'date-fns';
import useProgressOrders from '../hooks/useProgressOrders';
import OrderCard from '../components/OrderCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import EmptyState from '../components/EmptyState';

const ProgressOrdersTab = () => {
    const { orders, loading, error, lastUpdated, markDelivered, refresh } = useProgressOrders({
        enablePolling: true,
    });

    // Calculate stats
    const totalRevenue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
    const totalItems = orders.reduce((sum, o) => sum + (o.items?.length || 0), 0);

    return (
        <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Active Orders */}
                <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-5 text-white shadow-elevated">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-orange-100 text-sm font-medium">Active Orders</p>
                            <p className="text-3xl font-bold mt-1">{orders.length}</p>
                        </div>
                        <div className="bg-white/20 p-3 rounded-xl">
                            <ShoppingBag className="h-6 w-6" />
                        </div>
                    </div>
                    <div className="mt-3 flex items-center gap-1 text-orange-100 text-xs">
                        <TrendingUp className="h-3 w-3" />
                        <span>In progress</span>
                    </div>
                </div>

                {/* Total Revenue */}
                <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-5 text-white shadow-elevated">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-emerald-100 text-sm font-medium">Pending Revenue</p>
                            <p className="text-3xl font-bold mt-1">₹{totalRevenue.toFixed(0)}</p>
                        </div>
                        <div className="bg-white/20 p-3 rounded-xl">
                            <DollarSign className="h-6 w-6" />
                        </div>
                    </div>
                    <div className="mt-3 flex items-center gap-1 text-emerald-100 text-xs">
                        <TrendingUp className="h-3 w-3" />
                        <span>From active orders</span>
                    </div>
                </div>

                {/* Total Items */}
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-5 text-white shadow-elevated">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-blue-100 text-sm font-medium">Items to Prepare</p>
                            <p className="text-3xl font-bold mt-1">{totalItems}</p>
                        </div>
                        <div className="bg-white/20 p-3 rounded-xl">
                            <Zap className="h-6 w-6" />
                        </div>
                    </div>
                    <div className="mt-3 flex items-center gap-1 text-blue-100 text-xs">
                        <Clock className="h-3 w-3" />
                        <span>Pending preparation</span>
                    </div>
                </div>

                {/* Live Status */}
                <div className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl p-5 text-white shadow-elevated">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-slate-300 text-sm font-medium">System Status</p>
                            <p className="text-xl font-bold mt-1 flex items-center gap-2">
                                <span className="h-2.5 w-2.5 bg-green-400 rounded-full animate-pulse" />
                                Live
                            </p>
                        </div>
                        <div className="bg-white/10 p-3 rounded-xl">
                            <RefreshCw className="h-6 w-6" />
                        </div>
                    </div>
                    <div className="mt-3 flex items-center gap-1 text-slate-400 text-xs">
                        <Clock className="h-3 w-3" />
                        <span>Auto-refresh: 1 min</span>
                    </div>
                </div>
            </div>

            {/* Header with Actions */}
            <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-5">
                <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-4">
                        <div className="bg-gradient-to-br from-orange-100 to-amber-100 p-3 rounded-xl">
                            <ShoppingBag className="h-6 w-6 text-orange-600" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">Live Orders Queue</h2>
                            <p className="text-sm text-gray-500 mt-0.5">
                                {orders.length} order{orders.length !== 1 ? 's' : ''} waiting to be completed
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        {lastUpdated && (
                            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg">
                                <Clock className="h-4 w-4 text-gray-400" />
                                <span className="text-xs text-gray-500">
                                    Updated: {format(lastUpdated, 'hh:mm:ss a')}
                                </span>
                            </div>
                        )}
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
            </div>

            {/* Content */}
            {loading && orders.length === 0 ? (
                <LoadingSpinner text="Loading orders..." />
            ) : error ? (
                <ErrorMessage message={error} onRetry={refresh} />
            ) : orders.length === 0 ? (
                <EmptyState
                    title="No orders in progress"
                    description="All orders have been completed. New orders will appear here automatically."
                    icon="success"
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
                                onMarkDelivered={markDelivered}
                                showDeliverButton={true}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProgressOrdersTab;
