"use client"

import Image from "next/image";
import Link from "next/link";
import {
  Phone,
  Search,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Clock,
  Calendar,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  FileText,
  BookOpen,
  Users,
  Globe,
  Send,
  UserCircle,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import axiosInstance from "../lib/axios";
import { useRouter } from "next/navigation";

// Types
interface Blog {
  _id:string;
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
    subtitle: "Stay updated with the latest exam tips, study guides, success stories and education insights from experts.",
    bgImage: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1600&auto=format&fit=crop"
  },
  featuredPost: {
    badge: "LATEST",
    category: "Study Tips",
    date: "May 10, 2024",
    title: "How to Prepare for IELTS Exam: A Complete Guide for 2024",
    excerpt: "Expert tips and strategies to help you achieve a high band score in IELTS. Learn about all sections, time management, and proven techniques.",
    author: "Neha Khanna",
    readTime: "8 min read",
    img: "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=600&auto=format&fit=crop",
    authorImg: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=100&auto=format&fit=crop"
  },
  stayUpdatedCard: {
    title: "Stay Updated!",
    text: "Subscribe to our newsletter and never miss an update."
  },
  newsletterBanner: {
    title: "Get the Latest Updates in Your Inbox",
    text: "Study tips, exam updates, success stories and more.",
    img: "/87921129_blog_concept.webp"
  },
  features: [
    { icon: "FileText", title: "Expert Insights", desc: "Learn from industry experts and top educators" },
    { icon: "BookOpen", title: "Updated Content", desc: "Get the latest exam patterns and study strategies" },
    { icon: "Users", title: "Student Success", desc: "Real stories from students who achieved their dreams" },
    { icon: "Globe", title: "Global Education", desc: "Insights on studying abroad and top universities" }
  ]
}

const iconMap = { FileText, BookOpen, Users, Globe };
const socialIconMap = { Facebook, Instagram, Linkedin, Youtube };

