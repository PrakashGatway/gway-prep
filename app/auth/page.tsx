"use client";

import { useState, useEffect } from "react";
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
  AlertCircle
} from "lucide-react";
import Swal from "sweetalert2";
import axiosInstance from "@/services/axiosInstance";
import { useGlobal } from "@/hooks/AppStateContext";

type AuthMode = "email" | "register" | "otp" | "success";

// Progress Steps Component
const ProgressSteps = ({ currentStep, totalSteps = 3 }: { currentStep: number; totalSteps?: number }) => {
  return (
    <div className="flex items-center justify-center gap-2 mb-6">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <div key={index} className="flex items-center">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300 ${
              index + 1 <= currentStep
                ? "bg-gradient-to-r from-[#f26e46] to-[#c94a28] text-white shadow-lg shadow-[#f26e46]/30"
                : "bg-gray-200 text-gray-400"
            }`}
          >
            {index + 1 <= currentStep ? (
              <Check className="w-4 h-4" />
            ) : (
              index + 1
            )}
          </div>
          {index < totalSteps - 1 && (
            <div
              className={`w-8 h-0.5 mx-1 transition-all duration-300 ${
                index + 1 < currentStep ? "bg-[#f26e46]" : "bg-gray-200"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
};

// Input Field Component
const InputField = ({ 
  icon: Icon, 
  label, 
  error, 
  ...props 
}: any) => (
  <div className="space-y-1.5">
    <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
      {Icon && <Icon className="w-4 h-4 text-gray-400" />}
      <label htmlFor={props.id}>{label}</label>
    </div>
    <input
      {...props}
      className={`w-full px-4 py-3 rounded-xl border-2 bg-gray-50/50 transition-all duration-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#f26e46]/20 ${
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
function Auth({ toggleDrawer }: any) {
  const { userInfo } = useGlobal();

  const [mode, setMode] = useState<AuthMode>("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [userExists, setUserExists] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(true);
  const [errors, setErrors] = useState<any>({});
  const [resendCooldown, setResendCooldown] = useState(0);

  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    referCode: "",
  });

  const validatePhone = (value: string) => /^[6-9]\d{9}$/.test(value);
  const validateName = (value: string) => /^[A-Za-z ]{2,}$/.test(value);
  const validateEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const getCurrentStep = () => {
    switch (mode) {
      case "email": return 1;
      case "register": return 1;
      case "otp": return 2;
      case "success": return 3;
      default: return 0;
    }
  };

  // Resend OTP cooldown
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
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

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);
    try {
      const res = await axiosInstance.get(`/auth/verify_email?email=${email}`);
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
        email: error.response?.data?.message || "Failed to verify email. Please try again."
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
        "error"
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
        general: error.response?.data?.message || "Failed to send OTP. Please try again."
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
      const payload = userExists
        ? { email, otp }
        : { email, otp, ...formData };

      const res = await axiosInstance.post("/auth/verify_otp", payload);

      if (res?.data?.success) {
        userInfo();
        setMode("success");

        setTimeout(() => {
          toggleDrawer();
          window.location.href = "https://dashboard.ooshasprep.com/";
        }, 2000);
      } else {
        setErrors({ otp: "Invalid OTP. Please try again." });
      }
    } catch (error: any) {
      setErrors({
        otp: error.response?.data?.message || "OTP verification failed. Please try again."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      {/* Logo */}
      <div className="mb-6">
        <img 
          src="https://www.ooshasprep.com/image/logo.png" 
          alt="Ooshas Prep" 
          className="h-12 w-auto object-contain"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Progress Steps */}
        {mode !== "success" && (
          <ProgressSteps currentStep={getCurrentStep()} />
        )}

        <AnimatePresence mode="wait">
          {/* STEP 1: Email Verification */}
          {mode === "email" && (
            <motion.form
              key="email"
              onSubmit={handleEmailSubmit}
              className="space-y-5"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-800">
                  Welcome to Ooshas Prep
                </h2>
                <p className="text-gray-500 text-sm mt-1">
                  Enter your email to get started
                </p>
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

              <div className="flex items-start gap-2.5 p-3 bg-gray-50 rounded-xl">
                <input
                  type="checkbox"
                  id="terms"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="w-4 h-4 mt-0.5 accent-[#f26e46] rounded border-gray-300"
                />
                <label htmlFor="terms" className="text-xs text-gray-600 leading-relaxed">
                  I agree to the{" "}
                  <a href="/terms" className="text-[#f26e46] hover:underline font-medium">
                    Terms & Conditions
                  </a>{" "}
                  and{" "}
                  <a href="/privacy-policy" className="text-[#f26e46] hover:underline font-medium">
                    Privacy Policy
                  </a>
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#f26e46] to-[#c94a28] text-white font-semibold rounded-xl py-3.5 hover:shadow-lg hover:shadow-[#f26e46]/30 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed"
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

              <div className="mb-5">
                <h2 className="text-xl font-bold text-gray-800">
                  Complete Your Profile
                </h2>
                <p className="text-gray-500 text-sm">
                  Almost there! Just a few more details
                </p>
              </div>

              <form onSubmit={handleRegisterSubmit} className="space-y-4">
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
                    const value = e.target.value.replace(/\D/g, '');
                    setFormData({ ...formData, phoneNumber: value });
                    if (errors.phoneNumber) setErrors({ ...errors, phoneNumber: "" });
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
                  className="w-full bg-gradient-to-r from-[#f26e46] to-[#c94a28] text-white font-semibold rounded-xl py-3.5 hover:shadow-lg hover:shadow-[#f26e46]/30 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed"
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
              onSubmit={handleVerifyOtp}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-5"
            >
              <button
                onClick={() => userExists ? setMode("email") : setMode("register")}
                className="flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors mb-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm">Back</span>
              </button>

              <div className="text-center">
                <div className="w-16 h-16 bg-[#f26e46]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Mail className="w-8 h-8 text-[#f26e46]" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">
                  Verify Your Email
                </h2>
                <p className="text-gray-500 text-sm mt-1">
                  Enter the 6-digit code sent to{" "}
                  <span className="font-medium text-gray-700">{email}</span>
                </p>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="otp" className="text-sm font-medium text-gray-700 block">
                  Verification Code
                </label>
                <input
                  id="otp"
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                    setOtp(value);
                    if (errors.otp) setErrors({ ...errors, otp: "" });
                  }}
                  required
                  maxLength={6}
                  className={`w-full px-4 py-3.5 text-center text-lg font-mono tracking-[0.3em] rounded-xl border-2 bg-gray-50/50 transition-all duration-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#f26e46]/20 ${
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
                    : "Didn't receive code? Resend OTP"
                  }
                </button>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#f26e46] to-[#c94a28] text-white font-semibold rounded-xl py-3.5 hover:shadow-lg hover:shadow-[#f26e46]/30 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed"
                disabled={loading || otp.length !== 6}
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

              <h2 className="text-2xl font-bold text-gray-800">
                {userExists ? "Welcome Back!" : "Account Created Successfully!"}
              </h2>

              <p className="text-gray-500 mt-2">
                {userExists
                  ? "You have been successfully logged in."
                  : "Your account has been created successfully."
                }
              </p>

              <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                <p className="text-sm text-gray-600">
                  Redirecting to dashboard...
                </p>
                <div className="flex justify-center mt-3">
                  <div className="w-6 h-6 border-3 border-[#f26e46] border-t-transparent rounded-full animate-spin" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

// Stats and Testimonials data
const STATS = [
  { value: "10K+", label: "Students", icon: GraduationCap, detail: "Active learners" },
  { value: "50+", label: "Countries", icon: Globe, detail: "Global presence" },
  { value: "98%", label: "Success Rate", icon: TrendingUp, detail: "Student satisfaction" },
];

const TESTIMONIALS = [
  { quote: "The best decision I made for my study abroad journey", author: "Sarah K." },
  { quote: "Expert guidance that truly makes a difference", author: "Michael R." },
];

// AuthDrawer Component
const AuthDrawer = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleClose = () => setIsVisible(false);

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={handleClose}
            style={{ zIndex: 998 }}
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              mass: 1,
            }}
            style={{ zIndex: 999 }}
            role="dialog"
            aria-modal="true"
            aria-label="Authentication"
            className="fixed inset-y-0 right-0 h-full w-full  bg-white shadow-2xl overflow-hidden flex"
          >
            {/* Left Side - Auth Form */}
            <div className="flex-1 flex flex-col items-center justify-center px-6 sm:px-10 lg:px-14 py-10 relative bg-white min-w-0 overflow-y-auto">
              {/* Close Button */}
              {/* <button
                onClick={handleClose}
                className="absolute top-5 right-5 p-2.5 rounded-full hover:bg-gray-100 transition-all duration-200 z-10 group"
                aria-label="Close authentication panel"
              >
                <X className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
              </button> */}

              {/* Auth Component */}
              <div className="w-full max-w-sm mx-auto lg:mx-0">
                <Auth toggleDrawer={handleClose} />
              </div>

              {/* Footer Links */}
              <div className="mt-8 text-center">
                <p className="text-xs text-gray-400">
                  By continuing, you agree to our{" "}
                  <a href="#" className="text-[#f26e46] hover:underline">
                    Terms
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-[#f26e46] hover:underline">
                    Privacy Policy
                  </a>
                </p>
              </div>
            </div>

            {/* Right Side - Branding/Info */}
            <aside className="hidden md:flex flex-col justify-between w-1/2 shrink-0 relative overflow-hidden">
              {/* Animated Gradient Background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-[#f26e46] via-[#e05a33] to-[#c94a28]"
                animate={{
                  background: [
                    "linear-gradient(135deg, #f26e46, #e05a33, #c94a28)",
                    "linear-gradient(225deg, #f26e46, #c94a28, #e05a33)",
                    "linear-gradient(135deg, #f26e46, #e05a33, #c94a28)",
                  ],
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              />

              {/* Dot Grid Pattern */}
              <div
                className="absolute inset-0 opacity-[0.08]"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, #fff 1.5px, transparent 1.5px)",
                  backgroundSize: "24px 24px",
                }}
                aria-hidden="true"
              />

              {/* Animated Blobs */}
              <motion.div
                className="absolute -top-32 -right-32 w-96 h-96 bg-white/10 rounded-full blur-3xl"
                animate={{ scale: [1, 1.2, 1], x: [0, -20, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                aria-hidden="true"
              />
              <motion.div
                className="absolute bottom-10 -left-20 w-64 h-64 bg-white/[0.07] rounded-full blur-3xl"
                animate={{ scale: [1, 1.1, 1], y: [0, -30, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                aria-hidden="true"
              />

              {/* Floating Particles */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-white/20 rounded-full"
                  initial={{
                    x: Math.random() * 100 + "%",
                    y: Math.random() * 100 + "%",
                  }}
                  animate={{
                    y: ["0%", "100%", "0%"],
                    x: ["0%", "100%", "0%"],
                    opacity: [0.2, 0.6, 0.2],
                  }}
                  transition={{
                    duration: 10 + i * 2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  aria-hidden="true"
                />
              ))}

              {/* Content */}
              <div className="relative z-10 flex flex-col justify-between h-full p-10 lg:p-12 text-white">
                {/* Top Section */}
                <div>
                  {/* Brand Badge */}
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center gap-2 mb-6"
                  >
                    <div className="px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full border border-white/10 flex items-center gap-1.5">
                      <Shield className="w-3.5 h-3.5" />
                      <span className="text-xs font-medium">Trusted Platform</span>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <h2 className="text-[2.8rem] font-extrabold leading-[1.1] tracking-tight">
                      Transform Your
                      <br />
                      <span className="text-white/90">Future Abroad</span>
                    </h2>

                    <p className="mt-4 text-white/80 text-[15px] leading-relaxed max-w-xs">
                      Join thousands of students who've achieved their dream of
                      studying at top universities worldwide.
                    </p>
                  </motion.div>

                  {/* Testimonial Carousel */}
                  <motion.div
                    key={activeTestimonial}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5 }}
                    className="mt-6 p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/10"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                        <Star className="w-4 h-4 fill-white text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium leading-relaxed">
                          "{TESTIMONIALS[activeTestimonial].quote}"
                        </p>
                        <p className="text-xs text-white/60 mt-1">
                          — {TESTIMONIALS[activeTestimonial].author}
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Dots Indicator */}
                  <div className="flex gap-1.5 mt-3">
                    {TESTIMONIALS.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveTestimonial(idx)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          idx === activeTestimonial
                            ? "w-6 bg-white"
                            : "w-1.5 bg-white/30 hover:bg-white/50"
                        }`}
                        aria-label={`View testimonial ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Stats Section */}
                <div className="space-y-4">
                  {STATS.map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + i * 0.12, duration: 0.5 }}
                        className="flex items-center gap-4 group cursor-default"
                      >
                        <div className="w-12 h-12 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center shrink-0 border border-white/10 group-hover:bg-white/20 transition-colors duration-300">
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-2xl font-extrabold leading-none">
                            {stat.value}
                          </p>
                          <p className="text-white/60 text-sm mt-0.5 flex items-center gap-1">
                            {stat.label}
                            <span className="text-white/30 text-xs ml-1">
                              • {stat.detail}
                            </span>
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}

                  {/* Divider + Trust Badge */}
                  <div className="pt-4 border-t border-white/10">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 }}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2 text-white/50 text-xs">
                        <div className="flex -space-x-2">
                          {[...Array(4)].map((_, i) => (
                            <div
                              key={i}
                              className="w-6 h-6 rounded-full border-2 border-white/20 bg-white/10 backdrop-blur-sm flex items-center justify-center text-[8px] font-bold"
                            >
                              {String.fromCharCode(65 + i)}
                            </div>
                          ))}
                        </div>
                        <span>Join 10K+ students</span>
                      </div>
                      <div className="flex items-center gap-1 text-white/40 text-xs">
                        <span>Learn more</span>
                        <ChevronRight className="w-3 h-3" />
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </aside>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AuthDrawer;