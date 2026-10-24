"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Globe2,
  Mail,
  MapPin,
  Phone,
  Send,
  User,
  X,
  ChevronDown,
  Check,
} from "lucide-react";
import { useState } from "react";
import FormSection from "./formSection";
import axiosInstance from "@/app/lib/axios";
import toast from "react-hot-toast";

interface PopupModalProps {
  isPopupOpen: boolean;
  setIsPopupOpen: (value: boolean) => void;
  onClose?: () => void;
}

export default function PopupModal({
  isPopupOpen,
  setIsPopupOpen,
  onClose,
}: PopupModalProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    state: "",
    city: "",
    country: "Study In Italy",
    consent: false,
  });

  if (!isPopupOpen) return null;

  const handleClose = () => {
    setIsPopupOpen(false);
    if (onClose) {
      onClose();
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post("/admin/formDetails", formData);
      console.log("Consultation form:", formData);
      toast.success("Form submitted Successfully");
      handleClose();
    } catch (err) {
      toast.error("Something went wrong", err);
    }

    // Add your API call here

    // Optional: window.location.href = "/thank-you";
  };

  const FORM_CONFIG: any = {
    steps: [
      {
        step: 1,
        title: "",
        icon: User,
        fields: ["fullName", "email", "phone", "city", "source"],
        button: "submit",
      },
    ],
    fields: [
      {
        name: "fullName",
        label: "Full Name",
        type: "text",
        required: true,
        placeholder: "Priya",
        step: 1,
        grid: "half",
        icon: User,
      },
      {
        name: "phone",
        label: "Phone Number",
        type: "tel",
        required: true,
        placeholder: "+91 98765 43210",
        step: 1,
        grid: "half",
        icon: Phone,
      },
      {
        name: "email",
        label: "Email Address",
        type: "email",
        required: true,
        placeholder: "priya@email.com",
        step: 1,
        grid: "full",
        icon: Mail,
      },

      {
        name: "city",
        label: "City",
        type: "text",
        required: false,
        placeholder: "Jaipur",
        step: 1,
        grid: "full",
        icon: MapPin,
      },
      {
        name: "notes",
        label: "Additional Notes",
        type: "textarea",
        required: false,
        placeholder: "Any specific requirements or questions...",
        step: 1,
        grid: "full",
      },
    ],
    submit: {
      label: "Book Consultation",
      icon: Send,
      variant: "primary",
      size: "large",
      position: "bottom",
      onSuccess: {
        message: "Thank you! Our team will reach out to you shortly.",
        redirect: "/thank-you",
      },
    },
  };

  return (
    <AnimatePresence>
      {isPopupOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/20 p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl max-h-[85vh] overflow-hidden rounded-3xl bg-white shadow-xl"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={handleClose}
              aria-label="Close consultation popup"
              className="absolute right-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-slate-600 backdrop-blur-sm transition-all hover:bg-white hover:text-slate-900 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500/50 shadow-sm"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex max-h-[85vh] flex-col lg:flex-row">
              {/* =========================================================
                  LEFT PANEL (Hidden on Mobile, visible on Desktop)
              ========================================================== */}
              <div className="relative hidden w-[40%] flex-shrink-0 flex-col overflow-hidden bg-gradient-to-br from-[#FFF6F1] to-[#FFE8DA] p-8 lg:flex">
                {/* Decorative abstract shapes */}
                <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-orange-200/50 blur-xl" />
                <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-orange-100/30 blur-xl" />

                <div className="relative z-10">
                  <h2 className="text-3xl font-semibold leading-tight tracking-tight text-slate-800">
                    Guidance for Your
                  </h2>
                  <h3 className="mt-1 text-3xl font-semibold leading-tight tracking-tight text-[#F36C45]">
                    Dream Career
                  </h3>
                </div>

                {/* Benefits */}
                <div className="relative z-10 mt-6 space-y-6">
                  <Benefit
                    title="Trusted by 300,000+ Learners"
                    description="Join a thriving community of students pursuing education."
                  />
                  <Benefit
                    title="360° Expert Support at Every Step"
                    description="End-to-end guidance from application to admission."
                  />
                  <Benefit
                    title="Access 100+ Test Series"
                    description="Explore top universities across the world."
                  />
                </div>

                {/* Decorative Bottom Badge */}
                <div className="flex h-48 w-48 items-center justify-center">
                  <img src="/home/00023.png" alt="" />
                </div>
              </div>

              {/* =========================================================
                  RIGHT FORM PANEL
              ========================================================== */}
              <div className="flex w-full min-w-0 flex-1 h-full flex-col bg-white">
                <div className="p-8">
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold tracking-tight text-slate-700">
                      Book Your Free Consultation
                    </h2>
                    <p className="mt-px text-sm text-slate-500">
                      Fill in your details and our expert counselors will reach
                      out to you shortly.
                    </p>
                  </div>

                  <FormSection
                    FORM_CONFIG={FORM_CONFIG}
                    onSubmitted={handleClose}
                  />
                  {/* <form onSubmit={handleSubmit} className="space-y-5">
                    
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <FormField
                        label="Full Name"
                        required
                        icon={<User />}
                        name="fullName"
                        value={formData.fullName}
                        placeholder="John Doe"
                        onChange={handleChange}
                      />
                      <FormField
                        label="Mobile Number"
                        required
                        icon={<Phone />}
                        name="phone"
                        value={formData.phone}
                        placeholder="Enter 10-digit number"
                        type="tel"
                        onChange={handleChange}
                      />
                    </div>

                    
                    <FormField
                      label="Email ID"
                      required
                      icon={<Mail />}
                      name="email"
                      value={formData.email}
                      placeholder="johndoe@example.com"
                      type="email"
                      onChange={handleChange}
                    />


                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <FormField
                        label="State"
                        required
                        icon={<MapPin />}
                        name="state"
                        value={formData.state}
                        placeholder="Your state"
                        onChange={handleChange}
                      />
                      <FormField
                        label="City"
                        required
                        icon={<MapPin />}
                        name="city"
                        value={formData.city}
                        placeholder="Your city"
                        onChange={handleChange}
                      />
                    </div>
                    
                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-700">
                        Country to Study <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Globe2 className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                        <select
                          name="country"
                          value={formData.country}
                          onChange={handleChange}
                          required
                          className="h-[52px] w-full appearance-none rounded-xl border border-slate-200 bg-white pl-12 pr-12 text-base text-slate-800 outline-none transition focus:border-[#F36C45] focus:ring-4 focus:ring-orange-500/10 hover:border-slate-300"
                        >
                          <option>Study In Italy</option>
                          <option>Study In UK</option>
                          <option>Study In USA</option>
                          <option>Study In Canada</option>
                          <option>Study In Australia</option>
                          <option>Study In Germany</option>
                          <option>Study In France</option>
                          <option>Study In Ireland</option>
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                      </div>
                    </div>

                    
                    <label className="flex cursor-pointer items-start gap-3 pt-2 text-sm text-slate-600">
                      <input
                        type="checkbox"
                        name="consent"
                        checked={formData.consent}
                        onChange={handleChange}
                        className="mt-[2px] h-5 w-5 flex-shrink-0 cursor-pointer rounded border-slate-300 text-[#F36C45] transition focus:ring-orange-500/20"
                        required
                      />
                      <span className="leading-relaxed">
                        I agree to receive information about study abroad programs, scholarships, and updates.
                      </span>
                    </label>

                    
                    <button
                      type="submit"
                      className="mt-4 flex h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-[#F96B47] px-6 text-base font-bold text-white shadow-lg shadow-orange-500/30 transition-all hover:bg-[#ed5e3b] hover:shadow-xl hover:shadow-orange-500/40 active:scale-[0.99] focus:outline-none focus:ring-4 focus:ring-orange-500/30"
                    >
                      <span>Book Free Consultation</span>
                      <Send className="h-4 w-4" />
                    </button>
                  </form> */}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Benefit({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-3">
      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white">
        <Check className="h-4 w-4 text-[#F36C45]" />
      </div>
      <div>
        <h4 className="text-base font-semibold leading-tight text-slate-800">
          {title}
        </h4>
        <p className="mt-1 text-sm font-medium leading-relaxed text-slate-600">
          {description}
        </p>
      </div>
    </div>
  );
}

/* =============================================================
   FORM FIELD
============================================================= */
function FormField({
  label,
  required,
  icon,
  name,
  value,
  placeholder,
  type = "text",
  onChange,
}: {
  label: string;
  required?: boolean;
  icon: React.ReactNode;
  name: string;
  value: string;
  placeholder: string;
  type?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 [&>svg]:h-5 [&>svg]:w-5">
          {icon}
        </span>
        <input
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className="h-[52px] w-full rounded-xl border border-slate-200 bg-white pl-12 pr-4 text-base text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-[#F36C45] focus:ring-4 focus:ring-orange-500/10 hover:border-slate-300"
        />
      </div>
    </div>
  );
}
