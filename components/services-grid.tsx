"use client";

import Image from "next/image";

export function ServicesGrid() {
  const services = [
    { icon: "/icon/coach.png", text: "Experienced and qualified coaches" },
    { icon: "/icon/attention.png", text: "Personalized attention" },
    { icon: "/icon/track.png", text: "Proven track record of success" },
    { icon: "/icon/material.png", text: "Comprehensive study materials" },
    { icon: "/icon/scheduling.png", text: "Flexible scheduling" },
    { icon: "/icon/testinomial.png", text: "Positive student testimonials" },
    { icon: "/icon/progress.png", text: "Regular progress tracking" },
    { icon: "/icon/fees.png", text: "Affordable fees" },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="sm:mx-6 lg:px-8 mx-auto">

        {/* Heading */}
        <h2 className="text-4xl text-[#626363] font-semibold text-center mb-20">
          Why Families Choose{" "}
          <span className="text-brand-orange">Ooshash prep</span>{" "}
          For Success
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4">
          {services.map((item, index) => {
            const isLastCol = (index + 1) % 4 === 0;
            const isFirstRow = index < 4;

            return (
              <div
                key={index}
                className="relative flex flex-col items-center text-center px-6 py-12"
              >
                {/* Right Border (except last column) */}
                {!isLastCol && (
                  <span className="absolute right-0 top-0 h-full w-[2px] bg-brand-orange" />
                )}

                {/* Bottom Border (only first row) */}
                {isFirstRow && (
                  <span className="absolute left-0 bottom-0 w-full h-[2px] bg-brand-orange" />
                )}

                <Image src={item.icon} alt="" width={84} height={44} />

                <p className="mt-4 text-gray-600 font-medium max-w-[180px]">
                  {item.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}