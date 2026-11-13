"use client";

import { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ArrowRight,
  GraduationCap,
  Globe,
  TrendingUp,
  Sparkles,
  Shield,
  Star,
  ChevronRight,
  ArrowLeft,
  CheckCircle,
  Mail,
  User,
  Phone,
  Key,
  Loader2,
  Send,
  Check,
  AlertCircle,
  CalendarDays,
  BookOpen,
} from "lucide-react";
import Swal from "sweetalert2";
import axiosInstance from "@/services/axiosInstance";
import { useGlobal } from "@/hooks/AppStateContext";
import Image from "next/image";
import { Turnstile } from "@marsidev/react-turnstile";
import { useSearchParams } from "next/navigation";
// import { useSearchParams } from "next/navigation";

// Input Field Component
const InputField = ({ icon: Icon, label, error, ...props }: any) => (
  <div className="space-y-1.5">
    <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
      {Icon && <Icon className="w-4 h-4 text-gray-400" />}
      <label htmlFor={props.id}>{label}</label>
    </div>
    <input
      {...props}
      className={`w-full px-4 py-2.5 border-2 rounded-full bg-[#f3f3f3] transition-all duration-200 focus:bg-white focus:outline-none focus:ring-b-2 focus:ring-[#f26e46]/20 ${
        error
          ? "border-red-400 focus:border-red-500"
          : "border-gray-200 focus:border-[#f26e46] hover:border-gray-300"
      } ${props.className || ""}`}
    />
    {error && (
      <p className="flex items-center gap-1.5 text-sm text-red-500 mt-1">
        <AlertCircle className="w-3.5 h-3.5" />
        {error}
      </p>
    )}
  </div>
);

