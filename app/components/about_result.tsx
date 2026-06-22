// "use client";

// import { motion } from "framer-motion";

// export function Aboutresult({ data }: { data: any }) {
//   // 1. Safety Guard: Prevents "Cannot read properties of undefined"
//   if (!data || !data.data) return null;

//   return (
//     <section className="py-12 md:py-16 lg:py-20 bg-[#EAEAEA]" id="about">
//       <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-8">
//         {data.data.map((ele: any, idx: number) => (
//           <motion.div
//             // 2. The ONLY key should be here (on the top-level element of the map)
//             key={ele._id || ele.id || idx} 
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ amount: 0.2 }}
//             transition={{
//               duration: 0.6,
//               delay: idx * 0.1,
//             }}
//           >
//             {/* 3. REMOVED key={idx} from here. Adding it twice causes warnings */}
//             <div className="shadow-lg p-3 bg-white">
//               <img src={ele?.image} className="h-44 w-46 mx-auto bg-[#f3f3f3] " alt={ele?.name} />
              
//               {/* 4. FIX: Use <div> instead of <span> because <span> cannot contain <h2> or <ul> (HTML nesting rule) */}
//               <div className="text-center grid grid-cols-1 items-center capitalize">
//                 <h2 className="font-bold break-words text-center ml-4">{ele?.name}</h2>
//                 <ul className="grid grid-cols-2 items-center ">
//                   <li className="font-semibold">{ele?.course}</li>
//                   <li className="bg-[#F36C45] font-bold text-white mx-2">
//                     {ele?.score}
//                   </li>
//                 </ul>
//               </div>
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </section>
//   );
// }


"use client";

import { motion } from "framer-motion";
import { Stars } from "lucide-react";

export function Aboutresult({ data }: { data: any }) {
  if (!data || !data.data) return null;

  // Duplicate the data for seamless infinite loop
  const duplicatedData = [...data.data, ...data.data, ...data.data];

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-[#EAEAEA] overflow-hidden " id="about">
      {/* Heading */}
      <div className="text-center mb-10 px-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 flex items-center justify-center gap-2">
          Meet our stars{" "}
          <Stars className="w-7 h-7 md:w-8 md:h-8 text-[#f26e46] fill-[#f26e46]" />
        </h1>
        <p className="text-gray-500 mt-2 text-sm md:text-base">
          Our students who made us proud
        </p>
      </div>

      {/* Slider Container */}
      <div className="relative max-w-7xl mx-auto overflow-hidden">
        {/* Left Fade Overlay */}
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 md:w-32 lg:w-40 bg-gradient-to-r from-[#EAEAEA] via-[#EAEAEAbb] to-transparent z-10 pointer-events-none" />

        {/* Right Fade Overlay */}
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 md:w-32 lg:w-40 bg-gradient-to-l from-[#EAEAEA] via-[#EAEAEAbb] to-transparent z-10 pointer-events-none" />

        {/* Scrolling Track */}
        <div className="flex w-max animate-marquee">
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
              className="flex-shrink-0 w-[200px] sm:w-[220px] mx-2.5 sm:mx-3"
            >
              <div className="shadow-md hover:shadow-xl transition-shadow duration-300 p-3 bg-white rounded-lg group cursor-pointer">
                {/* Image */}
                <div className="relative overflow-hidden rounded">
                  <img
                    src={ele?.image}
                    className="h-44 w-full object-cover mx-auto bg-[#f3f3f3] group-hover:scale-105 transition-transform duration-500"
                    alt={ele?.name}
                  />
                  {/* Exam Type Badge */}
                  <span className="absolute bottom-0 left-0 w-full text-sm text-center  font-bold bg-[#000] text-white px-2.5 py-1 ">
                    {ele?.course || ele?.exam_type || "NEET - UG '25"}
                  </span>
                </div>

                {/* Info */}
                <div className="text-left mt-2 capitalize px-1">
                  <h2 className="font-bold text-base sm:text-lg break-words text-gray-800 leading-tight">
                    {ele?.name}
                  </h2>
                  <div className="flex flex-col items-start justify-between  ">
                    
                    <span className="font-medium text-xs sm:text-sm text-gray-500 truncate">
                      {/* Official Exam Score Report */} Standardized Test Results
                    </span>
                    
                    <span className="font-medium text-xs sm:text-sm text-gray-500 truncate">
                      Score
                    </span>
                    
                    <span className="text-[#f26e46] m-0 p-0 font-bold text-sm sm:text-[2rem] transition-colors duration-200">
                      {ele?.score}
                    </span>
                    
                  </div>

                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
      </div>

          <ExploreCourses />
      {/* Inline keyframes for the marquee */}
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
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </div>
      ),
    },
    {
      title: 'Classroom',
      icon: (
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-600">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>
      ),
    },
    {
      title: 'Self Study',
      icon: (
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-500">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z" />
          </svg>
        </div>
      ),
    },
    {
      title: 'Test Series',
      icon: (
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-100 text-sky-600">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
      ),
    },
  ];

  return (
    <section className="w-full mt-10  px-6 py-12 ">
      <div className="mx-auto max-w-7xl">
        {/* Section Heading */}
        <h2 className="mb-6 text-2xl font-bold text-slate-800 dark:text-white">
          Explore Courses
        </h2>

        {/* Responsive Grid System */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
          {categories.map((category, index) => (
            <div
              key={index}
              className="group flex flex-col justify-between rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:cursor-pointer hover:shadow-md dark:border-slate-800 dark:bg-slate-800"
            >
              {/* Icon Container */}
              <div className="mb-8 transition-transform duration-200 group-hover:scale-105">
                {category.icon}
              </div>

              {/* Title */}
              <span className="text-base font-semibold text-slate-700 dark:text-slate-200">
                {category.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
