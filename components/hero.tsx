"use client"

import { cn } from "@/lib/utils"

import { motion } from "framer-motion"
import { Phone, Calendar } from "lucide-react"
import Image from "next/image"

const examBubbles = [
  { name: "GRE", label: "Graduate Record Examinations", color: "bg-[#717b7b]" },
  { name: "GMAT", label: "Graduate Management Admission Test", color: "bg-[#0b546e]" },
  { name: "TOEFL", label: "Test of English as a Foreign Language", color: "bg-[#717b7b]" },
  { name: "IELTS", label: "International English Language Testing System", color: "bg-[#a62116]" },
  { name: "SAT", label: "Scholastic Assessment Test", color: "bg-[#0b546e]" },
  { name: "PTE", label: "Pearson Test of English", color: "bg-[#a62116]" },
  { name: "DUOLINGO", label: "Duolingo English Test", color: "bg-[#8ab22d]" },
]


export function Hero() {
  return (
    <section  className="relative overflow-hidden bg-gray-50 py-6">
      <div className="max-w-7xl px-4 mx-auto flex flex-col lg:flex-row items-center gap-6">
        <div className="lg:w-1/2">
          <h1 className="text-4xl lg:text-[2.5rem] font-semibold text-gray-900 leading-tight mb-6">
            <span className="text-brand-orange">Welcome to</span> The Best Study Abroad Consultants in Jaipur
          </h1>
          <p className="text-gray-600 mb-10 leading-relaxed text-base">
            At Gateway Abroad Education, we are a trusted Overseas education consultants dedicated to helping students
            achieve their dreams at every step, from selecting the ideal course to excelling in test preparation for
            crucial tests.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="flex items-center gap-2 bg-white border border-brand-orange text-brand-orange px-8 py-3 rounded-full font-bold shadow-md hover:bg-brand-orange hover:text-white transition-all">
              <Calendar size={18} />
              BOOK A CALL
            </button>
            <button className="flex items-center gap-2 bg-white border border-brand-orange text-brand-orange px-8 py-3 rounded-full font-bold shadow-md hover:bg-brand-orange hover:text-white transition-all">
              <Phone size={18} />
              CALL US
            </button>
          </div>
        </div>

        <div className="lg:w-1/2 relative min-h-[400px] flex items-center justify-center">
          <div className="relative w-full">
            <Image
              src="/image/hero.png"
              alt="Hero Image"
              width={500}
              height={500}
              className="w-full h-full object-cover"
            />
            
          </div>
        </div>
      </div>
    </section>
  )
}
