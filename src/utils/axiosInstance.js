import axios from "axios";
import { BASE_URL } from "./apiPaths";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("token");
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`; // Fixed interpolation
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            if (error.response.status === 401) {
                console.error("Unauthorized. Redirecting to login.");
                window.location.href = "/login";
            } else if (error.response.status === 500) {
                console.error("Server error. Please try again later.");
                alert("A server error occurred. Please try again later.");
            }
        } else if (error.code === "ECONNABORTED") {
            console.error("Request timeout.");
            alert("The request timed out. Please check your connection.");
        } else {
            console.error("Unexpected error:", error);
            alert("An unexpected error occurred. Please try again later.");
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;