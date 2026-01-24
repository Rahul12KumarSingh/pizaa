import React, { useState } from 'react';
import { Pizza, Bell, Settings, User, LogOut, ChevronDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const BRAND_NAME = 'Santorini Flavours';

const Header = () => {
    const { user, logout } = useAuth();
    const [showDropdown, setShowDropdown] = useState(false);

    const handleLogout = () => {
        setShowDropdown(false);
        logout();
    };

    return (
        <header className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 sticky top-0 z-50 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo & Brand */}
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <div className="bg-gradient-to-br from-primary-500 to-primary-600 p-2.5 rounded-xl shadow-lg">
                                <Pizza className="h-6 w-6 text-white" />
                            </div>
                            <span className="absolute -top-1 -right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-slate-900 animate-pulse" />
                        </div>
                        <div>
                            <h1 className="text-lg font-bold text-white tracking-tight">{BRAND_NAME}</h1>
                            {/* <p className="text-xs text-slate-400 font-medium">Admin Console</p> */}
                        </div>
                    </div>

                    {/* Right Side */}
                    <div className="flex items-center gap-2">
                        {/* Date Badge */}
                        <div className="hidden sm:flex items-center gap-2 bg-slate-800/50 backdrop-blur px-4 py-2 rounded-lg border border-slate-700/50">
                            <span className="text-sm text-slate-300 font-medium">
                                {new Date().toLocaleDateString('en-IN', {
                                    weekday: 'short',
                                    day: 'numeric',
                                    month: 'short',
                                    year: 'numeric',
                                })}
                            </span>
                        </div>

                        {/* Notification Bell */}
                        <button className="relative p-2.5 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-all">
                            <Bell className="h-5 w-5" />
                            <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-primary-500 rounded-full" />
                        </button>

                        {/* Settings */}
                        <button className="p-2.5 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-all">
                            <Settings className="h-5 w-5" />
                        </button>

                        {/* User Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setShowDropdown(!showDropdown)}
                                className="flex items-center gap-2 p-1.5 hover:bg-slate-700/50 rounded-lg transition-all"
                            >
                                <div className="h-8 w-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                                    <User className="h-4 w-4 text-white" />
                                </div>
                                <div className="hidden sm:block text-left">
                                    <p className="text-sm font-medium text-white">{user?.name || 'Admin'}</p>
                                    <p className="text-xs text-slate-400">{user?.role || 'Administrator'}</p>
                                </div>
                                <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
                            </button>

                            {/* Dropdown Menu */}
                            {showDropdown && (
                                <>
                                    {/* Backdrop */}
                                    <div
                                        className="fixed inset-0 z-10"
                                        onClick={() => setShowDropdown(false)}
                                    />
                                    {/* Menu */}
                                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-20 animate-fade-in">
                                        <div className="px-4 py-3 border-b border-gray-100">
                                            <p className="text-sm font-semibold text-gray-900">{user?.name || 'Admin'}</p>
                                            <p className="text-xs text-gray-500">{user?.username || 'admin'}</p>
                                        </div>
                                        <div className="py-1">
                                            <button
                                                onClick={handleLogout}
                                                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition"
                                            >
                                                <LogOut className="h-4 w-4" />
                                                Sign out
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
