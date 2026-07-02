// WorkingProcess.tsx
"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export function WorkingProcess({ data }: { data: any }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  return (
    <section className="py-1 font-['Open_Sans','Helvetica_Neue',Arial,sans-serif]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <div 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold text-center"
            dangerouslySetInnerHTML={{ __html: data.fields.title }} 
          />
          <p className="text-gray-600 text-base sm:text-lg md:text-xl mt-4 max-w-2xl mx-auto px-4">
            {data.fields.subtitle}
          </p>
        </div>

        {/* Use grid for better sticky support */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8">
          
          {/* Steps - Left Column */}
          <div className="lg:col-span-8 space-y-1 sm:space-y-6">
            {data.fields.items.map((step: any, i: number) => {
              const IconComponent = step.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="flex flex-col sm:flex-row gap-8 group
                  transition-all duration-300 "
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="relative flex-shrink-0">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center bg-[#f26e46]/10 rounded-full group-hover:bg-[#f26e46]/20 transition-all duration-300">
                        <img 
                          src={IconComponent} 
                          alt={step.title}
                          className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
                        />
                      </div>
                      {/* <span className="absolute -top-2 -right-2 w-5 h-5 sm:w-6 sm:h-6 bg-[#f26e46] text-white text-xs sm:text-sm font-bold rounded-full flex items-center justify-center">
                        {i + 1}
                      </span> */}
                    </div>
                    
                    <p className="text-lg sm:text-xl md:text-2xl font-bold text-[#f26e46] sm:hidden">
                      {step.title}
                    </p>
                  </div>
                  
                  <div className="flex-1">
                    <p className="text-xl sm:text-2xl font-bold text-[#f26e46] mb-1 sm:mb-2 hidden sm:block">
                      {step.title}
                    </p>
                    <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                      {step.subtitle}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Image - Right Column with Sticky */}
          <div className="hidden lg:block lg:col-span-4">
            <div 
              className="sticky top-8" 
              style={{ 
                position: 'sticky',
                top: '6rem',
                alignSelf: 'flex-start'
              }}
            >
              <div className="relative h-[600px] w-full">
                <Image
                  src="/image/steps.png"
                  alt="Working Process"
                  fill
                  className="object-contain rounded-2xl"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Mobile Image */}
          {isMobile && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:hidden col-span-1 mt-4"
            >
              <div className="relative max-w-sm mx-auto h-[500px] w-full">
                <Image
                  src="/image/steps.png"
                  alt="Working Process"
                  fill
                  className="object-contain rounded-2xl"
                />
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}