"use client";

import React, { useEffect, useState } from "react";
import type { loginFormData, loginResponse } from "@/app/type/auth";
import { useRouter } from "next/navigation";
import { ShieldIcon } from "lucide-react";

function validate(
  data: loginFormData,
): Partial<Record<keyof loginFormData, string>> {
  const errors: Partial<Record<keyof loginFormData, string>> = {};

  if (!data.email) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Enter a valid email Address.";
  }

  if (!data.password) {
    errors.password = "Password is required.";
  } else if (data.password.length < 8) {
    errors.password = "Password mest be at least 8 characters";
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
  const [serverError, setServerErrror] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
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

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> {
    e.preventDefault();
    setServerErrror("");


    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setIsLoading(true);

    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "post",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(form),
      });

      const data: loginResponse = await res.json();


      console.log("sumbit form",res  );
      if (!res.ok ) {
        setServerErrror(data.error ?? "login failed. please try again.");
        return;
      }

      if (data.token) {
        document.cookie = `token=${data.token}; path=/; ${form.remember ? "max-age=604800" : ""}`;
      }

      if (data.user) {
        document.cookie = `role=${data.user.role}; path=/`;
      }

      router.push("/admin/pages/home");
      
    } catch (error) {
      setServerErrror("Someting went wrong. please try again.");
      console.error("error", error);
    } finally {
      setIsLoading(false);
    }

  }

 async function Logout() {
    try {
      
      const res = await fetch("/api/admin/auth/logout", {
        method: "post"
      });

      const data = await res.json();
      console.log("data",data);

    } catch (error) {
      console.error("server error",error);
    }
  }

  useEffect(() => {
    Logout();
  },[])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-xl p-8">
       
        <div className="text-center mb-8 text-white">
          <div className="w-11 h-11 rounded-lg bg-orange-700 flex items-center justify-center mx-auto mb-3">
            <ShieldIcon />
          </div>
          <h1 className="text-xl font-medium text-gray-900">Admin portal</h1>
          <p className="text-sm text-gray-500 mt-1">
            Restricted access — authorized personnel only
          </p>
        </div>



        {serverError && (
          <div className="mb-5 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={handleChange}
              placeholder="admin@yourcompany.com"
              className={`w-full h-10 px-3 rounded-lg border text-sm outline-none transition
                ${errors.email
                  ? "border-red-400 focus:ring-2 focus:ring-red-100"
                  : "border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                }`}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-600">{errors.email}</p>
            )}
          </div>


          <div className="mb-5">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-1">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              className={`w-full h-10 px-3 rounded-lg border text-sm outline-none transition
                ${errors.password
                  ? "border-red-400 focus:ring-2 focus:ring-red-100"
                  : "border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                }`}
            />
            {errors.password && (
              <p className="mt-1 text-xs text-red-600">{errors.password}</p>
            )}
          </div>


          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
              <input
                name="remember"
                type="checkbox"
                checked={form.remember}
                onChange={handleChange}
                className="accent-orange-700 w-4 h-4"
              />
              Remember me
            </label>
            <a href="/admin/forgot-password" className="text-sm text-orange-700 hover:underline">
              Forgot password?
            </a>
          </div>


          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-10 rounded-lg bg-orange-700 text-white text-sm font-medium
              hover:bg-orange-800 active:scale-[0.98] transition disabled:opacity-60"
          >
            {isLoading ? "Signing in…" : "Sign in to admin"}
          </button>
        </form>


        {/* <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-center gap-2">
          <span className="text-xs bg-orange-50 text-orange-800 px-2.5 py-1 rounded-md font-medium">
            Admin session
          </span>
          <span className="text-xs text-gray-400">2FA required on next step</span>
        </div> */}


      </div>
    </div>
  );
};

export default AdminLoginPage;
