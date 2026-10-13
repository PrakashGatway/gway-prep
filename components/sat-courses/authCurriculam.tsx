
"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Turnstile } from "@marsidev/react-turnstile";
import {
  ArrowLeft,
  CheckCircle,
  KeyRound,
  Mail,
  Phone,
  User,
  X,
  ShieldCheck,
} from "lucide-react";
import Swal from "sweetalert2";
import axiosInstance from "@/services/axiosInstance";

type Props = {
  onClose: () => void;
  onSuccess: () => void;
  onAuthenticated?: () => Promise<void> | void;
};

type Mode = "email" | "register" | "otp" | "success";

type FormErrors = Record<string, string>;

export default function CurriculumLoginPopup({
  onClose,
  onSuccess,
  onAuthenticated,
}: Props) {
  const [mode, setMode] = useState<Mode>("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [userExists, setUserExists] = useState(false);
  const [loading, setLoading] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileKey, setTurnstileKey] = useState(0);
  const [resendCooldown, setResendCooldown] = useState(0);

  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    referCode: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const validateEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const validateName = (value: string) =>
    /^[a-zA-Z\s.'-]{2,}$/.test(value.trim());

  const validatePhone = (value: string) => /^\d{10}$/.test(value);

  const inputClass =
    "w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#f36d45] focus:ring-2 focus:ring-[#f36d45]/15";

  // Escape key closes the popup, except during the success screen.
  const handleClose = useCallback(() => {
    if (mode !== "success") onClose();
  }, [mode, onClose]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [handleClose]);

  // OTP resend cooldown.
  useEffect(() => {
    if (resendCooldown <= 0) return;

    const timer = window.setTimeout(() => {
      setResendCooldown((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => window.clearTimeout(timer);
  }, [resendCooldown]);

  // STEP 1: Verify email and Cloudflare token.
  const handleEmailSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const newErrors: FormErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!validateEmail(email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!turnstileToken) {
      newErrors.turnstile = "Please verify that you are not a robot.";
    }

    if (!termsAccepted) {
      newErrors.terms = "Please accept the Terms & Conditions.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);

    try {
      const res = await axiosInstance.get(
        `/auth/verify_email?email=${encodeURIComponent(
          email.trim()
        )}&turnstileToken=${encodeURIComponent(turnstileToken)}`
      );

      const exists = Boolean(res?.data?.isExists);

      setUserExists(exists);

      if (exists) {
        await sendOtp();
      } else {
        setMode("register");
      }
    } catch (error: any) {
      setErrors({
        email:
          error.response?.data?.message ||
          "Failed to verify email. Please try again.",
      });
    } finally {
      setLoading(false)
    }
  };

  // SEND OTP
  const sendOtp = async (): Promise<boolean> => {
    if (resendCooldown > 0 || loading) return false;

    try {
      const res = await axiosInstance.post("/auth/send_otp", {
        email: email.trim(),
      });

      if (res?.data?.success) {
        setResendCooldown(30);
        setMode("otp");
        setErrors((prev) => ({ ...prev, otp: "" }));

        await Swal.fire({
          title: "OTP Sent!",
          text: "Check your email for the verification code.",
          icon: "success",
          timer: 2500,
          showConfirmButton: false,
          toast: true,
          position: "top-end",
        });

        return true;
      }

      Swal.fire(
        "Failed",
        "Unable to send OTP. Please try again.",
        "error"
      );

      return false;
    } catch (error: any) {
      Swal.fire(
        "Error",
        error.response?.data?.message || "Failed to send OTP.",
        "error"
      );

      return false;
    }
  };

  // STEP 2: Registration for new users.
  const handleRegisterSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const newErrors: FormErrors = {};

    if (!validateName(formData.name)) {
      newErrors.name =
        "Please enter a valid name (letters and spaces only).";
    }

    if (!validatePhone(formData.phoneNumber)) {
      newErrors.phoneNumber =
        "Please enter a valid 10-digit phone number.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);

    try {
      await sendOtp();
    } finally {
      setLoading(false);
    }
  };

  // STEP 3: Verify OTP.
  const handleVerifyOtp = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!/^\d{6}$/.test(otp)) {
      setErrors({
        otp: "Please enter a valid 6-digit OTP.",
      });
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      const payload = userExists
        ? { email: email.trim(), otp }
        : { email: email.trim(), otp, ...formData };

      const res = await axiosInstance.post(
        "/auth/verify_otp",
        payload
      );

      if (res?.data?.success) {
        // Refresh the existing authentication context/session.
        await onAuthenticated?.();

        setMode("success");

        // Let the parent unlock the curriculum.
        onSuccess();
      } else {
        setErrors({
          otp: "Invalid OTP. Please try again.",
        });
      }
    } catch (error: any) {
      setErrors({
        otp:
          error.response?.data?.message ||
          "OTP verification failed. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/60 p-3 backdrop-blur-sm sm:p-5"
      onMouseDown={(e) => {
        if (
          e.target === e.currentTarget &&
          mode !== "success"
        ) {
          onClose();
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="curriculum-auth-title"
        className="relative max-h-[92vh] w-full max-w-md overflow-y-auto rounded-3xl bg-white p-5 shadow-2xl sm:p-7"
      >
        {mode !== "success" && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close popup"
            className="absolute right-3 top-3 z-10 rounded-full p-2 text-slate-500 transition hover:bg-slate-100"
          >
            <X size={20} />
          </button>
        )}

        <AnimatePresence mode="wait">
          {/* STEP 1: EMAIL */}
          {mode === "email" && (
            <motion.form
              key="email"
              onSubmit={handleEmailSubmit}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-5 pt-4"
            >
              <div className="text-center">
                <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-[#fff0e9] text-[#f36d45]">
                  <ShieldCheck size={27} />
                </div>

                <h2
                  id="curriculum-auth-title"
                  className="text-2xl font-extrabold text-slate-900"
                >
                  Unlock Full Curriculum
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  Sign in or create an account to access all
                  modules, topics, and lessons.
                </p>
              </div>

              <div>
                <label
                  htmlFor="curriculum-email"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Email Address
                </label>

                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-3 top-3.5 text-slate-400"
                  />

                  <input
                    id="curriculum-email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setErrors((prev) => ({
                        ...prev,
                        email: "",
                      }));
                    }}
                    placeholder="Enter your email address"
                    className={`${inputClass} pl-10`}
                    required
                  />
                </div>

                {errors.email && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* CLOUDFLARE TURNSTILE */}
               <div className="!w-full">
                <Turnstile
                  siteKey={"0x4AAAAAAE13UE9vSZt3X2DO"}
                  options={{
                    size: "flexible",
                  }}
                  onSuccess={(token) => {
                    console.log(token);
                    setTurnstileToken(token);
                    setErrors((prev: any) => ({
                      ...prev,
                      turnstile: "",
                    }));
                  }}
                  onExpire={() => {
                    setTurnstileToken("");
                  }}
                  onError={() => {
                    setTurnstileToken("");
                  }}
                  className="!w-full"
                />
              </div>

              {/* TERMS */}
              <div>
                <label className="flex items-start gap-3 rounded-xl bg-slate-50 p-3 text-xs leading-relaxed text-slate-600">
                  <input
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={(e) =>
                      setTermsAccepted(e.target.checked)
                    }
                    className="mt-0.5 accent-[#f36d45]"
                  />

                  <span>
                    I agree to the{" "}
                    <a
                      href="/terms"
                      target="_blank"
                      rel="noreferrer"
                      className="font-semibold text-[#f36d45] underline"
                    >
                      Terms & Conditions
                    </a>{" "}
                    and{" "}
                    <a
                      href="/privacy-policy"
                      target="_blank"
                      rel="noreferrer"
                      className="font-semibold text-[#f36d45] underline"
                    >
                      Privacy Policy
                    </a>.
                  </span>
                </label>

                {errors.terms && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.terms}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading || !termsAccepted}
                className="w-full rounded-xl bg-[#f36d45] px-5 py-3 font-bold text-white transition hover:bg-[#e85d36] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Checking Email..." : "Continue"}
              </button>

              <p className="text-center text-xs text-slate-400">
                Secure email verification
              </p>
            </motion.form>
          )}

          {/* STEP 2: REGISTRATION */}
          {mode === "register" && (
            <motion.form
              key="register"
              onSubmit={handleRegisterSubmit}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4 pt-5"
            >
              <button
                type="button"
                onClick={() => {
                  setMode("email");
                  setErrors({});
                }}
                className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-[#f36d45]"
              >
                <ArrowLeft size={17} />
                Back
              </button>

              <h2
                id="curriculum-auth-title"
                className="text-2xl font-extrabold text-slate-900"
              >
                Complete Your Profile
              </h2>

              <p className="text-sm text-slate-500">
                Just a few details to create your account.
              </p>

              <div>
                <label
                  htmlFor="curriculum-name"
                  className="mb-1.5 block text-sm font-semibold"
                >
                  Full Name
                </label>

                <div className="relative">
                  <User
                    size={18}
                    className="absolute left-3 top-3.5 text-slate-400"
                  />

                  <input
                    id="curriculum-name"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        name: e.target.value,
                      });
                      setErrors((prev) => ({
                        ...prev,
                        name: "",
                      }));
                    }}
                    placeholder="Enter your full name"
                    className={`${inputClass} pl-10`}
                    autoComplete="name"
                    required
                  />
                </div>

                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="curriculum-phone"
                  className="mb-1.5 block text-sm font-semibold"
                >
                  Phone Number
                </label>

                <div className="relative">
                  <Phone
                    size={18}
                    className="absolute left-3 top-3.5 text-slate-400"
                  />

                  <input
                    id="curriculum-phone"
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel"
                    value={formData.phoneNumber}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        phoneNumber: e.target.value
                          .replace(/\D/g, "")
                          .slice(0, 10),
                      });
                      setErrors((prev) => ({
                        ...prev,
                        phoneNumber: "",
                      }));
                    }}
                    placeholder="10-digit phone number"
                    className={`${inputClass} pl-10`}
                    maxLength={10}
                    required
                  />
                </div>

                {errors.phoneNumber && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.phoneNumber}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="curriculum-referral"
                  className="mb-1.5 block text-sm font-semibold"
                >
                  Referral Code (Optional)
                </label>

                <div className="relative">
                  <KeyRound
                    size={18}
                    className="absolute left-3 top-3.5 text-slate-400"
                  />

                  <input
                    id="curriculum-referral"
                    value={formData.referCode}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        referCode: e.target.value,
                      })
                    }
                    placeholder="Enter referral code"
                    className={`${inputClass} pl-10`}
                  />
                </div>
              </div>

              {errors.general && (
                <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
                  {errors.general}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-[#f36d45] px-5 py-3 font-bold text-white transition hover:bg-[#e85d36] disabled:opacity-60"
              >
                {loading ? "Sending OTP..." : "Send OTP"}
              </button>
            </motion.form>
          )}

          {/* STEP 3: OTP VERIFICATION */}
          {mode === "otp" && (
            <motion.form
              key="otp"
              onSubmit={handleVerifyOtp}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-5 pt-5"
            >
              <button
                type="button"
                onClick={() => {
                  setMode(userExists ? "email" : "register");
                  setOtp("");
                  setErrors({});
                }}
                className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-[#f36d45]"
              >
                <ArrowLeft size={17} />
                Back
              </button>

              <div className="text-center">
                <div className="mx-auto mb-3 grid h-14 w-14 place-items-center rounded-2xl bg-[#fff0e9] text-[#f36d45]">
                  <KeyRound size={25} />
                </div>

                <h2
                  id="curriculum-auth-title"
                  className="text-2xl font-extrabold text-slate-900"
                >
                  Verify Your Email
                </h2>

                <p className="mt-2 break-all text-sm text-slate-500">
                  Enter the six-digit code sent to {email}
                </p>
              </div>

              <div>
                <label
                  htmlFor="curriculum-otp"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Verification Code
                </label>

                <input
                  id="curriculum-otp"
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  value={otp}
                  onChange={(e) => {
                    setOtp(
                      e.target.value.replace(/\D/g, "").slice(0, 6)
                    );
                    setErrors((prev) => ({
                      ...prev,
                      otp: "",
                    }));
                  }}
                  placeholder="Enter 6-digit OTP"
                  className={`${inputClass} text-center text-xl tracking-[0.4em]`}
                  maxLength={6}
                  required
                />

                {errors.otp && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.otp}
                  </p>
                )}
              </div>

              <button
                type="button"
                disabled={loading || resendCooldown > 0}
                onClick={sendOtp}
                className="w-full text-sm font-semibold text-[#f36d45] hover:underline disabled:cursor-not-allowed disabled:text-slate-400"
              >
                {resendCooldown > 0
                  ? `Resend OTP in ${resendCooldown}s`
                  : "Didn't receive code? Resend OTP"}
              </button>

              <button
                type="submit"
                disabled={loading || otp.length !== 6}
                className="w-full rounded-xl bg-[#f36d45] px-5 py-3 font-bold text-white transition hover:bg-[#e85d36] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Verifying..." : "Verify & Continue"}
              </button>
            </motion.form>
          )}

          {/* STEP 4: SUCCESS */}
          {mode === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-5 py-8 text-center"
            >
              <CheckCircle
                className="mx-auto text-green-500"
                size={64}
              />

              <h2
                id="curriculum-auth-title"
                className="text-2xl font-extrabold text-slate-900"
              >
                {userExists
                  ? "Welcome Back!"
                  : "Account Created Successfully!"}
              </h2>

              <p className="text-sm leading-relaxed text-slate-500">
                Your email has been verified. You can now access
                the complete course curriculum.
              </p>

              <button
                type="button"
                onClick={onClose}
                className="w-full rounded-xl bg-[#f36d45] px-5 py-3 font-bold text-white transition hover:bg-[#e85d36]"
              >
                Explore Curriculum
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
