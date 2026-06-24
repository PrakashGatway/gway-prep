// TestPrepGrid.tsx
"use client";

import { cn } from "@/app/lib/utils";
import { motion } from "framer-motion";

export function TestPrepGrid({ data }: { data: any }) {
  return (
    <section className=" py-6 sm:py-8 md:py-12 bg-white sm:px-6 lg:px-8 font-['Open_Sans','Helvetica_Neue',Arial,sans-serif]">
      <div className="max-w-7xl mx-auto px-4">
        <div dangerouslySetInnerHTML={{ __html: data.fields.title }} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {data.fields.items.map((exam: any, i: number) => (
            <motion.div
              key={i}
              initial="initial"
              whileHover="hover"
              className={cn(
                "relative overflow-hidden rounded-3xl h-44 p-8",
                "bg-[#ededed] text-black hover:bg-gradient-to-r hover:from-gray-600 hover:to-gray-900 hover:text-white cursor-pointer",
                exam.name === "DUOLINGO" && "lg:col-start-2",
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
                <h3 className="text-4xl font-black uppercase">{exam.title}</h3>
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