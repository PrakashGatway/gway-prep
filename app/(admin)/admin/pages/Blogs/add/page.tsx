"use client";

import React, { Suspense, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import {
  Plus,
  Save,
  Edit,
  ChevronLeft,
  Trash2,
  ChevronDown,
  ChevronUp,
  Upload,
  X,
} from "lucide-react";
import { getBlogCategory, getBlogBySlug } from "@/app/services/api";
import { useRouter, useSearchParams } from "next/navigation";
import { pageData } from "@/app/lib/pageData";
import { slugify } from "@/app/lib/slug";

const CKEditorComponent = dynamic(
  () => import("../../../components/ckEditor"),
  {
    ssr: false,
    loading: () => (
      <div className="p-4 border rounded-lg bg-gray-50">Loading editor...</div>
    ),
  },
);

interface FAQ {
  question: string;
  answer: string;
}

interface Banner {
  title: string;
  subtitle: string;
  url: string;
  buttontext: string;
}

interface Option {
  value: string;
  label: string;
  type: string;
}

interface BlogDetail {
  content_heading: string;
  content_data: string;
  faq: FAQ[];
  Image: string;
  Banner: Banner[];
  question: string;
  options: Option[];
  answer: string;
  value: string;
  label: string;
  type: string;
  title: string;
  subtitle: string;
  url: string;
  buttontext: string;
}

interface BlogForm {
  title: string;
  slug: string;
  category: string;
  tags: string[];
  image: string;
  metaTitle: string;
  metaDescription: string;
  isPublished: boolean;
  blog_details: BlogDetail[];
  author?: string;
  authslug?: string;
}

const createFAQ = (): FAQ => ({
  question: "",
  answer: "",
});

const createBanner = (): Banner => ({
  title: "",
  subtitle: "",
  url: "",
  buttontext: "",
});

const createOption = (): Option => ({
  value: "",
  label: "",
  type: "",
});

const createBlogDetail = (): BlogDetail => ({
  content_heading: "",
  content_data: "",
  faq: [],
  Image: "",
  Banner: [],
  question: "",
  options: [],
  answer: "",
  value: "",
  label: "",
  type: "text",
  title: "",
  subtitle: "",
  url: "",
  buttontext: "",
});

const defaultForm: BlogForm = {
  title: "",
  slug: "",
  category: "",
  image: "",
  tags: [],
  metaTitle: "",
  metaDescription: "",
  isPublished: true,
  blog_details: [],
  author: "",
  authslug: "",
};

const BlogFormContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editSlug = searchParams.get("slug");

  const [values, setValues] = useState<BlogForm>(defaultForm);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeDetail, setActiveDetail] = useState<number | null>(0);
  const [activeSection, setActiveSection] = useState<string | null>(
    "basic-info",
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    fetchData();
  }, [editSlug]);

  const fetchData = async () => {
    try {
      setLoading(true);

      const catRes = await getBlogCategory();
      setCategories(catRes?.data || []);

      if (editSlug) {
        const blogData = await getBlogBySlug(editSlug);

        if (blogData) {
          setValues({
            title: blogData.title || "",
            slug: blogData.slug || "",
            category: blogData.category || "",
            tags: Array.isArray(blogData.tags) ? blogData.tags : [],
            image: blogData.image || "",
            metaTitle: blogData.metaTitle || "",
            metaDescription: blogData.metaDescription || "",
            isPublished:
              blogData.isPublished === false || blogData.isPublished === "false"
                ? false
                : true,
            blog_details: Array.isArray(blogData.blog_details)
              ? blogData.blog_details.map(normalizeBlogDetail)
              : [],
            author: blogData.author || "",
            authslug: blogData.authslug || "",
          });
        }
      }
    } catch (error) {
      console.error("Error fetching blog data:", error);
    } finally {
      setLoading(false);
    }
  };

  const normalizeBlogDetail = (detail: any): BlogDetail => {
    return {
      content_heading: detail?.content_heading || "",
      content_data: detail?.content_data || "",
      faq: Array.isArray(detail?.faq)
        ? detail.faq.map((item: any) => ({
            question: item?.question || "",
            answer: item?.answer || "",
          }))
        : [],
      Image: detail?.Image || "",
      Banner: Array.isArray(detail?.Banner)
        ? detail.Banner.map((item: any) => ({
            title: item?.title || "",
            subtitle: item?.subtitle || "",
            url: item?.url || "",
            buttontext: item?.buttontext || "",
          }))
        : [],
      question: detail?.question || "",
      options: Array.isArray(detail?.options)
        ? detail.options.map((item: any) => ({
            value: item?.value || "",
            label: item?.label || "",
            type: item?.type || "",
          }))
        : [],
      answer: detail?.answer || "",
      value: detail?.value || "",
      label: detail?.label || "",
      type: detail?.type || "text",
      title: detail?.title || "",
      subtitle: detail?.subtitle || "",
      url: detail?.url || "",
      buttontext: detail?.buttontext || "",
    };
  };

  const updateRootField = (
    field: keyof BlogForm,
    value: string | boolean | string[],
  ) => {
    setValues((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Clear error for this field if it exists
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const updateDetailField = (
    detailIndex: number,
    field: keyof BlogDetail,
    value: any,
  ) => {
    setValues((prev) => {
      const details = [...prev.blog_details];

      details[detailIndex] = {
        ...details[detailIndex],
        [field]: value,
      };

      return {
        ...prev,
        blog_details: details,
      };
    });
  };

  // Image upload for root image
  const uploadRootImage = async (file: File) => {
    try {
      setLoading(true);

      const data = new FormData();
      data.append("file", file);

      const response = await fetch("/api/admin/uploadimg", {
        method: "POST",
        body: data,
      });

      const result = await response.json();

      if (!response.ok || !result?.url) {
        throw new Error(result?.error || "Image upload failed");
      }

      updateRootField("image", result.url);
      return result.url;
    } catch (error: any) {
      console.error("Image upload error:", error);
      alert(error?.message || "Image upload failed");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleRootImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    await uploadRootImage(file);
  };

  const removeRootImage = () => {
    updateRootField("image", "");
  };

  // Image upload for detail images
  const saveFile = async (
    e: React.ChangeEvent<HTMLInputElement>,
    detailIndex: number,
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      setLoading(true);

      const data = new FormData();
      data.append("file", file);

      const response = await fetch("/api/admin/uploadimg", {
        method: "POST",
        body: data,
      });

      const result = await response.json();

      if (!response.ok || !result?.url) {
        throw new Error(result?.error || "Image upload failed");
      }

      updateDetailField(detailIndex, "Image", result.url);
    } catch (error: any) {
      console.error("Image upload error:", error);
      alert(error?.message || "Image upload failed");
    } finally {
      setLoading(false);
    }
  };

  const addBlogDetail = () => {
    setValues((prev) => ({
      ...prev,
      blog_details: [...prev.blog_details, createBlogDetail()],
    }));

    setActiveDetail(values.blog_details.length);
  };

  const removeBlogDetail = (index: number) => {
    setValues((prev) => ({
      ...prev,
      blog_details: prev.blog_details.filter((_, i) => i !== index),
    }));

    setActiveDetail(null);
  };

  const addFAQ = (detailIndex: number) => {
    setValues((prev) => {
      const details = [...prev.blog_details];

      details[detailIndex] = {
        ...details[detailIndex],
        faq: [...(details[detailIndex]?.faq || []), createFAQ()],
      };

      return {
        ...prev,
        blog_details: details,
      };
    });
  };

  const removeFAQ = (detailIndex: number, faqIndex: number) => {
    setValues((prev) => {
      const details = [...prev.blog_details];

      details[detailIndex] = {
        ...details[detailIndex],
        faq: details[detailIndex].faq.filter((_, index) => index !== faqIndex),
      };

      return {
        ...prev,
        blog_details: details,
      };
    });
  };

  const updateFAQ = (
    detailIndex: number,
    faqIndex: number,
    field: keyof FAQ,
    value: string,
  ) => {
    setValues((prev) => {
      const details = [...prev.blog_details];
      const faq = [...details[detailIndex].faq];

      faq[faqIndex] = {
        ...faq[faqIndex],
        [field]: value,
      };

      details[detailIndex] = {
        ...details[detailIndex],
        faq,
      };

      return {
        ...prev,
        blog_details: details,
      };
    });
  };

  const addBanner = (detailIndex: number) => {
    setValues((prev) => {
      const details = [...prev.blog_details];

      details[detailIndex] = {
        ...details[detailIndex],
        Banner: [...(details[detailIndex]?.Banner || []), createBanner()],
      };

      return {
        ...prev,
        blog_details: details,
      };
    });
  };

  const removeBanner = (detailIndex: number, bannerIndex: number) => {
    setValues((prev) => {
      const details = [...prev.blog_details];

      details[detailIndex] = {
        ...details[detailIndex],
        Banner: details[detailIndex].Banner.filter(
          (_, index) => index !== bannerIndex,
        ),
      };

      return {
        ...prev,
        blog_details: details,
      };
    });
  };

  const updateBanner = (
    detailIndex: number,
    bannerIndex: number,
    field: keyof Banner,
    value: string,
  ) => {
    setValues((prev) => {
      const details = [...prev.blog_details];
      const banners = [...details[detailIndex].Banner];

      banners[bannerIndex] = {
        ...banners[bannerIndex],
        [field]: value,
      };

      details[detailIndex] = {
        ...details[detailIndex],
        Banner: banners,
      };

      return {
        ...prev,
        blog_details: details,
      };
    });
  };

  const addOption = (detailIndex: number) => {
    setValues((prev) => {
      const details = [...prev.blog_details];

      details[detailIndex] = {
        ...details[detailIndex],
        options: [...(details[detailIndex]?.options || []), createOption()],
      };

      return {
        ...prev,
        blog_details: details,
      };
    });
  };

  const removeOption = (detailIndex: number, optionIndex: number) => {
    setValues((prev) => {
      const details = [...prev.blog_details];

      details[detailIndex] = {
        ...details[detailIndex],
        options: details[detailIndex].options.filter(
          (_, index) => index !== optionIndex,
        ),
      };

      return {
        ...prev,
        blog_details: details,
      };
    });
  };

  const updateOption = (
    detailIndex: number,
    optionIndex: number,
    field: keyof Option,
    value: string,
  ) => {
    setValues((prev) => {
      const details = [...prev.blog_details];
      const options = [...details[detailIndex].options];

      options[optionIndex] = {
        ...options[optionIndex],
        [field]: value,
      };

      details[detailIndex] = {
        ...details[detailIndex],
        options,
      };

      return {
        ...prev,
        blog_details: details,
      };
    });
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!values.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!values.slug.trim()) {
      newErrors.slug = "Slug is required";
    }

    if (!values.category) {
      newErrors.category = "Category is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();

    if (!validateForm()) {
      // Scroll to the first error
      const firstErrorField = document.querySelector('.border-red-500');
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    try {
      setLoading(true);

      const payload: BlogForm = {
        title: values.title.trim(),
        slug: values.slug.trim(),
        category: values.category,
        tags: values.tags,
        image: values.image,
        metaTitle: values.metaTitle.trim(),
        metaDescription: values.metaDescription.trim(),
        isPublished: Boolean(values.isPublished),
        blog_details: values.blog_details,
        author: values.author || "",
        authslug: values.authslug || "",
      };

      const url = editSlug
        ? `/api/admin/blogs/${editSlug}`
        : "/api/admin/blogs";

      const method = editSlug ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(
          responseData?.error ||
            responseData?.message ||
            `Failed to ${editSlug ? "update" : "create"} blog`,
        );
      }

      alert(`Blog ${editSlug ? "updated" : "created"} successfully!`);

      router.push("/admin/pages/Blogs");
    } catch (error: any) {
      console.error(`Error ${editSlug ? "updating" : "creating"} blog:`, error);

      alert(
        error?.message || `Error ${editSlug ? "updating" : "creating"} blog`,
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all";

  const inputErrorClass = (field: string) =>
    errors[field] ? "border-red-500 focus:ring-red-500" : "";

  const sectionHeader = (name: string, label: string, required = false) => (
    <div
      onClick={() => setActiveSection(activeSection === name ? null : name)}
      className="flex justify-between items-center p-5 cursor-pointer hover:bg-gray-50 rounded-2xl transition"
    >
      <div>
        <span className="font-semibold text-gray-800">{label}</span>

        {required && (
          <span className="ml-2 px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded">
            Required
          </span>
        )}
      </div>

      {activeSection === name ? (
        <ChevronUp size={20} className="text-gray-500" />
      ) : (
        <ChevronDown size={20} className="text-gray-500" />
      )}
    </div>
  );

  return (
    <div className="max-w-7xl w-full mx-auto p-6 bg-gray-100 min-h-screen">
      <div className="bg-white rounded-2xl shadow-lg">
        <div className="border-b px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => router.push("/admin/pages/Blogs")}
                className="p-2 hover:bg-gray-100 rounded-full transition"
              >
                <ChevronLeft size={24} />
              </button>

              <div>
                <h1 className="text-2xl font-bold">
                  {editSlug ? "Edit Blog" : "Create New Blog"}
                </h1>

                <p className="text-gray-600 mt-1">
                  Create and manage dynamic blog content
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleSubmit()}
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-2 rounded-xl flex items-center gap-2 hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              <Save size={18} />

              {loading ? "Saving..." : editSlug ? "Update Blog" : "Save Blog"}
            </button>
          </div>
        </div>

        <div className="p-6 space-y-5">
          {/* Basic Information Section */}
          <div className="bg-white rounded-2xl shadow-sm border">
            {sectionHeader("basic-info", "Basic Information", true)}

            {activeSection === "basic-info" && (
              <div className="border-t p-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Title <span className="text-red-500">*</span>
                    </label>

                    <input
                      type="text"
                      value={values.title}
                      className={`${inputClass} ${inputErrorClass("title")}`}
                      placeholder="Enter blog title"
                      onChange={(e) => {
                        updateRootField("title", e.target.value);
                        // Auto-generate slug if not editing
                        // if (!editSlug) {
                        //   updateRootField("slug", slugify(e.target.value));
                        // }
                      }}
                    />
                    {errors.title && (
                      <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Slug <span className="text-red-500">*</span>
                    </label>

                    <input
                      type="text"
                      value={values.slug}
                      disabled={!!editSlug}
                      className={`${inputClass} ${inputErrorClass("slug")} ${
                        editSlug
                          ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                          : ""
                      }`}
                      placeholder="enter-blog-slug"
                      onChange={(e) => updateRootField("slug", e.target.value)}
                    />
                    {errors.slug && (
                      <p className="text-red-500 text-sm mt-1">{errors.slug}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Category <span className="text-red-500">*</span>
                    </label>

                    <select
                      value={values.category}
                      className={`${inputClass} ${inputErrorClass("category")}`}
                      onChange={(e) =>
                        updateRootField("category", e.target.value)
                      }
                    >
                      <option value="">Select Category</option>

                      {categories.map((category: any) => (
                        <option key={category._id} value={category.name}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                    {errors.category && (
                      <p className="text-red-500 text-sm mt-1">{errors.category}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Tags
                    </label>

                    <input
                      type="text"
                      value={values.tags.join(", ")}
                      className={inputClass}
                      placeholder="GRE, IELTS, Study Abroad"
                      onChange={(e) => {
                        const tags = e.target.value
                          .split(",")
                          .map((tag) => tag.trim())
                          .filter(Boolean);

                        updateRootField("tags", tags);
                      }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Meta Title
                    </label>

                    <input
                      type="text"
                      value={values.metaTitle}
                      className={inputClass}
                      placeholder="Enter meta title"
                      onChange={(e) =>
                        updateRootField("metaTitle", e.target.value)
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Published
                    </label>

                    <select
                      value={values.isPublished ? "true" : "false"}
                      className={inputClass}
                      onChange={(e) =>
                        updateRootField(
                          "isPublished",
                          e.target.value === "true",
                        )
                      }
                    >
                      <option value="true">Published</option>
                      <option value="false">Draft</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Image
                    </label>

                    <div className="space-y-3">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleRootImageUpload}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      />

                      {values.image && (
                        <div className="relative inline-block">
                          <img
                            src={values.image}
                            alt="Blog"
                            className="h-32 w-auto rounded-lg border object-cover"
                          />
                          <button
                            type="button"
                            onClick={removeRootImage}
                            className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">
                      Meta Description
                    </label>

                    <textarea
                      value={values.metaDescription}
                      className={inputClass}
                      rows={4}
                      placeholder="Enter meta description"
                      onChange={(e) =>
                        updateRootField("metaDescription", e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Blog Details Section */}
          <div className="bg-white rounded-2xl shadow-sm border">
            <div
              onClick={() =>
                setActiveSection(
                  activeSection === "blog-details" ? null : "blog-details",
                )
              }
              className="flex justify-between items-center p-5 cursor-pointer hover:bg-gray-50 rounded-2xl transition"
            >
              <div className="flex items-center gap-3">
                <span className="font-semibold text-gray-800">
                  Blog Details
                </span>

                <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded">
                  {values.blog_details.length} items
                </span>
              </div>

              {activeSection === "blog-details" ? (
                <ChevronUp size={20} />
              ) : (
                <ChevronDown size={20} />
              )}
            </div>

            {activeSection === "blog-details" && (
              <div className="border-t p-5 space-y-5">
                {values.blog_details.length === 0 && (
                  <div className="text-center py-10 border border-dashed rounded-xl text-gray-500">
                    No blog detail sections added.
                  </div>
                )}

                {values.blog_details.map((detail, detailIndex) => (
                  <div
                    key={detailIndex}
                    className="border rounded-2xl bg-gray-50 overflow-hidden"
                  >
                    <div
                      className="flex justify-between items-center p-4 bg-white border-b cursor-pointer"
                      onClick={() =>
                        setActiveDetail(
                          activeDetail === detailIndex ? null : detailIndex,
                        )
                      }
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-semibold">
                          {detailIndex + 1}
                        </div>

                        <div>
                          <h3 className="font-semibold">
                            {detail.content_heading ||
                              `Blog Detail ${detailIndex + 1}`}
                          </h3>

                          <p className="text-xs text-gray-500">
                            Mixed content section
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeBlogDetail(detailIndex);
                          }}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 size={18} />
                        </button>

                        {activeDetail === detailIndex ? (
                          <ChevronUp size={20} />
                        ) : (
                          <ChevronDown size={20} />
                        )}
                      </div>
                    </div>

                    {activeDetail === detailIndex && (
                      <div className="p-5 space-y-6">
                        <div className="bg-white p-5 rounded-xl border">
                          <h4 className="font-semibold mb-4">Content</h4>

                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium mb-2">
                                Content Heading
                              </label>

                              <input
                                type="text"
                                value={detail.content_heading}
                                className={inputClass}
                                onChange={(e) =>
                                  updateDetailField(
                                    detailIndex,
                                    "content_heading",
                                    e.target.value,
                                  )
                                }
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium mb-2">
                                Content Data
                              </label>

                              <CKEditorComponent
                                value={detail.content_data}
                                onChange={(data: string) =>
                                  updateDetailField(
                                    detailIndex,
                                    "content_data",
                                    data,
                                  )
                                }
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium mb-2">
                                Image
                              </label>

                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => saveFile(e, detailIndex)}
                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                              />

                              {detail.Image && (
                                <div className="mt-3">
                                  <img
                                    src={detail.Image}
                                    alt="Blog"
                                    className="h-32 w-auto rounded-lg border object-cover"
                                  />
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="bg-white p-5 rounded-xl border">
                          <div className="flex justify-between items-center mb-4">
                            <h4 className="font-semibold">FAQ</h4>

                            <button
                              type="button"
                              onClick={() => addFAQ(detailIndex)}
                              className="flex items-center gap-2 text-blue-600 font-medium"
                            >
                              <Plus size={16} />
                              Add FAQ
                            </button>
                          </div>

                          <div className="space-y-4">
                            {detail.faq.map((faq, faqIndex) => (
                              <div
                                key={faqIndex}
                                className="p-4 border rounded-xl bg-gray-50 relative"
                              >
                                <button
                                  type="button"
                                  onClick={() =>
                                    removeFAQ(detailIndex, faqIndex)
                                  }
                                  className="absolute top-2 right-2 p-2 text-red-500 hover:bg-red-50 rounded-lg"
                                >
                                  <Trash2 size={16} />
                                </button>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-10">
                                  <div>
                                    <label className="block text-sm font-medium mb-2">
                                      Question
                                    </label>

                                    <input
                                      type="text"
                                      value={faq.question}
                                      className={inputClass}
                                      onChange={(e) =>
                                        updateFAQ(
                                          detailIndex,
                                          faqIndex,
                                          "question",
                                          e.target.value,
                                        )
                                      }
                                    />
                                  </div>

                                  <div>
                                    <label className="block text-sm font-medium mb-2">
                                      Answer
                                    </label>

                                    <textarea
                                      value={faq.answer}
                                      className={inputClass}
                                      rows={3}
                                      onChange={(e) =>
                                        updateFAQ(
                                          detailIndex,
                                          faqIndex,
                                          "answer",
                                          e.target.value,
                                        )
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="bg-white p-5 rounded-xl border">
                          <div className="flex justify-between items-center mb-4">
                            <h4 className="font-semibold">Banner</h4>

                            <button
                              type="button"
                              onClick={() => addBanner(detailIndex)}
                              className="flex items-center gap-2 text-blue-600 font-medium"
                            >
                              <Plus size={16} />
                              Add Banner
                            </button>
                          </div>

                          <div className="space-y-4">
                            {detail.Banner.map((banner, bannerIndex) => (
                              <div
                                key={bannerIndex}
                                className="p-4 border rounded-xl bg-gray-50 relative"
                              >
                                <button
                                  type="button"
                                  onClick={() =>
                                    removeBanner(detailIndex, bannerIndex)
                                  }
                                  className="absolute top-2 right-2 p-2 text-red-500 hover:bg-red-50 rounded-lg"
                                >
                                  <Trash2 size={16} />
                                </button>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-10">
                                  <div>
                                    <label className="block text-sm font-medium mb-2">
                                      Title
                                    </label>

                                    <input
                                      type="text"
                                      value={banner.title}
                                      className={inputClass}
                                      onChange={(e) =>
                                        updateBanner(
                                          detailIndex,
                                          bannerIndex,
                                          "title",
                                          e.target.value,
                                        )
                                      }
                                    />
                                  </div>

                                  <div>
                                    <label className="block text-sm font-medium mb-2">
                                      URL
                                    </label>

                                    <input
                                      type="text"
                                      value={banner.url}
                                      className={inputClass}
                                      onChange={(e) =>
                                        updateBanner(
                                          detailIndex,
                                          bannerIndex,
                                          "url",
                                          e.target.value,
                                        )
                                      }
                                    />
                                  </div>

                                  <div className="md:col-span-2">
                                    <label className="block text-sm font-medium mb-2">
                                      Subtitle
                                    </label>

                                    <CKEditorComponent
                                      value={banner.subtitle}
                                      onChange={(data: string) =>
                                        updateBanner(
                                          detailIndex,
                                          bannerIndex,
                                          "subtitle",
                                          data,
                                        )
                                      }
                                    />
                                  </div>

                                  <div>
                                    <label className="block text-sm font-medium mb-2">
                                      Button Text
                                    </label>

                                    <input
                                      type="text"
                                      value={banner.buttontext}
                                      className={inputClass}
                                      onChange={(e) =>
                                        updateBanner(
                                          detailIndex,
                                          bannerIndex,
                                          "buttontext",
                                          e.target.value,
                                        )
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="bg-white p-5 rounded-xl border">
                          <div className="flex justify-between items-center mb-4">
                            <h4 className="font-semibold">
                              Question / Options
                            </h4>

                            <button
                              type="button"
                              onClick={() => addOption(detailIndex)}
                              className="flex items-center gap-2 text-blue-600 font-medium"
                            >
                              <Plus size={16} />
                              Add Option
                            </button>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                            <div>
                              <label className="block text-sm font-medium mb-2">
                                Question
                              </label>

                              <input
                                type="text"
                                value={detail.question}
                                className={inputClass}
                                onChange={(e) =>
                                  updateDetailField(
                                    detailIndex,
                                    "question",
                                    e.target.value,
                                  )
                                }
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium mb-2">
                                Answer
                              </label>

                              <input
                                type="text"
                                value={detail.answer}
                                className={inputClass}
                                onChange={(e) =>
                                  updateDetailField(
                                    detailIndex,
                                    "answer",
                                    e.target.value,
                                  )
                                }
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium mb-2">
                                Value
                              </label>

                              <input
                                type="text"
                                value={detail.value}
                                className={inputClass}
                                onChange={(e) =>
                                  updateDetailField(
                                    detailIndex,
                                    "value",
                                    e.target.value,
                                  )
                                }
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium mb-2">
                                Label
                              </label>

                              <input
                                type="text"
                                value={detail.label}
                                className={inputClass}
                                onChange={(e) =>
                                  updateDetailField(
                                    detailIndex,
                                    "label",
                                    e.target.value,
                                  )
                                }
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium mb-2">
                                Type
                              </label>

                              <select
                                value={detail.type}
                                className={inputClass}
                                onChange={(e) =>
                                  updateDetailField(
                                    detailIndex,
                                    "type",
                                    e.target.value,
                                  )
                                }
                              >
                                <option value="text">Text</option>
                                <option value="radio">Radio</option>
                                <option value="checkbox">Checkbox</option>
                                <option value="select">Select</option>
                              </select>
                            </div>
                          </div>

                          <div className="space-y-4">
                            {detail.options.map((option, optionIndex) => (
                              <div
                                key={optionIndex}
                                className="p-4 border rounded-xl bg-gray-50 relative"
                              >
                                <button
                                  type="button"
                                  onClick={() =>
                                    removeOption(detailIndex, optionIndex)
                                  }
                                  className="absolute top-2 right-2 p-2 text-red-500 hover:bg-red-50 rounded-lg"
                                >
                                  <Trash2 size={16} />
                                </button>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pr-10">
                                  <div>
                                    <label className="block text-sm font-medium mb-2">
                                      Value
                                    </label>

                                    <input
                                      type="text"
                                      value={option.value}
                                      className={inputClass}
                                      onChange={(e) =>
                                        updateOption(
                                          detailIndex,
                                          optionIndex,
                                          "value",
                                          e.target.value,
                                        )
                                      }
                                    />
                                  </div>

                                  <div>
                                    <label className="block text-sm font-medium mb-2">
                                      Label
                                    </label>

                                    <input
                                      type="text"
                                      value={option.label}
                                      className={inputClass}
                                      onChange={(e) =>
                                        updateOption(
                                          detailIndex,
                                          optionIndex,
                                          "label",
                                          e.target.value,
                                        )
                                      }
                                    />
                                  </div>

                                  <div>
                                    <label className="block text-sm font-medium mb-2">
                                      Type
                                    </label>

                                    <select
                                      value={option.type}
                                      className={inputClass}
                                      onChange={(e) =>
                                        updateOption(
                                          detailIndex,
                                          optionIndex,
                                          "type",
                                          e.target.value,
                                        )
                                      }
                                    >
                                      <option value="">Select Type</option>
                                      <option value="text">Text</option>
                                      <option value="radio">Radio</option>
                                      <option value="checkbox">Checkbox</option>
                                      <option value="select">Select</option>
                                    </select>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="bg-white p-5 rounded-xl border">
                          <h4 className="font-semibold mb-4">
                            Additional Content
                          </h4>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium mb-2">
                                Title
                              </label>

                              <input
                                type="text"
                                value={detail.title}
                                className={inputClass}
                                onChange={(e) =>
                                  updateDetailField(
                                    detailIndex,
                                    "title",
                                    e.target.value,
                                  )
                                }
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium mb-2">
                                URL
                              </label>

                              <input
                                type="text"
                                value={detail.url}
                                className={inputClass}
                                onChange={(e) =>
                                  updateDetailField(
                                    detailIndex,
                                    "url",
                                    e.target.value,
                                  )
                                }
                              />
                            </div>

                            <div className="md:col-span-2">
                              <label className="block text-sm font-medium mb-2">
                                Subtitle
                              </label>

                              <CKEditorComponent
                                value={detail.subtitle}
                                onChange={(data: string) =>
                                  updateDetailField(
                                    detailIndex,
                                    "subtitle",
                                    data,
                                  )
                                }
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium mb-2">
                                Button Text
                              </label>

                              <input
                                type="text"
                                value={detail.buttontext}
                                className={inputClass}
                                onChange={(e) =>
                                  updateDetailField(
                                    detailIndex,
                                    "buttontext",
                                    e.target.value,
                                  )
                                }
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                <button
                  type="button"
                  onClick={addBlogDetail}
                  className="w-full py-4 border-2 border-dashed border-blue-300 rounded-xl text-blue-600 hover:bg-blue-50 flex items-center justify-center gap-2 font-medium transition"
                >
                  <Plus size={20} />
                  Add Blog Detail Section
                </button>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => router.push("/admin/pages/Blogs")}
              className="px-6 py-3 border rounded-xl hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={() => handleSubmit()}
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-blue-700 disabled:opacity-50"
            >
              <Save size={18} />

              {loading ? "Saving..." : editSlug ? "Update Blog" : "Save Blog"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function BlogForm() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading form...</div>}>
      <BlogFormContent />
    </Suspense>
  );
}







// "use client";

// import React, { useEffect, useState, Suspense } from "react";
// import dynamic from "next/dynamic";
// import { Plus, Save, Edit, ChevronLeft } from "lucide-react";
// import { pageData } from "@/app/lib/pageData";
// import { getBlogCategory, getBlogBySlug } from "@/app/services/api";
// import { slugify } from "@/app/lib/slug";
// import { useRouter, useSearchParams } from "next/navigation";
// import axiosInstance from "@/app/lib/axios";

// const CKEditorComponent = dynamic(() => import("../../../components/ckEditor"), {
//   ssr: false,
//   loading: () => (
//     <div className="p-4 border rounded-lg bg-gray-50">Loading editor...</div>
//   ),
// });

// const BlogFormContent = () => {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const editSlug = searchParams.get("slug");

//   const [activeSection, setActiveSection] = useState<string | null>("basic-info");
//   const [values, setValues] = useState<Record<string, any>>({});
//   const [categories, setCategories] = useState<any[]>([]);
//   const [loading, setLoading] = useState(false);
//   const formData = pageData.blogdetails;

//   const [authors, setAuthors] = useState<any[]>([]);
//   const fetchAuthors = async () => {
//     try {

//       const res = await axiosInstance.get('/admin/auther');

//       console.log("Authors:", res.data);

//       setAuthors(res?.data.data || []);
//     } catch (error) {
//       console.error("Failed to fetch authors:", error);
//     } finally {
//       console.log(false);
//     }
//   };

//   useEffect(() => {
//     fetchAuthors();
//   }, []);

//   // Fetch categories and blog if editing
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const catRes = await getBlogCategory();
//         setCategories(catRes?.data || []);

//         if (editSlug) {
//           setLoading(true);
//           const blogData = await getBlogBySlug(editSlug);

//           if (blogData) {
//             // Map flat blogData to section-based values
//             const initialValues: Record<string, any> = {};
//             formData.sections.forEach((section: any) => {
//               initialValues[section.name] = {};
//               section.fields.forEach((field: any) => {
//                 if (blogData[field.name] !== undefined) {
//                   initialValues[section.name][field.name] = blogData[field.name];
//                 }
//               });
//             });
//             setValues(initialValues);
//           }
//         }
//       } catch (err) {
//         console.error("Error fetching data:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, [editSlug]);

//   const handleInputChange = (sectionName: string, fieldName: string, value: any) => {
//     setValues((prev) => {
//       const sectionValues = prev[sectionName] || {};

//       // Auto-generate slug if title changes AND we are not editing
//       let updatedSection = { ...sectionValues, [fieldName]: value };
//       // if (fieldName === "title" && sectionName === "basic-info" && !editSlug) {
//       //   updatedSection.slug = slugify(value);
//       // }

//       return {
//         ...prev,
//         [sectionName]: updatedSection,
//       };
//     });
//   };

//   const saveFile = async (
//     e: React.ChangeEvent<HTMLInputElement>,
//     sectionName: string,
//     fieldName: string
//   ) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     setLoading(true);
//     const data = new FormData();
//     data.append("file", file);

//     try {
//       const response = await fetch("/api/admin/uploadimg", {
//         method: "POST",
//         body: data,
//       });
//       const res = await response.json();

//       setValues((prev) => {
//         const sectionValues = prev[sectionName] || {};
//         return {
//           ...prev,
//           [sectionName]: { ...sectionValues, [fieldName]: res.url },
//         };
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const renderField = (field: any, sectionName: string) => {
//     const sectionValues = values[sectionName] || {};
//     const value = sectionValues[field.name] || "";

//     const baseInputClasses =
//       "w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all";

//       if (field.name === "author") {
//   const selectedAuthorSlug =
//     sectionValues.authslug ||
//     authors.find((author: any) => author.name === value)?.slug ||
//     "";

//   return (
//     <select
//       value={selectedAuthorSlug}
//       className={baseInputClasses}
//       onChange={(e) => {
//         const selectedAuthor = authors.find(
//           (author: any) => author.slug === e.target.value
//         );

//         handleInputChange(
//           sectionName,
//           "author",
//           selectedAuthor?.name || ""
//         );

//         handleInputChange(
//           sectionName,
//           "authslug",
//           selectedAuthor?.slug || ""
//         );
//       }}
//     >
//       <option value="">Select Author</option>

//       {authors.map((author: any) => (
//         <option key={author.slug} value={author.slug}>
//           {author.name}
//         </option>
//       ))}
//     </select>
//   );
// }

//     if (field.name === "category") {
//       return (
//         <select
//           value={value}
//           className={baseInputClasses}
//           onChange={(e) => handleInputChange(sectionName, field.name, e.target.value)}
//         >
//           <option value="">Select Category</option>
//           {categories.map((cat: any) => (
//             <option key={cat._id} value={cat.name}>
//               {cat.name}
//             </option>
//           ))}
//         </select>
//       );
//     }

//     if (field.name === "tags") {
//       return (
//         <input
//           type="text"
//           value={Array.isArray(value) ? value.join(", ") : value}
//           className={baseInputClasses}
//           onChange={(e) => {
//             const arr = e.target.value.split(",").map(s => s.trim()).filter(s => s);
//             handleInputChange(sectionName, field.name, arr);
//           }}
//           placeholder={field.placeholder}
//         />
//       );
//     }

//     switch (field.type) {
//       case "text":
//       case "number":
//       case "date":
//       case "textarea":
//         return field.type === "textarea" ? (
//           <textarea
//             value={value}
//             className={baseInputClasses}
//             rows={4}
//             onChange={(e) => handleInputChange(sectionName, field.name, e.target.value)}
//             placeholder={field.placeholder}
//           />
//         ) : (
//           <input
//             type={field.type}
//             value={value}
//             disabled={field.name === "slug" && !!editSlug} // Don't allow editing slug if already created
//             className={`${baseInputClasses} ${field.name === "slug" && editSlug ? "bg-gray-100 text-gray-500 cursor-not-allowed" : ""}`}
//             onChange={(e) => handleInputChange(sectionName, field.name, e.target.value)}
//             placeholder={field.placeholder}
//           />
//         );

//       case "editor":
//         return (
//           <CKEditorComponent
//             value={value}
//             onChange={(data: string) => handleInputChange(sectionName, field.name, data)}
//           />
//         );

//       case "file":
//         return (
//           <div className="space-y-3">
//             <input
//               type="file"
//               accept={field.accept}
//               onChange={(e) => saveFile(e, sectionName, field.name)}
//               className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
//             />
//             {value && (
//               <img src={value} className="h-20 rounded-lg border" alt="Preview" />
//             )}
//           </div>
//         );

//       case "select":
//         return (
//           <select
//             value={value}
//             className={baseInputClasses}
//             onChange={(e) => handleInputChange(sectionName, field.name, e.target.value)}
//           >
//             <option value="">Select {field.label}</option>
//             {field.option?.map((opt: any, i: number) => (
//               <option key={i} value={opt}>
//                 {opt}
//               </option>
//             ))}
//           </select>
//         );

//       default:
//         return null;
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const payload: any = {};
//       Object.keys(values).forEach((section) => {
//         Object.assign(payload, values[section]);
//       });

//       const url = editSlug ? `/api/admin/blogs/${editSlug}` : "/api/admin/blogs";
//       const method = editSlug ? "PUT" : "POST";

//       const response = await fetch(url, {
//         method,
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || `Failed to ${editSlug ? "update" : "create"} blog`);
//       }

//       alert(`Blog ${editSlug ? "updated" : "created"} successfully!`);
//       router.push("/admin/pages/Blogs");
//     } catch (error: any) {
//       console.error(`Error ${editSlug ? "updating" : "creating"} blog:`, error);
//       alert(error.message || `Error ${editSlug ? "updating" : "creating"} blog`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!formData) return <div className="p-8 text-center">Loading form data...</div>;

//   return (
//     <div className="max-w-7xl w-full mx-auto p-6 bg-gray-100 min-h-screen">
//       <div className="bg-white rounded-2xl shadow-lg">
//         {/* Header */}
//         <div className="border-b px-6 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-4">
//               <button
//                 onClick={() => router.push("/admin/pages/Blogs")}
//                 className="p-2 hover:bg-gray-100 rounded-full transition"
//               >
//                 <ChevronLeft size={24} />
//               </button>
//               <div>
//                 <h1 className="text-2xl font-bold">
//                   {editSlug ? `Edit ${formData.name}` : `Create New ${formData.name}`}
//                 </h1>
//                 <p className="text-gray-600 mt-1">{formData.description}</p>
//               </div>
//             </div>
//             <button
//               onClick={handleSubmit}
//               disabled={loading}
//               className="bg-blue-600 text-white px-6 py-2 rounded-xl flex items-center gap-2 hover:bg-blue-700 transition-colors disabled:opacity-50"
//             >
//               <Save size={18} />
//               {loading ? "Saving..." : editSlug ? "Update Blog" : "Save Blog"}
//             </button>
//           </div>
//         </div>

//         {/* Content */}
//         <div className="p-6">
//           <div className="mt-2 space-y-4">
//             {formData.sections.map((ele: any, idx: number) => (
//               <div key={idx} className="bg-white rounded-2xl shadow-sm border">
//                 <div
//                   onClick={() =>
//                     setActiveSection(activeSection === ele?.name ? null : ele?.name)
//                   }
//                   className="flex justify-between items-center p-5 cursor-pointer hover:bg-gray-50 rounded-2xl transition"
//                 >
//                   <span className="font-semibold text-gray-800">{ele?.label}</span>
//                   <Edit size={18} className="text-gray-500" />
//                 </div>

//                 {activeSection === ele?.name && (
//                   <div className="border-t p-5">
//                     <div className="space-y-5">
//                       {ele.fields.map((field: any) => (
//                         <div key={field.name}>
//                           <label className="block text-sm font-medium mb-2">
//                             {field.label}
//                             {field.required && (
//                               <span className="text-red-500 ml-1">*</span>
//                             )}
//                           </label>
//                           {renderField(field, ele.name)}
//                           {field.placeholder &&
//                             field.type !== "text" &&
//                             field.type !== "textarea" && (
//                               <p className="text-sm text-gray-500 mt-1">
//                                 {field.placeholder}
//                               </p>
//                             )}
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default function BlogForm() {
//   return (
//     <Suspense fallback={<div className="p-8 text-center">Loading form...</div>}>
//       <BlogFormContent />
//     </Suspense>
//   );
// }
