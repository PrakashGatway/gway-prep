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
      
      if (id === 'add' || !id) {
        // Create new student
        const res = await axiosInstance.post("/admin/student", values);
        // console.log("Created student:", res.data);
        
        if (res.data.message === "Student created successfully.") {
          router.push('/admin/pages/student');
        }
      } else {
        // Update existing student
        const res = await axiosInstance.put("/admin/student", { 
          id, 
          ...values 
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
    const value = values[field.name] || '';

    switch (field.type) {
      case "text":
      case "number":
        return (
          <input
            type={field.type}
            name={field.name}
            value={value}
            placeholder={field.placeholder}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 border-gray-300 outline-none transition"
            onChange={(e) => handleInputChange(field.name, e)}
          />
        );

      case "textarea":
        return (
          <textarea
            name={field.name}
            value={value}
            placeholder={field.placeholder}
            className="w-full p-3 border rounded-lg h-32 focus:ring-2 focus:ring-blue-500 border-gray-300 outline-none transition"
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
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 border-gray-300 outline-none transition"
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
    <div className="m-1 p-8 bg-white shadow-lg rounded-xl border border-gray-100 h-[90vh] overflow-y-auto">
      <header className="mb-8 border-b pb-4">
        <h1 className="text-xl font-extrabold text-gray-900">
          {id && id !== 'add' ? 'Edit Student' : 'Add Student'}
        </h1>
        <p className="text-gray-500">
          {id && id !== 'add' ? 'Edit the student information.' : 'Add new student information.'}
        </p>
      </header>

      <form className="space-y-8" onSubmit={handleSubmit}>
        {formData[0]?.fields?.map((field: any, index: number) => (
          <div key={index} className="flex flex-col gap-3">
            <label className="text-sm font-bold text-gray-700 flex items-center gap-1">
              {field.label}
              {field.required && <span className="text-red-500">*</span>}
            </label>

            {renderField(field)}
          </div>
        ))}

        <div className="pt-6 border-t space-x-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full md:w-auto px-8 py-3 bg-blue-500 text-white rounded-lg font-bold hover:bg-blue-700 shadow-md transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Saving..." : (id && id !== 'add' ? 'Update Student' : 'Create Student')}
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