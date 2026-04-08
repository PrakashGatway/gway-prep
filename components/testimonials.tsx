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

export function VideoTestimonialCard() {
  const [index, setIndex] = useState(0);

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
    <>
      {/* Heading */}
      <div className="text-center my-10">
        <h1 className="text-4xl font-bold">
          <span className="text-[#FF6B35]">What Our</span>{" "}
          <span className="text-[#626363]">Students Say</span>
        </h1>
      </div>

      {/* Slider */}
      <div className="relative sm:px-6 lg:px-8 mx-auto overflow-hidden">
        <div ref={sliderRef} className="keen-slider">
          {videoData.map((item) => {
            const videoId = getYoutubeId(item.youtubeUrl);

            return (
              <div
                key={item._id}
                className="keen-slider__slide flex justify-center"
              >
                {/* PNG FRAME */}
                <div
                  className="relative w-[420px] h-[270px] bg-no-repeat bg-contain bg-center bg-[#F46C44]"
                  // style={{ backgroundImage: "url(/image/video-border.png)" }}
                >
                  <div className="absolute inset-[14px] flex flex-col">
                    {/* HEADER */}
                    <div className="text-white text-sm mb-2 truncate mt-[10px] ml-[27px]">
                      <span className="font-semibold">
                        Congratulations, {item.studentName}!
                      </span>{" "}
                      | {item.exam} {item.score}
                    </div>

                    {/* VIDEO */}
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
    </>
  );
}



export function TextTestimonials() {
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
  ];

  return (
    <div className="min-h-screen bg-gray-100 mt-10 px-4 sm:px-6 md:px-8 lg:px-8 py-8 md:py-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col  gap-8 md:gap-12">
          {/* Left Section */}
          <div className="w-full flex flex-col text-center">
            <h1 className="text-2xl sm:text-3xl md:text4xl font-semibold text-gray-600 leading-tight">
              What Our Test Preparation {" "}
              <span className="text-[#FF6B35]">Achievers Say</span>
              
            </h1>
          </div>

          {/* Right Section - Testimonial Cards */}
          <div className=" flex items-center flex-wrap lg:flex-nowrap gap-10 h-auto ">
            {/* Card 1 - Stacked on mobile, positioned on desktop */}
            <div className="h-64 w-full shadow-lg bg-white 
             rounded-3xl p-6 mb-4 lg:mb-0 transform lg:translate-x-0 ">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-4 gap-2">
                <h3 className="text-xl sm:text-2xl font-bold text-[#FF6B35]">
                  {testimonials[0].name}: {testimonials[0].score}
                </h3>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => ( 
                    <Star
                      key={i}
                      size={20}
                      className="fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                {testimonials[0].text}
              </p>
            </div>

            {/* Card 2 */}
            <div className="h-64 rotate-4 shadow-lg w-full bg-white  rounded-3xl p-6 mb-4 lg:mb-0 transform lg:translate-x-0 z-10">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-4 gap-2">
                <h3 className="text-xl sm:text-2xl font-bold text-[#FF6B35]">
                  {testimonials[1].name}: {testimonials[1].score}
                </h3>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className="fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                {testimonials[1].text}
              </p>
            </div>

            {/* Card 3 */}
            <div className="h-64 -rotate-2 shadow-lg w-full bg-white  rounded-3xl p-6 transform lg:translate-x-0 z-10">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-4 gap-2">
                <h3 className="text-xl sm:text-2xl font-bold text-[#FF6B35]">
                  {testimonials[2].name}: {testimonials[2].score}
                </h3>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className="fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                {testimonials[2].text}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
