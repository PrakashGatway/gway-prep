"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, BookOpenText, CalendarDays } from "lucide-react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

type BlogCard = { _id?: string; title: string; slug: string; image?: string; category?: string | { name?: string }; metaDescription?: string; publishedDate?: string; createdAt?: string };

export default function RecentBlogsSlider({blog}) {
  const [blogs, setBlogs] = useState<BlogCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/admin/blogs?page=1&limit=6", { signal: controller.signal, cache: "no-store" })
      .then(async (response) => {
        if (!response.ok) throw new Error("Could not load recent blogs");
        return response.json();
      })
      .then((result) => setBlogs(Array.isArray(result?.data) ? result.data.filter((item: BlogCard) => item?.slug) : []))
      .catch((error: any) => { if (error?.name !== "AbortError") console.error("Recent blogs API error:", error); })
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-12 lg:px-0">
      <div className="mb-6 flex items-end justify-between gap-4 sm:mb-8">
        <div><p className="text-sm font-bold uppercase tracking-[.17em] text-[#F36D45]">{blogs.title||"Fresh from the blog"}</p><h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">{blogs.subtitle||"Keep your preparation moving"}</h2></div>
        <Link href={blogs.buttonUrl||"/blog"} className="hidden items-center gap-2 text-sm font-bold text-[#D95C39] sm:inline-flex">{blogs.buttonText||"All articles"} <ArrowRight size={16} /></Link>
      </div>
      {loading ? <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{[1, 2, 3].map((item) => <div key={item} className="h-64 animate-pulse rounded-2xl bg-[#FFF4EF]" />)}</div> : blogs.length ? <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        spaceBetween={16}
        slidesPerView={1.08}
        navigation
        pagination={{ clickable: true }}
        loop={blogs.length > 3}
        autoplay={blogs.length > 1 ? { delay: 4200, disableOnInteraction: false, pauseOnMouseEnter: true } : false}
        breakpoints={{ 640: { slidesPerView: 2, spaceBetween: 20 }, 1024: { slidesPerView: 3, spaceBetween: 24 } }}
        className="event-blog-swiper !pb-12"
      >
        {blogs.map((blog) => {
          const category = typeof blog.category === "string" ? blog.category : blog.category?.name;
          const date = blog.createdAt;
          return <SwiperSlide key={blog._id || blog.slug} className="!h-auto"><Link href={`/blog/${blog.slug}`} className="group flex h-full min-h-[335px] flex-col overflow-hidden rounded-[1.4rem] border border-[#F0E5DF] bg-white shadow-[0_10px_35px_rgba(80,48,32,.05)] transition hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(80,48,32,.12)]">
            <div className="relative h-48 overflow-hidden bg-gradient-to-br from-[#FFF0BE] to-[#FFB09D] "><div className="aspect-[16/9] w-full overflow-hidden rounded-xl bg-gray-100">
  {blog.image ? (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={blog.image}
      alt={blog.title}
      className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
    />
  ) : (
    <div className="flex h-full items-center justify-center text-[#F36D45]">
      <BookOpenText size={48} />
    </div>
  )}
</div><span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-[#9B5137]">{category || "Study tips"}</span></div>
            <div className="flex flex-1 flex-col p-3"><h3 className="line-clamp-2 text-lg font-bold leading-snug text-[#292522] transition-colors group-hover:text-[#D95C39]">{blog.title}</h3>{blog.metaDescription && <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#756A65]">{blog.metaDescription}</p>}<div className="mt-auto flex items-center justify-between pt-5 text-xs font-semibold text-[#9A8880]">{date ? <span className="inline-flex items-center gap-1.5"><CalendarDays size={14} />{new Date(date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</span> : <span>Ooshas Prep</span>}<span className="inline-flex items-center gap-1.5 text-sm font-bold text-[#E56440]">Read article <ArrowUpRight size={15} /></span></div></div>
          </Link></SwiperSlide>;
        })}
      </Swiper> : <div className="rounded-2xl border border-dashed border-[#E9C8B9] bg-[#FFF8F4] p-8 text-center text-sm text-[#756A65]">New study guides are coming soon. <Link href="/blog" className="font-bold text-[#D95C39]">Browse the blog</Link></div>}
      <Link href="/blog" className="mt-1 inline-flex items-center gap-2 text-sm font-bold text-[#D95C39] sm:hidden">All articles <ArrowRight size={16} /></Link>
      <style jsx global>{`
        .event-blog-swiper .swiper-button-next, .event-blog-swiper .swiper-button-prev { color: #f36d45; background: white; border: 1px solid #f0d8cc; border-radius: 9999px; width: 40px; height: 40px; box-shadow: 0 5px 18px rgba(41,37,34,.12); }
        .event-blog-swiper .swiper-button-next:after, .event-blog-swiper .swiper-button-prev:after { font-size: 14px; font-weight: 800; }
        .event-blog-swiper .swiper-pagination-bullet { background: #f36d45; opacity: .3; }
        .event-blog-swiper .swiper-pagination-bullet-active { opacity: 1; }
      `}</style>
    </section>
  );
}
