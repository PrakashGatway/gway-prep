"use client";

import React, { useEffect, useState } from "react";
// import {
//   createAuthor,
//   getAuthors,
//   updateAuthor,
//   deleteAuthor,
// } from "@/app/services/api";

import {
  Plus,
  Trash2,
  Pencil,
  X,
  User,
  GraduationCap,
  Briefcase,
  Linkedin,
  Globe,
  Save,
} from "lucide-react";

import CKEditorComponent from "../../components/ckEditor";
import axiosInstance from "@/app/lib/axios";

interface Author {
  _id?: string;
  name: string;
  slug: string;
  subtitle: string;
  image: string;
  shortBio: string;
  details: string;
  specializations: string[];
  experience: string;
  education: string;
  linkedin: string;
  website: string;
  isActive: boolean;
}

const emptyAuthor: Author = {
  name: "",
  subtitle: "",
  slug : "",
  image: "",
  shortBio: "",
  details: "",
  specializations: [""],
  experience: "",
  education: "",
  linkedin: "",
  website: "",
  isActive: true,
};

const AuthorPage = () => {
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState<Author>(emptyAuthor);

  const [editingId, setEditingId] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);


  const [authors, setAuthors] = useState<Author[]>([]);
  const fetchAuthors = async () => {
    try {
      setFetchLoading(true);

      const res = await axiosInstance.get('/admin/auther');

      console.log("Authors:", res.data);

      setAuthors(res?.data.data || []);
    } catch (error) {
      console.error("Failed to fetch authors:", error);
    } finally {
      setFetchLoading(false);
    }
  };

  useEffect(() => {
    fetchAuthors();
  }, []);

  

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  

  const handleSpecializationChange = (
    index: number,
    value: string
  ) => {
    const updated = [...formData.specializations];

    updated[index] = value;

    setFormData((prev) => ({
      ...prev,
      specializations: updated,
    }));
  };

  

  const addSpecialization = () => {
    setFormData((prev) => ({
      ...prev,
      specializations: [
        ...prev.specializations,
        "",
      ],
    }));
  };

  

  const removeSpecialization = (index: number) => {
    if (formData.specializations.length === 1) {
      return;
    }

    setFormData((prev) => ({
      ...prev,
      specializations: prev.specializations.filter(
        (_, i) => i !== index
      ),
    }));
  };
  

  const handleDetailsChange = (data: string) => {
    setFormData((prev) => ({
      ...prev,
      details: data,
    }));
  };

  

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert("Please enter author name");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        ...formData,
        
        specializations:
          formData.specializations.filter(
            (item) => item.trim() !== ""
          ),
      };

      console.log('payload', payload);

      if (editingId) {
        // UPDATE
        // await updateAuthor(editingId, payload);
        let data = {
            id : editingId, 
            
        ...formData,
        
        specializations:
          formData.specializations.filter(
            (item) => item.trim() !== ""
          ),
      
        };
        const api = await axiosInstance.put('/admin/auther',data);
            console.log('api',api);
      } else {
        // CREATE
        // await createAuthor(payload);
        const api = await axiosInstance.post('/admin/auther',payload);
        console.log(api, "api ")
      }

      await fetchAuthors();

      closeModal();
    } catch (error) {
      console.error(
        "Failed to save author:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  

  const handleEdit = (author: Author) => {
    setEditingId(author._id || null);

    setFormData({
      name: author.name || "",
      subtitle: author.subtitle || "",
      slug : author.slug || "",
      image: author.image || "",
      shortBio: author.shortBio || "",
      details: author.details || "",
      specializations:
        author.specializations?.length > 0
          ? author.specializations
          : [""],
      experience: author.experience || "",
      education: author.education || "",
      linkedin: author.linkedin || "",
      website: author.website || "",
      isActive:
        author.isActive !== undefined
          ? author.isActive
          : true,
    });

    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this author?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      setDeleteLoading(id);

    //   await deleteAuthor(id);
    const api = await axiosInstance.delete('/admin/auther', { data: { id } });
    console.log('api',api);

      await fetchAuthors();
    } catch (error) {
      console.error(
        "Failed to delete author:",
        error
      );
    } finally {
      setDeleteLoading(null);
    }
  };

  const openCreateModal = () => {
    setEditingId(null);
    setFormData(emptyAuthor);
    setShowForm(true);
  };


  const closeModal = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData(emptyAuthor);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">


      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Authors
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage Ooshas Prep authors and their profiles.
          </p>
        </div>

        <button
          type="button"
          onClick={openCreateModal}
          className="flex w-fit items-center gap-2 rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-orange-600"
        >
          <Plus size={18} />

          Create Author
        </button>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">

        {fetchLoading ? (
          <div className="flex min-h-[250px] items-center justify-center">
            <p className="text-sm text-gray-500">
              Loading authors...
            </p>
          </div>
        ) : authors.length === 0 ? (
          <div className="flex min-h-[250px] flex-col items-center justify-center">

            <div className="mb-3 rounded-full bg-orange-50 p-4">
              <User
                size={28}
                className="text-orange-500"
              />
            </div>

            <h3 className="font-semibold text-gray-900">
              No authors found
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Create your first author profile.
            </p>

            <button
              onClick={openCreateModal}
              className="mt-4 flex items-center gap-2 rounded-lg bg-orange-500 px-4 py-2 text-sm text-white hover:bg-orange-600"
            >
              <Plus size={16} />
              Create Author
            </button>

          </div>
        ) : (
          <div className="divide-y divide-gray-100">

            {authors.map((author) => (
              <div
                key={author._id}
                className="flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between"
              >

                {/* AUTHOR INFO */}

                <div className="flex items-center gap-4">

                  {author.image ? (
                    <img
                      src={author.image}
                      alt={author.name}
                      className="h-16 w-16 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-orange-100">
                      <User
                        size={28}
                        className="text-orange-500"
                      />
                    </div>
                  )}

                  <div>

                    <h3 className="font-semibold text-gray-900">
                      {author.name}
                    </h3>

                    {author.subtitle && (
                      <p className="text-sm text-gray-500">
                        {author.subtitle}
                      </p>
                    )}

                    <div className="mt-2 flex flex-wrap gap-2">

                      {author.experience && (
                        <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-600">
                          {author.experience}
                        </span>
                      )}

                      {author.specializations
                        ?.slice(0, 3)
                        .map((item, index) => (
                          <span
                            key={index}
                            className="rounded-full bg-orange-50 px-2.5 py-1 text-xs text-orange-600"
                          >
                            {item}
                          </span>
                        ))}

                    </div>

                  </div>

                </div>

                {/* ACTIONS */}

                <div className="flex items-center gap-2">

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      author.isActive
                        ? "bg-green-50 text-green-600"
                        : "bg-red-50 text-red-600"
                    }`}
                  >
                    {author.isActive
                      ? "Active"
                      : "Inactive"}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      handleEdit(author)
                    }
                    className="rounded-lg border border-gray-200 p-2 text-gray-600 transition hover:bg-gray-50 hover:text-orange-500"
                  >
                    <Pencil size={17} />
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      author._id &&
                      handleDelete(author._id)
                    }
                    disabled={
                      deleteLoading === author._id
                    }
                    className="rounded-lg border border-red-100 p-2 text-red-500 transition hover:bg-red-50 disabled:opacity-50"
                  >
                    <Trash2 size={17} />
                  </button>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>


      {showForm && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 p-4">

          <div className="flex max-h-[95vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">

            {/* MODAL HEADER */}

            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">

              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {editingId
                    ? "Edit Author"
                    : "Create Author"}
                </h2>

                <p className="mt-1 text-xs text-gray-500">
                  Add author information for Ooshas Prep.
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
              >
                <X size={20} />
              </button>

            </div>

            {/* FORM */}

            <form
              onSubmit={handleSubmit}
              className="overflow-y-auto"
            >

              <div className="space-y-6 p-6">

                <div>

                  <div className="mb-4 flex items-center gap-2">

                    <div className="rounded-lg bg-orange-50 p-2">
                      <User
                        size={18}
                        className="text-orange-500"
                      />
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Basic Information
                      </h3>

                      <p className="text-xs text-gray-500">
                        Author profile information
                      </p>
                    </div>

                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                    {/* NAME */}

                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700">
                        Author Name *
                      </label>

                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter author name"
                        required
                        className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                      />
                    </div>

                    
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700">
                        Slug *
                      </label>

                      <input
                        type="text"
                        name="slug"
                        value={formData.slug}
                        onChange={handleChange}
                        placeholder="Enter author slug"
                        required
                        className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                      />
                    </div>

                    {/* SUBTITLE */}

                    <div className="md:col-span-2">
                      <label className="mb-1.5 block text-sm font-medium text-gray-700">
                        Subtitle / Designation
                      </label>

                      <input
                        type="text"
                        name="subtitle"
                        value={formData.subtitle}
                        onChange={handleChange}
                        placeholder="e.g. Senior Education Consultant"
                        className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                      />
                    </div>

                    {/* IMAGE */}

                    <div className="md:col-span-2">
                      <label className="mb-1.5 block text-sm font-medium text-gray-700">
                        Profile Image URL
                      </label>

                      <input
                        type="text"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        placeholder="https://example.com/author.jpg"
                        className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                      />

                      {formData.image && (
                        <div className="mt-3">
                          <img
                            src={formData.image}
                            alt="Preview"
                            className="h-20 w-20 rounded-full object-cover"
                          />
                        </div>
                      )}
                    </div>

                    {/* SHORT BIO */}

                    <div className="md:col-span-2">

                      <label className="mb-1.5 block text-sm font-medium text-gray-700">
                        Short Bio
                      </label>

                      <textarea
                        name="shortBio"
                        value={formData.shortBio}
                        onChange={handleChange}
                        rows={3}
                        placeholder="Write a short introduction about the author..."
                        className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                      />

                    </div>

                  </div>

                </div>


                <div>

                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Author Details
                  </label>

                  <div className="overflow-hidden rounded-lg border border-gray-300">

                    <CKEditorComponent
                      value={formData.details}
                      onChange={handleDetailsChange}
                    />

                  </div>

                </div>

                <div>

                  <div className="mb-3 flex items-center justify-between">

                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Specializations
                      </h3>

                      <p className="text-xs text-gray-500">
                        Add areas in which the author specializes.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={addSpecialization}
                      className="flex items-center gap-1.5 rounded-lg bg-orange-50 px-3 py-2 text-sm font-medium text-orange-600 hover:bg-orange-100"
                    >
                      <Plus size={16} />
                      Add
                    </button>

                  </div>

                  <div className="space-y-3">

                    {formData.specializations.map(
                      (specialization, index) => (
                        <div
                          key={index}
                          className="flex gap-2"
                        >

                          <input
                            type="text"
                            value={specialization}
                            onChange={(e) =>
                              handleSpecializationChange(
                                index,
                                e.target.value
                              )
                            }
                            placeholder={`Specialization ${
                              index + 1
                            }`}
                            className="flex-1 rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                          />

                          <button
                            type="button"
                            onClick={() =>
                              removeSpecialization(
                                index
                              )
                            }
                            className="rounded-lg border border-red-100 px-3 text-red-500 hover:bg-red-50"
                          >
                            <Trash2 size={17} />
                          </button>

                        </div>
                      )
                    )}

                  </div>

                </div>


                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                  {/* EXPERIENCE */}

                  <div>

                    <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-gray-700">
                      <Briefcase
                        size={16}
                        className="text-orange-500"
                      />
                      Experience
                    </label>

                    <input
                      type="text"
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      placeholder="e.g. 8+ Years"
                      className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                    />

                  </div>

                  {/* EDUCATION */}

                  <div>

                    <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-gray-700">
                      <GraduationCap
                        size={16}
                        className="text-orange-500"
                      />
                      Education
                    </label>

                    <input
                      type="text"
                      name="education"
                      value={formData.education}
                      onChange={handleChange}
                      placeholder="e.g. MBA, University of Delhi"
                      className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                    />

                  </div>

                </div>

                <div>

                  <h3 className="mb-3 font-semibold text-gray-900">
                    Social & Website
                  </h3>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                    {/* LINKEDIN */}

                    <div>

                      <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-gray-700">
                        <Linkedin
                          size={16}
                          className="text-orange-500"
                        />
                        LinkedIn
                      </label>

                      <input
                        type="text"
                        name="linkedin"
                        value={formData.linkedin}
                        onChange={handleChange}
                        placeholder="https://linkedin.com/in/..."
                        className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                      />

                    </div>

                    {/* WEBSITE */}

                    {/* <div>

                      <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-gray-700">
                        <Globe
                          size={16}
                          className="text-orange-500"
                        />
                        Website
                      </label>

                      <input
                        type="text"
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                        placeholder="https://example.com"
                        className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                      />

                    </div> */}

                  </div>

                </div>


                <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-4">

                  <div>
                    <h3 className="text-sm font-medium text-gray-900">
                      Author Status
                    </h3>

                    <p className="mt-1 text-xs text-gray-500">
                      Inactive authors will not be shown publicly.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        isActive: !prev.isActive,
                      }))
                    }
                    className={`relative h-6 w-11 rounded-full transition ${
                      formData.isActive
                        ? "bg-orange-500"
                        : "bg-gray-300"
                    }`}
                  >

                    <span
                      className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
                        formData.isActive
                          ? "left-6"
                          : "left-1"
                      }`}
                    />

                  </button>

                </div>

              </div>


              <div className="sticky bottom-0 flex items-center justify-end gap-3 border-t border-gray-200 bg-white px-6 py-4">

                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center gap-2 rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
                >

                  <Save size={17} />

                  {loading
                    ? "Saving..."
                    : editingId
                    ? "Update Author"
                    : "Save Author"}

                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
};

export default AuthorPage;