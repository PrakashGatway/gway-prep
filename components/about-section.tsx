// HomeStudent.tsx
"use client";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { ChevronLeft, ChevronRight, Stars } from "lucide-react";

export function AboutSection({data}:{data : any}) {
  const [sliderRef, slider] = useKeenSlider(
    {
      loop: true,
      slides: {
        perView: 1,
        spacing: 16,
      },
      breakpoints: {
        "(min-width: 640px)": {
          slides: {
            perView: 1, 
            spacing: 20,
          },
        },
        "(min-width: 768px)": {
          slides: {
            perView: 1,
            spacing: 24,
          },
        },
        "(min-width: 1024px)": {
          slides: {
            perView: 1,
            spacing: 32,
          },
        },
      },
    },
    [
      (slider) => {
        let timeout: any;
        let mouseOver = false;

        const clearNextTimeout = () => {
          if (timeout) clearTimeout(timeout);
        };

        const nextTimeout = () => {
          clearNextTimeout();
          if (mouseOver) return;
          
          timeout = setTimeout(() => {
            if (slider.track && slider.track.details) {
              slider.next();
            }
          }, 4000);
        };

        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true;
            clearNextTimeout();
          });

          slider.container.addEventListener("mouseout", () => {
            mouseOver = false;
            if (slider.track && slider.track.details) {
              nextTimeout();
            }
          });

          nextTimeout();
        });

        slider.on("dragStarted", clearNextTimeout);
        slider.on("animationEnded", nextTimeout);
        slider.on("updated", nextTimeout);
        slider.on("destroyed", () => {
          clearNextTimeout();
        });
      },
    ]
  );
  // // console.log(data.fields ,"qweqeqweqwqwqwqw ")

  return (
    <div className="relative py-8 sm:py-10 lg:py-12  ">
         {/* Heading */}
      <div className="text-center px-2 sm:px-4 max-w-7xl mx-auto">
        <h2 className=" text-2xl md:text-3xl lg:text-4xl text-gray-800 font-semibold flex items-center justify-center gap-3">
          {data.fields?.title || "Meet our stars"}{" "}
        </h2>
        <p className=" mt-3 text-base md:text-lg text-gray-800 font-medium text-left sm:text-justify mx-auto px-1.5 sm:px-4">
          {data.fields?.subtitle || "Our students who made us proud"}
        </p>
      </div>

      <section
        ref={sliderRef}
        className="keen-slider max-w-5xl mx-auto bg-white"
      >
        {data.fields?.items.map((student: any, idx: number) => (
          <div
            key={idx}
            className="keen-slider__slide flex flex-col lg:flex-row gap-10 sm:gap-16 lg:gap-20"
          >
            <div className="lg:w-full flex flex-col items-center p-2">
            
              <img
                src={student.image}
                alt={student.imageAlt || student.title || data.fields?.title || "Meet our stars"}
                className="sm:h-full w-auto mt-6 "
              />
            </div>

          </div>
        ))}
      </section>

      {/* Buttons */}
      <button
        onClick={() => slider?.current?.prev()}
        className="absolute hidden left-1 sm:left-2 md:left-24 bottom-[40%]  z-10">
        <ChevronLeft size={28} className="sm:size-[32px] md:size-[36px] text-[#FF6B35]" />
      </button>

      <button
        onClick={() => slider?.current?.next()}
        className="absolute hidden right-1 sm:right-2 md:right-24 bottom-[40%]  z-10">
        <ChevronRight size={28} className="sm:size-[32px] md:size-[36px] text-[#FF6B35]" />
      </button>
    </div>
  );
}
