"use client";

import { deleteStudent, getStudent } from "@/app/services/api";
import {
  Plus,
  Trash,
  Pencil,
  ChevronLeft,
  ChevronRight,
  Search,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

const StudentPage = () => {
  const router = useRouter();

  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [limit] = useState(9);

  const [totalPages, setTotalPages] = useState(1);
  const [totalStudents, setTotalStudents] = useState(0);

  // Search states
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");

  // Fetch students
  const fetchStudent = async () => {
    setLoading(true);

    try {
      const res = await getStudent(search, page, limit);

      setStudents(res?.data || []);

      // Update according to your API response
      setTotalPages(
        res?.pagination?.totalPages || res?.totalPages || 1
      );
      setTotalStudents(
        res?.pagination?.total || res?.total || 0
      );
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(filter);
      setPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [filter]);

  useEffect(() => {
    fetchStudent();
  }, [page, search]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this student?")) return;

    try {
      const res = await deleteStudent(id);
      alert(res.message);
      fetchStudent();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Students ({totalStudents})
          </h1>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search student..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full sm:w-72 rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-4 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
            />
          </div>

          <button
            onClick={() => router.push("/admin/pages/student/add")}
            className="flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-green-500 to-green-600 px-5 py-2 text-white shadow hover:from-green-600 hover:to-green-700"
          >
            <Plus size={18} />
            Add Student
          </button>
        </div>
      </div>

      {/* Students */}
      <div className="rounded-xl border bg-white shadow-sm">
        {loading ? (
          <div className="p-10 text-center text-gray-500">
            Loading students...
          </div>
        ) : students.length === 0 ? (
          <div className="p-10 text-center text-gray-500">
            No students found.
          </div>
        ) : (
          <>
            <div className="grid gap-5 p-5 md:grid-cols-2 lg:grid-cols-3">
              {students.map((student) => (
                <div
                  key={student._id}
                  className="rounded-xl bg-orange-100 p-4 shadow-sm transition hover:shadow-md"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={student.image}
                      alt={student.name}
                      className="h-14 w-14 rounded-full border object-cover"
                    />

                    <div>
                      <h2 className="text-lg font-semibold text-gray-800">
                        {student.name}
                      </h2>

                      <p className="text-sm text-gray-500">
                        Student ID: {student._id.slice(-6)}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 flex justify-end gap-2">
                    <button
                      onClick={() =>
                        router.push(`/admin/pages/student/${student._id}`)
                      }
                      className="rounded-md bg-blue-100 p-2 text-blue-600 transition hover:bg-blue-200"
                    >
                      <Pencil size={17} />
                    </button>

                    <button
                      onClick={() => handleDelete(student._id)}
                      className="rounded-md bg-red-100 p-2 text-red-600 transition hover:bg-red-200"
                    >
                      <Trash size={17} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex flex-col items-center justify-between gap-4 border-t px-6 py-4 md:flex-row">
              <p className="text-sm text-gray-600">
                Showing Page{" "}
                <span className="font-semibold">{page}</span> of{" "}
                <span className="font-semibold">{totalPages}</span>
              </p>

              <div className="flex items-center gap-2">
                <button
                  disabled={page === 1}
                  onClick={() => setPage((prev) => prev - 1)}
                  className={`flex items-center gap-1 rounded-md border px-3 py-2 ${
                    page === 1
                      ? "cursor-not-allowed bg-gray-100 text-gray-400"
                      : "bg-white hover:bg-gray-100"
                  }`}
                >
                  <ChevronLeft size={16} />
                  Previous
                </button>

                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index}
                    onClick={() => setPage(index + 1)}
                    className={`h-10 w-10 rounded-md font-medium transition ${
                      page === index + 1
                        ? "bg-orange-500 text-white"
                        : "border bg-white hover:bg-gray-100"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}

                <button
                  disabled={page === totalPages}
                  onClick={() => setPage((prev) => prev + 1)}
                  className={`flex items-center gap-1 rounded-md border px-3 py-2 ${
                    page === totalPages
                      ? "cursor-not-allowed bg-gray-100 text-gray-400"
                      : "bg-white hover:bg-gray-100"
                  }`}
                >
                  Next
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default StudentPage;