"use client";

import { Phone, ArrowRight, Play, Star, GraduationCap, Award, Trophy, User, Mail, MapPin, Calendar, BookOpen, Target, Calendar as CalendarIcon, Book, FileText, PenTool, TrendingUp, Briefcase, Calculator, Headphones, MessageSquare, Hash, Send, X } from "lucide-react";
import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HomeCountUp } from '@/app/components/HomeCountUp';
import FormSection from "./formSection";

// ─── Sparkle ───
function Sparkle({ x, y, delay, size }: { x: string; y: string; delay: number; size: number }) {
  return (
    <motion.div
      className="absolute pointer-events-none z-30"
      style={{ left: x, top: y }}
      initial={{ opacity: 0, scale: 0, rotate: 0 }}
      animate={{
        opacity: [0, 1, 0],
        scale: [0, 1.2, 0],
        rotate: [0, 180],
      }}
      transition={{
        duration: 2,
        delay,
        repeat: Infinity,
        repeatDelay: Math.random() * 2 + 1,
      }}
    >
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M12 2L14.09 8.26L20 9.27L15.55 13.97L16.91 20L12 16.9L7.09 20L8.45 13.97L4 9.27L9.91 8.26L12 2Z" fill="#F36C45" fillOpacity="0.8" />
      </svg>
    </motion.div>
  );
}

type HeroProps = {
  data: {
    fields: {
      title: string;
      subtitle: string;
      paragraph: string;
      students: any;
    };
  };
  student: any;
};

// ─── Form Configuration ───
const FORM_CONFIG: any = {
  steps: [
    {
      step: 1,
      title: "Share Your Info ",
      icon: User,
      fields: ["fullName", "email", "phone", "city", "source"],
      button: "submit"
    }
  ],
  fields: [
    {
      name: "fullName",
      label: "Full Name",
      type: "text",
      required: true,
      placeholder: "Priya",
      step: 1,
      grid: "full",
      icon: User
    },
    {
      name: "email",
      label: "Email Address",
      type: "email",
      required: true,
      placeholder: "priya@email.com",
      step: 1,
      grid: "full",
      icon: Mail
    },
    {
      name: "phone",
      label: "Phone Number",
      type: "tel",
      required: true,
      placeholder: "+91 98765 43210",
      step: 1,
      grid: "full",
      icon: Phone
    },
    {
      name: "city",
      label: "City",
      type: "text",
      required: false,
      placeholder: "Jaipur",
      step: 1,
      grid: "half",
      icon: MapPin
    },
   
    {
      name: "source",
      label: "How did you hear about us?",
      type: "select",
      required: false,
      step: 1,
      grid: "half",
      options: [
        { value: "", label: "Select source" },
        { value: "Google Search", label: "Google Search" },
        { value: "Instagram", label: "Instagram" },
        { value: "Facebook", label: "Facebook" },
        { value: "YouTube", label: "YouTube" },
        { value: "Friend Referral", label: "Friend Referral" },
        { value: "Education Fair", label: "Education Fair" },
        { value: "Walk-in", label: "Walk-in" },
        { value: "Other", label: "Other" }
      ]
    }
  ],
  submit: {
    label: "Book Consultation",
    icon: Send,
    variant: "primary",
    size: "large",
    position: "bottom",
    onSuccess: {
      message: "Thank you! Our team will reach out to you shortly.",
      redirect: "/thank-you"
    }
  }
};

