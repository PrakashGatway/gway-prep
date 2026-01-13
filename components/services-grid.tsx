"use client"

import Image from "next/image"

export function ServicesGrid() {
  return (
    <section className="py-24 bg-white">
      <div className="sm:mx-6 lg:px-8 mx-auto">

        {/* Heading */}
        <h2 className="text-4xl font-extrabold text-center mb-20">
          <span className="text-brand-orange">Best in the Industry</span>{" "}
          <span className="text-[#626363]">Coaching Services</span>
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4">

          {/* ===== ROW 1 ===== */}

          <div className="relative flex flex-col items-center text-center px-6 py-12">
            <span className="absolute right-0 top-0 h-full w-[3px] bg-brand-orange" />
            <span className="absolute left-0 bottom-0 w-full h-[2px] bg-brand-orange" />
            <Image src="/icon/coach.png" alt="" width={84} height={44} />
            <p className="mt-4 text-gray-600 font-medium max-w-[180px]">
              Experienced and qualified coaches
            </p>
          </div>

          <div className="relative flex flex-col items-center text-center px-6 py-12">
            <span className="absolute right-0 top-0 h-full w-[2px] bg-brand-orange" />
            <span className="absolute left-0 bottom-0 w-full h-[2px] bg-brand-orange" />
            <Image src="/icon/attention.png" alt="" width={84} height={44} />
            <p className="mt-4 text-gray-600 font-medium max-w-[180px]">
              Personalized attention
            </p>
          </div>

          <div className="relative flex flex-col items-center text-center px-6 py-12">
            <span className="absolute right-0 top-0 h-full w-[2px] bg-brand-orange" />
            <span className="absolute left-0 bottom-0 w-full h-[2px] bg-brand-orange" />
            <Image src="/icon/track.png" alt="" width={84} height={44} />
            <p className="mt-4 text-gray-600 font-medium max-w-[180px]">
              Proven track record of success
            </p>
          </div>

          <div className="relative flex flex-col items-center text-center px-6 py-12">
            <span className="absolute left-0 bottom-0 w-full h-[2px] bg-brand-orange" />
            <Image src="/icon/material.png" alt="" width={84} height={44} />
            <p className="mt-4 text-gray-600 font-medium max-w-[180px]">
              Comprehensive study materials
            </p>
          </div>

          {/* ===== ROW 2 ===== */}

          <div className="relative flex flex-col items-center text-center px-6 py-12">
            <span className="absolute right-0 top-0 h-full w-[3px] bg-brand-orange" />
            <Image src="/icon/scheduling.png" alt="" width={84} height={44} />
            <p className="mt-4 text-gray-600 font-medium max-w-[180px]">
              Flexible scheduling
            </p>
          </div>

          <div className="relative flex flex-col items-center text-center px-6 py-12">
            <span className="absolute right-0 top-0 h-full w-[2px] bg-brand-orange" />
            <Image src="/icon/testinomial.png" alt="" width={84} height={44} />
            <p className="mt-4 text-gray-600 font-medium max-w-[180px]">
              Positive student testimonials
            </p>
          </div>

          <div className="relative flex flex-col items-center text-center px-6 py-12">
            <span className="absolute right-0 top-0 h-full w-[2px] bg-brand-orange" />
            <Image src="/icon/progress.png" alt="" width={84} height={44} />
            <p className="mt-4 text-gray-600 font-medium max-w-[180px]">
              Regular progress tracking
            </p>
          </div>

          <div className="relative flex flex-col items-center text-center px-6 py-12 ">
            <Image src="/icon/fees.png" alt="" width={84} height={44} />
            <p className="mt-4 text-gray-600 font-medium max-w-[180px]">
              Affordable fees
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}
