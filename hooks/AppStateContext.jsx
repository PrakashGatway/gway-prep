"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import axiosInstance from '@/services/axiosInstance';

const GlobalContext = createContext();

export function GlobalProvider({ children }) {
    const [user, setUser] = useState(null);
    const [drawer, setDrawer] = useState(false)
    const [authToken, setAuthToken] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    console.log(drawer)


    useEffect(() => {
        setLoading(true); // Start loading
        const timer = setTimeout(() => {
            setLoading(false);
        }, 500);
        return () => clearTimeout(timer);
    }, []);

    const userInfo = async () => {
        try {
            const response = await axiosInstance.get("auth/me", {
                withCredentials: true
            });
            setUser(response.data?.data)
        } catch (error) {

        }
    };

    const logout = async () => {
        try {
            const response = await axiosInstance.get("auth/logout");
            setUser(null)
            localStorage.removeItem("accessToken")
        } catch (error) {
            console.error("Error fetching user info:", error);
        }
    };

    useEffect(() => {
        userInfo()
    }, [authToken])

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        setAuthToken(token);
        if (token) {
            axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        }
    }, [])

    return (
        <GlobalContext.Provider
            value={{
                user,
                userInfo,
                logout,
                loading,
                error, drawer, setDrawer
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
}

export function useGlobal() {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error('useGlobal must be used within a GlobalProvider');
    }
    return context;
}