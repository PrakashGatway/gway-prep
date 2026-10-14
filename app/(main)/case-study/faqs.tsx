"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export interface CaseStudyFaq {
  question: string;
  answer: string;
}

export default function CaseStudyFaqs({ items }: { items: CaseStudyFaq[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={item.question}
            className={`overflow-hidden rounded-2xl border transition-colors ${
              isOpen ? "border-[#FFB09D] bg-white" : "border-[#F4D9CE] bg-white/75"
            }`}
          >
            <button
              type="button"
              className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left sm:px-6"
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? null : index)}
            >
              <span className="font-semibold text-[#303030] sm:text-lg">{item.question}</span>
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors ${
                  isOpen ? "bg-[#F36D45] text-white" : "bg-[#FFF0BE] text-[#A84B31]"
                }`}
              >
                <ChevronDown size={18} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
              </span>
            </button>
            <div className={`grid transition-[grid-template-rows] duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
              <div className="overflow-hidden">
                <p className="px-5 pb-5 pr-16 text-sm leading-7 text-[#68605D] sm:px-6 sm:pb-6 sm:text-base">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
