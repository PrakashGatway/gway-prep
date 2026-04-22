"use client";

import Image from "next/image";

export function ServicesGrid({data}:{data:any}) {

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
    <section className="max-w-7xl mx-auto py-24 bg-white">
      <div className="sm:mx-6 lg:px-8 mx-auto">
        {/* Heading */}
        <div dangerouslySetInnerHTML={{ __html: data.fields.title }} />

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          { data.fields.items.map((item:any, index:number) => {
            const isLastInRow = (index + 1) % 4 === 0;
            const isFirstRow = index < 4;

            return (
              <div
                key={index}
                className={` relative flex flex-col items-center text-center px-4 py-8 
                  ${!isLastInRow ? "lg:border-r-3 " : ""} 
                  ${isFirstRow ? "lg:border-b-3 " : ""} 
                  border-brand-orange`} >
                    
                <Image
                  src={item.icon}
                  alt="icon"
                  width={84}
                  height={84}
                  className="h-[7rem] w-[8rem]"
                />
                <p className="mt-2 text-gray-600 text-xl font-medium max-w-[180px]">
                  {item.title}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
