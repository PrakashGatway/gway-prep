"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight, Trophy } from "lucide-react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { slugify } from "@/app/lib/slug";

type Props = { students: any[] };

export default function ExploreStoriesSlider({ students }: Props) {
  if (!students.length) return null;

  return (
    <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-12 lg:px-8">
      <div className="mb-6 flex items-end justify-between gap-5 sm:mb-7">
        <div>
          <p className="text-sm font-bold uppercase tracking-[.18em] text-[#F36D45]">Keep exploring</p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">More student success stories</h2>
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
        {students.map((student) => {
          const slug = slugify(student?.slug || "");
          if (!slug) return null;
          return (
            <SwiperSlide key={student._id || slug} className="!h-auto">
              <Link href={`/case-study/${slug}`} className="group flex h-full min-h-[360px] flex-col overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#292522] text-white shadow-[0_15px_40px_rgba(41,37,34,.14)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_55px_rgba(41,37,34,.24)]">
                <div className="relative h-52 shrink-0 overflow-hidden bg-gradient-to-br from-[#FFB09D] via-[#FF907F] to-[#F36D45]">
                  {student.image ? (
                    // Student photos are managed through the admin upload flow.
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={student.image} alt={student.name || "Ooshas Prep student"} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                  ) : <div className="flex h-full items-center justify-center text-7xl font-black text-white/70">{String(student.name || "S").charAt(0)}</div>}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#181615]/90 via-[#181615]/5 to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full bg-[#F36D45] px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[.16em]">Achievement spotlight</span>
                  {student.score && <span className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 rounded-xl bg-white px-3 py-2 text-sm font-black text-[#292522] shadow-lg"><Trophy size={15} className="text-[#F36D45]" />{student.score}</span>}
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-xs font-bold uppercase tracking-[.15em] text-[#FFB09D]">{student.course || "Ooshas Prep learner"}</p>
                    <h3 className="mt-1 text-2xl font-black tracking-tight">{student.name || "Student success story"}</h3>
                  </div>
                </div>
                <div className="flex flex-1 items-center justify-between gap-4 px-5 py-4">
                  <div className="min-w-0"><p className="truncate text-sm text-white/60">{student.university || "A journey shaped by focused preparation"}</p><p className="mt-1 text-sm font-bold text-[#FF907F]">Read the achievement</p></div>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 transition group-hover:border-[#F36D45] group-hover:bg-[#F36D45]"><ArrowUpRight size={18} /></span>
                </div>
              </Link>
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
