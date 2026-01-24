import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://z1dmaj0sqa.execute-api.ap-south-1.amazonaws.com/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor
api.interceptors.request.use(
    (config) => {
        // Add any auth headers here if needed
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
    (response) => response,
    (error) => {
        const message = error.response?.data?.message || error.message || 'An error occurred';
        console.error('API Error:', message);
        return Promise.reject(error);
    }
);

export default api;
