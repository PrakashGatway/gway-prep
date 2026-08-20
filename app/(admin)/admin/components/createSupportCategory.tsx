"use client";

import { useState } from "react";
import { FolderOpen, Loader2, Plus, X } from "lucide-react";
import toast from "react-hot-toast";

import CKEditorComponent from "./ckEditor";
import axiosInstance from "@/app/lib/axios";


interface CreateCategoryProps {
    open: boolean;
    onClose: () => void;
    onCreated: () => void;
}

const CreateCategory = ({
    open,
    onClose,
    onCreated,
}: CreateCategoryProps) => {

    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        name: "",
        description: "",
        slug: "",
    });

    // ==============================
    // INPUT CHANGE
    // ==============================

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement
        >
    ) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // ==============================
    // CREATE CATEGORY
    // ==============================

    const handleSubmit = async () => {

        if (!form.name.trim()) {
            toast.error("Category name is required");
            return;
        }

        if (!form.slug.trim()) {
            toast.error("Category slug is required");
            return;
        }

        if (!form.description.trim()) {
            toast.error("Description is required");
            return;
        }

        try {
            setLoading(true);

            const res = await axiosInstance.post(
                "category",
                form
            );

            if (res.data.success) {

                toast.success(
                    "Category created successfully"
                );

                setForm({
                    name: "",
                    description: "",
                    slug: "",
                });

                onClose();
                onCreated();
            }

        } catch (error: any) {

            console.error(
                "CREATE CATEGORY ERROR:",
                error
            );

            toast.error(
                error?.response?.data?.message ||
                "Failed to create category"
            );

        } finally {
            setLoading(false);
        }
    };

    if (!open) return null;

    return (
        <div
            className="
                fixed inset-0 z-[100]
                flex items-center justify-center
                bg-black/40
                p-3 sm:p-5
                backdrop-blur-md
            "
        >

            <div
                className="
                    flex w-full max-w-lg
                    max-h-[92vh]
                    flex-col
                    overflow-hidden
                    rounded-2xl
                    border border-white/60
                    bg-white
                    shadow-2xl
                "
            >

                {/* ================= HEADER ================= */}

                <div
                    className="
                        flex shrink-0
                        items-center justify-between
                        border-b border-gray-100
                        px-4 py-3.5
                        sm:px-5
                    "
                >

                    <div className="flex items-center gap-3">

                        <div
                            className="
                                flex h-9 w-9
                                items-center justify-center
                                rounded-xl
                                bg-orange-50
                                text-orange-500
                            "
                        >
                            <FolderOpen size={18} />
                        </div>

                        <div>
                            <h2
                                className="
                                    text-[15px]
                                    font-bold
                                    text-gray-900
                                "
                            >
                                Create Category
                            </h2>

                            <p
                                className="
                                    mt-0.5
                                    text-[10px]
                                    text-gray-400
                                "
                            >
                                Add a new category to your support center
                            </p>
                        </div>

                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        disabled={loading}
                        className="
                            flex h-8 w-8
                            items-center justify-center
                            rounded-lg
                            text-gray-400
                            transition
                            hover:bg-gray-100
                            hover:text-gray-700
                        "
                    >
                        <X size={17} />
                    </button>

                </div>

                {/* ================= BODY ================= */}

                <div
                    className="
                        min-h-0
                        flex-1
                        overflow-y-auto
                        p-4 sm:p-5
                    "
                >

                    <div className="space-y-4">

                        {/* ================= NAME + SLUG ================= */}

                        <div
                            className="
                                grid grid-cols-1
                                gap-4
                                sm:grid-cols-2
                            "
                        >

                            {/* NAME */}

                            <div>

                                <label
                                    className="
                                        mb-1.5 block
                                        text-[11px]
                                        font-semibold
                                        text-gray-600
                                    "
                                >
                                    Category Name

                                    <span className="ml-1 text-red-500">
                                        *
                                    </span>
                                </label>

                                <input
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="Enter category name"
                                    className="
                                        h-10 w-full
                                        rounded-lg
                                        border border-gray-200
                                        bg-gray-50
                                        px-3
                                        text-[12px]
                                        text-gray-700
                                        outline-none
                                        transition
                                        placeholder:text-gray-400
                                        focus:border-orange-400
                                        focus:bg-white
                                        focus:ring-4
                                        focus:ring-orange-500/10
                                    "
                                />

                            </div>

                            {/* SLUG */}

                            <div>

                                <label
                                    className="
                                        mb-1.5 block
                                        text-[11px]
                                        font-semibold
                                        text-gray-600
                                    "
                                >
                                    Slug

                                    <span className="ml-1 text-red-500">
                                        *
                                    </span>
                                </label>

                                <input
                                    name="slug"
                                    value={form.slug}
                                    onChange={handleChange}
                                    placeholder="category-slug"
                                    className="
                                        h-10 w-full
                                        rounded-lg
                                        border border-gray-200
                                        bg-gray-50
                                        px-3
                                        text-[12px]
                                        text-gray-700
                                        outline-none
                                        transition
                                        placeholder:text-gray-400
                                        focus:border-orange-400
                                        focus:bg-white
                                        focus:ring-4
                                        focus:ring-orange-500/10
                                    "
                                />

                            </div>

                        </div>

                        {/* ================= DESCRIPTION ================= */}

                        <div>

                            <label
                                className="
                                    mb-1.5 block
                                    text-[11px]
                                    font-semibold
                                    text-gray-600
                                "
                            >
                                Description

                                <span className="ml-1 text-red-500">
                                    *
                                </span>
                            </label>
                            <CKEditorComponent value={form.description}  onChange={(data:string)=>{(
                            setForm((prev)=>({
                                ...prev,
                                description : data
                            }))
                           )}} />

                            <p className="mt-1 text-right text-[9px] text-gray-400">
                                {form.description.length}/250
                            </p>

                        </div>

                    </div>

                </div>

                {/* ================= FOOTER ================= */}

                <div
                    className="
                        flex shrink-0
                        justify-end gap-2
                        border-t border-gray-100
                        bg-white
                        px-4 py-3
                        sm:px-5
                    "
                >

                    <button
                        type="button"
                        onClick={onClose}
                        disabled={loading}
                        className="
                            h-9
                            rounded-lg
                            border border-gray-200
                            px-4
                            text-[11px]
                            font-medium
                            text-gray-600
                            transition
                            hover:bg-gray-50
                        "
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={loading}
                        className="
                            flex h-9
                            items-center gap-2
                            rounded-lg
                            bg-orange-500
                            px-4
                            text-[11px]
                            font-semibold
                            text-white
                            transition
                            hover:bg-orange-600
                            disabled:cursor-not-allowed
                            disabled:opacity-60
                        "
                    >

                        {loading ? (
                            <Loader2
                                size={14}
                                className="animate-spin"
                            />
                        ) : (
                            <Plus size={14} />
                        )}

                        {loading
                            ? "Creating..."
                            : "Create Category"
                        }

                    </button>

                </div>

            </div>

        </div>
    );
};



