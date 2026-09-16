"use client";
import { motion } from "framer-motion";
import React, { useState } from "react";
import {
  Search,
  CalendarDays,
  UserRound,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Headphones,
  Zap,
  BookOpen,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

// --- Types & Interfaces ---
interface Guide {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string; // or createdAt depending on your API
  createdAt?: string;
  author: string;
  slug: string;
  isPopular?: boolean;
}

interface PaginationData {
  page: number;
  pages: number;
  total: number;
}

interface AllGuidesResponse {
  data: Guide[];
  pagination: PaginationData;
}

interface CategoryItem {
  _id: string;
  name: string;
  slug: string;
  icon?: any; // Assuming you might pass icons here, otherwise we use defaults
}

interface AllCategoriesResponse {
  data: CategoryItem[];
}

// --- Props Interface ---
interface GuidePageProps {
  allGuides: AllGuidesResponse;
  allCategory: AllCategoriesResponse;
}

// --- Mock Data for Fallback (Optional, keeps TS happy if props are missing) ---
const mockGuides: AllGuidesResponse = {
  data: [],
  pagination: { page: 1, pages: 1, total: 0 },
};
const mockCategories: AllCategoriesResponse = { data: [] };

// --- Icons Mapping for Categories ---
const CategoryIconMap: Record<string, React.ElementType> = {
  "Account & Profile": UserRound,
  "Password Reset": Zap,
  "Batches & Courses": BookOpen,
  Settings: Headphones,
  default: BookOpen,
};

export default function GuidePage({
  allGuides = mockGuides,
  allCategory = mockCategories,
}: GuidePageProps) {
  const [activeCategory, setActiveCategory] = useState("All Guides");
  const [page, setPage] = useState(1);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");

  // --- Logic Functions (Preserved) ---

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (search.trim()) {
      params.set("search", search.trim());
    } else {
      params.delete("search");
    }
    params.set("page", "1");
    router.push(`/guide?${params.toString()}`);
  };

  const handleCategory = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());
    setActiveCategory(category);
    setPage(1);
    params.set("page", "1");

    if (category === "All Guides") {
      params.delete("category");
    } else {
      params.set("category", category);
    }
    router.push(`/guide?${params.toString()}`);
  };

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(newPage));
    router.push(`/guide?${params.toString()}`);
  };

  // --- Render Helpers ---

  // Helper to get a consistent icon for the guide card based on category (or generic)
  const getGuideIcon = (categoryName: string) => {
    // You can map specific categories to specific icons here if needed
    // For now, returning a generic BookOpen or similar as per design
    return BookOpen;
  };

  // Format Date
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "Aug 20, 2026";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <main className="min-h-screen bg-orange-50 text-[#101b35]">
      {/* =========================================================
                HERO SECTION
            ========================================================= */}
      <section className="relative overflow-hidden pt-10 pb-0 lg:pt-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-0">
          <div className="rounded-[32px] border border-orange-500 bg-white p-6  sm:p-2 sm:px-6 lg:flex lg:items-center lg:justify-between lg:gap-12">
            {/* Left Content */}
            <div className="relative z-10 max-w-xl lg:w-1/2">
              <span className="mb-4 inline-block rounded-full bg-[#ff5b16] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                Support Center
              </span>

              <h1 className="text-4xl font-extrabold leading-tight text-[#1a202c] sm:text-5xl">
                How can we <span className="text-[#ff5b16]">help you?</span>
              </h1>

              <p className="mt-4 text-base text-gray-500 sm:text-lg">
                Find answers, guides and helpful resources for your Ooshas Prep
                learning journey.
              </p>

              {/* Search Bar */}
              <div className="mt-8 flex items-center rounded-full border border-gray-200 bg-white p-2 pl-5 shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-shadow focus-within:shadow-md">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                  placeholder="Search for guides, articles or topics..."
                  className="w-full bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
                />
                <button
                  onClick={handleSearch}
                  className="flex px-4 py-2 shrink-0 items-center justify-center rounded-full bg-[#f36d45] text-white transition hover:bg-[#e04e12]"
                >
                  Search
                </button>
              </div>
            </div>

            {/* Right Illustration (CSS Composition) */}
            <div className="relative mt-10 hidden lg:block lg:w-1/2 lg:min-h-[300px]">
              {/* Abstract Background Shapes */}
              <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-[#fff0e8] opacity-60 blur-3xl" />

              {/* Illustration Container */}
              <div className="relative flex items-end justify-center">
                {/* Person/Image Placeholder - Using an SVG composition to mimic the reference */}
                <img
                  src="/image/guide-hero.webp"
                  alt="Support Agent"
                  className="relative z-10 w-full max-w-md object-contain drop-shadow-xl"
                  // Hiding placeholder, using CSS shapes below instead
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
                BROWSE BY CATEGORY
            ========================================================= */}
      <section className="mt-12 mb-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-0 overflow-x-auto">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold text-[#333]">
                Browse by <span className="text-[#ff5b16]">Category</span>
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Find the help you need, organized by topic.
              </p>
            </div>
          </div>

          {/* Category Cards Grid */}
          {/* Category Cards - Horizontal Slider */}
          <div className="flex gap-4 overflow-x-auto pb-3 scrollbar-hide">
            {/* Static "All" Card */}
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() => handleCategory("All Guides")}
              className={`group relative flex min-w-[280px] shrink-0 items-center gap-4 rounded-xl border bg-white p-5 text-left border-orange-500 sm:min-w-[300px] border-l-[4px]`}
            >
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${
                  activeCategory === "All Guides"
                    ? "bg-[#f36d45] text-white"
                    : "bg-orange-50 text-[#ff5b16]"
                }`}
              >
                <BookOpen size={24} />
              </div>

              <div>
                <h3
                  className={`font-bold ${
                    activeCategory === "All Guides"
                      ? "text-[#ff5b16]"
                      : "text-gray-800"
                  }`}
                >
                  All Guides
                </h3>

                <p className="text-xs text-gray-500">
                  {allGuides?.pagination?.total || 0} guides
                </p>
              </div>
            </motion.button>

            {/* Dynamic Categories */}
            {allCategory?.data?.map((item) => {
              const isActive = activeCategory === item.slug;
              const Icon =
                CategoryIconMap[item.name] || CategoryIconMap.default;

              const count =
                allGuides?.data?.filter((g) => g.category === item.slug)
                  .length || 0;

              return (
                <motion.button
                  key={item._id}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleCategory(item.slug)}
                  className={`group relative flex min-w-[280px] shrink-0 items-center gap-4 rounded-xl border bg-white p-5 text-left border-orange-500 border-l-[4px] sm:min-w-[300px]`}
                >
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${
                      isActive
                        ? "bg-[#f36d45] text-white"
                        : "bg-orange-50 text-[#ff5b16]"
                    }`}
                  >
                    <Icon size={24} />
                  </div>

                  <div>
                    <h3
                      className={`font-bold ${
                        isActive ? "text-[#ff5b16]" : "text-gray-800"
                      }`}
                    >
                      {item.name}
                    </h3>

                    <p className="text-xs text-gray-500">{count} guides</p>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================
                POPULAR GUIDES (GRID VIEW)
            ========================================================= */}
      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-0">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold text-[#333]">
                Popular <span className="text-[#ff5b16]">Guides</span>
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Helpful resources students are viewing most.
              </p>
            </div>
          </div>

          {allGuides.data.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white py-20 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-50 text-[#ff5b16]">
                <Search size={28} />
              </div>
              <h3 className="text-lg font-bold text-gray-800">
                No guides found
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Try another search or select a different category.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {allGuides.data.map((guide) => {
                const Icon = getGuideIcon(guide.category);
                return (
                  <article
                    key={guide.id}
                    className="group relative flex flex-col justify-between rounded-2xl border border-orange-500 bg-white p-6 transition-all duration-300 hover:-translate-y-1"
                  >
                    {/* Top Badge */}
                    <div className="mb-4 flex justify-end">
                      <div className="inline-flex items-center gap-1.5 rounded-lg bg-[#f36d45] px-3 py-1 text-sm font-bold text-[#fff0eb]">
                        <UserRound size={12} />
                        <span>{guide.category.split("-").join(" ")}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="mb-6">
                      <h3 className="mb-2 text-lg font-bold leading-snug text-gray-900 transition-colors group-hover:text-[#ff5b16]">
                        {guide.title}
                      </h3>
                      <p
                        className="line-clamp-2 text-sm leading-relaxed text-gray-500"
                        dangerouslySetInnerHTML={{ __html: guide.description }}
                      ></p>
                    </div>

                    {/* Footer Meta */}
                    <div className="flex items-center justify-between border-t border-gray-50 pt-4">
                      <div className="flex items-center gap-2 text-xs font-medium text-gray-400">
                        <CalendarDays size={14} className="text-gray-400" />
                        <span>{formatDate(guide.date || guide.createdAt)}</span>
                      </div>

                      <button
                        onClick={() =>
                          (window.location.href = `/guide/${guide.slug}`)
                        }
                        className="flex h-8 w-8 items-center justify-center rounded-full text-[#ff5b16] transition-colors group-hover:bg-[#ff5b16] group-hover:text-white"
                      >
                        <ArrowRight size={18} />
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          {/* =========================================================
                        PAGINATION
                    ========================================================= */}
          {allGuides.pagination?.pages > 1 && (
            <div className="mt-12 flex items-center justify-center gap-2">
              <button
                disabled={allGuides.pagination.page === 1}
                onClick={() =>
                  handlePageChange(Math.max(allGuides.pagination.page - 1, 1))
                }
                className={`flex h-9 w-9 items-center justify-center rounded-full border transition-colors ${
                  allGuides.pagination.page === 1
                    ? "cursor-not-allowed border-gray-100 text-gray-300"
                    : "border-gray-200 text-gray-600 hover:border-[#ff5b16] hover:text-[#ff5b16]"
                }`}
              >
                <ChevronLeft size={16} />
              </button>

              {Array.from(
                { length: allGuides.pagination.pages },
                (_, i) => i + 1,
              ).map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`flex h-9 min-w-[36px] items-center justify-center rounded-full text-sm font-medium transition-all ${
                    allGuides.pagination.page === pageNum
                      ? "bg-[#ff5b16] text-white shadow-md shadow-orange-200"
                      : "text-gray-500 hover:bg-orange-50 hover:text-[#ff5b16]"
                  }`}
                >
                  {pageNum}
                </button>
              ))}

              <button
                disabled={
                  allGuides.pagination.page === allGuides.pagination.pages
                }
                onClick={() =>
                  handlePageChange(
                    Math.min(
                      allGuides.pagination.page + 1,
                      allGuides.pagination.pages,
                    ),
                  )
                }
                className={`flex h-9 w-9 items-center justify-center rounded-full border transition-colors ${
                  allGuides.pagination.page === allGuides.pagination.pages
                    ? "cursor-not-allowed border-gray-100 text-gray-300"
                    : "border-gray-200 text-gray-600 hover:border-[#ff5b16] hover:text-[#ff5b16]"
                }`}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
