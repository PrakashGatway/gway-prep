"use client";

import React, { useEffect, useState, Suspense } from "react";
import dynamic from "next/dynamic";
import { Plus, Save, Edit, ChevronLeft } from "lucide-react";
import { pageData } from "@/app/lib/pageData";
import { getBlogCategory, getBlogBySlug } from "@/app/services/api";
import { slugify } from "@/app/lib/slug";
import { useRouter, useSearchParams } from "next/navigation";

const CKEditorComponent = dynamic(() => import("../../../components/ckEditor"), {
  ssr: false,
  loading: () => (
    <div className="p-4 border rounded-lg bg-gray-50">Loading editor...</div>
  ),
});

const BlogFormContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editSlug = searchParams.get("slug");

  const [activeSection, setActiveSection] = useState<string | null>("basic-info");
  const [values, setValues] = useState<Record<string, any>>({});
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const formData = pageData.blogdetails;

  // Fetch categories and blog if editing
  useEffect(() => {
    const fetchData = async () => {
      try {
        const catRes = await getBlogCategory();
        setCategories(catRes?.data || []);

        if (editSlug) {
          setLoading(true);
          const blogData = await getBlogBySlug(editSlug);

          if (blogData) {
            // Map flat blogData to section-based values
            const initialValues: Record<string, any> = {};
            formData.sections.forEach((section: any) => {
              initialValues[section.name] = {};
              section.fields.forEach((field: any) => {
                if (blogData[field.name] !== undefined) {
                  initialValues[section.name][field.name] = blogData[field.name];
                }
              });
            });
            setValues(initialValues);
          }
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [editSlug]);

  const handleInputChange = (sectionName: string, fieldName: string, value: any) => {
    setValues((prev) => {
      const sectionValues = prev[sectionName] || {};

      // Auto-generate slug if title changes AND we are not editing
      let updatedSection = { ...sectionValues, [fieldName]: value };
      if (fieldName === "title" && sectionName === "basic-info" && !editSlug) {
        updatedSection.slug = slugify(value);
      }

      return {
        ...prev,
        [sectionName]: updatedSection,
      };
    });
  };

  const saveFile = async (
    e: React.ChangeEvent<HTMLInputElement>,
    sectionName: string,
    fieldName: string
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    const data = new FormData();
    data.append("file", file);

    try {
      const response = await fetch("/api/admin/uploadimg", {
        method: "POST",
        body: data,
      });
      const res = await response.json();

      setValues((prev) => {
        const sectionValues = prev[sectionName] || {};
        return {
          ...prev,
          [sectionName]: { ...sectionValues, [fieldName]: res.url },
        };
      });
    } finally {
      setLoading(false);
    }
  };

  const renderField = (field: any, sectionName: string) => {
    const sectionValues = values[sectionName] || {};
    const value = sectionValues[field.name] || "";

    const baseInputClasses =
      "w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all";

    if (field.name === "category") {
      return (
        <select
          value={value}
          className={baseInputClasses}
          onChange={(e) => handleInputChange(sectionName, field.name, e.target.value)}
        >
          <option value="">Select Category</option>
          {categories.map((cat: any) => (
            <option key={cat._id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>
      );
    }

    if (field.name === "tags") {
      return (
        <input
          type="text"
          value={Array.isArray(value) ? value.join(", ") : value}
          className={baseInputClasses}
          onChange={(e) => {
            const arr = e.target.value.split(",").map(s => s.trim()).filter(s => s);
            handleInputChange(sectionName, field.name, arr);
          }}
          placeholder={field.placeholder}
        />
      );
    }

    switch (field.type) {
      case "text":
      case "number":
      case "date":
      case "textarea":
        return field.type === "textarea" ? (
          <textarea
            value={value}
            className={baseInputClasses}
            rows={4}
            onChange={(e) => handleInputChange(sectionName, field.name, e.target.value)}
            placeholder={field.placeholder}
          />
        ) : (
          <input
            type={field.type}
            value={value}
            disabled={field.name === "slug" && !!editSlug} // Don't allow editing slug if already created
            className={`${baseInputClasses} ${field.name === "slug" && editSlug ? "bg-gray-100 text-gray-500 cursor-not-allowed" : ""}`}
            onChange={(e) => handleInputChange(sectionName, field.name, e.target.value)}
            placeholder={field.placeholder}
          />
        );

      case "editor":
        return (
          <CKEditorComponent
            value={value}
            onChange={(data: string) => handleInputChange(sectionName, field.name, data)}
          />
        );

      case "file":
        return (
          <div className="space-y-3">
            <input
              type="file"
              accept={field.accept}
              onChange={(e) => saveFile(e, sectionName, field.name)}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {value && (
              <img src={value} className="h-20 rounded-lg border" alt="Preview" />
            )}
          </div>
        );

      case "select":
        return (
          <select
            value={value}
            className={baseInputClasses}
            onChange={(e) => handleInputChange(sectionName, field.name, e.target.value === 'true')}
          >
            <option value="">Select {field.label}</option>
            {field.option?.map((opt: any, i: number) => (
              <option key={i} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        );

      default:
        return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload: any = {};
      Object.keys(values).forEach((section) => {
        Object.assign(payload, values[section]);
      });

      const url = editSlug ? `/api/admin/blogs/${editSlug}` : "/api/admin/blogs";
      const method = editSlug ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Failed to ${editSlug ? "update" : "create"} blog`);
      }

      alert(`Blog ${editSlug ? "updated" : "created"} successfully!`);
      router.push("/admin/pages/Blogs");
    } catch (error: any) {
      console.error(`Error ${editSlug ? "updating" : "creating"} blog:`, error);
      alert(error.message || `Error ${editSlug ? "updating" : "creating"} blog`);
    } finally {
      setLoading(false);
    }
  };

  if (!formData) return <div className="p-8 text-center">Loading form data...</div>;

  return (
    <div className="max-w-7xl w-full mx-auto p-6 bg-gray-100 min-h-screen">
      <div className="bg-white rounded-2xl shadow-lg">
        {/* Header */}
        <div className="border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push("/admin/pages/Blogs")}
                className="p-2 hover:bg-gray-100 rounded-full transition"
              >
                <ChevronLeft size={24} />
              </button>
              <div>
                <h1 className="text-2xl font-bold">
                  {editSlug ? `Edit ${formData.name}` : `Create New ${formData.name}`}
                </h1>
                <p className="text-gray-600 mt-1">{formData.description}</p>
              </div>
            </div>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-2 rounded-xl flex items-center gap-2 hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              <Save size={18} />
              {loading ? "Saving..." : editSlug ? "Update Blog" : "Save Blog"}
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mt-2 space-y-4">
            {formData.sections.map((ele: any, idx: number) => (
              <div key={idx} className="bg-white rounded-2xl shadow-sm border">
                <div
                  onClick={() =>
                    setActiveSection(activeSection === ele?.name ? null : ele?.name)
                  }
                  className="flex justify-between items-center p-5 cursor-pointer hover:bg-gray-50 rounded-2xl transition"
                >
                  <span className="font-semibold text-gray-800">{ele?.label}</span>
                  <Edit size={18} className="text-gray-500" />
                </div>

                {activeSection === ele?.name && (
                  <div className="border-t p-5">
                    <div className="space-y-5">
                      {ele.fields.map((field: any) => (
                        <div key={field.name}>
                          <label className="block text-sm font-medium mb-2">
                            {field.label}
                            {field.required && (
                              <span className="text-red-500 ml-1">*</span>
                            )}
                          </label>
                          {renderField(field, ele.name)}
                          {field.placeholder &&
                            field.type !== "text" &&
                            field.type !== "textarea" && (
                              <p className="text-sm text-gray-500 mt-1">
                                {field.placeholder}
                              </p>
                            )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
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
