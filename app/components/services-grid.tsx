// ServicesGrid.tsx
"use client";

import Image from "next/image";
import { useState } from "react";

export function ServicesGrid({ data }: { data: any }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="max-w-7xl mx-auto py-16 sm:py-14 bg-white font-['Open_Sans','Helvetica_Neue',Arial,sans-serif] ">
      <div className="sm:mx-6 lg:px-8 mx-auto">
        {/* Heading */}
        <div
          className="text-center mb-14 md:mb-12"
          dangerouslySetInnerHTML={{ __html: data.fields.title }}
        />

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 divide-y sm:divide-y-0 sm:divide-x divide-brand-orange/20">
          {data.fields.items.map((item: any, index: number) => {
            const isHovered = hoveredIndex === index;

            return (
              <div
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`
                  group relative flex flex-col items-center text-center 
                  px-6 py-8 lg:py-10
                  transition-all duration-300 ease-out
                  ${isHovered ? "bg-brand-orange/[0.03]" : "bg-transparent"}
                  cursor-default
                `}
              >
                {/* Hover indicator line */}
                <div
                  className={`
                    absolute top-0 left-1/2 -translate-x-1/2 h-1 rounded-full
                    bg-brand-orange transition-all duration-300 ease-out
                    ${isHovered ? "w-12 opacity-100" : "w-0 opacity-0"}
                  `}
                />

                {/* Icon container */}
                <div
                  className={`
                    relative flex items-center justify-center
                    w-20 h-20 lg:w-24 lg:h-24 rounded-2xl
                    transition-all duration-300 ease-out
                    ${
                      isHovered
                        ? "bg-brand-orange/10 scale-110 shadow-lg shadow-brand-orange/10"
                        : "bg-gray-50 scale-100 shadow-none"
                    }
                  `}
                >
                  {item?.icon && (
                    <Image
                      src={item.icon}
                      alt={item.title || "service icon"}
                      width={56}
                      height={56}
                      className={`
                        transition-all duration-300 ease-out
                        ${isHovered ? "scale-110" : "scale-100"}
                      `}
                    />
                  )}
                </div>

                {/* Title */}
                <p
                  className={`
                    mt-5 text-lg lg:text-xl font-semibold leading-snug
                    max-w-[200px] transition-colors duration-300
                    ${isHovered ? "text-brand-orange" : "text-gray-800"}
                  `}
                >
                  {item.title}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}