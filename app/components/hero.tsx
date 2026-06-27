"use client";

import { Phone, ArrowRight, Play, Star, GraduationCap, Award, Trophy } from "lucide-react";
import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HomeCountUp } from '@/app/components/HomeCountUp';


// ─── Confetti Particle ───
function ConfettiParticle({ delay, x, duration, color, size, rotationEnd }: {
  delay: number; x: number; duration: number; color: string; size: number; rotationEnd: number;
}) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: `${x}%`,
        top: -10,
        width: size,
        height: size * 0.6,
        backgroundColor: color,
        borderRadius: 2,
      }}
      initial={{ opacity: 0, y: -20, rotate: 0, scale: 0 }}
      animate={{
        opacity: [0, 1, 1, 0],
        y: ["0vh", "110vh"],
        x: [0, (Math.random() - 0.5) * 120],
        rotate: [0, rotationEnd],
        scale: [0, 1, 1, 0.5],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        repeatDelay: Math.random() * 3 + 1,
        ease: "linear",
      }}
    />
  );
}

// ─── Floating Badge ───
function FloatingBadge({ icon: Icon, label, value, position, delay }: {
  icon: any; label: string; value: string; position: string; delay: number;
}) {
  const posClasses: Record<string, string> = {
    "top-left": "-top-4 -left-4 sm:top-20 sm:-left-8",
    "top-right": "-top-4 -right-4 sm:top-48 sm:-right-34",
    "bottom-left": "-bottom-4 -left-4 sm:-bottom-6 sm:-left-8",
    "bottom-right": "-bottom-4 -right-4 sm:-bottom-6 sm:-right-8",
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, type: "spring", stiffness: 200, damping: 15 }}
      className={`absolute ${posClasses[position]} z-20`}
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay }}
        className="bg-[#FEF9F] backdrop-blur-xl border border-white/15 rounded-2xl px-3.5 py-2.5 sm:px-4 sm:py-3 shadow-xl shadow-black/20"
      >
        <div className="flex items-center gap-2 sm:gap-2.5">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[#F36C45]/20 flex items-center justify-center">
            <Icon size={16} className="text-[#F36C45] sm:w-5 sm:h-5" />
          </div>
          <div>
            <p className="text-black font-bold text-sm sm:text-base leading-tight">{value}</p>
            <p className="text-gray-400 text-[10px] sm:text-xs">{label}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

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
  const [images, setImages] = useState<any[]>(student?.data || []);
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // AUTO SLIDE
  useEffect(() => {
    if (images.length === 0 || isPaused) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length, isPaused]);

  // Confetti config
  const confettiColors = ["#F36C45", "#ff8a65", "#FFD700", "#FF6B6B", "#4ECDC4", "#ffffff"];
  const confettiParticles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 6,
    duration: Math.random() * 4 + 5,
    color: confettiColors[i % confettiColors.length],
    size: Math.random() * 8 + 4,
    rotationEnd: Math.random() * 720 - 360,
  }));

  const sparkles = [
    { x: "10%", y: "15%", delay: 0, size: 14 },
    { x: "85%", y: "10%", delay: 1.5, size: 10 },
    { x: "75%", y: "70%", delay: 0.8, size: 12 },
    { x: "5%", y: "75%", delay: 2.2, size: 16 },
    { x: "50%", y: "5%", delay: 3, size: 8 },
    { x: "92%", y: "45%", delay: 1, size: 11 },
  ];

  return (
    <section className="relative overflow-hidden flex flex-col bg-[#FDF4EF]" style={{ backgroundImage: `url('/home/gridgb.png')` }}>

      {/* ─── Background Layer ─── */}
      {/* <div className="absolute inset-0 bg-[#3f3f3f]">
        
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f0f1e] via-[#1a1a2e] to-[#0f0f1e]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f0f1e] via-[#0f0f1e]/90 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f1e] via-transparent to-[#0f0f1e]/80" />
      </div> */}

      {/* ─── Confetti ─── */}
      {/* {mounted && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-[5]">
          {confettiParticles.map((p) => (
            <ConfettiParticle key={p.id} {...p} />
          ))}
        </div>
      )} */}

      {/* ─── Decorative Blurs ─── */}
      {/* <div className="absolute top-10 right-[10%] w-80 h-80 bg-[#F36C45]/8 rounded-full blur-[100px]" />
      <div className="absolute bottom-20 left-[5%] w-96 h-96 bg-[#F36C45]/5 rounded-full blur-[120px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#F36C45]/[0.03] rounded-full blur-[150px]" /> */}

      {/* ─── Main Content ─── */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 py-16 lg:py-0">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2  items-center">

            {/* ─── Left Content ─── */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="order-2 lg:order-1"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                className="inline-flex items-center gap-2.5 bg-[#F36C45]/10 border 
                border-[#F36C45]/20 rounded-full px-5 py-2 mb-7 backdrop-blur-sm"
              >
                <div className="relative flex">
                  <Star size={14} className="text-[#F36C45] fill-[#F36C45]" />
                  <motion.div
                    animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 bg-[#F36C45]/30 rounded-full"
                  />
                </div>
                <span className="text-[#F36C45] text-sm font-semibold tracking-wide">
                  Trusted by 10,000+ Students
                </span>
              </motion.div>

              {/* Title */}
              <div className="text-black font-bold leading-[1.08] tracking-tight">
                <div 
                  className="text-center text-lg sm:text-xl md:text-3xl lg:text-5xl" 
                  dangerouslySetInnerHTML={{ __html: data.fields.title }} 
                />

                <br />
                <span className="relative">
                  <span className=" text-black animate-gradient-x">
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
                className="mt-6 lg:mt-7 text-base sm:text-lg text-gray-900/90 leading-relaxed max-w-xl font-[300]"
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
                  className="group relative flex items-center justify-center gap-2.5 bg-[#F36C45] text-white rounded-2xl py-4 px-8 text-base sm:text-lg font-semibold transition-all duration-300 overflow-hidden"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-[#e05a34] to-[#ff8a65] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative flex items-center gap-2.5">
                    <Phone size={20} />
                    Book A Free Consultation
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                  {/* Glow */}
                  <span className="absolute inset-0 -z-10 rounded-2xl bg-[#F36C45]/30 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </motion.button>

                {/* <motion.button
                  type="button"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="group flex items-center justify-center gap-2.5 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/[0.15] text-white rounded-2xl py-4 px-8 text-base sm:text-lg font-medium transition-all duration-300 backdrop-blur-sm"
                >
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                    <Play size={14} className="fill-white ml-0.5" />
                  </div>
                  Watch Success Story
                </motion.button> */}
              </motion.div>

              {/* Trust Indicators */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="mt-10 flex items-center gap-5 bg-[#FEF9F5] p-4 w-fit"
              >
                <div className="flex -space-x-2.5 ">
                  {[
                    "from-[#F36C45] to-[#ff8a65]",
                    "from-[#4ECDC4] to-[#45B7AA]",
                    "from-[#FFD700] to-[#FFA500]",
                    "from-[#A78BFA] to-[#7C3AED]",
                  ].map((gradient, i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full border-2 border-[#0f0f1e] bg-gradient-to-br flex items-center justify-center text-white text-xs font-bold shadow-lg"
                      style={{ backgroundImage: `linear-gradient(135deg, var(--tw-gradient-stops))` }}
                    >
                      <span className={`bg-gradient-to-br ${gradient} bg-clip-text text-transparent`}>
                        {String.fromCharCode(65 + i)}
                      </span>
                    </div>
                  ))}
                  <div className="w-10 h-10 rounded-full border-2 border-[#0f0f1e] bg-white/10 flex items-center justify-center text-gray-400 text-xs font-semibold backdrop-blur-sm">
                    +9k
                  </div>
                </div>
                <div className="border-l border-white/10 pl-5 ">
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} size={13} className="text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-400 text-sm mt-0.5 font-light">4.9/5 from 2,000+ reviews</p>
                </div>
              </motion.div>
            </motion.div>


            <motion.div
              initial={{ opacity: 0, x: 60, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="order-1 lg:order-2 flex justify-center relative"
            >
              <div className="relative w-full max-w-[440px] lg:max-w-[500px]">
                {/* ─── Outer Glow Ring ─── */}
                {/* <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 m-auto w-[95%] h-[95%] rounded-full"
                >
                  <div className="w-full h-full rounded-full border border-dashed border-[#F36C45]/15" />
                </motion.div> */}
                {/* <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 m-auto w-[105%] h-[105%] rounded-full"
                >
                  <div className="w-full h-full rounded-full border border-dotted border-[#F36C45]/8" />
                </motion.div> */}

                {/* ─── Main Image Container ─── */}
                <div className="relative aspect-[3/4] sm:aspect-square hidden lg:block">
                  {/* Background glow */}
                  {/* <div className="absolute inset-0 m-auto w-[70%] h-[70%] bg-[#F36C45]/15 rounded-full blur-[80px]" /> */}

                  {/* Image frame */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="relative w-[120%] h-[130%] m-auto  overflow-hidden "
                  >
                    
                    <img
                      src={"/image/heroimg.png"}
                      alt="Graduate celebrating success"
                      className="w-full h-full object-cover object-top"
                    />
                    {/* Gradient overlays */}
                    {/* <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f1e]/80 via-transparent to-[#0f0f1e]/20" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0f0f1e]/30 to-transparent" /> */}

                    {/* Inner shine effect */}
                    {/* <motion.div
                      animate={{ x: ["-100%", "200%"] }}
                      transition={{ duration: 4, repeat: Infinity, repeatDelay: 5, ease: "easeInOut" }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12"
                    /> */}
                  </motion.div>

                  {/* ─── Floating Badges ─── */}
                  {/* <FloatingBadge
                    icon={GraduationCap}
                    label="Graduates"
                    value="10K+"
                    position="top-left"
                    delay={1.2}
                  /> */}
                  <FloatingBadge
                    icon={Trophy}
                    label="Top Scores"
                    value="95%+"
                    position="top-right"
                    delay={1.5}
                  />
                  {/* <FloatingBadge
                    icon={Award}
                    label="Success Rate"
                    value="98%"
                    position="bottom-right"
                    delay={1.8}
                  /> */}

                  {/* ─── Sparkles ─── */}
                  {sparkles.map((s, i) => (
                    <Sparkle key={i} {...s} />
                  ))}

                  {/* ─── Bottom Info Card (Slider) ─── */}
                  {/* {images.length > 0 && (
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={`info-${index}`}
                        initial={{ opacity: 0, y: 30, x: -20 }}
                        animate={{ opacity: 1, y: 0, x: 0 }}
                        exit={{ opacity: 0, y: 20, x: 20 }}
                        transition={{ duration: 0.5, delay: 0.15 }}
                        className="absolute bottom-2 sm:bottom-0 left-0 right-0 m-auto w-[88%] z-20"
                      >
                        <div className="bg-[#1a1a2e]/80 backdrop-blur-2xl rounded-2xl p-4 border border-white/[0.08] shadow-2xl shadow-black/30">
                          <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3 min-w-0">
                              
                              <div className="w-11 h-11 rounded-xl overflow-hidden flex-shrink-0 ring-2 ring-[#F36C45]/30">
                                {images[index]?.image ? (
                                  <img src={images[index].image} alt="" className="w-full h-full object-cover" />
                                ) : (
                                  <div className="w-full h-full bg-gradient-to-br from-[#F36C45] to-[#ff8a65]" />
                                )}
                              </div>
                              <div className="min-w-0">
                                <h3 className="text-white font-bold text-sm sm:text-base truncate">
                                  {images[index]?.name || "Student"}
                                </h3>
                                <p className="text-gray-400 text-xs sm:text-sm truncate">
                                  {images[index]?.course || "Course"}
                                </p>
                              </div>
                            </div>
                            <div className="text-right flex-shrink-0">
                              <p className="text-[#F36C45] font-extrabold text-xl sm:text-2xl tabular-nums">
                                {images[index]?.score || "0"}
                              </p>
                              <p className="text-gray-500 text-[10px] sm:text-xs uppercase tracking-widest font-medium">
                                Score
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex justify-center gap-1.5 mt-3">
                            {images.map((_, i) => (
                              <button
                                key={i}
                                onClick={() => setIndex(i)}
                                className={`h-1 rounded-full transition-all duration-300 ${
                                  i === index
                                    ? "w-6 bg-[#F36C45]"
                                    : "w-1.5 bg-white/20 hover:bg-white/40"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  )} */}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>


      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="relative z-10 pb-6 lg:pb-10"
      >
        <HomeCountUp data={data} />
      </motion.div>
      
      <style jsx global>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          animation: gradient-x 4s ease infinite;
        }
      `}</style>
    </section>
  );
}








// "use client";

// import { Phone } from "lucide-react";
// import { useEffect, useRef, useState } from "react";
// import { motion } from "framer-motion";

// import CountUp from "react-countup";



// type HeroProps = {
//   data: {
//     fields: {
//       title: string;
//       subtitle: string;
//       paragraph: string;
//       students : any;
//     };
//   };
// };


// export function Hero({data}:HeroProps) {
//   const bookCallRef = useRef<HTMLButtonElement>(null);
//   const callUsRef = useRef<HTMLButtonElement>(null);
//   const [isDesktop, setIsDesktop] = useState(false);
// const [images,setimages] = useState<any[]>([
//   {
//               "student": "Ankit ",
//               "course": "Act",
//               "score": "0",
//               "studentImg": "https://res.cloudinary.com/drsainihk/image/upload/v1776831639/cway-admin/xhzumiirdnxawaccrwr8.jpg",
//               "experience": "Years of Experience || 20",
//               "Happystudent": "Happy Students || 3000",
//               "Rating": "Overall Rating || 4",
//               "Lectured": "Total Hours Lectured || 20000"
//   },
// ]);
//   const [index, setIndex] = useState(0);

//   // AUTO SLIDE
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setIndex((prev) => (prev + 1) % images.length);
//     }, 3000);

//     return () => clearInterval(interval);
//   }, []);

//   useEffect(() => {
//     const checkDesktop = () => {
//       setIsDesktop(window.innerWidth >= 1024);
//     };

//     // Initial check
//     checkDesktop();

//     // Set initial transforms for desktop
//     if (isDesktop) {
//       if (bookCallRef.current) {
//         bookCallRef.current.style.transform = "rotateY(37deg)";
//       }
//       if (callUsRef.current) {
//         callUsRef.current.style.transform = "rotateY(25deg)";
//       }
//     }

//     // Listen for resize
//     window.addEventListener("resize", checkDesktop);

//     return () => {
//       window.removeEventListener("resize", checkDesktop);
//     };
//   }, [isDesktop]);

//   return (
//     <section
//       className=" relative overflow-hidden bg-gray-50 
//       bg-[url('/image/bg.jpeg')]
//       bg-cover
//       bg-center
//       bg-no-repeat 
//       flex gap-12 items-center justify-center flex-wrap h-auto "
//     >
//       <div className={`h-[22rem]  lg:h-[30rem] mx-auto m-6 flex flex-col lg:flex-row  items-center gap-6 md:gap-10 max-w-7xl`}>
//         {/* Left Content Section */}
//         <div className="lg:w-[70%] w-full pt-20">
//           <div className="">
//             <h1 className="text-2xl  md:text-3xl lg:text-5xl font-bold leading-tight text-white">
//               {data.fields.title || ``}
//             </h1>

//             <h1 className="text-xl  md:text-2xl lg:text-4xl font-semibold leading-tight text-white mt-4">
//               {data.fields.subtitle ||""}
//             </h1>

//             <p className=" mt-2 md:mt-4 leading-relaxed text-lg text-white font-medium">
//              {data.fields.paragraph || ``}
//             </p>
//           </div>

//           <button
//             type="button"
//             className="flex gap-2 bg-white text-[#F36C45] py-2 text-xl font-bold mt-10 px-4 rounded-md hover:bg-gray-200 transition-colors"
//           >
//             <Phone /> Book A Free Consultation
//           </button>
//         </div>


//         <div className="lg:w-1/2 w-full flex flex-col gap-4">
//           {/* IMAGE SLIDER */}
//            <div className="relative w-[22rem] h-[22rem] lg:w-[25rem] lg:h-[25rem] mx-auto">
            


//               <div className="w-full  ">
//                 <div className="mx-auto relative w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] lg:w-[450px] lg:h-[450px]">
//                   <div className="lg:relative lg:w-[92%] lg:h-[91%]">
//                     <div
//                       className="absolute inset-0 z-10 lg:w-[335px] lg:h-[335px] lg:top-[41px] lg:left-[38px]"
//                       style={{
//                         backgroundImage: `url(${images?.[index]?.studentImg})`,
//                         backgroundSize: "cover",
//                         backgroundPosition: "center",
//                         // width: "335px",
//                         // height: "335px",
//                         borderRadius: "100px",
//                       }}
//                     />
//                     <img
//                       src="/home/round.png"
//                       alt="frame"
//                       className="hidden lg:block absolute inset-0 w-full h-full z-20 pointer-events-none"
//                     />
//                   </div>
//                 </div>
//               </div>


//             <div
//               style={{
//                 backgroundImage: `url('/hero-r-removebg-preview.png')`,
//                 backgroundSize: "cover",
//                 backgroundPosition: "center",
//                 // width: "24rem",
//                 height: "7rem",
//                 // borderRadius: "93px",
//               }}
//               className="flex gap-4 lg:w-[24rem] w-full items-center justify-around capitalize mb-10"
//             >
//               <h2 className="text-2xl font-bold text-white">
//                 {images[index].student}
//               </h2>
//               <ul className="text-lg text-white">
//                 <li>{images[index].course}</li>
//                 <li className="text-3xl font-extrabold text-center">
//                   {images[index]?.score}
//                 </li>
//               </ul>
//             </div>
//           </div> 
          
//         </div>
//       </div>

//       {/* 3D Buttons */}
//       <div>
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="flex flex-wrap my-20 mx-20 gap-16"
//           transition={{ duration: 0.6, delay: 0.2 }}
         
//         >
//           {['experience','Happystudent','Rating','Lectured'].map((ele, idx) => (
//             <div key={idx} className="relative min-w-[18rem]">
//               <div className="absolute  w-full h-full border-2 border-[#F36C45] rounded-[26px] -rotate-5 " />
//               <div className="bg-white p-4 rounded-[26px] text-center shadow-sm relative">
//                 <h2 className="text-4xl font-bold text-[#F36C45] mb-2">
//                   <CountUp end={parseInt(images[index]?.[ele]?.split("||")[1])} duration={1} />
//                   {ele === "Rating" ? '.8/5': "+"}
//                 </h2>
//                 <p className="text-gray-600 text-xl">{images[index]?.[ele]?.split("||")[0]}</p>
//               </div>
//             </div>
//           ))}
//         </motion.div>
//       </div>
//     </section>
//   );
// }

