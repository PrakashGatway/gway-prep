"use client"

import { Phone, Calendar, PhoneCall } from "lucide-react"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import ThreeDButton from "./3dbutton"

export function Hero() {
  const bookCallRef = useRef<HTMLButtonElement>(null)
  const callUsRef = useRef<HTMLButtonElement>(null)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024)
    }
    
    // Initial check
    checkDesktop()
    
    // Set initial transforms for desktop
    if (isDesktop) {
      if (bookCallRef.current) {
        bookCallRef.current.style.transform = "rotateY(37deg)"
      }
      if (callUsRef.current) {
        callUsRef.current.style.transform = "rotateY(25deg)"
      }
    }
    
    // Listen for resize
    window.addEventListener('resize', checkDesktop)
    
    return () => {
      window.removeEventListener('resize', checkDesktop)
    }
  }, [isDesktop])



  return (
    <section className="relative overflow-hidden bg-gray-50 py-6 md:py-12 lg:py-20
      bg-[url('/image/bg-test-pre.jpg')]
      bg-cover
      bg-center
      bg-no-repeat">
      <div className=" mx-auto px-4 sm:px-6 lg:pl-25 flex flex-col lg:flex-row items-center gap-12 md:gap-12">
        
        {/* Left Content Section */}
        <div className="lg:w-1/2 w-full">
          <div className="bg-white/20 backdrop-blur-xl text-white rounded-2xl md:rounded-3xl px-4 py-4 md:px-6 md:py-10 
                     shadow-[inset_0_0_10px_rgba(255,255,255,0.45)] border-2 md:border-3 border-white/50 
                     text-center transform rotate-0">
            <h1 className="text-2xl  sm:text-3xl md:text-4xl font-semibold leading-snug text-gray-800">
              <span className="text-brand-orange">Welcome to</span> <span className="text-[#626363]">The Best Study
              Abroad Consultants in Jaipur</span> 
            </h1>

            <p className="text-gray-600 mt-4 md:mt-6 leading-relaxed text-sm sm:text-base md:text-base">
              At Gateway Abroad Education, we are a trusted Overseas education
              consultants dedicated to helping students achieve their dreams of
              pursuing overseas study. Our expert team supports you at every step.
            </p>
          </div>
          
          {/* 3D Buttons */}
          <div className="flex mt-10">
           <ThreeDButton icon="Phone" children={  "Book A Call"} bgColor="bg-white" textColor="text-black" border="none" />
         <ThreeDButton icon="Calendar" children="Call Us" bgColor="bg-white" textColor="text-black" border="none"/>

          </div>
        
        </div>

        {/* Right Image Section */}
        <div className="lg:w-1/2 w-full relative min-h-[300px] sm:min-h-[350px] md:min-h-[400px] flex items-center justify-center mt-4 sm:mt-0">
          <div className="relative w-full max-w-lg mx-auto">
            <Image
              src="/image/hero.png"
              alt="Hero Image"
              width={500}
              height={500}
              className="w-full h-auto object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}