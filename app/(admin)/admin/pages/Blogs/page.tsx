"use client";

import { getBlogs, deleteBlog } from "@/app/services/api";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { Edit, Trash2 } from "lucide-react";
import Image from "next/image";

const Blog = () => {
  const router = useRouter();
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ FETCH BLOGS
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

  // ✅ DELETE BLOG
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

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Blogs</h1>
        <div className="space-x-3">
          <button
            onClick={() => router.push("/admin/pages/Blogs/category")}
            className="bg-gray-800 text-white px-5 py-2.5 rounded-xl hover:bg-gray-700 transition"
          >
            Manage Categories
          </button>
          <button
            onClick={() => router.push("/admin/pages/Blogs/add")}
            className="bg-blue-600 text-white px-5 py-2.5 rounded-xl hover:bg-blue-700 transition shadow-sm"
          >
            + Create Blog
          </button>
        </div>
      </div>

      {/* LIST */}
      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading blogs...</div>
        ) : blogs.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No blogs found. Create your first blog!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="p-4 font-semibold text-gray-600">Image</th>
                  <th className="p-4 font-semibold text-gray-600">Title</th>
                  <th className="p-4 font-semibold text-gray-600">Category</th>
                  <th className="p-4 font-semibold text-gray-600">Status</th>
                  <th className="p-4 font-semibold text-gray-600 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {blogs.map((blog) => (
                  <tr key={blog._id} className="border-b hover:bg-gray-50 transition">
                    <td className="p-4">
                      {blog.image ? (
                        <img
                          src={blog.image}
                          alt={blog.title}
                          className="w-16 h-12 object-cover rounded-lg border"
                        />
                      ) : (
                        <div className="w-16 h-12 bg-gray-200 rounded-lg flex items-center justify-center text-xs text-gray-500">
                          No Img
                        </div>
                      )}
                    </td>
                    <td className="p-4 font-medium text-gray-800">{blog.title}</td>
                    <td className="p-4 text-gray-600">{blog.category}</td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          blog.isPublished
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {blog.isPublished ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex justify-center gap-3">
                        <button
                          onClick={() => router.push(`/admin/pages/Blogs/add?slug=${blog.slug}`)}
                          className="text-blue-500 hover:text-blue-700 p-2 hover:bg-blue-50 rounded-lg transition"
                          title="Edit Blog"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(blog.slug)}
                          className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition"
                          title="Delete Blog"
                        >
                          <Trash2 size={18} />
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
    </div>
  );
};

export default Blog;
