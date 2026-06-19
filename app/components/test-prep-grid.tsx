"use client";

import { cn } from "@/app/lib/utils";
import { motion } from "framer-motion";

// rounded-[0_1rem_0_0]

const exams = [
  {
    name: "GRE",
    desc: "Gateway Abroad: Your pathway to triumph in graduate school",
    color: "bg-[#555] hover:bg-orange-600 cursor-pointer ",
  },
  {
    name: "GMAT",
    desc: "Crack the business school code with our data-driven insights & practice",
    color: "bg-[#555] hover:bg-orange-600 cursor-pointer",
  },
  {
    name: "TOEFL",
    desc: "Open doors to foreign universities with our comprehensive TOEFL prep",
    color: "bg-[#555] hover:bg-orange-600 cursor-pointer",
  },
  {
    name: "IELTS",
    desc: "Master English for global study & migration with expert guidance",
    color: "bg-[#555] hover:bg-orange-600 cursor-pointer ",
  },
  {
    name: "SAT",
    desc: "Ace US university admissions with personalized strategies & top-notch materials",
    color: "bg-[#555] hover:bg-orange-600 cursor-pointer",
  },
  {
    name: "PTE",
    desc: "Conquer the computer-based test with our flexible & focused prep",
    color: "bg-[#555] hover:bg-orange-600 cursor-pointer",
  },
  {
    name: "DUOLINGO",
    desc: "Duolingo",
    color: "bg-[#555] hover:bg-orange-600 cursor-pointer",
  },
];

export function TestPrepGrid({ data }: { data: any }) {
  return (
    <section className="py-20 bg-white sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* <h2 className="text-4xl font-semibold text-center mb-10  pb-[10px] ">
          <span className="text-brand-orange">Courses </span> <span className="text-[#626363]">We Offer</span> 
        </h2> */}

        <div dangerouslySetInnerHTML={{ __html: data.fields.title }} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.fields.items.map((exam: any, i: number) => (

<motion.div
  key={i}
  initial="initial"
  whileHover="hover"
  className={cn(
    "relative overflow-hidden rounded-3xl h-44 p-8",
    "bg-[#ededed] text-black hover:bg-gradient-to-r hover:from-gray-600 hover:to-gray-900 hover:text-white cursor-pointer",
    exam.name === "DUOLINGO" && "lg:col-start-2"
  )}
>
  {/* Title */}
  <motion.div
    variants={{
      initial: { opacity: 1, y: 0 },
      hover: { opacity: 0, y: -40 },
    }}
    transition={{ duration: 0.3 }}
    className="absolute inset-0 flex items-center justify-center"
  >
    <h3 className="text-3xl font-black uppercase">
      {exam.title}
    </h3>
  </motion.div>

  {/* Description */}
  <motion.div
    variants={{
      initial: {
        opacity: 0,
        y: "100%",
      },
      hover: {
        opacity: 1,
        y: 0,
      },
    }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    className="absolute inset-0 flex items-center justify-center px-6"
  >
    <p className="text-sm leading-relaxed text-center">
      {exam.subtitle}
    </p>
  </motion.div>
</motion.div>


          ))}
        </div>
      </div>
    </section>
  );
}
