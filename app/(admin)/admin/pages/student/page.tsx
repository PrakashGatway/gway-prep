"use client";

import { deleteStudent, getStudent } from "@/app/services/api";
import {
  Plus,
  Trash,
  Pencil,
  ChevronLeft,
  ChevronRight,
  Search,
  LayoutGrid,
  List,
  Mail,
  Phone,
  User,
  BookCheck,
  X,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, useCallback, useMemo } from "react";

// Types
interface Student {
  _id: string;
  name: string;
  image?: string;
  course?: string;
  email?: string;
  phone?: string;
  createdAt?: string;
}

interface PaginationData {
  total: number;
  totalPages: number;
  currentPage: number;
  limit: number;
}

const StudentPage = () => {
  const router = useRouter();

  // State management
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit] = useState(9);
  const [totalPages, setTotalPages] = useState(1);
  const [totalStudents, setTotalStudents] = useState(0);
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [notification, setNotification] = useState<{
    type: "success" | "error" | "info";
    message: string;
  } | null>(null);

  // Memoized values
  const shouldShowPagination = useMemo(() => totalPages > 1, [totalPages]);
  const pageNumbers = useMemo(() => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      const startPage = Math.max(2, page - 2);
      const endPage = Math.min(totalPages - 1, page + 2);
      
      if (startPage > 2) pages.push('...');
      for (let i = startPage; i <= endPage; i++) pages.push(i);
      if (endPage < totalPages - 1) pages.push('...');
      pages.push(totalPages);
    }
    return pages;
  }, [page, totalPages]);

  // Fetch students with debounced search
  const fetchStudents = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getStudent(search, page, limit);
      
      if (res?.data) {
        setStudents(res.data);
        setTotalPages(res?.pagination?.totalPages || res?.totalPages || 1);
        setTotalStudents(res?.pagination?.total || res?.total || 0);
      } else {
        setStudents([]);
        setTotalPages(1);
        setTotalStudents(0);
      }
    } catch (err) {
      console.error("Fetch students error:", err);
      setStudents([]);
      showNotification("error", "Failed to load students. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [search, page, limit]);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(filter);
      setPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [filter]);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  // Notification system
  const showNotification = (type: "success" | "error" | "info", message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  // Handle student deletion
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this student? This action cannot be undone.")) {
      return;
    }

    setDeletingId(id);
    try {
      const res = await deleteStudent(id);
      showNotification("success", res.message || "Student deleted successfully!");
      await fetchStudents(); // Refresh the list
      
      // If no students on current page and not on first page, go to previous page
      if (students.length === 1 && page > 1) {
        setPage(prev => prev - 1);
      }
    } catch (error) {
      console.error("Delete student error:", error);
      showNotification("error", "Failed to delete student. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  // Handle page change with validation
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Render loading skeletons
  const renderLoadingSkeletons = () => {
    if (viewMode === "grid") {
      return (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="h-52 animate-pulse rounded-2xl border border-gray-200 bg-white"
            />
          ))}
        </div>
      );
    }
    return (
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="h-20 animate-pulse border-b border-gray-100 bg-white"
          />
        ))}
      </div>
    );
  };

  // Render empty state
  const renderEmptyState = () => (
    <div className="rounded-2xl border border-gray-200 bg-white p-16 text-center shadow-sm">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-50">
        <User size={28} className="text-orange-500" />
      </div>
      <h3 className="mt-5 text-xl font-semibold text-gray-900">
        {search ? "No Students Found" : "No Students Yet"}
      </h3>
      <p className="mt-2 text-gray-500">
        {search 
          ? "Try adjusting your search or filters."
          : "Get started by adding your first student."}
      </p>
      {!search && (
        <button
          onClick={() => router.push("/admin/pages/student/add")}
          className="mx-auto mt-5 flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-2.5 text-white transition hover:bg-orange-600"
        >
          <Plus size={18} />
          Add Student
        </button>
      )}
      {search && (
        <button
          onClick={() => setFilter("")}
          className="mx-auto mt-5 flex items-center gap-2 rounded-xl bg-gray-100 px-5 py-2.5 text-gray-700 transition hover:bg-gray-200"
        >
          <X size={18} />
          Clear Search
        </button>
      )}
    </div>
  );

  // Render grid view
  const renderGridView = () => (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {students.map((student) => (
        <div
          key={student._id}
          className="group relative rounded-xl bg-white p-4 shadow-sm transition hover:shadow-lg hover:scale-[1.02]"
        >
          <div className="flex items-center gap-4">
            <div className="relative">
              {student.image ? (
                <img
                  src={student.image}
                  alt={student.name}
                  className="h-14 w-14 rounded-full border-2 border-orange-100 object-cover"
                />
              ) : (
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-50 text-orange-500">
                  <User size={24} />
                </div>
              )}
              {student.course && (
                <div className="absolute -bottom-1 -right-1 rounded-full bg-green-100 p-1">
                  <BookCheck size={12} className="text-green-600" />
                </div>
              )}
            </div>

            <div className="min-w-0 flex-1">
              <h2 className="truncate text-lg font-semibold text-gray-800 group-hover:text-orange-600 transition">
                {student.name}
              </h2>
              <p className="text-sm text-gray-500">
                ID: {student._id.slice(-8)}
              </p>
              {student.course && (
                <p className="text-xs text-gray-400 truncate">{student.course}</p>
              )}
            </div>
          </div>

          <div className="mt-5 flex justify-end gap-2 border-t border-gray-100 pt-3">
            <button
              onClick={() => router.push(`/admin/pages/student/${student._id}`)}
              className="rounded-md bg-blue-50 p-2 text-blue-600 transition hover:bg-blue-100 hover:scale-105"
              title="Edit student"
            >
              <Pencil size={17} />
            </button>
            <button
              onClick={() => handleDelete(student._id)}
              disabled={deletingId === student._id}
              className="rounded-md bg-red-50 p-2 text-red-600 transition hover:bg-red-100 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              title="Delete student"
            >
              {deletingId === student._id ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-red-600 border-t-transparent" />
              ) : (
                <Trash size={17} />
              )}
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  // Render list view
  const renderListView = () => (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="hidden grid-cols-[130px_250px_1fr_180px_140px] gap-4 border-b border-gray-200 bg-gray-50 px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500 md:grid">
        <div>Photo</div>
        <div>ID</div>
        <div>Student</div>
        <div>Course</div>
        <div className="text-right">Actions</div>
      </div>

      {students.map((student, index) => (
        <div
          key={student._id}
          className={`group grid grid-cols-1 items-center gap-3 px-6 py-4 transition hover:bg-orange-50/50 cursor-pointer
            md:grid-cols-[130px_250px_1fr_180px_140px] ${
              index !== students.length - 1 ? "border-b border-gray-100" : ""
            }`}
          onClick={() => router.push(`/admin/pages/student/${student._id}`)}
        >
          <div>
            {student.image ? (
              <img
                src={student.image}
                alt={student.name || "Student"}
                className="h-12 w-12 rounded-full border-2 border-orange-100 object-cover"
              />
            ) : (
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-50 text-orange-500">
                <User size={20} />
              </div>
            )}
          </div>

          <div className="text-sm text-gray-600 font-mono">
            {student._id.slice(-8)}
          </div>

          <div className="min-w-0">
            <h2 className="truncate font-semibold text-gray-900 group-hover:text-orange-600 transition">
              {student.name || "Unnamed Student"}
            </h2>
            {student.email && (
              <p className="truncate text-xs text-gray-500">{student.email}</p>
            )}
          </div>

          <div className="flex min-w-0 items-center gap-2 text-sm text-gray-600">
            <BookCheck size={15} className="shrink-0 text-gray-400" />
            <span className="truncate">{student.course || "-"}</span>
          </div>

          <div className="flex justify-end gap-2" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => router.push(`/admin/pages/student/${student._id}`)}
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-50 text-orange-500 transition hover:bg-orange-500 hover:text-white hover:scale-105"
              title="Edit student"
            >
              <Pencil size={16} />
            </button>
            <button
              onClick={() => handleDelete(student._id)}
              disabled={deletingId === student._id}
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-50 text-red-500 transition hover:bg-red-500 hover:text-white hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              title="Delete student"
            >
              {deletingId === student._id ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-red-600 border-t-transparent" />
              ) : (
                <Trash size={17} />
              )}
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  // Render pagination
  const renderPagination = () => (
    <div className="mt-6 flex flex-col items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-white px-6 py-4 shadow-sm md:flex-row">
      <p className="text-sm text-gray-600">
        Showing <span className="font-semibold text-gray-900">{((page - 1) * limit) + 1}</span> to{" "}
        <span className="font-semibold text-gray-900">
          {Math.min(page * limit, totalStudents)}
        </span>{" "}
        of <span className="font-semibold text-gray-900">{totalStudents}</span> students
      </p>

      <div className="flex items-center gap-2">
        <button
          disabled={page === 1}
          onClick={() => handlePageChange(page - 1)}
          className={`flex items-center gap-1 rounded-xl border px-3 py-2 text-sm transition ${
            page === 1
              ? "cursor-not-allowed bg-gray-100 text-gray-400"
              : "bg-white hover:border-orange-300 hover:bg-orange-50 hover:scale-105"
          }`}
        >
          <ChevronLeft size={16} />
          Previous
        </button>

        <div className="hidden items-center gap-1 sm:flex">
          {pageNumbers.map((pageNumber, index) => (
            <button
              key={index}
              onClick={() => typeof pageNumber === 'number' && handlePageChange(pageNumber)}
              disabled={pageNumber === '...'}
              className={`h-9 w-9 rounded-xl text-sm font-medium transition ${
                page === pageNumber
                  ? "bg-orange-500 text-white shadow-md"
                  : pageNumber === '...'
                  ? "cursor-default text-gray-400"
                  : "border border-gray-200 bg-white text-gray-600 hover:border-orange-300 hover:bg-orange-50 hover:scale-105"
              }`}
            >
              {pageNumber}
            </button>
          ))}
        </div>

        <div className="flex h-9 items-center rounded-xl border border-gray-200 px-3 text-sm sm:hidden">
          {page} / {totalPages}
        </div>

        <button
          disabled={page === totalPages}
          onClick={() => handlePageChange(page + 1)}
          className={`flex items-center gap-1 rounded-xl border px-3 py-2 text-sm transition ${
            page === totalPages
              ? "cursor-not-allowed bg-gray-100 text-gray-400"
              : "bg-white hover:border-orange-300 hover:bg-orange-50 hover:scale-105"
          }`}
        >
          Next
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Notification */}
      {notification && (
        <div className="fixed top-4 right-4 z-50 animate-slide-in">
          <div
            className={`flex items-center gap-3 rounded-2xl px-5 py-3 shadow-lg ${
              notification.type === "success"
                ? "bg-green-50 text-green-800 border border-green-200"
                : notification.type === "error"
                ? "bg-red-50 text-red-800 border border-red-200"
                : "bg-blue-50 text-blue-800 border border-blue-200"
            }`}
          >
            {notification.type === "success" && <CheckCircle size={20} className="text-green-600" />}
            {notification.type === "error" && <AlertCircle size={20} className="text-red-600" />}
            <span>{notification.message}</span>
            <button
              onClick={() => setNotification(null)}
              className="ml-2 text-gray-400 hover:text-gray-600 transition"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      )}

      <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Students</h1>
          <p className="mt-1 text-gray-500">
            {totalStudents > 0 
              ? `Managing ${totalStudents} student${totalStudents > 1 ? 's' : ''}`
              : "No students registered yet"}
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search by name or course..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-10 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
            />
            {filter && (
              <button
                onClick={() => setFilter("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
              >
                <X size={16} />
              </button>
            )}
          </div>

          <div className="flex items-center rounded-xl border border-gray-200 bg-white p-1">
            <button
              type="button"
              onClick={() => setViewMode("list")}
              className={`flex h-10 w-10 items-center justify-center rounded-lg transition ${
                viewMode === "list"
                  ? "bg-orange-500 text-white shadow-md"
                  : "text-gray-500 hover:bg-orange-50 hover:text-orange-500"
              }`}
              title="List view"
            >
              <List size={19} />
            </button>
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              className={`flex h-10 w-10 items-center justify-center rounded-lg transition ${
                viewMode === "grid"
                  ? "bg-orange-500 text-white shadow-md"
                  : "text-gray-500 hover:bg-orange-50 hover:text-orange-500"
              }`}
              title="Grid view"
            >
              <LayoutGrid size={19} />
            </button>
          </div>

          <button
            onClick={() => router.push("/admin/pages/student/add")}
            className="flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-2.5 text-white shadow-sm transition hover:bg-orange-600 hover:shadow-md hover:scale-105"
          >
            <Plus size={18} />
            Add Student
          </button>
        </div>
      </div>

      <div>
        {loading ? (
          renderLoadingSkeletons()
        ) : students.length === 0 ? (
          renderEmptyState()
        ) : (
          <>
            {viewMode === "grid" ? renderGridView() : renderListView()}
            {shouldShowPagination && renderPagination()}
          </>
        )}
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default StudentPage;






// "use client";

// import { deleteStudent, getStudent } from "@/app/services/api";
// import {
//   Plus,
//   Trash,
//   Pencil,
//   ChevronLeft,
//   ChevronRight,
//   Search,
// } from "lucide-react";
// import { useRouter } from "next/navigation";
// import React, { useState, useEffect } from "react";

// const StudentPage = () => {
//   const router = useRouter();

//   const [students, setStudents] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   const [page, setPage] = useState(1);
//   const [limit] = useState(9);

//   const [totalPages, setTotalPages] = useState(1);
//   const [totalStudents, setTotalStudents] = useState(0);

//   // Search states
//   const [filter, setFilter] = useState("");
//   const [search, setSearch] = useState("");

//   // Fetch students
//   const fetchStudent = async () => {
//     setLoading(true);

//     try {
//       const res = await getStudent(search, page, limit);

//       setStudents(res?.data || []);

//       // Update according to your API response
//       setTotalPages(
//         res?.pagination?.totalPages || res?.totalPages || 1
//       );
//       setTotalStudents(
//         res?.pagination?.total || res?.total || 0
//       );
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Debounce search
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setSearch(filter);
//       setPage(1);
//     }, 500);

//     return () => clearTimeout(timer);
//   }, [filter]);

//   useEffect(() => {
//     fetchStudent();
//   }, [page, search]);

//   const handleDelete = async (id: string) => {
//     if (!confirm("Are you sure you want to delete this student?")) return;

//     try {
//       const res = await deleteStudent(id);
//       alert(res.message);
//       fetchStudent();
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       {/* Header */}
//       <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-800">
//             Students ({totalStudents})
//           </h1>
//         </div>

//         <div className="flex flex-col gap-3 sm:flex-row">
//           <div className="relative">
//             <Search
//               size={18}
//               className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
//             />

//             <input
//               type="text"
//               placeholder="Search student..."
//               value={filter}
//               onChange={(e) => setFilter(e.target.value)}
//               className="w-full sm:w-72 rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-4 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
//             />
//           </div>

//           <button
//             onClick={() => router.push("/admin/pages/student/add")}
//             className="flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-green-500 to-green-600 px-5 py-2 text-white shadow hover:from-green-600 hover:to-green-700"
//           >
//             <Plus size={18} />
//             Add Student
//           </button>
//         </div>
//       </div>

//       {/* Students */}
//       <div className="rounded-xl border bg-white shadow-sm">
//         {loading ? (
//           <div className="p-10 text-center text-gray-500">
//             Loading students...
//           </div>
//         ) : students.length === 0 ? (
//           <div className="p-10 text-center text-gray-500">
//             No students found.
//           </div>
//         ) : (
//           <>
//             <div className="grid gap-5 p-5 md:grid-cols-2 lg:grid-cols-3">
//               {students.map((student) => (
//                 <div
//                   key={student._id}
//                   className="rounded-xl bg-orange-100 p-4 shadow-sm transition hover:shadow-md"
//                 >
//                   <div className="flex items-center gap-4">
//                     <img
//                       src={student.image}
//                       alt={student.name}
//                       className="h-14 w-14 rounded-full border object-cover"
//                     />

//                     <div>
//                       <h2 className="text-lg font-semibold text-gray-800">
//                         {student.name}
//                       </h2>

//                       <p className="text-sm text-gray-500">
//                         Student ID: {student._id.slice(-6)}
//                       </p>
//                     </div>
//                   </div>

//                   <div className="mt-5 flex justify-end gap-2">
//                     <button
//                       onClick={() =>
//                         router.push(`/admin/pages/student/${student._id}`)
//                       }
//                       className="rounded-md bg-blue-100 p-2 text-blue-600 transition hover:bg-blue-200"
//                     >
//                       <Pencil size={17} />
//                     </button>

//                     <button
//                       onClick={() => handleDelete(student._id)}
//                       className="rounded-md bg-red-100 p-2 text-red-600 transition hover:bg-red-200"
//                     >
//                       <Trash size={17} />
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Pagination */}
//             <div className="flex flex-col items-center justify-between gap-4 border-t px-6 py-4 md:flex-row">
//               <p className="text-sm text-gray-600">
//                 Showing Page{" "}
//                 <span className="font-semibold">{page}</span> of{" "}
//                 <span className="font-semibold">{totalPages}</span>
//               </p>

//               <div className="flex items-center gap-2">
//                 <button
//                   disabled={page === 1}
//                   onClick={() => setPage((prev) => prev - 1)}
//                   className={`flex items-center gap-1 rounded-md border px-3 py-2 ${
//                     page === 1
//                       ? "cursor-not-allowed bg-gray-100 text-gray-400"
//                       : "bg-white hover:bg-gray-100"
//                   }`}
//                 >
//                   <ChevronLeft size={16} />
//                   Previous
//                 </button>

//                 {Array.from({ length: totalPages }, (_, index) => (
//                   <button
//                     key={index}
//                     onClick={() => setPage(index + 1)}
//                     className={`h-10 w-10 rounded-md font-medium transition ${
//                       page === index + 1
//                         ? "bg-orange-500 text-white"
//                         : "border bg-white hover:bg-gray-100"
//                     }`}
//                   >
//                     {index + 1}
//                   </button>
//                 ))}

//                 <button
//                   disabled={page === totalPages}
//                   onClick={() => setPage((prev) => prev + 1)}
//                   className={`flex items-center gap-1 rounded-md border px-3 py-2 ${
//                     page === totalPages
//                       ? "cursor-not-allowed bg-gray-100 text-gray-400"
//                       : "bg-white hover:bg-gray-100"
//                   }`}
//                 >
//                   Next
//                   <ChevronRight size={16} />
//                 </button>
//               </div>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default StudentPage;
