
"use client";

import axiosInstance from "@/services/axiosInstance";
import { useEffect, useState } from "react";

interface TestSeriesItem {
  _id: string;
  title?: string;
  slug?: string;
  description?: string;
  category?: {
    _id?: string;
    name?: string;
  };
  exam?: {
    _id?: string;
    name?: string;
  };
  thumbnailPic?: string;
  finalPrice?: number;
  totalTests?: number;
  defaultTestType?: string;
  isPurchased?: boolean;
  createdAt?: string;
  pricing?: {
    isFree?: boolean;
    price?: number;
    salePrice?: number;
    currency?: string;
  };
}

export default function TestSeries() {
  const [testSeries, setTestSeries] = useState<TestSeriesItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // UI-only filters
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  useEffect(() => {
    const fetchTestSeries = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await axiosInstance.get("/mcu/series");
        const data = res.data?.data;

        setTestSeries(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch test series:", err);
        setError("Unable to load test series. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchTestSeries();
  }, []);

  const categories = [
    ...new Set(
      testSeries.map((item) => item.category?.name).filter(Boolean)
    ),
  ].sort();

  const formatPrice = (item: TestSeriesItem) => {
    if (item.pricing?.isFree) return "Free";

    const price =
      item.finalPrice ??
      item.pricing?.salePrice ??
      item.pricing?.price;

    if (price == null) return "—";

    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: item.pricing?.currency || "INR",
      maximumFractionDigits: 0,
    }).format(price);
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

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1500px] space-y-6">

      

        {/* Top filters — UI only */}
        <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
          <div className="mb-4">
            <h2 className="font-semibold text-gray-900">
              Search & Filters
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Find test series using the available filter controls.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search test series..."
              className="h-11 w-full rounded-xl border border-gray-200 px-4 text-sm outline-none transition focus:border-[#f36d45] focus:ring-2 focus:ring-orange-100"
            />

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="h-11 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none focus:border-[#f36d45]"
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="h-11 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none focus:border-[#f36d45]"
            >
              <option value="all">All Test Types</option>
              <option value="mixed">Mixed</option>
              <option value="sectional">Sectional</option>
              <option value="full-length">Full Length</option>
            </select>

            <button
              type="button"
              onClick={() => {
                setSearch("");
                setCategoryFilter("all");
                setTypeFilter("all");
              }}
              className="h-11 rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm font-medium text-gray-700 transition hover:border-[#f36d45] hover:bg-orange-50 hover:text-[#f36d45]"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="flex flex-col gap-1 border-b border-gray-200 p-4 sm:p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-semibold text-gray-900">
                All Test Series
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                {testSeries.length} series available
              </p>
            </div>
          </div>

          {loading ? (
            <div className="space-y-4 p-5">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="h-16 animate-pulse rounded-xl bg-gray-100"
                />
              ))}
            </div>
          ) : error ? (
            <div className="p-10 text-center">
              <p className="text-sm text-red-600">{error}</p>
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="mt-3 rounded-lg bg-[#f36d45] px-4 py-2 text-sm font-semibold text-white"
              >
                Retry
              </button>
            </div>
          ) : testSeries.length === 0 ? (
            <div className="p-10 text-center text-sm text-gray-500">
              No test series found.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1050px] text-left text-sm">
                <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                  <tr>
                    <th className="px-5 py-4 font-semibold">Test Series</th>
                    <th className="px-5 py-4 font-semibold">Category</th>
                    <th className="px-5 py-4 font-semibold">Price</th>
                    <th className="px-5 py-4 font-semibold">Total Tests</th>
                    <th className="px-5 py-4 font-semibold">Test Type</th>
                    <th className="px-5 py-4 font-semibold">Purchase</th>
                    <th className="px-5 py-4 font-semibold">Created</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {testSeries.map((item) => (
                    <tr
                      key={item._id}
                      className="align-top transition hover:bg-orange-50/30"
                    >
                      {/* Image and title */}
                      <td className="px-5 py-4">
                        <div className="flex min-w-[280px] gap-3">
                          <div className="h-[76px] w-[108px] shrink-0 overflow-hidden rounded-xl border border-gray-200 bg-gray-100">
                            {item.thumbnailPic ? (
                              <img
                                src={item.thumbnailPic}
                                alt={item.title || "Test series"}
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
                              {item.title || "Untitled"}
                            </p>

                            <p className="mt-1 text-xs text-gray-500">
                              Exam: {item.exam?.name || "—"}
                            </p>

                            <p className="mt-1 break-all text-xs text-gray-400">
                              ID: {item._id}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="px-5 py-4">
                        <span className="inline-flex rounded-lg bg-orange-50 px-3 py-1.5 font-medium text-[#c9522e]">
                          {item.category?.name || "Uncategorized"}
                        </span>

                        <p className="mt-2 text-xs text-gray-400">
                          {item.slug || "—"}
                        </p>
                      </td>

                      {/* Price */}
                      <td className="px-5 py-4">
                        <p className="font-bold text-gray-900">
                          {formatPrice(item)}
                        </p>

                        {item.pricing?.price != null &&
                          item.pricing.salePrice != null &&
                          item.pricing.price !== item.pricing.salePrice && (
                            <p className="mt-1 text-xs text-gray-400 line-through">
                              {new Intl.NumberFormat("en-IN", {
                                style: "currency",
                                currency: item.pricing.currency || "INR",
                                maximumFractionDigits: 0,
                              }).format(item.pricing.price)}
                            </p>
                          )}
                      </td>

                      {/* Total tests */}
                      <td className="px-5 py-4">
                        <span className="inline-flex min-w-10 items-center justify-center rounded-lg bg-gray-100 px-3 py-2 font-semibold text-gray-800">
                          {item.totalTests ?? 0}
                        </span>
                      </td>

                      {/* Type */}
                      <td className="px-5 py-4">
                        <span className="inline-flex rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold capitalize text-blue-700">
                          {(item.defaultTestType || "mixed").replace(
                            /-/g,
                            " "
                          )}
                        </span>
                      </td>

                      {/* Purchase */}
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex rounded-full px-3 py-1.5 text-xs font-semibold ${
                            item.isPurchased
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {item.isPurchased ? "Purchased" : "Not Purchased"}
                        </span>
                      </td>

                      {/* Date */}
                      <td className="px-5 py-4 text-gray-600">
                        {formatDate(item.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {!loading && !error && testSeries.length > 0 && (
            <div className="border-t border-gray-200 px-5 py-4 text-xs text-gray-500">
              Displaying all {testSeries.length} test series
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
