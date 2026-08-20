"use client";

import { useEffect, useState } from "react";
import {
    BookOpen,
    Check,
    FileText,
    Loader2,
    Plus,
    Settings,
    Star,
    TrendingUp,
    X,
} from "lucide-react";
import axiosInstance from "@/app/lib/axios";
import toast from "react-hot-toast";
import CKEditorComponent from "./ckEditor";


interface Category {
    _id: string;
    name: string;
}

interface CreateSupportArticleProps {
    open: boolean;
    onClose: () => void;
    categories: Category[];
    onCreated: () => void;
}

const CreateSupportArticle = ({
    open,
    onClose,
    categories,
    onCreated,
}: CreateSupportArticleProps) => {

    const [tab, setTab] = useState<
        "basic" | "content" | "settings"
    >("basic");

    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        title: "",
        slug: "",
        description: "",
        content: "",
        category: "",
        icon: "BookOpen",
        status: "draft",
        isFeatured: false,
        isPopular: false,
    });

    // ==============================
    // INPUT CHANGE
    // ==============================

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement |
            HTMLTextAreaElement |
            HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // ==============================
    // CREATE ARTICLE
    // ==============================

    const handleSubmit = async () => {

        if (!form.title.trim()) {
            toast.error("Article title is required");
            setTab("basic");
            return;
        }

        if (!form.slug.trim()) {
            toast.error("Article slug is required");
            setTab("basic");
            return;
        }

        if (!form.description.trim()) {
            toast.error("Description is required");
            setTab("basic");
            return;
        }

        if (!form.category) {
            toast.error("Please select a category");
            setTab("basic");
            return;
        }

        if (!form.content.trim()) {
            toast.error("Article content is required");
            setTab("content");
            return;
        }

        try {
            setLoading(true);

            const res = await axiosInstance.post(
                "/articles",
                form
            );

            if (res.data.success) {

                toast.success(
                    "Support article created successfully"
                );

                setForm({
                    title: "",
                    slug: "",
                    description: "",
                    content: "",
                    category: "",
                    icon: "BookOpen",
                    status: "draft",
                    isFeatured: false,
                    isPopular: false,
                });

                setTab("basic");

                onClose();

                onCreated();
            }

        } catch (error: any) {

            console.error(
                "CREATE ARTICLE ERROR:",
                error
            );

            toast.error(
                error?.response?.data?.message ||
                "Failed to create article"
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
                    flex w-full max-w-4xl
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
                            <BookOpen size={18} />
                        </div>

                        <div>
                            <h2
                                className="
                                    text-[15px]
                                    font-bold
                                    text-gray-900
                                "
                            >
                                Create Support Article
                            </h2>

                            <p
                                className="
                                    mt-0.5
                                    text-[10px]
                                    text-gray-400
                                "
                            >
                                Add a new article to your support center
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

                {/* ================= TABS ================= */}

                <div
                    className="
                        shrink-0
                        border-b border-gray-100
                        bg-gray-50/70
                        px-3 sm:px-5
                    "
                >

                    <div className="flex overflow-x-auto">

                        {/* BASIC */}

                        <button
                            type="button"
                            onClick={() => setTab("basic")}
                            className={`
                                relative
                                flex shrink-0
                                items-center gap-2
                                px-3 py-3
                                text-[11px]
                                font-semibold
                                ${
                                    tab === "basic"
                                        ? "text-orange-500"
                                        : "text-gray-400"
                                }
                            `}
                        >
                            <FileText size={14} />

                            Basic Information

                            {tab === "basic" && (
                                <span
                                    className="
                                        absolute
                                        bottom-0
                                        left-2 right-2
                                        h-[2px]
                                        rounded-full
                                        bg-orange-500
                                    "
                                />
                            )}
                        </button>

                        {/* CONTENT */}

                        <button
                            type="button"
                            onClick={() => setTab("content")}
                            className={`
                                relative
                                flex shrink-0
                                items-center gap-2
                                px-3 py-3
                                text-[11px]
                                font-semibold
                                ${
                                    tab === "content"
                                        ? "text-orange-500"
                                        : "text-gray-400"
                                }
                            `}
                        >
                            <BookOpen size={14} />

                            Content

                            {tab === "content" && (
                                <span
                                    className="
                                        absolute
                                        bottom-0
                                        left-2 right-2
                                        h-[2px]
                                        rounded-full
                                        bg-orange-500
                                    "
                                />
                            )}
                        </button>

                        {/* SETTINGS */}

                        <button
                            type="button"
                            onClick={() => setTab("settings")}
                            className={`
                                relative
                                flex shrink-0
                                items-center gap-2
                                px-3 py-3
                                text-[11px]
                                font-semibold
                                ${
                                    tab === "settings"
                                        ? "text-orange-500"
                                        : "text-gray-400"
                                }
                            `}
                        >
                            <Settings size={14} />

                            Settings

                            {tab === "settings" && (
                                <span
                                    className="
                                        absolute
                                        bottom-0
                                        left-2 right-2
                                        h-[2px]
                                        rounded-full
                                        bg-orange-500
                                    "
                                />
                            )}
                        </button>

                    </div>

                </div>

                {/* ================= BODY ================= */}

                <div
                    className="
                        min-h-0
                        flex-1
                        overflow-y-auto
                    "
                >

                    {/* ================= BASIC ================= */}

                    {tab === "basic" && (
                        <div className="space-y-4 p-4 sm:p-5">

                            <div
                                className="
                                    grid grid-cols-1
                                    gap-4
                                    sm:grid-cols-2
                                "
                            >

                                {/* TITLE */}

                                <div>

                                    <label
                                        className="
                                            mb-1.5 block
                                            text-[11px]
                                            font-semibold
                                            text-gray-600
                                        "
                                    >
                                        Article Title
                                        <span className="ml-1 text-red-500">
                                            *
                                        </span>
                                    </label>

                                    <input
                                        name="title"
                                        value={form.title}
                                        onChange={handleChange}
                                        placeholder="Enter article title"
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
                                        placeholder="article-slug"
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

                            {/* DESCRIPTION */}

                            <div>

                                <label
                                    className="
                                        mb-1.5 block
                                        text-[11px]
                                        font-semibold
                                        text-gray-600
                                    "
                                >
                                    Short Description
                                    <span className="ml-1 text-red-500">
                                        *
                                    </span>
                                </label>

                              <CKEditorComponent value={form.description} onChange={(data:string)=>{
                                 console.log("DESCRIPTION FROM EDITOR:", data);
                                setForm((prev)=>({
                                    ...prev,
                                    description : data
                                }))
                              }} />

                               

                              

                                <p className="mt-1 text-right text-[9px] text-gray-400">
                                    {form.description.length}/250
                                </p>

                            </div>

                            {/* CATEGORY */}

                            <div>

                                <label
                                    className="
                                        mb-1.5 block
                                        text-[11px]
                                        font-semibold
                                        text-gray-600
                                    "
                                >
                                    Category
                                    <span className="ml-1 text-red-500">
                                        *
                                    </span>
                                </label>

                                <select
                                    name="category"
                                    value={form.category}
                                    onChange={handleChange}
                                    className="
                                        h-10 w-full
                                        rounded-lg
                                        border border-gray-200
                                        bg-gray-50
                                        px-3
                                        text-[12px]
                                        text-gray-700
                                        outline-none
                                        focus:border-orange-400
                                        focus:bg-white
                                        focus:ring-4
                                        focus:ring-orange-500/10
                                    "
                                >
                                    <option value="">
                                        Choose Category
                                    </option>

                                    {categories.map((item) => (
                                        <option
                                            key={item._id}
                                            value={item.name}
                                        >
                                            {item.name}
                                        </option>
                                    ))}

                                </select>

                            </div>

                        </div>
                    )}

                    {/* ================= CONTENT ================= */}

                {tab === "content" && (
    <div className="p-4 sm:p-5">

        <label
            className="
                mb-2 block
                text-[11px]
                font-semibold
                text-gray-600
            "
        >
            Article Content

            <span className="ml-1 text-red-500">
                *
            </span>
        </label>

       
            <CKEditorComponent
                value={form.content}
                onChange={(data: string) => {
                    setForm((prev) => ({
                        ...prev,
                        content: data,
                    }));
                }}
            />
      

        <p className="mt-1 text-right text-[9px] text-gray-400">
            {form.content.replace(/<[^>]*>/g, "").length} characters
        </p>

    </div>
)}

                    {/* ================= SETTINGS ================= */}

                    {tab === "settings" && (
                        <div className="space-y-4 p-4 sm:p-5">

                            {/* STATUS */}

                            <div
                                className="
                                    rounded-xl
                                    border border-gray-200
                                    bg-gray-50/70
                                    p-4
                                "
                            >

                                <label
                                    className="
                                        mb-2 block
                                        text-[11px]
                                        font-semibold
                                        text-gray-600
                                    "
                                >
                                    Status
                                </label>

                                <select
                                    name="status"
                                    value={form.status}
                                    onChange={handleChange}
                                    className="
                                        h-10 w-full
                                        rounded-lg
                                        border border-gray-200
                                        bg-white
                                        px-3
                                        text-[12px]
                                        text-gray-700
                                        outline-none
                                        focus:border-orange-400
                                        focus:ring-4
                                        focus:ring-orange-500/10
                                    "
                                >
                                    <option value="draft">
                                        Draft
                                    </option>

                                    <option value="published">
                                        Published
                                    </option>
                                </select>

                            </div>

                            {/* TOGGLES */}

                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

                                {/* FEATURED */}

                                <button
                                    type="button"
                                    onClick={() =>
                                        setForm((prev) => ({
                                            ...prev,
                                            isFeatured:
                                                !prev.isFeatured,
                                        }))
                                    }
                                    className={`
                                        flex items-center
                                        justify-between
                                        rounded-xl
                                        border p-3.5
                                        text-left
                                        ${
                                            form.isFeatured
                                                ? "border-orange-200 bg-orange-50"
                                                : "border-gray-200 bg-white"
                                        }
                                    `}
                                >

                                    <div className="flex items-center gap-2.5">

                                        <div
                                            className={`
                                                flex h-8 w-8
                                                items-center
                                                justify-center
                                                rounded-lg
                                                ${
                                                    form.isFeatured
                                                        ? "bg-orange-500 text-white"
                                                        : "bg-gray-100 text-gray-400"
                                                }
                                            `}
                                        >
                                            <Star size={15} />
                                        </div>

                                        <span className="text-[11px] font-semibold text-gray-700">
                                            Featured
                                        </span>

                                    </div>

                                    {form.isFeatured && (
                                        <Check
                                            size={15}
                                            className="text-orange-500"
                                        />
                                    )}

                                </button>

                                {/* POPULAR */}

                                <button
                                    type="button"
                                    onClick={() =>
                                        setForm((prev) => ({
                                            ...prev,
                                            isPopular:
                                                !prev.isPopular,
                                        }))
                                    }
                                    className={`
                                        flex items-center
                                        justify-between
                                        rounded-xl
                                        border p-3.5
                                        text-left
                                        ${
                                            form.isPopular
                                                ? "border-orange-200 bg-orange-50"
                                                : "border-gray-200 bg-white"
                                        }
                                    `}
                                >

                                    <div className="flex items-center gap-2.5">

                                        <div
                                            className={`
                                                flex h-8 w-8
                                                items-center
                                                justify-center
                                                rounded-lg
                                                ${
                                                    form.isPopular
                                                        ? "bg-orange-500 text-white"
                                                        : "bg-gray-100 text-gray-400"
                                                }
                                            `}
                                        >
                                            <TrendingUp size={15} />
                                        </div>

                                        <span className="text-[11px] font-semibold text-gray-700">
                                            Popular
                                        </span>

                                    </div>

                                    {form.isPopular && (
                                        <Check
                                            size={15}
                                            className="text-orange-500"
                                        />
                                    )}

                                </button>

                            </div>

                        </div>
                    )}

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
                            h-9 rounded-lg
                            border border-gray-200
                            px-4
                            text-[11px]
                            font-medium
                            text-gray-600
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
                            : "Create Article"}

                    </button>

                </div>

            </div>
        </div>
    );
};


