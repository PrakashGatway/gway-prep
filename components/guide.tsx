"use client";
import { motion } from "framer-motion";
import React, { useMemo, useState } from "react";
import {
    Search,
    CalendarDays,
    UserRound,
    ArrowRight,
    ChevronLeft,
    ChevronRight,
    ChevronDown,
    Grid2X2,
    Rocket,
    User,
    CreditCard,
    GraduationCap,
    Settings,
    ShieldCheck,
    Headphones,
    BookOpen,
    Zap,
    MessageCircleQuestion,
} from "lucide-react";

interface Guide {
    id: string;
    title: string;
    description: string;
    category: string;
    date: string;
    author: string;
    slug: string;
}

const guides: Guide[] = [
    {
        id: "1",
        title: "Getting Started with OoshasPrep – A Quick Guide",
        description:
            "New here? This guide will help you create your account, set up your profile, and get started with your learning journey.",
        category: "GETTING STARTED",
        date: "Aug 18, 2026",
        author: "Admin Team",
        slug: "getting-started-with-ooshasprep",
    },
    {
        id: "2",
        title: "How to Update Your Profile and Personal Information",
        description:
            "Learn how to update your personal details, change your password, and manage your account settings easily.",
        category: "ACCOUNT & PROFILE",
        date: "Aug 16, 2026",
        author: "Admin Team",
        slug: "update-profile-personal-information",
    },
    {
        id: "3",
        title: "Payment Methods, Refunds & Billing Support",
        description:
            "Find answers to common payment issues, refund policies, and how to download your invoices.",
        category: "PAYMENTS & BILLING",
        date: "Aug 14, 2026",
        author: "Admin Team",
        slug: "payment-refunds-billing",
    },
    {
        id: "4",
        title: "How to Enroll, Access and Track Your Courses",
        description:
            "Step-by-step guide to enrolling in courses, accessing study materials, and tracking your learning progress.",
        category: "COURSES & LEARNING",
        date: "Aug 12, 2026",
        author: "Admin Team",
        slug: "enroll-access-track-courses",
    },
    {
        id: "5",
        title: "Troubleshooting Common Issues",
        description:
            "Facing login issues, video not loading, or other errors? Here's how to fix common problems quickly.",
        category: "TECHNICAL SUPPORT",
        date: "Aug 10, 2026",
        author: "Admin Team",
        slug: "troubleshooting-common-issues",
    },
    {
        id: "6",
        title: "Keep Your Account Safe and Secure",
        description:
            "Tips to keep your account secure, recognize suspicious activity, and protect your personal information.",
        category: "SAFETY & SECURITY",
        date: "Aug 08, 2026",
        author: "Admin Team",
        slug: "account-safety-security",
    },
    {
        id: "7",
        title: "Understanding Our Policies and Terms",
        description:
            "Read our terms of service, privacy policy, and other important policies to stay informed.",
        category: "GENERAL",
        date: "Aug 06, 2026",
        author: "Admin Team",
        slug: "policies-and-terms",
    },
    {
        id: "8",
        title: "How to Contact Support Team",
        description:
            "Can't find what you're looking for? Here's how to reach our support team for faster help.",
        category: "GENERAL",
        date: "Aug 04, 2026",
        author: "Admin Team",
        slug: "contact-support-team",
    },
    {
        id: "9",
        title: "Scholarships & Offers Guidelines",
        description:
            "Learn how to apply for scholarships and avail exclusive offers on courses and test series.",
        category: "GENERAL",
        date: "Aug 02, 2026",
        author: "Admin Team",
        slug: "scholarships-offers-guidelines",
    },
];



const categoryColors: Record<string, string> = {
    "GETTING STARTED": "text-[#ff5b16]",
    "ACCOUNT & PROFILE": "text-[#7547ed]",
    "PAYMENTS & BILLING": "text-[#16a34a]",
    "COURSES & LEARNING": "text-[#ff7a00]",
    "TECHNICAL SUPPORT": "text-[#1677ff]",
    "SAFETY & SECURITY": "text-[#ef315c]",
    GENERAL: "text-[#0891a2]",
};

