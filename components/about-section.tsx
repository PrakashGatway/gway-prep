"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export function AboutSection() {
  return (
    <section className="py-20 bg-white" id="about">
      
      <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-center gap-20">

        {/* IMAGE WITH TRUE 3D DEPTH */}
        <div className="lg:w-1/3 flex justify-center">
          <div
            className="relative"
            style={{ perspective: "600px" }}
          >
            <motion.div
              initial={{
                rotateY: 30,   // LEFT closer
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
              className="relative rounded-[32px] border-2 border-brand-orange bg-white  shadow-2xl"
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              <div
                className="overflow-hidden rounded-[24px]"
                style={{
                  transform: "translateZ(0px)",
                }}
              >
                <Image
                  src="https://cdn.pixabay.com/photo/2018/08/04/11/30/draw-3583548_1280.png"
                  alt="Education"
                  width={620}
                  height={400}
                  className="h-[240px] w-full object-cover"
                />
              </div>

              {/* Depth shadow */}
              <div className="absolute inset-0 rounded-[32px] shadow-[40px_40px_60px_rgba(0,0,0,0.18)] -z-10" />
            </motion.div>
          </div>
        </div>

        {/* TEXT SIDE */}
        <div className="lg:w-2/3 relative">
          <div className="hidden lg:block absolute -left-10 top-0 h-full w-[2px] bg-gray-300" />

          <span className="text-brand-orange font-bold text-3xl block mb-2">
            About us
          </span>

          <h2 className="text-5xl font-extrabold text-brand-orange mb-6">
            Who Are We?
          </h2>

          <p className="text-gray-600 mb-10 leading-relaxed text-lg">
            At Gateway Abroad Education, we are a trusted overseas education
            consultancy helping students pursue their dreams of studying abroad.
            From course selection to exam prep like IELTS, TOEFL, GRE, PTE,
            GMAT, and more — we guide you at every step.
          </p>

          <button className="bg-brand-dark text-white px-12 py-3 rounded-full font-bold hover:bg-black transition-all">
            Know More
          </button>
        </div>

      </div>
    </section>
  )
}