import { useEffect} from "react";
import {
 
    Save,
 
} from "lucide-react";


interface EditCategoryProps {
    open: boolean;
    onClose: () => void;
    category: any;
    onUpdated: () => void;
}

export const EditCategory = ({
    open,
    onClose,
    category,
    onUpdated,
}: EditCategoryProps) => {

    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        name: "",
        description: "",
        slug: "",
    });

    // ==============================
    // SET CATEGORY DATA
    // ==============================

    useEffect(() => {
        if (category) {
            setForm({
                name: category.name || "",
                description: category.description || "",
                slug: category.slug || "",
            });
        }
    }, [category]);

    // ==============================
    // INPUT CHANGE
    // ==============================

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement
        >
    ) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // ==============================
    // UPDATE CATEGORY
    // ==============================

    const handleSubmit = async () => {

        if (!form.name.trim()) {
            toast.error("Category name is required");
            return;
        }

        if (!form.slug.trim()) {
            toast.error("Category slug is required");
            return;
        }

        if (!form.description.trim()) {
            toast.error("Description is required");
            return;
        }

        try {
            setLoading(true);

            const res = await axiosInstance.put(
                `/category?slug=${category.slug}`,
                {
                    name: form.name,
                    description: form.description,
                    slug: form.slug,
                }
            );

            if (res.data.success) {

                toast.success(
                    "Category updated successfully"
                );

                onClose();
                onUpdated();
            }

        } catch (error: any) {

            console.error(
                "UPDATE CATEGORY ERROR:",
                error
            );

            toast.error(
                error?.response?.data?.message ||
                "Failed to update category"
            );

        } finally {
            setLoading(false);
        }
    };

    if (!open) return null;

    return (
        <div
            className="
                fixed inset-0 z-[100]
                flex items-center justify-center
                bg-black/40
                p-3 sm:p-5
                backdrop-blur-md
            "
        >

            <div
                className="
                    flex w-full max-w-lg
                    max-h-[92vh]
                    flex-col
                    overflow-hidden
                    rounded-2xl
                    border border-white/60
                    bg-white
                    shadow-2xl
                "
            >

                {/* ================= HEADER ================= */}

                <div
                    className="
                        flex shrink-0
                        items-center justify-between
                        border-b border-gray-100
                        px-4 py-3.5
                        sm:px-5
                    "
                >

                    <div className="flex items-center gap-3">

                        <div
                            className="
                                flex h-9 w-9
                                items-center justify-center
                                rounded-xl
                                bg-orange-50
                                text-orange-500
                            "
                        >
                            <FolderOpen size={18} />
                        </div>

                        <div>

                            <h2
                                className="
                                    text-[15px]
                                    font-bold
                                    text-gray-900
                                "
                            >
                                Edit Category
                            </h2>

                            <p
                                className="
                                    mt-0.5
                                    text-[10px]
                                    text-gray-400
                                "
                            >
                                Update your support category details
                            </p>

                        </div>

                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        disabled={loading}
                        className="
                            flex h-8 w-8
                            items-center justify-center
                            rounded-lg
                            text-gray-400
                            transition
                            hover:bg-gray-100
                            hover:text-gray-700
                        "
                    >
                        <X size={17} />
                    </button>

                </div>

                {/* ================= BODY ================= */}

                <div
                    className="
                        min-h-0
                        flex-1
                        overflow-y-auto
                        p-4 sm:p-5
                    "
                >

                    <div className="space-y-4">

                        {/* ================= NAME + SLUG ================= */}

                        <div
                            className="
                                grid grid-cols-1
                                gap-4
                                sm:grid-cols-2
                            "
                        >

                            {/* NAME */}

                            <div>

                                <label
                                    className="
                                        mb-1.5 block
                                        text-[11px]
                                        font-semibold
                                        text-gray-600
                                    "
                                >
                                    Category Name

                                    <span className="ml-1 text-red-500">
                                        *
                                    </span>
                                </label>

                                <input
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="Enter category name"
                                    className="
                                        h-10 w-full
                                        rounded-lg
                                        border border-gray-200
                                        bg-gray-50
                                        px-3
                                        text-[12px]
                                        text-gray-700
                                        outline-none
                                        transition
                                        placeholder:text-gray-400
                                        focus:border-orange-400
                                        focus:bg-white
                                        focus:ring-4
                                        focus:ring-orange-500/10
                                    "
                                />

                            </div>

                            {/* SLUG */}

                            <div>

                                <label
                                    className="
                                        mb-1.5 block
                                        text-[11px]
                                        font-semibold
                                        text-gray-600
                                    "
                                >
                                    Slug

                                    <span className="ml-1 text-red-500">
                                        *
                                    </span>
                                </label>

                                <input
                                    name="slug"
                                    value={form.slug}
                                    onChange={handleChange}
                                    placeholder="category-slug"
                                    className="
                                        h-10 w-full
                                        rounded-lg
                                        border border-gray-200
                                        bg-gray-50
                                        px-3
                                        text-[12px]
                                        text-gray-700
                                        outline-none
                                        transition
                                        placeholder:text-gray-400
                                        focus:border-orange-400
                                        focus:bg-white
                                        focus:ring-4
                                        focus:ring-orange-500/10
                                    "
                                />

                            </div>

                        </div>

                        {/* ================= DESCRIPTION ================= */}

                        <div>

                            <label
                                className="
                                    mb-1.5 block
                                    text-[11px]
                                    font-semibold
                                    text-gray-600
                                "
                            >
                                Description

                                <span className="ml-1 text-red-500">
                                    *
                                </span>
                            </label>

                            <CKEditorComponent
                                value={form.description}
                                onChange={(data: string) => {
                                    setForm((prev) => ({
                                        ...prev,
                                        description: data,
                                    }));
                                }}
                            />

                            <p className="mt-1 text-right text-[9px] text-gray-400">
                                {form.description.length}/250
                            </p>

                        </div>

                    </div>

                </div>

                {/* ================= FOOTER ================= */}

                <div
                    className="
                        flex shrink-0
                        justify-end gap-2
                        border-t border-gray-100
                        bg-white
                        px-4 py-3
                        sm:px-5
                    "
                >

                    <button
                        type="button"
                        onClick={onClose}
                        disabled={loading}
                        className="
                            h-9
                            rounded-lg
                            border border-gray-200
                            px-4
                            text-[11px]
                            font-medium
                            text-gray-600
                            transition
                            hover:bg-gray-50
                        "
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={loading}
                        className="
                            flex h-9
                            items-center gap-2
                            rounded-lg
                            bg-orange-500
                            px-4
                            text-[11px]
                            font-semibold
                            text-white
                            transition
                            hover:bg-orange-600
                            disabled:cursor-not-allowed
                            disabled:opacity-60
                        "
                    >

                        {loading ? (
                            <Loader2
                                size={14}
                                className="animate-spin"
                            />
                        ) : (
                            <Save size={14} />
                        )}

                        {loading
                            ? "Updating..."
                            : "Update Category"
                        }

                    </button>

                </div>

            </div>

        </div>
    );
};



export default CreateCategory;