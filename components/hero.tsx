"use client";

import { Phone, ArrowRight, Play, Star, GraduationCap, Award, Trophy, User, Mail, MapPin, Calendar, BookOpen, Target, Calendar as CalendarIcon, Book, FileText, PenTool, TrendingUp, Briefcase, Calculator, Headphones, MessageSquare, Hash, Send, X } from "lucide-react";
import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HomeCountUp } from '@/components/HomeCountUp';
import FormSection from "./formSection";
import PopupModal from "./popupModel";

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
                <h1 className="text-left text-2xl md:text-3xl lg:text-5xl font-bold md:leading:7 lg:leading-14">
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
                className="mt-4 lg:mt-6 text-base sm:text-lg leading-relaxed max-w-xl font-[300] text-justify"
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
      <PopupModal isPopupOpen={isPopupOpen} setIsPopupOpen={setIsPopupOpen}/>
      
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