// Main Auth Component
function AuthContent({ toggleDrawer }: any) {
  const { userInfo } = useGlobal() as { userInfo: () => Promise<unknown> };

  const [mode, setMode] = useState<any>("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [userExists, setUserExists] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(true);
  const [errors, setErrors] = useState<any>({});
  const [resendCooldown, setResendCooldown] = useState(0);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [oauthPhone, setOauthPhone] = useState("");
  const [compactCaptcha, setCompactCaptcha] = useState(false);

  useEffect(() => {
    const narrowScreen = window.matchMedia("(max-width: 380px)");
    const updateCaptchaSize = () => setCompactCaptcha(narrowScreen.matches);
    updateCaptchaSize();
    narrowScreen.addEventListener("change", updateCaptchaSize);
    return () => narrowScreen.removeEventListener("change", updateCaptchaSize);
  }, []);

  const searchParams = useSearchParams();
  const ReferalFromUrl = searchParams.get("ref");
  const redirectUrl = searchParams.get("redirect");
  const getPostLoginDestination = () => {
    if (!redirectUrl) return "https://dashboard.ooshasprep.com/";

    try {
      const destination = new URL(redirectUrl);
      if (destination.origin === "https://dashboard.ooshasprep.com") {
        return destination.href;
      }
    } catch {
      // Ignore invalid redirect URLs and use the dashboard home page.
    }

    return "https://dashboard.ooshasprep.com/";
  };

  const startGoogleSignIn = () => {
    const apiBase = (
      axiosInstance.defaults.baseURL ||
      "https://uat.gatewayabroadeducations.com/api/v1/"
    ).replace(/\/$/, "");
    const callback = new URL(`${window.location.origin}/auth`);
    if (redirectUrl)
      callback.searchParams.set("redirect", getPostLoginDestination());
    const oauthUrl = new URL(`${apiBase}/auth/google`);
    oauthUrl.searchParams.set("returnTo", callback.toString());
    if (ReferalFromUrl) oauthUrl.searchParams.set("ref", ReferalFromUrl);
    window.location.assign(oauthUrl.toString());
  };

  useEffect(() => {
    const ticket = searchParams.get("oauth_ticket");
    if (!ticket) return;
    let active = true;
    setLoading(true);
    axiosInstance
      .post("/auth/google/redeem", { ticket })
      .then(async ({ data }) => {
        if (!active || !data?.token) return;
        localStorage.setItem("accessToken", data.token);
        await userInfo();
        if (data.needsPhone) {
          setMode("oauth-profile");
          return;
        }
        const cleanUrl = new URL(window.location.href);
        cleanUrl.searchParams.delete("oauth_ticket");
        window.history.replaceState({}, "", cleanUrl.toString());
        window.location.href = getPostLoginDestination();
      })
      .catch(() => {
        if (!active) return;
        setErrors((previous: any) => ({
          ...previous,
          general: "Google sign-in could not be completed. Please try again.",
        }));
        const cleanUrl = new URL(window.location.href);
        cleanUrl.searchParams.delete("oauth_ticket");
        window.history.replaceState({}, "", cleanUrl.toString());
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [searchParams, userInfo]);

  const search = "";
  const referral = "";

  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    referCode: "",
  });

  // useEffect(() => {
  //   setFormData((prevFormData) => ({
  //     ...prevFormData,
  //     referCode: referral,
  //   }));
  // }, [referral]);

  useEffect(() => {
    if (ReferalFromUrl) {
      setFormData((prev) => ({ ...prev, referCode: ReferalFromUrl }));
    }
  }, [ReferalFromUrl]);

  const validatePhone = (value: string) => /^[6-9]\d{9}$/.test(value);
  const validateName = (value: string) => /^[A-Za-z ]{2,}$/.test(value);
  const validateEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const getCurrentStep = () => {
    switch (mode) {
      case "email":
        return 1;
      case "register":
        return 1;
      case "otp":
        return 2;
      case "success":
        return 3;
      default:
        return 0;
    }
  };

  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(
        () => setResendCooldown(resendCooldown - 1),
        1000,
      );
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: any = {};

    if (!email) {
      newErrors.email = "Email is required.";
    } else if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    // Cloudflare validation
    if (!turnstileToken) {
      newErrors.turnstile = "Please verify that you are not a robot.";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);
    try {
      const res = await axiosInstance.get(
        `/auth/verify_email?email=${email}&turnstileToken=${turnstileToken}`,
      );
      const exists = res?.data?.isExists;
      setUserExists(exists);

      if (exists) {
        await sendOtp();
        setMode("otp");
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
      setLoading(false);
    }
  };

  const sendOtp = async () => {
    try {
      const res = await axiosInstance.post("/auth/send_otp", { email });
      if (res?.data?.success) {
        setResendCooldown(30);
        Swal.fire({
          title: "OTP Sent!",
          text: "Check your email for the verification code.",
          icon: "success",
          timer: 3000,
          showConfirmButton: false,
          toast: true,
          position: "top-end",
        });
      } else {
        Swal.fire("Failed", "Unable to send OTP. Please try again.", "error");
      }
    } catch (error: any) {
      Swal.fire(
        "Error",
        error.response?.data?.message || "Failed to send OTP.",
        "error",
      );
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: any = {};

    if (!validateName(formData.name)) {
      newErrors.name = "Please enter a valid name (letters and spaces only).";
    }
    if (!validatePhone(formData.phoneNumber)) {
      newErrors.phoneNumber = "Please enter a valid 10-digit phone number.";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);
    try {
      await sendOtp();
      setMode("otp");
    } catch (error: any) {
      setErrors({
        general:
          error.response?.data?.message ||
          "Failed to send OTP. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: any = {};

    if (!otp || otp.length !== 6) {
      newErrors.otp = "Please enter a valid 6-digit OTP.";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);
    try {
      const payload = userExists ? { email, otp } : { email, otp, ...formData };

      const res = await axiosInstance.post("/auth/verify_otp", payload);

      if (res?.data?.success) {
        userInfo();
        setMode("success");

        setTimeout(() => {
          toggleDrawer();
          window.location.href = getPostLoginDestination();
        }, 2000);
      } else {
        setErrors({ otp: "Invalid OTP. Please try again." });
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

  const handleGoogleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const phoneNumber = oauthPhone.replace(/\D/g, "");
    if (!validatePhone(phoneNumber)) {
      setErrors((previous: any) => ({
        ...previous,
        oauthPhone: "Enter a valid 10-digit mobile number.",
      }));
      return;
    }

    setLoading(true);
    try {
      await axiosInstance.post("/auth/profile", { phoneNumber });
      await userInfo();
      setErrors((previous: any) => ({ ...previous, oauthPhone: "" }));
      window.location.href = getPostLoginDestination();
    } catch (error: any) {
      setErrors((previous: any) => ({
        ...previous,
        oauthPhone:
          error.response?.data?.message ||
          "Could not save your mobile number. Please try again.",
      }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full min-w-0 flex-col justify-center">
      {/* Logo */}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full min-w-0 max-w-md"
      >
        <AnimatePresence mode="wait">
          {/* STEP 1: Email Verification */}
          {mode === "email" && (
            <motion.form
              key="email"
              noValidate
              data-track-form="Login"
              onSubmit={handleEmailSubmit}
              className="space-y-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-center mb-2">
                <h2 className="text-lg sm:text-xl font-bold text-[#F47852]">
                  Welcome to Ooshas Prep
                </h2>

              </div>

              <button
                type="button"
                onClick={startGoogleSignIn}
                className="flex w-full items-center justify-center gap-3 rounded-full border border-gray-200 bg-white py-2.5 font-semibold text-[#263445] transition hover:border-[#F47852] hover:bg-orange-50"
              >
                <Image
                  src="/google-favicon-2025.png"
                  alt=""
                  width={20}
                  height={20}
                  className="h-5 w-5 object-contain"
                />
                Continue with Google
              </button>
              <div className="flex items-center gap-3 py-0.5 text-[10px] text-gray-400">
                <span className="h-px flex-1 bg-gray-200" />
                OR CONTINUE WITH EMAIL
                <span className="h-px flex-1 bg-gray-200" />
              </div>

              <InputField
                id="email"
                type="email"
                icon={Mail}
                label="Email Address"
                placeholder="Enter your email address"
                value={email}
                onChange={(e: any) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors({ ...errors, email: "" });
                }}
                error={errors.email}
                required
              />

              <div className="w-full max-w-full overflow-hidden max-[380px]:flex max-[380px]:justify-start">
                <Turnstile
                  key={compactCaptcha ? "compact" : "flexible"}
                  siteKey={"0x4AAAAAAE13UE9vSZt3X2DO"}
                  options={{
                    size:  "flexible",
                  }}
                  onSuccess={(token) => {
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
                  className={compactCaptcha ? "" : "!w-full"}
                />
              </div>
              {errors.turnstile && (
                <p className="-mt-2 flex items-center gap-1.5 text-sm text-red-500" role="alert">
                  <AlertCircle className="h-3.5 w-3.5" />
                  {errors.turnstile}
                </p>
              )}

              <button
                type="submit"
                className="w-full bg-[#F47852] text-white font-semibold rounded-full py-3 hover:shadow-lg hover:shadow-[#f26e46]/30 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed"
                disabled={loading || !termsAccepted}
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Checking Email...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <span>Continue</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </button>
            </motion.form>
          )}

          {/* STEP 2: Registration Form */}
          {mode === "register" && (
            <motion.div
              key="register"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={() => setMode("email")}
                className="flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors mb-4"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm">Back</span>
              </button>

              <div className="mb-5 text-center">
                <h2 className="text-xl font-bold text-[#F47852]">
                  Complete Your Profile
                </h2>
                <p className="text-[#526276] font-medium text-sm">
                  Almost there! Just a few more details
                </p>
              </div>

              <form
                noValidate
                onSubmit={handleRegisterSubmit}
                data-track-form="Registration"
                className="space-y-4"
              >
                <InputField
                  id="name"
                  type="text"
                  icon={User}
                  label="Full Name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e: any) => {
                    setFormData({ ...formData, name: e.target.value });
                    if (errors.name) setErrors({ ...errors, name: "" });
                  }}
                  error={errors.name}
                  required
                />

                <InputField
                  id="phone"
                  type="tel"
                  icon={Phone}
                  label="Phone Number"
                  placeholder="Enter your 10-digit phone number"
                  value={formData.phoneNumber}
                  onChange={(e: any) => {
                    const value = e.target.value.replace(/\D/g, "");
                    setFormData({ ...formData, phoneNumber: value });
                    if (errors.phoneNumber)
                      setErrors({ ...errors, phoneNumber: "" });
                  }}
                  error={errors.phoneNumber}
                  maxLength={10}
                  required
                />

                <InputField
                  id="ref"
                  type="text"
                  icon={Key}
                  label="Referral Code (Optional)"
                  placeholder="Enter referral code if any"
                  value={formData.referCode}
                  onChange={(e: any) =>
                    setFormData({ ...formData, referCode: e.target.value })
                  }
                />

                {errors.general && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    {errors.general}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-[#F47852] text-white font-semibold rounded-full py-3 hover:shadow-lg hover:shadow-[#f26e46]/30 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Sending OTP...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <Send className="w-4 h-4" />
                      <span>Send OTP</span>
                    </div>
                  )}
                </button>
              </form>
            </motion.div>
          )}

          {/* STEP 3: OTP Verification */}
          {mode === "otp" && (
            <motion.form
              key="otp"
              noValidate
              data-track-form="Email verification"
              onSubmit={handleVerifyOtp}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-5"
            >
              <button
                type="button"
                onClick={() =>
                  userExists ? setMode("email") : setMode("register")
                }
                className="flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors mb-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm">Back</span>
              </button>

              <div className="text-center">
                <h2 className="text-xl font-bold text-[#17365d]">
                  Verify Your Email
                </h2>
                <p className="text-[#526276] text-sm mt-1">
                  Enter the 6-digit code sent to{" "}
                  <span className="break-all font-medium text-gray-700">
                    {email}
                  </span>
                </p>
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="otp"
                  className="text-sm font-medium text-gray-700 block"
                >
                  Verification Code
                </label>
                <input
                  id="otp"
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
                    setOtp(value);
                    if (errors.otp) setErrors({ ...errors, otp: "" });
                  }}
                  required
                  maxLength={6}
                  className={`w-full px-4 py-2.5 text-center text-lg font-mono tracking-[0.3em] rounded-full border-2 bg-[#f3f3f3] transition-all duration-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#f26e46]/20 ${
                    errors.otp
                      ? "border-red-400 focus:border-red-500"
                      : "border-gray-200 focus:border-[#f26e46] hover:border-gray-300"
                  }`}
                />
                {errors.otp && (
                  <p className="flex items-center gap-1.5 text-sm text-red-500 mt-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.otp}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={sendOtp}
                  disabled={resendCooldown > 0}
                  className={`text-sm transition-colors ${
                    resendCooldown > 0
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-[#f26e46] hover:text-[#c94a28] font-medium"
                  }`}
                >
                  {resendCooldown > 0
                    ? `Resend in ${resendCooldown}s`
                    : "Didn't receive code? Resend OTP"}
                </button>
              </div>

              <button
                type="submit"
                className="w-full bg-[#F47852] text-white font-semibold rounded-full py-3 hover:shadow-lg hover:shadow-[#f26e46]/30 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Verifying...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <Check className="w-4 h-4" />
                    <span>Verify & Continue</span>
                  </div>
                )}
              </button>
            </motion.form>
          )}

          {mode === "oauth-profile" && (
            <motion.form
              key="oauth-profile"
              noValidate
              onSubmit={handleGoogleProfileSubmit}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div className="text-center mt-6">
                <h2 className="text-xl font-bold text-[#F47852]">One last detail</h2>
                <p className="mt-1 text-sm text-[#526276]">
                  Add your mobile number to finish setting up your account.
                </p>
              </div>
              <InputField
                id="google-phone"
                type="tel"
                className="mb-3 mt-1"
                icon={Phone}
                label="Mobile Number"
                placeholder="Enter your 10-digit mobile number"
                value={oauthPhone}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setOauthPhone(event.target.value.replace(/\D/g, "").slice(0, 10));
                  if (errors.oauthPhone) setErrors((previous: any) => ({ ...previous, oauthPhone: "" }));
                }}
                error={errors.oauthPhone}
                maxLength={10}
                autoComplete="tel"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-full bg-[#F47852] py-3 font-semibold text-white transition hover:bg-[#e66742] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? "Saving..." : "Continue"}
              </button>
            </motion.form>
          )}

          {/* STEP 4: Success */}
          {mode === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-8"
            >
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>

              <h2 className="text-2xl font-bold text-[#17365d]">
                {userExists ? "Welcome Back!" : "Account Created Successfully!"}
              </h2>

              <p className="text-[#526276] mt-2">
                {userExists
                  ? "You have been successfully logged in."
                  : "Your account has been created successfully."}
              </p>

              <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                <p className="text-sm text-gray-600">
                  Redirecting to dashboard...
                </p>
                <div className="flex justify-center mt-3">
                  <div className="w-6 h-6 border-4 border-[#f26e46] border-t-transparent rounded-full animate-spin" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

const TESTIMONIALS = [
  {
    quote: "The best decision I made for my study abroad journey",
    author: "Sarah K.",
  },
  {
    quote: "Expert guidance that truly makes a difference",
    author: "Michael R.",
  },
];

export default function LoginPage() {
  const [isVisible, setIsVisible] = useState(true);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const { user, authChecked } = useGlobal() as { user: unknown; authChecked: boolean };

  useEffect(() => {
    if (!authChecked || !user) return;

    let destination = "https://dashboard.ooshasprep.com/";
    const requestedRedirect = new URLSearchParams(window.location.search).get("redirect");
    if (requestedRedirect) {
      try {
        const parsed = new URL(requestedRedirect);
        if (parsed.origin === "https://dashboard.ooshasprep.com") {
          destination = parsed.href;
        }
      } catch {
        // Keep the default dashboard destination for malformed redirects.
      }
    }
    window.location.replace(destination);
  }, [authChecked, user]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  if (!authChecked || user) {
    return (
      <main className="flex min-h-dvh w-full items-center justify-center bg-white">
        <Loader2 className="h-7 w-7 animate-spin text-[#F47852]" aria-label="Checking your session" />
      </main>
    );
  }

  const handleClose = () => setIsVisible(false);

  return (
    <main className="flex min-h-dvh w-full items-center justify-center bg-white px-1 py-2 sm:px-6 sm:py-8 lg:p-8">
      {/* Main Rounded Container matching the overall card feel */}
      <div className="relative flex w-full max-w-7xl min-w-0 flex-col overflow-hidden rounded-[28px] bg-[#fdf2ec] sm:rounded-[40px] lg:min-h-[90vh] lg:flex-row lg:rounded-[60px]">
        {/* ================= LEFT SIDE (FORM) ================= */}
        <section className="relative z-20 flex w-full min-w-0 flex-col items-center justify-center gap-2 p-3 py-4 sm:p-6 lg:w-[50%] lg:gap-4 lg:p-6">
          {/* Orange Curved Background Shape */}
          <div className="absolute inset-0 z-0 hidden lg:block">
            <img
              src="/bglogin.png"
              alt=""
              className="object-fit w-[100%] !h-full "
            />
          </div>

          {/* Paper Plane Graphic (Placeholder SVG) */}
          <div className="absolute right-[12%] top-[8%] z-10 hidden lg:block">
            <img src="/plane.webp" alt="" className="object-fit h-12 " />
          </div>

          <h1 className="relative z-10 w-full whitespace-nowrap text-left text-[clamp(1rem,5vw,1.4rem)] font-bold leading-tight tracking-[-0.04em] text-[#F47852] lg:hidden">
            <span className="rounded-md bg-[#fff0e8] px-1.5 py-1 text-[#d95e3c]">
              Your Dream Score, Our Mission
            </span>
          </h1>
          <p className="relative z-10 w-full pl-1.5 text-left text-sm leading-relaxed text-[#526276] lg:hidden">
            Get access to expert-led classes, structured courses, and personalized support
          </p>

          {/* White Form Card */}
          <div className="relative z-10 w-full min-w-0 max-w-[420px] rounded-[24px] bg-white p-4 sm:rounded-[32px] sm:p-8">
            <a
              href="/"
              className="mb-2 inline-flex items-center gap-1.5 text-sm font-medium text-[#526276] transition hover:text-[#F47852]"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to website
            </a>
            {/* Header / Logo */}
            <div className=" flex flex-col items-center justify-center text-center">
              {/* Replace with your actual Logo */}
              <div className="mb-1">
                <a href="/" aria-label="Ooshas Prep home">
                  <img
                    src="/image/logo.png"
                    alt="Ooshas Prep"
                    className="h-16 w-auto object-contain"
                  />
                </a>
              </div>
            </div>

            {/* Auth Component */}
            <div className="w-full">
              <Auth toggleDrawer={handleClose} />
            </div>

            {/* Footer Links (Optional, as the image shows it inside the form usually) */}
            <div className="mt-5 rounded-xl bg-[#fff5f0] px-3 py-2.5 text-center">
              <p className="text-xs leading-relaxed text-[#697586]">
                By continuing, you agree to our{" "}
                <a href="/terms-and-conditions" className="font-semibold text-[#d95e3c] underline decoration-[#f2b9a3] underline-offset-2 hover:text-[#b84628]">
                  Terms
                </a>{" "}
                and{" "}
                <a href="/privacy-policy" className="font-semibold text-[#d95e3c] underline decoration-[#f2b9a3] underline-offset-2 hover:text-[#b84628]">
                  Privacy Policy
                </a>
              </p>
            </div>
          </div>

          <div className="w-full max-w-[420px] rounded-2xl p-3.5 lg:hidden">
            <div className="mb-3">
              <h2 className="text-lg font-bold tracking-[-0.02em] text-[#243247]">Find your exam prep</h2>
              <p className="mt-1 text-sm leading-relaxed text-[#5f6d7e]">
                Courses, practice and mock tests for your next step.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2.5" aria-label="Exam preparation categories">
              {[
                { name: "GMAT", detail: "Business school prep" },
                { name: "GRE", detail: "Graduate admissions" },
                { name: "SAT", detail: "College admissions" },
                { name: "IELTS", detail: "English proficiency" },
                { name: "PTE", detail: "English proficiency" },
                { name: "More exams", detail: "Explore all options" },
              ].map(({ name, detail }) => (
                <div
                  key={name}
                  className="flex min-h-[76px] items-center rounded-xl border border-[#f0e4de] bg-white px-3 py-2.5 transition-colors hover:border-[#edb9a5]"
                >
                  <span className="min-w-0">
                    <span className="inline-block px-0 py-1 text-base font-extrabold leading-tight tracking-[0.01em] text-[#bd482b]">
                      {name}
                    </span>
                    <span className="mt-1.5 block text-xs font-medium leading-snug text-[#5f6d7e]">{detail}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= RIGHT SIDE (PROMOTIONAL) ================= */}
        <section className="relative hidden w-full flex-col bg-[#fdf2ec] lg:flex lg:w-[50%]">
          {/* Text Content (Top) */}
          <div className="relative z-20 p-8 ">
            <h1 className="text-4xl sm:text-[40px] font-bold leading-[1.2] tracking-[-1px] text-[#F47852]">
              Your Dream Score,
              <br />
              <span className="">Our Mission</span>
            </h1>

            <p className="mt-2 max-w-[500px] font-medium text-lg leading-relaxed text-[#4b5563]">
              Get access to expert-led classes, structured courses, and
              personalized support — all in one place.
            </p>
          </div>
          <div className="relative flex w-full flex-1 items-start">
            <div className="relative z-20 w-[95%] max-w-[680px] translate-y-2 ">
              <img
                src="/login.png" // REPLACE WITH YOUR LAPTOP IMAGE
                alt="Laptop showing IELTS Exam Dashboard"
                className="h-auto w-full object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function Auth({ toggleDrawer }: any) {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[300px] items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-[#F47852]" />
        </div>
      }
    >
      <AuthContent toggleDrawer={toggleDrawer} />
    </Suspense>
  );
}
