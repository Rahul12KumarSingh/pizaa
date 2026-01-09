import axios from "axios";

const api = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL || "https://pizaa-fcfd.onrender.com/api",
    timeout: 10000,
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        const message = error?.response?.data?.message || error.message || "Request failed";
        return Promise.reject(new Error(message));
    }
);

export default api;
