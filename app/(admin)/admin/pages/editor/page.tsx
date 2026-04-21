"use client";

import React, { useState } from "react";
import { Edit, Pencil, Trash, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import EditorForm from "../../components/editorForm";
import { pageData } from "@/app/lib/pageData";

const Page = () => {
  const [show, setShow] = useState(true);
  const [heading, setHeading] = useState<Record<string, any>>({});
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const router = useRouter();

  // Dummy states (replace with your API data)
  const loading = false;
  const students: any[] = [];

  const handleDelete = (id: string) => {
    console.log("Delete:", id);
  };

  return (
    <div className="max-h-screen overflow-auto bg-gray-50 p-6">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            {heading?.name ? `${heading.name} Page` : "All Pages"}
          </h1>
          <p className="text-sm text-gray-500 mt-1">Manage your pages data</p>
        </div>

        {heading?.name && (
          <button
            onClick={() => {
              setShow(true);
              setHeading({});
              setActiveSection(null);
            }}
            className="flex items-center gap-2 bg-white border px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition"
          >
            <ArrowLeft size={18} />
            Back
          </button>
        )}
      </div>

      {/* PAGE LIST */}
      {show && (
        <div className="grid md:grid-cols-2 gap-5 mt-6">
          {Object.keys(pageData).map((data: any, idx: number) => {
            const ele = pageData[data];

            return (
              <div
                key={idx}
                onClick={() => {
                  setShow(false);
                  setHeading(ele);
                }}
                className={`${
                  ele.require ? "block" : "hidden"
                } bg-white rounded-2xl p-5 border shadow-sm hover:shadow-md cursor-pointer transition`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="font-bold text-lg text-gray-800">
                      {ele.name} Page
                    </h2>
                    <p className="text-sm text-gray-500">
                      Click to edit sections
                    </p>
                  </div>
                  <Edit className="text-gray-500" />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* SECTIONS */}
      {!show && (
        <div className="mt-6 space-y-4">
          {heading?.sections?.map((ele: any, idx: number) => (
            <div key={idx} className="bg-white rounded-2xl shadow-sm border">
              <div
                onClick={() =>
                  setActiveSection(
                    activeSection === ele?.name ? null : ele?.name,
                  )
                }
                className="flex justify-between items-center p-5 cursor-pointer hover:bg-gray-50 rounded-2xl transition"
              >
                <span className="font-semibold text-gray-800">
                  {ele?.label}
                </span>
                <Edit size={18} />
              </div>

              {activeSection === ele?.name && (
                <div className="border-t p-5">
                  <EditorForm page={ele} slug={heading?.name} />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Page;
