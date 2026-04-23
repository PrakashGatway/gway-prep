"use client";

import React, { useEffect, useState } from "react";
import type { loginFormData, loginResponse } from "@/app/type/auth";
import { useRouter } from "next/navigation";
import { ShieldIcon } from "lucide-react";
import { loginAdmin, logoutAdmin } from "@/app/services/api";

function validate(
  data: loginFormData
): Partial<Record<keyof loginFormData, string>> {
  const errors: Partial<Record<keyof loginFormData, string>> = {};

  if (!data.email) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!data.password) {
    errors.password = "Password is required.";
  } else if (data.password.length < 8) {
    errors.password = "Password must be at least 8 characters.";
  }

  return errors;
}

const AdminLoginPage = () => {
  const router = useRouter();

  const [form, setForm] = useState<loginFormData>({
    email: "",
    password: "",
    remember: false,
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof loginFormData, string>>
  >({});
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // ✅ Logout on page load
  useEffect(() => {
    const handleLogout = async () => {
      try {
        await logoutAdmin();
        document.cookie = "adminToken=; path=/; max-age=0";
        document.cookie = "role=; path=/; max-age=0";
      } catch (err) {
        console.error("Logout error", err);
      }
    };

    handleLogout();
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name as keyof loginFormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setServerError("");

    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);

    try {
      const data: loginResponse = await loginAdmin(form);

      // if (!data.ok) {
      //   setServerError(data.error || "Login failed. Please try again.");
      //   return;
      // }

      // ✅ Store token
      if (data.adminToken) {
        document.cookie = `adminToken=${data.adminToken}; path=/; max-age=${
          form.remember ? 604800 : 0
        }; SameSite=Lax`;
      }

      if (data.user) {
        document.cookie = `role=${data.user.role}; path=/; SameSite=Lax`;
      }

      router.push("/admin/pages/home");
    } catch (error) {
      console.error(error);
      setServerError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4">
      
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-6 sm:p-8">
        
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-orange-600 flex items-center justify-center mx-auto mb-3 shadow">
            <ShieldIcon className="text-white" size={20} />
          </div>

          <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
            Admin Portal
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Authorized access only
          </p>
        </div>

        {/* Error */}
        {serverError && (
          <div className="mb-4 rounded-lg bg-red-50 border border-red-200 px-4 py-2 text-sm text-red-600">
            {serverError}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          
          {/* Email */}
          <div>
            <label className="text-sm text-gray-600 mb-1 block">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              disabled={isLoading}
              placeholder="admin@example.com"
              className={`w-full h-10 px-3 rounded-lg border text-sm outline-none transition
              ${
                errors.email
                  ? "border-red-400 focus:ring-2 focus:ring-red-100"
                  : "border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
              }`}
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-gray-600 mb-1 block">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              disabled={isLoading}
              placeholder="••••••••"
              className={`w-full h-10 px-3 rounded-lg border text-sm outline-none transition
              ${
                errors.password
                  ? "border-red-400 focus:ring-2 focus:ring-red-100"
                  : "border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
              }`}
            />
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">
                {errors.password}
              </p>
            )}
          </div>

          {/* Options */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer text-gray-600">
              <input
                type="checkbox"
                name="remember"
                checked={form.remember}
                onChange={handleChange}
                disabled={isLoading}
                className="accent-orange-600"
              />
              Remember me
            </label>

            <a
              href="/admin/forgot-password"
              className="text-orange-600 hover:underline"
            >
              Forgot?
            </a>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-10 rounded-lg bg-orange-600 text-white text-sm font-medium
            hover:bg-orange-700 active:scale-[0.98] transition disabled:opacity-60"
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;