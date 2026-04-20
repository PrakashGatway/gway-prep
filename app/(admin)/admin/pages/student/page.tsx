"use client";

import { deleteStudent, getStudent } from "@/app/services/api";
import { Plus, Trash, Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

const Blog = () => {
  const router = useRouter();
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchStudent = async () => {
    try {
      const res = await getStudent();
      setStudents(res?.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudent();
  }, []);

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
    <div className="p-6 min-h-screen bg-gray-100">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">
          Students
        </h1>

        <button
          onClick={() => router.push("/admin/pages/student/add")}
          className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-5 py-2 rounded-lg shadow-md transition"
        >
          <Plus size={18} /> Add Student
        </button>
      </div>

      {/* CONTENT */}
      <div className="bg-white rounded-xl shadow-sm border">
        {loading ? (
          <p className="p-6 text-gray-500">Loading...</p>
        ) : students.length === 0 ? (
          <p className="p-6 text-gray-500 text-center">
            No students found
          </p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 p-5">
            {students.map((student) => (
              <div
                key={student._id}
                className="bg-gray-50 rounded-xl p-4 shadow-sm hover:shadow-md transition"
              >
                {/* IMAGE + NAME */}
                <div className="flex items-center gap-4">
                  <img
                    src={student.image}
                    alt="student"
                    className="h-14 w-14 rounded-full object-cover border"
                  />
                  <div>
                    <h2 className="font-semibold text-lg text-gray-800">
                      {student.name}
                    </h2>
                    <p className="text-sm text-gray-500">
                      Student ID: {student._id.slice(-6)}
                    </p>
                  </div>
                </div>

                {/* ACTIONS */}
                <div className="flex justify-end gap-3 mt-4">
                  <button
                    onClick={() =>
                      router.push(`/admin/pages/student/edit/${student._id}`)
                    }
                    className="p-2 rounded-md bg-blue-100 text-blue-600 hover:bg-blue-200 transition"
                  >
                    <Pencil size={16} />
                  </button>

                  <button
                    onClick={() => handleDelete(student._id)}
                    className="p-2 rounded-md bg-red-100 text-red-600 hover:bg-red-200 transition"
                  >
                    <Trash size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;