"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  createBlogCategory,
  getBlogCategory,
  deleteBlogCategory,
} from "@/app/services/api";
import {
  Trash2,
  Plus,
  FileText,
  FolderOpen,
  Search,
  RotateCcw,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";

const BlogcategoryPage = () => {
  const router = useRouter();

  const [categories, setCategories] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      setFetchLoading(true);

      const res = await getBlogCategory();

      setCategories(res?.data || []);
    } catch (err) {
      console.error("Error fetching categories:", err);
    } finally {
      setFetchLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) return;

    try {
      setLoading(true);

      await createBlogCategory({
        name: name.trim(),
      });

      setName("");
      setShowForm(false);

      await fetchCategories();
    } catch (err) {
      console.error("Error creating category:", err);
      alert("Error creating category");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this category?"
    );

    if (!confirmed) return;

    try {
      await deleteBlogCategory(id);

      setCategories((prev) =>
        prev.filter((category) => category._id !== id)
      );
    } catch (err) {
      console.error("Error deleting category:", err);
      alert("Error deleting category");
    }
  };

  const filteredCategories = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) {
      return categories;
    }

    return categories.filter((category) =>
      category.name?.toLowerCase().includes(value)
    );
  }, [categories, search]);

  const clearSearch = () => {
    setSearch("");
  };

  return (
    <div className="min-h-screen bg-[#f7f8fa] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1500px]">

        {/* ================= HEADER ================= */}
        <div className="mb-5 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-[30px] font-bold tracking-tight text-[#071b38] sm:text-[36px]">
              Support Articles
            </h1>

            <p className="mt-1 text-[16px] text-[#687b95]">
              Manage and organize support articles for your users.
            </p>
          </div>

          <button
            onClick={() => setShowForm(true)}
            className="inline-flex h-[56px] items-center justify-center gap-3 rounded-[17px] bg-[#ff6900] px-7 text-[16px] font-semibold text-white shadow-sm transition hover:bg-[#ed5f00] active:scale-[0.98]"
          >
            <Plus size={21} strokeWidth={2.5} />
            Create Category
          </button>
        </div>

        {/* ================= TABS ================= */}
        <div className="mb-5 border-b border-[#dfe3e8]">
          <div className="flex gap-7">

            <button
              onClick={() => router.push("/admin/pages/Blogs")}
              className="flex items-center gap-3 px-2 pb-4 pt-1 text-[16px] font-semibold text-[#718198] transition hover:text-[#ff6633]"
            >
              <FileText size={21} strokeWidth={2} />
              Support Articles
            </button>

            <button
              className="relative flex items-center gap-3 px-6 pb-4 pt-1 text-[16px] font-semibold text-[#ff6633]"
            >
              <FolderOpen size={21} strokeWidth={2} />

              Categories

              <span className="absolute bottom-0 left-0 h-[3px] w-full rounded-full bg-[#ff6633]" />
            </button>

          </div>
        </div>

        {/* ================= SEARCH ================= */}
        <div className="mb-5 rounded-[20px] border border-[#e0e4e9] bg-white p-5 shadow-[0_2px_5px_rgba(0,0,0,0.05)] sm:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end">

            <div className="w-full sm:max-w-[600px]">
              <label className="mb-2 block text-[14px] font-semibold text-[#253b58]">
                Search Categories
              </label>

              <div className="relative">
                <Search
                  size={21}
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-[#94a3b8]"
                />

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by category name..."
                  className="h-[55px] w-full rounded-[15px] border border-[#dfe4ea] bg-[#fafbfc] pl-12 pr-12 text-[16px] text-[#253b58] outline-none transition placeholder:text-[#9aa9bd] focus:border-[#ff7043] focus:ring-2 focus:ring-[#ff7043]/10"
                />

                {search && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#94a3b8] transition hover:text-[#ff6633]"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>
            </div>

            <button
              onClick={clearSearch}
              className="flex h-[55px] items-center justify-center gap-2 rounded-[15px] border border-[#dfe4ea] bg-white px-6 text-[16px] font-medium text-[#40536d] transition hover:border-[#ff7043] hover:text-[#ff7043]"
            >
              <RotateCcw size={18} />
              Clear Filters
            </button>

          </div>
        </div>

        {/* ================= CATEGORY TABLE ================= */}
        <div className="overflow-hidden rounded-[20px] border border-[#dfe4e8] bg-white shadow-[0_2px_5px_rgba(0,0,0,0.04)]">

          {fetchLoading ? (
            <div className="flex min-h-[300px] items-center justify-center">
              <div className="flex flex-col items-center gap-3">
                <div className="h-9 w-9 animate-spin rounded-full border-4 border-[#ff7043]/20 border-t-[#ff7043]" />

                <p className="text-sm text-[#718198]">
                  Loading categories...
                </p>
              </div>
            </div>
          ) : filteredCategories.length === 0 ? (
            <div className="flex min-h-[300px] flex-col items-center justify-center px-5 text-center">

              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#fff2ec]">
                <FolderOpen
                  size={28}
                  className="text-[#ff7043]"
                />
              </div>

              <h3 className="text-lg font-semibold text-[#172b4d]">
                No categories found
              </h3>

              <p className="mt-1 text-sm text-[#718198]">
                Create your first category to organize your articles.
              </p>

              <button
                onClick={() => setShowForm(true)}
                className="mt-5 inline-flex items-center gap-2 rounded-[12px] bg-[#ff6900] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#ed5f00]"
              >
                <Plus size={18} />
                Create Category
              </button>

            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px] border-collapse text-left">

                {/* TABLE HEADER */}
                <thead>
                  <tr className="bg-[#f96b45] text-white">

                    <th className="w-[90px] border-r border-white/30 px-5 py-5 text-[13px] font-bold">
                      #
                    </th>

                    <th className="border-r border-white/30 px-5 py-5 text-[13px] font-bold">
                      CATEGORY
                    </th>

                    <th className="w-[200px] border-r border-white/30 px-5 py-5 text-[13px] font-bold">
                      CREATED AT
                    </th>

                    <th className="w-[150px] px-5 py-5 text-[13px] font-bold">
                      ACTIONS
                    </th>

                  </tr>
                </thead>

                {/* TABLE BODY */}
                <tbody>
                  {filteredCategories.map((category, index) => (
                    <tr
                      key={category._id}
                      className="border-b border-[#dfe3e7] transition hover:bg-[#fffaf7]"
                    >

                      {/* NUMBER */}
                      <td className="border-r border-[#dfe3e7] px-5 py-5 text-[15px] text-[#8291a5]">
                        {index + 1}
                      </td>

                      {/* CATEGORY */}
                      <td className="border-r border-[#dfe3e7] px-5 py-4">
                        <div className="flex items-center gap-4">

                          <div className="flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-[14px] bg-[#fff4ec]">
                            <FolderOpen
                              size={22}
                              className="text-[#ff6500]"
                            />
                          </div>

                          <div>
                            <h3 className="text-[16px] font-bold text-[#102744]">
                              {category.name}
                            </h3>

                            <p className="mt-1 text-[13px] text-[#91a0b4]">
                              Blog support category
                            </p>
                          </div>

                        </div>
                      </td>

                      {/* CREATED DATE */}
                      <td className="border-r border-[#dfe3e7] px-5 py-4">
                        {category.createdAt ? (
                          <>
                            <div className="text-[14px] font-medium text-[#253b58]">
                              {new Date(
                                category.createdAt
                              ).toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              })}
                            </div>

                            <div className="mt-1 text-[13px] text-[#91a0b4]">
                              {new Date(
                                category.createdAt
                              ).toLocaleTimeString("en-US", {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </div>
                          </>
                        ) : (
                          <span className="text-sm text-[#91a0b4]">
                            -
                          </span>
                        )}
                      </td>

                      {/* ACTIONS */}
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-center">

                          <button
                            onClick={() =>
                              handleDelete(category._id)
                            }
                            title="Delete Category"
                            className="flex h-[45px] w-[45px] items-center justify-center rounded-[13px] border border-[#ffd5d5] bg-white text-[#ff6262] transition hover:bg-[#fff2f2] hover:text-[#ef4444]"
                          >
                            <Trash2 size={19} />
                          </button>

                        </div>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* ================= RESULT COUNT ================= */}
        {!fetchLoading && filteredCategories.length > 0 && (
          <div className="mt-4 text-sm text-[#7c8da4]">
            Showing{" "}
            <span className="font-semibold text-[#253b58]">
              {filteredCategories.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-[#253b58]">
              {categories.length}
            </span>{" "}
            categories
          </div>
        )}

        {/* ================= CREATE MODAL ================= */}
        {showForm && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-[2px]"
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) {
                setShowForm(false);
              }
            }}
          >
            <form
              onSubmit={handleSubmit}
              className="w-full max-w-[500px] overflow-hidden rounded-[22px] bg-white shadow-2xl"
            >

              {/* MODAL HEADER */}
              <div className="flex items-center justify-between border-b border-[#e8ebef] px-6 py-5">
                <div>
                  <h2 className="text-[21px] font-bold text-[#102744]">
                    Create Category
                  </h2>

                  <p className="mt-1 text-sm text-[#7c8da4]">
                    Add a new support article category.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setName("");
                  }}
                  className="flex h-9 w-9 items-center justify-center rounded-full text-[#718198] transition hover:bg-[#f3f5f7] hover:text-[#253b58]"
                >
                  <X size={20} />
                </button>
              </div>

              {/* MODAL BODY */}
              <div className="px-6 py-6">

                <label className="mb-2 block text-[14px] font-semibold text-[#253b58]">
                  Category Name
                </label>

                <input
                  type="text"
                  placeholder="Enter category name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoFocus
                  required
                  className="h-[55px] w-full rounded-[14px] border border-[#dfe4ea] bg-[#fafbfc] px-4 text-[16px] text-[#253b58] outline-none transition placeholder:text-[#9aa9bd] focus:border-[#ff7043] focus:ring-2 focus:ring-[#ff7043]/10"
                />
              </div>

              {/* MODAL FOOTER */}
              <div className="flex justify-end gap-3 border-t border-[#e8ebef] bg-[#fafbfc] px-6 py-4">

                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setName("");
                  }}
                  className="h-[45px] rounded-[12px] border border-[#dfe4ea] bg-white px-5 text-[15px] font-medium text-[#40536d] transition hover:bg-[#f5f7f9]"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading || !name.trim()}
                  className="h-[45px] rounded-[12px] bg-[#ff6900] px-6 text-[15px] font-semibold text-white transition hover:bg-[#ed5f00] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading ? "Saving..." : "Create Category"}
                </button>

              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogcategoryPage;






// "use client";

// import React, { useEffect, useState } from "react";
// import {
//   createBlogCategory,
//   getBlogCategory,
//   deleteBlogCategory,
// } from "@/app/services/api";
// import { Trash } from "lucide-react";

// const BlogcategoryPage = () => {
//   const [categories, setCategories] = useState<any[]>([]);
//   const [showForm, setShowForm] = useState(false);
//   const [name, setName] = useState("");
//   const [loading, setLoading] = useState(false);

//   // ✅ FETCH
//   const fetchCategories = async () => {
//     try {
//       const res = await getBlogCategory();
//       // console.log(res)
//       setCategories(res?.data || []);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   // ✅ CREATE
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       setLoading(true);
//       await createBlogCategory({ name }); // 🔥 YOUR API

//       setName("");
//       setShowForm(false);
//       fetchCategories();
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ DELETE
//   const handleDelete = async (id: string) => {
//     try {
//       await deleteBlogCategory(id); // 🔥 YOUR API
//       fetchCategories();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div className="p-6 min-h-screen bg-gray-100">
//       {/* HEADER */}
//       <div className="flex justify-between mb-6">
//         <h1 className="text-2xl font-bold">Blog Categories</h1>

//         <button
//           onClick={() => setShowForm(true)}
//           className="bg-green-600 text-white px-4 py-2 rounded"
//         >
//           Create Category
//         </button>
//       </div>

//       {/* DROPDOWN */}
//       {/* <select className="p-2 border rounded mb-6 w-64">
//         <option value="">Select Category</option>
//         {categories.map((cat) => (
//           <option key={cat._id} value={cat._id}>
//             {cat.name}
//           </option>
//         ))}
//       </select> */}

//       {/* LIST */}
//       <div className="bg-white p-4 rounded shadow">
//         {categories.length === 0 ? (
//           <p>No categories found</p>
//         ) : (
//           categories.map((cat) => (
//             <div
//               key={cat._id}
//               className="flex justify-between border-b py-2"
//             >
//               <span>{cat.name}</span>

//               <button
//                 onClick={() => handleDelete(cat._id)}
//                 className="text-red-500"
//               >
//                 <Trash />
//               </button>
//             </div>
//           ))
//         )}
//       </div>

//       {/* MODAL */}
//       {showForm && (
//         <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
//           <form
//             onSubmit={handleSubmit}
//             className="bg-gray-900 text-white p-6 rounded-xl w-full max-w-md"
//           >
//             <h2 className="text-lg mb-4">Create Category</h2>

//             <input
//               type="text"
//               placeholder="Category Name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="w-full p-2 mb-4 rounded bg-gray-800"
//               required
//             />

//             <div className="flex justify-end gap-2">
//               <button
//                 type="button"
//                 onClick={() => setShowForm(false)}
//                 className="bg-gray-600 px-4 py-2 rounded"
//               >
//                 Cancel
//               </button>

//               <button
//                 type="submit"
//                 className="bg-blue-600 px-4 py-2 rounded"
//                 disabled={loading}
//               >
//                 {loading ? "Saving..." : "Save"}
//               </button>
//             </div>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BlogcategoryPage;