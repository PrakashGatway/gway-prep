
"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import axiosInstance from "@/services/axiosInstance";
import { useRouter } from "next/navigation";

const GlobalContext = createContext(null);

export function GlobalProvider({ children }) {
  const [user, setUser] = useState(null);
  const [drawer, setDrawer] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [authToken, setAuthToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const router = useRouter();

  // Load the saved token before requesting the user profile.
  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      axiosInstance.defaults.headers.common.Authorization =
        `Bearer ${token}`;
      setAuthToken(token);
    }

    setLoading(false);
  }, []);

  const userInfo = useCallback(async () => {
    try {
      setError(null);

      const token = localStorage.getItem("accessToken");

      if (token) {
        axiosInstance.defaults.headers.common.Authorization =
          `Bearer ${token}`;
      }

      const response = await axiosInstance.get("auth/me", {
        withCredentials: true,
      });

      setUser(response.data?.data ?? null);
      return response.data?.data ?? null;
    } catch (err) {
      console.error(
        "Failed to fetch user information:",
        err.response?.data || err.message
      );

      setUser(null);
      setError(err.response?.data?.message || "Unable to fetch user");
      return null;
    } finally {
      setAuthChecked(true);
    }
  }, []);

  // Fetch the user after the initial token check.
  useEffect(() => {
    if (!loading) {
      userInfo();
    }
  }, [loading, authToken, userInfo]);

  const logout = async () => {
    try {
      await axiosInstance.get("auth/logout", {
        withCredentials: true,
      });
    } catch (err) {
      console.error(
        "Logout request failed:",
        err.response?.data || err.message
      );
    } finally {
      localStorage.removeItem("accessToken");
      delete axiosInstance.defaults.headers.common.Authorization;

      setAuthToken(null);
      setUser(null);
      setAuthChecked(true);

      router.push("/auth");
    }
  };

  const UserNavigate = () => {
    if (user) {
      router.push("https://dashboard.ooshasprep.com/");
    } else {
      router.push("/auth");
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        user,
        setUser,
        userInfo,
        logout,
        loading,
        error,
        drawer,
        setDrawer,
        authChecked,
        authToken,
        UserNavigate,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobal() {
  const context = useContext(GlobalContext);

  if (!context) {
    throw new Error("useGlobal must be used within GlobalProvider");
  }

  return context;
}
