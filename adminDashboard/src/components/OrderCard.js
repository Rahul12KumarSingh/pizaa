import React, { useState } from 'react';
import { format } from 'date-fns';
import { Phone, Clock, CheckCircle, ChevronDown, ChevronUp, User, ShoppingBag, Receipt, Copy } from 'lucide-react';
import StatusBadge from './StatusBadge';

const OrderCard = ({ order, onMarkDelivered, showDeliverButton = true }) => {
    const [expanded, setExpanded] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [copied, setCopied] = useState(false);

    const orderTime = order.placedAt || order.createdAt;
    const formattedTime = orderTime ? format(new Date(orderTime), 'hh:mm a') : 'N/A';
    const formattedDate = orderTime ? format(new Date(orderTime), 'dd MMM yyyy') : 'N/A';

    const handleMarkDelivered = async () => {
        if (!onMarkDelivered) return;
        setIsUpdating(true);
        const result = await onMarkDelivered(order.orderId);
        if (!result.success) {
            alert(result.error || 'Failed to update order');
        }
        setIsUpdating(false);
    };

    const copyOrderId = () => {
        navigator.clipboard.writeText(order.orderId);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const isDelivered = order.status === 'DELIVERED';
    const canDeliver = showDeliverButton && !isDelivered && onMarkDelivered;

    return (
        <div className={`bg-white rounded-2xl border overflow-hidden transition-all duration-300 hover:shadow-elevated animate-slide-up ${isDelivered ? 'border-green-200 bg-gradient-to-br from-white to-green-50/30' : 'border-slate-200 shadow-card hover:border-slate-300'
            }`}>
            {/* Status Bar */}
            <div className={`h-1 ${isDelivered ? 'bg-gradient-to-r from-green-400 to-emerald-500' : 'bg-gradient-to-r from-amber-400 to-orange-500'}`} />

            {/* Header */}
            <div className="p-4">
                <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                            <button
                                onClick={copyOrderId}
                                className="group flex items-center gap-1.5 font-mono font-semibold text-slate-800 text-sm bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded-lg transition-colors"
                            >
                                #{order.orderId}
                                <Copy className={`h-3 w-3 transition-colors ${copied ? 'text-green-500' : 'text-slate-400 group-hover:text-slate-600'}`} />
                            </button>
                            <StatusBadge status={order.status} />
                        </div>
                        <div className="flex items-center gap-3 mt-2.5 text-xs text-slate-500">
                            <span className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-md">
                                <Clock className="h-3.5 w-3.5 text-slate-400" />
                                {formattedTime}
                            </span>
                            <span className="text-slate-300">•</span>
                            <span>{formattedDate}</span>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                            ₹{order.totalAmount?.toFixed(0) || '0'}
                        </p>
                        <p className="text-[10px] uppercase tracking-wider text-slate-400 font-medium mt-0.5">Total</p>
                    </div>
                </div>
            </div>

            {/* Customer Info */}
            <div className="mx-4 mb-3 p-3 bg-gradient-to-r from-slate-50 to-slate-100/50 rounded-xl border border-slate-100">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-sm">
                            <User className="h-5 w-5 text-white" />
                        </div>
                        <div>
                            <p className="font-semibold text-slate-800 text-sm">{order.customerName}</p>
                            <a href={`tel:${order.customerMobileNumber}`} className="text-xs text-primary-600 hover:text-primary-700 flex items-center gap-1 font-medium">
                                <Phone className="h-3 w-3" />
                                {order.customerMobileNumber}
                            </a>
                        </div>
                    </div>
                    <button
                        onClick={() => setExpanded(!expanded)}
                        className="h-8 w-8 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-white rounded-lg transition-all"
                    >
                        {expanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                    </button>
                </div>
            </div>

            {/* Items Summary */}
            <div className="px-4 pb-3">
                <div className="flex items-start gap-2">
                    <ShoppingBag className="h-4 w-4 text-slate-400 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-slate-600 leading-relaxed">
                        <span className="font-semibold text-slate-700">{order.items?.length || 0} item(s)</span>
                        <span className="text-slate-400 mx-1">—</span>
                        <span className="text-slate-500">
                            {order.items?.map((item) => `${item.title}${item.size ? ` (${item.size})` : ''}`).join(', ')}
                        </span>
                    </p>
                </div>
            </div>

            {/* Expanded Details */}
            {expanded && (
                <div className="px-4 pb-4 pt-2 border-t border-slate-100 animate-fade-in">
                    <div className="flex items-center gap-2 mb-3">
                        <Receipt className="h-4 w-4 text-slate-400" />
                        <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Order Details</h4>
                    </div>
                    <div className="space-y-2">
                        {order.items?.map((item, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between text-sm bg-gradient-to-r from-slate-50 to-white rounded-xl px-4 py-3 border border-slate-100"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="h-8 w-8 bg-slate-200 rounded-lg flex items-center justify-center text-xs font-bold text-slate-600">
                                        {item.quantity}x
                                    </span>
                                    <div>
                                        <span className="font-medium text-slate-800">{item.title}</span>
                                        {item.size && (
                                            <span className="ml-2 text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">{item.size}</span>
                                        )}
                                    </div>
                                </div>
                                <span className="font-semibold text-slate-700">
                                    ₹{(item.price * item.quantity).toFixed(0)}
                                </span>
                            </div>
                        ))}
                    </div>
                    {order.receiptNumber && (
                        <p className="mt-4 text-xs text-slate-400 flex items-center gap-1">
                            <Receipt className="h-3 w-3" />
                            Receipt: <span className="font-mono">{order.receiptNumber}</span>
                        </p>
                    )}
                </div>
            )}

            {/* Action Button */}
            {canDeliver && (
                <div className="p-4 pt-2">
                    <button
                        onClick={handleMarkDelivered}
                        disabled={isUpdating}
                        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-xl font-semibold text-sm shadow-lg shadow-green-500/25 hover:shadow-green-500/40 hover:from-green-600 hover:to-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
                    >
                        {isUpdating ? (
                            <>
                                <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                                Processing...
                            </>
                        ) : (
                            <>
                                <CheckCircle className="h-5 w-5" />
                                Mark as Completed
                            </>
                        )}
                    </button>
                </div>
            )}
        </div>
    );
};

export default OrderCard;
