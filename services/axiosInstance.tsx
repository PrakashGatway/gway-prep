import axios from "axios";
import { cookies } from "next/headers";

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


export async function getServerInstance() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  const instance = axios.create({
    baseURL: serverInstance.defaults.baseURL,
    timeout: serverInstance.defaults.timeout,
    headers: {
      "Content-Type": "application/json",
      ...(token && {
        Authorization: `Bearer ${token}`,
      }),
    },
    withCredentials: true,
  });

  return instance;
}



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
