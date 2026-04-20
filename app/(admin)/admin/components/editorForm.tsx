"use client";
import React, { useEffect, useState } from "react";
import { pageData } from "@/app/lib/pageData";
import dynamic from "next/dynamic";
import { getStudent } from "@/app/services/api";

const CKEditorComponent = dynamic(() => import("./ckEditor"), {
  ssr: false,
  loading: () => (
    <div className="p-4 border rounded bg-gray-50">Loading Rich Editor...</div>
  ),
});

interface PageProps {
  slug: string;
  page: any;
}

const EditorForm = ({ page, slug }: PageProps) => {
  const formData =
    page ?? pageData.home.sections.find((ele: any) => ele.name === slug);

  const [values, setValues] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(false);

  if (!formData)
    return <div className="p-10">Section configuration not found.</div>;

  const handleInputChange = (name: string, e: any) => {
    let value;
    if (e?.target) {
      value = e.target.type === "file" ? e.target.files[0] : e.target.value;
    } else {
      value = e; // CKEditor passes value directly
    }
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const getCookie = (name: string): string | null => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
    return null;
  };
  const [Student, setStudent] = useState<any[]>([]);

  // ✅ FETCH
  const fetchStudent = async () => {
    try {
      const res = await getStudent();
      setStudent(res?.data || []);
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchStudent();
  }, []);

  const saveFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return alert("Please select a file first");

    setLoading(true);
    const token = getCookie("adminToken");
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/admin/uploadimg", {
        method: "POST",
        credentials: "include",
        body: formData,
      });
      const res = await response.json();
      setValues((prev) => ({ ...prev, img: res.url }));
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Capitalized, defined inside component so it has access to state/handlers
  const FromField = ({ field, index }: { field: any; index: number }) => {
    const [dynamicFields, setDynamicFields] = useState(field.fields || []);

    return (
      <div key={index} className="flex flex-col gap-3">
        <label className="text-sm font-bold text-gray-700 flex items-center gap-1">
          {field.label}
          {field.required && <span className="text-red-500">*</span>}
        </label>

        {field.type === "text" || field.type === "number" ? (
          <input
            type={field.type}
            placeholder={field.placeholder}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 border-gray-300 outline-none transition"
            onChange={(e) => handleInputChange(field.name, e)}
          />
        ) : field.type === "textarea" ? (
          <textarea
            placeholder={field.placeholder}
            className="w-full p-3 border rounded-lg h-32 focus:ring-2 focus:ring-blue-500 border-gray-300 outline-none transition"
            onChange={(e) => handleInputChange(field.name, e)}
          />
        ) : field.type === "editor" ? (
          <div className="prose-sm ck-custom-editor">
            <CKEditorComponent
              value={values[field.name] || ""}
              onChange={(data: string) => handleInputChange(field.name, data)}
              placeholder={field.placeholder}
            />
          </div>
        ) : field.type === "file" ? (
          <input
            type="file"
            accept={field.accept}
            onChange={saveFile} // ✅ correct event type now
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2.5 
            file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold 
            file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition cursor-pointer"
          />
        ) : field.type === "repeater" ? (
          <div className="p-6 bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl">
            <div className="p-6 bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl">
              <button
                type="button"
                onClick={() => {
                  const newItem = structuredClone(dynamicFields[0]);
                  setDynamicFields([...dynamicFields, newItem]);
                }}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-semibold shadow-sm hover:bg-gray-100 transition"
              >
                + Add Item
              </button>
                  
              {dynamicFields.map((subField: any, subIndex: number) => (
                <FromField
                  key={`field-${subIndex}`} 
                  field={subField}
                  index={subIndex}
                />
              ))}
            </div>
          </div>
        ) : field.type === "select" ? (
          <select
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 border-gray-300 outline-none transition"
            onChange={(e) => handleInputChange(field.name, e)}
          >
            <option value="">Select an option</option>
            {/* {field?.option.length === 0 ? Student : field.option.map((opt: string) => (
            <option key={opt} value={opt}>{opt}</option>  
          ))} */}
            {field?.option.length === 0
              ? Student.map((stu: string) => (
                  <option key={stu?._id} value={stu?._id}>
                    {stu?.name}
                  </option>
                ))
              : field.option.map((opt: string) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
          </select>
        ) : null}
      </div>
    );
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

      const res = await fetch("/api/admin/pageInfo/home", {
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

  return (
    <div className="m-1 p-8 bg-white shadow-lg rounded-xl border border-gray-100 h-[90vh] overflow-y-auto">
      {slug && (
        <header className="mb-8 border-b pb-4">
          <h1 className="text-xl font-extrabold text-gray-900">
            {formData.label}
          </h1>
          <p className="text-gray-500">
            Edit the content for the {slug} section.
          </p>
        </header>
      )}

      <form className="space-y-8" onSubmit={handleSubmit}>
        {/* ✅ Correct JSX call — no comma, capitalized */}
        {formData.fields.map((field: any, index: number) => (
          <FromField key={index} field={field} index={index} />
        ))}

        <div className="pt-6 border-t">
          <button
            type="submit"
            className="w-full md:w-auto px-8 py-3 bg-blue-500 text-white rounded-lg font-bold hover:bg-blue-700 shadow-md transition-all active:scale-95"
          >
            {loading ? "Loading..." : `Save ${formData.label} section`}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditorForm;
