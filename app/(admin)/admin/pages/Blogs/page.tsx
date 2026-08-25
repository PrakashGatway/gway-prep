"use client";

import { getBlogs, deleteBlog } from "@/app/services/api";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import {
  Edit,
  Trash2,
  Plus,
  FileText,
  FolderOpen,
  Search,
  RotateCcw,
  Eye,
  BookOpen,
} from "lucide-react";

const Blog = () => {
  const router = useRouter();

  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");

  const fetchBlogs = async () => {
    try {
      setLoading(true);

      const res = await getBlogs();

      setBlogs(res?.data || []);
    } catch (err) {
      console.error("Error fetching blogs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (slug: string) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;

    try {
      await deleteBlog(slug);

      setBlogs((prev) => prev.filter((blog) => blog.slug !== slug));
    } catch (error) {
      console.error("Error deleting blog:", error);
      alert("Error deleting blog");
    }
  };

  const categories = useMemo(() => {
    return Array.from(
      new Set(
        blogs
          .map((blog) => blog.category)
          .filter(Boolean)
      )
    );
  }, [blogs]);

  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const searchValue = search.toLowerCase().trim();

      const matchesSearch =
        !searchValue ||
        blog.title?.toLowerCase().includes(searchValue) ||
        blog.description?.toLowerCase().includes(searchValue) ||
        blog.metaDescription?.toLowerCase().includes(searchValue) ||
        blog.slug?.toLowerCase().includes(searchValue);

      const matchesCategory =
        !category || blog.category === category;

      const matchesStatus =
        !status ||
        (status === "published" && blog.isPublished === true) ||
        (status === "draft" && blog.isPublished === false);

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [blogs, search, category, status]);

  const clearFilters = () => {
    setSearch("");
    setCategory("");
    setStatus("");
  };

  const formatDate = (date?: string) => {
    if (!date) return "-";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "-";
    }

    return parsedDate.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (date?: string) => {
    if (!date) return "";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "";
    }

    return parsedDate.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-[#f7f8fa] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1500px]">

        {/* ================= HEADER ================= */}
        <div className="mb-5 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-[30px] font-bold tracking-tight text-[#071b38] sm:text-[36px]">
              Support Blogs
            </h1>

            <p className="mt-1 text-[16px] text-[#687b95]">
              Manage and organize support Blogs for your users.
            </p>
          </div>

          <button
            onClick={() => router.push("/admin/pages/Blogs/add")}
            className="inline-flex h-[56px] items-center justify-center gap-3 rounded-[17px] bg-[#ff6900] px-7 text-[16px] font-semibold text-white shadow-sm transition hover:bg-[#ed5f00] active:scale-[0.98]"
          >
            <Plus size={21} strokeWidth={2.5} />
            Create Support Article
          </button>
        </div>

        {/* ================= TABS ================= */}
        <div className="mb-5 border-b border-[#dfe3e8]">
          <div className="flex gap-7">
            <button
              className="relative flex items-center gap-3 px-6 pb-4 pt-1 text-[16px] font-semibold text-[#ff6633]"
            >
              <FileText size={21} strokeWidth={2} />

              Support Blogs

              <span className="absolute bottom-0 left-0 h-[3px] w-full rounded-full bg-[#ff6633]" />
            </button>

            <button
              onClick={() =>
                router.push("/admin/pages/Blogs/category")
              }
              className="flex items-center gap-3 px-2 pb-4 pt-1 text-[16px] font-semibold text-[#718198] transition hover:text-[#ff6633]"
            >
              <FolderOpen size={21} strokeWidth={2} />

              Categories
            </button>
          </div>
        </div>

        {/* ================= FILTER BOX ================= */}
        <div className="mb-5 rounded-[20px] border border-[#e0e4e9] bg-white p-5 shadow-[0_2px_5px_rgba(0,0,0,0.05)] sm:p-6">
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.5fr_1fr_1fr_auto] lg:items-end">

            {/* Search */}
            <div>
              <label className="mb-2 block text-[14px] font-semibold text-[#253b58]">
                Search Blogs
              </label>

              <div className="relative">
                <Search
                  size={21}
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-[#94a3b8]"
                />

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by title, description..."
                  className="h-[55px] w-full rounded-[15px] border border-[#dfe4ea] bg-[#fafbfc] pl-12 pr-4 text-[16px] text-[#253b58] outline-none transition placeholder:text-[#9aa9bd] focus:border-[#ff7043] focus:ring-2 focus:ring-[#ff7043]/10"
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="mb-2 block text-[14px] font-semibold text-[#253b58]">
                Category
              </label>

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="h-[55px] w-full appearance-auto rounded-[15px] border border-[#dfe4ea] bg-[#fafbfc] px-4 text-[16px] text-[#253b58] outline-none transition focus:border-[#ff7043] focus:ring-2 focus:ring-[#ff7043]/10"
              >
                <option value="">Choose Category</option>

                {categories.map((item: any) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="mb-2 block text-[14px] font-semibold text-[#253b58]">
                Status
              </label>

              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="h-[55px] w-full appearance-auto rounded-[15px] border border-[#dfe4ea] bg-[#fafbfc] px-4 text-[16px] text-[#253b58] outline-none transition focus:border-[#ff7043] focus:ring-2 focus:ring-[#ff7043]/10"
              >
                <option value="">All Status</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>

            {/* Clear */}
            <button
              onClick={clearFilters}
              className="flex h-[55px] items-center justify-center gap-2 rounded-[15px] border border-[#dfe4ea] bg-white px-6 text-[16px] font-medium text-[#40536d] transition hover:border-[#ff7043] hover:text-[#ff7043]"
            >
              <RotateCcw size={18} />

              Clear Filters
            </button>
          </div>
        </div>

        {/* ================= TABLE ================= */}
        <div className="overflow-hidden rounded-[20px] border border-[#dfe4e8] bg-white shadow-[0_2px_5px_rgba(0,0,0,0.04)]">

          {loading ? (
            <div className="flex min-h-[300px] items-center justify-center">
              <div className="flex flex-col items-center gap-3">
                <div className="h-9 w-9 animate-spin rounded-full border-4 border-[#ff7043]/20 border-t-[#ff7043]" />
                <p className="text-sm text-[#718198]">
                  Loading Blogs...
                </p>
              </div>
            </div>
          ) : filteredBlogs.length === 0 ? (
            <div className="flex min-h-[300px] flex-col items-center justify-center px-5 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#fff2ec]">
                <BookOpen
                  size={28}
                  className="text-[#ff7043]"
                />
              </div>

              <h3 className="text-lg font-semibold text-[#172b4d]">
                No Blogs found
              </h3>

              <p className="mt-1 text-sm text-[#718198]">
                Try changing your search or filters.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1050px] border-collapse text-left">

                {/* TABLE HEADER */}
                <thead>
                  <tr className="bg-[#f96b45] text-white">
                    <th className="w-[75px] border-r border-white/30 px-5 py-5 text-[13px] font-bold">
                      #
                    </th>

                    <th className="min-w-[400px] border-r border-white/30 px-5 py-5 text-[13px] font-bold">
                      ARTICLE
                    </th>

                    <th className="w-[250px] border-r border-white/30 px-5 py-5 text-[13px] font-bold">
                      CATEGORY
                    </th>

                    <th className="w-[170px] border-r border-white/30 px-5 py-5 text-[13px] font-bold">
                      STATUS
                    </th>

                    <th className="w-[100px] border-r border-white/30 px-5 py-5 text-center text-[13px] font-bold">
                      VIEWS
                    </th>

                    <th className="w-[150px] border-r border-white/30 px-5 py-5 text-[13px] font-bold">
                      CREATED AT
                    </th>

                    <th className="w-[155px] px-5 py-5 text-[13px] font-bold">
                      ACTIONS
                    </th>
                  </tr>
                </thead>

                {/* TABLE BODY */}
                <tbody>
                  {filteredBlogs.map((blog, index) => (
                    <tr
                      key={blog._id || blog.slug}
                      className="border-b border-[#dfe3e7] transition hover:bg-[#fffaf7]"
                    >
                      {/* NUMBER */}
                      <td className="border-r border-[#dfe3e7] px-5 py-5 text-[15px] text-[#8291a5]">
                        {index + 1}
                      </td>

                      {/* ARTICLE */}
                      <td className="border-r border-[#dfe3e7] px-5 py-4">
                        <div className="flex items-center gap-4">

                          <div className="flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-[15px] bg-[#fff5ec]">
                            {blog.image ? (
                              <img
                                src={blog.image}
                                alt={blog.title || "Article"}
                                className="h-[50px] w-[50px] rounded-[15px] object-cover"
                              />
                            ) : (
                              <BookOpen
                                size={23}
                                className="text-[#ff6500]"
                              />
                            )}
                          </div>

                          <div className="min-w-0">
                            <h3 className="truncate text-[16px] font-bold text-[#102744]">
                              {blog.title || "Untitled Article"}
                            </h3>

                            <p className="mt-1 max-w-[500px] truncate text-[13px] text-[#91a0b4]">
                              {blog.metaDescription ||
                                blog.description ||
                                "No description available"}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* CATEGORY */}
                      <td className="border-r border-[#dfe3e7] px-5 py-5">
                        <span className="inline-flex rounded-[12px] bg-[#fff4ec] px-4 py-2 text-[13px] font-semibold text-[#ff5f00]">
                          {blog.category || "Uncategorized"}
                        </span>
                      </td>

                      {/* STATUS */}
                      <td className="border-r border-[#dfe3e7] px-5 py-5">
                        {blog.isPublished ? (
                          <span className="inline-flex items-center gap-2 rounded-[12px] bg-[#e9faf3] px-4 py-2 text-[13px] font-semibold text-[#09a66b]">
                            <span className="h-2 w-2 rounded-full bg-[#08b875]" />
                            Published
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-2 rounded-[12px] bg-[#fff6df] px-4 py-2 text-[13px] font-semibold text-[#c58a00]">
                            <span className="h-2 w-2 rounded-full bg-[#e1a600]" />
                            Draft
                          </span>
                        )}
                      </td>

                      {/* VIEWS */}
                      <td className="border-r border-[#dfe3e7] px-5 py-5 text-center">
                        <div className="flex items-center justify-center gap-2 text-[14px] text-[#40536d]">
                          <Eye
                            size={17}
                            className="text-[#8d9aae]"
                          />
                          {blog.count || 0}
                        </div>
                      </td>

                      {/* CREATED AT */}
                      <td className="border-r border-[#dfe3e7] px-5 py-4">
                        <div className="text-[14px] font-medium text-[#253b58]">
                          {formatDate(blog.createdAt)}
                        </div>

                        <div className="mt-1 text-[13px] text-[#91a0b4]">
                          {formatTime(blog.createdAt)}
                        </div>
                      </td>

                      {/* ACTIONS */}
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-center gap-3">

                          <button
                            onClick={() =>
                              router.push(
                                `/admin/pages/Blogs/add?slug=${blog.slug}`
                              )
                            }
                            title="Edit Article"
                            className="flex h-[45px] w-[45px] items-center justify-center rounded-[13px] border border-[#e1e5ea] bg-white text-[#718198] transition hover:border-[#8b98aa] hover:bg-[#f8fafc] hover:text-[#334155]"
                          >
                            <Edit size={19} />
                          </button>

                          <button
                            onClick={() =>
                              handleDelete(blog.slug)
                            }
                            title="Delete Article"
                            className="flex h-[45px] w-[45px] items-center justify-center rounded-[13px] border border-[#ffd5d5] bg-white text-[#ff6262] transition hover:bg-[#fff2f2] hover:text-[#ef4444]"
                          >
                            <Trash2 size={19} />
                          </button>

                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* ================= RESULT COUNT ================= */}
        {!loading && filteredBlogs.length > 0 && (
          <div className="mt-4 text-sm text-[#7c8da4]">
            Showing{" "}
            <span className="font-semibold text-[#253b58]">
              {filteredBlogs.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-[#253b58]">
              {blogs.length}
            </span>{" "}
            Blogs
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;





// "use client";

// import { getBlogs, deleteBlog } from "@/app/services/api";
// import { useRouter } from "next/navigation";
// import React, { useState, useEffect } from "react";
// import { Edit, Trash2 } from "lucide-react";
// import Image from "next/image";

// const Blog = () => {
//   const router = useRouter();
//   const [blogs, setBlogs] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   // ✅ FETCH BLOGS
//   const fetchBlogs = async () => {
//     try {
//       setLoading(true);
//       const res = await getBlogs();
//       setBlogs(res?.data || []);
//     } catch (err) {
//       console.error("Error fetching blogs:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchBlogs();
//   }, []);

//   // ✅ DELETE BLOG
//   const handleDelete = async (slug: string) => {
//     if (!confirm("Are you sure you want to delete this blog?")) return;
//     try {
//       await deleteBlog(slug);
//       setBlogs((prev) => prev.filter((blog) => blog.slug !== slug));
//     } catch (error) {
//       console.error("Error deleting blog:", error);
//       alert("Error deleting blog");
//     }
//   };

//   return (
//     <div className="p-6 min-h-screen bg-gray-100">
//       {/* HEADER */}
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">Blogs</h1>
//         <div className="space-x-3">
//           <button
//             onClick={() => router.push("/admin/pages/Blogs/category")}
//             className="bg-gray-800 text-white px-5 py-2.5 rounded-xl hover:bg-gray-700 transition"
//           >
//             Manage Categories
//           </button>
//           <button
//             onClick={() => router.push("/admin/pages/Blogs/add")}
//             className="bg-orange-600 text-white px-5 py-2.5 rounded-xl hover:bg-blue-700 transition "
//           >
//             + Create Blog
//           </button>
//         </div>
//       </div>

//       {/* LIST */}
//       <div className="bg-white rounded-2xl  border overflow-hidden">
//         {loading ? (
//           <div className="p-8 text-center text-gray-500">Loading blogs...</div>
//         ) : blogs.length === 0 ? (
//           <div className="p-8 text-center text-gray-500">
//             No blogs found. Create your first blog!
//           </div>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="w-full text-left border-collapse">
//               <thead>
//                 <tr className="bg-gray-50 border-b">
//                   <th className="p-4 font-semibold text-gray-600">Image</th>
//                   <th className="p-4 font-semibold text-gray-600">Title</th>
//                   <th className="p-4 font-semibold text-gray-600">Category</th>
//                   <th className="p-4 font-semibold text-gray-600">Status</th>
//                   <th className="p-4 font-semibold text-gray-600 text-center">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {blogs.map((blog) => (
//                   <tr key={blog._id} className="border-b hover:bg-gray-50 transition">
//                     <td className="p-4">
//                       {blog.image ? (
//                         <img
//                           src={blog.image}
//                           alt={blog.title}
//                           className="w-16 h-12 object-cover rounded-lg border"
//                         />
//                       ) : (
//                         <div className="w-16 h-12 bg-gray-200 rounded-lg flex items-center justify-center text-xs text-gray-500">
//                           No Img
//                         </div>
//                       )}
//                     </td>
//                     <td className="p-4 font-medium text-gray-800">{blog.title}</td>
//                     <td className="p-4 text-gray-600">{blog.category}</td>
//                     <td className="p-4">
//                       <span
//                         className={`px-3 py-1 rounded-full text-xs font-semibold ${
//                           blog.isPublished
//                             ? "bg-green-100 text-green-700"
//                             : "bg-yellow-100 text-yellow-700"
//                         }`}
//                       >
//                         {blog.isPublished ? "Published" : "Draft"}
//                       </span>
//                     </td>
//                     <td className="p-4 text-center">
//                       <div className="flex justify-center gap-3">
//                         <button
//                           onClick={() => router.push(`/admin/pages/Blogs/add?slug=${blog.slug}`)}
//                           className="text-blue-500 hover:text-blue-700 p-2 hover:bg-blue-50 rounded-lg transition"
//                           title="Edit Blog"
//                         >
//                           <Edit size={18} />
//                         </button>
//                         <button
//                           onClick={() => handleDelete(blog.slug)}
//                           className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition"
//                           title="Delete Blog"
//                         >
//                           <Trash2 size={18} />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Blog;
