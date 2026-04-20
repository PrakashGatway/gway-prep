"use client";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { ChevronLeft, ChevronRight } from "lucide-react";

const data = [
  {
    "name": "Akash Vikram",
    "education": {
      "university": "Carnegie Mellon University",
      "test_score": {
        "exam": "GMAT",
        "score": 760
      },
      logo : "/university.jpg"
    },
    "partnership_details": {
      "service_provider": "Ooshas",
      "support_offered": [
        "Offered him early morning classes to accommodate his work schedule",
        "Provided personalised sessions post-classes to increase his accuracy and speed",
        "Aided his prep through concept videos, sectional & full-length tests, solutions, and analytics of his performance via smart online learning portal",
        "Shortlisted MBA programs that suited his requirements",
        "Conducted brainstorming sessions with editors to write strong essays"
      ]
    },
    "outcome": {
      "admission": "Carnegie Mellon University",
      "business_school": "Tepper School of Business",
      "financial_aid": "$20,000 Scholarship"
    },
    "affiliations": [
      "University of Applied Sciences Europe"
    ]
  },
  {
    "name": " Vikram",
    "education": {
      "university": "Carnegie University",
      "test_score": {
        "exam": "GMAT",
        "score": 760
      },
      logo : "/university.jpg"
    },
    "partnership_details": {
      "service_provider": "Ooshas",
      "support_offered": [
        "Offered him early morning classes to accommodate his work schedule",
        "Provided personalised sessions post-classes to increase his accuracy and speed",
        "Aided his prep through concept videos, sectional & full-length tests, solutions, and analytics of his performance via smart online learning portal",
        "Shortlisted MBA programs that suited his requirements",
        "Conducted brainstorming sessions with editors to write strong essays"
      ]
    },
    "outcome": {
      "admission": "Carnegie Mellon University",
      "business_school": "Tepper School of Business",
      "financial_aid": "$20,000 Scholarship"
    },
    "affiliations": [
      "University of Applied Sciences Europe"
    ]
  },
  {
    "name": "Akash ",
    "education": {
      "university": "Carnegie Mellon University",
      "test_score": {
        "exam": "GMAT",
        "score": 760
      },
      logo : "/university.jpg"
    },
    "partnership_details": {
      "service_provider": "Ooshas",
      "support_offered": [
        "Offered him early morning classes to accommodate his work schedule",
        "Provided personalised sessions post-classes to increase his accuracy and speed",
        "Aided his prep through concept videos, sectional & full-length tests, solutions, and analytics of his performance via smart online learning portal",
        "Shortlisted MBA programs that suited his requirements",
        "Conducted brainstorming sessions with editors to write strong essays"
      ]
    },
    "outcome": {
      "admission": "Carnegie Mellon University",
      "business_school": "Tepper School of Business",
      "financial_aid": "$20,000 Scholarship"
    },
    "affiliations": [
      "University of Applied Sciences Europe"
    ]
  }


];


export function HomeStudent() {
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
            perView: 1, // 🔥 important (your card is big)
            spacing: 20,
          },
        },
      },
    },
    [
      (slider) => {
        let timeout: any;
        let mouseOver = false;

        const clearNextTimeout = () => timeout && clearTimeout(timeout);

        const nextTimeout = () => {
          clearNextTimeout();
          if (mouseOver) return;
          timeout = setTimeout(() => slider.next(), 4000);
        };

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

  return (
    <div className="relative">
      {/* Slider */}
      <section
        ref={sliderRef}
        className="keen-slider max-w-7xl mx-auto py-12 md:py-16 lg:py-20 bg-white"
      >
        {data.map((student: any, idx: number) => (
          <div
            key={idx}
            className="keen-slider__slide  bg-[#F3F4F6] rounded-[40px] p-8 md:p-12 flex flex-col md:flex-row gap-8"
          >
            {/* Left */}
            <div className="md:w-1/3 flex flex-col items-center">
              <div className="relative mb-6">
                <div className="w-40 h-40 md:w-64 md:h-64 rounded-2xl overflow-hidden border-4 border-white shadow-sm">
                  <img
                    src="/students/01.jpg"
                    alt={student.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="text-center md:text-left">
                <h2 className="text-[#FF6B35] text-2xl font-bold">
                  {student.name}
                </h2>
                <p className="text-gray-600 text-lg">
                  {student.education.university}
                </p>
                <p className="text-gray-600 text-lg font-semibold uppercase">
                  {student.education.test_score.exam}{" "}
                  {student.education.test_score.score}
                </p>
              </div>

              <img
                src={student.education.logo}
                alt="logo"
                className="h-20 w-full mt-8 mx-auto"
              />
            </div>

            {/* Right */}
            <div className="md:w-2/3 flex flex-col gap-6">
              <div className="bg-white rounded-3xl p-6 shadow-sm border">
                <h3 className="text-[#FF6B35] font-bold mb-4">
                  How did {student.partnership_details.service_provider} help{" "}
                  {student.name.split(" ")[0]}?
                </h3>
                <ul className="space-y-3">
                  {student.partnership_details.support_offered.map(
                    (item: string, i: number) => (
                      <li key={i} className="flex gap-2 text-sm text-gray-700">
                        <span className="text-[#FF6B35]">•</span>
                        {item}
                      </li>
                    )
                  )}
                </ul>
              </div>

              <div className="bg-white rounded-3xl p-6 shadow-sm border">
                <h3 className="text-[#FF6B35] font-bold mb-4">Outcome</h3>
                <ul className="space-y-1">
                  <li>• {student.outcome.admission}</li>
                  <li>• {student.outcome.business_school}</li>
                  <li>• {student.outcome.financial_aid}</li>
                </ul>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Buttons */}
      <button
        onClick={() => slider?.current?.prev()}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10"
      >
        <ChevronLeft size={36} className="text-[#FF6B35]" />
      </button>

      <button
        onClick={() => slider?.current?.next()}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10"
      >
        <ChevronRight size={36} className="text-[#FF6B35]" />
      </button>
    </div>
  );
}