"use client";

import React, { useEffect, useState } from "react";
import {
  Edit,
  Plus,
  Search,
  ChevronLeft,
  ChevronRight,
  FileText,
  Trash2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { getPages } from "@/app/services/api";
import axiosInstance from "@/app/lib/axios";

const Page = () => {
  const router = useRouter();

  const [pages, setPages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);
  const limit = 10;

  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    total: 0,
    hasNextPage: false,
    hasPrevPage: false,
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchPages();
    }, 400);

    return () => clearTimeout(timeout);
  }, [page, search]);

  const fetchPages = async () => {
    try {
      setLoading(true);

      // const res = await axiosInstance
      const res = await axiosInstance(`/admin/pageInfo?search=${search}&page=${page}&limit=${limit}`);

      setPages(res.data.data || []);
      setPagination(res.data?.pagination);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      {/* Header */}

      <div className="flex flex-col lg:flex-row justify-between gap-5 items-center mb-8">

        <div>
          <h1 className="text-3xl font-bold">Pages</h1>
          <p className="text-gray-500 mt-1">
            Manage all website pages
          </p>
        </div>

        <div className="flex gap-3 w-full lg:w-auto">

          <div className="relative flex-1 lg:w-80">

            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />

            <input
              type="text"
              placeholder="Search page..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full pl-10 pr-4 py-2 border rounded-xl bg-white focus:ring-2 focus:ring-orange-500 outline-none"
            />
          </div>

          <button
            onClick={() => router.push("/admin/pages/editor/new")}
            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 rounded-xl"
          >
            <Plus size={18} />
            Create
          </button>

        </div>

      </div>

      {/* Stats */}

      {/* <div className="mb-6">
        <div className="bg-white rounded-xl border p-4 shadow-sm inline-flex items-center gap-3">
          <FileText className="text-orange-500" />
          <div>
            <p className="text-sm text-gray-500">Total Pages</p>
            <h2 className="text-2xl font-bold">
              {pagination?.total}
            </h2>
          </div>
        </div>
      </div> */}

      {/* Cards */}

      {loading ? (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">

          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-36 rounded-2xl bg-white animate-pulse"
            />
          ))}

        </div>
      ) : (
        <>
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

            {pages.map((pageItem) => (
              <div
                key={pageItem._id}
                onClick={() =>
                  router.push(
                    `/admin/pages/editor/${pageItem.name.toLowerCase()}`
                  )
                }
                className="group bg-white rounded-2xl border p-6 shadow-sm hover:shadow-lg transition cursor-pointer"
              >
                <div className="flex justify-between">

                  <div>

                    <h2 className="font-semibold text-xl">
                      {pageItem.name}
                    </h2>

                    <p className="text-gray-500 mt-2">
                      Manage page content & SEO
                    </p>

                    <div className="mt-5">

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          pageItem.seoMeta?.isPublished
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {pageItem.seoMeta?.isPublished
                          ? "Published"
                          : "Draft"}
                      </span>

                    </div>

                  </div>

                  <div className="h-12 w-12 rounded-xl bg-orange-50 flex items-center justify-center group-hover:bg-orange-500 transition">
                    <Edit className="group-hover:text-white" />
                    {/* <Trash2 /> */}
                  </div>

                </div>
              </div>
            ))}

          </div>

          {pages.length === 0 && (
            <div className="bg-white rounded-xl border p-16 text-center mt-8">
              <h3 className="text-xl font-semibold">
                No Pages Found
              </h3>
              <p className="text-gray-500 mt-2">
                Try another search.
              </p>
            </div>
          )}
        </>
      )}

      {/* Pagination */}

      {!loading && pagination.totalPages > 1 && (
        <div className="flex flex-wrap justify-center items-center gap-2 mt-10">

          <button
            disabled={!pagination.hasPrevPage}
            onClick={() => setPage((p) => p - 1)}
            className="h-10 px-4 border rounded-lg disabled:opacity-40"
          >
            <ChevronLeft size={18} />
          </button>

          {Array.from(
            { length: pagination.totalPages },
            (_, i) => i + 1
          ).map((item) => (
            <button
              key={item}
              onClick={() => setPage(item)}
              className={`h-10 w-10 rounded-lg border transition ${
                item === pagination.page
                  ? "bg-orange-500 text-white border-orange-500"
                  : "bg-white hover:bg-orange-50"
              }`}
            >
              {item}
            </button>
          ))}

          <button
            disabled={!pagination.hasNextPage}
            onClick={() => setPage((p) => p + 1)}
            className="h-10 px-4 border rounded-lg disabled:opacity-40"
          >
            <ChevronRight size={18} />
          </button>

        </div>
      )}
    </div>
  );
};
export default Page;





// "use client";

// import React, { useEffect, useState } from "react";
// import { Edit, Pencil, Trash, ArrowLeft, Plus } from "lucide-react";
// import { useRouter } from "next/navigation";
// import { pageData } from "@/app/lib/pageData";
// import { getPages } from "@/app/services/api";

// const Page = () => {
//   const [show, setShow] = useState(true);
//   const [heading, setHeading] = useState<Record<string, any>>([]);
//   const [filter, setfilter] = useState("");


//   const router = useRouter();

//   useEffect(() => {
//     const fetchPages = async () => {
//       const pages = await getPages("1","10",filter);
//       console.log("Pages:", pages);
//       setHeading(pages);
//     };
//     fetchPages();
//   }, []);

//   return (
//     <div className="max-h-screen overflow-auto bg-gray-50 p-6">
//       {/* HEADER */}
//       <div className="flex items-center justify-between mb-6">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-800">
//             {heading?.name ? `${heading.name} Page` : "All Pages"}
//           </h1>
//           <p className="text-sm text-gray-500 mt-1">Manage your pages data</p>
//         </div>

//         {heading?.name ? (
//           <button
//             onClick={() => {
//               setShow(true);
//               setHeading({});
//               setActiveSection(null);
//             }}
//             className="flex items-center gap-2 bg-white border px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition"
//           >
//             <ArrowLeft size={18} />
//             Back
//           </button>
//         ) : (
//           <button
//             onClick={() => {router.push("/admin/pages/editor/new")}}
//             className="flex items-center gap-2 bg-white border px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition"
//           >
//             <Plus size={18} />
//             Create Page
//           </button>
//         )}
//       </div>

//       {/* PAGE LIST */}
//       {show && (
//         <div className="grid md:grid-cols-2 gap-5 mt-6">
//           {heading.map((data: any, idx: number) => {
//             const ele = pageData[data];

//             return (
//               <div
//                 key={idx}
//                 onClick={() => {router.push(`/admin/pages/editor/${data.name.toLowerCase()}`)}}
//                 className={`${
//                   data.seoMeta?.isPublished ? "bg-green-100" : "bg-gray-100"
//                 } bg-white rounded-2xl p-5 border shadow-sm hover:shadow-md cursor-pointer transition`}
//               >
//                 <div className="flex justify-between items-center">
//                   <div>
//                     <h2 className="font-bold text-lg text-gray-800">
//                       {data.name} Page
//                     </h2>
//                     <p className="text-sm text-gray-500">
//                       Click to edit sections
//                     </p>
//                   </div>
//                   <Edit className="text-gray-500" />
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       )}

     
//     </div>
//   );
// };

// export default Page;
