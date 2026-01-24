import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingSpinner = ({ size = 'md', text = 'Loading...' }) => {
    const sizeClasses = {
        sm: 'h-5 w-5',
        md: 'h-10 w-10',
        lg: 'h-14 w-14',
    };

    return (
        <div className="flex flex-col items-center justify-center py-20">
            {/* Animated rings */}
            <div className="relative">
                <div className="absolute inset-0 rounded-full border-4 border-orange-100 animate-ping opacity-25"
                    style={{ width: '60px', height: '60px', top: '-10px', left: '-10px' }} />
                <div className="relative bg-gradient-to-br from-orange-500 to-amber-500 p-4 rounded-2xl shadow-elevated">
                    <Loader2 className={`${sizeClasses[size]} text-white animate-spin`} />
                </div>
            </div>
            {text && (
                <div className="mt-6 text-center">
                    <p className="text-base font-medium text-gray-700">{text}</p>
                    <p className="text-sm text-gray-400 mt-1">Please wait a moment</p>
                </div>
            )}
            {/* Loading dots */}
            <div className="flex gap-1.5 mt-4">
                <span className="h-2 w-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="h-2 w-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="h-2 w-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
        </div>
    );
};

export default LoadingSpinner;
