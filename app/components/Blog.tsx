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
} from "lucide-react";
// import data from "./data.json";

const data = {
 
  
  "hero": {
    "breadcrumb": ["Home", "Blogs"],
    "title": "Ooshas Prep Blog",
    "subtitle": "Stay updated with the latest exam tips, study guides, success stories and education insights from experts.",
    "bgImage": "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1600&auto=format&fit=crop"
  },
  "featuredPost": {
    "badge": "LATEST",
    "category": "Study Tips",
    "date": "May 10, 2024",
    "title": "How to Prepare for IELTS Exam: A Complete Guide for 2024",
    "excerpt": "Expert tips and strategies to help you achieve a high band score in IELTS. Learn about all sections, time management, and proven techniques.",
    "author": "Neha Khanna",
    "readTime": "8 min read",
    "img": "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=600&auto=format&fit=crop",
    "authorImg": "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=100&auto=format&fit=crop"
  },
  "latestBlogs": [
    {
      "tag": "GRE",
      "title": "GRE Preparation Tips for a High Score",
      "excerpt": "Effective strategies and study plan to crack GRE in the first attempt.",
      "date": "May 8, 2024",
      "read": "6 min read",
      "img": "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=500&auto=format&fit=crop"
    },
    {
      "tag": "TOEFL",
      "title": "TOEFL vs IELTS: Which Exam is Right for You?",
      "excerpt": "Detailed comparison to help you choose the right exam for your study abroad journey.",
      "date": "May 6, 2024",
      "read": "7 min read",
      "img": "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=500&auto=format&fit=crop"
    },
    {
      "tag": "SAT",
      "title": "SAT Exam Pattern and Syllabus 2024",
      "excerpt": "Everything you need to know about SAT exam pattern, syllabus, and scoring.",
      "date": "May 4, 2024",
      "read": "5 min read",
      "img": "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=500&auto=format&fit=crop"
    },
    {
      "tag": "Study Abroad",
      "title": "Top Scholarships for Indian Students in 2024",
      "excerpt": "Explore top scholarships and funding options to study in your dream university.",
      "date": "May 2, 2024",
      "read": "6 min read",
      "img": "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=500&auto=format&fit=crop"
    },
    {
      "tag": "Universities",
      "title": "Top Universities in USA For International Students",
      "excerpt": "Check out the list of top universities in USA and their admission requirements.",
      "date": "Apr 30, 2024",
      "read": "6 min read",
      "img": "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=500&auto=format&fit=crop"
    },
    {
      "tag": "PTE",
      "title": "PTE Exam: Complete Preparation Guide",
      "excerpt": "Step-by-step guide to prepare for PTE and achieve your desired score.",
      "date": "Apr 28, 2024",
      "read": "5 min read",
      "img": "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=500&auto=format&fit=crop"
    }
  ],
  "pagination": ["1", "2", "3", "4", "…", "10"],
  "categories": [
    { "name": "Study Tips", "count": 24 },
    { "name": "IELTS", "count": 18 },
    { "name": "TOEFL", "count": 16 },
    { "name": "GRE", "count": 14 },
    { "name": "SAT", "count": 12 },
    { "name": "PTE", "count": 10 },
    { "name": "Study Abroad", "count": 20 },
    { "name": "Scholarships", "count": 15 },
    { "name": "Universities", "count": 17 },
    { "name": "Career Guide", "count": 9 }
  ],
  "popularPosts": [
    {
      "title": "How to Write Perfect SOP for Universities",
      "date": "May 9, 2024",
      "img": "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=200&auto=format&fit=crop"
    },
    {
      "title": "Common IELTS Speaking Mistakes to Avoid",
      "date": "May 7, 2024",
      "img": "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=200&auto=format&fit=crop"
    },
    {
      "title": "Study Abroad Checklist: All You Need to Know",
      "date": "May 5, 2024",
      "img": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=200&auto=format&fit=crop"
    },
    {
      "title": "GMAT vs GRE: Which One Should You Choose?",
      "date": "May 3, 2024",
      "img": "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=200&auto=format&fit=crop"
    },
    {
      "title": "How to Get Admission in Top Universities in UK",
      "date": "Apr 29, 2024",
      "img": "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=200&auto=format&fit=crop"
    }
  ],
  "stayUpdatedCard": {
    "title": "Stay Updated!",
    "text": "Subscribe to our newsletter and never miss an update."
  },
  "newsletterBanner": {
    "title": "Get the Latest Updates in Your Inbox",
    "text": "Study tips, exam updates, success stories and more.",
    "img": "https://images.unsplash.com/photo-1494790108377-be9c29b531c8?q=80&w=300&auto=format&fit=crop"
  },
  "features": [
    { "icon": "FileText", "title": "Expert Insights", "desc": "Learn from industry experts and top educators" },
    { "icon": "BookOpen", "title": "Updated Content", "desc": "Get the latest exam patterns and study strategies" },
    { "icon": "Users", "title": "Student Success", "desc": "Real stories from students who achieved their dreams" },
    { "icon": "Globe", "title": "Global Education", "desc": "Insights on studying abroad and top universities" }
  ],
  
}

