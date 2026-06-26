// HomeStudent.tsx
"use client";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function HomeStudent({data}:{data : any}) {
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
    <div className="relative my-4 sm:my-6 lg:my-8 font-['Open_Sans','Helvetica_Neue',Arial,sans-serif]  bg-[#FDF4EF]"  style={{
              backgroundImage: 'url("/home/grid.png")',
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}>

      <section
        ref={sliderRef}
        className="keen-slider max-w-7xl mx-auto py-4 "
      >
        {data.data.map((student: any, idx: number) => (
          <div
            key={idx}
            className="keen-slider__slide  p-6 
             flex flex-col lg:flex-row gap-10 sm:gap-16 lg:gap-20 "
          >
            <div className="lg:w-1/3 flex flex-col items-center">
              <div className="relative mb-4 sm:mb-6">
                <div className="h-14 w-14 rounded-lg bg-[#f26e46] absolute bottom-18 -left-16" />
                <div className="h-16 w-16 rounded-lg border-2 border-[#f26e46] absolute bottom-6 -right-18" />
                <div className="h-10 w-10 rounded-lg bg-[#f26e46] absolute top-2 -right-14" />
                <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 xl:w-64 xl:h-64 rounded-2xl ">
                  <img
                    src={student.image ?? "/students/01.jpg"}
                    alt={student?.name}
                    className="w-full h-full object-cover  rounded-2xl "
                  />
                </div>
              </div>

              <div className="text-center">
                <h2 className="text-[#FF6B35] text-xl sm:text-2xl font-bold">
                  {student.name}
                </h2>
                {student?.university && <p className="text-gray-600 text-base sm:text-lg">
                  {student?.university}
                </p>}
                <p className="text-gray-600 text-base sm:text-lg font-semibold uppercase">
                  {student?.course}{" "}
                  {student?.score}
                </p>
              </div>

              {student?.universityLogo && 
              <img
                src={student?.universityLogo}
                alt="logo"
                className="h-16 sm:h-20 w-auto mt-6 sm:mt-8"
              />}
            </div>

            <div className="lg:w-2/3 flex flex-col gap-4 sm:gap-6">
              <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-sm border">
                <h3 className="text-[#FF6B35] font-bold mb-3 sm:mb-4 text-base sm:text-lg">
                  How did {"Ooshaprap"} help{" "}
                  {student.name}?
                </h3>
                <div className="text-sm sm:text-base" dangerouslySetInnerHTML={{__html: student.about}} />
              </div>

              <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-sm border">
                <h3 className="text-[#FF6B35] font-bold mb-3 sm:mb-4 text-base sm:text-lg">Outcome</h3>
                <div className="text-sm sm:text-base" dangerouslySetInnerHTML={{__html : student.outcome}} />
              </div>
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