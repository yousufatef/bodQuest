import axios from "axios";

const API_BASE_URL = "https://jsonplaceholder.typicode.com";

export const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
});

// Request interceptor
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("auth_token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Response interceptor
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("auth_token");
            localStorage.removeItem("auth_user");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);
