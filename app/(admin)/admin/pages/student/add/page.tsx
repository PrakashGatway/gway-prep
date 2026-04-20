"use client";
import React, { useState } from "react";
import { pageData } from "@/app/lib/pageData";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { createStudent } from "@/app/services/api";

const CKEditorComponent = dynamic(() => import("../../../components/ckEditor"), {
  ssr: false,
  loading: () => (
    <div className="p-4 border rounded bg-gray-50">Loading Rich Editor...</div>
  ),
});



const EditorForm = () => {
  const router = useRouter();
  const formData =  pageData.student.sections;
  const [values, setValues] = useState<Record<string, any>>({});
  const [file, setFile] = useState<Record<string, any>>();
  const [loading, setloading] = useState(false);

  if (!formData) return <div className="p-10">Section configuration not found.</div>;

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
    setloading(true);
    try {
      console.log(values);
      const res = await createStudent(values);
      console.log(res);
      setValues({});
      setloading(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  

  const saveFile = async (name:string, e: React.FormEvent) => {
    e.preventDefault();
    if (!values) return alert("Please select a file first");
    setloading(true);
    

    const file = e.target?.files?.[0];
    const formData = new FormData();
    formData.append("file", file);

    console.log("print", formData);

    const requestOptions: RequestInit = {
      method: "POST",
      credentials: "include",
      body: formData,
      redirect: "follow" as RequestRedirect,
    };

    try {
      const response = await fetch("/api/admin/uploadimg", requestOptions);
      const res = await response.json();
      console.log(res.url, "res");
      setloading(false);
      setValues((prev) => ({...prev, [name] : res.url }));
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <div className=" m-1 p-8 bg-white shadow-lg rounded-xl border border-gray-100 h-[90vh] overflow-y-auto">
     
        <header className="mb-8 border-b pb-4">
          <h1 className="text-xl font-extrabold text-gray-900">
            Add student
          </h1>
          <p className="text-gray-500">
            add the content for the students.
          </p>
        </header>
        

      <form className="space-y-8" onSubmit={(e) => handleSubmit(e)}>
        {formData[0]?.fields?.map((field: any, index: number) => (
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
                {/* 2. Using your provided CKEditorComponent */}
                <CKEditorComponent
                  value={values[field.name] || ""}
                  onChange={(data: string) =>
                    handleInputChange(field.name, data)
                  }
                  placeholder={field.placeholder}
                />
              </div>
            ) : field.type === "file" ? (
              <input
                type="file"
                accept={field.accept}
                onChange={(data: any) => {
                  //  handleInputChange(field.name, data);
                  saveFile(field.name,data);
                }}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2.5 
                file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition cursor-pointer"
              />
            ) 
            : field.type === "select" ? (
                <select 
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 border-gray-300 outline-none transition"
                >
                  <option>Select an option</option>
                  {field?.option.map((ele:string) => (
                    <option value={ele}>{ele}</option>
                  ))}
                </select>
            ) : null}
          </div>
        ))}

        <div className="pt-6 border-t space-x-2">
          <button
            type="submit"
            className="w-full md:w-auto px-8 py-3 bg-blue-500 text-white rounded-lg font-bold hover:bg-blue-700 shadow-md transition-all active:scale-95"
          >
            {loading ? "loading ..." : `Save section`}
          </button>

          <button
            onClick={() => router.back()}
            className="w-full md:w-auto px-8 py-3 bg-red-500 text-white rounded-lg font-bold hover:bg-red-700 shadow-md transition-all active:scale-95"
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
