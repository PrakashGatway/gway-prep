"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { getBlogCategories } from "@/app/lib/blog-categories";
import { X } from "lucide-react";

export type ContactPage = {
  path: string;
  title: string;
  template: string;
};

const PHONE_NUMBER = "919166146538";
const EXAM_NAMES = ["IELTS", "TOEFL", "GRE", "GMAT", "SAT", "PTE", "Duolingo"];

function readable(value: string) {
  return value.replace(/[-_]+/g, " ").replace(/\s+/g, " ").trim();
}

function examFrom(...values: string[]) {
  const text = values.join(" ");
  return EXAM_NAMES.find((exam) => new RegExp(`\\b${exam}\\b`, "i").test(text));
}

function getContext(pathname: string, category: string, pages: ContactPage[]) {
  const segments = pathname.split("/").filter(Boolean);
  const page = pages.find((item) => item.path === pathname);
  const template = page?.template.toLowerCase() || "";
  const title = readable(page?.title || segments.at(-1) || "");
  const exam = examFrom(category, title, ...segments);

  if (segments[0] === "blog") {
    const subject = category || exam || "test preparation";
    return segments[1]
      ? {
          prompt: `Hi! Need help with ${subject} after reading this article? Chat with us now.`,
          message: `Hi, I am reading the ${subject} blog article "${readable(segments[1])}" and would like to know more.`,
        }
      : {
          prompt: `Hi! Looking for ${subject} guidance? Chat with us now.`,
          message: `Hi, I am browsing your ${subject} blog articles and would like some guidance.`,
        };
  }

  if (segments[0] === "guide" || template === "calculator" || template.includes("resource")) {
    const resource = title || "resources";
    const subject = exam && !examFrom(resource) ? `${exam} ${resource.toLowerCase()}` : resource;
    return {
      prompt: `Hi! Have a question about ${subject}? Chat with us now.`,
      message: `Hi, I am viewing the ${subject} resource page and would like some help.`,
    };
  }

  if (template === "preparation" || /test.prep|coaching/i.test(pathname)) {
    const subject = exam || title || "test preparation";
    return {
      prompt: `Hi! Preparing for ${subject}? Let's talk.`,
      message: `Hi, I am on your ${subject} test preparation page and would like to know more about coaching.`,
    };
  }

  if (template === "examdetails" || (segments.length > 1 && Boolean(examFrom(segments[0])))) {
    const subject = exam || readable(segments[0]);
    const detail = segments.length > 1 ? readable(segments.at(-1) || "") : "exam details";
    return {
      prompt: `Hi! Questions about ${subject} ${detail}? Chat with us.`,
      message: `Hi, I am viewing the ${subject} ${detail} page and would like more information.`,
    };
  }

  return {
    prompt: "Hi! Need help with your preparation? Connect with us now.",
    message: `Hi, I am visiting your ${title || "website"} page and would like to connect with your team.`,
  };
}

export default function FloatingWhatsApp({ pages = [] }: { pages?: ContactPage[] }) {
  const pathname = usePathname() || "/";
  const searchParams = useSearchParams();
  const filterCategory = searchParams.get("category") || "";
  const [blogCategory, setBlogCategory] = useState<{ slug: string; value: string } | null>(null);
  const [showGreeting, setShowGreeting] = useState(false);
  const blogSlug = pathname.startsWith("/blog/") ? pathname.split("/")[2] : "";

  useEffect(() => {
    if (!blogSlug) return;
    const controller = new AbortController();
    fetch(`/api/admin/blogs/${encodeURIComponent(blogSlug)}`, { signal: controller.signal })
      .then((response) => response.ok ? response.json() : null)
      .then((result) => {
        if (!result?.data) return;
        const value = getBlogCategories(result.data).join(", ");
        if (value) setBlogCategory({ slug: blogSlug, value });
      })
      .catch(() => {});
    return () => controller.abort();
  }, [blogSlug]);

  useEffect(() => {
    setShowGreeting(false);
    const showTimer = window.setTimeout(() => setShowGreeting(true), 900);
    const hideTimer = window.setTimeout(() => setShowGreeting(false), 10_900);
    return () => {
      window.clearTimeout(showTimer);
      window.clearTimeout(hideTimer);
    };
  }, [pathname, filterCategory]);

  const category = blogSlug && blogCategory?.slug === blogSlug
    ? blogCategory.value
    : filterCategory;
  const context = useMemo(
    () => getContext(pathname, category, pages),
    [pathname, category, pages],
  );
  const whatsappUrl = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(context.message)}`;

  return (
    <aside className="fixed bottom-5 right-5 z-[70] flex flex-col items-end gap-3 sm:bottom-7 sm:right-7" aria-label="WhatsApp support">
      {showGreeting && (
        <div className="relative max-w-[min(290px,calc(100vw-5rem))] rounded-2xl border border-emerald-100 bg-gray-100 px-4 py-3 pr-10 text-sm font-semibold leading-5 text-slate-800 shadow-[0_8px_30px_rgba(0,0,0,.46)]">
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="block hover:text-emerald-700">
            {context.prompt}
          </a>
          <button type="button" aria-label="Dismiss chat greeting" onClick={() => setShowGreeting(false)} className="absolute right-2 top-2 rounded-full p-1 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700">
            <X size={16} />
          </button>
        </div>
      )}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Ooshas Prep on WhatsApp"
        title="Chat with us on WhatsApp"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#00c853] text-white shadow-[0_8px_24px_rgba(0,0,0,.62)] transition duration-200 hover:-translate-y-1 hover:scale-105 hover:bg-[#00b94d] hover:shadow-[0_12px_30px_rgba(0,150,70,.34)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-600"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" className="h-8 w-8">
          <path d="M20.52 3.48A11.87 11.87 0 0 0 12.04 0C5.46 0 .1 5.35.1 11.94c0 2.1.55 4.16 1.6 5.98L0 24l6.23-1.64a11.9 11.9 0 0 0 5.8 1.48h.01c6.58 0 11.94-5.35 11.95-11.94a11.87 11.87 0 0 0-3.47-8.42ZM12.04 21.82a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.74.98 1-3.64-.24-.38a9.88 9.88 0 0 1-1.52-5.25c0-5.47 4.45-9.92 9.92-9.92a9.85 9.85 0 0 1 7.02 2.91 9.86 9.86 0 0 1 2.9 7.02c0 5.47-4.46 9.92-9.94 9.92Zm5.44-7.43c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.08a8.1 8.1 0 0 1-2.4-1.48A9 9 0 0 1 9.12 11c-.17-.3-.02-.46.13-.61.14-.13.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.67-1.62-.92-2.22-.24-.58-.48-.5-.67-.51h-.57c-.2 0-.52.07-.79.37s-1.04 1.02-1.04 2.49 1.07 2.89 1.22 3.09c.15.2 2.1 3.2 5.1 4.48.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35Z" />
        </svg>
      </a>
    </aside>
  );
}