const iconMap = { FileText, BookOpen, Users, Globe };
const socialIconMap = { Facebook, Instagram, Linkedin, Youtube };

export default function BlogPage() {
  const {
    
    hero,
    featuredPost,
    latestBlogs,
    pagination,
    categories,
    popularPosts,
    stayUpdatedCard,
    newsletterBanner,
    features,
    
  } = data;

  return (
    <div className="min-h-screen bg-white  text-[#1f2430]">
     
     

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image src={hero.bgImage} alt="Students studying together" fill priority className="object-cover" />
          <div className="absolute inset-0 bg-[#2a1a12]/70" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 py-20 text-center text-white">
          <div className="mb-4 text-xs text-gray-200">
            {hero.breadcrumb.map((crumb, i) => (
              <span key={crumb}>
                {crumb}
                {i < hero.breadcrumb.length - 1 && <span className="mx-1">›</span>}
              </span>
            ))}
          </div>
          <h1 className="text-4xl font-extrabold sm:text-5xl">{hero.title}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-gray-200 sm:text-base">{hero.subtitle}</p>
          <form className="mx-auto mt-8 flex max-w-md overflow-hidden rounded-md">
            <input
              type="text"
              placeholder="Search for articles..."
              className="w-full bg-white px-4 py-3 text-sm text-gray-700 outline-none"
            />
            <button
              type="submit"
              className="flex items-center justify-center bg-[#F0642C] px-5 text-white transition-colors hover:bg-[#d9551f]"
            >
              <Search size={18} />
            </button>
          </form>
        </div>
      </section>

      {/* Body */}
      <main className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_320px]">
          {/* Left column */}
          <div>
            {/* Featured post */}
            <h2 className="mb-5 text-2xl font-bold">
              Featured <span className="text-[#F0642C]">Post</span>
            </h2>
            <div className="mb-12 grid grid-cols-1 gap-6 rounded-lg border border-gray-100 p-2 sm:grid-cols-[320px_1fr]">
              <div className="relative h-56 w-full overflow-hidden rounded-md sm:h-full">
                <span className="absolute left-3 top-3 z-10 rounded bg-[#F0642C] px-2 py-1 text-[11px] font-semibold text-white">
                  {featuredPost.badge}
                </span>
                <Image src={featuredPost.img} alt={featuredPost.title} fill className="object-cover" />
              </div>
              <div className="flex flex-col justify-center px-2 py-2">
                <div className="mb-2 flex items-center gap-4 text-xs">
                  <span className="font-semibold text-[#F0642C]">{featuredPost.category}</span>
                  <span className="flex items-center gap-1 text-gray-400">
                    <Calendar size={12} /> {featuredPost.date}
                  </span>
                </div>
                <h3 className="mb-3 text-xl font-bold leading-snug text-[#1f2430]">{featuredPost.title}</h3>
                <p className="mb-4 text-sm leading-relaxed text-gray-500">{featuredPost.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="relative h-8 w-8 overflow-hidden rounded-full">
                      <Image src={featuredPost.authorImg} alt={featuredPost.author} fill className="object-cover" />
                    </div>
                    <div className="text-xs">
                      <p className="font-semibold text-[#1f2430]">By {featuredPost.author}</p>
                      <p className="text-gray-400">{featuredPost.readTime}</p>
                    </div>
                  </div>
                  <button className="flex items-center gap-2 rounded-md bg-[#F0642C] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#d9551f]">
                    Read More <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>

            {/* Latest blogs */}
            <h2 className="mb-5 text-2xl font-bold">
              Latest <span className="text-[#F0642C]">Blogs</span>
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {latestBlogs.map((post) => (
                <article key={post.title} className="group cursor-pointer">
                  <div className="relative mb-3 h-40 w-full overflow-hidden rounded-md">
                    <span className="absolute left-2 top-2 z-10 rounded bg-[#F0642C] px-2 py-0.5 text-[10px] font-semibold text-white">
                      {post.tag}
                    </span>
                    <Image
                      src={post.img}
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
                      <Calendar size={11} /> {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={11} /> {post.read}
                    </span>
                  </div>
                </article>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-12 flex items-center justify-center gap-2">
              <button className="flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 text-gray-400 hover:bg-gray-50">
                <ChevronLeft size={16} />
              </button>
              {pagination.map((n) => (
                <button
                  key={n}
                  className={`flex h-9 w-9 items-center justify-center rounded-md text-sm font-medium ${
                    n === "1"
                      ? "bg-[#F0642C] text-white"
                      : "border border-gray-200 text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  {n}
                </button>
              ))}
              <button className="flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 text-gray-400 hover:bg-gray-50">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-8">
            {/* Search */}
            <form className="flex overflow-hidden rounded-md border border-gray-200">
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full px-4 py-3 text-sm text-gray-600 outline-none"
              />
              <button
                type="submit"
                className="flex items-center justify-center bg-[#F0642C] px-4 text-white hover:bg-[#d9551f]"
              >
                <Search size={16} />
              </button>
            </form>

            {/* Categories */}
            <div>
              <h3 className="mb-4 text-lg font-bold">Categories</h3>
              <ul className="space-y-3 text-sm">
                {categories.map((c) => (
                  <li key={c.name} className="flex items-center justify-between text-gray-600">
                    <a href="#" className="hover:text-[#F0642C]">{c.name}</a>
                    <span className="text-gray-400">{c.count}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Popular posts */}
            <div>
              <h3 className="mb-4 text-lg font-bold">Popular Posts</h3>
              <ul className="space-y-4">
                {popularPosts.map((p) => (
                  <li key={p.title} className="flex gap-3">
                    <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-md">
                      <Image src={p.img} alt={p.title} fill className="object-cover" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold leading-snug text-[#1f2430] hover:text-[#F0642C]">
                        {p.title}
                      </p>
                      <p className="mt-1 flex items-center gap-1 text-[11px] text-gray-400">
                        <Calendar size={10} /> {p.date}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Stay updated card */}
            <div className="rounded-lg bg-[#FBEAE2] p-6">
              <Send className="mb-4 text-[#F0642C]" size={28} />
              <h4 className="mb-1 text-lg font-bold text-[#1f2430]">{stayUpdatedCard.title}</h4>
              <p className="mb-4 text-sm text-gray-500">{stayUpdatedCard.text}</p>
              <button className="flex items-center gap-2 rounded-md bg-[#F0642C] px-4 py-2 text-xs font-semibold text-white hover:bg-[#d9551f]">
                Subscribe Now <ArrowRight size={14} />
              </button>
            </div>
          </aside>
        </div>

        {/* Newsletter banner */}
        <div className="mt-16 flex flex-col items-center gap-8 rounded-lg bg-[#FBEAE2] p-8 sm:flex-row">
          <div className="relative h-40 w-40 flex-shrink-0 overflow-hidden rounded-full">
            <Image src={newsletterBanner.img} alt="Happy student" fill className="object-cover" />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h3 className="mb-1 text-2xl font-bold text-[#1f2430]">{newsletterBanner.title}</h3>
            <p className="text-sm text-gray-500">{newsletterBanner.text}</p>
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
          {features.map((f) => {
            const Icon = iconMap[f.icon];
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







// "use client";
// import { Search } from "lucide-react";
// import Link from "next/link";
// import { useState, useEffect } from "react";
// import { BlogSlider } from "./blog-slider";
// import { Consultants } from "./destinations-consultants";
// import axiosInstance from "../lib/axios";



// const defaultBlogs = [
//   {
//     id: 1,
//     title: "Day 1 CPT Programs in the USA: Work & Study from Day One",
//     slug: "day-1-cpt-programs-usa",
//     details: "Japan doubles its citizenship residency requirement to 10 years in 2026. Discover what it means for immigrants, students and skilled professionals.",
//     date: "22 Apr 2025",
//     image: "/image/blog-img.jpg",
//   },
//   {
//     id: 2,
//     title: "Essential Barcode & Appointment Matching Guide for F1 U.S. Visa Applicants",
//     slug: "day-1-cpt-programs-usa",
//     details: "Japan doubles its citizenship residency requirement to 10 years in 2026. Discover what it means for immigrants, students and skilled professionals.",
//     date: "22 Apr 2025",
//     image: "/image/blog-img.jpg",
//   },
//   {
//     id: 3,
//     title: "Expediting Your F-1 Student Visa: The Guide to Emergency Appointment",
//     slug: "day-1-cpt-programs-usa",
//     details: "Japan doubles its citizenship residency requirement to 10 years in 2026. Discover what it means for immigrants, students and skilled professionals.",
//     date: "22 Apr 2025",
//     image: "/image/blog-img.jpg",
//   },
//   {
//     id: 4,
//     title: "Day 1 CPT Programs in the USA: Work & Study from Day One",
//     details: "Japan doubles its citizenship residency requirement to 10 years in 2026. Discover what it means for immigrants, students and skilled professionals.",
//     slug: "day-1-cpt-programs-usa",
//     date: "22 Apr 2025",
//     image: "/image/blog-img.jpg",
//   },
//   {
//     id: 5,
//     title: "Essential Barcode & Appointment Matching Guide for F1 U.S. Visa Applicants",
//     details: "Japan doubles its citizenship residency requirement to 10 years in 2026. Discover what it means for immigrants, students and skilled professionals.",
//     slug: "day-1-cpt-programs-usa",
//     date: "22 Apr 2025",
//     image: "/image/blog-img.jpg",
//   },
//   {
//     id: 6,
//     title: "Expediting Your F-1 Student Visa: The Guide to Emergency Appointment",
//     details: "Japan doubles its citizenship residency requirement to 10 years in 2026. Discover what it means for immigrants, students and skilled professionals.",
//     slug: "day-1-cpt-programs-usa",
//     date: "22 Apr 2025",
//     image: "/image/blog-img.jpg",
//   },
// ];

// const formFields = [
//   { type: "text", label: "Name" },
//   { type: "text", label: "Location" },
//   { type: "tel", label: "Phone Number" },
//   { type: "email", label: "Email" },
//   { type: "text", label: "Course looking for" },
//   { type: "text", label: "Country looking for" },
//   { type: "text", label: "Enquiry Regarding" },
//   { type: "textarea", label: "Your Message" },
// ];

// const appInfoData = [
//   {
//     heading: "27M+ App Downloads",
//     content: "Join millions of learners worldwide",
//   },
//   {
//     heading: "4.8+ App Rating",
//     content: "Rated highly by our users.",
//   },
// ];

// export default function Blog({ pageInfo,categories }: { pageInfo: any, categories: any }) {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("ALL");
//   const [filteredBlogs, setFilteredBlogs] = useState<any>([]);

//   // Extract sections from pageInfo
//   const heroSection = pageInfo?.sections?.["Home-hero-section"]?.fields || {};
//   const recentSection = pageInfo?.sections?.["Resent-section"]?.fields || {};
//   const appInfoSection = pageInfo?.sections?.["AppInfo"]?.fields || {};
//   const seoMeta = pageInfo?.seoMeta || {};

//   // Get dynamic content with fallbacks
//   const heroTitle = heroSection.title || "BLOGS";
//   const heroSubtitle = heroSection.subtitle || "Ooshas prep";
//   const heroParagraph = heroSection.paragraph || "";
//   const heroImage = heroSection.heroImage || "/image/01.png";
//   const bgImage = heroSection.bgImage || "/image/03.jpeg";

//   // Get blogs from section data or use defaults
//   const blogs = recentSection.blogs || recentSection.items || [];
//   // const categories = recentSection.categories || defaultCategories;

//   // Get app info data
//   const appInfo = appInfoSection.items || appInfoData;
//   const appInfoTitle = appInfoSection.title || "All the Resources you need for the Complete Exam Prep";
//   const appInfoDescription = appInfoSection.description || "Achieve excellence with a platform designed for comprehensive preparation.";
//   const appImage = appInfoSection.image || "/image/02.png";
//   const aboutImage = appInfoSection.aboutImage || "/image/about.jpeg";

//   const allblogs  = async () => {
//     try {
//       const api = await axiosInstance('/admin/blogs?page=1&limit=10&search=');
//       console.log(api.data ,"api")
//     } catch (error) {
//       console.error(error);
//     }
//   }
  
//   // Filter blogs based on search and category
//   useEffect(() => {
//     let filtered = Array.isArray(blogs) ? [...blogs] : [];

//     if (searchQuery) {
//       filtered = filtered.filter(
//         (blog: any) =>
//           blog.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//           blog.details?.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     }

//     if (selectedCategory !== "ALL") {
//       filtered = filtered.filter(
//         (blog: any) =>
//           blog.category?.toUpperCase() === selectedCategory.toUpperCase()
//       );
//     }

//     setFilteredBlogs(filtered);
//   }, [searchQuery, selectedCategory, blogs]);

//   // Handle form submission
//   const handleFormSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     // Add your form submission logic here
//     console.log("Form submitted");
//   };

//   return (
//     <section>
//       {/* Hero Section */}
//     <div className="relative min-h-[80vh] lg:h-[80vh] bg-gray-200 overflow-hidden">
//       {/* Background Section */}
//       <div
//         className="h-[50vh] lg:h-[40vh] bg-cover bg-center bg-no-repeat md:rounded-[0_0_8rem_8rem]"
//         style={{ backgroundImage: `url('${bgImage}')` }}
//       >
//         <div className="flex px-6 lg:pl-40 justify-center lg:justify-start items-center h-full w-full bg-black/60 text-white md:rounded-[0_0_8rem_8rem]">
//           <span className="text-center lg:text-left">
//             {heroSubtitle && (
//               <h2 className="font-semibold text-xl md:text-2xl lg:text-3xl">
//                 {heroSubtitle}
//               </h2>
//             )}
//             <h1 className="font-extrabold text-4xl md:text-6xl lg:text-8xl">
//               {heroTitle}
//             </h1>
//             {heroParagraph && (
//               <p className="mt-4 text-base md:text-lg max-w-2xl mx-auto lg:mx-0">
//                 {heroParagraph}
//               </p>
//             )}
//           </span>
//         </div>
//       </div>

//       {/* Content Wrapper */}
//       <div className="flex flex-col lg:flex-row items-center lg:pl-40 px-6">
//         {/* Search Bar */}
//         <div className="z-10 -mt-5 lg:mt-4 lg:max-w-[40rem] flex items-center justify-center border-2 border-black gap-2 bg-white rounded-full w-full h-14 lg:h-20 px-6 lg:px-10 text-gray-800 lg:text-xl shadow-lg">
//           <Search className="shrink-0" />
//           <input
//             type="text"
//             placeholder="What are you looking for?"
//             className="w-full outline-none bg-transparent"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//           <button
//             type="button"
//             className="font-semibold text-black hover:text-gray-600 transition-colors"
//             onClick={() => setSearchQuery(searchQuery)}
//           >
//             Search
//           </button>
//         </div>

//         {/* Hero Image */}
//         {heroImage && (
//           <img
//             src={heroImage}
//             alt="Hero"
//             className="mt-8 lg:mt-0 w-4/5 md:w-1/2 lg:w-auto lg:h-[30rem] lg:absolute top-10 right-14 object-contain"
//           />
//         )}
//       </div>
//     </div>


//       {/* Category Filter */}
//       {categories.length > 0 && (
//         <div className="max-w-7xl mx-auto mt-8 px-4">
//           <div className="flex flex-wrap gap-2 justify-center">
//             {categories.map((category: string, idx: number) => (
//               <button
//                 key={idx}
//                 onClick={() => setSelectedCategory(category)}
//                 className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
//                   selectedCategory === category
//                     ? "bg-orange-500 text-white"
//                     : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                 }`}
//               >
//                 {category.name}
//               </button>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Blog Posts and Enquiry Form */}
//       <div className="flex items-start flex-wrap md:flex-nowrap mt-14 gap-4 md:max-w-7xl mx-auto">
//         {/* Blog Posts List */}
//         <div className="flex flex-col flex-nowrap gap-4 p-2 flex-1">
//           {filteredBlogs.length > 0 ? (
//             filteredBlogs.map((ele: any, idx: number) => (
//               <div
//                 key={idx}
//                 className="flex items-center justify-between flex-wrap lg:flex-nowrap gap-4 p-4 rounded-xl bg-gray-100 hover:shadow-lg transition-all"
//               >
//                 <img
//                   src={ele.image || "/image/blog-img.jpg"}
//                   alt={ele.title}
//                   className="rounded-xl h-48 w-94 object-cover"
//                 />
//                 <ul className="space-y-2">
//                   <li className="text-sm text-gray-500">
//                     {ele.date || ele.publishedDate}
//                   </li>
//                   <li className="font-bold text-lg text-gray-800">
//                     <Link href={`/blog/${ele.slug || ele.id}`}>
//                       {ele.title}
//                     </Link>
//                   </li>
//                   <li className="text-gray-600 line-clamp-2">
//                     {ele.details || ele.excerpt}
//                   </li>
//                   <li>
//                     <Link
//                       href={`/blog/${ele.slug || ele.id}`}
//                       className="inline-block bg-orange-500 rounded-full px-4 py-2 text-white font-semibold hover:bg-orange-600 transition-colors"
//                     >
//                       Read More
//                     </Link>
//                   </li>
//                 </ul>
//               </div>
//             ))
//           ) : (
//             <div className="text-center py-10">
//               <p className="text-gray-500 text-lg">No blogs found</p>
//             </div>
//           )}
//         </div>

//         {/* Enquiry Form */}
//         <form
//           onSubmit={handleFormSubmit}
//           className="md:w-1/3 bg-gray-100 rounded-xl m-2 p-4 space-y-4 sticky top-4"
//         >
//           <h1 className="font-bold my-4 text-lg">SEND AN ENQUIRY</h1>
//           {formFields.map((ele, idx) =>
//             ele.type === "textarea" ? (
//               <textarea
//                 key={idx}
//                 placeholder={ele.label}
//                 className="w-full border-2 bg-white border-gray-200 px-4 py-2 rounded-lg"
//                 rows={4}
//               />
//             ) : (
//               <input
//                 key={idx}
//                 type={ele.type}
//                 placeholder={ele.label}
//                 className="w-full border-2 bg-white border-gray-200 px-4 py-2 rounded-lg"
//               />
//             )
//           )}

//           <label htmlFor="check" className="text-sm text-gray-600 flex gap-2">
//             <input type="checkbox" name="check" id="check" className="mt-1" />
//             <span>
//               I agree and authorize the team to contact me over phone, email,
//               SMS & WhatsApp.
//             </span>
//           </label>
//           <button
//             type="submit"
//             className="w-full bg-orange-500 py-2 my-2 text-white rounded-xl text-center hover:bg-orange-600 transition-colors"
//           >
//             SEND
//           </button>
//         </form>
//       </div>

//       {/* Blog Slider */}
//       <div className="max-w-7xl mx-auto mt-10">
//         <BlogSlider blogs={blogs} />
//       </div>

//       {/* App Info Section */}
//       <div className="bg-black/80 text-white lg:relative mt-10">
//         <div className="flex justify-between items-center flex-wrap gap-4 md:max-w-7xl mx-auto px-4">
//           <div className="space-y-4 my-18 text-center md:text-left">
//             <h2 className="font-semibold text-xl md:text-2xl">
//               {appInfoTitle}
//             </h2>
//             <p className="text-sm text-gray-300">{appInfoDescription}</p>

//             <ul className="space-y-4">
//               {appInfo.map((ele: any, idx: number) => (
//                 <li
//                   key={idx}
//                   className="flex justify-center md:justify-start items-start gap-3"
//                 >
//                   <span className="text-orange-500 text-2xl">•</span>
//                   <div>
//                     <h3 className="font-semibold">{ele.heading}</h3>
//                     <p className="text-xs text-gray-300">{ele.content}</p>
//                   </div>
//                 </li>
//               ))}
//             </ul>

//             <div className="space-x-4 space-y-4">
//               <input
//                 type="text"
//                 placeholder="Your Mobile Number"
//                 className="bg-white text-black rounded-lg px-4 py-2"
//               />
//               <button
//                 type="button"
//                 className="bg-orange-500 text-white font-medium rounded-lg px-4 py-2 hover:bg-orange-600 transition-colors"
//               >
//                 Get App Link
//               </button>
//             </div>
//           </div>

//           {appImage && (
//             <img
//               src={appImage}
//               alt="App"
//               className="lg:absolute -top-30 right-30 md:h-[30rem]"
//             />
//           )}
//         </div>
//       </div>

//       {/* About Image Section */}
//       {aboutImage && (
//         <div className="my-20 max-w-7xl mx-auto px-4">
//           <img
//             src={aboutImage}
//             alt="About"
//             className="w-full rounded-xl shadow-lg"
//           />
//         </div>
//       )}

//       {/* Consultants Section */}
//       <Consultants />
//     </section>
//   );
// }