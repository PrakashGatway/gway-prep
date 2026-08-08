// app/blog/[id]/page.tsx
"use client";

import { Calendar, Menu, User as UserIcon, Mail, Phone, MapPin, BookOpen, Send, CheckCircle, Briefcase, GraduationCap, Award } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, FormEvent, useEffect, useRef, useLayoutEffect } from "react";

import axiosInstance from "@/app/lib/axios";
import axios from "axios";
import FormSection from "./formSection";

// Types
interface AuthorData {
  _id: string;
  name: string;
  subtitle: string;
  slug: string;
  shortBio: string;
  details: string;
  education: string;
  experience: string;
  image: string;
  linkedin: string;
  website: string;
  isActive: boolean;
  specializations: string[];
}

interface BlogData {
  _id?: string;
  title: string;
  content: string;
  image: string;
  category: string;
  author: string | AuthorData;
  publishedDate: string;
  excerpt?: string;
  slug?: string;
  tags?: string[];
  count?: number;
}

interface BlogDetailPageProps {
  blog: {
    data: BlogData;
  } | null;
  loading: boolean;
  res: BlogData[];
  slug: any;
}

// ─── Author Profile Component ───
const AuthorProfile = ({ author }: { author: AuthorData }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  if (!author) return null;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-6 mb-6">
      <div className="flex items-start gap-4">
        {/* Author Image */}
        <div className="flex-shrink-0">
          {author.image && author.image !== "oijoij" ? (
            <Image
              src={author.image}
              alt={author.name}
              width={80}
              height={80}
              className="rounded-full object-cover border-2 border-[#F0642C]"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-[#F0642C] to-[#F86C43] flex items-center justify-center text-white text-2xl font-bold">
              {author.name.charAt(0)}
            </div>
          )}
        </div>
        
        {/* Author Info */}
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-neutral-900">
            {author.name}
          </h3>
          <p className="text-sm text-[#F0642C] font-medium">
            {author.subtitle}
          </p>
          <p className="text-sm text-neutral-600 mt-1 line-clamp-2">
            {author.shortBio}
          </p>
          
          {/* Stats */}
          <div className="flex flex-wrap gap-3 mt-3">
            <div className="flex items-center gap-1 text-xs text-neutral-500">
              <Briefcase size={14} className="text-[#F0642C]" />
              <span>{author.experience}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-neutral-500">
              <GraduationCap size={14} className="text-[#F0642C]" />
              <span>{author.education}</span>
            </div>
          </div>
          
          {/* Social Links */}
          <div className="flex gap-3 mt-3">
            {author.linkedin && author.linkedin !== "oijoij" && (
              <a
                href={author.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-[#F0642C] transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            )}
            {author.website && author.website !== "oijoij" && (
              <a
                href={author.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-[#F0642C] transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" />
                </svg>
              </a>
            )}
          </div>
        </div>
        
        {/* Expand/Collapse Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex-shrink-0 text-[#F0642C] hover:text-[#E0552C] transition-colors"
        >
          {isExpanded ? "Show less" : "Show more"}
        </button>
      </div>
      
      {/* Expanded Details */}
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-neutral-100">
          <div 
            className="text-sm text-neutral-600 leading-relaxed prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: author.details }}
          />
          
          {/* Specializations */}
          {author.specializations && author.specializations.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-semibold text-neutral-700 mb-2">
                Specializations
              </h4>
              <div className="flex flex-wrap gap-2">
                {author.specializations.map((spec, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-[#F0642C]/10 text-[#F0642C] text-xs rounded-full font-medium"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// ─── Form Configuration ───
const FORM_CONFIG: any = {
  steps: [
    {
      step: 1,
      title: "",
      icon: UserIcon,
      fields: ["name", "mobile", "email", "interest", "city", "consent"],
      button: "submit",
    },
  ],
  fields: [
    {
      name: "name",
      label: "Name",
      type: "text",
      required: true,
      placeholder: "Name",
      step: 1,
      grid: "full",
      icon: UserIcon,
    },
    {
      name: "mobile",
      label: "Mobile Number",
      type: "tel",
      required: true,
      placeholder: "Mobile Number",
      step: 1,
      grid: "full",
      icon: Phone,
      pattern: "^[0-9]{10}$",
      countryCode: "+91",
    },
    {
      name: "email",
      label: "Email Id",
      type: "email",
      required: true,
      placeholder: "Email Id",
      step: 1,
      grid: "full",
      icon: Mail,
    },
    {
      name: "interest",
      label: "Interested in?",
      type: "select",
      required: true,
      step: 1,
      grid: "full",
      options: [
        { value: "", label: "Interested in?" },
        { value: "GRE", label: "GRE" },
        { value: "IELTS", label: "IELTS" },
        { value: "GMAT", label: "GMAT" },
        { value: "TOEFL", label: "TOEFL" },
        { value: "PET", label: "PET" },
        { value: "SAT", label: "SAT" }
      ],
    },
    {
      name: "city",
      label: "City Name",
      type: "text",
      required: false,
      placeholder: "City Name",
      step: 1,
      grid: "full",
      icon: MapPin,
    },
    {
      name: "consent",
      label: "Stay informed via SMS & WhatsApp",
      type: "checkbox",
      required: false,
      step: 1,
      grid: "full",
      defaultValue: true,
    },
  ],
  submit: {
    label: "Schedule a Call",
    icon: Send,
    variant: "primary",
    size: "large",
    position: "bottom",
    onSuccess: {
      message: "Thank you! We will contact you shortly.",
      redirect: "/thank-you",
    },
  },
};

const LeadForm = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-6">
      <FormSection FORM_CONFIG={FORM_CONFIG} />
    </div>
  );
};

// Blog Card Component
const BlogCard = ({
  post,
  onClick,
}: {
  post: BlogData;
  onClick: () => void;
}) => (
  <article className="group cursor-pointer" onClick={onClick}>
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
    <p className="mb-3 text-[13px] leading-relaxed text-gray-500">
      {post.excerpt}
    </p>
    <div className="flex items-center gap-4 text-[11px] text-gray-400">
      <span className="flex items-center gap-1">
        <Calendar size={11} />
        {post.publishedDate?.split("T")[0] || "2026-07-07"}
      </span>
    </div>
  </article>
);

const getHeadingId = (heading: string) => {
  return `heading-${heading}`;
};

// Table of Contents Component
const TableOfContents = ({
  headings,
  activeHeading,
  open,
}: {
  headings: string[];
  activeHeading: string;
  open?: any;
}) => {
  const [isOpen, setIsOpen] = useState(open || false);

  const scrollToHeading = (heading: string) => {
    const strategies = [
      () => {
        const id = `heading-${heading}`;
        return document.getElementById(id);
      },
      () => {
        const allH2 = document.querySelectorAll('.blog-html h2, article h2');
        for (const h2 of allH2) {
          if (h2.textContent?.trim() === heading.trim()) {
            return h2;
          }
        }
        return null;
      },
      () => {
        const allH2 = document.querySelectorAll('.blog-html h2, article h2');
        const headingLower = heading.toLowerCase().trim();
        for (const h2 of allH2) {
          if (h2.textContent?.toLowerCase().trim() === headingLower) {
            return h2;
          }
        }
        return null;
      },
      () => {
        const allH2 = document.querySelectorAll('.blog-html h2, article h2');
        const headingLower = heading.toLowerCase().trim();
        for (const h2 of allH2) {
          if (h2.textContent?.toLowerCase().trim().includes(headingLower)) {
            return h2;
          }
        }
        return null;
      }
    ];

    let foundElement = null;
    for (const strategy of strategies) {
      foundElement = strategy();
      if (foundElement) break;
    }

    if (foundElement) {
      foundElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      });
      
      setTimeout(() => {
        const headerOffset = 80;
        const elementPosition = foundElement!.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }, 100);
    }
    
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  };

  if (headings.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-6">
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-semibold text-neutral-900 flex items-center gap-2">
          <Menu size={20} className="text-[#F86C43]" />
          Table of Contents
        </h3>
        <span className="text-[#F86C43] text-sm">{isOpen ? "▼" : "▶"}</span>
      </div>

      <div
        className={`mt-4 space-y-2 transition-all duration-300 ${isOpen ? "block" : "hidden"}`}
      >
        {headings.map((heading, index) => (
          <button
            key={index}
            onClick={() => scrollToHeading(heading)}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all hover:bg-neutral-50 hover:text-[#F86C43] ${
              activeHeading === heading
                ? "bg-[#F86C43]/10 text-[#F86C43] font-medium border-l-2 border-[#F86C43]"
                : "text-neutral-600"
            }`}
          >
            {heading}
          </button>
        ))}
      </div>
    </div>
  );
};

// Main Component
export default function BlogDetailPage({
  blog,
  loading,
  res,
  slug
}: BlogDetailPageProps) {
  const router = useRouter();
  const [headings, setHeadings] = useState<string[]>([]);
  const [activeHeading, setActiveHeading] = useState<string>("");
  const [authorData, setAuthorData] = useState<AuthorData | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Fetch author data based on author name from blog
  useEffect(() => {
    const fetchAuthorData = async () => {
      if (blog?.data?.author) {
        try {
          // If author is a string (author name), fetch author by name
          if (typeof blog.data.author === 'string') {
            const response = await axiosInstance.get(`/authors/slug/${blog.data.author.toLowerCase().replace(/\s+/g, '-')}`);
            if (response.data) {
              setAuthorData(response.data);
            }
          } else {
            // If author is already an object
            setAuthorData(blog.data.author as AuthorData);
          }
        } catch (error) {
          console.error('Error fetching author data:', error);
        }
      }
    };

    fetchAuthorData();
  }, [blog]);

  // Extract headings from content and add IDs
  useLayoutEffect(() => {
    if (blog?.data?.content) {
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = blog.data.content;

      const h2Elements = tempDiv.querySelectorAll("h2");
      const headingTexts: string[] = [];

      h2Elements.forEach((h2, index) => {
        const text = h2.textContent?.trim() || `Section ${index + 1}`;
        headingTexts.push(text);
        const id = `heading-${text}`;
        h2.id = id;
      });

      setHeadings(headingTexts);

      if (contentRef.current) {
        contentRef.current.innerHTML = tempDiv.innerHTML;
      }
    }
  }, [blog]);

  const blogcount = async (currentCount: number, slug: string) => {
    try {
      const response = await axiosInstance.put(`/admin/blogs/${slug}`, {
        count: currentCount + 1
      });
      return response.data;
    } catch (error) {
      console.error('Error incrementing blog count:', error);
    }
  };

  useEffect(() => {
    if (!blog?.data?.slug) return;

    const timer = setTimeout(() => {
      const currentCount = blog?.data?.count || 1000;
      const blogSlug = blog?.data?.slug;
      blogcount(currentCount, blogSlug);
    }, 10 * 1000);

    return () => clearTimeout(timer);
  }, [blog?.data?.slug]);

  // Intersection Observer for active heading
  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            const heading = id.replace("heading-", "");
            setActiveHeading(heading);
          }
        });
      },
      {
        rootMargin: "-80px 0px -50% 0px",
        threshold: 0.1,
      },
    );

    headings.forEach((heading) => {
      const element = document.getElementById(`heading-${heading}`);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [headings]);

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F86C43]"></div>
      </div>
    );
  }

  // Not found state
  if (!blog) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen gap-4">
        <h2 className="text-2xl font-semibold text-neutral-700">
          Blog not found
        </h2>
        <button
          onClick={() => router.push("/blog")}
          className="text-[#F86C43] hover:underline"
        >
          Back to Blog
        </button>
      </div>
    );
  }

  const data = blog.data;

  return (
    <div className="bg-neutral-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Breadcrumb */}
        <nav className="text-sm text-neutral-500 mb-6">
          <span
            className="hover:text-[#F86C43] cursor-pointer transition-colors"
            onClick={() => router.push("/")}
          >
            Home
          </span>
          <span className="mx-2">/</span>
          <span
            className="hover:text-[#F86C43] cursor-pointer transition-colors"
            onClick={() => router.push("/blog")}
          >
            Blog
          </span>
          <span className="mx-2">/</span>
          <span className="text-neutral-800 font-medium">{data.category}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Blog Content */}
          <div className="lg:col-span-8">
            {/* Hero Image */}
            <div className="relative w-full h-64 md:h-108 rounded-2xl overflow-hidden mb-8 shadow-sm">
              <img
                src={data.image}
                alt={data.title}
                className="w-full h-full object-contain"
                loading="eager"
              />
            </div>

            {/* Title & Meta */}
            <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4 leading-tight">
              {data.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-500 mb-8 pb-8 border-b border-neutral-200">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-neutral-200 flex items-center justify-center text-xs font-bold text-neutral-600">
                  {typeof data.author === 'string' 
                    ? data.author.charAt(0)?.toUpperCase() 
                    : data.author?.name?.charAt(0)?.toUpperCase() || "A"}
                </div>
                <span className="font-medium text-neutral-700">
                  {typeof data.author === 'string' ? data.author : data.author?.name || "Anonymous"}
                </span>
              </div>
              <span>•</span>
              <span>
                {data.publishedDate
                  ? new Date(data.publishedDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "Date not available"}
              </span>
            </div>

            {/* Author Profile Section */}
            {authorData && <AuthorProfile author={authorData} />}

            {/* Table of Contents - Desktop */}
            {headings.length > 0 && (
              <div className="mb-8">
                <TableOfContents
                  headings={headings}
                  activeHeading={activeHeading}
                  open={true}
                />
              </div>
            )}

            {/* Blog Content */}
            <style>{`
              .blog-html table {
                width: 100%;
                border-collapse: collapse;
                margin: 20px 0;
                font-size: 15px;
                overflow-x: auto !important;
              }

              .blog-html table {
                width: 100%;
                table-layout: fixed;
                border-collapse: collapse;
              }

              .blog-html table td,
              .blog-html table th {
                width: 50%;
                padding: 12px;
                border: 1px solid #e5e7eb;
                word-break: break-word;
                vertical-align: top;
              }

              .blog-html th,
              .blog-html td {
                border: 1px solid #e5e7eb;
              }

              .blog-html th {
                background: #F46C44;
                text-align: center;
                color: white;
                font-weight: 600;
              }
              .blog-html tr {
                text-align: center;
              }
              .blog-html table * p {
                padding: 10px;
              }

              .blog-html tr:nth-child(even) {
                background-color: #f3ebeb;
              }
              .blog-html h2 {
                font-size: 26px;
                margin: 28px 0 12px;
                font-weight: 700;
                color: #00306a
              }

              .blog-html h2 * {
                font-size: 26px;
                margin: 28px 0 12px;
                font-weight: 700;
                color: #00306a
              }

              .blog-html h3 {
                font-size: 20px;
                margin: 22px 0 10px;
                font-weight: 600;
                color: #00306a
              }

              .blog-html h4 {
                font-size: 18px;
                margin: 18px 0 8px;
                font-weight: 600;
              }

              .blog-html * a {
                color: #240dbd;
              }

              .blog-html p {
                line-height: 1.8;
              }

              .blog-html ul {
                margin-left: 22px;
                list-style: disc;
              }

              .blog-html ol {
                margin-left: 22px;
                list-style: decimal;
              }

              .blog-html li {
                margin: 6px 0;
              }

              .blog-html figure.table {
                overflow-x: auto;
                margin: 20px 0;
              }

              .blog-html strong {
                font-weight: 600;
              }
              html {
                scroll-behavior: smooth;
              }
            `}</style>

            <article
              ref={contentRef}
              dangerouslySetInnerHTML={{ __html: blog.data.content }}
              className="blog-html prose prose-lg max-w-none text-neutral-700 leading-relaxed"
            />

            {/* Author Profile at Bottom */}
            {authorData && (
              <div className="mt-8 pt-8 border-t border-neutral-200">
                <AuthorProfile author={authorData} />
              </div>
            )}

            {/* Related Posts Section */}
            {res && res.length > 0 && (
              <div className="mt-12 pt-8 border-t border-neutral-200">
                <h2 className="text-2xl font-bold text-neutral-900 mb-6">
                  Related Posts
                </h2>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {res.map((post) => (
                    <BlogCard
                      key={post._id}
                      post={post}
                      onClick={() => router.push(`/blog/${post.slug}`)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-2">
              {/* Table of Contents - Desktop */}
              {headings.length > 0 && (
                <div className="hidden lg:block">
                  <TableOfContents
                    headings={headings}
                    activeHeading={activeHeading}
                  />
                </div>
              )}

              <LeadForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}