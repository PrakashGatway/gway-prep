"use client";

import { useEffect, useState } from "react";
import {
    LayoutDashboard,
    Users,
    BookOpen,
    ShoppingCart,
    Headphones,
    Ticket,
    Tags,
    HelpCircle,
    Settings,
    LogOut,
    Bell,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    Search,
    SlidersHorizontal,
    RotateCcw,
    Eye,
    Pencil,
    Trash2,
    Plus,
    CreditCard,
    GraduationCap,
    ShieldCheck,
    LifeBuoy,
    X,
} from "lucide-react";
import axiosInstance from "@/app/lib/axios";
import toast from "react-hot-toast";



export default function SupportArticlesPage() {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("all");
    const [status, setStatus] = useState("all");
    const [articles, setarticles] = useState([])
    const [debounce, setdebounce] = useState("")
    const [categoryFetch, setcategoryFetch] = useState([])
    const [page, setPage] = useState("")
    const [pagination, setpagination] = useState({})
    const [selectedid,setSelectedid] = useState("")
    const [openEdit,setopenEdit] = useState(false)
    const [createOpen, setCreateOpen] = useState(false);
    const [deleteArticle,setDeleteArticle] = useState(false)

    console.log(debounce)
    useEffect(() => {
        const fetchcat = async () => {
            const res = await axiosInstance.get("category")
            setcategoryFetch(res.data.data)
        }
        fetchcat()
    }, [])

    useEffect(() => {
        const time = setTimeout(() => {
            setdebounce(search)
        }, 700);

        return () => {
            clearTimeout(time)
        }
    }, [search])

   
        const fetchArticles = async () => {
            try {
                const params = new URLSearchParams()
                if (debounce) {
                    params.append("search", debounce)
                }
                if (category) {
                    params.append("category", category)
                }
                if (status) {
                    params.append("status", status)
                }

                const res = await axiosInstance.get(`/articles?${params.toString()}`)
                setarticles(res.data.data)
                setpagination(res.data.pagination)
            }
            catch {
                toast.error("something went wrong...")
            }
        }

    useEffect(()=>{
        fetchArticles()
    },[debounce, category, status])

const handleDeleteArticle = async (slug: string) => {
    try {
        const res = await axiosInstance.delete(
            `/articles/${slug}`
        );

        if (res.data.success) {
            toast.success("Article deleted successfully");

            fetchArticles();
        }

    } catch (error: any) {
        console.error("DELETE ARTICLE ERROR:", error);

        toast.error(
            error?.response?.data?.message ||
            "Failed to delete article"
        );
    }
};

    const clearFilters = () => {
        setSearch("");
        setCategory("all");
        setStatus("all");
    };

    return (
        <div className="min-h-screen bg-[#f8f9fb] text-gray-900">



            {/* ================= MAIN ================= */}
            <div className="">



                {/* ================= CONTENT ================= */}
                <main className="px-4 py-6 sm:px-6 lg:px-8 lg:py-8">

                    {/* Page Heading */}
                    <div className="mb-7 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                        <div>
                            <h1 className="text-[26px] font-bold tracking-tight text-gray-900 sm:text-[30px]">
                                Support Articles
                            </h1>

                            <p className="mt-1 text-[13px] text-gray-500 sm:text-[14px]">
                                Manage and organize support articles for your users.
                            </p>
                        </div>

                        {/* Create Button */}
                        <button
                        onClick={()=>{
                            setCreateOpen(true)
                        }}
                            className="
                                flex h-11 items-center justify-center gap-2
                                rounded-xl bg-orange-500 px-5
                                text-[13px] font-semibold text-white
                                shadow-sm shadow-orange-500/20
                                transition-all
                                hover:bg-orange-600
                                hover:shadow-lg hover:shadow-orange-500/20
                                active:scale-[0.98]
                            "
                        >
                            <Plus size={18} strokeWidth={2.5} />
                            Create Support Article
                        </button>

                    </div>

                    {/* ================= FILTER CARD ================= */}
                    <div className="my-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5 ">

                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.5fr_1fr_1fr_auto] lg:items-end">

                            {/* Search */}
                            <div>
                                <label className="mb-2 block text-[12px] font-semibold text-gray-600">
                                    Search Articles
                                </label>

                                <div className="relative">
                                    <Search
                                        size={18}
                                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                                    />

                                    <input
                                        type="text"
                                        value={search}
                                        onChange={(e) =>
                                            setSearch(e.target.value)
                                        }
                                        placeholder="Search by title, description..."
                                        className="
                                            h-11 w-full rounded-xl
                                            border border-gray-200
                                            bg-gray-50 pl-10 pr-4
                                            text-[13px] text-gray-700
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

                            {/* Category */}
                            <div>
                                <label className="mb-2 block text-[12px] font-semibold text-gray-600">
                                    Category
                                </label>

                                <select

                                    onChange={(e) =>
                                        setCategory(e.target.value)
                                    }
                                    className="
                                        h-11 w-full rounded-xl
                                        border border-gray-200
                                        bg-gray-50 px-3.5
                                        text-[13px] text-gray-700
                                        outline-none
                                        transition
                                        focus:border-orange-400
                                        focus:bg-white
                                        focus:ring-4
                                        focus:ring-orange-500/10
                                    "
                                >
                                    <option value="all">Choose Category</option>
                                    {
                                        categoryFetch.map((item) => {
                                            console.log(item)
                                            return (
                                                <>

                                                    <option value={item?.name}>{item?.name}</option>
                                                </>
                                            )
                                        })
                                    }
                                </select>
                            </div>

                            {/* Status */}
                            <div>
                                <label className="mb-2 block text-[12px] font-semibold text-gray-600">
                                    Status
                                </label>

                                <select
                                    value={status}
                                    onChange={(e) =>
                                        setStatus(e.target.value)
                                    }
                                    className="
                                        h-11 w-full rounded-xl
                                        border border-gray-200
                                        bg-gray-50 px-3.5
                                        text-[13px] text-gray-700
                                        outline-none
                                        transition
                                        focus:border-orange-400
                                        focus:bg-white
                                        focus:ring-4
                                        focus:ring-orange-500/10
                                    "
                                >
                                    <option value="all">All Status</option>
                                    <option value="published">
                                        Published
                                    </option>
                                    <option value="draft">Draft</option>
                                </select>
                            </div>

                            {/* Clear */}
                            <button
                                onClick={clearFilters}
                                className="
                                    flex h-11 items-center justify-center
                                    gap-2 rounded-xl
                                    border border-gray-200
                                    bg-white px-4
                                    text-[13px] font-medium text-gray-600
                                    transition
                                    hover:border-orange-200
                                    hover:bg-orange-50
                                    hover:text-orange-500
                                "
                            >
                                <RotateCcw size={15} />
                                Clear Filters
                            </button>

                        </div>
                    </div>

                    {/* ================= TABLE ================= */}
                    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">



                        {/* Horizontal Scroll */}
                        <div className="overflow-x-auto">

                            <table className="w-full min-w-[950px] border-collapse">

                                <thead>
                                    <tr className="border-b border-gray-100 ">

                                        <th className="w-[60px] px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-wide text-white">
                                            #
                                        </th>

                                        <th className="px-4 py-4 text-left text-[11px] font-semibold uppercase tracking-wide text-white">
                                            Article
                                        </th>

                                        <th className="px-4 py-4 text-left text-[11px] font-semibold uppercase tracking-wide text-white">
                                            Category
                                        </th>

                                        <th className="px-4 py-4 text-left text-[11px] font-semibold uppercase tracking-wide text-white">
                                            Status
                                        </th>

                                        <th className="px-4 py-4 text-left text-[11px] font-semibold uppercase tracking-wide text-white">
                                            Views
                                        </th>

                                        <th className="px-4 py-4 text-left text-[11px] font-semibold uppercase tracking-wide text-white">
                                            Created At
                                        </th>

                                        <th className="px-5 py-4 text-right text-[11px] font-semibold uppercase tracking-wide text-white">
                                            Actions
                                        </th>

                                    </tr>
                                </thead>

                                <tbody>
                                    {articles.map((article, index) => {
                                        const Icon = article.icon;

                                        return (
                                            <tr
                                                key={article._id}
                                                className="group border-b border-gray-100 last:border-b-0 transition hover:bg-orange-50/30"
                                            >

                                                {/* Number */}
                                                <td className="px-5 py-4 text-[13px] font-medium text-gray-400">
                                                    {index + 1}
                                                </td>

                                                {/* Article */}
                                                <td className="px-4 py-4">

                                                    <div className="flex items-center gap-3">

                                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
                                                            <BookOpen size={19} />
                                                        </div>

                                                        <div className="min-w-0">
                                                            <p className="max-w-[330px] truncate text-[13px] font-semibold text-gray-800">
                                                                {article.title}
                                                            </p>

                                                            <p className="mt-1 max-w-[330px] truncate text-[11px] text-gray-400" dangerouslySetInnerHTML={{
                                                                __html : article.description
                                                            }}>
                                                                
                                                            </p>
                                                        </div>

                                                    </div>

                                                </td>

                                                {/* Category */}
                                                <td className="px-4 py-4">
                                                    <span className="inline-flex rounded-lg bg-orange-50 px-2.5 py-1.5 text-[11px] font-semibold text-orange-600">
                                                        {article?.category}
                                                    </span>
                                                </td>

                                                {/* Status */}
                                                <td className="px-4 py-4">

                                                    {article.status === "published" ? (
                                                        <span className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-50 px-2.5 py-1.5 text-[11px] font-semibold capitalize text-emerald-600">
                                                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                                            Published
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center gap-1.5 rounded-lg bg-gray-100 px-2.5 py-1.5 text-[11px] font-semibold capitalize text-gray-500">
                                                            <span className="h-1.5 w-1.5 rounded-full bg-gray-400" />
                                                            Draft
                                                        </span>
                                                    )}

                                                </td>

                                                {/* Views */}
                                                <td className="px-4 py-4">

                                                    <div className="flex items-center gap-2 text-[12px] font-medium text-gray-600">
                                                        <Eye
                                                            size={15}
                                                            className="text-gray-400"
                                                        />
                                                        {article.views.toLocaleString()}
                                                    </div>

                                                </td>

                                                {/* Date */}
                                                <td className="px-4 py-4">
                                                    <div>
                                                        <p className="text-[12px] font-medium text-gray-700">
                                                            {new Date(article.createdAt).toLocaleDateString("en-IN", {
                                                                day: "2-digit",
                                                                month: "short",
                                                                year: "numeric",
                                                            })}
                                                        </p>

                                                        <p className="mt-0.5 text-[11px] text-gray-400">
                                                            {new Date(article.createdAt).toLocaleTimeString("en-IN", {
                                                                hour: "2-digit",
                                                                minute: "2-digit",
                                                            })}
                                                        </p>

                                                    </div>
                                                </td>

                                                {/* Actions */}
                                                <td className="px-5 py-4">

                                                    <div className="flex justify-end gap-2">

                                                        {/* Edit */}
                                                        <button
                                                        onClick={()=> {
                                                            setSelectedid(article.slug)
                                                            setopenEdit(true)
                                                        }}
                                                            title="Edit Article"
                                                            className="
                                                                flex h-9 w-9
                                                                items-center
                                                                justify-center
                                                                rounded-lg
                                                                border
                                                                border-gray-200
                                                                bg-white
                                                                text-gray-500
                                                                transition
                                                                hover:border-orange-200
                                                                hover:bg-orange-50
                                                                hover:text-orange-500
                                                            "
                                                        >
                                                            <Pencil size={15} />
                                                        </button>

                                                        {/* Delete */}
                                                        <button
                                                        onClick={()=> {
                                                            setDeleteArticle(true)
                                                        }}
                                                            title="Delete Article"
                                                            className="
                                                                flex h-9 w-9
                                                                items-center
                                                                justify-center
                                                                rounded-lg
                                                                border
                                                                border-red-100
                                                                bg-white
                                                                text-red-400
                                                                transition
                                                                hover:border-red-200
                                                                hover:bg-red-50
                                                                hover:text-red-500
                                                            "
                                                        >
                                                            <Trash2 size={15} />
                                                        </button>

                                                    </div>

                                                </td>

                                            </tr>
                                        );
                                    })}

                                    {/* Empty */}
                                    {articles.length === 0 && (
                                        <tr>
                                            <td
                                                colSpan={7}
                                                className="px-5 py-16 text-center"
                                            >
                                                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-orange-50 text-orange-500">
                                                    <LifeBuoy size={22} />
                                                </div>

                                                <p className="mt-3 text-sm font-semibold text-gray-700">
                                                    No articles found
                                                </p>

                                                <p className="mt-1 text-xs text-gray-400">
                                                    Try changing your search or filters.
                                                </p>
                                            </td>
                                        </tr>
                                    )}

                                </tbody>

                            </table>

                        </div>

                        {/* ================= FOOTER ================= */}
                        <div className="flex flex-col gap-4 border-t border-gray-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">

                            <p className="text-[12px] text-gray-400">
                                Showing{" "}
                                <span className="font-semibold text-gray-600">
                                    {articles.length}
                                </span>{" "}
                                of{" "}
                                <span className="font-semibold text-gray-600">
                                    {pagination.total}
                                </span>{" "}
                                articles
                            </p>

                            <div className="flex items-center justify-center gap-1">

                                {/* Previous */}
                                <button
                                    disabled={pagination.page === 1}
                                    onClick={() => {
                                        setPage((prev) => Math.max(prev - 1, 1));
                                    }}
                                    className="
            flex h-9 w-9 items-center justify-center
            rounded-xl border border-gray-200
            text-gray-400 transition
            hover:border-orange-200
            hover:bg-orange-50
            hover:text-orange-500
            disabled:cursor-not-allowed
            disabled:opacity-40
        "
                                >
                                    <ChevronLeft size={16} />
                                </button>

                                {/* Page Numbers */}
                                {Array.from(
                                    { length: pagination.pages },
                                    (_, index) => index + 1
                                ).map((pageNumber) => (
                                    <button
                                        key={pageNumber}
                                        onClick={() => setPage(pageNumber)}
                                        className={`
                flex h-9 w-9 items-center justify-center
                rounded-xl text-[12px] font-medium
                transition
                ${pagination.page === pageNumber
                                                ? "bg-orange-500 text-white shadow-sm shadow-orange-500/20"
                                                : "border border-gray-200 bg-white text-gray-500 hover:border-orange-200 hover:bg-orange-50 hover:text-orange-500"
                                            }
            `}
                                    >
                                        {pageNumber}
                                    </button>
                                ))}

                                {/* Next */}
                                <button
                                    disabled={pagination.page === pagination.pages}
                                    onClick={() => {
                                        setPage((prev) =>
                                            Math.min(prev + 1, pagination.pages)
                                        );
                                    }}
                                    className="
            flex h-9 w-9 items-center justify-center
            rounded-xl border border-gray-200
            text-gray-400 transition
            hover:border-orange-200
            hover:bg-orange-50
            hover:text-orange-500
            disabled:cursor-not-allowed
            disabled:opacity-40
        "
                                >
                                    <ChevronRight size={16} />
                                </button>

                            </div>

                        </div>

                    </div>

                </main>
            </div>
             {openEdit&&(
            <EditSupportArticlePage selectedslug={selectedid} setEditOpen={setopenEdit}/>
        )}

        <CreateSupportArticle
    open={createOpen}
    onClose={() => setCreateOpen(false)}
    categories={categoryFetch}
    onCreated={articles}
    
/>

{deleteArticle && (
    <div
        className="
            fixed inset-0 z-[200]
            flex items-center justify-center
            bg-black/40
            p-4
            backdrop-blur-md
        "
    >
        <div
            className="
                w-full max-w-sm
                overflow-hidden
                rounded-2xl
                border border-white/60
                bg-white
                shadow-2xl
                shadow-black/20
            "
        >

            {/* Icon + Close */}

            <div className="flex items-center justify-between px-5 pt-5">

                <div
                    className="
                        flex h-10 w-10
                        items-center justify-center
                        rounded-xl
                        bg-red-50
                        text-red-500
                    "
                >
                    <Trash2 size={19} />
                </div>

                <button
                    type="button"
                    onClick={() => setDeleteArticle(null)}
                    className="
                        flex h-7 w-7
                        items-center justify-center
                        rounded-lg
                        text-gray-400
                        transition
                        hover:bg-gray-100
                        hover:text-gray-600
                    "
                >
                    <X size={15} />
                </button>

            </div>

            {/* Content */}

            <div className="px-5 pb-4 pt-4">

                <h3
                    className="
                        text-[15px]
                        font-bold
                        text-gray-900
                    "
                >
                    Delete Support Article?
                </h3>

                <p
                    className="
                        mt-1.5
                        text-[11px]
                        leading-5
                        text-gray-500
                    "
                >
                    Are you sure you want to delete? This action cannot be undone.
                </p>

            </div>

            {/* Actions */}

            <div
                className="
                    flex items-center
                    justify-end gap-2
                    border-t border-gray-100
                    bg-gray-50/60
                    px-5 py-3
                "
            >

                <button
                    type="button"
                    onClick={() => setDeleteArticle(null)}
                    className="
                        h-9
                        rounded-lg
                        border border-gray-200
                        bg-white
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
                    onClick={() =>
                        handleDeleteArticle(
                            articles.slug
                        )
                    }
                    className="
                        flex h-9
                        items-center gap-1.5
                        rounded-lg
                        bg-red-500
                        px-4
                        text-[11px]
                        font-semibold
                        text-white
                        shadow-sm
                        shadow-red-500/20
                        transition
                        hover:bg-red-600
                    "
                >
                    <Trash2 size={13} />
                    Delete Article
                </button>

            </div>

        </div>
    </div>
)}
        </div>

       
    );
}






import { useParams, useRouter } from "next/navigation";
import {
    ArrowLeft,
    Check,
    FileText,
    Loader2,
    Save,
    Star,
    TrendingUp,
} from "lucide-react";
import CreateSupportArticle from "../../components/createSupportTicket";
import CKEditorComponent from "../../components/ckEditor";



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

const EditSupportArticlePage=({selectedslug,setEditOpen})=> {
   
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
        console.log("ghjk")

    

        try {
            setSaving(true);

            const res = await axiosInstance.put(
                `/articles/${id}`,
                form
            );

            if (res.data.success) {
                toast.success("Article updated successfully");

                setTimeout(() => {
                    router.push("/admin/support-articles");
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