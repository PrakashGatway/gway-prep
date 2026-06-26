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

  return (
    <div className="relative py-8 sm:py-10 lg:py-12  font-['Open_Sans','Helvetica_Neue',Arial,sans-serif]">
         {/* Heading */}
      <div className="text-center px-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 flex items-center justify-center gap-3">
          Meet our stars{" "}
          <Stars className="w-8 h-8 md:w-10 md:h-10 text-[#f26e46] fill-[#f26e46]" />
        </h2>
        <p className="text-gray-500 mt-3 text-base md:text-lg">
          Our students who made us proud
        </p>
      </div>

      <section
        ref={sliderRef}
        className="keen-slider max-w-7xl mx-auto bg-white"
      >
        {data.map((student: any, idx: number) => (
          <div
            key={idx}
            className="keen-slider__slide flex flex-col lg:flex-row gap-10 sm:gap-16 lg:gap-20"
          >
            <div className="lg:w-full flex flex-col items-center p-2">
            
              <img
                src={student}
                alt="logo"
                className="sm:h-full w-auto mt-6 "
              />
            </div>

          </div>
        ))}
      </section>

      {/* Buttons */}
      <button
        onClick={() => slider?.current?.prev()}
        className="absolute left-1 sm:left-2 md:left-4 top-1/2 -translate-y-1/2 z-10"
      >
        <ChevronLeft size={28} className="sm:size-[32px] md:size-[36px] text-[#FF6B35]" />
      </button>

      <button
        onClick={() => slider?.current?.next()}
        className="absolute right-1 sm:right-2 md:right-4 top-1/2 -translate-y-1/2 z-10"
      >
        <ChevronRight size={28} className="sm:size-[32px] md:size-[36px] text-[#FF6B35]" />
      </button>
    </div>
  );
}