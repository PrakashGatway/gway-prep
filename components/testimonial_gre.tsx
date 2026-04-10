"use client";
import { Star } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function TextTestimonials() {
  const containerRef = useRef(null);
  
  // Track scroll progress of this specific section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Define how much each card moves to the right based on scroll
  // Card 0 stays left (0), Card 1 moves mid, Card 2 moves far
  const x1 = useTransform(scrollYProgress, [0.3, 0.6], ["0%", "0%"]); // Base card
  const x2 = useTransform(scrollYProgress, [0.3, 0.6], ["10%", "110%"]); // Moves right
  const x3 = useTransform(scrollYProgress, [0.3, 0.6], ["20%", "220%"]); // Moves further right
  const x4 = useTransform(scrollYProgress, [0.3, 0.6], ["50%", "330%"]); // Moves further right
  const x5 = useTransform(scrollYProgress, [0.3, 0.6], ["20%", "140%"]); // Moves further right

  const testimonials = [
    { name: "Khushal", score: 80, verbal:169, text: "My journey with Gateway Abroad Jaipur went beyond my expectations. The mock tests provided by my trainers gave an accurate simulation of the real exam...", rating: 5 },
    { name: "Mayank", score: 80, verbal:169, text: "Gateway Abroad Jaipur made studying PTE seamless. I still can't believe that I scored 80. This is all because of the efforts of my trainers...", rating: 5 },
    { name: "Sandeep", score: 85, verbal:169, text: "The personalized attention and the quality of study material are unmatched. Highly recommend for anyone looking to clear PTE on the first go.", rating: 5 },
    { name: "Sandeep", score: 85, verbal:169, text: "The personalized attention and the quality of study material are unmatched. Highly recommend for anyone looking to clear PTE on the first go.", rating: 5 },
  ];

  return (
    <div ref={containerRef} className="min-h-[80vh] bg-gray-100 py-16 px-4 overflow-hidden">
      <div className="max-w-7xl m-auto">
        <div className="text-center mt-16">
          <h1 className="text-xl md:text-2xl text-left text-gray-600">
            Purchased by 500,000+ GRE students
          </h1>
        </div>

        {/* Desktop: Animated Stack | Mobile: Vertical List */}
        <div className="relative h-[500px] md:h-[350px]">
          <div className="flex flex-col md:relative md:block mt-40">
            
            {/* Card 1 (Bottom/Left) */}
            <motion.div 
              style={{ x: typeof window !== 'undefined' && window.innerWidth > 688 ? x1 : 0 }}
              className="md:absolute top-0 left-0 w-full md:w-[20%] h-64 bg-white border-2 rounded-3xl p-6 z-10 mb-6"
            >
              <CardContent data={testimonials[0]} />
            </motion.div>

            {/* Card 2 (Middle) */}
            <motion.div 
              style={{ 
                x: typeof window !== 'undefined' && window.innerWidth > 688 ? x2 : 0,
                rotate: 3 
              }}
              className="md:absolute top-10 left-0 w-full md:w-[20%] h-64 bg-white border-2 rounded-3xl p-6 z-20 mb-6"
            >
              <CardContent data={testimonials[1]} />
            </motion.div>

            {/* Card 3 (Top/Right) */}
            <motion.div 
              style={{ 
                x: typeof window !== 'undefined' && window.innerWidth > 688 ? x3 : 0,
                rotate: -2 
              }}
              className="md:absolute -top-10 left-0 w-full md:w-[20%] h-64 bg-white border-2 rounded-3xl p-6 z-30 mb-6"
            >
              <CardContent data={testimonials[2]} />
            </motion.div>

            
            {/* Card 4 (Top/Right) */}
            <motion.div 
              style={{ 
                x: typeof window !== 'undefined' && window.innerWidth > 688 ? x4 : 0,
                rotate: 2 
              }}
              className="md:absolute top-0 left-0 w-full md:w-[20%] h-64 bg-white border-2 rounded-3xl p-6 z-40 mb-6"
            >
              <CardContent data={testimonials[3]} />
            </motion.div>

              <motion.div 
              style={{ 
                x: typeof window !== 'undefined' && window.innerWidth > 688 ? x5 : 0,
                rotate: 0
              }}
              className="md:absolute top-0 -left-12 w-full md:w-[40rem] h-[20rem]   p-6 z-30 mb-6"
            >
              <img src={'/image/grt.png'} className="h-full w-full" />
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  );
}

// Reusable Inner Content to keep code clean
function CardContent({ data }: { data: any }) {
  return (
    <>
      <div className="flex justify-between items-start flex-col mb-4">
        <h3 className="text-xl font-bold text-[#555]">{data.name}</h3>
        <span className="flex justify-between w-full">
          <p className="flex">Math <p className="w-10 ml-1 bg-orange-600 font-bold rounded text-center text-white">{data.score}</p></p>
          <p className="flex">Verbal <p className="w-10 ml-1 bg-gray-600 font-bold rounded text-center text-white">{data.verbal}</p></p>
        </span>
        {/* <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={18} className="fill-yellow-400 text-yellow-400" />
          ))}
        </div> */}
      </div>
      <p className="text-gray-700 text-sm leading-relaxed">{data.text}</p>
    </>
  );
}
