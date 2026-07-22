"use client"
import { useState } from 'react';
import { useKeenSlider } from 'keen-slider/react'
import "keen-slider/keen-slider.min.css";
import Image from "next/image"




export default function Studentrankslider(){


   const studentData = [
  {
    name: "Nishtha Choudhary",
    courseName: "GMAT",
    rank: "720",
    content:
      "Expert guidance and structured mocks helped me crack GMAT with confidence.",
  },
  {
    name: "Mayank Sharma",
    courseName: "PTE",
    rank: "85",
    content:
      "Regular feedback and practice sessions made PTE scoring easier.",
  },
  {
    name: "Varsha Verma",
    courseName: "IELTS",
    rank: "8.5",
    content:
      "One-to-one mentoring helped me achieve my target IELTS band.",
  },
   {
    name: "Nishtha Choudhary",
    courseName: "GMAT",
    rank: "720",
    content:
      "Expert guidance and structured mocks helped me crack GMAT with confidence.",
  },
  {
    name: "Mayank Sharma",
    courseName: "PTE",
    rank: "85",
    content:
      "Regular feedback and practice sessions made PTE scoring easier.",
  },
  {
    name: "Varsha Verma",
    courseName: "IELTS",
    rank: "8.5",
    content:
      "One-to-one mentoring helped me achieve my target IELTS band.",
  },
   {
    name: "Nishtha Choudhary",
    courseName: "GMAT",
    rank: "720",
    content:
      "Expert guidance and structured mocks helped me crack GMAT with confidence.",
  },
  {
    name: "Mayank Sharma",
    courseName: "PTE",
    rank: "85",
    content:
      "Regular feedback and practice sessions made PTE scoring easier.",
  },
  {
    name: "Varsha Verma",
    courseName: "IELTS",
    rank: "8.5",
    content:
      "One-to-one mentoring helped me achieve my target IELTS band.",
  },
   {
    name: "Varsha Verma",
    courseName: "IELTS",
    rank: "8.5",
    content:
      "One-to-one mentoring helped me achieve my target IELTS band.",
  },
];



const [currentSlide, setCurrentSlide] = useState(0);
const [loaded, setLoaded] = useState(false);

const [studentInfoRef, studentInfoInstanceRef] = useKeenSlider(
  {
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
    loop: true,
    mode: "snap",
    slides: {
      perView: 1,
      spacing: 16,
    },
    drag: false,
  },
  [
    (slider) => {
      let timeout;
      let mouseOver = false;

      function clearNextTimeout() {
        if (timeout) clearTimeout(timeout);
      }

      function nextTimeout() {
        if (mouseOver) return;
        timeout = setTimeout(() => {
          slider.next();
        }, 2000);
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
  ]
);



    return(
        <>
        <div className='bg-[#f4f4f4]  overflow-hidden py-7'>
            <section className="my-4">
  <div className="overflow-hidden">
    <div className="flex marquee-track">
      {[...studentData, ...studentData].map((s, i) => (
        <div
          key={i}
          className="
            bg-white border border-black rounded-xl
            px-5 py-2 mx-2 min-w-[220px]
            text-center text-[#666666] flex-shrink-0
          "
        >
          <p className="text-sm font-semibold">{s.name}</p>
          <p className="text-sm">
            {s.courseName} <span className="font-bold">{s.rank}</span>
          </p>
        </div>
      ))}
    </div>
  </div>

  {/* INLINE STYLE — NOT JSX */}
  <style>{`
    @keyframes marquee {
      from { transform: translateX(0); }
      to { transform: translateX(-50%); }
    }
    .marquee-track {
      display: flex;
      width: max-content;
      animation: marquee 40s linear infinite;
    }
    .marquee-track:hover {
      animation-play-state: paused;
    }
  `}</style>
</section>




<section className="">
  <div className="overflow-hidden">
    <div className="flex marquee-track-reverse">
      {[...studentData, ...studentData].map((s, i) => (
        <div
          key={i}
          className="
            flex gap-2 rounded-xl
            px-5 py-2 mx-2 min-w-[220px]
            text-center text-[#e87a4d] flex-shrink-0
          "
        >
          <p className="text-sm font-semibold">{s.name}</p>
          <p className="text-sm">
            {s.courseName} <span className="font-bold">{s.rank}</span>
          </p>
        </div>
      ))}
    </div>
  </div>

  <style>{`
    @keyframes marqueeReverse {
      from { transform: translateX(-50%); }
      to { transform: translateX(0); }
    }
    .marquee-track-reverse {
      display: flex;
      width: max-content;
      animation: marqueeReverse 55s linear infinite;
    }
    .marquee-track-reverse:hover {
      animation-play-state: paused;
    }
  `}</style>
</section>

        </div>
      







        </>
    )
}