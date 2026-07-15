// Aboutresult.tsx
"use client";

import { motion } from "framer-motion";
import { Stars } from "lucide-react";

export function Aboutresult({ data }: { data: any }) {
  if (!data || !data.data) return null;

  // Duplicate the data for seamless infinite loop
  const duplicatedData = [...data.data, ...data.data, ...data.data];

  return (
    <section className="py-10 md:py-12  bg-[#fff] overflow-hidden font-['Open_Sans','Helvetica_Neue',Arial,sans-serif]" id="about">
      {/* Heading */}
      <div className="text-center mb-8 px-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 flex items-center justify-center gap-3">
          Meet our stars{" "}
          <Stars className="w-8 h-8 md:w-10 md:h-10 text-[#f26e46] fill-[#f26e46]" />
        </h2>
        <p className="text-gray-500 mt-3 text-base md:text-lg">
          Our students who made us proud
        </p>
      </div>

      {/* Slider Container */}
      <div className="relative max-w-8xl bg-[#FFB399] mx-auto overflow-hidden">
        {/* Left Fade Overlay */}

        {/* <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 md:w-32 lg:w-40 bg-gradient-to-r from-[#FFB399] via-[#EAEAEAbb] to-transparent z-10 pointer-events-none" />

        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 md:w-32 lg:w-40 bg-gradient-to-l from-[#EAEAEA] via-[#EAEAEAbb] to-transparent z-10 pointer-events-none" /> */}

        {/* Scrolling Track */}
        <div className="flex w-max animate-marquee bg-[#FFB399] p-10">
          {duplicatedData.map((ele: any, idx: number) => (
            <motion.div
              key={`${ele._id || ele.id || 'slide'}-${idx}`} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.1 }}
              transition={{
                duration: 0.5,
                delay: (idx % data.data.length) * 0.08,
              }}
              className="flex-shrink-0 w-[200px] sm:w-[220px] mx-1 sm:mx-2"
            >
              <div className="shadow-md hover:shadow-xl transition-shadow duration-300 p-4 bg-white rounded-lg group cursor-pointer">
                {/* Image */}
                <div className="relative overflow-hidden rounded">
                  <img
                    src={ele?.image}
                    className="h-44 w-full object-cover mx-auto bg-[#FEFBEA] group-hover:scale-105 transition-transform duration-500"
                    alt={ele?.name}
                  />
                  {/* Exam Type Badge */}
                  <span className="absolute bottom-0 left-0 w-full text-sm text-center font-bold bg-[#000] text-white px-2.5 py-1.5">
                    {ele?.course || ele?.exam_type || "NEET - UG '25"}
                  </span>
                </div>

                {/* Info */}
                <div className="text-left mt-2 capitalize px-1">
                  <p className="font-bold text-base sm:text-lg break-words text-gray-800 leading-tight">
                    {ele?.name}
                  </p>
                  <div className="flex flex-col items-start justify-between mt-1">
                    <span className="font-medium text-xs sm:text-sm text-gray-500 truncate">
                      Standardized Test Results
                    </span>
                    <span className="font-medium text-xs sm:text-sm text-gray-500 truncate">
                      Score
                    </span>
                    <span className="text-[#f26e46] m-0 p-0 font-bold text-2xl  md:text-3xl transition-colors duration-200">
                      {ele?.score}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* <ExploreCourses /> */}
          
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}

interface CourseCategory {
  title: string;
  icon: React.ReactNode;
}

function ExploreCourses() {
  const categories: CourseCategory[] = [
    {
      title: 'Live Courses',
      icon: (
        <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </div>
      ),
    },
    {
      title: 'Classroom',
      icon: (
        <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-green-100 text-green-600">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>
      ),
    },
    {
      title: 'Self Study',
      icon: (
        <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-blue-100 text-blue-500">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z" />
          </svg>
        </div>
      ),
    },
    {
      title: 'Test Series',
      icon: (
        <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-sky-100 text-sky-600">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
      ),
    },
  ];

  return (
    <section className="w-full mt-12 px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-6 text-3xl font-bold text-slate-800">
          Explore Courses
        </h2>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-4">
          {categories.map((category, index) => (
            <div
              key={index}
              className="group flex flex-col justify-between rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:cursor-pointer hover:shadow-md"
            >
              <div className="mb-3 transition-transform duration-200 group-hover:scale-105">
                {category.icon}
              </div>
              <span className="text-base font-semibold text-slate-700">
                {category.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}