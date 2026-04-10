"use client"

import { cn } from "@/lib/utils"
import {motion} from "framer-motion"

// rounded-[0_1rem_0_0]

const exams = [
  { name: "GRE", desc: "Gateway Abroad: Your pathway to triumph in graduate school", 
    color: "bg-[#555] hover:bg-orange-600 cursor-pointer " },
  { name: "GMAT", desc: "Crack the business school code with our data-driven insights & practice", 
    color: "bg-[#555] hover:bg-orange-600 cursor-pointer" },
  {
    name: "TOEFL",
    desc: "Open doors to foreign universities with our comprehensive TOEFL prep",
    color: "bg-[#555] hover:bg-orange-600 cursor-pointer",
  },
  { name: "IELTS", desc: "Master English for global study & migration with expert guidance", 
    color: "bg-[#555] hover:bg-orange-600 cursor-pointer " },
  {
    name: "SAT",
    desc: "Ace US university admissions with personalized strategies & top-notch materials",
    color: "bg-[#555] hover:bg-orange-600 cursor-pointer",
  },
  { name: "PTE", desc: "Conquer the computer-based test with our flexible & focused prep",
     color: "bg-[#555] hover:bg-orange-600 cursor-pointer" },
  { name: "DUOLINGO", desc: "Duolingo", 
    color: "bg-[#555] hover:bg-orange-600 cursor-pointer" },
]

export function TestPrepGrid() {
  return (
    <section className="py-20 bg-white sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-semibold text-center mb-10  pb-[10px] ">
          <span className="text-brand-orange">Courses </span> <span className="text-[#626363]">We Offer</span> 
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {exams.map((exam, i) => (
            <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.2 }} // ones: true for the one time
            transition={{
              duration: 0.6,
              delay: i * 0.1, // 0.1s gap between each item
            }}
          
              className={cn(
                "rounded-3xl p-8 text-white flex flex-col items-center text-center justify-center transition-transform hover:scale-105 shadow-lg",
                exam.color,
                exam.name === "DUOLINGO" && "lg:col-start-2",
              )}
            >
              <h3 className="text-3xl font-black mb-2">{exam.name}</h3>
              <p className="text-sm text-white/90 leading-relaxed max-w-[400px]">{exam.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
