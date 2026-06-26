"use client"

import { useState } from "react"
import { Plus, Minus } from "lucide-react"
import { motion } from 'framer-motion';

export function Consultants({ data }: any) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  // 1. ADD THIS GUARD: Prevents the "reading fields of undefined" crash
  if (!data || !data.fields) {
    return null; // Or a loading spinner
  }

  return (
    <div className="bg-white max-w-7xl mx-auto rounded-xl p-6 my-10">
      <div 
        dangerouslySetInnerHTML={{
          __html: data.fields.title || `Frequently <span className="text-[#F36C45]">Asked Questions</span>`
        }} 
      />

      <div className="space-y-2">
        {/* 2. ADD OPTIONAL CHAINING and ensure items exists */}
        {data.fields.items?.map((item: any, index: number) => (
          <div
            // 3. IMPROVE KEY: If item has an ID, use it. Otherwise, index is okay here but ID is better.
            key={item.id || index} 
            className="border-b border-gray-100 last:border-b-0"
          >
            <button
              onClick={() => toggle(index)}
              className="flex items-center justify-between w-full py-4 text-left cursor-pointer" // Fixed "pointer" class to "cursor-pointer"
            >
              <span className="font-medium text-gray-800">
                {item.question}
              </span>

              {openIndex === index ? (
                <Minus className="w-5 h-5 text-[#F36C45]" />
              ) : (
                <Plus className="w-5 h-5 text-gray-500" />
              )}
            </button>

            {openIndex === index && (
              <div className="pb-4 text-gray-600 leading-relaxed text-sm">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>

        <CallToActionSection />
    </div>
  )
}


 function CallToActionSection() {
  return (
    <section className="relative overflow-hidden flex items-center py-6 mt-8 ">
      {/* Main Orange Banner Container */}
      <div className=" w-full mx-auto bg-[#FF6A13] rounded-[24px] overflow-hidden 
      flex flex-col md:flex-row items-center justify-between p-6 md:p-8 gap-6 min-h-[160px]">
        
        {/* Left Side: Animated Character Image */}
        <motion.div
        
          initial={{ x: '-150%', opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }} // Triggers when element is visible
          viewport={{ once: true, amount: 0.2 }} // Fires only once when 20% visible
          transition={{ 
            type: 'spring', 
            stiffness: 60, 
            damping: 15,
            duration: 1 
          }}
          // initial={{ x: '-150%', opacity: 0 }}
          // animate={{ x: 0, opacity: 1 }}
          // transition={{ 
          //   type: 'spring', 
          //   stiffness: 60, 
          //   damping: 15,
          //   duration: 1 
          // }}
          className="flex-shrink-0 z-100 w-[180px] md:w-[220px] md:absolute md:left-8 md:bottom-0"
        >
          <img 
            src="footer.png" 
            alt="Student reading on beanbag" 
            className="w-full h-auto object-contain block"
          />
        </motion.div>

        {/* Right Side: Text content & Button */}
        {/* The orchestrator delay ensures text appears AFTER the boy slides in */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="flex flex-col md:flex-row items-center justify-between w-full md:pl-[240px] gap-6 text-center md:text-left"
        >
          {/* Text Content */}
          <div className="text-white max-w-xl">
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight mb-2">
              Ready to Achieve Your Dreams?
            </h2>
            <p className="text-sm md:text-base opacity-90 font-medium">
              Join thousands of successful students and start your journey today.
            </p>
          </div>

          {/* Call to Action Button */}
          <button className="flex-shrink-0 flex items-center gap-2 bg-white text-[#FF6A13] font-semibold px-6 py-3 rounded-xl shadow-md hover:bg-opacity-95 transition-all whitespace-nowrap">
            Enroll Now
            <svg 
              xmlns="http://w3.org" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={2.5} 
              stroke="currentColor" 
              className="w-4 h-4"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5l6.75 6.75-6.75 6.75M19.5 12H9" />
            </svg>
          </button>
        </motion.div>

      </div>
    </section>
  );
}

