"use client";

import { Phone } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

import CountUp from "react-countup";

const images = [
  {
    url: "https://t3.ftcdn.net/jpg/06/23/84/22/360_F_623842281_ECGgEpMEkQdH83gbmexIn5l3ACl7V3M0.jpg",
    score: 8,
    name: "swati gupta",
    score_type: "Gmat Score",
    data: [
      {
        number: "20",
        text: "Years of Experience",
        past: "+",
      },
      {
        number: "3000",
        text: "Happy Students",
        past: "+",
      },
      {
        number: "4",
        text: "Overall  Rating",
        past: ".8/5",
      },
      {
        number: "20000",
        text: "Total Hours Lectured",
        past: "+",
      },
    ],
  },
  {
    url: "https://img.freepik.com/premium-photo/young-handsome-man-pointing-camera-choosing-you-university-student-concept_1194-262936.jpg",
    score: 9,
    name: "john doe",
    score_type: "ACT Score",
    data: [
      {
        number: "20",
        text: "Years of Experience",
        past: "+",
      },
      {
        number: "3000",
        text: "Happy Students",
        past: "+",
      },
      {
        number: "4",
        text: "Overall  Rating",
        past: ".8/5",
      },
      {
        number: "20000",
        text: "Total Hours Lectured",
        past: "+",
      },
    ],
  },
  {
    url: "https://as2.ftcdn.net/jpg/05/29/12/57/1000_F_529125762_omW1yTehDLLFJKwLJjRET0G3sXiQnK5g.jpg",
    score: 7,
    name: "jane smith",
    score_type: "PSAT Score",
    data: [
      {
        number: "20",
        text: "Years of Experience",
        past: "+",
      },
      {
        number: "3000",
        text: "Happy Students",
        past: "+",
      },
      {
        number: "4",
        text: "Overall  Rating",
        past: ".8/5",
      },
      {
        number: "20000",
        text: "Total Hours Lectured",
        past: "+",
      },
    ],
  },
];

const data = [
  {
    number: "20",
    text: "Years of Experience",
    past: "+",
  },
  {
    number: "3000",
    text: "Happy Students",
    past: "+",
  },
  {
    number: "4.8",
    text: "Overall  Rating",
    past: "/5",
  },
  {
    number: "20000",
    text: "Total Hours Lectured",
    past: "+",
  },
];

export function Hero() {
  const bookCallRef = useRef<HTMLButtonElement>(null);
  const callUsRef = useRef<HTMLButtonElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  const [index, setIndex] = useState(0);

  // AUTO SLIDE
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    // Initial check
    checkDesktop();

    // Set initial transforms for desktop
    if (isDesktop) {
      if (bookCallRef.current) {
        bookCallRef.current.style.transform = "rotateY(37deg)";
      }
      if (callUsRef.current) {
        callUsRef.current.style.transform = "rotateY(25deg)";
      }
    }

    // Listen for resize
    window.addEventListener("resize", checkDesktop);

    return () => {
      window.removeEventListener("resize", checkDesktop);
    };
  }, [isDesktop]);

  return (
    <section
      className=" relative overflow-hidden bg-gray-50 
      bg-[url('/image/bg.jpeg')]
      bg-cover
      bg-center
      bg-no-repeat 
      flex gap-12 items-center justify-center flex-wrap h-auto "
    >
      <div className=" mx-auto p-4 sm:px-6  flex flex-col lg:flex-row  items-center gap-6 md:gap-10">
        {/* Left Content Section */}
        <div className="lg:w-[70%] w-full pt-20">
          <div className="">
            <h1 className="text-2xl  md:text-3xl lg:text-5xl font-bold leading-tight text-white">
              World's Leading Test <p> Prep, Tutoring & Collage </p> Admissions
              Centre
            </h1>

            <h1 className="text-xl  md:text-2xl lg:text-4xl font-semibold leading-tight text-white mt-4">
              Coaching for SAT, AP, IB,IGCSE, A<br /> -Levels & Competitive
              Entrance Exams
            </h1>

            <p className=" mt-2 md:mt-4 leading-relaxed text-lg text-white font-medium">
              Live online exam preparation, score optimisation, and personalised
              admissions mentorship.
            </p>
          </div>

          <button
            type="button"
            className="flex gap-2 bg-white text-[#F36C45] py-2 text-xl font-bold mt-10 px-4 rounded-md hover:bg-gray-200 transition-colors"
          >
            <Phone /> Book A Free Consultation
          </button>
        </div>

        {/* Right Image Section */}

        {/* ================= LEFT CONTENT ================= */}
        <div className="lg:w-1/2 w-full flex flex-col gap-4">
          {/* IMAGE SLIDER */}
           <div className="relative w-[22rem] h-[22rem] lg:w-[25rem] lg:h-[25rem] mx-auto">
            
            {/* <div className="lg:relative lg:w-[100%] lg:h-[100%] mb-10">
            
              <div
                className="lg:absolute inset-0 z-10 top-[60px] lg:left-[60px]"
                style={{
                  backgroundImage: `url(${images[index].url})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  WebkitMaskRepeat: "no-repeat",
                  WebkitMaskSize: "100% 100%",
                  maskRepeat: "no-repeat",
                  maskSize: "100% 100%",
                  width: "18rem",
                  height: "18rem",
                  borderRadius: "4rem",
                }}
              />

              
              <img
                src="/home/round.png"
                alt="frame"
                className="hidden lg:block absolute    inset-0 w-full h-full z-20 pointer-events-none"
              />
            </div> */}


              <div className="w-full hidden lg:block">
                <div className="relative w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] lg:w-[450px] lg:h-[450px]">
                  <div className="lg:relative lg:w-[92%] lg:h-[91%]">
                    <div
                      className="lg:absolute inset-0 z-10 lg:top-[41px] lg:left-[38px]"
                      style={{
                        backgroundImage: `url(${images?.[index]?.url})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        width: "335px",
                        height: "335px",
                        borderRadius: "100px",
                      }}
                    />
                    <img
                      src="/home/round.png"
                      alt="frame"
                      className="absolute inset-0 w-full h-full z-20 pointer-events-none"
                    />
                  </div>
                </div>
              </div>


            <div
              style={{
                backgroundImage: `url('/hero-r-removebg-preview.png')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                width: "24rem",
                height: "8rem",
                borderRadius: "93px",
              }}
              className="flex gap-4 items-center justify-around capitalize mb-10"
            >
              <h2 className="text-2xl font-bold text-white">
                {images[index].name}
              </h2>
              <ul className="text-lg text-white">
                <li>{images[index].score_type}</li>
                <li className="text-3xl font-extrabold text-center">
                  {images[index].score}
                </li>
              </ul>
            </div>
          </div> 


          
        </div>
      </div>

      {/* 3D Buttons */}
      <div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap my-20 mx-20 gap-16"
          transition={{ duration: 0.6, delay: 0.2 }}
         
        >
          {images[index].data.map((ele, index) => (
            <div key={index} className="relative min-w-[18rem]">
              <div className="absolute  w-full h-full border-2 border-[#F36C45] rounded-[26px] -rotate-5 " />
              <div className="bg-white p-4 rounded-[26px] text-center shadow-sm relative">
                <h2 className="text-4xl font-bold text-[#F36C45] mb-2">
                  <CountUp end={parseInt(ele.number)} duration={1} />
                  {ele?.past}
                </h2>
                <p className="text-gray-600 text-xl">{ele.text}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

