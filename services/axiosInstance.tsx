import axios from "axios";

let mode = "devvv"

export const serverInstance = axios.create({
    baseURL: mode == "dev" ? "http://localhost:5000/api/v1/" : "https://uat.gatewayabroadeducations.com/api/v1/",
    timeout: 60000, // 10 seconds timeout
    headers: {
        "Content-Type": "application/json",
        // "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5YmJhMGViZDlkZmJhMTQ3NWVjZWUyNSIsImlhdCI6MTc5MTQ1MTM4NiwiZXhwIjoxNzkyMDU2MTg2fQ.7_UizWXHEAVpDtrEOOVtEaXVtSyL8QJ2wLUP2G1pMdI"
    },
    withCredentials: true
});




export const baseUrl = mode == "dev" ? "http://localhost:5000" : "https://uat.gatewayabroadeducations.com";

const axiosInstance = axios.create({
    baseURL: mode == "dev" ? "http://localhost:5000/api/v1/" : "https://uat.gatewayabroadeducations.com/api/v1/",
    timeout: 60000, // 10 seconds timeout
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("accessToken") || null;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            if (error.response.status === 401) {
                localStorage.removeItem("accessToken");
                // window.location.href = "/auth";
            }
        }
        return Promise.reject(error);
    }
);

export const ImageBaseUrl = "https://uat.gatewayabroadeducations.com/uploads"


export default axiosInstance;
