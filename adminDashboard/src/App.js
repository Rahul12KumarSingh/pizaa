import React, { useState } from 'react';
import { ClipboardList, History, TrendingUp, Loader2 } from 'lucide-react';
import { useAuth } from './context/AuthContext';
import Header from './components/Header';
import ProgressOrdersTab from './pages/ProgressOrdersTab';
import OrderHistoryTab from './pages/OrderHistoryTab';
import SettingsPage from './pages/SettingsPage';
import LoginPage from './pages/LoginPage';
import useProgressOrders from './hooks/useProgressOrders';
import useOrderNotification from './hooks/useOrderNotification';

const TABS = [
    { id: 'progress', label: 'Live Orders', icon: ClipboardList, badge: true },
    { id: 'history', label: 'Order History', icon: History, badge: false },
];

// Loading screen component
const LoadingScreen = () => (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="text-center">
            <Loader2 className="h-10 w-10 text-orange-500 animate-spin mx-auto" />
            <p className="mt-4 text-gray-500">Loading...</p>
        </div>
    </div>
);

const App = () => {
    const { isAuthenticated, isLoading } = useAuth();
    const [activeTab, setActiveTab] = useState('progress');
    const [showSettings, setShowSettings] = useState(false);

    // Track orders for notification sound & badge
    const { orders: liveOrders } = useProgressOrders({ enablePolling: true });
    const { newOrderCount, acknowledgeAll } = useOrderNotification(liveOrders);

    // Show loading screen while checking auth status
    if (isLoading) {
        return <LoadingScreen />;
    }

    // Show login page if not authenticated
    if (!isAuthenticated) {
        return <LoginPage />;
    }

    // Show settings page
    if (showSettings) {
        return (
            <div className="min-h-screen bg-slate-100 flex flex-col">
                <Header onSettingsClick={() => setShowSettings(false)} newOrderCount={newOrderCount} onBellClick={acknowledgeAll} />
                <SettingsPage onBack={() => setShowSettings(false)} />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-100 flex flex-col">
            <Header onSettingsClick={() => setShowSettings(true)} newOrderCount={newOrderCount} onBellClick={acknowledgeAll} />

            {/* Sub Header with Stats & Tabs */}
            <div className="bg-white border-b border-slate-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Tab Navigation */}
                    <nav className="flex gap-1 pt-2" aria-label="Tabs">
                        {TABS.map((tab) => {
                            const Icon = tab.icon;
                            const isActive = activeTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`relative flex items-center gap-2 py-3 px-4 font-medium text-sm rounded-t-lg transition-all ${isActive
                                        ? 'bg-slate-100 text-primary-600 border-t-2 border-x border-primary-500 border-slate-200 -mb-px'
                                        : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                                        }`}
                                >
                                    <Icon className={`h-4 w-4 ${isActive ? 'text-primary-500' : ''}`} />
                                    {tab.label}
                                    {tab.badge && isActive && (
                                        <span className="ml-1 flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-primary-400 opacity-75" />
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500" />
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                    </nav>
                </div>
            </div>

            {/* Main Content */}
            <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="animate-fade-in">
                    {activeTab === 'progress' && <ProgressOrdersTab />}
                    {activeTab === 'history' && <OrderHistoryTab />}
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 py-6 mt-auto">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="bg-gradient-to-br from-orange-500 to-amber-500 p-2 rounded-lg">
                                <TrendingUp className="h-4 w-4 text-white" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-white">
                                    Santorini Flavours
                                </p>
                                <p className="text-xs text-slate-400">
                                    Admin Dashboard
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-6">
                            <p className="text-xs text-slate-400">
                                © {new Date().getFullYear()} All rights reserved.
                            </p>
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-700/50 rounded-full">
                                <span className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
                                <span className="text-xs text-slate-300 font-medium">v1.0.0</span>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default App;
