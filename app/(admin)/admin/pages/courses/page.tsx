"use client";

import axiosInstance, { ImageBaseUrl } from "@/services/axiosInstance";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

interface Course {
  _id: string;
  title: string;
  slug: string;
  code: string;
  description: string;
  shortDescription?: string;
  categoryInfo?: {
    name?: string;
  };
  thumbnail?: {
    url?: string;
  };
  pricing?: {
    amount?: number;
    currency?: string;
    discount?: number;
    earlyBird?: unknown;
  };
  status?: string;
  level?: string;
  mode?: string;
  language?: string;
  featured?: boolean;
  isPurchased?: boolean;
  customTest?: number;
  instructorNames?: Array<{
    name?: string;
    fullName?: string;
  }>;
  tags?: string[];
  createdAt?: string;
  schedule?: {
    startDate?: string;
    endDate?: string;
  };
}

export default function Allcourses() {
  const [allCourses, setAllcourses] = useState<Course[]>([]);
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // UI only: search and filters are not connected to course data.
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [debouncing, setDebouncing] = useState(null);
  const [openForm,setOpenForm] = useState(false)


  useEffect(() => {
    let timer;
    if (search) {
       timer = setTimeout(() => {
        setDebouncing(search);
      }, 700);
    }

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        setError("");

        const params = new URLSearchParams();

        if (categoryFilter) {
          params.append("category", categoryFilter);
        }

        if (debouncing) {
          params.append("search", debouncing);
        }

        const res = await axiosInstance.get(`/courses?${params.toString()}`);
        const data = res.data?.data;

        setAllcourses(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch courses:", err);
        setError("Unable to load courses. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [categoryFilter, debouncing]);

  useEffect(() => {
    const fetchCategory = async () => {
      const res = await axiosInstance.get("/categories");
      setCategory(res.data.data);
    };
    fetchCategory();
  }, []);

  const formatPrice = (course: Course) => {
    const amount = course.pricing?.amount;

    if (amount == null) return "N/A";

    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: course.pricing?.currency || "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (date?: string) => {
    if (!date) return "—";

    const parsed = new Date(date);

    return Number.isNaN(parsed.getTime())
      ? "—"
      : parsed.toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });
  };

  const imageUrl = (url?: string) => {
    if (!url) return "";

    if (url.startsWith("http://") || url.startsWith("https://")) {
      return url;
    }

    return `https://www.ooshasprep.com/uploads/${url.replace(/^\/+/, "")}`;
  };



  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1600px] space-y-6">
        {/* Course Table */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          {/* Search and Filter UI Only */}
          <div className="space-y-4 border-b border-gray-200 p-4 sm:p-5">
            <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
              <div>
                <h2 className="font-semibold text-gray-900">
                  Course Directory
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Showing all {allCourses.length} course records
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setCategoryFilter("all");
                  setStatusFilter("all");
                }}
                className="self-start rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-600 transition hover:border-[#f36d45] hover:text-[#f36d45]"
              >
                Clear Fields
              </button>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {/* Search Input */}
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.35-4.35" />
                  </svg>
                </span>

                <input
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search courses..."
                  className="h-11 w-full rounded-xl border border-gray-200 bg-white pl-10 pr-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#f36d45] focus:ring-2 focus:ring-orange-100"
                />
              </div>

              {/* Category Dropdown */}
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="h-11 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none focus:border-[#f36d45] focus:ring-2 focus:ring-orange-100"
              >
                <option value="all">All Categories</option>
                {category.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>

              {/* Decorative UI */}
              <div className="flex h-11 items-center justify-between rounded-xl border border-gray-200 bg-gray-50 px-3">
                <span className="text-sm text-gray-500">Available Records</span>
                <span className="font-semibold text-[#f36d45]">
                  {allCourses.length}
                </span>
              </div>
            </div>
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="space-y-4 p-6">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="h-16 animate-pulse rounded-xl bg-gray-100"
                />
              ))}
            </div>
          ) : error ? (
            <div className="p-12 text-center">
              <p className="font-medium text-red-600">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 rounded-lg bg-[#f36d45] px-4 py-2 text-sm font-semibold text-white hover:bg-[#e45d36]"
              >
                Retry
              </button>
            </div>
          ) : allCourses.length === 0 ? (
            <div className="p-12 text-center">
              <p className="font-semibold text-gray-800">
                No courses available
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Courses will appear here when available.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1150px] text-left text-sm">
                <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                  <tr>
                    <th className="px-5 py-4 font-semibold">Course</th>
                    <th className="px-5 py-4 font-semibold">Category</th>
          
                    <th className="px-5 py-4 font-semibold">Action</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {allCourses.map((course) => (
                    <tr
                      key={course._id}
                      className="align-top transition hover:bg-orange-50/30"
                    >
                      {/* Course Image and Title */}
                      <td className="px-5 py-5">
                        <div className="flex  gap-3">
                          <div className=" w-[138px]  overflow-hidden rounded-xl border border-gray-200 bg-gray-100">
                            {course.thumbnail?.url ? (
                              <img
                                src={`${ImageBaseUrl}/${course.thumbnail.url}`}
                                alt={course.title}
                                loading="lazy"
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <div className="flex h-full items-center justify-center text-xs text-gray-400">
                                No image
                              </div>
                            )}
                          </div>

                          <div className="min-w-0">
                            <p className="font-semibold text-gray-900">
                              {course.title}
                            </p>
                            <p className="mt-1 text-xs text-gray-500">
                              Code: {course.code || "—"}
                            </p>
                            <p className="mt-1 break-all text-xs text-gray-400">
                              ID: {course._id}
                            </p>

                            {course.featured && (
                              <span className="mt-2 inline-flex rounded-md bg-orange-50 px-2 py-1 text-xs font-semibold text-[#d95730]">
                                ★ Featured
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="px-5 py-5">
                        <span className="inline-flex rounded-lg bg-gray-100 px-3 py-1.5 font-medium text-gray-700">
                          {course.categoryInfo?.name || "Uncategorized"}
                        </span>
                        <p className="mt-2 text-xs text-gray-400">
                          {course.slug || "—"}
                        </p>
                      </td>

                   

                      {/* Status */}
                      <td className="px-5 py-5">
                       <button onClick={()=> setOpenForm(true)} className="bg-orange-500 px-4 py-2 rounded-full text-white cursor-pointer">
                        Edit
                       </button>
                      
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {!loading && !error && allCourses.length > 0 && (
            <div className="border-t border-gray-200 px-5 py-4 text-xs text-gray-500">
              Displaying all {allCourses.length} course records
            </div>
          )}
        </div>
      </div>
       {openForm&&(

      <SeoForm onClose={()=>setOpenForm(false)}/>
    )}
    </div>

  
  );
}




 export const SeoForm =({onClose})=> {
  const [formData, setFormData] = useState({
    pageTitle: "",
    type: "Preparation",
    metaDescription: "",
    metaKeywords: "",
    canonicalUrl: "",
    ogTitle: "",
    ogDescription: "",
    reference: "",
    isPublished: true,
    publishedAt: "",
    faqs: [{ question: "", answer: "" }],
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : type === "file"
            ? files?.[0] || null
            : value,
    }));
  };

  const handleFaqChange = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      faqs: prev.faqs.map((faq, i) =>
        i === index ? { ...faq, [field]: value } : faq
      ),
    }));
  };

  const addFaq = () => {
    setFormData((prev) => ({
      ...prev,
      faqs: [...prev.faqs, { question: "", answer: "" }],
    }));
  };

  const removeFaq = (index) => {
    setFormData((prev) => ({
      ...prev,
      faqs: prev.faqs.filter((_, i) => i !== index),
    }));
  };

  const inputClass =
    "w-full  rounded-xl border border-gray-200 bg-white px-4 py-3 text-base outline-none transition focus:border-[#f36d45] focus:ring-2 focus:ring-[#f36d45]/10";

  const labelClass = "mb-2 block text-sm font-medium text-gray-800";

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("SEO Form Data:", formData);
    // Connect your create/update API here.
  };

  return (
    
<div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-3 sm:p-5">
  <div className="relative flex max-h-[94vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">

    {/* Modal Header */}
    <div className="flex shrink-0 items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-7">
      <div>
        <h2 className="text-lg font-semibold tracking-tight text-slate-900">
          SEO Settings
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Manage page metadata, social previews and FAQs.
        </p>
      </div>

      <button
        type="button"
        onClick={onClose}
        aria-label="Close SEO form"
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
      >
        <X size={19} />
      </button>
    </div>

    {/* Scrollable Form */}
    <form
      onSubmit={handleSubmit}
      className="flex min-h-0 flex-1 flex-col overflow-hidden"
    >
      <div className="flex-1 space-y-6 overflow-y-auto p-5 sm:p-7">

        {/* SEO Metadata */}
        <section className="space-y-4">

          <div className="grid grid-cols-1 gap-x-5 gap-y-4 md:grid-cols-2">
            <div>
              <label className={labelClass}>Page Title (SEO)</label>
              <input
                name="pageTitle"
                value={formData.pageTitle}
                onChange={handleChange}
                className={inputClass}
                placeholder="Enter SEO page title"
              />
            </div>

            <div>
              <label className={labelClass}>Page Type</label>
              <input
                name="type"
                value={formData.type}
                onChange={handleChange}
                className={inputClass}
                placeholder="Preparation"
              />
            </div>

            <div className="md:col-span-2">
              <label className={labelClass}>Meta Description</label>
              <textarea
                name="metaDescription"
                value={formData.metaDescription}
                onChange={handleChange}
                rows={3}
                className={inputClass}
                placeholder="Write a concise description for search results"
              />
              <p className="mt-1.5 text-right text-xs text-slate-400">
                {formData.metaDescription.length} characters
              </p>
            </div>

            <div className="md:col-span-2">
              <label className={labelClass}>Meta Keywords</label>
              <input
                name="metaKeywords"
                value={formData.metaKeywords}
                onChange={handleChange}
                className={inputClass}
                placeholder="Keyword 1, keyword 2, keyword 3"
              />
            </div>

            <div className="md:col-span-2">
              <label className={labelClass}>Canonical URL / Slug</label>
              <input
                name="canonicalUrl"
                value={formData.canonicalUrl}
                onChange={handleChange}
                className={inputClass}
                placeholder="duolingo-coaching-in-bangalore"
              />
              <p className="mt-1.5 text-xs text-slate-500">
                Enter the canonical path or slug expected by your backend.
              </p>
            </div>
          </div>
        </section>

        {/* Social Metadata */}
        <section className="space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-sm font-semibold text-slate-900">
              Social Sharing
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              Customize the preview displayed when your page is shared.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-x-5 gap-y-4 md:grid-cols-2">
            <div>
              <label className={labelClass}>OG Title</label>
              <input
                name="ogTitle"
                value={formData.ogTitle}
                onChange={handleChange}
                className={inputClass}
                placeholder="Enter Open Graph title"
              />
            </div>

            <div>
              <label className={labelClass}>Reference</label>
              <input
                name="reference"
                value={formData.reference}
                onChange={handleChange}
                className={inputClass}
                placeholder="Reference URL or identifier"
              />
            </div>

            <div className="md:col-span-2">
              <label className={labelClass}>OG Description</label>
              <textarea
                name="ogDescription"
                value={formData.ogDescription}
                onChange={handleChange}
                rows={3}
                className={inputClass}
                placeholder="Enter social sharing description"
              />
            </div>

        
          </div>
        </section>

        {/* Publishing Settings */}
        <section className="space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-sm font-semibold text-slate-900">
              Publishing Settings
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              Control visibility and publication timing.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="flex min-h-12 items-center gap-3 rounded-lg border border-slate-200 px-4 py-3">
              <input
                type="checkbox"
                name="isPublished"
                checked={formData.isPublished}
                onChange={handleChange}
                className="h-4 w-4 accent-[#f36d45]"
              />
              <span className="text-sm font-medium text-slate-800">
                Published
              </span>
              <span
                className={`ml-auto rounded-full px-2.5 py-1 text-xs font-medium ${
                  formData.isPublished
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                {formData.isPublished ? "Live" : "Draft"}
              </span>
            </label>

            <div>
              <label className={labelClass}>Published At</label>
              <input
                type="datetime-local"
                name="publishedAt"
                value={formData.publishedAt}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </div>
        </section>

        {/* FAQ Management */}
        <section className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-sm font-semibold text-slate-900">
                Frequently Asked Questions
              </h3>
              <p className="mt-1 text-xs text-slate-500">
                Add questions and answers related to this page.
              </p>
            </div>

            <button
              type="button"
              onClick={addFaq}
              className="inline-flex items-center gap-2 rounded-lg border border-[#f36d45]/30 bg-orange-50 px-3.5 py-2 text-sm font-semibold text-[#e65d36] transition hover:bg-orange-100"
            >
              <span className="text-base">+</span>
              Add FAQ
            </button>
          </div>

          <div className="space-y-3">
            {formData.faqs.map((faq, index) => (
              <div
                key={index}
                className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 sm:p-5"
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-orange-100 text-xs font-semibold text-[#e65d36]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h4 className="text-sm font-semibold text-slate-800">
                      FAQ {index + 1}
                    </h4>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeFaq(index)}
                    disabled={formData.faqs.length === 1}
                    aria-label={`Remove FAQ ${index + 1}`}
                    className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    <X size={17} />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className={labelClass}>Question</label>
                    <input
                      value={faq.question}
                      onChange={(e) =>
                        handleFaqChange(index, "question", e.target.value)
                      }
                      className={inputClass}
                      placeholder="Enter frequently asked question"
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Answer</label>
                    <textarea
                      value={faq.answer}
                      onChange={(e) =>
                        handleFaqChange(index, "answer", e.target.value)
                      }
                      rows={3}
                      className={inputClass}
                      placeholder="Write a clear and helpful answer"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Sticky Footer */}
      <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-t border-slate-200 bg-white px-5 py-4 sm:px-7">
        <p className="text-xs text-slate-500">
          {formData.faqs.length} FAQ
          {formData.faqs.length === 1 ? "" : "s"} added
        </p>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="rounded-lg bg-[#f36d45] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#e65d36] focus:outline-none focus:ring-2 focus:ring-[#f36d45]/40 focus:ring-offset-2"
          >
            Save Changes
          </button>
        </div>
      </div>
    </form>
  </div>
</div>

  );
}

