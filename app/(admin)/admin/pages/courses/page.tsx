
"use client";

import axiosInstance, { ImageBaseUrl } from "@/services/axiosInstance";
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // UI only: search and filters are not connected to course data.
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await axiosInstance.get("/courses");
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

  const categories = [
    ...new Set(
      allCourses.map((course) => course.categoryInfo?.name).filter(Boolean)
    ),
  ].sort();

  const statuses = [
    ...new Set(allCourses.map((course) => course.status).filter(Boolean)),
  ].sort();

  const statusClass = (status?: string) => {
    switch (status?.toLowerCase()) {
      case "upcoming":
        return "bg-blue-50 text-blue-700 ring-blue-200";
      case "published":
      case "active":
        return "bg-emerald-50 text-emerald-700 ring-emerald-200";
      case "draft":
        return "bg-gray-100 text-gray-700 ring-gray-200";
      case "inactive":
        return "bg-red-50 text-red-700 ring-red-200";
      default:
        return "bg-orange-50 text-orange-700 ring-orange-200";
    }
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
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>

              {/* Status Dropdown */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="h-11 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none focus:border-[#f36d45] focus:ring-2 focus:ring-orange-100"
              >
                <option value="all">All Statuses</option>
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>

              {/* Decorative UI */}
              <div className="flex h-11 items-center justify-between rounded-xl border border-gray-200 bg-gray-50 px-3">
                <span className="text-sm text-gray-500">
                  Available Records
                </span>
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
              <p className="font-semibold text-gray-800">No courses available</p>
              <p className="mt-1 text-sm text-gray-500">
                Courses will appear here when available.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1250px] text-left text-sm">
                <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                  <tr>
                    <th className="px-5 py-4 font-semibold">Course</th>
                    <th className="px-5 py-4 font-semibold">Category</th>
                    <th className="px-5 py-4 font-semibold">Pricing</th>
                    <th className="px-5 py-4 font-semibold">Status</th>
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
                        <div className="flex min-w-[270px] gap-3">
                          <div className="h-[76px] w-[108px] shrink-0 overflow-hidden rounded-xl border border-gray-200 bg-gray-100">
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

                      {/* Pricing */}
                      <td className="px-5 py-5">
                        <p className="font-bold text-gray-900">
                          {formatPrice(course)}
                        </p>
                        {course.pricing?.discount ? (
                          <p className="mt-1 text-xs text-emerald-700">
                            {course.pricing.discount}% discount
                          </p>
                        ) : null}
                        <p className="mt-1 text-xs text-gray-400">
                          {course.pricing?.earlyBird
                            ? "Early-bird pricing available"
                            : "Standard pricing"}
                        </p>
                      </td>

                      {/* Status */}
                      <td className="px-5 py-5">
                        <span
                          className={`inline-flex rounded-full px-3 py-1.5 text-xs font-semibold capitalize ring-1 ring-inset ${statusClass(
                            course.status
                          )}`}
                        >
                          {course.status || "Unknown"}
                        </span>
                        <p className="mt-3 text-xs text-gray-500">
                          {course.isPurchased ? "Purchased" : "Not purchased"}
                        </p>
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
    </div>
  );
}