export function Hero({ data, student }: HeroProps) {
  const [index, setIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent body scroll when popup is open
  useEffect(() => {
    if (isPopupOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isPopupOpen]);

  const sparkles = [
    { x: "10%", y: "15%", delay: 0, size: 14 },
    { x: "85%", y: "10%", delay: 1.5, size: 10 },
    { x: "75%", y: "70%", delay: 0.8, size: 12 },
    { x: "5%", y: "75%", delay: 2.2, size: 16 },
    { x: "50%", y: "5%", delay: 3, size: 8 },
    { x: "92%", y: "45%", delay: 1, size: 11 },
  ];

  return (
    <section className=" overflow-hidden flex flex-col bg-[#FDF4EF]" style={{ backgroundImage: `url('/home/gridgb.png')` }}>
    
      {/* ─── Main Content ─── */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 py-16 lg:py-0">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center mt-2">

            {/* ─── Left Content ─── */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="order-2 lg:order-1"
            >
              {/* Title */}
              <div className="">
                <h1 className="text-left text-lg sm:text-xl md:text-3xl lg:text-5xl font-bold leading-14">
                  {data.fields.title?.split("||")[0]}
                  <span className="text-primary">{data.fields.title?.split("||")[1]}</span>
                  {data.fields.title?.split("||")[2]}
                </h1>

                {/* <br /> */}
                <span className="relative">
                  <span className="text-black animate-gradient-x">
                    {data.fields.subtitle || ""}
                  </span>
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
                    className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-[#F36C45] to-transparent rounded-full origin-left"
                  />
                </span>
              </div>

              {/* Paragraph */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="mt-4 lg:mt-6 text-base sm:text-lg leading-relaxed max-w-xl font-[300]"
              >
                {data.fields.paragraph || ""}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="mt-9 lg:mt-11 flex flex-col sm:flex-row gap-4"
              >
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsPopupOpen(true)}
                  className="group relative flex items-center justify-center gap-2.5 bg-[#F36C45] text-white rounded-2xl py-4 px-8 text-base sm:text-lg font-semibold transition-all duration-300 overflow-hidden"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-[#e05a34] to-[#ff8a65] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative flex items-center gap-2.5">
                    <Phone size={20} />
                    Book A Free Consultation
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                  <span className="absolute inset-0 -z-10 rounded-2xl bg-[#F36C45]/30 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </motion.button>
              </motion.div>
            </motion.div>

            {/* ─── Right Image ─── */}
            <motion.div
              initial={{ opacity: 0, x: 60, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="order-1 lg:order-2 flex justify-center relative"
            >
              <div className="relative w-full max-w-[440px] lg:max-w-[500px]">
                <div className="relative aspect-[3/4] sm:aspect-square hidden lg:block">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="relative w-[120%] h-[100%] m-auto overflow-hidden"
                  >
                    <img
                      src={"/home page hero image.webp"}
                      alt="Graduate celebrating success"
                      className="w-full h-[85%] object-contain object-end mt-16"
                    />
                  </motion.div>

                  {/* Sparkles */}
                  {sparkles.map((s, i) => (
                    <Sparkle key={i} {...s} />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ─── Stats ─── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="relative z-10 pb-6 lg:pb-10"
      >
        <HomeCountUp data={data} />
      </motion.div>

      {/* ─── Popup Modal ─── */}
      <AnimatePresence>
        {isPopupOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsPopupOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="relative bg-gradient-to-r from-[#F36C45] to-[#e05a34] px-6 py-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-white">Book a Free Consultation</h2>
                    <p className="text-white/80 text-sm mt-1">Fill in your details and our team will reach out</p>
                  </div>
                  <button
                    onClick={() => setIsPopupOpen(false)}
                    className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 transition-all flex items-center justify-center text-white hover:scale-110"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Form Body */}
              <div className="p-6 max-h-[70vh] overflow-y-auto">
                <FormSection FORM_CONFIG={FORM_CONFIG} onSubmitted={() => setIsPopupOpen(false)} />
              </div>

              {/* Footer */}
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                <span>🔒 Your information is secure</span>
                <span>⏱️ Response within 24 hours</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <style jsx global>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          animation: gradient-x 4s ease infinite;
        }

        /* Custom scrollbar for popup */
        .max-h-\\[70vh\\]::-webkit-scrollbar {
          width: 4px;
        }
        .max-h-\\[70vh\\]::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .max-h-\\[70vh\\]::-webkit-scrollbar-thumb {
          background: #F36C45;
          border-radius: 10px;
        }
        .max-h-\\[70vh\\]::-webkit-scrollbar-thumb:hover {
          background: #e05a34;
        }
      `}</style>
    </section>
  );
}