import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

// Admin credentials from environment variables
const ADMIN_CREDENTIALS = {
    username: process.env.REACT_APP_ADMIN_USERNAME || 'admin',
    password: process.env.REACT_APP_ADMIN_PASSWORD || 'santorini@2024',
};

const AUTH_STORAGE_KEY = 'santorini_admin_auth';

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);

    // Check for existing session on mount
    useEffect(() => {
        const storedAuth = localStorage.getItem(AUTH_STORAGE_KEY);
        if (storedAuth) {
            try {
                const authData = JSON.parse(storedAuth);
                // Check if session is still valid (24 hours)
                if (authData.expiresAt && new Date(authData.expiresAt) > new Date()) {
                    setIsAuthenticated(true);
                    setUser(authData.user);
                } else {
                    // Session expired, clear it
                    localStorage.removeItem(AUTH_STORAGE_KEY);
                }
            } catch (error) {
                localStorage.removeItem(AUTH_STORAGE_KEY);
            }
        }
        setIsLoading(false);
    }, []);

    const login = (username, password) => {
        return new Promise((resolve, reject) => {
            // Simulate API call delay
            setTimeout(() => {
                if (
                    username === ADMIN_CREDENTIALS.username &&
                    password === ADMIN_CREDENTIALS.password
                ) {
                    const userData = {
                        username,
                        name: 'Admin',
                        role: 'administrator',
                    };

                    // Set expiry to 24 hours from now
                    const expiresAt = new Date();
                    expiresAt.setHours(expiresAt.getHours() + 24);

                    const authData = {
                        user: userData,
                        expiresAt: expiresAt.toISOString(),
                    };

                    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authData));
                    setUser(userData);
                    setIsAuthenticated(true);
                    resolve(userData);
                } else {
                    reject(new Error('Invalid username or password'));
                }
            }, 800);
        });
    };

    const logout = () => {
        localStorage.removeItem(AUTH_STORAGE_KEY);
        setUser(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                isLoading,
                user,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export default AuthContext;