export default function GuidePage({ allGuides }) {
    const [activeCategory, setActiveCategory] = useState("All Guides");
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("Latest First");
    const [page, setPage] = useState(1);

    const filteredGuides = useMemo(() => {
        let result = [...guides];

        if (activeCategory !== "All Guides") {
            result = result.filter(
                (guide) =>
                    guide.category.toLowerCase() ===
                    activeCategory.toLowerCase()
            );
        }

        if (search.trim()) {
            const query = search.toLowerCase();

            result = result.filter(
                (guide) =>
                    guide.title.toLowerCase().includes(query) ||
                    guide.description.toLowerCase().includes(query) ||
                    guide.category.toLowerCase().includes(query)
            );
        }

        if (sort === "Latest First") {
            result.reverse();
        }

        return result;
    }, [activeCategory, search, sort]);

    

    console.log(allGuides)

    const getGuideIcon = () => {
        return MessageCircleQuestion;
    };

    const handleCategory = (category: string) => {
        setActiveCategory(category);
        setPage(1);
    };

    return (
        <main className="min-h-screen bg-white text-[#101b35]">

            {/* =========================================================
                HERO
            ========================================================= */}
            <section className="relative overflow-hidden bg-gradient-to-br from-[#fffaf7] via-[#fff7f2] to-[#fffdfb]">

                {/* decorative dots */}
                <div className="pointer-events-none absolute left-0 top-10 hidden sm:block">
                    <div className="grid grid-cols-5 gap-[6px] opacity-50">
                        {Array.from({ length: 35 }).map((_, i) => (
                            <span
                                key={i}
                                className="h-[3px] w-[3px] rounded-full bg-[#ff6b35]"
                            />
                        ))}
                    </div>
                </div>

                <div className="pointer-events-none absolute right-[25%] top-12 hidden h-20 w-20 rounded-full bg-[#ffe7d8] opacity-60 lg:block" />

                <div className="pointer-events-none absolute right-[7%] top-24 hidden h-12 w-12 rounded-full bg-[#fff0e7] lg:block" />

                <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-10">
                    <div className="relative grid min-h-[430px] items-center gap-10 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">

                        {/* Left */}
                        <div className="relative z-10">

                            <div className="mb-5 inline-flex items-center rounded-full border border-[#ffd7c3] bg-white px-4 py-2 text-[11px] font-bold uppercase tracking-wide text-[#ff5b16] shadow-sm">
                                Support Center
                            </div>

                            <h1 className="max-w-[650px] text-[42px] font-extrabold leading-[1.05] tracking-[-1.8px] text-[#111a34] sm:text-[54px] lg:text-5xl">
                                Support{" "}
                                <span className="text-[#f45b1b]">
                                    Guides
                                </span>
                            </h1>

                            <p className="mt-5 max-w-[580px] text-[17px] font-medium leading-8 text-[#59647a] sm:text-[19px]">
                                Find helpful articles, tips, and guides to
                                support you at every step.
                            </p>

                            {/* Search */}
                            <div className="mt-7 flex max-w-[580px] rounded-xl border border-[#edf0f4] bg-white p-1.5 shadow-[0_8px_30px_rgba(25,35,55,0.08)]">

                                <div className="flex min-w-0 flex-1 items-center px-4">
                                    <input
                                        type="text"
                                        value={search}
                                        onChange={(e) => {
                                            setSearch(e.target.value);
                                            setPage(1);
                                        }}
                                        placeholder="Search for articles, topics or keywords..."
                                        className="w-full bg-transparent py-3 text-sm text-[#18233c] outline-none placeholder:text-[#9aa2b1]"
                                    />
                                </div>

                                <button
                                    type="button"
                                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#ff5b16] text-white transition hover:bg-[#ed4f0c]"
                                >
                                    <Search size={21} strokeWidth={2.5} />
                                </button>
                            </div>

                            {/* Popular */}
                            <div className="mt-5 flex flex-wrap items-center gap-2">
                                <span className="mr-1 text-sm font-bold text-[#1d2740]">
                                    Popular Searches:
                                </span>
                                {allGuides.data
                                    .filter((item) => item.isPopular)
                                    .map((item) => (
                                        <button
                                            key={item._id}
                                            onClick={() => setSearch(item.category)}
                                            className="rounded-full border border-[#e7e9ed] bg-white px-3 py-1.5 text-sm font-medium text-[#687286] transition hover:border-[#ffb28d] hover:text-[#ff5b16]"
                                        >
                                            {item.category}
                                        </button>
                                    ))}
                            </div>
                        </div>

                        {/* Right Hero Illustration */}
                        <div className="relative hidden min-h-[350px] items-center justify-center lg:flex">

                            <div className="absolute right-[25%] top-8 h-[245px] w-[245px] rounded-full bg-[#fff0e5]" />

                            {/* Question bubble */}
                            <div className="relative z-10 flex h-[150px] w-[180px] mr-40 items-center justify-center rounded-[35px] bg-gradient-to-br from-[#ffb077] to-[#ff7a32] shadow-[0_20px_40px_rgba(245,91,27,0.18)]">
                                <span className="text-[92px] font-bold leading-none text-white">
                                    ?
                                </span>

                                <div className="absolute -bottom-7 left-[65px] h-0 w-0 border-l-[30px] border-t-[35px] border-l-transparent border-t-[#ff7a32]" />
                            </div>

                            {/* Chat bubble */}
                            <div className="absolute bottom-[72px] right-[37%] z-20 flex h-[70px] w-[100px] items-center justify-center rounded-[22px] bg-white shadow-[0_12px_30px_rgba(25,35,55,0.12)]">
                                <div className="flex gap-2">
                                    <span className="h-3 w-3 rounded-full bg-[#ff9b67]" />
                                    <span className="h-3 w-3 rounded-full bg-[#ff9b67]" />
                                    <span className="h-3 w-3 rounded-full bg-[#ff9b67]" />
                                </div>
                            </div>



                            {/* Support boxes */}
                            <div className="absolute right-0 top-4 flex flex-col gap-4">

                                <SupportFeature
                                    icon={<Headphones size={24} />}
                                    title="24/7 Support"
                                    description="We're here to help anytime"
                                />

                                <SupportFeature
                                    icon={<Zap size={24} />}
                                    title="Quick Solutions"
                                    description="Find fast and easy solutions"
                                />

                                <SupportFeature
                                    icon={<BookOpen size={24} />}
                                    title="Step by Step Guides"
                                    description="Detailed guides to help you"
                                />

                            </div>
                        </div>
                    </div>
                </div>

                {/* bottom curve */}
                <div className="absolute -bottom-10 left-[-5%] h-20 w-[110%] rounded-[50%] bg-white" />
            </section>

            {/* =========================================================
                CATEGORY NAVIGATION
            ========================================================= */}
           <section className="relative z-10 mx-auto -mt-1 max-w-[1280px] px-4 sm:px-8 lg:px-10">
    <div className="rounded-2xl border border-[#f0f1f3] bg-white p-2 shadow-[0_8px_30px_rgba(20,30,50,0.05)]">
        <div className="scrollbar-hide flex gap-2 overflow-x-auto">

            {/* All Guides */}
            <motion.button
                layout
                onClick={() => handleCategory("All Guides")}
                className="relative flex min-w-[130px] shrink-0 items-center justify-between gap-2 overflow-hidden rounded-xl px-4 py-3.5"
                whileTap={{ scale: 0.98 }}
            >
                {activeCategory === "All Guides" && (
                    <motion.div
                        layoutId="category-slider"
                        className="absolute inset-0 rounded-xl bg-[#fff3ed]"
                        transition={{
                            type: "spring",
                            stiffness: 180,
                            damping: 22,
                            mass: 0.7,
                        }}
                    />
                )}

                <span
                    className={`relative z-10 text-[12px] font-bold transition-colors duration-200 ${
                        activeCategory === "All Guides"
                            ? "text-[#ff5b16]"
                            : "text-[#273149]"
                    }`}
                >
                    All Guides
                </span>

                <span
                    className={`relative z-10 flex h-7 min-w-7 items-center justify-center rounded-full px-2 text-[10px] font-bold transition-colors duration-200 ${
                        activeCategory === "All Guides"
                            ? "bg-[#ff5b16] text-white"
                            : "bg-[#f3f4f6] text-[#667085]"
                    }`}
                >
                    {allGuides?.data?.length || 0}
                </span>
            </motion.button>

            {/* Dynamic Categories */}
            {[
                ...new Set(
                    allGuides?.data
                        ?.map((item) => item.category)
                        .filter(Boolean)
                ),
            ].map((category) => {
                const count =
                    allGuides?.data?.filter(
                        (item) => item.category === category
                    ).length || 0;

                const isActive = activeCategory === category;

                return (
                    <motion.button
                        key={category}
                        layout
                        onClick={() => handleCategory(category)}
                        className="relative flex min-w-[155px] shrink-0 items-center justify-between gap-2 overflow-hidden rounded-xl px-4 py-3.5"
                        whileTap={{ scale: 0.98 }}
                    >
                        {/* TRAIN-LIKE SLIDING ACTIVE BACKGROUND */}
                        {isActive && (
                            <motion.div
                                layoutId="category-slider"
                                className="absolute inset-0 rounded-xl bg-[#fff3ed]"
                                transition={{
                                    type: "spring",
                                    stiffness: 180,
                                    damping: 22,
                                    mass: 0.7,
                                }}
                            />
                        )}

                        <motion.span
                            animate={{
                                color: isActive
                                    ? "#ff5b16"
                                    : "#273149",
                            }}
                            transition={{
                                duration: 0.15,
                            }}
                            className="relative z-10 truncate text-[12px] font-bold"
                        >
                            {category}
                        </motion.span>

                        <motion.span
                            animate={{
                                backgroundColor: isActive
                                    ? "#ff5b16"
                                    : "#f3f4f6",
                                color: isActive
                                    ? "#ffffff"
                                    : "#667085",
                            }}
                            transition={{
                                duration: 0.15,
                            }}
                            className="relative z-10 flex h-7 min-w-7 shrink-0 items-center justify-center rounded-full px-2 text-[10px] font-bold"
                        >
                            {count}
                        </motion.span>
                    </motion.button>
                );
            })}
        </div>
    </div>
</section>

            {/* =========================================================
                GUIDES
            ========================================================= */}
            <section className="mx-auto max-w-[1280px] px-4 pb-16 pt-12 sm:px-8 lg:px-10 lg:pt-14">

                {/* Heading */}
                <div className="mb-7 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

                    <div>
                        <h2 className="text-[27px] font-extrabold tracking-[-0.7px] text-[#111a34] sm:text-[31px]">
                            All Guides
                        </h2>

                        <p className="mt-1 text-sm text-[#737c8e]">
                            Browse our latest guides and support articles.
                        </p>
                    </div>

                    {/* Sort */}
                    <div className="relative">
                        <select
                            value={sort}
                            onChange={(e) => setSort(e.target.value)}
                            className="h-11 appearance-none rounded-xl border border-[#e5e8ed] bg-white pl-4 pr-10 text-xs font-semibold text-[#29334a] outline-none transition hover:border-[#ffb28d]"
                        >
                            <option>Latest First</option>
                            <option>Oldest First</option>
                        </select>

                        <ChevronDown
                            size={15}
                            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#647087]"
                        />
                    </div>
                </div>

                {/* Empty state */}
                {allGuides.data.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-[#e3e6eb] py-20 text-center">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#fff3ed] text-[#ff5b16]">
                            <Search size={28} />
                        </div>

                        <h3 className="text-lg font-bold text-[#17213a]">
                            No guides found
                        </h3>

                        <p className="mt-2 text-sm text-[#778094]">
                            Try another search or select a different category.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-3">

                        {allGuides.data.map((guide) => {
                            const Icon = getGuideIcon();

                            return (
                                <article
                                    key={guide.id}
                                    className="group relative overflow-hidden rounded-2xl border border-[#edf0f3] bg-white transition-all duration-300 hover:-translate-y-[2px] hover:border-[#ffd6c4] hover:shadow-[0_12px_35px_rgba(25,35,55,0.08)]"
                                >

                                    {/* orange hover line */}
                                    <div className="absolute left-0 top-0 h-full w-[3px] origin-top scale-y-0 bg-[#ff5b16] transition-transform duration-300 group-hover:scale-y-100" />

                                    <div className="grid items-center gap-5 p-5 sm:grid-cols-[90px_minmax(0,1fr)_180px_55px] sm:px-6 sm:py-5 lg:grid-cols-[105px_minmax(0,1fr)_190px_58px]">

                                        {/* Single Question Icon */}
                                        <div className="flex justify-center sm:justify-start">
                                            <div className="flex h-[66px] w-[66px] items-center justify-center rounded-full bg-[#fff0e8] ring-1 ring-[#ffe0d0] transition-transform duration-300 group-hover:scale-105">
                                                <Icon
                                                    size={34}
                                                    strokeWidth={2.2}
                                                    className="text-[#ff5b16]"
                                                />
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="min-w-0 text-center sm:text-left">

                                            <p
                                                className={`mb-1.5 text-sm font-extrabold tracking-wide ${categoryColors[
                                                    guide.category
                                                ] || "text-[#ff5b16]"
                                                    }`}
                                            >
                                                {guide.category}
                                            </p>

                                            <h3 className="text-[15px] font-bold leading-6 text-[#17213a] transition-colors group-hover:text-[#ff5b16] sm:text-[16px]">
                                                {guide.title}
                                            </h3>

                                            <p className="mt-1 line-clamp-2 max-w-[650px] text-[12px] leading-5 text-[#697388] sm:text-[13px]" dangerouslySetInnerHTML={{
                                                __html: guide.description
                                            }}>

                                            </p>
                                        </div>

                                        {/* Meta */}
                                        <div className="flex flex-row justify-center gap-5 text-[10px] text-[#697388] sm:flex-col sm:items-start sm:gap-2">

                                            <div className="flex items-center gap-2 px-2.5">
                                                <CalendarDays
                                                    size={14}
                                                    className="text-[#7c879b]"
                                                />
                                                <span className="text-sm">
                                                    {new Date(guide.createdAt).toLocaleDateString("en-US", {
                                                        month: "short",
                                                        day: "numeric",
                                                        year: "numeric",
                                                    })}
                                                </span>
                                            </div>

                                            {guide.isPopular && (
                                                <div className="inline-flex w-fit items-center gap-1.5 rounded-full border border-orange-200 bg-orange-50 px-2.5 py-1">
                                                    <UserRound
                                                        size={12}
                                                        strokeWidth={2.5}
                                                        className="text-[#ff5b16]"
                                                    />
                                                    <span className="text-sm font-bold text-[#e85b22]">
                                                        Frequently Asked
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Arrow */}
                                        <div className="flex justify-center sm:justify-end">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    window.location.href = `/guide/${guide.slug}`
                                                }
                                                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#ff9b72] text-[#ff5b16] transition-all duration-300 group-hover:bg-[#ff5b16] group-hover:text-white"
                                            >
                                                <ArrowRight size={18} />
                                            </button>
                                        </div>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                )}

                {/* =====================================================
                    PAGINATION
                ===================================================== */}
                <div className="mt-10 flex items-center justify-center gap-1.5">

                  {/* Pagination */}
{allGuides.pagination?.pages > 0 && (
    <div className="mt-10 flex items-center justify-center gap-2">

        {/* Previous */}
        <button
            type="button"
            disabled={allGuides.pagination.page === 1}
            onClick={() => {
                setPage((prev) => Math.max(prev - 1, 1));
            }}
            className={`
                flex h-9 w-9 items-center justify-center rounded-lg
                border transition-all
                ${
                    allGuides.pagination.page === 1
                        ? "cursor-not-allowed border-[#eeeeee] text-[#c5c9d0]"
                        : "border-[#e5e7eb] text-[#273149] hover:border-[#ff6b35] hover:text-[#ff6b35]"
                }
            `}
        >
            <ChevronLeft size={16} />
        </button>

        {/* Page Numbers */}
        {Array.from(
            { length: allGuides.pagination.pages },
            (_, index) => index + 1
        ).map((pageNumber) => (
            <button
                key={pageNumber}
                type="button"
                onClick={() => setPage(pageNumber)}
                className={`
                    flex h-9 min-w-9 items-center justify-center
                    rounded-lg border px-2 text-xs font-semibold
                    transition-all duration-200
                    ${
                        allGuides.pagination.page === pageNumber
                            ? "border-[#ff6b35] bg-[#fff3ed] text-[#ff5b16]"
                            : "border-[#e5e7eb] bg-white text-[#273149] hover:border-[#ffb28d] hover:text-[#ff5b16]"
                    }
                `}
            >
                {pageNumber}
            </button>
        ))}

        {/* Next */}
        <button
            type="button"
            disabled={allGuides.pagination.page === allGuides.pagination.pages}
            onClick={() => {
                setPage((prev) =>
                    Math.min(prev + 1, allGuides.pagination.pages)
                );
            }}
            className={`
                flex h-9 w-9 items-center justify-center rounded-lg
                border transition-all
                ${
                    allGuides.pagination.page === allGuides.pagination.pages
                        ? "cursor-not-allowed border-[#eeeeee] text-[#c5c9d0]"
                        : "border-[#e5e7eb] text-[#273149] hover:border-[#ff6b35] hover:text-[#ff6b35]"
                }
            `}
        >
            <ChevronRight size={16} />
        </button>
    </div>
)}
                </div>
            </section>
        </main>
    );
}

/* =========================================================
   SUPPORT FEATURE
========================================================= */

function SupportFeature({
    icon,
    title,
    description,
}: {
    icon: React.ReactNode;
    title: string;
    description: string;
}) {
    return (
        <div className="flex w-[190px] items-center gap-3 rounded-xl border border-[#f1e9e4] bg-white px-4 py-3.5 shadow-[0_8px_25px_rgba(25,35,55,0.06)]">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#fff0e8] text-[#ff5b16]">
                {icon}
            </div>

            <div>
                <p className="text-[12px] font-bold text-[#18223a]">
                    {title}
                </p>

                <p className="mt-0.5 text-[9px] leading-4 text-[#7b8496]">
                    {description}
                </p>
            </div>
        </div>
    );
}

/* =========================================================
   PAGINATION BUTTON
========================================================= */

function PaginationButton({
    children,
    active = false,
    disabled = false,
    onClick,
}: {
    children: React.ReactNode;
    active?: boolean;
    disabled?: boolean;
    onClick?: () => void;
}) {
    return (
        <button
            type="button"
            disabled={disabled}
            onClick={onClick}
            className={`
                flex h-9 min-w-9 items-center justify-center rounded-lg border px-2 text-xs font-semibold transition
                ${active
                    ? "border-[#ff6b35] bg-[#fff4ed] text-[#ff5b16]"
                    : "border-[#e7e9ed] bg-white text-[#3d475d] hover:border-[#ffb28d] hover:text-[#ff5b16]"
                }
                ${disabled
                    ? "cursor-not-allowed opacity-40"
                    : ""
                }
            `}
        >
            {children}
        </button>
    );
}