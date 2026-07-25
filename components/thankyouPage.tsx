"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, Phone, Mail, MessageSquare, RotateCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import ConfettiEffect from "./conEeffect";

// Ooshas Prap - Thank You Page (Enhanced UI/UX)
const ThankYouPage = () => {
  const primaryColor = "#f26a44"; // Ooshas Prap brand color
  const successMessage = "Our counsellor will contact you within 24 hours.";
  const router = useRouter();

  // Restart function (simulate form reset)
  const restart = () => {
    // alert("Redirecting to form...");
    router.back();
    // window.location.href = "/form";
  };

  // Support options array for cleaner mapping
  const supportOptions = [
    { icon: Phone, label: "Call Us", delay: 0.4 },
    { icon: Mail, label: "Email Us", delay: 0.5 },
    { icon: MessageSquare, label: "Live Chat", delay: 0.6 },
  ];

  return (
    <section className="relative min-h-screen bg-slate-50 flex items-center justify-center p-4 overflow-hidden ">
      {/* Animated Background Blobs */}
      
      <ConfettiEffect trigger={true} />
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-1000"></div>

      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative max-w-md w-full bg-white rounded-3xl shadow-xl p-8 text-center border border-slate-100 z-10"
      >
        {/* Success Icon with Pulsing Ring */}
        <div className="relative w-20 h-20 mx-auto mb-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0.5 }}
            animate={{ scale: 1.4, opacity: 0 }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
            className="absolute inset-0 rounded-full border-2"
            style={{ borderColor: `${primaryColor}50` }}
          />
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="relative w-20 h-20 rounded-full flex items-center justify-center shadow-lg"
            style={{ background: `linear-gradient(135deg, ${primaryColor}, ${primaryColor}cc)` }}
          >
            <CheckCircle className="w-10 h-10 text-white" strokeWidth={2.5} />
          </motion.div>
        </div>

        {/* Text Content */}
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-3xl font-bold text-slate-900 mb-3 tracking-tight"
        >
          Thank You!
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-slate-500 mb-8 text-base leading-relaxed"
        >
          {successMessage}
        </motion.p>

        {/* Support Grid */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {supportOptions.map((option, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: option.delay }}
              className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer group"
            >
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center transition-transform group-hover:scale-110"
                style={{ background: `${primaryColor}15` }}
              >
                <option.icon className="w-5 h-5" style={{ color: primaryColor }} strokeWidth={2} />
              </div>
              <span className="text-xs font-medium text-slate-600">{option.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Call to Action Button */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={restart}
          className="w-full px-6 py-3 text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2"
          style={{ 
            background: `linear-gradient(135deg, ${primaryColor}, ${primaryColor}dd)`,
            // @ts-ignore - CSS custom property for ring color
            "--tw-ring-color": primaryColor 
          }}
        >
          <RotateCcw className="w-4 h-4" />
          Submit Another Enquiry
        </motion.button>
      </motion.div>
    </section>
  );
};

export default ThankYouPage;