export default function BlogPage({ pageInfo, categories }: any) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<PaginationData>({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10
  });
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch blogs with pagination
  const fetchBlogs = useCallback(async (page: number = 1, searchTerm: string = "") => {
    try {
      setLoading(true);
      const api = await axiosInstance(`/admin/blogs?page=${page}&limit=10&search=${searchTerm}`);
      const res = await api.data;
      
      setBlogs(res.data || []);
      setPagination({
        currentPage: res.currentPage || page,
        totalPages: res.totalPages || 1,
        totalItems: res.totalItems || 0,
        itemsPerPage: res.itemsPerPage || 10
      });
      
      console.log(res, "all data");
    } catch (error) {
      console.log(error, "errors");
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial fetch and when search or page changes
  useEffect(() => {
    fetchBlogs(currentPage, search);
  }, [currentPage, search, fetchBlogs]);

  // Handle search with debounce
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (currentPage !== 1) {
        setCurrentPage(1);
      } else {
        fetchBlogs(1, search);
      }
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [search, fetchBlogs, currentPage]);

  // Navigate to blog detail page
  const navigateToBlog = (blogId: string) => {
    router.push(`/blog/${blogId}`);
  };

  // Generate pagination numbers
  const getPaginationNumbers = () => {
    const { currentPage, totalPages } = pagination;
    const pages: (number | string)[] = [];
    
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      if (currentPage > 3) {
        pages.push('…');
      }
      
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      if (currentPage < totalPages - 2) {
        pages.push('…');
      }
      pages.push(totalPages);
    }
    
    return pages;
  };

  const handlePageChange = (page: number | string) => {
    if (typeof page === 'string' || page === currentPage || page < 1 || page > pagination.totalPages) {
      return;
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Get featured blog (first blog or a specific one)
  const featuredBlog = blogs.length > 0 ? blogs[0] : null;

  // Get latest blogs (all except featured)
  const latestBlogs = blogs.length > 1 ? blogs.slice(1) : [];

  return (
    <div className="min-h-screen bg-white text-[#1f2430]">
     
     
    <section className="relative w-full overflow-hidden bg-[#FDF4EE] py-8 md:py-12">
      {/* Main Flex Container: Columns stacked on mobile, side-by-side on desktop */}
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-12 px-4 sm:px-6 lg:flex-row lg:justify-between lg:px-8">
        
        {/* Left Flex Item: Content Column */}
        <div className="flex w-full flex-col justify-center text-center lg:w-[85%] lg:text-left">
          
          {/* Breadcrumbs */}
          {/* <nav aria-label="Breadcrumb" className="mb-6 text-xs font-medium tracking-wide text-gray-600">
            {data?.hero?.breadcrumb?.map((crumb, i) => (
              <span key={crumb} className="inline-flex items-center">
                <span className={i === data.hero.breadcrumb.length - 1 ? "font-semibold text-gray-900" : ""}>
                  {crumb}
                </span>
                {i < data.hero.breadcrumb.length - 1 && <span className="mx-2 text-gray-400">›</span>}
              </span>
            ))}
          </nav> */}

          {/* Typography */}
          <h1 className="text-4xl font-black tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            {data?.hero?.title}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base text-gray-600 lg:mx-0 lg:text-lg">
            {data?.hero?.subtitle}
          </p>

          {/* Search Form Container */}
          <form 
            onSubmit={(e) => { e.preventDefault(); onSearchSubmit?.(); }}
            className="mx-auto mt-8 flex w-full max-w-md overflow-hidden rounded-xl border border-gray-200 bg-white p-1 shadow-md focus-within:ring-2 focus-within:ring-[#F0642C] lg:mx-0"
          >
            <label htmlFor="hero-search" className="sr-only">Search for articles</label>
            <input
              id="hero-search"
              type="text"
              placeholder="Search for articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none"
            />
            <button
              type="submit"
              aria-label="Submit search"
              className="flex items-center justify-center rounded-lg bg-[#F0642C] px-5 text-white transition-colors duration-200 hover:bg-[#d9551f] focus:outline-none focus:ring-2 focus:ring-[#d9551f]"
            >
              <Search size={18} aria-hidden="true" />
            </button>
          </form>
        </div>

        {/* Right Flex Item: Image Column */}

          <img
              src="/blog image.webp"
              alt="Students studying together"
              loading="eager"
              decoding="async"
              className="hidden lg:block h-64 w-full rounded-2xl object-cover  sm:h-80 md:h-96 lg:h-[380px]"
            />
        {/* <div className="relative flex w-full max-w-md items-center justify-center lg:w-[40%] lg:max-w-none">
          <div className="relative w-full">
          
            <div className="absolute -inset-4 -z-10 rounded-2xl bg-[#F0642C]/5 blur-xl" />
          </div>
        </div> */}

      </div>
    </section>



      {/* <section className="relative grid grid-col-2 overflow-hidden bg-[#FDF4EE]">
        
        <div className="relative mx-auto max-w-7xl px-6 py-20 text-center text-white">
          <div className="mb-4 text-xs text-gray-200">
            {data.hero.breadcrumb.map((crumb, i) => (
              <span key={crumb}>
                {crumb}
                {i < data.hero.breadcrumb.length - 1 && <span className="mx-1">›</span>}
              </span>
            ))}
          </div>
          <h1 className="text-4xl font-extrabold sm:text-5xl">{data.hero.title}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-gray-200 sm:text-base">{data.hero.subtitle}</p>
          <div className="mx-auto mt-8 flex max-w-md overflow-hidden rounded-md">
            <input
              type="text"
              placeholder="Search for articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white px-4 py-3 text-sm text-gray-700 outline-none"
            />
            <button
              type="submit"
              className="flex items-center justify-center bg-[#F0642C] px-5 text-white transition-colors hover:bg-[#d9551f]"
            >
              <Search size={18} />
            </button>
          </div>
        </div>
      </section> */}

      {/* Body */}
      <main className="mx-auto max-w-7xl px-6 py-14">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#F0642C]"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_320px]">
            {/* Left column */}
            <div>
              {/* Featured post */}
              {featuredBlog && (
                <>
                  <h2 className="mb-5 text-2xl font-bold">
                    Featured <span className="text-[#F0642C]">Post</span>
                  </h2>
                  <div 
                    className="mb-12 grid grid-cols-1 gap-6 rounded-lg border border-gray-100 p-2 sm:grid-cols-[320px_1fr] cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => navigateToBlog(featuredBlog.slug)}
                  >
                    <div className="relative h-56 w-full overflow-hidden rounded-md sm:h-full">
                      <span className="absolute left-3 top-3 z-10 rounded bg-[#F0642C] px-2 py-1 text-[11px] font-semibold text-white">
                        {featuredBlog.category || "LATEST"}
                      </span>
                      <Image 
                        src={featuredBlog.image || "/placeholder-blog.jpg"} 
                        alt={featuredBlog.title} 
                        fill 
                        className="object-cover" 
                      />
                    </div>
                    <div className="flex flex-col justify-center px-2 py-2">
                      <div className="mb-2 flex items-center justify-between gap-4 text-xs">
                        <span className="font-semibold text-[#F0642C]">{featuredBlog.category || "Featured"}</span>
                        <span className="flex items-center gap-1 text-gray-400">
                          <Calendar size={12} /> {featuredBlog.publishedDate?.split('T')[0] || "2026-07-07"}
                        </span>
                      </div>
                      <h3 className="mb-3 text-xl font-bold leading-snug text-[#1f2430]">{featuredBlog.title}</h3>
                      <p className="mb-4 text-sm leading-relaxed text-gray-500">{featuredBlog.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="relative text-center overflow-hidden rounded-full">
                            <UserCircle size={32} className="text-gray-400" />
                          </div>
                          <div className="text-xs">
                            <p className="font-semibold text-[#1f2430]">By {featuredBlog.author || "Admin"}</p>
                          </div>
                        </div>
                        <button 
                          className="flex items-center gap-2 rounded-md bg-[#F0642C] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#d9551f]"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigateToBlog(featuredBlog.slug);
                          }}
                        >
                          Read More <ArrowRight size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Latest blogs */}
              <h2 className="mb-5 text-2xl font-bold">
                Latest <span className="text-[#F0642C]">Blogs</span>
              </h2>
              {latestBlogs.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {latestBlogs.map((post) => (
                    <article 
                      key={post._id} 
                      className="group cursor-pointer"
                      onClick={() => navigateToBlog(post.slug)}
                    >
                      <div className="relative mb-3 h-40 w-full overflow-hidden rounded-md">
                        <span className="absolute left-2 top-2 z-10 rounded bg-[#F0642C] px-2 py-0.5 text-[10px] font-semibold text-white">
                          {post.category || "Blog"}
                        </span>
                        <Image
                          src={post.image || "/placeholder-blog.jpg"}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <h3 className="mb-2 text-[15px] font-bold leading-snug text-[#1f2430] group-hover:text-[#F0642C]">
                        {post.title}
                      </h3>
                      <p className="mb-3 text-[13px] leading-relaxed text-gray-500">{post.excerpt}</p>
                      <div className="flex items-center gap-4 text-[11px] text-gray-400">
                        <span className="flex items-center gap-1">
                          <Calendar size={11} /> {post.publishedDate?.split('T')[0] || "2026-07-07"}
                        </span>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 text-gray-500">
                  No blogs found. Try adjusting your search.
                </div>
              )}

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="mt-12 flex items-center justify-center gap-2 flex-wrap">
                  <button 
                    className="flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 text-gray-400 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft size={16} />
                  </button>
                  
                  {getPaginationNumbers().map((page, index) => (
                    <button
                      key={index}
                      onClick={() => handlePageChange(page)}
                      className={`flex h-9 w-9 items-center justify-center rounded-md text-sm font-medium ${
                        page === currentPage
                          ? "bg-[#F0642C] text-white"
                          : page === '…'
                          ? "border-none cursor-default"
                          : "border border-gray-200 text-gray-500 hover:bg-gray-50"
                      }`}
                      disabled={page === '…'}
                    >
                      {page}
                    </button>
                  ))}
                  
                  <button 
                    className="flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 text-gray-400 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === pagination.totalPages}
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              {/* Speak to an Expert Form */}
              <div className="flex justify-center lg:justify-end">
                <div className="p-2 rounded-xl md:rounded-md w-full max-w-md bg-[#fff]">
                  <h3 className="text-center text-lg md:text-xl font-semibold mb-6 md:mb-8">
                    Speak to an Expert
                  </h3>
                  <form className="space-y-3 md:space-y-4">
                    <input
                      type="text"
                      placeholder="Name"
                      className="w-full border border-gray-300 rounded-md px-4 py-2.5 md:py-3 outline-none focus:border-[#F86C43] text-sm"
                    />
                    <div className="flex">
                      <div className="w-20 md:w-24 border border-gray-300 rounded-l-md flex items-center justify-center gap-1 md:gap-2 bg-white text-sm">
                        🇮🇳 +91
                      </div>
                      <input
                        type="tel"
                        placeholder="Mobile Number"
                        className="flex-1 border border-l-0 border-gray-300 rounded-r-md px-4 py-2.5 md:py-3 outline-none focus:border-[#F86C43] text-sm"
                      />
                    </div>
                    <input
                      type="email"
                      placeholder="Email Id"
                      className="w-full border border-gray-300 rounded-md px-4 py-2.5 md:py-3 outline-none focus:border-[#F86C43] text-sm"
                    />
                    <select className="w-full border border-gray-300 rounded-md px-4 py-2.5 md:py-3 outline-none focus:border-[#F86C43] bg-white text-sm">
                      <option>Interested in?</option>
                      <option>GRE</option>
                      <option>IELTS</option>
                      <option>GMAT</option>
                      <option>TOEFL</option>
                    </select>
                    <input
                      type="text"
                      placeholder="City Name"
                      className="w-full border border-gray-300 rounded-md px-4 py-2.5 md:py-3 outline-none focus:border-[#F86C43] text-sm"
                    />
                    <label className="flex items-center gap-2 text-xs text-gray-600">
                      <input type="checkbox" defaultChecked className="accent-[#F86C43]" />
                      Stay informed via SMS & WhatsApp
                    </label>
                    <button
                      type="submit"
                      className="w-full bg-[#F86C43] hover:bg-[#ef5a2f] transition text-white font-semibold py-2.5 md:py-3 rounded-md text-sm md:text-base"
                    >
                      Schedule a Call
                    </button>
                  </form>
                </div>
              </div>

              {/* Categories */}
              {categories && categories.length > 0 && (
                <div className="bg-[#FDF9F8] rounded p-4 max-h-[18rem] overflow-auto">
                  <h3 className="mb-4 text-lg font-bold">Categories</h3>
                  <ul className="space-y-3 text-sm">
                    {categories.map((c: Category) => (
                      <li key={c.name} className="flex items-center justify-between text-gray-600">
                        <a href="#" className="hover:text-[#F0642C]">{c.name}</a>
                        <span className="text-gray-400">{c.count}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Popular posts */}
              <div>
                <h3 className="mb-4 text-lg font-bold">Popular Posts</h3>
                <ul className="space-y-4">
                  {blogs.slice(0, 5).map((p) => (
                    <li 
                      key={p._id} 
                      className="flex gap-3 cursor-pointer hover:opacity-80"
                      onClick={() => navigateToBlog(p.slug)}
                    >
                      <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-md">
                        <Image 
                          src={p.image || "/placeholder-blog.jpg"} 
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
                          <Calendar size={10} /> {p.publishedDate?.split('T')[0] || "2026-07-07"}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>


            </aside>
          </div>
        )}

        {/* Newsletter banner */}
        <div className="mt-16 flex flex-col items-center gap-8 rounded-lg bg-[#FBEAE2] p-8 sm:flex-row">
          <div className="relative h-40 w-80 flex-shrink-0 overflow-hidden rounded-full">
            <Image src={data.newsletterBanner.img} alt="Happy student" fill className="object-contain" />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h3 className="mb-1 text-2xl font-bold text-[#1f2430]">{data.newsletterBanner.title}</h3>
            <p className="text-sm text-gray-500">{data.newsletterBanner.text}</p>
          </div>
          <form className="flex w-full max-w-sm overflow-hidden rounded-md bg-white sm:w-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full px-4 py-3 text-sm text-gray-600 outline-none"
            />
            <button className="flex items-center gap-2 whitespace-nowrap bg-[#F0642C] px-4 text-xs font-semibold text-white hover:bg-[#d9551f]">
              Subscribe Now <ArrowRight size={14} />
            </button>
          </form>
        </div>

        {/* Features row */}
        <div className="mt-16 grid grid-cols-1 gap-8 border-t border-gray-100 pt-12 sm:grid-cols-2 lg:grid-cols-4">
          {data.features.map((f) => {
            const Icon = iconMap[f.icon as keyof typeof iconMap];
            return (
              <div key={f.title} className="flex items-start gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#FBEAE2] text-[#F0642C]">
                  <Icon size={22} />
                </div>
                <div>
                  <h4 className="mb-1 text-sm font-bold text-[#1f2430]">{f.title}</h4>
                  <p className="text-xs leading-relaxed text-gray-500">{f.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}






// "use client"


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
//   Send,
//   UserCircle,
// } from "lucide-react";
// import { useCallback, useEffect, useState } from "react";
// import axiosInstance from "../lib/axios";
// // import data from "./data.json";

// const data = {
 
  
//   "hero": {
//     "breadcrumb": ["Home", "Blogs"],
//     "title": "Ooshas Prep Blog",
//     "subtitle": "Stay updated with the latest exam tips, study guides, success stories and education insights from experts.",
//     "bgImage": "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1600&auto=format&fit=crop"
//   },
//   "featuredPost": {
//     "badge": "LATEST",
//     "category": "Study Tips",
//     "date": "May 10, 2024",
//     "title": "How to Prepare for IELTS Exam: A Complete Guide for 2024",
//     "excerpt": "Expert tips and strategies to help you achieve a high band score in IELTS. Learn about all sections, time management, and proven techniques.",
//     "author": "Neha Khanna",
//     "readTime": "8 min read",
//     "img": "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=600&auto=format&fit=crop",
//     "authorImg": "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=100&auto=format&fit=crop"
//   },
//   "latestBlogs": [
//     {
//       "tag": "GRE",
//       "title": "GRE Preparation Tips for a High Score",
//       "excerpt": "Effective strategies and study plan to crack GRE in the first attempt.",
//       "date": "May 8, 2024",
//       "read": "6 min read",
//       "img": "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=500&auto=format&fit=crop"
//     },
//     {
//       "tag": "TOEFL",
//       "title": "TOEFL vs IELTS: Which Exam is Right for You?",
//       "excerpt": "Detailed comparison to help you choose the right exam for your study abroad journey.",
//       "date": "May 6, 2024",
//       "read": "7 min read",
//       "img": "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=500&auto=format&fit=crop"
//     },
//     {
//       "tag": "SAT",
//       "title": "SAT Exam Pattern and Syllabus 2024",
//       "excerpt": "Everything you need to know about SAT exam pattern, syllabus, and scoring.",
//       "date": "May 4, 2024",
//       "read": "5 min read",
//       "img": "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=500&auto=format&fit=crop"
//     },
//     {
//       "tag": "Study Abroad",
//       "title": "Top Scholarships for Indian Students in 2024",
//       "excerpt": "Explore top scholarships and funding options to study in your dream university.",
//       "date": "May 2, 2024",
//       "read": "6 min read",
//       "img": "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=500&auto=format&fit=crop"
//     },
//     {
//       "tag": "Universities",
//       "title": "Top Universities in USA For International Students",
//       "excerpt": "Check out the list of top universities in USA and their admission requirements.",
//       "date": "Apr 30, 2024",
//       "read": "6 min read",
//       "img": "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=500&auto=format&fit=crop"
//     },
//     {
//       "tag": "PTE",
//       "title": "PTE Exam: Complete Preparation Guide",
//       "excerpt": "Step-by-step guide to prepare for PTE and achieve your desired score.",
//       "date": "Apr 28, 2024",
//       "read": "5 min read",
//       "img": "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=500&auto=format&fit=crop"
//     }
//   ],
//   "pagination": ["1", "2", "3", "4", "…", "10"],
//   "categories": [
//     { "name": "Study Tips", "count": 24 },
//     { "name": "IELTS", "count": 18 },
//     { "name": "TOEFL", "count": 16 },
//     { "name": "GRE", "count": 14 },
//     { "name": "SAT", "count": 12 },
//     { "name": "PTE", "count": 10 },
//     { "name": "Study Abroad", "count": 20 },
//     { "name": "Scholarships", "count": 15 },
//     { "name": "Universities", "count": 17 },
//     { "name": "Career Guide", "count": 9 }
//   ],
//   "popularPosts": [
//     {
//       "title": "How to Write Perfect SOP for Universities",
//       "date": "May 9, 2024",
//       "img": "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=200&auto=format&fit=crop"
//     },
//     {
//       "title": "Common IELTS Speaking Mistakes to Avoid",
//       "date": "May 7, 2024",
//       "img": "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=200&auto=format&fit=crop"
//     },
//     {
//       "title": "Study Abroad Checklist: All You Need to Know",
//       "date": "May 5, 2024",
//       "img": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=200&auto=format&fit=crop"
//     },
//     {
//       "title": "GMAT vs GRE: Which One Should You Choose?",
//       "date": "May 3, 2024",
//       "img": "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=200&auto=format&fit=crop"
//     },
//     {
//       "title": "How to Get Admission in Top Universities in UK",
//       "date": "Apr 29, 2024",
//       "img": "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=200&auto=format&fit=crop"
//     }
//   ],
//   "stayUpdatedCard": {
//     "title": "Stay Updated!",
//     "text": "Subscribe to our newsletter and never miss an update."
//   },
//   "newsletterBanner": {
//     "title": "Get the Latest Updates in Your Inbox",
//     "text": "Study tips, exam updates, success stories and more.",
//     "img": "https://images.unsplash.com/photo-1494790108377-be9c29b531c8?q=80&w=300&auto=format&fit=crop"
//   },
//   "features": [
//     { "icon": "FileText", "title": "Expert Insights", "desc": "Learn from industry experts and top educators" },
//     { "icon": "BookOpen", "title": "Updated Content", "desc": "Get the latest exam patterns and study strategies" },
//     { "icon": "Users", "title": "Student Success", "desc": "Real stories from students who achieved their dreams" },
//     { "icon": "Globe", "title": "Global Education", "desc": "Insights on studying abroad and top universities" }
//   ],
  
// }

// const iconMap = { FileText, BookOpen, Users, Globe };
// const socialIconMap = { Facebook, Instagram, Linkedin, Youtube };

// export default function BlogPage({pageInfo, categories} : any) {
//   const {
    
//     hero,
//     featuredPost,
//     latestBlogs,
//     pagination,
//     // categories,
//     popularPosts,
//     stayUpdatedCard,
//     newsletterBanner,
//     features,
    
//   } = data;
//   const [filter, setfilter] = useState("");
//   const [search, setSearch] = useState("");
//   const [blogs, setBlogs] = useState([]);

//   const Blogs = useCallback(async () => {
//     try {
//       const api = await axiosInstance(`/admin/blogs?page=1&limit=10&search=${search}`)
//       const res = await api.data.data;
//       setBlogs(res);
//       console.log(res, "all data")
//     } catch (error) {
//       console.log(error,"errors")
//     }

//   },[search])

//   useEffect(() => {
//     Blogs();
//   },[search])

//   return (
//     <div className="min-h-screen bg-white  text-[#1f2430]">
     
     

//       {/* Hero */}
//       <section className="relative overflow-hidden">
//         <div className="absolute inset-0">
//           <Image src={hero.bgImage} alt="Students studying together" fill priority className="object-cover" />
//           <div className="absolute inset-0 bg-[#2a1a12]/70" />
//         </div>
//         <div className="relative mx-auto max-w-7xl px-6 py-20 text-center text-white">
//           <div className="mb-4 text-xs text-gray-200">
//             {hero.breadcrumb.map((crumb, i) => (
//               <span key={crumb}>
//                 {crumb}
//                 {i < hero.breadcrumb.length - 1 && <span className="mx-1">›</span>}
//               </span>
//             ))}
//           </div>
//           <h1 className="text-4xl font-extrabold sm:text-5xl">{hero.title}</h1>
//           <p className="mx-auto mt-4 max-w-2xl text-sm text-gray-200 sm:text-base">{hero.subtitle}</p>
//           <div className="mx-auto mt-8 flex max-w-md overflow-hidden rounded-md">
//             <input
//               type="text"
//               placeholder="Search for articles..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="w-full bg-white px-4 py-3 text-sm text-gray-700 outline-none"
//             />

//             <button
//               type="submit"
//               className="flex items-center justify-center bg-[#F0642C] px-5 text-white transition-colors hover:bg-[#d9551f]"
//             >
//               <Search size={18} />
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* Body */}
//       <main className="mx-auto max-w-7xl px-6 py-14">
//         <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_320px]">
//           {/* Left column */}
//           <div>
//             {/* Featured post */}
//             <h2 className="mb-5 text-2xl font-bold">
//               Featured <span className="text-[#F0642C]">Post</span>
//             </h2>
//             <div className="mb-12 grid grid-cols-1 gap-6 rounded-lg border border-gray-100 p-2 sm:grid-cols-[320px_1fr]">
//               <div className="relative h-56 w-full overflow-hidden rounded-md sm:h-full">
//                 <span className="absolute left-3 top-3 z-10 rounded bg-[#F0642C] px-2 py-1 text-[11px] font-semibold text-white">
//                   {blogs[0]?.category || "latest"}
//                 </span>
//                 <Image src={blogs[0]?.image} alt={'img'} fill className="object-cover" />
//               </div>
//               <div className="flex flex-col justify-center px-2 py-2">
//                 <div className="mb-2 flex items-center justify-between gap-4 text-xs">
//                   <span className="font-semibold text-[#F0642C]">{blogs[0]?.category || "latest"}</span>
//                   <span className="flex items-center gap-1 text-gray-400">
//                     <Calendar size={12} /> {blogs[0]?.publishedDate?.split('T')[0] || "2026-07-07"}
//                   </span>
//                 </div>
//                 <h3 className="mb-3 text-xl font-bold leading-snug text-[#1f2430]">{blogs[0]?.title || "latest"}</h3>
//                 <p className="mb-4 text-sm leading-relaxed text-gray-500">{blogs[0]?.excerpt}</p>
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-2">
//                     <div className="relative text-center overflow-hidden rounded-full">
//                       {/* <Image src={featuredPost.authorImg} alt={blogs[0]?.author} fill className="object-cover" /> */}
//                       <UserCircle />
//                     </div>
//                     <div className="text-xs">
//                       <p className="font-semibold text-[#1f2430]">By {blogs[0]?.author}</p>
//                       {/* <p className="text-gray-400">{featuredPost.readTime}</p> */}
//                     </div>
//                   </div>
//                   <button className="flex items-center gap-2 rounded-md bg-[#F0642C] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#d9551f]">
//                     Read More <ArrowRight size={14} />
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* Latest blogs */}
//             <h2 className="mb-5 text-2xl font-bold">
//               Latest <span className="text-[#F0642C]">Blogs</span>
//             </h2>
//             <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
//               {blogs.map((post) => (
//                 <article key={post.title} className="group cursor-pointer">
//                   <div className="relative mb-3 h-40 w-full overflow-hidden rounded-md">
//                     <span className="absolute left-2 top-2 z-10 rounded bg-[#F0642C] px-2 py-0.5 text-[10px] font-semibold text-white">
//                       {post?.category}
//                     </span>
//                     <Image
//                       src={post.image}
//                       alt={post.title}
//                       fill
//                       className="object-cover transition-transform duration-300 group-hover:scale-105"
//                     />
//                   </div>
//                   <h3 className="mb-2 text-[15px] font-bold leading-snug text-[#1f2430] group-hover:text-[#F0642C]">
//                     {post.title}
//                   </h3>
//                   <p className="mb-3 text-[13px] leading-relaxed text-gray-500">{post.excerpt}</p>
//                   <div className="flex items-center gap-4 text-[11px] text-gray-400">
//                     <span className="flex items-center gap-1">
//                       <Calendar size={11} /> {post?.publishedDate?.split('T')[0]}
//                     </span>
//                     {/* <span className="flex items-center gap-1">
//                       <Clock size={11} /> {post.read || '8'}
//                     </span> */}
//                   </div>
//                 </article>
//               ))}
//             </div>

//             {/* Pagination */}
//             <div className="mt-12 flex items-center justify-center gap-2">
//               <button className="flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 text-gray-400 hover:bg-gray-50">
//                 <ChevronLeft size={16} />
//               </button>
//               {pagination.map((n) => (
//                 <button
//                   key={n}
//                   className={`flex h-9 w-9 items-center justify-center rounded-md text-sm font-medium ${
//                     n === "1"
//                       ? "bg-[#F0642C] text-white"
//                       : "border border-gray-200 text-gray-500 hover:bg-gray-50"
//                   }`}
//                 >
//                   {n}
//                 </button>
//               ))}
//               <button className="flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 text-gray-400 hover:bg-gray-50">
//                 <ChevronRight size={16} />
//               </button>
//             </div>
//           </div>

//           {/* Sidebar */}
//           <aside className="space-y-6">
           
//            <div className="flex justify-center lg:justify-end">

//               <div className="p-2 rounded-xl md:rounded-md w-full max-w-md bg-[#fff]">
//                 <h3 className="text-center text-lg md:text-xl font-semibold mb-6 md:mb-8">
//                   Speak to an Expert
//                 </h3>
//                 <form className="space-y-3 md:space-y-4">
//                   <input
//                     type="text"
//                     placeholder="Name"
//                     className="w-full border border-gray-300 rounded-md px-4 py-2.5 md:py-3 outline-none focus:border-[#F86C43] text-sm"
//                   />
//                   <div className="flex">
//                     <div className="w-20 md:w-24 border border-gray-300 rounded-l-md flex items-center justify-center gap-1 md:gap-2 bg-white text-sm">
//                       🇮🇳 +91
//                     </div>
//                     <input
//                       type="tel"
//                       placeholder="Mobile Number"
//                       className="flex-1 border border-l-0 border-gray-300 rounded-r-md px-4 py-2.5 md:py-3 outline-none focus:border-[#F86C43] text-sm"
//                     />
//                   </div>
//                   <input
//                     type="email"
//                     placeholder="Email Id"
//                     className="w-full border border-gray-300 rounded-md px-4 py-2.5 md:py-3 outline-none focus:border-[#F86C43] text-sm"
//                   />
//                   <select className="w-full border border-gray-300 rounded-md px-4 py-2.5 md:py-3 outline-none focus:border-[#F86C43] bg-white text-sm">
//                     <option>Interested in?</option>
//                     <option>GRE</option>
//                     <option>IELTS</option>
//                     <option>GMAT</option>
//                     <option>TOEFL</option>
//                   </select>
//                   <input
//                     type="text"
//                     placeholder="City Name"
//                     className="w-full border border-gray-300 rounded-md px-4 py-2.5 md:py-3 outline-none focus:border-[#F86C43] text-sm"
//                   />
                  
                  
                  
//                   <label className="flex items-center gap-2 text-xs text-gray-600">
//                     <input type="checkbox" defaultChecked className="accent-[#F86C43]" />
//                     Stay informed via SMS & WhatsApp
//                   </label>
//                   <button
//                     type="submit"
//                     className="w-full bg-[#F86C43] hover:bg-[#ef5a2f] transition text-white font-semibold py-2.5 md:py-3 rounded-md text-sm md:text-base"
//                   >
//                     Schedule a Call
//                   </button>
//                 </form>
//               </div>
//             </div>

//             {/* Categories */}
//             <div className="bg-[#FDF9F8] rounded p-4 max-h-[18rem] overflow-auto">
//               <h3 className="mb-4 text-lg font-bold">Categories</h3>
//               <ul className="space-y-3 text-sm">
//                 {categories.map((c) => (
//                   <li key={c.name} className="flex items-center justify-between text-gray-600">
//                     <a href="#" className="hover:text-[#F0642C]">{c.name}</a>
//                     <span className="text-gray-400">{c.count}</span>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* Popular posts */}
//             <div>
//               <h3 className="mb-4 text-lg font-bold">Popular Posts</h3>
//               <ul className="space-y-4">
//                 {blogs.map((p) => (
//                   <li key={p.title} className="flex gap-3">
//                     <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-md">
//                       <Image src={p.image} alt={p.title} fill className="object-cover" />
//                     </div>
//                     <div>
//                       <p className="text-sm font-semibold leading-snug text-[#1f2430] hover:text-[#F0642C]">
//                         {p.title}
//                       </p>
//                       <p className="mt-1 flex items-center gap-1 text-[11px] text-gray-400">
//                         <Calendar size={10} /> {p?.publishedDate?.split('T')[0]}
//                       </p>
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* Stay updated card */}
//             <div className="rounded-lg bg-[#FBEAE2] p-6">
//               <Send className="mb-4 text-[#F0642C]" size={28} />
//               <h4 className="mb-1 text-lg font-bold text-[#1f2430]">{stayUpdatedCard.title}</h4>
//               <p className="mb-4 text-sm text-gray-500">{stayUpdatedCard.text}</p>
//               <button className="flex items-center gap-2 rounded-md bg-[#F0642C] px-4 py-2 text-xs font-semibold text-white hover:bg-[#d9551f]">
//                 Subscribe Now <ArrowRight size={14} />
//               </button>
//             </div>
//           </aside>
//         </div>

//         {/* Newsletter banner */}
//         <div className="mt-16 flex flex-col items-center gap-8 rounded-lg bg-[#FBEAE2] p-8 sm:flex-row">
//           <div className="relative h-40 w-40 flex-shrink-0 overflow-hidden rounded-full">
//             <Image src={newsletterBanner.img} alt="Happy student" fill className="object-cover" />
//           </div>
//           <div className="flex-1 text-center sm:text-left">
//             <h3 className="mb-1 text-2xl font-bold text-[#1f2430]">{newsletterBanner.title}</h3>
//             <p className="text-sm text-gray-500">{newsletterBanner.text}</p>
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
//           {features.map((f) => {
//             const Icon = iconMap[f.icon];
//             return (
//               <div key={f.title} className="flex items-start gap-4">
//                 <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#FBEAE2] text-[#F0642C]">
//                   <Icon size={22} />
//                 </div>
//                 <div>
//                   <h4 className="mb-1 text-sm font-bold text-[#1f2430]">{f.title}</h4>
//                   <p className="text-xs leading-relaxed text-gray-500">{f.desc}</p>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </main>


//     </div>
//   );
// }





