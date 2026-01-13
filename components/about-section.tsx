"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import ThreeDButton from "./3dbutton"

export function AboutSection() {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-white" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-12 md:gap-16 lg:gap-20">
        
        {/* IMAGE WITH TRUE 3D DEPTH */}
        <div className="lg:w-1/2 xl:w-1/3 flex justify-center order-2 lg:order-1">
          <div
            className="relative w-full max-w-md lg:max-w-none"
            style={{ perspective: "600px" }}
          >
            <motion.div
              initial={{
                rotateY: typeof window !== 'undefined' && window.innerWidth >= 1024 ? 30 : 0,
                skewY: 0,
                scaleX: 1.02,
              }}
              whileHover={{
                rotateY: 0,
                scale: 1.04,
              }}
              transition={{
                type: "spring",
                stiffness: 120,
                damping: 14,
              }}
              className="relative rounded-2xl md:rounded-3xl lg:rounded-[32px]  bg-white "
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              <div
                className="overflow-hidden rounded-xl md:rounded-2xl lg:rounded-[24px]"
                style={{
                  transform: "translateZ(0px)",
                }}
              >
                <Image
                  src="/image/home-about-img.jpg"
                  alt="Education"
                  width={620}
                  height={400}
                  className="h-48 sm:h-56 md:h-64 lg:h-[240px] w-full object-cover"
                />
              </div>

              {/* Depth shadow - hidden on mobile, shown on desktop */}
              <div className="hidden lg:block absolute inset-0 rounded-[32px]  -z-10" />
            </motion.div>
          </div>
        </div>

        {/* TEXT SIDE */}
        <div className="lg:w-1/2 xl:w-2/3 relative order-1 lg:order-2">
          {/* Divider line - hidden on mobile, shown on desktop */}
          <div className="hidden lg:block absolute -left-8 xl:-left-10 top-0 h-full w-[2px] bg-gray-300" />

          <span className="text-brand-orange font-bold text-xl sm:text-2xl lg:text-3xl block mb-2">
            About us
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-orange mb-4 sm:mb-6">
            Who Are We?
          </h2>

          <p className="text-gray-600 mb-6 sm:mb-8 md:mb-10 leading-relaxed text-base sm:text-lg">
            At Gateway Abroad Education, we are a trusted overseas education
            consultancy helping students pursue their dreams of studying abroad.
            From course selection to exam prep like IELTS, TOEFL, GRE, PTE,
            GMAT, and more — we guide you at every step.
          </p>

          <div className="w-full sm:w-auto">
            <ThreeDButton 
              children="Know More" 
              rotate={typeof window !== 'undefined' && window.innerWidth >= 1024 ? "50" : "0"}
              bgColor="bg-[#666666]" 
              textColor="text-white" 
              border="none"
            />
          </div>
        </div>

      </div>
    </section>
  )
}