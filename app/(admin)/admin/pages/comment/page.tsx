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
  publish: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface CommentFormData {
  name: string;
  email: string;
  comment: string;
  page: string;
  Score: string;
  publish: boolean;
}

const emptyComment: CommentFormData = {
  name: "",
  email: "",
  comment: "",
  page: "",
  Score: "",
  publish: false,
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
  const [publishFilter, setPublishFilter] = useState("");

  // FETCH COMMENTS
  const fetchComments = async () => {
    try {
      setFetchLoading(true);

      const params: Record<string, string> = {};

      if (pageFilter.trim()) {
        params.page = pageFilter.trim();
      }

      if (publishFilter !== "") {
        params.publish = publishFilter;
      }

      const res = await axiosInstance.get("/comments", {
        params,
      });

      setComments(res?.data?.data || []);
    } catch (error) {
      console.error("Failed to fetch comments:", error);
    } finally {
      setFetchLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [pageFilter, publishFilter]);

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
        publish: formData.publish,
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
      publish: comment.publish ?? false,
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
        publish: !comment.publish,
      });

      await fetchComments();
    } catch (error) {
      console.error("Failed to update publish status:", error);
      alert("Failed to update publish status");
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

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* HEADER */}
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Comments
          </h1>

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
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search comments..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-3 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
            />
          </div>

          {/* PAGE FILTER */}
          <input
            type="text"
            placeholder="Filter by page..."
            value={pageFilter}
            onChange={(e) => setPageFilter(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
          />

          {/* PUBLISH FILTER */}
          <select
            value={publishFilter}
            onChange={(e) => setPublishFilter(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
          >
            <option value="">All Comments</option>
            <option value="true">Published</option>
            <option value="false">Unpublished</option>
          </select>
        </div>
      </div>

      {/* COMMENTS LIST */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
        {fetchLoading ? (
          <div className="flex min-h-[250px] items-center justify-center">
            <p className="text-sm text-gray-500">
              Loading comments...
            </p>
          </div>
        ) : filteredComments.length === 0 ? (
          <div className="flex min-h-[250px] flex-col items-center justify-center p-5">
            <div className="mb-3 rounded-full bg-orange-50 p-4">
              <MessageSquare
                size={28}
                className="text-orange-500"
              />
            </div>

            <h3 className="font-semibold text-gray-900">
              No comments found
            </h3>

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
          <div className="divide-y divide-gray-100">
            {filteredComments.map((comment) => (
              <div
                key={comment._id}
                className="flex flex-col gap-4 p-5 md:flex-row md:items-start md:justify-between"
              >
                {/* COMMENT INFO */}
                <div className="flex min-w-0 flex-1 gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-orange-100">
                    <MessageSquare
                      size={22}
                      className="text-orange-500"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-gray-900">
                      {comment.name || "Anonymous"}
                    </h3>

                    {comment.email && (
                      <p className="mt-1 flex items-center gap-1 text-sm text-gray-500">
                        <Mail size={14} />
                        {comment.email}
                      </p>
                    )}

                    <div className="mt-2 flex flex-wrap gap-2">
                      {comment.page && (
                        <span className="flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-600">
                          <FileText size={12} />
                          {comment.page}
                        </span>
                      )}

                      {comment.Score && (
                        <span className="flex items-center gap-1 rounded-full bg-yellow-50 px-2.5 py-1 text-xs text-yellow-700">
                          <Star size={12} />
                          Score: {comment.Score}
                        </span>
                      )}
                    </div>

                    <p className="mt-3 whitespace-pre-wrap break-words text-sm leading-6 text-gray-700">
                      {comment.comment}
                    </p>

                    {comment.createdAt && (
                      <p className="mt-2 text-xs text-gray-400">
                        {new Date(comment.createdAt).toLocaleString()}
                      </p>
                    )}
                  </div>
                </div>

                {/* ACTIONS */}
                <div className="flex shrink-0 items-center gap-2">
                  {/* PUBLISH TOGGLE */}
                  <button
                    type="button"
                    onClick={() => handleTogglePublish(comment)}
                    className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                      comment.publish
                        ? "bg-green-50 text-green-600 hover:bg-green-100"
                        : "bg-red-50 text-red-600 hover:bg-red-100"
                    }`}
                  >
                    {comment.publish ? "Published" : "Unpublished"}
                  </button>

                  {/* EDIT */}
                  <button
                    type="button"
                    onClick={() => handleEdit(comment)}
                    className="rounded-lg border border-gray-200 p-2 text-gray-600 transition hover:bg-gray-50 hover:text-orange-500"
                  >
                    <Pencil size={17} />
                  </button>

                  {/* DELETE */}
                  <button
                    type="button"
                    onClick={() =>
                      comment._id && handleDelete(comment._id)
                    }
                    disabled={deleteLoading === comment._id}
                    className="rounded-lg border border-red-100 p-2 text-red-500 transition hover:bg-red-50 disabled:opacity-50"
                  >
                    <Trash2 size={17} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CREATE / EDIT MODAL */}
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
            <form
              onSubmit={handleSubmit}
              className="overflow-y-auto"
            >
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
                      Publish Comment
                    </h3>

                    <p className="mt-1 text-xs text-gray-500">
                      Published comments will be visible on the website.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        publish: !prev.publish,
                      }))
                    }
                    className={`relative h-6 w-11 rounded-full transition ${
                      formData.publish
                        ? "bg-orange-500"
                        : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
                        formData.publish ? "left-6" : "left-1"
                      }`}
                    />
                  </button>
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