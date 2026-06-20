"use client";

import { Phone } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {HomeCountUp} from '@/app/components/HomeCountUp';


type HeroProps = {
  data: {
    fields: {
      title: string;
      subtitle: string;
      paragraph: string;
      students : any;
    };
  };
  student : any;
};


export function Hero({data, student}:HeroProps) {
  const bookCallRef = useRef<HTMLButtonElement>(null);
  const callUsRef = useRef<HTMLButtonElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const [images,setimages] = useState<any[]>(student.data || []);
  const [index, setIndex] = useState(0);

  console.log(data)
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
      <div className={`h-[22rem]  lg:h-[30rem] mx-auto m-6 flex flex-col lg:flex-row  items-center gap-6 md:gap-10 max-w-7xl`}>
        {/* Left Content Section */}
        <div className="lg:w-[70%] w-full pt-20">
          <div className="">
            <h1 className="text-2xl  md:text-3xl lg:text-5xl font-bold leading-tight text-white">
              {data.fields.title || ``}
            </h1>

            <h1 className="text-xl  md:text-2xl lg:text-4xl font-semibold leading-tight text-white mt-4">
              {data.fields.subtitle ||""}
            </h1>

            <p className=" mt-2 md:mt-4 leading-relaxed text-lg text-white font-medium">
             {data.fields.paragraph || ``}
            </p>
          </div>

          <button
            type="button"
            className="flex gap-2 bg-white text-[#F36C45] py-2 text-xl font-bold mt-10 px-4 rounded-md hover:bg-gray-200 transition-colors"
          >
            <Phone /> Book A Free Consultation
          </button>
        </div>


        <div className="lg:w-1/2 w-full flex flex-col gap-4">
          {/* IMAGE SLIDER */}
           <div className="relative w-[22rem] h-[22rem] lg:w-[25rem] lg:h-[25rem] mx-auto">
            


              <div className="w-full  ">
                <div className="mx-auto relative w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] lg:w-[450px] lg:h-[450px]">
                  <div className="lg:relative lg:w-[92%] lg:h-[91%]">
                    <div
                      className="absolute inset-0 z-10 lg:w-[335px] lg:h-[335px] lg:top-[41px] lg:left-[38px]"
                      style={{
                        backgroundImage: `url(${images?.[index]?.image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        // width: "335px",
                        // height: "335px",
                        borderRadius: "100px",
                      }}
                    />
                    <img
                      src="/home/round.png"
                      alt="frame"
                      className="hidden lg:block absolute inset-0 w-full h-full z-20 pointer-events-none"
                    />
                  </div>
                </div>
              </div>


            <div
              style={{
                backgroundImage: `url('/hero-r-removebg-preview.png')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                // width: "24rem",
                height: "7rem",
                // borderRadius: "93px",
              }}
              className="flex gap-4 lg:w-[24rem] w-full items-center justify-around capitalize mb-10"
            >
              <h2 className="text-2xl font-bold text-white">
                {images[index].name}
              </h2>
              <ul className="text-lg text-white">
                <li>{images[index].course}</li>
                <li className="text-3xl font-extrabold text-center">
                  {images[index]?.score}
                </li>
              </ul>
            </div>
          </div> 
          
        </div>
      </div>

      <HomeCountUp data={data} />
      {/* <div>
        <motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }} // Changes from animate to whileInView
  viewport={{ once: false, amount: 0.2 }} // Ensures it runs every time (once: false)
  transition={{ duration: 0.6, delay: 0.2 }}
  className="flex flex-wrap my-20 mx-20 gap-16"
        >

          {['experience','Happystudent','Rating','Lectured'].map((ele, idx) => (
            <div key={idx} className="relative min-w-[18rem]">
              <div className="absolute  w-full h-full border-2 border-[#F36C45] rounded-[26px] -rotate-5 " />
              <div className="bg-white p-4 rounded-[26px] text-center shadow-sm relative">
                <h2 className="text-4xl font-bold text-[#F36C45] mb-2">
                  <CountUp end={parseInt(data?.fields?.[ele]?.split("||")[1])} duration={1} />
                  {ele === "Rating" ? '/5': "+"}
                </h2>
                <p className="text-gray-600 text-xl">{data?.fields?.[ele]?.split("||")[0]}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div> */}
    </section>
  );
}

