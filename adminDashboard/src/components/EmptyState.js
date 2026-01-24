import React from 'react';
import { Package, Search, CheckCircle2, Inbox } from 'lucide-react';

const EmptyState = ({
    title = 'No orders found',
    description = 'Orders will appear here when they are placed.',
    icon = 'default'
}) => {
    const iconComponents = {
        default: Package,
        search: Search,
        success: CheckCircle2,
        inbox: Inbox,
    };

    const iconColors = {
        default: 'from-gray-400 to-gray-500',
        search: 'from-blue-400 to-blue-500',
        success: 'from-emerald-400 to-emerald-500',
        inbox: 'from-purple-400 to-purple-500',
    };

    const bgColors = {
        default: 'from-gray-100 to-gray-50',
        search: 'from-blue-100 to-blue-50',
        success: 'from-emerald-100 to-emerald-50',
        inbox: 'from-purple-100 to-purple-50',
    };

    const IconComponent = iconComponents[icon] || Package;

    return (
        <div className="flex flex-col items-center justify-center py-20 text-center">
            {/* Decorative background */}
            <div className="relative">
                <div className={`absolute inset-0 bg-gradient-to-br ${bgColors[icon]} rounded-full blur-2xl opacity-60`}
                    style={{ width: '140px', height: '140px', top: '-30px', left: '-30px' }} />
                <div className={`relative bg-gradient-to-br ${bgColors[icon]} p-6 rounded-3xl mb-6 shadow-soft`}>
                    <div className={`bg-gradient-to-br ${iconColors[icon]} p-4 rounded-2xl shadow-md`}>
                        <IconComponent className="h-10 w-10 text-white" />
                    </div>
                </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
            <p className="text-sm text-gray-500 max-w-sm leading-relaxed">{description}</p>

            {/* Decorative dots */}
            <div className="flex gap-1.5 mt-6">
                <span className="h-1.5 w-1.5 bg-gray-300 rounded-full" />
                <span className="h-1.5 w-6 bg-gray-300 rounded-full" />
                <span className="h-1.5 w-1.5 bg-gray-300 rounded-full" />
            </div>
        </div>
    );
};

export default EmptyState;
