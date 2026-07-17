"use client";

import React, {
  useRef,
  useEffect,
  useState,
  TouchEvent,
  useCallback,
} from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface ThreeDCarouselItem {
  _id: string;
  name: string;
  image: string;
  course: string;
  score: string;
  // Optional fields for backward compatibility
  title?: string;
  brand?: string;
  description?: string;
  tags?: string[];
  link?: string;
}

interface AboutResultProps {
  data: {
    data: ThreeDCarouselItem[];
  };
  autoRotate?: boolean;
  rotateInterval?: number;
  cardHeight?: number;
}

// Color gradients for each card based on test type
const getGradientColors = (course: string) => {
  const gradients: Record<string, string> = {
    IELTS: "from-orange-500 to-amber-400",
    GMAT: "from-orange-600 to-amber-500",
    GRE: "from-orange-600 to-amber-500",
    SAT: "from-orange-500 to-amber-400",
  };

  // Find matching gradient or return default
  for (const [key, value] of Object.entries(gradients)) {
    if (course.toLowerCase().includes(key.toLowerCase())) {
      return value;
    }
  }
  return "from-indigo-500 to-blue-400";
};

export const Aboutresult = ({
  data,
  autoRotate = true,
  rotateInterval = 4000,
  cardHeight = 350,
}: AboutResultProps) => {
  const [active, setActive] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Ensure data exists and has items
  const items = data?.data?.length
    ? [...data.data, ...data.data, ...data.data]
    : [];
  const totalItems = items.length;
  const minSwipeDistance = 50;

  // Navigation functions
  const goToNext = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setActive((prev) => (prev + 1) % totalItems);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [totalItems, isTransitioning]);

  const goToPrev = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setActive((prev) => (prev - 1 + totalItems) % totalItems);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [totalItems, isTransitioning]);

  const goToSlide = useCallback(
    (index: number) => {
      if (isTransitioning || index === active) return;
      setIsTransitioning(true);
      setActive(index);
      setTimeout(() => setIsTransitioning(false), 500);
    },
    [active, isTransitioning],
  );

  // Auto-rotate effect
  useEffect(() => {
    if (totalItems === 0) return;

    if (autoRotate && isInView && !isHovering) {
      const interval = setInterval(() => {
        goToNext();
      }, rotateInterval);
      return () => clearInterval(interval);
    }
  }, [isInView, isHovering, autoRotate, rotateInterval, totalItems, goToNext]);

  // Intersection Observer
  useEffect(() => {
    if (!carouselRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.2 },
    );

    observer.observe(carouselRef.current);
    return () => observer.disconnect();
  }, []);

  // Touch handlers
  const onTouchStart = (e: TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setTouchEnd(null);
  };

  const onTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) {
      goToNext();
    } else if (distance < -minSwipeDistance) {
      goToPrev();
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isInView) return;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        goToNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goToPrev();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isInView, goToNext, goToPrev]);

  // Get card position classes based on active index
  const getCardAnimationClass = (index: number) => {
    if (totalItems === 0) return "opacity-0";

    // Calculate relative position (cyclic)
    const diff = (((index - active) % totalItems) + totalItems) % totalItems;

    if (diff === 0) {
      return "scale-100 opacity-100 z-20 translate-x-0";
    } else if (diff === 1) {
      return "translate-x-[100%] scale-90 opacity-60 z-10";
    } else if (diff === totalItems - 1) {
      return "translate-x-[-100%] scale-90 opacity-60 z-10";
    } else {
      return "scale-90 opacity-0 pointer-events-none";
    }
  };

  // Early return if no items
  if (totalItems === 0) {
    return (
      <section className="bg-transparent min-w-full flex items-center justify-center p-8">
        <div className="text-center text-gray-500">
          <p>No items to display</p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="ThreeDCarousel"
      className="bg-transparent w-full flex items-center justify-center py-8"
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div
          className="relative overflow-hidden"
          style={{ height: `${cardHeight + 80}px` }}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          ref={carouselRef}
        >
          {/* Navigation Arrows */}
          <button
            onClick={goToPrev}
            className="absolute left-2 top-[35%] z-30 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-gray-400"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-2 top-[35%] z-30 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-gray-400"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>

          {/* Carousel Items */}
          <div className="absolute inset-0 flex items-center justify-center">
            {items.map((item, index) => {
              const gradientClass = getGradientColors(item.course);

              return (
                <div
                  key={`${item._id}-${index}`}
                  className={`absolute top-0 w-[280px] max-w-[90%] transform transition-all duration-500 ease-in-out ${getCardAnimationClass(
                    index,
                  )}`}
                  style={{ height: `${cardHeight}px` }}
                >
                  <div className="overflow-hidden bg-white shadow-lg hover:shadow-xl flex flex-col h-full  transition-shadow duration-300">
                    <div
                      className={`relative bg-[#FE8E6D] flex flex-col items-center justify-center h-[85%] m-3 overflow-hidden`}
                    >
                      <img
                        src={item?.image}
                        className="h-full w-full object-cover mx-auto bg-[#FE8E6D] group-hover:scale-105 transition-transform duration-500"
                        alt={item?.name}
                      />
                      {/* Exam Type Badge */}
                      <span className="absolute bottom-0 left-0 w-full text-sm text-center font-bold bg-[#000] text-white px-2.5 py-1.5">
                        {item?.course || "NEET - UG '25"}
                      </span>
                    </div>

                    <div className="text-left mt-2 capitalize px-6 pb-2">
                      <p className="font-bold text-base sm:text-lg break-words text-gray-800 leading-tight">
                        {item?.name}
                      </p>
                      <div className="flex flex-col items-start justify-between mt-1">
                        <span className="font-medium text-xs sm:text-sm text-gray-500 truncate">
                          Standardized Test Results
                        </span>
                        <span className="font-medium text-xs sm:text-sm text-gray-500 truncate">
                          Score
                        </span>
                        <span className="text-[#f26e46] m-0 p-0 font-bold text-2xl  md:text-3xl transition-colors duration-200">
                          {item?.score}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dots Indicator */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-center items-center space-x-3 z-30 py-4">
            {items.slice(0, Math.min(totalItems, 10)).map((_, idx) => (
              <button
                key={idx}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  active === idx
                    ? "bg-gray-700 w-6"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                onClick={() => goToSlide(idx)}
                aria-label={`Go to item ${idx + 1}`}
              />
            ))}
            {totalItems > 10 && (
              <span className="text-xs text-gray-400">+{totalItems - 10}</span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

// // Aboutresult.tsx
// "use client";

// import { motion } from "framer-motion";
// import { Stars } from "lucide-react";

// export function Aboutresult({ data }: { data: any }) {
//   if (!data || !data.data) return null;
//   console.log("Aboutresult data:", data);

//   // Duplicate the data for seamless infinite loop
//   const duplicatedData = [...data.data, ...data.data, ...data.data];

//   return (
//     <section className="py-10 md:py-12  bg-[#fff] overflow-hidden font-['Open_Sans','Helvetica_Neue',Arial,sans-serif]" id="about">
//       {/* Heading */}
//       <div className="text-center mb-8 px-4">
//         <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 flex items-center justify-center gap-3">
//           Meet our stars{" "}
//           <Stars className="w-8 h-8 md:w-10 md:h-10 text-[#f26e46] fill-[#f26e46]" />
//         </h2>
//         <p className="text-gray-500 mt-3 text-base md:text-lg">
//           Our students who made us proud
//         </p>
//       </div>

//       {/* Slider Container */}
//       <div className="relative max-w-8xl bg-[#FFB399] mx-auto overflow-hidden">
//         {/* Left Fade Overlay */}

//         {/* <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 md:w-32 lg:w-40 bg-gradient-to-r from-[#FFB399] via-[#EAEAEAbb] to-transparent z-10 pointer-events-none" />

//         <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 md:w-32 lg:w-40 bg-gradient-to-l from-[#EAEAEA] via-[#EAEAEAbb] to-transparent z-10 pointer-events-none" /> */}

//         {/* Scrolling Track */}
//         <div className="flex w-max animate-marquee bg-[#FFB399] p-10">
//           {duplicatedData.map((ele: any, idx: number) => (
//             <motion.div
//               key={`${ele._id || ele.id || 'slide'}-${idx}`}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ amount: 0.1 }}
//               transition={{
//                 duration: 0.5,
//                 delay: (idx % data.data.length) * 0.08,
//               }}
//               className="flex-shrink-0 w-[200px] sm:w-[220px] mx-1 sm:mx-2"
//             >
//               <div className="shadow-md hover:shadow-xl transition-shadow duration-300 p-4 bg-white rounded-lg group cursor-pointer">
//                 {/* Image */}
//                 <div className="relative overflow-hidden rounded">
//                   <img
//                     src={ele?.image}
//                     className="h-44 w-full object-cover mx-auto bg-[#FEFBEA] group-hover:scale-105 transition-transform duration-500"
//                     alt={ele?.name}
//                   />
//                   {/* Exam Type Badge */}
//                   <span className="absolute bottom-0 left-0 w-full text-sm text-center font-bold bg-[#000] text-white px-2.5 py-1.5">
//                     {ele?.course || ele?.exam_type || "NEET - UG '25"}
//                   </span>
//                 </div>

//                 {/* Info */}
//                 <div className="text-left mt-2 capitalize px-1">
//                   <p className="font-bold text-base sm:text-lg break-words text-gray-800 leading-tight">
//                     {ele?.name}
//                   </p>
//                   <div className="flex flex-col items-start justify-between mt-1">
//                     <span className="font-medium text-xs sm:text-sm text-gray-500 truncate">
//                       Standardized Test Results
//                     </span>
//                     <span className="font-medium text-xs sm:text-sm text-gray-500 truncate">
//                       Score
//                     </span>
//                     <span className="text-[#f26e46] m-0 p-0 font-bold text-2xl  md:text-3xl transition-colors duration-200">
//                       {ele?.score}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>

//       {/* <ExploreCourses /> */}

//       <style jsx>{`
//         @keyframes marquee {
//           0% {
//             transform: translateX(0);
//           }
//           100% {
//             transform: translateX(-33.333%);
//           }
//         }
//         .animate-marquee {
//           animation: marquee 30s linear infinite;
//         }
//         .animate-marquee:hover {
//           animation-play-state: paused;
//         }
//       `}</style>
//     </section>
//   );
// }

// interface CourseCategory {
//   title: string;
//   icon: React.ReactNode;
// }

// function ExploreCourses() {
//   const categories: CourseCategory[] = [
//     {
//       title: 'Live Courses',
//       icon: (
//         <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
//           <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//             <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
//           </svg>
//         </div>
//       ),
//     },
//     {
//       title: 'Classroom',
//       icon: (
//         <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-green-100 text-green-600">
//           <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//             <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//           </svg>
//         </div>
//       ),
//     },
//     {
//       title: 'Self Study',
//       icon: (
//         <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-blue-100 text-blue-500">
//           <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//             <path strokeLinecap="round" strokeLinejoin="round" d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z" />
//           </svg>
//         </div>
//       ),
//     },
//     {
//       title: 'Test Series',
//       icon: (
//         <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-sky-100 text-sky-600">
//           <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//             <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//           </svg>
//         </div>
//       ),
//     },
//   ];

//   return (
//     <section className="w-full mt-12 px-6 py-12">
//       <div className="mx-auto max-w-6xl">
//         <h2 className="mb-6 text-3xl font-bold text-slate-800">
//           Explore Courses
//         </h2>

//         <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-4">
//           {categories.map((category, index) => (
//             <div
//               key={index}
//               className="group flex flex-col justify-between rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:cursor-pointer hover:shadow-md"
//             >
//               <div className="mb-3 transition-transform duration-200 group-hover:scale-105">
//                 {category.icon}
//               </div>
//               <span className="text-base font-semibold text-slate-700">
//                 {category.title}
//               </span>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
