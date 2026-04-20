"use client";

import React, { useEffect, useState } from "react";
import {
  createBlogCategory,
  getBlogCategory,
  deleteBlogcategory,
} from "@/app/services/api";
import { Trash } from "lucide-react";

const BlogcategoryPage = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ FETCH
  const fetchCategories = async () => {
    try {
      const res = await getBlogCategory();
      console.log(res)
      setCategories(res?.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // ✅ CREATE
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      await createBlogCategory({ name }); // 🔥 YOUR API

      setName("");
      setShowForm(false);
      fetchCategories();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ DELETE
  const handleDelete = async (id: string) => {
    try {
      await deleteBlogcategory(id); // 🔥 YOUR API
      fetchCategories();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      {/* HEADER */}
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Blog Categories</h1>

        <button
          onClick={() => setShowForm(true)}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Create Category
        </button>
      </div>

      {/* DROPDOWN */}
      {/* <select className="p-2 border rounded mb-6 w-64">
        <option value="">Select Category</option>
        {categories.map((cat) => (
          <option key={cat._id} value={cat._id}>
            {cat.name}
          </option>
        ))}
      </select> */}

      {/* LIST */}
      <div className="bg-white p-4 rounded shadow">
        {categories.length === 0 ? (
          <p>No categories found</p>
        ) : (
          categories.map((cat) => (
            <div
              key={cat._id}
              className="flex justify-between border-b py-2"
            >
              <span>{cat.name}</span>

              <button
                onClick={() => handleDelete(cat._id)}
                className="text-red-500"
              >
                <Trash />
              </button>
            </div>
          ))
        )}
      </div>

      {/* MODAL */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <form
            onSubmit={handleSubmit}
            className="bg-gray-900 text-white p-6 rounded-xl w-full max-w-md"
          >
            <h2 className="text-lg mb-4">Create Category</h2>

            <input
              type="text"
              placeholder="Category Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 mb-4 rounded bg-gray-800"
              required
            />

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="bg-gray-600 px-4 py-2 rounded"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="bg-blue-600 px-4 py-2 rounded"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default BlogcategoryPage;