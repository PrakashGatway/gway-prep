"use client";

import React, { useEffect, useState } from "react";
import { pageData } from "@/app/lib/pageData";
import dynamic from "next/dynamic";
import { useRouter, useParams } from "next/navigation";
import { uploadImage } from "@/app/services/api";
import axiosInstance from "@/app/lib/axios";

const CKEditorComponent = dynamic(
  () => import("../../../components/ckEditor"),
  {
    ssr: false,
    loading: () => (
      <div className="p-4 border rounded bg-gray-50">
        Loading Rich Editor...
      </div>
    ),
  },
);

const EditorForm = () => {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  
  const formData = pageData.student.sections;
  const [values, setValues] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  // Fetch student data when ID exists and is not 'add'
  useEffect(() => {
    if (id && id !== 'add') {
      fetchStudent(id);
    } else {
      setInitialLoading(false);
    }
  }, [id]);

  async function fetchStudent(studentId: string) {
    try {
      setInitialLoading(true);
      // console.log("Fetching student with ID:", studentId);
      
      const res = await axiosInstance.get(`/admin/student/${studentId}`);
      // console.log("Student data:", res.data);
      
      // Populate form fields with fetched data
      if (res.data && res.data.data) {
        const studentData = res.data.data;
        setValues(studentData);
      }
    } catch (error) {
      console.error("Error fetching student:", error);
    } finally {
      setInitialLoading(false);
    }
  }

  if (!formData) {
    return <div className="p-10">Section configuration not found.</div>;
  }

  if (initialLoading) {
    return (
      <div className="p-10 flex justify-center items-center h-64">
        <div className="text-gray-600">Loading student data...</div>
      </div>
    );
  }

  const handleInputChange = (name: string, e: any) => {
    let value;
    if (e?.target) {
      if (e.target.type === "file") {
        value = e.target.files[0];
      } else {
        value = e.target.value;
      }
    } else {
      // Handle direct values (from CKEditor)
      value = e;
    }

    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // console.log("Submitting values:", values);
      
      const payload = {
        ...values,
        seoKeywords: Array.isArray(values.seoKeywords)
          ? values.seoKeywords
          : String(values.seoKeywords || "")
              .split(",")
              .map((keyword) => keyword.trim())
              .filter(Boolean),
      };
      if (id === 'add' || !id) {
        // Create new student
        const res = await axiosInstance.post("/admin/student", payload);
        // console.log("Created student:", res.data);
        
        if (res.data.message === "Student created successfully.") {
          router.push('/admin/pages/student');
        }
      } else {
        // Update existing student
        const res = await axiosInstance.put("/admin/student", { 
          id, 
          ...payload 
        });
        // console.log("Updated student:", res.data);
        
        if (res.data.message === "Student updated successfully.") {
          router.push('/admin/pages/student');
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while saving. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const saveFile = async (
    name: string,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (!e.target.files || e.target.files.length === 0) {
      alert("Please select a file first");
      return;
    }

    setLoading(true);
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await uploadImage(formData);
      // console.log("Uploaded file URL:", res.url);
      
      // Update the specific field with the uploaded file URL
      setValues((prev) => ({ ...prev, [name]: res.url }));
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload file. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Helper function to render the appropriate input field
  const renderField = (field: any) => {
    const value = field.name === "seoKeywords"
      ? (Array.isArray(values[field.name]) ? values[field.name].join(", ") : values[field.name] || "")
      : values[field.name] || '';

    switch (field.type) {
      case "text":
      case "number":
        return (
          <input
            type={field.type}
            name={field.name}
            value={value}
            placeholder={field.placeholder}
            className="w-full rounded-lg border border-gray-300 p-2.5 text-sm outline-none transition focus:ring-2 focus:ring-blue-500"
            onChange={(e) => handleInputChange(field.name, e)}
          />
        );

      case "textarea":
        return (
          <textarea
            name={field.name}
            value={value}
            placeholder={field.placeholder}
            className="h-28 w-full rounded-lg border border-gray-300 p-2.5 text-sm outline-none transition focus:ring-2 focus:ring-blue-500"
            onChange={(e) => handleInputChange(field.name, e)}
          />
        );

      case "editor":
        return (
          <div className="prose-sm ck-custom-editor">
            <CKEditorComponent
              value={value}
              onChange={(data: string) => handleInputChange(field.name, data)}
              placeholder={field.placeholder}
            />
          </div>
        );

      case "faq-list": {
        const faqs = Array.isArray(value) ? value : [];
        const updateFaq = (index: number, key: "question" | "answer", nextValue: string) => {
          handleInputChange(
            field.name,
            faqs.map((faq: any, faqIndex: number) =>
              faqIndex === index ? { ...faq, [key]: nextValue } : faq,
            ),
          );
        };

        return (
          <div className="space-y-4">
            {faqs.map((faq: any, index: number) => (
              <div key={index} className="grid gap-2 rounded-lg border border-gray-200 bg-gray-50 p-3 md:grid-cols-[1fr_1fr_auto]">
                <input
                  type="text"
                  value={faq?.question || ""}
                  placeholder={`Question ${index + 1}`}
                  aria-label={`FAQ question ${index + 1}`}
                  className="w-full rounded-lg border border-gray-300 bg-white p-2 text-sm outline-none transition focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => updateFaq(index, "question", e.target.value)}
                />
                <textarea
                  value={faq?.answer || ""}
                  placeholder="Answer"
                  aria-label={`FAQ answer ${index + 1}`}
                  className="h-20 w-full rounded-lg border border-gray-300 bg-white p-2 text-sm outline-none transition focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => updateFaq(index, "answer", e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => handleInputChange(field.name, faqs.filter((_: any, faqIndex: number) => faqIndex !== index))}
                  className="h-9 rounded-lg border border-red-200 px-3 text-xs font-semibold text-red-600 transition hover:bg-red-50"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => handleInputChange(field.name, [...faqs, { question: "", answer: "" }])}
              className="rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-700 transition hover:bg-blue-100"
            >
              Add FAQ
            </button>
          </div>
        );
      }

      case "file":
        return (
          <div>
            {value && (
              <div className="mb-2">
                <p className="text-sm text-gray-600">Current file: {value}</p>
                {value.startsWith('http') && (
                  <img 
                    src={value} 
                    alt="Current file" 
                    className="h-20 w-20 object-cover rounded-lg mt-1"
                  />
                )}
              </div>
            )}
            <input
              type="file"
              accept={field.accept}
              onChange={(e) => saveFile(field.name, e)}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2.5 
              file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition cursor-pointer"
            />
          </div>
        );

      case "select":
        return (
          <select 
            name={field.name}
            value={value}
            className="w-full rounded-lg border border-gray-300 p-2.5 text-sm outline-none transition focus:ring-2 focus:ring-blue-500"
            onChange={(e) => handleInputChange(field.name, e)}
          >
            <option value="">Select an option</option>
            {field?.option?.map((ele: string, idx: number) => (
              <option key={idx} value={ele}>
                {ele}
              </option>
            ))}
          </select>
        );

      default:
        return null;
    }
  };

  return (
    <div className="m-1 h-[90vh] overflow-y-auto rounded-xl border border-gray-100 bg-white p-4 shadow-lg sm:p-5">
      <header className="mb-5 border-b pb-3">
        <h1 className="text-lg font-extrabold text-gray-900 sm:text-xl">
          {id && id !== 'add' ? 'Edit Student' : 'Add Student'}
        </h1>
        <p className="text-xs text-gray-500 sm:text-sm">
          {id && id !== 'add' ? 'Edit the student information.' : 'Add new student information.'}
        </p>
      </header>

      <form className="space-y-4" onSubmit={handleSubmit}>
        {(() => {
          const fields = formData[0]?.fields || [];
          const groups = [
            { title: "General information", description: "Basic student and exam details.", names: ["name", "course", "score", "university", "rating"] },
            { title: "SEO details", description: "Manage how this student story appears in search results.", names: ["seoTitle", "metaDescription", "seoKeywords", "slug"] },
            { title: "Media and links", description: "Add images, alt text, video, and call-to-action links.", names: ["image", "imageAlt", "heroImage", "heroImageAlt", "universityLogo", "universityLogoAlt", "video", "button1Text", "button1Url", "button2Text", "button2Url", "type"] },
            { title: "Student story", description: "Add the story content and frequently asked questions.", names: ["title", "subtitle", "about", "help", "outcome", "message", "messageDate", "faqs"] },
          ];
          const used = new Set(groups.flatMap((group) => group.names));
          const renderFieldBlock = (field: any) => (
            <div key={field.name} className="flex min-w-0 flex-col gap-1.5">
              <label className="flex items-center gap-1 text-xs font-bold text-gray-700">
                {field.label}{field.required && <span className="text-red-500">*</span>}
              </label>
              {renderField(field)}
              {field.name === "slug" && <p className="text-[11px] leading-4 text-gray-500">Used for a published case study URL.</p>}
            </div>
          );
          return (
            <>
              {groups.map((group) => {
                const groupFields = fields.filter((field: any) => group.names.includes(field.name));
                if (!groupFields.length) return null;
                return (
                  <section key={group.title} className="rounded-lg border border-gray-100 bg-gray-50/50 p-3 sm:p-4">
                    <div className="mb-3">
                      <h2 className="text-sm font-bold text-gray-900">{group.title}</h2>
                      <p className="mt-0.5 text-[11px] text-gray-500">{group.description}</p>
                    </div>
                    <div className={group.title === "Student story" ? "space-y-3" : "grid gap-3 md:grid-cols-2"}>{groupFields.map(renderFieldBlock)}</div>
                  </section>
                );
              })}
              {fields.filter((field: any) => !used.has(field.name)).map(renderFieldBlock)}
            </>
          );
        })()}

        <div className="flex flex-col gap-2 border-t pt-4 sm:flex-row sm:space-x-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-500 px-6 py-2.5 text-sm font-bold text-white shadow-md transition-all hover:bg-blue-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 md:w-auto"
          >
            {loading ? "Saving..." : (id && id !== 'add' ? 'Update Student' : 'Create Student')}
          </button>

          <button
            onClick={() => router.back()}
            className="w-full rounded-lg bg-red-500 px-6 py-2.5 text-sm font-bold text-white shadow-md transition-all hover:bg-red-700 active:scale-95 md:w-auto"
            type="button"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditorForm;
