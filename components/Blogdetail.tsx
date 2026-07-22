// app/blog/[id]/page.tsx
"use client";

import { Calendar, Menu } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, FormEvent, useEffect, useRef } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  BookOpen,
  Send,
  CheckCircle,
} from "lucide-react";
import FormSection from "./formSection";

// Types
interface BlogData {
  _id?: string;
  title: string;
  content: string;
  image: string;
  category: string;
  author: string;
  publishedDate: string;
  excerpt?: string;
  slug?: string;
  tags?: string[];
}

interface BlogDetailPageProps {
  blog: {
    data: BlogData;
  } | null;
  loading: boolean;
  res: BlogData[];
}

// ─── Form Configuration ───
const FORM_CONFIG: any = {
  steps: [
    {
      step: 1,
      title: "",
      icon: User,
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
      icon: User,
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
      {/* <h3 className="text-center text-lg md:text-xl font-semibold mb-6 text-neutral-900">
        Speak to an Expert
      </h3> */}
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleHeadingClick = (heading: string) => {
    const element = document.getElementById(`heading-${heading}`);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    setIsOpen(false);
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
            onClick={() => handleHeadingClick(heading)}
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
}: BlogDetailPageProps) {
  const router = useRouter();
  const [headings, setHeadings] = useState<string[]>([]);
  const [activeHeading, setActiveHeading] = useState<string>("");
  const contentRef = useRef<HTMLDivElement>(null);

  // Extract headings from content and add IDs
  useEffect(() => {
    if (blog?.data?.content) {
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = blog.data.content;

      // Find all h2 tags and extract text
      const h2Elements = tempDiv.querySelectorAll("h2");
      const headingTexts: string[] = [];

      h2Elements.forEach((h2, index) => {
        const text = h2.textContent?.trim() || `Section ${index + 1}`;
        headingTexts.push(text);

        // Add ID to h2 for scrolling
        const id = `heading-${text}`;
        h2.id = id;
      });

      setHeadings(headingTexts);

      // Update content with new IDs
      if (contentRef.current) {
        contentRef.current.innerHTML = tempDiv.innerHTML;
      }
    }
  }, [blog]);

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

    // Observe all heading elements
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
                className="w-full h-full object-cover"
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
                  {data.author?.charAt(0)?.toUpperCase() || "A"}
                </div>
                <span className="font-medium text-neutral-700">
                  {data.author || "Anonymous"}
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

            {/* Table of Contents - Desktop */}
            {headings.length > 0 && (
              <div className="mb-8 ">
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
              className="blog-html prose prose-lg max-w-none text-neutral-700 leading-relaxed"
            />

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
