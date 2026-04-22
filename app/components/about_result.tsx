"use client";

import { motion } from "framer-motion";

export function Aboutresult({ data }: { data: any }) {
  // 1. Safety Guard: Prevents "Cannot read properties of undefined"
  if (!data || !data.data) return null;

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-[#EAEAEA]" id="about">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-8">
        {data.data.map((ele: any, idx: number) => (
          <motion.div
            // 2. The ONLY key should be here (on the top-level element of the map)
            key={ele._id || ele.id || idx} 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.2 }}
            transition={{
              duration: 0.6,
              delay: idx * 0.1,
            }}
          >
            {/* 3. REMOVED key={idx} from here. Adding it twice causes warnings */}
            <div className="shadow-lg py-4 px-2 bg-white">
              <img src={ele?.image} className="h-48 w-44 mx-auto" alt={ele?.name} />
              
              {/* 4. FIX: Use <div> instead of <span> because <span> cannot contain <h2> or <ul> (HTML nesting rule) */}
              <div className="text-center flex items-center capitalize">
                <h2 className="font-bold">{ele?.name}</h2>
                <ul>
                  <li className="font-semibold">{ele?.course}</li>
                  <li className="bg-[#F36C45] font-bold text-white mx-2">
                    {ele?.score}
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
