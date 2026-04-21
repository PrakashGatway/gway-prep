"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Plus, Trash2, Save } from "lucide-react";
import { pageData } from "@/app/lib/pageData";
import { getStudent } from "@/app/services/api";
import axios from "axios";

const CKEditorComponent = dynamic(() => import("./ckEditor"), {
  ssr: false,
  loading: () => (
    <div className="p-4 border rounded-lg bg-gray-50">Loading editor...</div>
  ),
});

interface PageProps {
  slug: string;
  page: any;
}

const EditorForm = ({ page, slug }: PageProps) => {

  // console.log(page,slug,"editor");

  const formData =
    page ?? pageData.home.sections.find((ele: any) => ele.name === slug);

  const [values, setValues] = useState<Record<string, any>>({});
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [Data, setData] = useState<any[]>([]);


  useEffect(() => {
    fetchStudent();
  }, []);

  const fetchStudent = async () => {
    try {
      const res = await getStudent();
      setStudents(res?.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleInputChange = (
    name: string,
    value: any,
    repeaterIndex?: number,
  ) => {

    // console.log(name, value, repeaterIndex);

    if (repeaterIndex !== undefined) {
      setValues((prev) => {
        const existing = [...(prev[name] || [])];
        existing[repeaterIndex] = value;
        return {
          ...prev,
          [name]: existing,
        };
      });
      return;
    }

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));

  };

  const addRepeaterItem = (fieldName: string, template: any) => {
    setValues((prev) => ({
      ...prev,
      [fieldName]: [...(prev[fieldName] || []), { ...template }],
    }));
  };

  const removeRepeaterItem = (fieldName: string, index: number) => {
    setValues((prev) => ({
      ...prev,
      [fieldName]: prev[fieldName].filter((_: any, i: number) => i !== index),
    }));
  };

  // const saveFile = async (
  //   e: React.ChangeEvent<HTMLInputElement>,
  //   fieldName: string,
  //   repeaterIndex?: number
  // ) => {
  //   const file = e.target.files?.[0];
  //   if (!file) return;

  //   setLoading(true);

  //   const data = new FormData();
  //   data.append("file", file);

  //   try {
  //     const response = await fetch("/api/admin/uploadimg", {
  //       method: "POST",
  //       body: data,
  //       credentials: "include",
  //     });

  //     const res = await response.json();
  //       if (repeaterIndex !== undefined) {
  //     handleInputChange(fieldName, res.url, repeaterIndex);
  //       }
  //     handleInputChange(fieldName, res.url);

  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const saveFile = async (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: string,
    repeaterIndex?: number,
    repeaterName?: string,
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
        credentials: "include",
      });

      const res = await response.json();
      const fileUrl = res.url;

      setValues((prev) => {
        if (repeaterIndex !== undefined && repeaterName) {
          const updatedItems = [...(prev[repeaterName] || [])];

          updatedItems[repeaterIndex] = {
            ...(updatedItems[repeaterIndex] || {}),
            [fieldName]: fileUrl,
          };

          return {
            ...prev,
            [repeaterName]: updatedItems,
          };
        }

        // root update
        return {
          ...prev,
          [fieldName]: fileUrl,
        };
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const renderField = (
    field: any,
    repeaterIndex?: number,
    repeaterName?: string,
  ) => {
    const fieldName = repeaterName || field.name;
    const currentValue =
      repeaterIndex !== undefined
        ? values[fieldName]?.[repeaterIndex]?.[field.name] || ""
        : values[field.name] || "";

    switch (field.type) {
      case "text":
      case "number":
        return (
          <input
            type={field.type}
            value={currentValue}
            placeholder={field.placeholder}
            className="w-full rounded-xl border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 outline-none"
            onChange={(e) => {
              if (repeaterIndex !== undefined) {
                const item = {
                  ...(values[fieldName]?.[repeaterIndex] || {}),
                  [field.name]: e.target.value,
                };
                handleInputChange(fieldName, item, repeaterIndex);
              } else {
                handleInputChange(field.name, e.target.value);
              }
            }}
          />
        );

      case "textarea":
        return (
          <textarea
            value={currentValue}
            placeholder={field.placeholder}
            className="w-full rounded-xl border border-gray-300 p-3 min-h-[120px]"
            // onChange={(e) => handleInputChange(field.name, e.target.value)}
            onChange={(e) => {
              if (repeaterIndex !== undefined) {
                const item = {
                  ...(values[fieldName]?.[repeaterIndex] || {}),
                  [field.name]: e.target.value,
                };
                handleInputChange(fieldName, item, repeaterIndex);
              } else {
                handleInputChange(field.name, e.target.value);
              }
            }}
          />
        );

      case "editor":
        return (
          <CKEditorComponent
            value={currentValue}
            onChange={(data: string) => handleInputChange(field.name, data)}
          />
        );

      case "file":
        return (
          <>
          
          <input
            type="file"
            // onChange={(e) => {saveFile(e, field?.fields?.name ?? field.name, repeaterIndex);}}
            className="w-full rounded-xl border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 outline-none"
            onChange={(e) => {
              saveFile(e, field.name, repeaterIndex, repeaterName);
            }}
          />
          
            {/* <img src={values?.img ?? values?.items[repeaterIndex]?.icon} alt="img" className="h-14 w-14 m-2" /> */}
            <img 
              src={values?.items?.[repeaterIndex]?.icon ?? values?.img} 
              alt="img" 
              className="h-14 w-14 m-2" 
            />

          </>
        );

      case "select":
        return (
          <select
            value={currentValue || ""}
            className="w-full rounded-xl border border-gray-300 p-3"
            onChange={
              (e) => {
                if (repeaterIndex !== undefined) {
                  const item = {
                    ...(values[fieldName]?.[repeaterIndex] || {}),
                    [field.name]: e.target.value,
                  };
                  handleInputChange(fieldName, item, repeaterIndex);
                } else {
                  handleInputChange(field.name, e.target.value);
                }
              }
              // handleInputChange(field.name, e.target.value)
            }
          >
            <option value="">Select</option>

            {(field.option?.length ? field.option : students).map(
              (opt: any, idx: number) => (
                <option key={idx} value={opt._id || opt}>
                  {opt.name || opt}
                </option>
              ),
            )}
          </select>
        );

      case "repeater":
        return (
          <div className="space-y-4">
            {(values[field.name] || []).map((item: any, index: number) => (
              <div
                key={index}
                className="border rounded-2xl p-5 bg-gray-50 shadow-sm"
              >
                <div className="flex justify-end mb-1">
                  <button
                    type="button"
                    onClick={() => removeRepeaterItem(field.name, index)}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                {field.fields.map((subField: any) => (
                  <div key={subField.name} className="mb-4">
                    <label className="flex items-center justify-between block mb-2 font-medium">
                      {subField.label}
                      {/* <button
                            type="button"
                            onClick={() =>
                              removeRepeaterItem(field.name, index)
                            }>
                            <Trash2 size={18} />
                          </button> */}
                    </label>
                    {renderField(subField, index, field.name)}
                  </div>
                ))}
              </div>
            ))}

            <button
              type="button"
              onClick={() => addRepeaterItem(field.name, {})}
              className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-xl"
            >
              <Plus size={18} />
              Add Item
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {

      const payload = {
        sections: {
          [page?.name]: {
            name: page?.name,
            label: page?.label,
            fields: values,
          },
        },
      };
        
      console.log(payload);
      const res = await fetch(`/api/admin/pageInfo/${slug.toLowerCase()}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Something went wrong");
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  async function getData() {
    try {
      const res = await axios.get(`/api/admin/pageInfo/${slug.toLowerCase()}`)
      const data = await res.data.data;
      console.log(data.sections[formData.name].fields,"formData");
      setValues(data.sections[formData.name].fields)
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getData();
  },[]);

  if (!formData) return <div>Section not found</div>;

  // console.log(formData)
  return (
    <div className="bg-white rounded-3xl shadow-xl border p-8">
      <div className="mb-8 border-b pb-4">
        <h1 className="text-2xl font-bold">{formData.label}</h1>
        <p className="text-gray-500">Manage section content</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {formData.fields.map((field: any) => (
          <div key={field.name}>
            <label className="block mb-2 font-semibold">{field.label}</label>
            {renderField(field)}
          </div>
        ))}

        <button
          type="submit"
          className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl"
        >
          <Save size={18} />
          {loading ? "Loading.." : "Save Section"}
        </button>
      </form>
    </div>
  );
};

export default EditorForm;
