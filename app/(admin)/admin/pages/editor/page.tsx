  "use client";

  import { Edit } from "lucide-react";
  import { useRouter } from "next/navigation";
  import React, { useState } from "react";
  import { pageData } from "@/app/lib/pageData";
  import EditorForm from "../../components/editorForm";

  const page = () => {
    const [show, setshow] = useState(true);
    const [heading, setHeading] = useState<Record<string, any>>({});
    const [activeSection, setActiveSection] = useState<string | null>(null);
    const router = useRouter();
    console.log(heading,"hlj")

    return (
      <div className="p-4 flex flex-col gap-4 overflow-y-auto h-[90vh]">
         
            <div className="flex justify-between my-2 px-4">
              <h1 className="text-2xl font-bold">{heading?.name ?  heading?.name + " page": "All pages"}</h1>

             {heading?.name &&  <button
                onClick={() => {setshow(!show); setHeading({})}}
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                Back
              </button>}
            </div>

        {show &&
          Object.keys(pageData).map((data: any, idx: number) => {
            const ele = pageData[data]; // This gets the 'home' or 'blog' object

            return (
              <div
                key={idx}
                onClick={() => {
                  setshow(false);
                  setHeading(ele); // Sets the full object (name, description, sections)
                }}
                className={`${ele.require ? "block" : "hidden"} rounded-lg px-4 py-6 flex items-center justify-between bg-gray-200 cursor-pointer`}
              >
                {/* This prints "Home" or "Blog" */}
                <span className="font-bold">{ele.name} Page</span>
                <Edit />
              </div>
            );
          })}

        {!show && (
          <>
            {heading?.sections?.map((ele: any, idx: number) => (
              <div key={idx} className="mb-4">
                <div
                  onClick={() =>
                    setActiveSection(activeSection !== "" ? "" : ele?.name)
                  }
                  className="rounded-lg px-4 py-6 flex items-center justify-between bg-gray-200 cursor-pointer"
                >
                  {ele?.label}
                  <Edit />
                </div>
                {activeSection === ele?.name && <EditorForm page={ele} slug={heading?.name}/>}
              </div>
            ))}
          </>
        )}
      </div>
    );
  };

  export default page;