import { useParams, useRouter } from "next/navigation";
import {
    Save,

} from "lucide-react";




interface Category {
    _id: string;
    name: string;
    slug: string;
    description: string;
}

interface ArticleForm {
    title: string;
    slug: string;
    description: string;
    content: string;
    category: string;
    icon: string;
    status: "draft" | "published";
    isFeatured: boolean;
    isPopular: boolean;
}

export const EditSupportArticlePage=({selectedslug,setEditOpen,fetchArticles})=> {
   
    const router = useRouter();

    const id = selectedslug;

    

    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [activeTab, setActiveTab] = useState<
    "basic" | "content" | "settings"
>("basic");

    const [form, setForm] = useState<ArticleForm>({
        title: "",
        slug: "",
        description: "",
        content: "",
        category: "",
        icon: "BookOpen",
        status: "draft",
        isFeatured: false,
        isPopular: false,
    });

    // =========================================================
    // FETCH ARTICLE + CATEGORIES
    // =========================================================

    useEffect(() => {
        if (!id) return;

        const fetchData = async () => {
            try {
                setLoading(true);

                const [articleRes, categoryRes] = await Promise.all([
                    axiosInstance.get(`/articles/${id}`),
                    axiosInstance.get("/category"),
                ]);

                const article = articleRes.data.data;

                setCategories(categoryRes.data.data);

                setForm({
                    title: article.title || "",
                    slug: article.slug || "",
                    description: article.description || "",
                    content: article.content || "",
                    category: article.category || "",
                    icon: article.icon || "BookOpen",
                    status: article.status || "draft",
                    isFeatured: article.isFeatured || false,
                    isPopular: article.isPopular || false,
                });
            } catch (error) {
                console.error("Fetch Article Error:", error);
                toast.error("Failed to load article");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

           


    // =========================================================
    // HANDLE INPUT
    // =========================================================

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // =========================================================
    // SUBMIT
    // =========================================================

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();
    

    

        try {
            setSaving(true);

            const res = await axiosInstance.put(
                `/articles/${id}`,
                form
            );

            if (res.data.success) {
                toast.success("Article updated successfully");
                setEditOpen(false)
                setTimeout(() => {
                   fetchArticles()
                }, 500);
            }
        } catch (error: any) {
            console.error("Update Article Error:", error);

            toast.error(
                error?.response?.data?.message ||
                "Failed to update article"
            );
        } finally {
            setSaving(false);
        }
    };

    // =========================================================
    // LOADING
    // =========================================================

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#f8f9fb]">
                <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-5 py-4 shadow-sm">
                    <Loader2
                        size={20}
                        className="animate-spin text-orange-500"
                    />

                    <span className="text-sm font-medium text-gray-600">
                        Loading article...
                    </span>
                </div>
            </div>
        );
    }

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
                flex w-full max-w-4xl
                max-h-[92vh]
                flex-col
                overflow-hidden
                rounded-2xl
                border border-white/60
                bg-white/95
                shadow-2xl
                shadow-black/20
                backdrop-blur-xl
            "
        >

            {/* ================= HEADER ================= */}

            <div className="flex shrink-0 items-center justify-between border-b border-gray-100 px-4 py-3 sm:px-5">

                <div className="flex items-center gap-3">

                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
                        <BookOpen size={18} />
                    </div>

                    <div>
                        <h2 className="text-[15px] font-bold text-gray-900">
                            Edit Support Article
                        </h2>

                        <p className="mt-0.5 text-[10px] text-gray-400">
                            Update your support article
                        </p>
                    </div>

                </div>

                <button
                    type="button"
                    onClick={() => setEditOpen(false)}
                    className="
                        flex h-8 w-8 items-center justify-center
                        rounded-lg text-gray-400
                        transition hover:bg-gray-100
                        hover:text-gray-700
                    "
                >
                    <X size={17} />
                </button>

            </div>

            {/* ================= TABS ================= */}

            <div className="shrink-0 border-b border-gray-100 bg-gray-50/70 px-3 sm:px-5">

                <div className="flex overflow-x-auto">

                    <button
                        type="button"
                        onClick={() => setActiveTab("basic")}
                        className={`
                            relative flex shrink-0 items-center gap-2
                            px-3 py-3 text-[11px] font-semibold
                            transition
                            ${
                                activeTab === "basic"
                                    ? "text-orange-500"
                                    : "text-gray-400 hover:text-gray-600"
                            }
                        `}
                    >
                        <FileText size={14} />

                        Basic Information

                        {activeTab === "basic" && (
                            <span className="absolute bottom-0 left-2 right-2 h-[2px] rounded-full bg-orange-500" />
                        )}
                    </button>

                    <button
                        type="button"
                        onClick={() => setActiveTab("content")}
                        className={`
                            relative flex shrink-0 items-center gap-2
                            px-3 py-3 text-[11px] font-semibold
                            transition
                            ${
                                activeTab === "content"
                                    ? "text-orange-500"
                                    : "text-gray-400 hover:text-gray-600"
                            }
                        `}
                    >
                        <BookOpen size={14} />

                        Content

                        {activeTab === "content" && (
                            <span className="absolute bottom-0 left-2 right-2 h-[2px] rounded-full bg-orange-500" />
                        )}
                    </button>

                    <button
                        type="button"
                        onClick={() => setActiveTab("settings")}
                        className={`
                            relative flex shrink-0 items-center gap-2
                            px-3 py-3 text-[11px] font-semibold
                            transition
                            ${
                                activeTab === "settings"
                                    ? "text-orange-500"
                                    : "text-gray-400 hover:text-gray-600"
                            }
                        `}
                    >
                        <Settings size={14} />

                        Settings

                        {activeTab === "settings" && (
                            <span className="absolute bottom-0 left-2 right-2 h-[2px] rounded-full bg-orange-500" />
                        )}
                    </button>

                </div>

            </div>

            {/* ================= BODY ================= */}

            <div className="min-h-0 flex-1 overflow-y-auto">

                {/* =====================================================
                    BASIC INFORMATION
                ====================================================== */}

                {activeTab === "basic" && (
                    <div className="space-y-4 p-4 sm:p-5">

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                            {/* TITLE */}

                            <div>
                                <label className="mb-1.5 block text-[11px] font-semibold text-gray-600">
                                    Article Title
                                    <span className="ml-1 text-red-500">
                                        *
                                    </span>
                                </label>

                                <input
                                    name="title"
                                    value={form.title}
                                    onChange={handleChange}
                                    placeholder="Enter article title"
                                    className="
                                        h-10 w-full rounded-lg
                                        border border-gray-200
                                        bg-gray-50 px-3
                                        text-[12px] text-gray-700
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
                                <label className="mb-1.5 block text-[11px] font-semibold text-gray-600">
                                    Slug
                                    <span className="ml-1 text-red-500">
                                        *
                                    </span>
                                </label>

                                <input
                                    name="slug"
                                    value={form.slug}
                                    onChange={handleChange}
                                    placeholder="article-slug"
                                    className="
                                        h-10 w-full rounded-lg
                                        border border-gray-200
                                        bg-gray-50 px-3
                                        text-[12px] text-gray-700
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

                        {/* DESCRIPTION */}

                        <div>

                            <div className="mb-1.5 flex items-center justify-between">

                                <label className="text-[11px] font-semibold text-gray-600">
                                    Short Description
                                    <span className="ml-1 text-red-500">
                                        *
                                    </span>
                                </label>

                                <span className="text-[9px] text-gray-400">
                                    {form.description.length}/250
                                </span>

                            </div>

                           <CKEditorComponent value={form.description} onChange={(data:string)=>{(
                            setForm((prev)=>({
                                ...prev,
                                description : data
                            }))
                           )}} />

                        </div>

                        {/* CATEGORY */}

                        <div>

                            <label className="mb-1.5 block text-[11px] font-semibold text-gray-600">
                                Category
                                <span className="ml-1 text-red-500">
                                    *
                                </span>
                            </label>

                            <select
                                name="category"
                                value={form.category}
                                onChange={handleChange}
                                className="
                                    h-10 w-full rounded-lg
                                    border border-gray-200
                                    bg-gray-50 px-3
                                    text-[12px] text-gray-700
                                    outline-none
                                    transition
                                    focus:border-orange-400
                                    focus:bg-white
                                    focus:ring-4
                                    focus:ring-orange-500/10
                                "
                            >
                                <option value="">
                                    Choose Category
                                </option>

                                {categories.map((item) => (
                                    <option
                                        key={item._id}
                                        value={item.name}
                                    >
                                        {item.name}
                                    </option>
                                ))}
                            </select>

                        </div>

                    </div>
                )}

                {/* =====================================================
                    CONTENT
                ====================================================== */}

                {activeTab === "content" && (
                    <div className="p-4 sm:p-5">

                        <div className="mb-2 flex items-center justify-between">

                            <div>
                                <label className="text-[11px] font-semibold text-gray-600">
                                    Article Content
                                    <span className="ml-1 text-red-500">
                                        *
                                    </span>
                                </label>

                                <p className="mt-0.5 text-[9px] text-gray-400">
                                    Write the complete support article
                                </p>
                            </div>

                            <span className="rounded-md bg-gray-100 px-2 py-1 text-[9px] text-gray-400">
                                Plain Text
                            </span>

                        </div>

                       <CKEditorComponent value={form.content} onChange={(data:string)=>{(
                            setForm((prev)=>({
                                ...prev,
                                content : data
                            }))
                           )}} />

                        <div className="mt-1.5 text-right text-[9px] text-gray-400">
                            {form.content.length} characters
                        </div>

                    </div>
                )}

                {/* =====================================================
                    SETTINGS
                ====================================================== */}

                {activeTab === "settings" && (
                    <div className="space-y-4 p-4 sm:p-5">

                        {/* STATUS */}

                        <div className="rounded-xl border border-gray-200 bg-gray-50/70 p-4">

                            <div className="mb-3">

                                <p className="text-[12px] font-semibold text-gray-700">
                                    Publishing
                                </p>

                                <p className="mt-0.5 text-[9px] text-gray-400">
                                    Control article visibility
                                </p>

                            </div>

                            <select
                                name="status"
                                value={form.status}
                                onChange={handleChange}
                                className="
                                    h-10 w-full rounded-lg
                                    border border-gray-200
                                    bg-white px-3
                                    text-[12px] text-gray-700
                                    outline-none
                                    focus:border-orange-400
                                    focus:ring-4
                                    focus:ring-orange-500/10
                                "
                            >
                                <option value="draft">
                                    Draft
                                </option>

                                <option value="published">
                                    Published
                                </option>
                            </select>

                        </div>

                        {/* FEATURED + POPULAR */}

                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

                            {/* FEATURED */}

                            <button
                                type="button"
                                onClick={() =>
                                    setForm((prev) => ({
                                        ...prev,
                                        isFeatured:
                                            !prev.isFeatured,
                                    }))
                                }
                                className={`
                                    flex items-center justify-between
                                    rounded-xl border p-3.5
                                    text-left transition
                                    ${
                                        form.isFeatured
                                            ? "border-orange-200 bg-orange-50"
                                            : "border-gray-200 bg-white hover:bg-gray-50"
                                    }
                                `}
                            >

                                <div className="flex items-center gap-2.5">

                                    <div
                                        className={`
                                            flex h-8 w-8 items-center
                                            justify-center rounded-lg
                                            ${
                                                form.isFeatured
                                                    ? "bg-orange-500 text-white"
                                                    : "bg-gray-100 text-gray-400"
                                            }
                                        `}
                                    >
                                        <Star size={15} />
                                    </div>

                                    <div>
                                        <p className="text-[11px] font-semibold text-gray-700">
                                            Featured
                                        </p>

                                        <p className="text-[9px] text-gray-400">
                                            Highlight article
                                        </p>
                                    </div>

                                </div>

                                <div
                                    className={`
                                        flex h-5 w-5 items-center
                                        justify-center rounded-md
                                        border
                                        ${
                                            form.isFeatured
                                                ? "border-orange-500 bg-orange-500 text-white"
                                                : "border-gray-300 bg-white"
                                        }
                                    `}
                                >
                                    {form.isFeatured && (
                                        <Check size={12} />
                                    )}
                                </div>

                            </button>

                            {/* POPULAR */}

                            <button
                                type="button"
                                onClick={() =>
                                    setForm((prev) => ({
                                        ...prev,
                                        isPopular:
                                            !prev.isPopular,
                                    }))
                                }
                                className={`
                                    flex items-center justify-between
                                    rounded-xl border p-3.5
                                    text-left transition
                                    ${
                                        form.isPopular
                                            ? "border-orange-200 bg-orange-50"
                                            : "border-gray-200 bg-white hover:bg-gray-50"
                                    }
                                `}
                            >

                                <div className="flex items-center gap-2.5">

                                    <div
                                        className={`
                                            flex h-8 w-8 items-center
                                            justify-center rounded-lg
                                            ${
                                                form.isPopular
                                                    ? "bg-orange-500 text-white"
                                                    : "bg-gray-100 text-gray-400"
                                            }
                                        `}
                                    >
                                        <TrendingUp size={15} />
                                    </div>

                                    <div>
                                        <p className="text-[11px] font-semibold text-gray-700">
                                            Popular
                                        </p>

                                        <p className="text-[9px] text-gray-400">
                                            Mark as popular
                                        </p>
                                    </div>

                                </div>

                                <div
                                    className={`
                                        flex h-5 w-5 items-center
                                        justify-center rounded-md
                                        border
                                        ${
                                            form.isPopular
                                                ? "border-orange-500 bg-orange-500 text-white"
                                                : "border-gray-300 bg-white"
                                        }
                                    `}
                                >
                                    {form.isPopular && (
                                        <Check size={12} />
                                    )}
                                </div>

                            </button>

                        </div>

                    </div>
                )}

            </div>

            {/* ================= FOOTER ================= */}

            <div className="flex shrink-0 items-center justify-end gap-2 border-t border-gray-100 bg-white px-4 py-3 sm:px-5">

                <button
                    type="button"
                    onClick={() => setEditOpen(false)}
                    disabled={saving}
                    className="
                        h-9 rounded-lg
                        border border-gray-200
                        bg-white px-4
                        text-[11px] font-medium
                        text-gray-600
                        transition
                        hover:bg-gray-50
                        disabled:opacity-50
                    "
                >
                    Cancel
                </button>

                <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={saving}
                    className="
                        flex h-9 items-center gap-2
                        rounded-lg bg-orange-500
                        px-4
                        text-[11px] font-semibold text-white
                        shadow-sm shadow-orange-500/20
                        transition
                        hover:bg-orange-600
                        disabled:cursor-not-allowed
                        disabled:opacity-60
                    "
                >

                    {saving ? (
                        <Loader2
                            size={14}
                            className="animate-spin"
                        />
                    ) : (
                        <Save size={14} />
                    )}

                    {saving
                        ? "Saving..."
                        : "Save Changes"}

                </button>

            </div>

        </div>
    </div>

    );
}

export default CreateSupportArticle;