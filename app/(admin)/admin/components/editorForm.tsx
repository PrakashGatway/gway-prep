"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import {
  Plus,
  Trash2,
  Save,
  Settings,
  Layout,
  Edit,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
} from "lucide-react";
import { pageData } from "@/app/lib/pageData";
import { getPageInfo, getStudent } from "@/app/services/api";
import { slugify } from "@/app/lib/slug";
import axiosInstance from "@/app/lib/axios";
import { useRouter } from "next/navigation";

const CKEditorComponent = dynamic(() => import("./ckEditor"), {
  ssr: false,
  loading: () => (
    <div className="p-4 border rounded-lg bg-gray-50">Loading editor...</div>
  ),
});

interface PageProps {
  rawText: string;
  page?: any;
}

interface GeneralInfo {
  slug: string;
  title: string;
  description: string;
  keywords: string;
  ogTitle: string;
  navTitle: string;
  navIcon: string;
  navSubtitle: string;
  ogDescription: string;
  ogImage: string;
  canonicalUrl: string;
  isPublished: boolean;
  publishedAt: string;
  template: string;
}

const EditorForm = ({ rawText }: PageProps) => {


const cleanText = decodeURIComponent(decodeURIComponent(rawText));
const slug = cleanText.toLowerCase().replace(/\s+/g, '-');

  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [values, setValues] = useState<Record<string, any>>({});
  const [generalInfo, setGeneralInfo] = useState<GeneralInfo>({
    slug: "",
    title: "",
    description: "",
    keywords: "",
    navTitle: "",
    navIcon: "",
    navSubtitle: "",
    ogTitle: "",
    ogDescription: "",
    ogImage: "",
    canonicalUrl: "",
    isPublished: true,
    publishedAt: "",
    template: "",
  });
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"general" | "sections">("general");
  const [temp, setTemp] = useState("");
  const [formData, setFormData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const Router = useRouter();

  // Fetch students
  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await getStudent();
        setStudents(res?.data || []);
      } catch (err) {
        console.error("Error fetching students:", err);
      }
    };
    fetchStudent();
  }, []);

  useEffect(() => {
    if (slug === "new") {
      if (selectedKey) {
        const data = pageData[selectedKey];
        setFormData(data);
        if (data?.sections?.length > 0) {
          setActiveSection(data.sections[0].name);
        }
        setGeneralInfo((prev) => ({ ...prev, template: data.name }));
      }
      return;
    }

    const getData = async () => {
      try {
        // const res = await getPageInfo(slug);
        const api = await axiosInstance.get(
        `/admin/pageInfo/${slug}`
      )

        const res = api.data.data;
        // console.log("Fetched page data:", res);

        if (res.seoMeta) {
          setGeneralInfo(res.seoMeta);
          setTemp(res.seoMeta.template);
        }

        const key = Object.keys(pageData).find(
          (k) => pageData[k].name === res.seoMeta?.template,
        );
        
        if (key) {
          setFormData(pageData[key]);
          console.log(pageData[key],'key');
        } else {
          const fallbackKey = Object.keys(pageData).find(
            (k) => pageData[k].name.toLowerCase() === slug.toLowerCase(),
          );
          if (fallbackKey) {
            setFormData(pageData[fallbackKey]);
          }
        }

        if (res.sections) {
          const sectionValues: Record<string, any> = {};
          Object.keys(res.sections).forEach((key) => {
            sectionValues[key] = res.sections[key].fields || {};
          });
          setValues(sectionValues);

          if (Object.keys(res.sections).length > 0) {
            setActiveSection(Object.keys(res.sections)[0]);
          }
        }
      } catch (error) {
        console.error("Error fetching page data:", error);
        setError("Failed to load page data");
      }
    };

    getData();
  }, [slug, selectedKey]);

  // General Info Handlers
  const handleGeneralInfoChange = (field: keyof GeneralInfo, value: any) => {
    setGeneralInfo((prev) => ({ ...prev, [field]: value }));
  };

  // Section Input Handler
  const handleInputChange = (
    sectionName: string,
    fieldName: string,
    value: any,
    repeaterIndex?: number,
    parentField?: string,
  ) => {
    setValues((prev) => {
      const sectionValues = prev[sectionName] || {};

      if (repeaterIndex !== undefined && parentField) {
        const existing = [...(sectionValues[parentField] || [])];
        if (!existing[repeaterIndex]) {
          existing[repeaterIndex] = {};
        }
        existing[repeaterIndex] = {
          ...existing[repeaterIndex],
          [fieldName]: value,
        };
        return {
          ...prev,
          [sectionName]: { ...sectionValues, [parentField]: existing },
        };
      }

      return {
        ...prev,
        [sectionName]: { ...sectionValues, [fieldName]: value },
      };
    });
  };

  // Handle nested repeater item change
  const handleNestedRepeaterChange = (
    sectionName: string,
    parentFieldName: string,
    parentIndex: number,
    nestedFieldName: string,
    nestedIndex: number,
    fieldName: string,
    value: any,
  ) => {
    setValues((prev) => {
      const sectionValues = prev[sectionName] || {};
      const parentItems = [...(sectionValues[parentFieldName] || [])];

      if (!parentItems[parentIndex]) {
        parentItems[parentIndex] = {};
      }

      const nestedItems = [
        ...(parentItems[parentIndex][nestedFieldName] || []),
      ];
      if (!nestedItems[nestedIndex]) {
        nestedItems[nestedIndex] = {};
      }

      nestedItems[nestedIndex] = {
        ...nestedItems[nestedIndex],
        [fieldName]: value,
      };

      parentItems[parentIndex] = {
        ...parentItems[parentIndex],
        [nestedFieldName]: nestedItems,
      };

      return {
        ...prev,
        [sectionName]: {
          ...sectionValues,
          [parentFieldName]: parentItems,
        },
      };
    });
  };

  // Group Field Handler
  const handleGroupFieldChange = (
    sectionName: string,
    groupFieldName: string,
    fieldName: string,
    value: any,
  ) => {
    setValues((prev) => {
      const sectionValues = prev[sectionName] || {};
      const groupData = sectionValues[groupFieldName] || {};

      return {
        ...prev,
        [sectionName]: {
          ...sectionValues,
          [groupFieldName]: {
            ...groupData,
            [fieldName]: value,
          },
        },
      };
    });
  };

  // Repeater Handlers
  const addRepeaterItem = (sectionName: string, fieldName: string) => {
    setValues((prev) => {
      const sectionValues = prev[sectionName] || {};
      const currentItems = sectionValues[fieldName] || [];

      const section = formData?.sections?.find(
        (s: any) => s.name === sectionName,
      );
      const fieldDef = section?.fields?.find((f: any) => f.name === fieldName);

      let newItem = {};
      if (fieldDef?.fields) {
        fieldDef.fields.forEach((f: any) => {
          if (f.type === "repeater") {
            newItem = { ...newItem, [f.name]: [] };
          } else {
            newItem = { ...newItem, [f.name]: "" };
          }
        });
      }

      return {
        ...prev,
        [sectionName]: {
          ...sectionValues,
          [fieldName]: [...currentItems, newItem],
        },
      };
    });
  };

  // Add nested repeater item
  const addNestedRepeaterItem = (
    sectionName: string,
    parentFieldName: string,
    parentIndex: number,
    nestedFieldName: string,
    nestedFields: any[],
  ) => {
    setValues((prev) => {
      const sectionValues = prev[sectionName] || {};
      const parentItems = [...(sectionValues[parentFieldName] || [])];

      if (!parentItems[parentIndex]) {
        parentItems[parentIndex] = {};
      }

      const currentNestedItems =
        parentItems[parentIndex][nestedFieldName] || [];

      let newItem = {};
      nestedFields.forEach((f: any) => {
        newItem = { ...newItem, [f.name]: "" };
      });

      parentItems[parentIndex] = {
        ...parentItems[parentIndex],
        [nestedFieldName]: [...currentNestedItems, newItem],
      };

      return {
        ...prev,
        [sectionName]: {
          ...sectionValues,
          [parentFieldName]: parentItems,
        },
      };
    });
  };

  // Remove nested repeater item
  const removeNestedRepeaterItem = (
    sectionName: string,
    parentFieldName: string,
    parentIndex: number,
    nestedFieldName: string,
    nestedIndex: number,
  ) => {
    setValues((prev) => {
      const sectionValues = prev[sectionName] || {};
      const parentItems = [...(sectionValues[parentFieldName] || [])];

      if (!parentItems[parentIndex]) {
        return prev;
      }

      const nestedItems = [
        ...(parentItems[parentIndex][nestedFieldName] || []),
      ];
      nestedItems.splice(nestedIndex, 1);

      parentItems[parentIndex] = {
        ...parentItems[parentIndex],
        [nestedFieldName]: nestedItems,
      };

      return {
        ...prev,
        [sectionName]: {
          ...sectionValues,
          [parentFieldName]: parentItems,
        },
      };
    });
  };

  const removeRepeaterItem = (
    sectionName: string,
    fieldName: string,
    index: number,
  ) => {
    setValues((prev) => {
      const sectionValues = prev[sectionName] || {};
      const currentItems = sectionValues[fieldName] || [];

      return {
        ...prev,
        [sectionName]: {
          ...sectionValues,
          [fieldName]: currentItems.filter((_: any, i: number) => i !== index),
        },
      };
    });
  };

  // File Upload
  const saveFile = async (
    e: React.ChangeEvent<HTMLInputElement>,
    sectionName: string,
    fieldName: string,
    repeaterIndex?: number,
    parentField?: string,
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

      if (res.url) {
        handleInputChange(
          sectionName,
          fieldName,
          res.url,
          repeaterIndex,
          parentField,
        );
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setError("Failed to upload file");
    } finally {
      setLoading(false);
    }
  };

  // Save OG Image
  const saveOGImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const name:any = e.target.name;
    // console.log(name, "ogimg");
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
      if (res.url) {
        handleGeneralInfoChange(name , res.url);
      }
    } catch (error) {
      console.error("Error uploading OG image:", error);
      setError("Failed to upload OG image");
    } finally {
      setLoading(false);
    }
  };
  
  const validateForm = () => {
    if (formData?.sections) {
      for (const section of formData.sections) {
        if (section.require) {
          const sectionValues = values[section.name] || {};
          for (const field of section.fields) {
            if (field.required) {
              const value = sectionValues[field.name];
              if (
                !value ||
                (typeof value === "string" && value.trim() === "")
              ) {
                setError(
                  `Please fill in "${field.label}" in section "${section.label}"`,
                );
                return false;
              }
            }
          }
        }
      }
    }
    return true;
  };

  const renderGroupField = (
    field: any,
    sectionName: string,
    groupFieldName: string,
    groupValue: any,
  ) => {
    const value = groupValue[field.name] || "";
    const baseInputClasses =
      "w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all";

    switch (field.type) {
      case "text":
      case "number":
      case "textarea":
        return field.type === "textarea" ? (
          <textarea
            value={value}
            className={baseInputClasses}
            rows={4}
            onChange={(e) =>
              handleGroupFieldChange(
                sectionName,
                groupFieldName,
                field.name,
                e.target.value,
              )
            }
            placeholder={field.placeholder}
          />
        ) : (
          <input
            type={field.type}
            value={value}
            className={baseInputClasses}
            onChange={(e) =>
              handleGroupFieldChange(
                sectionName,
                groupFieldName,
                field.name,
                e.target.value,
              )
            }
            placeholder={field.placeholder}
          />
        );
      case "color":
        return (
          <div className="">
            {field.type}
            <input
              type="color"
              value={value}
              className="w-12 h-10 p-0 bg-transparent border border-gray-300 rounded cursor-pointer [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:border-none [&::-webkit-color-swatch]:rounded [&::-moz-color-swatch]:border-none [&::-moz-color-swatch]:rounded"
              onChange={(e) =>
                handleGroupFieldChange(
                  sectionName,
                  groupFieldName,
                  field.name,
                  e.target.value,
                )
              }
            />
          </div>
        );
      case "editor":
        return (
          <CKEditorComponent
            value={value}
            onChange={(data: string) =>
              handleGroupFieldChange(
                sectionName,
                groupFieldName,
                field.name,
                data,
              )
            }
          />
        );

      case "file":
        return (
          <div className="space-y-3">
            <input
              type="file"
              accept={field.accept}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                const data = new FormData();
                data.append("file", file);
                fetch("/api/admin/uploadimg", {
                  method: "POST",
                  body: data,
                })
                  .then((res) => res.json())
                  .then((res) => {
                    if (res.url) {
                      handleGroupFieldChange(
                        sectionName,
                        groupFieldName,
                        field.name,
                        res.url,
                      );
                    }
                  })
                  .catch((err) => console.error("Error uploading file:", err));
              }}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {value && (
              <img
                src={value}
                className="h-20 rounded-lg border"
                alt="Preview"
              />
            )}
          </div>
        );

      case "select":
        const options = field.option?.length ? field.option : students;
        return (
          <select
            value={value}
            className={baseInputClasses}
            onChange={(e) =>
              handleGroupFieldChange(
                sectionName,
                groupFieldName,
                field.name,
                e.target.value,
              )
            }
          >
            <option value="">Select {field.label}</option>
            {options.map((opt: any, i: number) => (
              <option key={i} value={opt._id || opt}>
                {opt.name || opt}
              </option>
            ))}
          </select>
        );

      case "toggle":
        const isChecked = value === "true" || value === true;
        return (
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={isChecked}
              className="sr-only peer"
              onChange={(e) => {
                const newValue = e.target.checked ? "true" : "false";
                handleGroupFieldChange(
                  sectionName,
                  groupFieldName,
                  field.name,
                  newValue,
                );
              }}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        );

      default:
        return null;
    }
  };

  const renderField = (
    field: any,
    sectionName: string,
    index?: number,
    parent?: any,
  ) => {
    const sectionValues = values[sectionName] || {};

    let value = "";
    if (index !== undefined && parent) {
      const repeaterItems = sectionValues[parent] || [];
      const item = repeaterItems[index] || {};
      value = item[field.name] || "";
    } else {
      value = sectionValues[field.name] || "";
    }

    const baseInputClasses =
      "w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all";

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
              if (index !== undefined && parent) {
                const repeaterItems = [...(sectionValues[parent] || [])];
                const item = {
                  ...(repeaterItems[index] || {}),
                  [field.name]: e.target.value,
                };
                repeaterItems[index] = item;
                handleInputChange(sectionName, parent, repeaterItems);
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
              if (index !== undefined && parent) {
                const repeaterItems = [...(sectionValues[parent] || [])];
                const item = {
                  ...(repeaterItems[index] || {}),
                  [field.name]: e.target.value,
                };
                repeaterItems[index] = item;
                handleInputChange(sectionName, parent, repeaterItems);
              } else {
                handleInputChange(sectionName, field.name, e.target.value);
              }
            }}
            placeholder={field.placeholder}
          />
        );

      case "color":
        return (
          <div className="">
            {/* {field.type} */}
            <input
              type="color"
              value={value}
              className="w-12 h-10 p-0 bg-transparent border border-gray-300 rounded cursor-pointer [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:border-none [&::-webkit-color-swatch]:rounded [&::-moz-color-swatch]:border-none [&::-moz-color-swatch]:rounded"
              onChange={(e) =>
                handleInputChange(sectionName, field.name, e.target.value)
              }
            />
          </div>
        );
      case "editor":
        return (
          <CKEditorComponent
            value={value}
            onChange={(data: string) => {
              if (index !== undefined && parent) {
                const repeaterItems = [...(sectionValues[parent] || [])];
                const item = {
                  ...(repeaterItems[index] || {}),
                  [field.name]: data,
                };
                repeaterItems[index] = item;
                handleInputChange(sectionName, parent, repeaterItems);
              } else {
                handleInputChange(sectionName, field.name, data);
              }
            }}
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
              <img
                src={value}
                className="h-20 rounded-lg border"
                alt="Preview"
              />
            )}
          </div>
        );

      case "select":
        const options = field.option?.length ? field.option : students;
        return (
          <select
            value={value}
            className={baseInputClasses}
            onChange={(e) => {
              if (index !== undefined && parent) {
                const repeaterItems = [...(sectionValues[parent] || [])];
                const item = {
                  ...(repeaterItems[index] || {}),
                  [field.name]: e.target.value,
                };
                repeaterItems[index] = item;
                handleInputChange(sectionName, parent, repeaterItems);
              } else {
                handleInputChange(sectionName, field.name, e.target.value);
              }
            }}
          >
            <option value="">Select {field.label}</option>
            {options.map((opt: any, i: number) => (
              <option key={i} value={opt._id || opt}>
                {opt.name || opt}
              </option>
            ))}
          </select>
        );

      case "toggle":
        const isChecked = value === "true" || value === true;
        return (
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={isChecked}
              className="sr-only peer"
              onChange={(e) => {
                const newValue = e.target.checked ? "true" : "false";
                if (index !== undefined && parent) {
                  const repeaterItems = [...(sectionValues[parent] || [])];
                  const item = {
                    ...(repeaterItems[index] || {}),
                    [field.name]: newValue,
                  };
                  repeaterItems[index] = item;
                  handleInputChange(sectionName, parent, repeaterItems);
                } else {
                  handleInputChange(sectionName, field.name, newValue);
                }
              }}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        );

      case "repeater":
        const items = sectionValues[field.name] || [];
        return (
          <div className="space-y-4">
            {items.map((item: any, i: number) => (
              <div
                key={i}
                className="p-4 border rounded-xl bg-gray-50 relative"
              >
                <button
                  type="button"
                  onClick={() => removeRepeaterItem(sectionName, field.name, i)}
                  className="absolute top-2 right-2 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 size={16} />
                </button>

                <div className="space-y-3 mt-4">
                  {field.fields.map((f: any) => {
                    // Check if this is a nested repeater
                    if (f.type === "repeater") {
                      const nestedItems = item[f.name] || [];
                      return (
                        <div key={f.name}>
                          <label className="block text-sm font-medium mb-1">
                            {f.label}
                          </label>
                          <div className="space-y-4">
                            {nestedItems.map(
                              (nestedItem: any, nestedIndex: number) => (
                                <div
                                  key={nestedIndex}
                                  className="p-4 border rounded-xl bg-white relative"
                                >
                                  <button
                                    type="button"
                                    onClick={() =>
                                      removeNestedRepeaterItem(
                                        sectionName,
                                        field.name,
                                        i,
                                        f.name,
                                        nestedIndex,
                                      )
                                    }
                                    className="absolute top-2 right-2 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                  >
                                    <Trash2 size={16} />
                                  </button>
                                  <div className="space-y-3 mt-4">
                                    {f.fields.map((nestedField: any) => (
                                      <div key={nestedField.name}>
                                        <label className="block text-sm font-medium mb-1">
                                          {nestedField.label}
                                        </label>
                                        {renderNestedField(
                                          nestedField,
                                          sectionName,
                                          field.name,
                                          i,
                                          f.name,
                                          nestedIndex,
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              ),
                            )}
                            <button
                              type="button"
                              onClick={() =>
                                addNestedRepeaterItem(
                                  sectionName,
                                  field.name,
                                  i,
                                  f.name,
                                  f.fields,
                                )
                              }
                              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                            >
                              <Plus size={16} /> Add {f.label} Item
                            </button>
                          </div>
                        </div>
                      );
                    }

                    // Regular field inside repeater
                    return (
                      <div key={f.name}>
                        <label className="block text-sm font-medium mb-1">
                          {f.label}
                        </label>
                        {renderField(f, sectionName, i, field.name)}
                      </div>
                    );
                  })}
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
        const groupValue = value || {};
        return (
          <div className="p-4 border rounded-xl bg-gray-50 space-y-3">
            {field.fields.map((f: any) => (
              <div key={f.name}>
                <label className="block text-sm font-medium mb-1">
                  {f.label}
                </label>
                {renderGroupField(f, sectionName, field.name, groupValue)}
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  const renderNestedField = (
    field: any,
    sectionName: string,
    parentFieldName: string,
    parentIndex: number,
    nestedFieldName: string,
    nestedIndex: number,
  ) => {
    const sectionValues = values[sectionName] || {};
    const parentItems = sectionValues[parentFieldName] || [];
    const parentItem = parentItems[parentIndex] || {};
    const nestedItems = parentItem[nestedFieldName] || [];
    const nestedItem = nestedItems[nestedIndex] || {};
    const value = nestedItem[field.name] || "";

    const baseInputClasses =
      "w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all";

    switch (field.type) {
      case "text":
      case "number":
      case "textarea":
        return field.type === "textarea" ? (
          <textarea
            value={value}
            className={baseInputClasses}
            rows={4}
            onChange={(e) =>
              handleNestedRepeaterChange(
                sectionName,
                parentFieldName,
                parentIndex,
                nestedFieldName,
                nestedIndex,
                field.name,
                e.target.value,
              )
            }
            placeholder={field.placeholder}
          />
        ) : (
          <input
            type={field.type}
            value={value}
            className={baseInputClasses}
            onChange={(e) =>
              handleNestedRepeaterChange(
                sectionName,
                parentFieldName,
                parentIndex,
                nestedFieldName,
                nestedIndex,
                field.name,
                e.target.value,
              )
            }
            placeholder={field.placeholder}
          />
        );

      case "editor":
        return (
          <CKEditorComponent
            value={value}
            onChange={(data: string) =>
              handleNestedRepeaterChange(
                sectionName,
                parentFieldName,
                parentIndex,
                nestedFieldName,
                nestedIndex,
                field.name,
                data,
              )
            }
          />
        );

      case "file":
        return (
          <div className="space-y-3">
            <input
              type="file"
              accept={field.accept}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                const data = new FormData();
                data.append("file", file);
                fetch("/api/admin/uploadimg", {
                  method: "POST",
                  body: data,
                })
                  .then((res) => res.json())
                  .then((res) => {
                    if (res.url) {
                      handleNestedRepeaterChange(
                        sectionName,
                        parentFieldName,
                        parentIndex,
                        nestedFieldName,
                        nestedIndex,
                        field.name,
                        res.url,
                      );
                    }
                  })
                  .catch((err) => console.error("Error uploading file:", err));
              }}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {value && (
              <img
                src={value}
                className="h-20 rounded-lg border"
                alt="Preview"
              />
            )}
          </div>
        );

      case "select":
        const options = field.option?.length ? field.option : students;
        return (
          <select
            value={value}
            className={baseInputClasses}
            onChange={(e) =>
              handleNestedRepeaterChange(
                sectionName,
                parentFieldName,
                parentIndex,
                nestedFieldName,
                nestedIndex,
                field.name,
                e.target.value,
              )
            }
          >
            <option value="">Select {field.label}</option>
            {options.map((opt: any, i: number) => (
              <option key={i} value={opt._id || opt}>
                {opt.name || opt}
              </option>
            ))}
          </select>
        );

      case "toggle":
        const isChecked = value === "true" || value === true;
        return (
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={isChecked}
              className="sr-only peer"
              onChange={(e) => {
                const newValue = e.target.checked ? "true" : "false";
                handleNestedRepeaterChange(
                  sectionName,
                  parentFieldName,
                  parentIndex,
                  nestedFieldName,
                  nestedIndex,
                  field.name,
                  newValue,
                );
              }}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        );

      default:
        return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const payload: any = {
        name: formData?.slug || generalInfo.canonicalUrl,
        template: formData?.name || generalInfo.template,
        seoMeta: {
          ...generalInfo,
          template: formData?.name || generalInfo.template,
          name: formData?.name || generalInfo.template,
        },
        sections: {},
      };

      if (formData?.sections) {
        formData.sections.forEach((section: any) => {
          payload.sections[section.name] = {
            name: section.name,
            template: formData?.name || generalInfo.template,
            // name: formData?.name || generalInfo.template,
            label: section.label,
            fields: values[section.name] || {},
          };
        });
      }
      // console.log(payload, "payload");

      const endpoint =
          slug === "new"
          ? `/api/admin/pageInfo`
          : `/api/admin/pageInfo/${slug}`;

      const method = slug === "new" ? "POST" : "PUT";

      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      // console.log("Save response:", result);

      alert("Page saved successfully!");

      if (slug === "new" && result?.data?.slug) {
        window.location.href = `/admin/pages/editor/${result.data.slug}`;
      }
    } catch (error) {
      console.error("Error saving page:", error);
      setError("Failed to save page. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
                  setGeneralInfo((prev) => ({
                    ...prev,
                    template: data.name,
                    canonicalUrl: key,
                  }));
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

  if (!formData) {
    console.log(formData,'form')
    return <div className="p-8 text-center">Loading form data...</div>;
  }

  const processSectionFields = (section: any) => {
    const fieldNames = section.fields.map((f: any) => f.name);
    const duplicates = fieldNames.filter(
      (name: string, index: number) => fieldNames.indexOf(name) !== index,
    );

    if (duplicates.length > 0) {
      console.warn(
        `Duplicate field names found in section "${section.label}":`,
        duplicates,
      );
    }

    return section.fields;
  };

  return (
    <div className="max-w-7xl w-full mx-auto p-2">
      <div className="bg-white rounded-2xl shadow-lg">
        {error && (
          <div className="border-b border-red-200 bg-red-50 px-6 py-4">
            <p className="text-red-600">{error}</p>
            <button
              onClick={() => setError(null)}
              className="text-sm text-red-500 hover:text-red-700"
            >
              Dismiss
            </button>
          </div>
        )}

        <div className="border-b px-6 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-2xl font-bold">
                {slug === "new"
                  ? `Create New ${formData.name} Page`
                  : `Edit ${formData.name} Page`}
              </h1>
              <p className="text-gray-600 mt-1">{formData.description}</p>
              {formData.is_dynamic && (
                <span className="inline-block mt-1 px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded">
                  Dynamic Page
                </span>
              )}
            </div>
            <div className="flex items-cetner gap-2">
              
            <button
              onClick={() => Router.back()}
              className="bg-red-600 text-white px-3 py-2 rounded flex items-center hover:bg-red-700 transition-colors "
            >
              <ChevronLeft />
              Back
            </button>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-blue-600 text-white px-3 py-2 rounded flex items-center gap-2 hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              <Save size={18} />
              {loading ? "Saving..." : "Save Page"}
            </button>
            </div>
          </div>
        </div>

        <div className="border-b px-6">
          <div className="flex gap-6">
            <button
              onClick={() => setActiveTab("general")}
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
              onClick={() => setActiveTab("sections")}
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

        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {activeTab === "general" ? (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* {slug === "new" ? } */}

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Page Title (SEO)
                  </label>
                  <input
                    type="text"
                    value={generalInfo.title}
                    onChange={(e) =>
                      handleGeneralInfoChange("title", e.target.value)
                    }
                    className="w-full p-3 border rounded-xl"
                    placeholder="Enter page title"
                  />
                </div>

                {slug === "new" ? (
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Page Slug
                    </label>
                    <input
                      type="text"
                      value={generalInfo.slug}
                      onChange={(e) =>
                        handleGeneralInfoChange("slug", e.target.value)
                      }
                      className="w-full p-3 border rounded-xl"
                      placeholder="Enter page slug"
                    />
                  </div>
                ) : (
                  ""
                )}

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
                    onChange={(e) =>
                      handleGeneralInfoChange("description", e.target.value)
                    }
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
                    onChange={(e) =>
                      handleGeneralInfoChange("keywords", e.target.value)
                    }
                    className="w-full p-3 border rounded-xl"
                    placeholder="keyword1, keyword2, keyword3"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Navbar Title
                  </label>
                  <input
                    type="text"
                    value={generalInfo.navTitle}
                    onChange={(e) =>
                      handleGeneralInfoChange("navTitle", e.target.value)
                    }
                    className="w-full p-3 border rounded-xl"
                    placeholder="Nav title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Navbar Icon
                  </label>
                  <input
                    name="navIcon"
                    type="file"
                    accept="image/*"
                    onChange={saveOGImage}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                  {generalInfo.navIcon && (
                    <img
                      src={generalInfo.navIcon}
                      className="mt-3 h-20 rounded-lg"
                      alt="OG Preview"
                    />
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Navbar Subtitle
                  </label>
                  <input
                    type="text"
                    value={generalInfo.navSubtitle}
                    onChange={(e) =>
                      handleGeneralInfoChange("navSubtitle", e.target.value)
                    }
                    className="w-full p-3 border rounded-xl"
                    placeholder="Nav subtitle"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    OG Title
                  </label>
                  <input
                    type="text"
                    value={generalInfo.ogTitle}
                    onChange={(e) =>
                      handleGeneralInfoChange("ogTitle", e.target.value)
                    }
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
                    placeholder="page-url-slug"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">
                    OG Description
                  </label>
                  <textarea
                    value={generalInfo.ogDescription}
                    onChange={(e) =>
                      handleGeneralInfoChange("ogDescription", e.target.value)
                    }
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
                    name="ogImage"
                    type="file"
                    accept="image/*"
                    onChange={saveOGImage}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                  {generalInfo.ogImage && (
                    <img
                      src={generalInfo.ogImage}
                      className="mt-3 h-20 rounded-lg"
                      alt="OG Preview"
                    />
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
                        onChange={(e) =>
                          handleGeneralInfoChange(
                            "isPublished",
                            e.target.checked,
                          )
                        }
                        className="w-5 h-5 text-blue-600 rounded"
                      />
                      <span>Published</span>
                    </label>

                    <input
                      type="datetime-local"
                      value={generalInfo.publishedAt}
                      onChange={(e) =>
                        handleGeneralInfoChange("publishedAt", e.target.value)
                      }
                      className="w-full p-3 border rounded-xl"
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-6 space-y-4">
              {formData?.sections?.map((section: any, idx: number) => {
                const fields = processSectionFields(section);

                return (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl shadow-sm border"
                  >
                    <div
                      onClick={() =>
                        setActiveSection(
                          activeSection === section?.name
                            ? null
                            : section?.name,
                        )
                      }
                      className="flex justify-between items-center p-5 cursor-pointer hover:bg-gray-50 rounded-2xl transition"
                    >
                      <div>
                        <span className="font-semibold text-gray-800">
                          {section?.label}
                        </span>
                        {section.require && (
                          <span className="ml-2 px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded">
                            Required
                          </span>
                        )}
                        {section.max && (
                          <span className="ml-2 px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded">
                            Max: {section.max}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-400">
                          {activeSection === section?.name ? "Close" : "Edit"}
                        </span>
                        {activeSection === section?.name ? (
                          <ChevronUp size={18} className="text-gray-500" />
                        ) : (
                          <ChevronDown size={18} className="text-gray-500" />
                        )}
                      </div>
                    </div>

                    {activeSection === section?.name && (
                      <div className="border-t p-5">
                        <div className="space-y-5">
                          {fields.map((field: any) => {
                            const fieldIndex = fields.findIndex(
                              (f: any) => f.name === field.name,
                            );
                            if (fieldIndex !== fields.indexOf(field)) {
                              console.warn(
                                `Skipping duplicate field: ${field.name}`,
                              );
                              return null;
                            }

                            return (
                              <div key={field.name}>
                                <label className="block text-sm font-medium mb-2">
                                  {field.label}
                                  {field.required && (
                                    <span className="text-red-500 ml-1">*</span>
                                  )}
                                </label>
                                {renderField(field, section.name)}
                                {field.placeholder && (
                                  <p className="text-sm text-gray-500 mt-1">
                                    {field.placeholder}
                                  </p>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditorForm;
