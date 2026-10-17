"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import StudentStoryCard from "./student-story-card";

type Props = { students: any[] };

export default function ExploreStoriesSlider({ students,stories }: Props) {
  if (!students.length) return null;

  return (
    <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-12 lg:px-8">
      <div className="mb-6 flex items-end justify-between gap-5 sm:mb-7">
        <div>
          <p className="text-sm font-bold uppercase tracking-[.18em] text-[#F36D45]">{stories?.eyebrow||"Keep exploring"}</p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">{stories?.title||"More student success stories"}</h2>
        </div>
        <Link href="/case-study" className="hidden items-center gap-2 text-sm font-bold text-[#E56440] transition hover:text-[#A9472D] sm:inline-flex">All case studies <ArrowRight size={16} /></Link>
      </div>
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        spaceBetween={16}
        slidesPerView={1.08}
        navigation
        pagination={{ clickable: true }}
        loop={students.length > 3}
        autoplay={students.length > 1 ? { delay: 3400, disableOnInteraction: false, pauseOnMouseEnter: true } : false}
        breakpoints={{ 640: { slidesPerView: 2, spaceBetween: 18 }, 1024: { slidesPerView: 3, spaceBetween: 22 } }}
        className="case-study-story-swiper !pb-12"
      >
        {students.map((student, index) => {
          const key = student._id || `${student.name || "student"}-${index}`;
          return (
            <SwiperSlide key={key} className="!h-auto">
              <StudentStoryCard student={student} index={index} />
            </SwiperSlide>
          );
        })}
      </Swiper>
      <Link href="/case-study" className="mt-1 inline-flex items-center gap-2 text-sm font-bold text-[#E56440] sm:hidden">All case studies <ArrowRight size={16} /></Link>
      <style jsx global>{`
        .case-study-story-swiper .swiper-button-next,
        .case-study-story-swiper .swiper-button-prev { color: #f36d45; background: white; border: 1px solid #f0d8cc; border-radius: 9999px; width: 40px; height: 40px; box-shadow: 0 5px 18px rgba(41,37,34,.12); }
        .case-study-story-swiper .swiper-button-next:after,
        .case-study-story-swiper .swiper-button-prev:after { font-size: 14px; font-weight: 800; }
        .case-study-story-swiper .swiper-pagination-bullet { background: #f36d45; opacity: .3; }
        .case-study-story-swiper .swiper-pagination-bullet-active { opacity: 1; }
      `}</style>
    </section>
  );
}
