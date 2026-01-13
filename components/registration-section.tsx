"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

const images = [
  "https://t3.ftcdn.net/jpg/06/23/84/22/360_F_623842281_ECGgEpMEkQdH83gbmexIn5l3ACl7V3M0.jpg",
  "https://img.freepik.com/premium-photo/young-handsome-man-pointing-camera-choosing-you-university-student-concept_1194-262936.jpg",
  "https://as2.ftcdn.net/jpg/05/29/12/57/1000_F_529125762_omW1yTehDLLFJKwLJjRET0G3sXiQnK5g.jpg",
]
export function RegistrationSection() {

  const [index, setIndex] = useState(0)

  // AUTO SLIDE
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])


  return (
    <section className="py-8 sm:py-10 lg:py-12 bg-white overflow-hidden px-4 sm:px-6 lg:px-8">
  <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-8 sm:gap-12 lg:gap-16">
    
    {/* ================= LEFT CONTENT ================= */}
    <div className="lg:w-1/2 w-full">
      <p className="text-lg sm:text-xl lg:text-2xl font-bold text-brand-orange leading-tight mb-6 sm:mb-8 lg:mb-10 text-center lg:text-left">
        Established in 2009, this institute is a leader in preparing students
        for standardized tests like GMAT, GRE, SAT, TOEFL, IELTS, and PTE.
      </p>

      {/* IMAGE SLIDER */}
      <div className="relative w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] lg:w-[350px] lg:h-[350px] mx-auto">
       
        {/* Slider */}
   <div className="lg:relative lg:w-[92%] lg:h-[91%]">

  {/* MASKED IMAGE */}
  <div
    className="lg:absolute inset-0 z-10 lg:top-[33px] lg:left-[30px]"
    style={{
      backgroundImage: `url(${images[index]})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      WebkitMaskRepeat: "no-repeat",
      WebkitMaskSize: "100% 100%",
      maskRepeat: "no-repeat",
      maskSize: "100% 100%",
      width: "260px",
      height: "260px",
      borderRadius: "70px",
      

    }}
  />

  {/* FRAME BORDER IMAGE */}
  <img
    src="/image/student-rank-img.png"
    alt="frame"
    className="absolute inset-0 w-full h-full z-20 pointer-events-none"
  />

</div>



        {/* NAME + SCORE */}
        <div
          className="absolute -bottom-6 sm:-bottom-7 lg:-bottom-8 left-1/2 -translate-x-1/2 z-20"
          style={{ perspective: "900px" }}
        >
          <div className="flex overflow-hidden">
            {/* NAME */}
            <div
              className="flex-1 text-white w-[220px] h-[60px] sm:w-[260px] sm:h-[70px] lg:w-[300px] lg:h-[80px] rounded-full pt-4 sm:pt-5 lg:pt-7 font-bold text-center py-2 sm:py-3 text-sm sm:text-base lg:text-lg"
              style={{
                background: "#5f5f5f",
                transform: "translateZ(18px) skewX(-13deg)",
                transformStyle: "preserve-3d",
              }}
            >
              Radhika
            </div>

            {/* SCORE */}
            <div
              className="bg-brand-orange
                absolute -right-[7px] sm:-right-[8px] lg:-right-[10px]
                h-[60px] sm:h-[70px] lg:h-[80px]
                text-white
                px-3 sm:px-4 lg:px-5 py-2
                flex flex-col items-center justify-center
                rounded-tl-[20px] sm:rounded-tl-[22px] lg:rounded-tl-[25px]
                rounded-tr-[28px] sm:rounded-tr-[32px] lg:rounded-tr-[34px]
                rounded-br-[20px] sm:rounded-br-[22px] lg:rounded-br-[25px]
                rounded-bl-[22px] sm:rounded-bl-[25px] lg:rounded-bl-[28px]"
              style={{
                transform: "translateZ(18px) skewX(-16deg)",
                boxShadow: "-6px 0 12px rgba(0,0,0,0.3)",
              }}
            >
              <span className="text-[8px] sm:text-[9px] lg:text-[10px] font-bold uppercase tracking-wide">
                GMAT score
              </span>
              <span className="text-lg sm:text-xl lg:text-2xl font-black leading-none">8</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* ================= RIGHT FORM ================= */}
    <div className="lg:w-1/2 w-full">
      <div className="bg-[#666666] rounded-2xl sm:rounded-3xl lg:rounded-[32px] p-6 sm:p-7 lg:p-8 shadow-xl lg:shadow-2xl max-w-sm sm:max-w-md mx-auto">
        <h3 className="text-white font-bold text-center text-xl sm:text-2xl mb-4 sm:mb-5 lg:mb-6 uppercase">
          Register Now
        </h3>

        <form className="space-y-3 sm:space-y-4">
          <input
            type="text"
            placeholder="Name"
            className="w-full bg-[#6f6f6f] border border-white/40 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-white placeholder-white/70 focus:outline-none text-sm sm:text-base"
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full bg-[#6f6f6f] border border-white/40 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-white placeholder-white/70 focus:outline-none text-sm sm:text-base"
          />

          <input
            type="tel"
            placeholder="Phone"
            className="w-full bg-[#6f6f6f] border border-white/40 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-white placeholder-white/70 focus:outline-none text-sm sm:text-base"
          />

          <input
            type="text"
            placeholder="Test Preparation"
            className="w-full bg-[#6f6f6f] border border-white/40 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-white placeholder-white/70 focus:outline-none text-sm sm:text-base"
          />

          <textarea
            placeholder="Message"
            className="w-full bg-[#6f6f6f] border border-white/40 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-white placeholder-white/70 focus:outline-none h-24 sm:h-28 text-sm sm:text-base"
          />

          <button
            type="submit"
            className="w-full bg-brand-orange text-white font-bold py-2 sm:py-3 rounded-lg sm:rounded-xl tracking-widest hover:opacity-90 transition text-sm sm:text-base"
          >
            SUBMIT
          </button>
        </form>
      </div>
    </div>
  </div>
</section>
  )
}
