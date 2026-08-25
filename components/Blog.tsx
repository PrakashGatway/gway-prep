
"use client";

import Image from "next/image";
import {
  Search,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Calendar,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  FileText,
  BookOpen,
  Users,
  Globe,
  Mail,
  UserCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import FormSection from "../components/formSection";

// Types
interface Blog {
  _id: string;
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  author: string;
  publishedDate: string;
  content?: string;
  readTime?: string;
}

interface Category {
  name: string;
  count: number;
}

interface PaginationData {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

// Static data for non-blog content
const data = {
  hero: {
    breadcrumb: ["Home", "Blogs"],
    title: "Ooshas Prep Blog",
    subtitle:
      "Stay updated with the latest exam tips, study guides, success stories and education insights from experts.",
    bgImage:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1600&auto=format&fit=crop",
  },

  newsletterBanner: {
    title: "Get the Latest Updates in Your Inbox",
    text: "Study tips, exam updates, success stories and more.",
    img: "/87921129_blog_concept.webp",
  },

  features: [
    {
      icon: "FileText",
      title: "Expert Insights",
      desc: "Learn from industry experts and top educators",
    },
    {
      icon: "BookOpen",
      title: "Updated Content",
      desc: "Get the latest exam patterns and study strategies",
    },
    {
      icon: "Users",
      title: "Student Success",
      desc: "Real stories from students who achieved their dreams",
    },
    {
      icon: "Globe",
      title: "Global Education",
      desc: "Insights on studying abroad and top universities",
    },
  ],
};

const iconMap = {
  FileText,
  BookOpen,
  Users,
  Globe,
};

const socialIconMap = {
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
};

// FORM CONFIGURATION
const FORM_CONFIG = {
  steps: [
    {
      step: 1,
      title: "Personal Information",
      icon: UserCircle,
    },
    {
      step: 2,
      title: "Contact Details",
      icon: Mail,
    },
    {
      step: 3,
      title: "Your Goals",
      icon: BookOpen,
      button: "submit",
    },
  ],

  fields: [
    {
      name: "fullName",
      label: "Full Name",
      type: "text",
      step: 1,
      grid: "full",
      required: true,
      placeholder: "Enter your full name",
      icon: UserCircle,
    },
    {
      name: "email",
      label: "Email Address",
      type: "email",
      step: 1,
      grid: "full",
      required: true,
      placeholder: "Enter your email address",
      icon: Mail,
    },
    {
      name: "phone",
      label: "Phone Number",
      type: "tel",
      step: 2,
      grid: "full",
      required: true,
      placeholder: "Enter your phone number",
      icon: Mail,
    },
    {
      name: "city",
      label: "City",
      type: "text",
      step: 2,
      grid: "half",
      required: true,
      placeholder: "Enter your city",
      icon: Globe,
    },
    {
      name: "country",
      label: "Country",
      type: "text",
      step: 2,
      grid: "half",
      required: true,
      placeholder: "Enter your country",
      icon: Globe,
    },
    {
      name: "interest",
      label: "Interested In?",
      type: "button-group",
      step: 3,
      grid: "full",
      required: true,
      options: [
        {
          value: "gre",
          label: "GRE",
          icon: BookOpen,
        },
        {
          value: "ielts",
          label: "IELTS",
          icon: BookOpen,
        },
        {
          value: "gmat",
          label: "GMAT",
          icon: BookOpen,
        },
        {
          value: "toefl",
          label: "TOEFL",
          icon: BookOpen,
        },
        {
          value: "study-abroad",
          label: "Study Abroad",
          icon: Globe,
        },
        {
          value: "other",
          label: "Other",
          icon: FileText,
        },
      ],
    },
    {
      name: "preferredCountry",
      label: "Preferred Country",
      type: "text",
      step: 2,
      grid: "half",
      required: true,
      placeholder: "Enter your country",
      icon: Globe,
    },
    {
      name: "message",
      label: "Message",
      type: "textarea",
      step: 3,
      grid: "full",
      required: false,
      placeholder: "Tell us about your goals and requirements...",
    },
  ],
};

interface BlogPageProps {
  pageInfo?: any;
  categories?: Category[];

  // Server-fetched blogs
  blogs?: Blog[];

  // Server-fetched pagination
  pagination?: PaginationData;

  // Current URL filters
  filters?: {
    search?: string;
    category?: string;
    page?: number;
  };
}

export default function BlogPage({
  pageInfo,
  categories = [],
  blogs = [],
  pagination = {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
  },
  filters = {},
}: BlogPageProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Local search input
  const [search, setSearch] = useState(filters.search || "");

  // Keep input synchronized with URL
  useEffect(() => {
    setSearch(filters.search || "");
  }, [filters.search]);

  
  const updateUrl = (
    values: {
      search?: string;
      category?: string;
      page?: number;
    },
    options?: {
      scroll?: boolean;
    }
  ) => {
    const params = new URLSearchParams(searchParams.toString());

    if (values.search !== undefined) {
      if (values.search.trim()) {
        params.set("search", values.search.trim());
      } else {
        params.delete("search");
      }

      // New search starts from page 1
      params.delete("page");
    }

    if (values.category !== undefined) {
      if (values.category.trim()) {
        params.set("category", values.category.trim());
      } else {
        params.delete("category");
      }

      // New category starts from page 1
      params.delete("page");
    }

    if (values.page !== undefined) {
      if (values.page > 1) {
        params.set("page", String(values.page));
      } else {
        params.delete("page");
      }
    }

    const queryString = params.toString();

    router.push(
      queryString
        ? `${pathname}?${queryString}`
        : pathname,
      {
        scroll: options?.scroll ?? false,
      }
    );
  };

  /**
   * Search submit
   */
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    updateUrl({
      search,
      page: 1,
    });
  };

  
  useEffect(() => {
    const currentSearch = filters.search || "";

    if (search === currentSearch) {
      return;
    }

    const timer = setTimeout(() => {
      updateUrl({
        search,
        page: 1,
      });
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  /**
   * Navigate to blog detail
   */
  const navigateToBlog = (blogSlug: string) => {
    router.push(`/blog/${blogSlug}`);
  };

  
  const getPaginationNumbers = () => {
    const currentPage = pagination.currentPage;
    const totalPages = pagination.totalPages;

    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage > 3) {
        pages.push("…");
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(
        totalPages - 1,
        currentPage + 1
      );

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("…");
      }

      pages.push(totalPages);
    }

    return pages;
  };

  /**
   * Change page through URL
   */
  const handlePageChange = (page: number | string) => {
    if (
      typeof page === "string" ||
      page === pagination.currentPage ||
      page < 1 ||
      page > pagination.totalPages
    ) {
      return;
    }

    updateUrl(
      {
        page,
      },
      {
        scroll: true,
      }
    );
  };

  /**
   * Category filter
   */
  const handleCategoryChange = (category: string) => {
    updateUrl({
      category,
      page: 1,
    });
  };

  
  const clearFilters = () => {
    router.push(pathname);
  };

  const featuredBlog = blogs.length > 0 ? blogs[0] : null;

  const latestBlogs = blogs.length > 1 ? blogs.slice(1) : [];
  console.log(featuredBlog, 'blog');

  
  return (
    <div className="min-h-screen bg-white text-[#1f2430]">
      {/* Hero */}
      <section className="relative w-full overflow-hidden bg-[#fcf4ed] py-8 md:py-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-12 px-4 sm:px-6 lg:flex-row lg:justify-between lg:px-8">
          <div className="flex w-full flex-col justify-center text-center lg:w-[85%] lg:text-left">
            <h1 className="text-2xl font-bold md:text-3xl lg:text-5xl">
              Ooshas Prep{" "}
              <span className="text-primary">
                Blog
              </span>
            </h1>

            <p className="mx-auto mt-4 max-w-xl text-base text-gray-600 lg:mx-0 lg:text-lg">
              {data?.hero?.subtitle}
            </p>

            {/* Search */}
            <form
              onSubmit={handleSearch}
              className="mx-auto mt-8 flex w-full max-w-md overflow-hidden rounded-xl border border-gray-200 bg-white p-1 shadow-md focus-within:ring-2 focus-within:ring-[#F0642C] lg:mx-0"
            >
              <label
                htmlFor="hero-search"
                className="sr-only"
              >
                Search for articles
              </label>

              <input
                id="hero-search"
                type="text"
                placeholder="Search for articles..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                className="w-full bg-transparent px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none"
              />

              <button
                type="submit"
                aria-label="Submit search"
                className="flex items-center justify-center rounded-lg bg-[#F0642C] px-5 text-white transition-colors duration-200 hover:bg-[#d9551f]"
              >
                <Search
                  size={18}
                  aria-hidden="true"
                />
              </button>
            </form>

            {/* Active filters */}
            {(filters.search ||
              filters.category) && (
              <div className="mt-4 flex flex-wrap items-center justify-center gap-2 lg:justify-start">
                {filters.search && (
                  <span className="rounded-full bg-white px-3 py-1 text-xs text-gray-600 shadow-sm">
                    Search:{" "}
                    <strong>
                      {filters.search}
                    </strong>
                  </span>
                )}

                {filters.category && (
                  <span className="rounded-full bg-white px-3 py-1 text-xs text-gray-600 shadow-sm">
                    Category:{" "}
                    <strong>
                      {filters.category}
                    </strong>
                  </span>
                )}

                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-xs font-semibold text-[#F0642C] hover:underline"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>

          <img
            src="/blog image.webp"
            alt="Students studying together"
            loading="eager"
            decoding="async"
            className="hidden h-64 w-full rounded-2xl object-cover sm:h-80 md:h-96 lg:block lg:h-[380px]"
          />
        </div>
      </section>

      {/* Body */}
      <main className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_320px]">
          {/* Left column */}
          <div>
            {/* Featured */}
            {featuredBlog && (
              <>
                <h2 className="mb-5 text-left text-2xl font-bold md:text-3xl lg:text-4xl">
                  Featured{" "}
                  <span className="text-[#F0642C]">
                    Post
                  </span>
                </h2>

                <div
                  className="mb-12 grid cursor-pointer grid-cols-1 gap-6 rounded-lg border border-gray-100 p-2 transition-shadow hover:shadow-lg sm:grid-cols-[320px_1fr]"
                  onClick={() =>
                    navigateToBlog(
                      featuredBlog.slug
                    )
                  }
                >
                  <div className="relative h-56 w-full overflow-hidden rounded-md sm:h-full">
                    <Image
                      src={
                        featuredBlog.image ||
                        "/placeholder-blog.jpg"
                      }
                      alt={featuredBlog.title}
                      fill
                      className="object-contain"
                    />
                  </div>

                  <div className="flex flex-col justify-center px-2 py-2">
                    <div className="mb-2 flex items-center justify-between gap-4 text-xs">
                      <span className="font-semibold text-[#F0642C]">
                        {featuredBlog.category ||
                          "Featured"}
                      </span>

                      <span className="flex items-center gap-1 text-gray-400">
                        <Calendar size={12} />

                        {featuredBlog.publishedDate
                          ?.split("T")[0] ||
                          "2026-07-07"}
                      </span>
                    </div>

                    <h3 className="mb-3 text-xl font-bold leading-snug text-[#1f2430]">
                      {featuredBlog.title}
                    </h3>

                    <p className="mb-4 text-sm leading-relaxed text-gray-500">
                      {featuredBlog.excerpt || featuredBlog?.metaDescription}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <UserCircle
                          size={32}
                          className="text-gray-400"
                        />

                        <div className="text-xs">
                          <p className="font-semibold text-[#1f2430]" onClick={() => router.push(`/auther/${featuredBlog?.authslug || 'sakshi-taneja'}`)}>
                            By{" "}
                            {featuredBlog.author ||
                              "Admin"}
                          </p>
                        </div>
                      </div>

                      <button
                        className="flex items-center gap-2 rounded-md bg-[#F0642C] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#d9551f]"
                        onClick={(e) => {
                          e.stopPropagation();

                          navigateToBlog(
                            featuredBlog.slug
                          );
                        }}
                      >
                        Read More{" "}
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Latest blogs */}
            <h2 className="mb-5 text-left text-2xl font-bold md:text-3xl lg:text-4xl">
              Latest{" "}
              <span className="text-[#F0642C]">
                Blogs
              </span>
            </h2>

            {latestBlogs.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {latestBlogs.map((post) => (
                  <article
                    key={post._id}
                    className="group cursor-pointer"
                    onClick={() =>
                      navigateToBlog(post.slug)
                    }
                  >
                    <div className="relative mb-3 h-40 w-full overflow-hidden rounded-md">
                      <span className="absolute left-2 top-2 z-10 rounded bg-[#F0642C] px-2 py-0.5 text-[10px] font-semibold text-white">
                        {post.category || "Blog"}
                      </span>

                      <Image
                        src={
                          post.image ||
                          "/placeholder-blog.jpg"
                        }
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>

                    <h3 className="mb-2 text-[15px] font-bold leading-snug text-[#1f2430] group-hover:text-[#F0642C]">
                      {post.title}
                    </h3>

                    <p className="mb-3 text-[13px] leading-relaxed text-gray-500">
                      {post.excerpt || post?.metaDescription}
                    </p>

                    <div className="flex items-center gap-4 text-[11px] text-gray-400">
                      <span className="flex items-center gap-1">
                        <Calendar size={11} />

                        {post.publishedDate?.split("T")[0] || "2026-07-07"}
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="py-10 text-center text-gray-500">
                No blogs found. Try adjusting your
                search or category.
              </div>
            )}

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="mt-12 flex flex-wrap items-center justify-center gap-2">
                {/* Previous */}
                <button
                  className="flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 text-gray-400 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                  onClick={() =>
                    handlePageChange(
                      pagination.currentPage - 1
                    )
                  }
                  disabled={
                    pagination.currentPage === 1
                  }
                >
                  <ChevronLeft size={16} />
                </button>

                {/* Page numbers */}
                {getPaginationNumbers().map(
                  (page, index) => (
                    <button
                      key={`${page}-${index}`}
                      onClick={() =>
                        handlePageChange(page)
                      }
                      className={`flex h-9 w-9 items-center justify-center rounded-md text-sm font-medium ${
                        page ===
                        pagination.currentPage
                          ? "bg-[#F0642C] text-white"
                          : page === "…"
                            ? "cursor-default border-none"
                            : "border border-gray-200 text-gray-500 hover:bg-gray-50"
                      }`}
                      disabled={page === "…"}
                    >
                      {page}
                    </button>
                  )
                )}

                {/* Next */}
                <button
                  className="flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 text-gray-400 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                  onClick={() =>
                    handlePageChange(
                      pagination.currentPage + 1
                    )
                  }
                  disabled={
                    pagination.currentPage ===
                    pagination.totalPages
                  }
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Contact form */}
            <div className="overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm">
              <div className="bg-gradient-to-r from-[#F0642C] to-[#F86C43] p-4">
                <h3 className="text-center text-lg font-bold text-white">
                  Speak to an Expert
                </h3>

                <p className="mt-1 text-center text-xs text-white/80">
                  Get personalized guidance for your
                  study abroad journey
                </p>
              </div>

              <div className="p-4">
                <FormSection
                  FORM_CONFIG={FORM_CONFIG}
                  pageName="blog-page"
                  apiEndpoint="/api/submit-enquiry"
                />
              </div>
            </div>

            {/* Categories */}
            {categories &&
              categories.length > 0 && (
                <div className="max-h-[18rem] overflow-auto rounded bg-[#FDF9F8] p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="text-lg font-bold">
                      Categories
                    </h3>

                    {filters.category && (
                      <button
                        type="button"
                        onClick={() =>
                          handleCategoryChange("")
                        }
                        className="text-xs text-[#F0642C] hover:underline"
                      >
                        Clear
                      </button>
                    )}
                  </div>

                  <ul className="space-y-3 text-sm">
                    {categories.map(
                      (c: Category) => (
                        <li
                          key={c.name}
                          onClick={() =>
                            handleCategoryChange(
                              c.name
                            )
                          }
                          className={`flex cursor-pointer items-center justify-between rounded px-4 py-2 transition-colors ${
                            filters.category ===
                            c.name
                              ? "bg-[#F0642C] text-white"
                              : "bg-white hover:text-[#F0642C]"
                          }`}
                        >
                          <p>{c.name}</p>

                          <span
                            className={
                              filters.category ===
                              c.name
                                ? "text-white/80"
                                : "text-gray-400"
                            }
                          >
                            {c.count}
                          </span>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              )}

            {/* Popular posts */}
            <div>
              <h3 className="mb-4 text-lg font-bold">
                Popular Posts
              </h3>

              <ul className="space-y-4">
                {blogs
                  .slice(0, 5)
                  .map((p) => (
                    <li
                      key={p._id}
                      className="flex cursor-pointer gap-3 hover:opacity-80"
                      onClick={() =>
                        navigateToBlog(p.slug)
                      }
                    >
                      <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-md">
                        <Image
                          src={
                            p.image ||
                            "/placeholder-blog.jpg"
                          }
                          alt={p.title}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div>
                        <p className="text-sm font-semibold leading-snug text-[#1f2430] hover:text-[#F0642C]">
                          {p.title}
                        </p>

                        <p className="mt-1 flex items-center gap-1 text-[11px] text-gray-400">
                          <Calendar size={10} />

                          {p.publishedDate
                            ?.split("T")[0] ||
                            "2026-07-07"}
                        </p>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          </aside>
        </div>

        {/* Newsletter */}
        <div className="mt-16 flex flex-col items-center gap-8 rounded-lg bg-[#FBEAE2] p-8 sm:flex-row">
          <div className="relative h-40 w-80 flex-shrink-0 overflow-hidden rounded-full">
            <Image
              src={data.newsletterBanner.img}
              alt="Happy student"
              fill
              className="object-contain"
            />
          </div>

          <div className="flex-1 text-center sm:text-left">
            <h3 className="mb-1 text-2xl font-bold text-[#1f2430]">
              {data.newsletterBanner.title}
            </h3>

            <p className="text-sm text-gray-500">
              {data.newsletterBanner.text}
            </p>
          </div>

          <form className="flex w-full max-w-sm overflow-hidden rounded-md bg-white sm:w-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full px-4 py-3 text-sm text-gray-600 outline-none"
            />

            <button
              type="submit"
              className="flex items-center gap-2 whitespace-nowrap bg-[#F0642C] px-4 text-xs font-semibold text-white hover:bg-[#d9551f]"
            >
              Subscribe Now{" "}
              <ArrowRight size={14} />
            </button>
          </form>
        </div>

        {/* Features */}
        <div className="mt-16 grid grid-cols-1 gap-8 border-t border-gray-100 pt-12 sm:grid-cols-2 lg:grid-cols-4">
          {data.features.map((f) => {
            const Icon =
              iconMap[
                f.icon as keyof typeof iconMap
              ];

            return (
              <div
                key={f.title}
                className="flex items-start gap-4"
              >
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#FBEAE2] text-[#F0642C]">
                  <Icon size={22} />
                </div>

                <div>
                  <h4 className="mb-1 text-sm font-bold text-[#1f2430]">
                    {f.title}
                  </h4>

                  <p className="text-xs leading-relaxed text-gray-500">
                    {f.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}










// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import {
//   Phone,
//   Search,
//   Facebook,
//   Instagram,
//   Linkedin,
//   Youtube,
//   Clock,
//   Calendar,
//   ChevronLeft,
//   ChevronRight,
//   ArrowRight,
//   FileText,
//   BookOpen,
//   Users,
//   Globe,
//   Mail,
//   UserCircle,
// } from "lucide-react";
// import { useCallback, useEffect, useState } from "react";
// import axiosInstance from "../app/lib/axios";
// import { useRouter } from "next/navigation";
// import FormSection from "../components/formSection"; // Import the FormSection component

// // Types
// interface Blog {
//   _id: string;
//   slug: string;
//   title: string;
//   excerpt: string;
//   image: string;
//   category: string;
//   author: string;
//   publishedDate: string;
//   content?: string;
//   readTime?: string;
// }

// interface Category {
//   name: string;
//   count: number;
// }

// interface PaginationData {
//   currentPage: number;
//   totalPages: number;
//   totalItems: number;
//   itemsPerPage: number;
// }

// // Static data for non-blog content
// const data = {
//   hero: {
//     breadcrumb: ["Home", "Blogs"],
//     title: "Ooshas Prep Blog",
//     subtitle:
//       "Stay updated with the latest exam tips, study guides, success stories and education insights from experts.",
//     bgImage:
//       "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1600&auto=format&fit=crop",
//   },
//   featuredPost: {
//     badge: "LATEST",
//     category: "Study Tips",
//     date: "May 10, 2024",
//     title: "How to Prepare for IELTS Exam: A Complete Guide for 2024",
//     excerpt:
//       "Expert tips and strategies to help you achieve a high band score in IELTS. Learn about all sections, time management, and proven techniques.",
//     author: "Neha Khanna",
//     readTime: "8 min read",
//     img: "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=600&auto=format&fit=crop",
//     authorImg:
//       "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=100&auto=format&fit=crop",
//   },
//   stayUpdatedCard: {
//     title: "Stay Updated!",
//     text: "Subscribe to our newsletter and never miss an update.",
//   },
//   newsletterBanner: {
//     title: "Get the Latest Updates in Your Inbox",
//     text: "Study tips, exam updates, success stories and more.",
//     img: "/87921129_blog_concept.webp",
//   },
//   features: [
//     {
//       icon: "FileText",
//       title: "Expert Insights",
//       desc: "Learn from industry experts and top educators",
//     },
//     {
//       icon: "BookOpen",
//       title: "Updated Content",
//       desc: "Get the latest exam patterns and study strategies",
//     },
//     {
//       icon: "Users",
//       title: "Student Success",
//       desc: "Real stories from students who achieved their dreams",
//     },
//     {
//       icon: "Globe",
//       title: "Global Education",
//       desc: "Insights on studying abroad and top universities",
//     },
//   ],
// };

// const iconMap = { FileText, BookOpen, Users, Globe };
// const socialIconMap = { Facebook, Instagram, Linkedin, Youtube };

// // FORM CONFIGURATION for the multi-step form
// const FORM_CONFIG = {
//   steps: [
//     { step: 1, title: "Personal Information", icon: UserCircle },
//     { step: 2, title: "Contact Details", icon: Phone },
//     { step: 3, title: "Your Goals", icon: BookOpen, button: 'submit' },
//   ],
//   fields: [
//     {
//       name: "fullName",
//       label: "Full Name",
//       type: "text",
//       step: 1,
//       grid: "full",
//       required: true,
//       placeholder: "Enter your full name",
//       icon: UserCircle,
//     },
//     {
//       name: "email",
//       label: "Email Address",
//       type: "email",
//       step: 1,
//       grid: "full",
//       required: true,
//       placeholder: "Enter your email address",
//       icon: Mail,
//     },
//     {
//       name: "phone",
//       label: "Phone Number",
//       type: "tel",
//       step: 2,
//       grid: "full",
//       required: true,
//       placeholder: "Enter your phone number",
//       icon: Phone,
//     },
//     {
//       name: "city",
//       label: "City",
//       type: "text",
//       step: 2,
//       grid: "half",
//       required: true,
//       placeholder: "Enter your city",
//       icon: Globe,
//     },
//     {
//       name: "country",
//       label: "Country",
//       type: "text",
//       step: 2,
//       grid: "half",
//       required: true,
//       placeholder: "Enter your country",
//       icon: Globe,
//     },
//     {
//       name: "interest",
//       label: "Interested In?",
//       type: "button-group",
//       step: 3,
//       grid: "full",
//       required: true,
//       options: [
//         { value: "gre", label: "GRE", icon: BookOpen },
//         { value: "ielts", label: "IELTS", icon: BookOpen },
//         { value: "gmat", label: "GMAT", icon: BookOpen },
//         { value: "toefl", label: "TOEFL", icon: BookOpen },
//         { value: "study-abroad", label: "Study Abroad", icon: Globe },
//         { value: "other", label: "Other", icon: FileText },
//       ],
//     },
//     {
//       name: "preferredCountry",
//       label: "Preferred Country",
//       type: "text",
//       step: 2,
//       grid: "half",
//       required: true,
//       placeholder: "Enter your country",
//       icon: Globe,
//     },
//     {
//       name: "message",
//       label: "Message",
//       type: "textarea",
//       step: 3,
//       grid: "full",
//       required: false,
//       placeholder: "Tell us about your goals and requirements...",
//     },
//   ],
// };

// export default function BlogPage({ pageInfo, categories }: any) {
//   const router = useRouter();
//   const [search, setSearch] = useState("");
//   const [blogs, setBlogs] = useState<Blog[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [pagination, setPagination] = useState<PaginationData>({
//     currentPage: 1,
//     totalPages: 1,
//     totalItems: 0,
//     itemsPerPage: 10,
//   });
//   const [currentPage, setCurrentPage] = useState(1);

//   // Fetch blogs with pagination
//   const fetchBlogs = useCallback(
//     async (page: number = 1, searchTerm: string = "") => {
//       try {
//         setLoading(true);
//         const api = await axiosInstance(
//           `/admin/blogs?page=${page}&limit=10&search=${searchTerm}`,
//         );
//         const res = await api.data;

//         setBlogs(res.data || []);
//         setPagination({
//           currentPage: res.currentPage || page,
//           totalPages: res.totalPages || 1,
//           totalItems: res.totalItems || 0,
//           itemsPerPage: res.itemsPerPage || 10,
//         });
//       } catch (error) {
//         setBlogs([]);
//       } finally {
//         setLoading(false);
//       }
//     },
//     [],
//   );

//   // Initial fetch and when search or page changes
//   useEffect(() => {
//     fetchBlogs(currentPage, search);
//   }, [currentPage, search, fetchBlogs]);

//   // Handle search with debounce
//   useEffect(() => {
//     const debounceTimer = setTimeout(() => {
//       if (currentPage !== 1) {
//         setCurrentPage(1);
//       } else {
//         fetchBlogs(1, search);
//       }
//     }, 500);

//     return () => clearTimeout(debounceTimer);
//   }, [search, fetchBlogs, currentPage]);

//   // Navigate to blog detail page
//   const navigateToBlog = (blogId: string) => {
//     router.push(`/blog/${blogId}`);
//   };

//   // Generate pagination numbers
//   const getPaginationNumbers = () => {
//     const { currentPage, totalPages } = pagination;
//     const pages: (number | string)[] = [];

//     if (totalPages <= 7) {
//       for (let i = 1; i <= totalPages; i++) {
//         pages.push(i);
//       }
//     } else {
//       pages.push(1);
//       if (currentPage > 3) {
//         pages.push("…");
//       }

//       const start = Math.max(2, currentPage - 1);
//       const end = Math.min(totalPages - 1, currentPage + 1);

//       for (let i = start; i <= end; i++) {
//         pages.push(i);
//       }

//       if (currentPage < totalPages - 2) {
//         pages.push("…");
//       }
//       pages.push(totalPages);
//     }

//     return pages;
//   };

//   const handlePageChange = (page: number | string) => {
//     if (
//       typeof page === "string" ||
//       page === currentPage ||
//       page < 1 ||
//       page > pagination.totalPages
//     ) {
//       return;
//     }
//     setCurrentPage(page);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   // Get featured blog (first blog or a specific one)
//   const featuredBlog = blogs.length > 0 ? blogs[0] : null;

//   // Get latest blogs (all except featured)
//   const latestBlogs = blogs.length > 1 ? blogs.slice(1) : [];

//   return (
//     <div className="min-h-screen bg-white text-[#1f2430]">
//       <section className="relative w-full overflow-hidden bg-[#fcf4ed] py-8 md:py-12">
//         <div className="mx-auto flex max-w-7xl flex-col items-center gap-12 px-4 sm:px-6 lg:flex-row lg:justify-between lg:px-8">
//           {/* Left Flex Item: Content Column */}
//           <div className="flex w-full flex-col justify-center text-center lg:w-[85%] text-center lg:text-left">
//             <h1 className=" text-2xl md:text-3xl lg:text-5xl font-bold">
//               {"Ooshas Prep "}
//               <span className="text-primary">{"Blog"}</span>
//             </h1>
            
//             <p className="mx-auto mt-4 max-w-xl text-base text-gray-600 lg:mx-0 lg:text-lg">
//               {data?.hero?.subtitle}
//             </p>

//             {/* Search Form Container */}
//             <form
//               onSubmit={(e) => {
//                 e.preventDefault();
//               }}
//               className="mx-auto mt-8 flex w-full max-w-md overflow-hidden rounded-xl border border-gray-200 bg-white p-1 shadow-md focus-within:ring-2 focus-within:ring-[#F0642C] lg:mx-0"
//             >
//               <label htmlFor="hero-search" className="sr-only">
//                 Search for articles
//               </label>
//               <input
//                 id="hero-search"
//                 type="text"
//                 placeholder="Search for articles..."
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 className="w-full bg-transparent px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none"
//               />
//               <button
//                 type="submit"
//                 aria-label="Submit search"
//                 className="flex items-center justify-center rounded-lg bg-[#F0642C] px-5 text-white transition-colors duration-200 hover:bg-[#d9551f] focus:outline-none focus:ring-2 focus:ring-[#d9551f]"
//               >
//                 <Search size={18} aria-hidden="true" />
//               </button>
//             </form>
//           </div>

//           {/* Right Flex Item: Image Column */}
//           <img
//             src="/blog image.webp"
//             alt="Students studying together"
//             loading="eager"
//             decoding="async"
//             className="hidden lg:block h-64 w-full rounded-2xl object-cover sm:h-80 md:h-96 lg:h-[380px]"
//           />
//         </div>
//       </section>

//       {/* Body */}
//       <main className="mx-auto max-w-7xl px-6 py-14">
//         {loading ? (
//           <div className="flex justify-center items-center py-20">
//             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#F0642C]"></div>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_320px]">
//             {/* Left column */}
//             <div>
//               {/* Featured post */}
//               {featuredBlog && (
//                 <>
//                   <h2 className="text-left text-2xl md:text-3xl lg:text-4xl font-bold mb-5">
//                     Featured <span className="text-[#F0642C]">Post</span>
//                   </h2>
//                   <div
//                     className="mb-12 grid grid-cols-1 gap-6 rounded-lg border border-gray-100 p-2 sm:grid-cols-[320px_1fr] cursor-pointer hover:shadow-lg transition-shadow"
//                     onClick={() => navigateToBlog(featuredBlog.slug)}
//                   >
//                     <div className="relative h-56 w-full overflow-hidden rounded-md sm:h-full">
//                       <Image
//                         src={featuredBlog.image || "/placeholder-blog.jpg"}
//                         alt={featuredBlog.title}
//                         fill
//                         className="object-contain"
//                       />
//                     </div>
//                     <div className="flex flex-col justify-center px-2 py-2">
//                       <div className="mb-2 flex items-center justify-between gap-4 text-xs">
//                         <span className="font-semibold text-[#F0642C]">
//                           {featuredBlog.category || "Featured"}
//                         </span>
//                         <span className="flex items-center gap-1 text-gray-400">
//                           <Calendar size={12} />{" "}
//                           {featuredBlog.publishedDate?.split("T")[0] ||
//                             "2026-07-07"}
//                         </span>
//                       </div>
//                       <h3 className="mb-3 text-xl font-bold leading-snug text-[#1f2430]">
//                         {featuredBlog.title}
//                       </h3>
//                       <p className="mb-4 text-sm leading-relaxed text-gray-500">
//                         {featuredBlog.excerpt}
//                       </p>
//                       <div className="flex items-center justify-between">
//                         <div className="flex items-center gap-2">
//                           <div className="relative text-center overflow-hidden rounded-full">
//                             <UserCircle size={32} className="text-gray-400" />
//                           </div>
//                           <div className="text-xs">
//                             <p className="font-semibold text-[#1f2430]">
//                               By {featuredBlog.author || "Admin"}
//                             </p>
//                           </div>
//                         </div>
//                         <button
//                           className="flex items-center gap-2 rounded-md bg-[#F0642C] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#d9551f]"
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             navigateToBlog(featuredBlog.slug);
//                           }}
//                         >
//                           Read More <ArrowRight size={14} />
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </>
//               )}

//               {/* Latest blogs */}
//               <h2 className="text-left text-2xl md:text-3xl lg:text-4xl font-bold mb-5">
//                 Latest <span className="text-[#F0642C]">Blogs</span>
//               </h2>
//               {latestBlogs.length > 0 ? (
//                 <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
//                   {latestBlogs.map((post) => (
//                     <article
//                       key={post._id}
//                       className="group cursor-pointer"
//                       onClick={() => navigateToBlog(post.slug)}
//                     >
//                       <div className="relative mb-3 h-40 w-full overflow-hidden rounded-md">
//                         <span className="absolute left-2 top-2 z-10 rounded bg-[#F0642C] px-2 py-0.5 text-[10px] font-semibold text-white">
//                           {post.category || "Blog"}
//                         </span>
//                         <Image
//                           src={post.image || "/placeholder-blog.jpg"}
//                           alt={post.title}
//                           fill
//                           className="object-cover transition-transform duration-300 group-hover:scale-105"
//                         />
//                       </div>
//                       <h3 className="mb-2 text-[15px] font-bold leading-snug text-[#1f2430] group-hover:text-[#F0642C]">
//                         {post.title}
//                       </h3>
//                       <p className="mb-3 text-[13px] leading-relaxed text-gray-500">
//                         {post.excerpt}
//                       </p>
//                       <div className="flex items-center gap-4 text-[11px] text-gray-400">
//                         <span className="flex items-center gap-1">
//                           <Calendar size={11} />{" "}
//                           {post.publishedDate?.split("T")[0] || "2026-07-07"}
//                         </span>
//                       </div>
//                     </article>
//                   ))}
//                 </div>
//               ) : (
//                 <div className="text-center py-10 text-gray-500">
//                   No blogs found. Try adjusting your search.
//                 </div>
//               )}

//               {/* Pagination */}
//               {pagination.totalPages > 1 && (
//                 <div className="mt-12 flex items-center justify-center gap-2 flex-wrap">
//                   <button
//                     className="flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 text-gray-400 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//                     onClick={() => handlePageChange(currentPage - 1)}
//                     disabled={currentPage === 1}
//                   >
//                     <ChevronLeft size={16} />
//                   </button>

//                   {getPaginationNumbers().map((page, index) => (
//                     <button
//                       key={index}
//                       onClick={() => handlePageChange(page)}
//                       className={`flex h-9 w-9 items-center justify-center rounded-md text-sm font-medium ${
//                         page === currentPage
//                           ? "bg-[#F0642C] text-white"
//                           : page === "…"
//                             ? "border-none cursor-default"
//                             : "border border-gray-200 text-gray-500 hover:bg-gray-50"
//                       }`}
//                       disabled={page === "…"}
//                     >
//                       {page}
//                     </button>
//                   ))}

//                   <button
//                     className="flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 text-gray-400 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//                     onClick={() => handlePageChange(currentPage + 1)}
//                     disabled={currentPage === pagination.totalPages}
//                   >
//                     <ChevronRight size={16} />
//                   </button>
//                 </div>
//               )}
//             </div>

//             {/* Sidebar */}
//             <aside className="space-y-6">
//               {/* Replace the old form with the new FormSection */}
//               <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100">
//                 <div className="p-4 bg-gradient-to-r from-[#F0642C] to-[#F86C43]">
//                   <h3 className="text-lg font-bold text-white text-center">
//                     Speak to an Expert
//                   </h3>
//                   <p className="text-xs text-white/80 text-center mt-1">
//                     Get personalized guidance for your study abroad journey
//                   </p>
//                 </div>
//                 <div className="p-4">
//                   <FormSection 
//                     FORM_CONFIG={FORM_CONFIG}
//                     pageName="blog-page"
//                     apiEndpoint="/api/submit-enquiry"
//                   />
//                 </div>
//               </div>

//               {/* Categories */}
//               {categories && categories.length > 0 && (
//                 <div className="bg-[#FDF9F8] rounded p-4 max-h-[18rem] overflow-auto">
//                   <h3 className="mb-2 text-lg font-bold">Categories</h3>
//                   <ul className="space-y-3 text-sm">
//                     {categories.map((c: Category) => (
//                       <li
//                         key={c.name} 
//                         onClick={() => setSearch(c.name)}
//                         className="flex items-center justify-between bg-white px-4 py-2 rounded cursor-pointer"
//                       >
//                         <p className="hover:text-[#F0642C]">
//                           {c.name}
//                         </p>
//                         <span className="text-gray-400">{c.count}</span>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               )}

//               {/* Popular posts */}
//               <div>
//                 <h3 className="mb-4 text-lg font-bold">Popular Posts</h3>
//                 <ul className="space-y-4">
//                   {blogs.slice(0, 5).map((p) => (
//                     <li
//                       key={p._id}
//                       className="flex gap-3 cursor-pointer hover:opacity-80"
//                       onClick={() => navigateToBlog(p.slug)}
//                     >
//                       <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-md">
//                         <Image
//                           src={p.image || "/placeholder-blog.jpg"}
//                           alt={p.title}
//                           fill
//                           className="object-cover"
//                         />
//                       </div>
//                       <div>
//                         <p className="text-sm font-semibold leading-snug text-[#1f2430] hover:text-[#F0642C]">
//                           {p.title}
//                         </p>
//                         <p className="mt-1 flex items-center gap-1 text-[11px] text-gray-400">
//                           <Calendar size={10} />{" "}
//                           {p.publishedDate?.split("T")[0] || "2026-07-07"}
//                         </p>
//                       </div>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </aside>
//           </div>
//         )}

//         {/* Newsletter banner */}
//         <div className="mt-16 flex flex-col items-center gap-8 rounded-lg bg-[#FBEAE2] p-8 sm:flex-row">
//           <div className="relative h-40 w-80 flex-shrink-0 overflow-hidden rounded-full">
//             <Image
//               src={data.newsletterBanner.img}
//               alt="Happy student"
//               fill
//               className="object-contain"
//             />
//           </div>
//           <div className="flex-1 text-center sm:text-left">
//             <h3 className="mb-1 text-2xl font-bold text-[#1f2430]">
//               {data.newsletterBanner.title}
//             </h3>
//             <p className="text-sm text-gray-500">
//               {data.newsletterBanner.text}
//             </p>
//           </div>
//           <form className="flex w-full max-w-sm overflow-hidden rounded-md bg-white sm:w-auto">
//             <input
//               type="email"
//               placeholder="Enter your email address"
//               className="w-full px-4 py-3 text-sm text-gray-600 outline-none"
//             />
//             <button className="flex items-center gap-2 whitespace-nowrap bg-[#F0642C] px-4 text-xs font-semibold text-white hover:bg-[#d9551f]">
//               Subscribe Now <ArrowRight size={14} />
//             </button>
//           </form>
//         </div>

//         {/* Features row */}
//         <div className="mt-16 grid grid-cols-1 gap-8 border-t border-gray-100 pt-12 sm:grid-cols-2 lg:grid-cols-4">
//           {data.features.map((f) => {
//             const Icon = iconMap[f.icon as keyof typeof iconMap];
//             return (
//               <div key={f.title} className="flex items-start gap-4">
//                 <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#FBEAE2] text-[#F0642C]">
//                   <Icon size={22} />
//                 </div>
//                 <div>
//                   <h4 className="mb-1 text-sm font-bold text-[#1f2430]">
//                     {f.title}
//                   </h4>
//                   <p className="text-xs leading-relaxed text-gray-500">
//                     {f.desc}
//                   </p>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </main>
//     </div>
//   );
// }










