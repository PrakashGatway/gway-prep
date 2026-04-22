"use client";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Star,
  Clock,
  Share2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

export function VideoTestimonialCard({heading,data}:any) {
  const [index, setIndex] = useState(0);
 console.log(data)
  const videoData = [
    {
      _id: "1",
      studentName: "Deepika Sharma",
      exam: "IELTS",
      score: "8.5 Band",
      title: "My IELTS Success Story",
      description: "How I achieved my target IELTS score with proper guidance.",
      youtubeUrl: "https://youtu.be/QdzXkIt9_7M",
    },
    {
      _id: "2",
      studentName: "Radhika Verma",
      exam: "PTE",
      score: "79 Score",
      title: "My PTE Journey",
      description: "Daily practice and expert mentoring helped me succeed.",
      youtubeUrl: "https://youtu.be/6V_A_gCTIi0",
    },
    {
      _id: "3",
      studentName: "Deepika Sharma",
      exam: "IELTS",
      score: "8.5 Band",
      title: "IELTS Preparation Experience",
      description: "A second attempt success story with Gateway Abroad.",
      youtubeUrl: "https://youtu.be/QdzXkIt9_7M",
    },
  ];

  const getYoutubeId = (url: string) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

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
            perView: 3,
            spacing: 20,
          },
        },
      },
    },
    [
      (slider) => {
        let timeout: any;
        let mouseOver = false;

        function clearNextTimeout() {
          if (timeout) clearTimeout(timeout);
        }

        function nextTimeout() {
          if (mouseOver) return;
          timeout = setTimeout(() => {
            slider.next();
          }, 4000);
        }

        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true;
            clearNextTimeout();
          });
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false;
            nextTimeout();
          });
          nextTimeout();
        });

        slider.on("dragStarted", clearNextTimeout);
        slider.on("animationEnded", nextTimeout);
        slider.on("updated", nextTimeout);
      },
    ],
  );

  return (
    <div className="max-w-7xl mx-auto">
      {/* Heading */}
      <div className="text-center my-10">
        {/* <h1 className="text-4xl font-bold">
          <span className="text-[#FF6B35]">What Our</span>{" "}
          <span className="text-[#626363]">Students Say</span>
        </h1> */}
      <div dangerouslySetInnerHTML={{__html: heading?.fields['video-testimonial-title']}} />

      </div>

      {/* Slider */}
      <div className="relative sm:px-6 lg:px-8 mx-auto overflow-hidden">
        <div ref={sliderRef} className="keen-slider">
          {data.data.map((item:any) => {
            const videoId = getYoutubeId(item.video);
              if(!videoId) return ;
            return (
              <div
                key={item._id}
                className="keen-slider__slide flex justify-center"
              >
                
                <div
                  className="relative w-[420px] h-[270px] bg-no-repeat bg-contain bg-center bg-[#F46C44]"
                  // style={{ backgroundImage: "url(/image/video-border.png)" }}
                >
                  <div className="absolute inset-[14px] flex flex-col">
                  
                    <div className="text-white text-sm mb-2 truncate mt-[10px] ml-[27px]">
                      <span className="font-semibold">
                        Congratulations, {item.name}!
                      </span>{" "}
                      | {item.couse} {item.score}
                    </div>

                    <div className="flex items-center justify-center mt-4 h-[175px]  rounded-[20px] overflow-hidden bg-black">
                      {videoId && (
                        <iframe
                          src={`https://www.youtube.com/embed/${videoId}`}
                          title={item.title}
                          className="w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Arrows */}
        {/* <button
          onClick={() => slider?.current?.prev()}
          className="absolute left-0 top-1/2 -translate-y-1/2 text-[#FF6B35]"
        >
          <ChevronLeft size={36} />
        </button>

        <button
          onClick={() => slider?.current?.next()}
          className="absolute right-0 top-1/2 -translate-y-1/2 text-[#FF6B35]"
        >
          <ChevronRight size={36} />
        </button> */}
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 sm:px-6 lg:px-8 mt-6">
        {videoData.map((_, i) => (
          <button
            key={i}
            onClick={() => slider?.current?.moveToIdx(i)}
            className={`w-3 h-3 rounded-full ${
              slider?.current?.track.details.rel === i
                ? "bg-[#FF6B35]"
                : "bg-[#FF6B35]/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}



export function TextTestimonials({heading,data}:any) {
  const testimonials = [
    {
      name: "Khushal",
      score: 80,
      text: "My journey with Gateway Abroad Jaipur went beyond my expectations. The mock tests provided by my trainers gave an accurate simulation of the real exam, regular feedback on my performance...",
      rating: 5,
    },
    {
      name: "Mayank",
      score: 80,
      text: "Gateway Abroad Jaipur made studying PTE seamless. I still can't believe that I scored 80. This is all because of the efforts of my trainers. They provided everything from personal attention to practice tests to doubt sessions. So, in my opinion, thi....",
      rating: 5,
    },
    {
      name: "Mayank",
      score: 80,
      text: "Gateway Abroad Jaipur made studying PTE seamless. I still can't believe that I scored 80. This is all because of the efforts of my trainers. They provided everything, from personal attention to practice tests to doubt sessions. So, in my opinion, thi....",
      rating: 5,
    },
  
    {
      name: "Khushal",
      score: 80,
      text: "My journey with Gateway Abroad Jaipur went beyond my expectations. The mock tests provided by my trainers gave an accurate simulation of the real exam, regular feedback on my performance...",
      rating: 5,
    },
    {
      name: "Mayank",
      score: 80,
      text: "Gateway Abroad Jaipur made studying PTE seamless. I still can't believe that I scored 80. This is all because of the efforts of my trainers. They provided everything from personal attention to practice tests to doubt sessions. So, in my opinion, thi....",
      rating: 5,
    },
    {
      name: "Mayank",
      score: 80,
      text: "Gateway Abroad Jaipur made studying PTE seamless. I still can't believe that I scored 80. This is all because of the efforts of my trainers. They provided everything, from personal attention to practice tests to doubt sessions. So, in my opinion, thi....",
      rating: 5,
    }
  ]; 

  
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
            perView: 3,
            spacing: 20,
          },
        },
      },
    },
    [
      (slider) => {
        let timeout: any;
        let mouseOver = false;

        function clearNextTimeout() {
          if (timeout) clearTimeout(timeout);
        }

        function nextTimeout() {
          if (mouseOver) return;
          timeout = setTimeout(() => {
            slider.next();
          }, 4000);
        }

        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true;
            clearNextTimeout();
          });
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false;
            nextTimeout();
          });
          nextTimeout();
        });

        slider.on("dragStarted", clearNextTimeout);
        slider.on("animationEnded", nextTimeout);
        slider.on("updated", nextTimeout);
      },
    ],
  );

  return (
    <div className=" bg-gray-100 mt-10 px-4 sm:px-6 md:px-8 lg:px-8 py-8 md:py-16">
      <div className="max-w-7xl mx-auto p-10 overflow-hidden">
        <div className="flex flex-col  gap-8 md:gap-12">
          
          <div className="w-full flex flex-col text-center">
            {/* <h1 className="text-2xl sm:text-3xl md:text4xl font-semibold text-gray-600 leading-tight">
              What Our Test Preparation {" "}
              <span className="text-[#FF6B35]">Achievers Say</span>
            </h1> */}
          <div dangerouslySetInnerHTML={{__html: heading.fields['title']}} />

          </div>

          <div ref={sliderRef} className="keen-slider flex items-center  max-w-7xl p-xl" style={{overflow : "visible"}}>

            {data.data.filter(ele => ele.type === "image").map((item:any,idx:number) => {
              const num = idx % 2 === 0 ? 'rotate-1': '-rotate-1';
              return (
                
              <div key={idx} className={`${num} keen-slider__slide h-64  shadow-lg w-full bg-white  rounded-3xl p-6 transform lg:translate-x-0 z-10`}>
                <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-4 gap-2">
                  <h3 className="text-xl sm:text-2xl font-bold text-[#FF6B35]">
                    {item.name}: {item.score}
                  </h3>
                  <div className="flex gap-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star
                        key={i}
                        size={20}
                        className="fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                  {item.message}
                </p>
              </div>
              );
            })}

          </div>
        </div>
      </div>
    </div>
  );
}
