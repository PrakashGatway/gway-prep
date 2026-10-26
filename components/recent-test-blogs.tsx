"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, BookOpenText, CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { getBlogCategories } from "@/app/lib/blog-categories";
import { getTestCategory, testCategoryPattern } from "@/app/lib/test-blog-category";

type Blog = {
  _id?: string;
  slug: string;
  title: string;
  image?: string;
  metaDescription?: string;
  createdAt?: string;
  isPublished?: boolean;
  category?: string;
  categories?: string[];
};

function BlogCarousel({ blogs }: { blogs: Blog[] }) {
  const [current, setCurrent] = useState(0);
  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    loop: blogs.length > 3,
    mode: "snap",
    slides: { perView: 1.08, spacing: 16 },
    breakpoints: {
      "(min-width: 640px)": { slides: { perView: Math.min(2, blogs.length), spacing: 20 } },
      "(min-width: 1024px)": { slides: { perView: Math.min(3, blogs.length), spacing: 24 } },
    },
    slideChanged(instance) {
      setCurrent(instance.track.details.rel);
    },
  });

  return (
    <>
      <div ref={sliderRef} className="keen-slider !overflow-visible" aria-label="Recent blog articles">
        {blogs.map((blog) => (
          <div key={blog._id || blog.slug} className="keen-slider__slide !h-auto py-4">
            <Link href={`/blog/${blog.slug}`} className="group flex h-full min-h-[340px] flex-col overflow-hidden rounded-2xl border border-[#F1DED5] bg-white transition hover:-translate-y-1 ">
              <div className="relative h-44 overflow-hidden bg-[#FFF0E9]">
                {blog.image ? (
                  <img src={blog.image} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-102" />
                ) : (
                  <div className="flex h-full items-center justify-center text-[#F36D45]"><BookOpenText size={44} aria-hidden="true" /></div>
                )}
                <span className="absolute left-2 top-2 rounded-2xl bg-orange-700 px-3 py-2 text-xs font-bold text-white shadow-sm">
                  {getBlogCategories(blog).join(" · ")}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="line-clamp-2 text-lg font-bold leading-snug text-[#0B2A55] group-hover:text-[#E7613C]">{blog.title}</h3>
                {blog.metaDescription && <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">{blog.metaDescription}</p>}
                <div className="mt-auto flex items-center justify-between gap-3 pt-5 text-xs text-slate-500">
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays size={14} aria-hidden="true" />
                    {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "Ooshas Prep"}
                  </span>
                  <span className="inline-flex items-center gap-1 font-semibold text-[#E7613C]">Read more <ArrowRight size={14} aria-hidden="true" /></span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
      {blogs.length > 1 && (
        <div className="mt-7 flex items-center justify-between">
          <div className="flex gap-2" aria-label="Blog slide position">
            {blogs.map((_, index) => (
              <button key={index} type="button" aria-label={`Go to blog ${index + 1}`} aria-current={current === index ? "true" : undefined} onClick={() => slider.current?.moveToIdx(index)} className={`h-2 rounded-full transition-all ${current === index ? "w-7 bg-[#F36D45]" : "w-2 bg-[#D8C7BE] hover:bg-[#F36D45]"}`} />
            ))}
          </div>
          <div className="flex gap-2">
            <button type="button" aria-label="Previous blogs" onClick={() => slider.current?.prev()} className="grid h-10 w-10 place-items-center rounded-full border border-[#F1DED5] bg-white text-[#0B2A55] transition hover:border-[#F36D45] hover:text-[#F36D45]"><ChevronLeft size={19} /></button>
            <button type="button" aria-label="Next blogs" onClick={() => slider.current?.next()} className="grid h-10 w-10 place-items-center rounded-full border border-[#F1DED5] bg-white text-[#0B2A55] transition hover:border-[#F36D45] hover:text-[#F36D45]"><ChevronRight size={19} /></button>
          </div>
        </div>
      )}
    </>
  );
}

export default function RecentTestBlogs({ source }: { source?: string | null }) {
  const category = getTestCategory(source);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const controller = new AbortController();
    setBlogs([]);
    const params = new URLSearchParams({ page: "1", limit: "9", isPublished: "published" });
    if (category) params.set("test", category);

    fetch(`/api/admin/blogs?${params.toString()}`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("Recent blogs could not be loaded");
        return response.json();
      })
      .then((result) => {
        const items = Array.isArray(result?.data) ? result.data : [];
        const pattern = category ? testCategoryPattern(category) : null;
        setBlogs(items.filter((blog: Blog) => blog.slug && blog.title && blog.isPublished === true && (!pattern || getBlogCategories(blog).some((name) => pattern.test(name)))));
      })
      .catch((error) => { if (error?.name !== "AbortError") console.error("Recent blogs:", error); });

    return () => controller.abort();
  }, [category]);

  if (!blogs.length) return null;

  return (
    <section className="py-12 px-4 sm:px-6" aria-labelledby="recent-test-blogs-title">
      <div className="mx-auto max-w-7xl overflow-hidden ">
        <div className="mb-3 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-[.16em] text-[#E7613C]">From the Ooshas Prep blog</p>
            <h2 id="recent-test-blogs-title" className="mt-2 text-3xl font-bold tracking-tight text-[#0B2A55] sm:text-4xl">Recent {category ? `${category} ` : ""}Blogs</h2>
            <p className="mt-px text-sm text-slate-600">Fresh advice and study strategies for your next step.</p>
          </div>
          <Link href={category ? `/blog?category=${encodeURIComponent(category)}` : "/blog"} className="inline-flex items-center gap-2 text-sm font-bold text-[#D85836] hover:underline">Explore all blogs <ArrowRight size={16} /></Link>
        </div>
        <BlogCarousel blogs={blogs} />
      </div>
    </section>
  );
}
