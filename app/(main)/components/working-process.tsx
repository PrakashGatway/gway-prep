"use client"

import { cn } from "@/app/lib/utils"
import { MessageSquare, BookOpen, Brain, PenTool, CheckCircle } from "lucide-react"
import Image from "next/image"

const steps = [
  {
    Icon: "/home/01.png",
    title: "Counsell",
    desc: "It involves providing personalized advice to aid students in selecting the most suitable exam for their desired countries.",
  },
  {
    Icon: "/home/02.png",
    title: "Teach",
    desc: "Guiding individuals through a comprehensive process aimed at clearing the fundamentals of the students.",
  },
  {
    Icon: "/home/03.png",
    title: "Practice",
    desc: "Engaging in regular and focused practice not only enhances one's understanding of the material but also hones skills, refines problem-solving abilities, and builds confidence.",
  },
  {
    Icon: "/home/04.png",
    title: "Feedback & Mock",
    desc: "Regularly engage in mock exams and feedback sessions to familiarize yourself with the exam environment, improve time management, and identify areas that need further attention.",
  },
  { Icon: "/home/05.png", title: "Book Test Date", desc: "Test date booking facility offered by Gateway Abroad." },
]

export function WorkingProcess() {
  return (
    <section className="py-20 bg-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-center mb-4">
          <span className="text-brand-orange">Our Working</span> <span className="text-[#626363]">Process</span> 
        </h2>
        <p className="text-center font-semibold text-gray-600 mb-20 max-w-2xl mx-auto">
          A Platform that takes care of everything beforehand. Gateway Abroad sources, vets, matches and manages all the lalents.
        </p>

        <div className="relative flex flex-col lg:flex-row items-center gap-20">
          <div className="lg:w-1/2 space-y-12">
            {steps.map((step, i) => {
              const IconComponent = step.Icon
              return (
                <div key={i} className="flex gap-6 group">
                  <div className="flex-shrink-0 w-16 h-16  flex items-center justify-center text-brand-orange group-hover:bg-brand-orange group-hover:text-white transition-all">
                    {/* <IconComponent size={28} /> */}
                    <img src={IconComponent} alt={step.title}/>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-brand-orange mb-2">{step.title}</h3>
                    <p className="text-gray-600 leading-relaxed text-base max-w-md">{step.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="lg:block hidden lg:w-1/2 relative">
            <Image
              src="/image/steps.png"
              alt="Working Process"
              width={500}
              height={500}
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
