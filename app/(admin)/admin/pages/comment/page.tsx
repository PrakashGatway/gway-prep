"use client";

import React, { useEffect, useState } from "react";
import {
  Plus,
  Trash2,
  Pencil,
  X,
  MessageSquare,
  Mail,
  FileText,
  Save,
  Star,
  Search,
} from "lucide-react";
import axiosInstance from "@/app/lib/axios";

interface Comment {
  _id?: string;
  name: string;
  email: string;
  comment: string;
  page: string;
  Score: string;
  status: "approved" | "pending" | "rejected";
  createdAt?: string;
  updatedAt?: string;
}

interface CommentFormData {
  name: string;
  email: string;
  comment: string;
  page: string;
  Score: string;
  status: "approved" | "pending" | "rejected";
}

const emptyComment: CommentFormData = {
  name: "",
  email: "",
  comment: "",
  page: "",
  Score: "",
  status: "approved",
};

const CommentsPage = () => {
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] =
    useState<CommentFormData>(emptyComment);

  const [editingId, setEditingId] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);

  const [deleteLoading, setDeleteLoading] = useState<string | null>(
    null
  );

  const [comments, setComments] = useState<Comment[]>([]);

  const [search, setSearch] = useState("");
  const [pageFilter, setPageFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");


const [commentPage, setCommentPage] = useState(1);
const [commentLimit] = useState(5);
const [debouncedSearch, setDebouncedSearch] = useState(search);

const [pagination, setPagination] = useState({
  currentPage: 1,
  limit: 10,
  totalComments: 0,
  totalPages: 0,
  hasNextPage: false,
  hasPreviousPage: false,
});

  // FETCH COMMENTS
 const fetchComments = async (pageNumber = 1) => {
  try {
    setFetchLoading(true);

    const params: Record<string, string> = {
      pageNumber: String(pageNumber),
      limit: "10",
    };

    if (pageFilter.trim()) {
      params.page = pageFilter.trim();
    }

    if (debouncedSearch.trim()) {
      params.search = debouncedSearch.trim();
    }

    if (statusFilter !== "all") {
      params.status = statusFilter;
    }

    const res = await axiosInstance.get("/comments", {
      params,
    });

    setComments(res?.data?.data || []);

    setPagination(res?.data?.pagination);
  } catch (error) {
    console.error("Failed to fetch comments:", error);
  } finally {
    setFetchLoading(false);
  }
};

useEffect(()=>{
  const handler = setTimeout(() => {
    setDebouncedSearch(search);
  }, 500);

  return () => {
    clearTimeout(handler);
  };
}, [search]);

  useEffect(() => {
    fetchComments(commentPage);
  }, [pageFilter, statusFilter, commentPage, debouncedSearch]);

  // HANDLE INPUT CHANGE
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // HANDLE SUBMIT
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.comment.trim()) {
      alert("Please enter a comment");
      return;
    }

    if (!formData.page.trim()) {
      alert("Please enter a page");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        comment: formData.comment.trim(),
        page: formData.page.trim(),
        Score: formData.Score.trim(),
        status: formData.status,
      };

      if (editingId) {
        // UPDATE COMMENT
        await axiosInstance.put("/comments", {
          id: editingId,
          ...payload,
        });

        alert("Comment updated successfully");
      } else {
        // CREATE COMMENT
        await axiosInstance.post("/comments", payload);

        alert("Comment added successfully");
      }

      await fetchComments();
      closeModal();
    } catch (error) {
      console.error("Failed to save comment:", error);
      alert("Failed to save comment");
    } finally {
      setLoading(false);
    }
  };

  // EDIT COMMENT
  const handleEdit = (comment: Comment) => {
    setEditingId(comment._id || null);

    setFormData({
      name: comment.name || "",
      email: comment.email || "",
      comment: comment.comment || "",
      page: comment.page || "",
      Score: comment.Score || "",
      status: comment.status || "pending",
    });

    setShowForm(true);
  };

  // DELETE COMMENT
  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this comment?"
    );

    if (!confirmDelete) return;

    try {
      setDeleteLoading(id);

      await axiosInstance.delete("/comments", {
        data: { id },
      });

      alert("Comment deleted successfully");

      await fetchComments();
    } catch (error) {
      console.error("Failed to delete comment:", error);
      alert("Failed to delete comment");
    } finally {
      setDeleteLoading(null);
    }
  };

  // TOGGLE PUBLISH STATUS
  const handleTogglePublish = async (comment: Comment) => {
    if (!comment._id) return;

    try {
      await axiosInstance.put("/comments", {
        id: comment._id,
        name: comment.name,
        email: comment.email,
        comment: comment.comment,
        page: comment.page,
        Score: comment.Score,
        status: comment.status === "approved" ? "rejected" : comment.status === "rejected" ? "pending" : "approved",
      });

      await fetchComments();
    } catch (error) {
      console.error("Failed to update status:", error);
      alert("Failed to update status");
    }
  };

  // OPEN CREATE MODAL
  const openCreateModal = () => {
    setEditingId(null);
    setFormData(emptyComment);
    setShowForm(true);
  };

  // CLOSE MODAL
  const closeModal = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData(emptyComment);
  };

  // LOCAL SEARCH
  const filteredComments = comments.filter((comment) => {
    const searchText = search.toLowerCase();

    return (
      comment.name?.toLowerCase().includes(searchText) ||
      comment.email?.toLowerCase().includes(searchText) ||
      comment.comment?.toLowerCase().includes(searchText) ||
      comment.page?.toLowerCase().includes(searchText)
    );
  });

  console.log(comments)

  return (
   <div className="min-h-screen bg-gray-50 p-4 md:p-6">
  {/* HEADER */}
  <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Comments</h1>
      <p className="mt-1 text-sm text-gray-500">
        Manage Ooshas Prep website comments and reviews.
      </p>
    </div>

    <button
      type="button"
      onClick={openCreateModal}
      className="flex w-fit items-center gap-2 rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-orange-600"
    >
      <Plus size={18} />
      Add Comment
    </button>
  </div>

  {/* FILTERS */}
  <div className="mb-5 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
    <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
      {/* SEARCH */}
      <div className="relative">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-2 text-gray-400"
        />
        <input
          type="text"
          placeholder="Search comments..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-3 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
        />
      </div>

  

      {/* STATUS FILTER */}
      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        className="rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
      >
        <option value="all">All Comments</option>
        <option value="approved">Approved</option>
        <option value="rejected">Rejected</option>
        <option value="pending">Pending</option>
      </select>
    </div>
  </div>

  {/* COMMENTS TABLE */}
  <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
    {fetchLoading ? (
      <div className="flex min-h-[250px] items-center justify-center">
        <p className="text-sm text-gray-500">Loading comments...</p>
      </div>
    ) : comments.length === 0 ? (
      <div className="flex min-h-[250px] flex-col items-center justify-center p-5">
        <div className="mb-3 rounded-full bg-orange-50 p-4">
          <MessageSquare size={28} className="text-orange-500" />
        </div>
        <h3 className="font-semibold text-gray-900">No comments found</h3>
        <p className="mt-1 text-center text-sm text-gray-500">
          Add your first comment to get started.
        </p>
        <button
          onClick={openCreateModal}
          className="mt-4 flex items-center gap-2 rounded-lg bg-orange-500 px-4 py-2 text-sm text-white hover:bg-orange-600"
        >
          <Plus size={16} />
          Add Comment
        </button>
      </div>
    ) : (
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-500">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700">
            <tr>
              <th scope="col" className="px-6 py-4 font-semibold">
                Author
              </th>
              <th scope="col" className="px-6 py-4 font-semibold">
                Comment
              </th>
              <th scope="col" className="px-6 py-4 font-semibold">
                Details
              </th>
              <th scope="col" className="px-6 py-4 font-semibold">
                Status
              </th>
              <th scope="col" className="px-6 py-4 font-semibold text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            {comments.map((comment) => (
              <tr key={comment._id} className="hover:bg-gray-50/50 transition-colors">
                
                {/* AUTHOR COLUMN */}
                <td className="px-6 py-4 align-top">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-600">
                      <MessageSquare size={18} />
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-gray-900 truncate max-w-[150px]">
                        {comment.name || "Anonymous"}
                      </p>
                      {comment.email && (
                        <p className="mt-0.5 flex items-center gap-1 text-xs text-gray-500 truncate max-w-[150px]">
                          <Mail size={12} />
                          {comment.email}
                        </p>
                      )}
                      <p className="mt-1 text-xs text-gray-400">
                        {comment.createdAt
                          ? new Date(comment.createdAt).toLocaleDateString()
                          : ""}
                      </p>
                    </div>
                  </div>
                </td>

                {/* COMMENT COLUMN */}
                <td className="px-6 py-4 align-top">
                  <div className="max-w-xs truncate whitespace-pre-wrap text-gray-700">
                    {comment.comment}
                  </div>
                </td>

                {/* DETAILS COLUMN (Page & Score) */}
                <td className="px-6 py-4 align-top">
                  <div className="flex flex-col gap-2">
                    {comment.page && (
                      <span className="inline-flex w-fit items-center gap-1 rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
                        <FileText size={12} />
                        {comment.page}
                      </span>
                    )}
                    {comment.Score && (
                      <span className="inline-flex w-fit items-center gap-1 rounded-full bg-yellow-50 px-2.5 py-1 text-xs font-medium text-yellow-700">
                        <Star size={12} />
                        {comment.Score}
                      </span>
                    )}
                  </div>
                </td>

                {/* STATUS COLUMN */}
                <td className="px-6 py-4 align-top">
                  <button
                    type="button"
                    onClick={() => handleTogglePublish(comment)}
                    className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium transition ${
                      comment.status === "approved"
                        ? "bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20 hover:bg-green-100"
                        : "bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/20 hover:bg-red-100"
                    }`}
                  >
                    {comment.status || "null"}
                  </button>
                </td>

                {/* ACTIONS COLUMN */}
                <td className="px-6 py-4 align-top text-left">
                  <div className="flex items-center justify-start gap-2">
                    <button
                      type="button"
                      onClick={() => handleEdit(comment)}
                      className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-orange-500"
                      title="Edit"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={() => comment._id && handleDelete(comment._id)}
                      disabled={deleteLoading === comment._id}
                      className="rounded-lg p-2 text-gray-500 transition hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex items-center justify-center gap-3 my-6">

  <button
    type="button"
    disabled={!pagination.hasPreviousPage || fetchLoading}
    onClick={() => setCommentPage((prev) => prev - 1)}
    className="px-4 py-2 cursor-pointer rounded-xl border border-gray-200 text-sm font-medium disabled:opacity-40"
  >
    ← Previous
  </button>

  <span className="text-sm text-gray-600">
    Page {pagination.currentPage} of {pagination.totalPages}
  </span>

  <button
    type="button"
    disabled={!pagination.hasNextPage || fetchLoading}
    onClick={() => setCommentPage((prev) => prev + 1)}
    className="px-4 py-2 rounded-xl bg-[#f36d45] cursor-pointer text-white text-sm font-medium disabled:opacity-40"
  >
    Next →
  </button>

</div>
      </div>
      
    )}
  </div>

  {/* CREATE / EDIT MODAL (Logic Unchanged) */}
  {showForm && (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 p-4">
      <div className="flex max-h-[95vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* MODAL HEADER */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {editingId ? "Edit Comment" : "Add Comment"}
            </h2>
            <p className="mt-1 text-xs text-gray-500">
              Manage comments for Ooshas Prep.
            </p>
          </div>
          <button
            type="button"
            onClick={closeModal}
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="overflow-y-auto">
          <div className="space-y-5 p-6">
            {/* NAME */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter name"
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
              />
            </div>

            {/* PAGE */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Page *
              </label>
              <input
                type="text"
                name="page"
                value={formData.page}
                onChange={handleChange}
                placeholder="e.g. IELTS, SAT, GRE"
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
              />
            </div>

            {/* SCORE */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Score
              </label>
              <input
                type="text"
                name="Score"
                value={formData.Score}
                onChange={handleChange}
                placeholder="Enter score"
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
              />
            </div>

            {/* COMMENT */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Comment *
              </label>
              <textarea
                name="comment"
                value={formData.comment}
                onChange={handleChange}
                placeholder="Write a comment..."
                rows={5}
                required
                className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
              />
            </div>

            {/* PUBLISH STATUS */}
            <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-4">
              <div>
                <h3 className="text-sm font-medium text-gray-900">
                  Comment Status
                </h3>
                <p className="mt-1 text-xs text-gray-500">
                  Select whether this comment is pending, approved, or rejected.
                </p>
              </div>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    status: e.target.value,
                  }))
                }
                className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 outline-none transition focus:border-[#f36d45] focus:ring-2 focus:ring-[#f36d45]/20"
              >
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>

          {/* FOOTER */}
          <div className="sticky bottom-0 flex items-center justify-end gap-3 border-t border-gray-200 bg-white px-6 py-4">
            <button
              type="button"
              onClick={closeModal}
              className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Save size={17} />
              {loading
                ? "Saving..."
                : editingId
                ? "Update Comment"
                : "Save Comment"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )}
</div>
  );
};

export default CommentsPage;