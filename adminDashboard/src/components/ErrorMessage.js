import React from 'react';
import { AlertTriangle, RefreshCw, XCircle } from 'lucide-react';

const ErrorMessage = ({ message, onRetry }) => {
    return (
        <div className="bg-gradient-to-br from-red-50 to-rose-50 border border-red-200 rounded-2xl p-6 shadow-card">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                    <div className="bg-gradient-to-br from-red-500 to-rose-500 p-3 rounded-xl shadow-md">
                        <AlertTriangle className="h-6 w-6 text-white" />
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <h3 className="text-lg font-semibold text-red-800">Something went wrong</h3>
                            <XCircle className="h-4 w-4 text-red-400" />
                        </div>
                        <p className="text-sm text-red-600 mt-1 max-w-md">{message}</p>
                        <p className="text-xs text-red-400 mt-2">Please try again or contact support if the problem persists.</p>
                    </div>
                </div>
                {onRetry && (
                    <button
                        onClick={onRetry}
                        className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-xl text-sm font-medium hover:from-red-500 hover:to-rose-500 transition-all shadow-md whitespace-nowrap"
                    >
                        <RefreshCw className="h-4 w-4" />
                        Try Again
                    </button>
                )}
            </div>
        </div>
    );
};

export default ErrorMessage;
