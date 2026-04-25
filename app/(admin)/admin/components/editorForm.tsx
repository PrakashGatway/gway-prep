"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Plus, Trash2, Save, Settings, Layout, Edit, ChevronDown, ChevronUp } from "lucide-react";
import { pageData } from "@/app/lib/pageData";
import { getPageInfo, getStudent } from "@/app/services/api";
import { set } from "mongoose";
import { slugify } from "@/app/lib/slug";

const CKEditorComponent = dynamic(() => import("./ckEditor"), {
  ssr: false,
  loading: () => (
    <div className="p-4 border rounded-lg bg-gray-50">Loading editor...</div>
  ),
});

interface PageProps {
  slug: string;
  page?: any;
}

interface GeneralInfo {
  title: string;
  description: string;
  keywords: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  canonicalUrl: string;
  isPublished: boolean;
  publishedAt: string;
  template: string;
}

const EditorForm = ({ slug }: PageProps) => {
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [values, setValues] = useState<Record<string, any>>({});
  const [generalInfo, setGeneralInfo] = useState<GeneralInfo>({
    title: "",
    description: "",
    keywords: "",
    ogTitle: "",
    ogDescription: "",
    ogImage: "",
    canonicalUrl: "",
    isPublished: false,
    publishedAt: "",
    template: "",
  });
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [activeTab, setActiveTab] = useState<"general" | "sections">("general");
  const [temp, setTemp] = useState("");
  const [formData, setformData] = useState<any>(null);

  // Fetch students
  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await getStudent();
        setStudents(res?.data || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchStudent();
  }, []);

  
  useEffect(() => {
    if (slug === "new") return;

    const getData = async () => {
      try {
        const res = await getPageInfo(slug);
        const data = res;
        console.log("Fetched page data:", data);
        // Set general info
        if (data.seoMeta) {
          setGeneralInfo(data.seoMeta);
          setTemp(data.seoMeta.template);
        }
        
        // Set section values
        if (data.sections) {
          const sectionValues: Record<string, any> = {};
          Object.keys(data.sections).forEach(key => {
            sectionValues[key] = data.sections[key].fields || {};
          });
          setValues(sectionValues);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getData();
  }, [slug]);


  useEffect(() => {
    
    let formData = null;
    if (slug === "new") {
      formData = selectedKey ? pageData[selectedKey] : null;
    } else {
      const key = Object.keys(pageData).find(k => pageData[k].name === temp);
      formData = key ? pageData[key] : null;
    }

    setformData(formData);
  }, [slug, selectedKey, temp]);


  // Initialize first section as active
  useEffect(() => {
    if (formData?.sections?.length > 0 && !activeSection) {
      setActiveSection(formData.sections[0].name);
    }
  }, [formData]);

  // General Info Handlers
  const handleGeneralInfoChange = (field: keyof GeneralInfo, value: any) => {
    setGeneralInfo(prev => ({ ...prev, [field]: value }));
  };

  // Section Input Handler
  const handleInputChange = (
    sectionName: string,
    fieldName: string,
    value: any,
    repeaterIndex?: number
  ) => {
    setValues((prev) => {
      const sectionValues = prev[sectionName] || {};
      
      if (repeaterIndex !== undefined) {
        const existing = [...(sectionValues[fieldName] || [])];
        existing[repeaterIndex] = value;
        return {
          ...prev,
          [sectionName]: { ...sectionValues, [fieldName]: existing }
        };
      }

      return {
        ...prev,
        [sectionName]: { ...sectionValues, [fieldName]: value }
      };
    });
  };

  // Repeater Handlers
  const addRepeaterItem = (sectionName: string, fieldName: string) => {
    setValues((prev) => {
      const sectionValues = prev[sectionName] || {};
      return {
        ...prev,
        [sectionName]: {
          ...sectionValues,
          [fieldName]: [...(sectionValues[fieldName] || []), {}]
        }
      };
    });
  };

  const removeRepeaterItem = (sectionName: string, fieldName: string, index: number) => {
    setValues((prev) => {
      const sectionValues = prev[sectionName] || {};
      return {
        ...prev,
        [sectionName]: {
          ...sectionValues,
          [fieldName]: sectionValues[fieldName].filter((_: any, i: number) => i !== index)
        }
      };
    });
  };

  // File Upload
  const saveFile = async (
    e: React.ChangeEvent<HTMLInputElement>,
    sectionName: string,
    fieldName: string,
    repeaterIndex?: number,
    repeaterName?: string
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
        
        if (repeaterIndex !== undefined && repeaterName) {
          const updated = [...(sectionValues[repeaterName] || [])];
          updated[repeaterIndex] = {
            ...(updated[repeaterIndex] || {}),
            [fieldName]: res.url,
          };
          return {
            ...prev,
            [sectionName]: { ...sectionValues, [repeaterName]: updated }
          };
        }

        return {
          ...prev,
          [sectionName]: { ...sectionValues, [fieldName]: res.url }
        };
      });
    } finally {
      setLoading(false);
    }
  };

  // Save OG Image
  const saveOGImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
      handleGeneralInfoChange("ogImage", res.url);
    } finally {
      setLoading(false);
    }
  };

  // Field Render
  const renderField = (
    field: any,
    sectionName: string,
    index?: number,
    parent?: any
  ) => {
    const sectionValues = values[sectionName] || {};
    const value = index !== undefined
      ? sectionValues[parent]?.[index]?.[field.name] || ""
      : sectionValues[field.name] || "";

    const baseInputClasses = "w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all";

    switch (field.type) {
      case "text":
      case "number":
      case "textarea":
        return field.type === "textarea" ? (
          <textarea
            value={value}
            className={baseInputClasses}
            rows={4}
            onChange={(e) => {
              if (index !== undefined) {
                const item = {
                  ...(sectionValues[parent]?.[index] || {}),
                  [field.name]: e.target.value,
                };
                handleInputChange(sectionName, parent!, item, index);
              } else {
                handleInputChange(sectionName, field.name, e.target.value);
              }
            }}
            placeholder={field.placeholder}
          />
        ) : (
          <input
            type={field.type}
            value={value}
            className={baseInputClasses}
            onChange={(e) => {
              if (index !== undefined) {
                const item = {
                  ...(sectionValues[parent]?.[index] || {}),
                  [field.name]: e.target.value,
                };
                handleInputChange(sectionName, parent!, item, index);
              } else {
                handleInputChange(sectionName, field.name, e.target.value);
              }
            }}
            placeholder={field.placeholder}
          />
        );

      case "editor":
        return (
          <CKEditorComponent
            value={value}
            onChange={(data: string) =>
              handleInputChange(sectionName, field.name, data)
            }
          />
        );

      case "file":
        return (
          <div className="space-y-3">
            <input
              type="file"
              accept={field.accept}
              onChange={(e) =>
                saveFile(e, sectionName, field.name, index, parent)
              }
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
            onChange={(e) =>
              handleInputChange(sectionName, field.name, e.target.value)
            }
          >
            <option value="">Select {field.label}</option>
            {(field.option?.length ? field.option : students).map(
              (opt: any, i: number) => (
                <option key={i} value={opt._id || opt}>
                  {opt.name || opt}
                </option>
              )
            )}
          </select>
        );

      case "toggle":
        return (
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={value}
              className="sr-only peer"
              onChange={(e) =>
                handleInputChange(sectionName, field.name, e.target.checked)
              }
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        );

      case "repeater":
        const items = sectionValues[field.name] || [];
        return (
          <div className="space-y-4">
            {items.map((item: any, i: number) => (
              <div key={i} className="p-4 border rounded-xl bg-gray-50 relative">
                <button
                  type="button"
                  onClick={() => removeRepeaterItem(sectionName, field.name, i)}
                  className="absolute top-2 right-2 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 size={16} />
                </button>

                <div className="space-y-3 mt-4">
                  {field.fields.map((f: any) => (
                    <div key={f.name}>
                      <label className="block text-sm font-medium mb-1">
                        {f.label}
                      </label>
                      {renderField(f, sectionName, i, field.name)}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={() => addRepeaterItem(sectionName, field.name)}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              <Plus size={16} /> Add {field.label} Item
            </button>
          </div>
        );

      case "group":
        return (
          <div className="p-4 border rounded-xl bg-gray-50 space-y-3">
            {field.fields.map((f: any) => (
              <div key={f.name}>
                <label className="block text-sm font-medium mb-1">
                  {f.label}
                </label>
                {renderField(f, sectionName)}
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload: any = {
        "name":  generalInfo.canonicalUrl,
        seoMeta: {
          ...generalInfo,
          template: formData?.name || generalInfo.template,
        },
        sections: {},
        
      };

      // Format sections for submission
      if (formData?.sections) {
        formData.sections.forEach((section: any) => {
          payload.sections[section.name] = {
            name: section.name,
            label: section.label,
            fields: values[section.name] || {},
          };
        });
      }

      const endpoint = slug === "new" 
        ? `/api/admin/pageInfo`
        : `/api/admin/pageInfo/${slug.toLowerCase()}`;
      
      const method = slug === "new" ? "POST" : "PUT";

      await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      // Show success message
      alert("Page saved successfully!");
    } catch (error) {
      console.error("Error saving page:", error);
      alert("Error saving page");
    } finally {
      setLoading(false);
    }
  };

  // New Page Template Selection
  if (slug === "new" && !selectedKey) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-6">Select Page Template</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(pageData)
          .filter(([, data]: [string, any]) => data.require)
          .map(([key, data]: [string, any]) => (
            <button
              key={key}
              onClick={() => {
                setSelectedKey(key);
                setGeneralInfo(prev => ({ ...prev, template: data.name }));
              }}
              className="p-6 border rounded-xl hover:border-blue-500 hover:shadow-lg transition-all text-left"
            >
              <h3 className="text-lg font-semibold mb-2">{data.name}</h3>
              <p className="text-gray-600 text-sm">{data.description}</p>
              {data.is_dynamic && (
                <span className="inline-block mt-2 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                  Dynamic Page
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    );
  }

console.log(formData);
  if (!formData) return <div className="p-8 text-center">Loading form data...</div>;

  return (
    <div className="max-w-7xl w-full mx-auto p-2">
      <div className="bg-white rounded-2xl shadow-lg">
        {/* Header */}
        <div className="border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">
                {slug === "new" ? `Create New ${formData.name} Page` : `Edit ${formData.name} Page`}
              </h1>
              <p className="text-gray-600 mt-1">{formData.description}</p>
            </div>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-2 rounded-xl flex items-center gap-2 hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              <Save size={18} />
              {loading ? "Saving..." : "Save Page"}
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b px-6">
          <div className="flex gap-6">
            <button
              onClick={() => {
                setActiveTab("general");
                setShow(false);
              }}
              className={`py-3 px-1 border-b-2 font-medium transition-colors ${
                activeTab === "general"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              <Settings size={18} className="inline mr-2" />
              General Information
            </button>
            <button
              onClick={() => {
                setActiveTab("sections");
                setShow(false);
              }}
              className={`py-3 px-1 border-b-2 font-medium transition-colors ${
                activeTab === "sections"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              <Layout size={18} className="inline mr-2" />
              Page Sections
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {activeTab === "general" ? (
            // General Information Tab
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Page Title (SEO)
                  </label>
                  <input
                    type="text"
                    value={generalInfo.title}
                    onChange={(e) => handleGeneralInfoChange("title", e.target.value)}
                    className="w-full p-3 border rounded-xl"
                    placeholder="Enter page title"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Template
                  </label>
                  <input
                    type="text"
                    value={generalInfo.template || formData.name}
                    disabled
                    className="w-full p-3 border rounded-xl bg-gray-50"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">
                    Meta Description
                  </label>
                  <textarea
                    value={generalInfo.description}
                    onChange={(e) => handleGeneralInfoChange("description", e.target.value)}
                    className="w-full p-3 border rounded-xl"
                    rows={3}
                    placeholder="Enter meta description"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">
                    Meta Keywords
                  </label>
                  <input
                    type="text"
                    value={generalInfo.keywords}
                    onChange={(e) => handleGeneralInfoChange("keywords", e.target.value)}
                    className="w-full p-3 border rounded-xl"
                    placeholder="keyword1, keyword2, keyword3"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    OG Title
                  </label>
                  <input
                    type="text"
                    value={generalInfo.ogTitle}
                    onChange={(e) => handleGeneralInfoChange("ogTitle", e.target.value)}
                    className="w-full p-3 border rounded-xl"
                    placeholder="Open Graph title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Canonical URL
                  </label>
                  <input
                    type="text"
                    value={generalInfo.canonicalUrl}
                    onChange={(e) => {
                      const value = e.target.value;
                      handleGeneralInfoChange("canonicalUrl", slugify(value));
                    }}
                    className="w-full p-3 border rounded-xl"
                    placeholder="https://example.com/page"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">
                    OG Description
                  </label>
                  <textarea
                    value={generalInfo.ogDescription}
                    onChange={(e) => handleGeneralInfoChange("ogDescription", e.target.value)}
                    className="w-full p-3 border rounded-xl"
                    rows={2}
                    placeholder="Open Graph description"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    OG Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={saveOGImage}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                  {generalInfo.ogImage && (
                    <img src={generalInfo.ogImage} className="mt-3 h-20 rounded-lg" alt="OG Preview" />
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Publishing Status
                  </label>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={generalInfo.isPublished}
                        onChange={(e) => handleGeneralInfoChange("isPublished", e.target.checked)}
                        className="w-5 h-5 text-blue-600 rounded"
                      />
                      <span>Published</span>
                    </label>
                    
                    <input
                      type="datetime-local"
                      value={generalInfo.publishedAt}
                      onChange={(e) => handleGeneralInfoChange("publishedAt", e.target.value)}
                      className="w-full p-3 border rounded-xl"
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            
            <div>
              {!show && (
                <div className="mt-6 space-y-4">
                  {formData?.sections?.map((ele: any, idx: number) => (
                    <div key={idx} className="bg-white rounded-2xl shadow-sm border">
                      <div
                        onClick={() =>
                          setActiveSection(
                            activeSection === ele?.name ? null : ele?.name
                          )
                        }
                        className="flex justify-between items-center p-5 cursor-pointer hover:bg-gray-50 rounded-2xl transition"
                      >
                        <span className="font-semibold text-gray-800">
                          {ele?.label}
                        </span>
                        <Edit size={18} className="text-gray-500" />
                      </div>

                      {activeSection === ele?.name && (
                        <div className="border-t p-5">
                          <div className="space-y-5">
                            {ele.fields.map((field: any) => (
                              <div key={field.name}>
                                <label className="block text-sm font-medium mb-2">
                                  {field.label}
                                  {field.required && <span className="text-red-500 ml-1">*</span>}
                                </label>
                                {renderField(field, ele.name)}
                                {field.placeholder && field.type !== "text" && field.type !== "textarea" && (
                                  <p className="text-sm text-gray-500 mt-1">{field.placeholder}</p>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditorForm;




