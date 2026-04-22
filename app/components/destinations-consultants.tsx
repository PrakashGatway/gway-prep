"use client"

import { useState } from "react"
import { Plus, Minus } from "lucide-react"

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
    <div className="bg-white max-w-7xl mx-auto rounded-xl p-6 my-12">
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
    </div>
  )
}
