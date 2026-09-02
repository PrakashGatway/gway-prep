"use client";
import React, { useEffect, useState } from "react";
import {
    ArrowRight,
    BookOpen,
    Check,
    ChevronRight,
    Clock3,
    EyeIcon,
    Headphones,
    Home,
    Info,
    Mail,
    Menu,
    MessageCircle,
    Printer,
    Search,
    Send,
    ShieldCheck,
    ThumbsDown,
    ThumbsUp,
    UserRound,
    X,
} from "lucide-react";

const popularTopics = [
    "Account",
    "Payments",
    "Courses",
    "Certificates",
    "Refunds",
];

const articleSections = [
    {
        id: "balance",
        title: "In case, if you have balance",
    },
    {
        id: "things-to-know",
        title: "Things you should know",
    },
    {
        id: "after-closing",
        title: "What happens after closing your account?",
    },
    {
        id: "help",
        title: "Need more help?",
    },
];

export default function SupportArticlePage({article}) {
    const [mobileMenu, setMobileMenu] = useState(false);
    const [helpful, setHelpful] = useState<"yes" | "no" | null>(null);

    console.log(article)

 const [activeSection, setActiveSection] = useState("");

     const [articleContent, setArticleContent] = useState("");
    const [articleSections, setArticleSections] = useState<Section[]>([]);

   useEffect(() => {
    if (!article?.content) {
        setArticleContent("");
        setArticleSections([]);
        setActiveSection("");
        return;
    }

    const parser = new DOMParser();

    const doc = parser.parseFromString(
        article.content,
        "text/html"
    );

    const headings = doc.querySelectorAll("h2");

    const sections: Section[] = [];

    headings.forEach((heading, index) => {
        const id = `article-section-${index}`;

        heading.setAttribute("id", id);

        // Prevent sticky header from covering the heading
        (heading as HTMLElement).style.scrollMarginTop = "110px";

        sections.push({
            id,
            title: heading.textContent?.trim() || "",
        });
    });

    setArticleSections(sections);

    // Set the HTML after adding IDs
    setArticleContent(doc.body.innerHTML);

}, [article?.content]);

useEffect(() => {
    if (!articleSections.length) return;

    const headings = articleSections
        .map((section) =>
            document.getElementById(section.id)
        )
        .filter(Boolean) as HTMLElement[];

    if (!headings.length) return;

    const observer = new IntersectionObserver(
        (entries) => {
            const visibleSections = entries
                .filter((entry) => entry.isIntersecting)
                .sort(
                    (a, b) =>
                        a.boundingClientRect.top -
                        b.boundingClientRect.top
                );

            if (visibleSections.length > 0) {
                setActiveSection(
                    visibleSections[0].target.id
                );
            }
        },
        {
            root: null,
            rootMargin: "-110px 0px -60% 0px",
            threshold: 0,
        }
    );

    headings.forEach((heading) => {
        observer.observe(heading);
    });

    return () => {
        observer.disconnect();
    };
}, [articleSections]);

   const scrollToSection = (id: string) => {
    setActiveSection(id);

    const element = document.getElementById(id);

    if (element) {
        element.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }
};



    return (
       <>
        <div className="min-h-screen bg-white text-slate-900">

            {/* =====================================================
                HEADER
            ====================================================== */}


            {/* =====================================================
                HERO
            ====================================================== */}

           <section
    className="
        relative
        overflow-hidden
        bg-gradient-to-br
        from-orange-50
        via-[#fff8f2]
        to-white
    "
>
    {/* Decorative Background */}
    <div
        className="
            pointer-events-none
            absolute
            -left-24
            top-10
            h-64
            w-64
            rounded-full
            bg-orange-200/20
            blur-3xl
        "
    />

    <div
        className="
            pointer-events-none
            absolute
            -right-20
            -top-20
            h-[380px]
            w-[380px]
            rounded-full
            bg-orange-300/15
            blur-3xl
        "
    />

    <div
        className="
            relative
            mx-auto
            flex
            min-h-[330px]
            max-w-[1280px]
            items-center
            px-5
            py-10
            sm:px-8
            lg:min-h-[360px]
            lg:px-10
            lg:py-8
        "
    >
        <div
            className="
                grid
                w-full
                grid-cols-1
                items-center
                lg:grid-cols-[58%_42%]
            "
        >

            {/* =====================================================
                LEFT CONTENT
            ===================================================== */}
            <div
                className="
                    flex
                    min-w-0
                    flex-col
                    justify-center
                    lg:pr-8
                    xl:pr-12
                "
            >
                <div className="flex items-start gap-4">

                    {/* Category Icon */}
                   

                    {/* Text Content */}
                    <div className="min-w-0 flex-1">

                        {/* Category */}
                        <span
                            className="
                                inline-flex
                                items-center
                                rounded-full
                                bg-orange-100
                                px-3
                                py-1
                                text-[10px]
                                font-bold
                                uppercase
                                tracking-[0.5px]
                                text-orange-600
                            "
                        >
                            {article?.category}
                        </span>

                        {/* Title */}
                        <h1
                            className="
                                mt-3
                                max-w-[720px]
                                text-[28px]
                                font-extrabold
                                leading-[1.18]
                                tracking-tight
                                text-[#071f49]
                                sm:text-[32px]
                                md:text-[36px]
                                lg:text-[38px]
                                xl:text-[40px]
                            "
                        >
                            {article?.title}
                        </h1>

                        {/* Meta */}
                        <div
                            className="
                                mt-4
                                flex
                                flex-wrap
                                items-center
                                gap-x-3
                                gap-y-2
                                text-[12px]
                                font-medium
                                text-[#7890b2]
                                sm:text-[13px]
                            "
                        >
                            <span>
                                Updated on{" "}
                                {article?.updatedAt &&
                                    new Date(
                                        article.updatedAt
                                    ).toLocaleDateString(
                                        "en-US",
                                        {
                                            month: "short",
                                            day: "numeric",
                                            year: "numeric",
                                        }
                                    )}
                            </span>

                            <span className="text-[#b9c3d1]">
                                •
                            </span>

                            <span className="flex items-center gap-1.5">
                                <EyeIcon size={13} />
                                {article?.views || 0}
                            </span>
                        </div>

                    </div>

                </div>

                {/* Actions */}
                <div
                    className="
                        mt-5
                        ml-16
                        flex
                        items-center
                        gap-2
                        sm:ml-[72px]
                        lg:mt-4
                    "
                >
                    <button
                        type="button"
                        title="Print article"
                        className="
                            flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-xl
                            border
                            border-slate-200
                            bg-white
                            text-slate-500
                            shadow-sm
                            transition-all
                            hover:-translate-y-0.5
                            hover:border-orange-200
                            hover:bg-orange-50
                            hover:text-orange-500
                        "
                    >
                        <Printer size={16} />
                    </button>

                    <button
                        type="button"
                        title="Share article"
                        className="
                            flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-xl
                            border
                            border-slate-200
                            bg-white
                            text-slate-500
                            shadow-sm
                            transition-all
                            hover:-translate-y-0.5
                            hover:border-orange-200
                            hover:bg-orange-50
                            hover:text-orange-500
                        "
                    >
                        <Send size={15} />
                    </button>
                </div>
            </div>


            {/* =====================================================
                RIGHT ILLUSTRATION
            ===================================================== */}
            <div
                className="
                    relative
                    hidden
                    h-[320px]
                    w-full
                    items-center
                    justify-center
                    lg:flex
                "
            >

                {/* Illustration Glow */}
                <div
                    className="
                        absolute
                        right-8
                        top-1/2
                        h-[260px]
                        w-[260px]
                        -translate-y-1/2
                        rounded-full
                        bg-orange-100/70
                        blur-3xl
                    "
                />

                <img
                    src="/image/support-article.png"
                    alt="Support article"
                    className="
                        relative
                        z-10
                        h-full
                        w-full
                        max-w-[470px]
                        object-contain
                        object-center
                        drop-shadow-[0_18px_30px_rgba(15,23,42,0.08)]
                    "
                />
            </div>

        </div>
    </div>
</section>

            {/* =====================================================
                MAIN CONTENT
            ====================================================== */}

            <main className="
                mx-auto
                max-w-[1180px]
                px-5
                py-8
                sm:px-8
                lg:px-0
                lg:py-4
            ">

                {/* Breadcrumb */}
                <div className="
                    mb-6
                    flex
                    flex-wrap
                    items-center
                    gap-2
                    text-[11px]
                    text-slate-400
                ">

                    <Home size={13} />

                    <ChevronRight size={12} />

                    <span>Support</span>

                    <ChevronRight size={12} />

                    <span className="text-slate-600">
                        {article?.category}
                    </span>

                </div>

                <div className="
                    grid
                    grid-cols-1
                    gap-6
                    lg:grid-cols-[minmax(0,1fr)_300px]
                ">

                    {/* =================================================
                        ARTICLE
                    ================================================== */}

                    <article className="
                        overflow-hidden
                        rounded-[22px]
                        border
                        border-slate-100
                        bg-white
                        shadow-[0_10px_40px_rgba(15,23,42,0.05)]
                    ">

                        <div className="p-5 sm:p-7 lg:p-9">

                         

                            {/* Notice */}
                            <div className="
                                mt-3
                                flex
                                gap-3
                                rounded-2xl
                                border
                                border-orange-200
                                bg-orange-50/60
                                p-4
                                sm:p-5
                            ">

                                <div className="
                                    flex
                                    h-8 w-8
                                    shrink-0
                                    items-center justify-center
                                    rounded-xl
                                    bg-white
                                    text-orange-500
                                    shadow-sm
                                ">
                                    <Info size={16} />
                                </div>

                                <p className="
                                    text-sm
                                    leading-5
                                    text-slate-600
                                    sm:text-[13px]
                                " dangerouslySetInnerHTML={{
                                    __html: article?.description
                                }}>
                                 
                                </p>

                            </div>

                            <div>
   

<style jsx global>{`
    /* =========================================================
       MAIN ARTICLE
    ========================================================= */

    .article-content {
        width: 100%;
        color: #374151;
        font-size: 17px;
        line-height: 1.75;
        word-break: break-word;
    }

    /* =========================================================
       PARAGRAPHS
    ========================================================= */

    .article-content p {
        margin: 0 0 16px !important;
        color: #374151 !important;
        font-size: 17px !important;
        line-height: 1.75 !important;
    }

    /* =========================================================
       HEADINGS
    ========================================================= */

    .article-content h1 {
        margin: 32px 0 16px !important;
        color: #111827 !important;
        font-size: 30px !important;
        font-weight: 800 !important;
        line-height: 1.25 !important;
    }

    .article-content h2 {
        position: relative;

        margin: 28px 0 14px !important;
        padding-left: 30px !important;

        color: #111827 !important;
        font-size: 23px !important;
        font-weight: 700 !important;
        line-height: 1.4 !important;
    }

    /* Orange circle before H2 */
    .article-content h2::before {
        content: "!";

        position: absolute;
        left: 0;
        top: 2px;

        display: flex;
        align-items: center;
        justify-content: center;

        width: 19px;
        height: 19px;

        border: 1.5px solid #f97316;
        border-radius: 50%;

        color: #f97316;
        font-size: 11px;
        font-weight: 800;
        line-height: 1;
    }

    .article-content h3 {
        margin: 22px 0 11px !important;
        color: #111827 !important;
        font-size: 20px !important;
        font-weight: 700 !important;
        line-height: 1.4 !important;
    }

    .article-content h4 {
        margin: 18px 0 9px !important;
        color: #111827 !important;
        font-size: 18px !important;
        font-weight: 700 !important;
        line-height: 1.4 !important;
    }

    .article-content h5 {
        margin: 16px 0 8px !important;
        color: #111827 !important;
        font-size: 17px !important;
        font-weight: 700 !important;
        line-height: 1.4 !important;
    }

    .article-content h6 {
        margin: 14px 0 7px !important;
        color: #111827 !important;
        font-size: 16px !important;
        font-weight: 700 !important;
        line-height: 1.4 !important;
    }

    /* =========================================================
       ORDERED LIST
       Orange numbered circles
    ========================================================= */

    .article-content ol {
        counter-reset: article-counter;

        margin: 12px 0 18px !important;
        padding: 0 !important;

        list-style: none !important;
    }

    .article-content ol > li {
        position: relative;

        display: flex;
        align-items: flex-start;

        min-height: 22px;

        margin: 0 0 8px !important;
        padding: 0 0 0 30px !important;

        color: #374151 !important;
        font-size: 16px !important;
        line-height: 1.7 !important;

        list-style: none !important;
    }

    /* Number circle */
    .article-content ol > li::before {
        counter-increment: article-counter;
        content: counter(article-counter);

        position: absolute;
        left: 0;
        top: 2px;

        display: flex;
        align-items: center;
        justify-content: center;

        width: 19px;
        height: 19px;

        border-radius: 50%;

        background: #f97316;
        color: white;

        font-size: 11px;
        font-weight: 700;
        line-height: 1;
    }

    /* =========================================================
       UNORDERED LIST
       Orange check/icon circles
    ========================================================= */

    .article-content ul {
        margin: 12px 0 18px !important;
        padding: 0 !important;

        list-style: none !important;
    }

    .article-content ul > li {
        position: relative;

        display: flex;
        align-items: flex-start;

        margin: 0 0 9px !important;
        padding: 0 0 0 32px !important;

        color: #374151 !important;
        font-size: 16px !important;
        line-height: 1.7 !important;

        list-style: none !important;
    }

    /* Orange outlined icon */
    .article-content ul > li::before {
        content: "✓";

        position: absolute;
        left: 0;
        top: 2px;

        display: flex;
        align-items: center;
        justify-content: center;

        width: 19px;
        height: 19px;

        border: 1.5px solid #f97316;
        border-radius: 50%;

        color: #f97316;

        font-size: 11px;
        font-weight: 800;
        line-height: 1;
    }

    /* =========================================================
       NESTED LIST
    ========================================================= */

    .article-content ul ul,
    .article-content ol ol,
    .article-content ul ol,
    .article-content ol ul {
        margin: 8px 0 8px !important;
        padding-left: 10px !important;
    }

    .article-content ul ul > li::before {
        content: "•";

        background: transparent;
        border: 0;

        font-size: 17px;
        font-weight: 900;
    }

    /* =========================================================
       STRONG / BOLD
    ========================================================= */

    .article-content strong,
    .article-content b {
        color: #111827 !important;
        font-weight: 700 !important;
    }

    /* =========================================================
       LINKS
    ========================================================= */

    .article-content a {
        color: #f97316 !important;
        font-weight: 600 !important;
        text-decoration: underline !important;
        text-decoration-color: #fdba74 !important;
        text-underline-offset: 3px !important;
    }

    .article-content a:hover {
        color: #ea580c !important;
    }

    /* =========================================================
       BLOCKQUOTE
    ========================================================= */

    .article-content blockquote {
        margin: 20px 0 !important;
        padding: 14px 18px !important;

        border-left: 4px solid #f97316 !important;
        border-radius: 0 10px 10px 0 !important;

        background: #fff7ed !important;

        color: #4b5563 !important;

        font-size: 16px !important;
        line-height: 1.7 !important;
    }

    /* =========================================================
       HORIZONTAL LINE
    ========================================================= */

    .article-content hr {
        margin: 28px 0 !important;

        border: 0 !important;
        border-top: 1px solid #eeeeee !important;
    }

    /* =========================================================
       TABLE
    ========================================================= */

    .article-content table {
        width: 100% !important;
        margin: 22px 0 !important;

        border-collapse: collapse !important;

        border: 1px solid #eeeeee !important;

        font-size: 15px !important;
    }

    .article-content th {
        padding: 10px 12px !important;

        border: 1px solid #eeeeee !important;

        background: #fff7ed !important;

        color: #111827 !important;

        font-size: 15px !important;
        font-weight: 700 !important;
        text-align: left !important;
    }

    .article-content td {
        padding: 10px 12px !important;

        border: 1px solid #eeeeee !important;

        color: #4b5563 !important;

        font-size: 15px !important;
    }

    /* =========================================================
       IMAGES
    ========================================================= */

    .article-content img {
        display: block !important;

        max-width: 100% !important;
        height: auto !important;

        margin: 22px auto !important;

        border-radius: 12px !important;
    }

    /* =========================================================
       VIDEO / IFRAME
    ========================================================= */

    .article-content iframe,
    .article-content video {
        display: block !important;

        width: 100% !important;
        max-width: 100% !important;

        margin: 22px auto !important;

        border: 0 !important;
        border-radius: 12px !important;
    }

    /* =========================================================
       CODE
    ========================================================= */

    .article-content code {
        padding: 2px 6px !important;

        border-radius: 5px !important;

        background: #f3f4f6 !important;

        color: #ea580c !important;

        font-size: 13px !important;
    }

    .article-content pre {
        overflow-x: auto !important;

        margin: 20px 0 !important;
        padding: 15px !important;

        border-radius: 10px !important;

        background: #111827 !important;
        color: #f9fafb !important;

        font-size: 14px !important;
        line-height: 1.6 !important;
    }

    .article-content pre code {
        padding: 0 !important;
        background: transparent !important;
        color: inherit !important;
        font-size: 14px !important;
    }

    /* =========================================================
       FIRST PARAGRAPH
    ========================================================= */

    .article-content > p:first-child {
        margin-top: 0 !important;
    }

    /* =========================================================
       MOBILE
    ========================================================= */

    @media (max-width: 640px) {

        .article-content {
            font-size: 16px;
            line-height: 1.7;
        }

        .article-content p {
            font-size: 16px !important;
            line-height: 1.7 !important;
            margin-bottom: 15px !important;
        }

        .article-content h1 {
            margin: 26px 0 14px !important;
            font-size: 25px !important;
        }

        .article-content h2 {
            margin-top: 24px !important;
            margin-bottom: 12px !important;
            padding-left: 27px !important;

            font-size: 21px !important;
        }

        .article-content h2::before {
            width: 17px;
            height: 17px;

            font-size: 10px;
        }

        .article-content h3 {
            margin-top: 20px !important;
            font-size: 18px !important;
        }

        .article-content h4 {
            font-size: 17px !important;
        }

        .article-content h5 {
            font-size: 16px !important;
        }

        .article-content h6 {
            font-size: 15px !important;
        }

        .article-content ol > li {
            padding-left: 28px !important;
            font-size: 15px !important;
            line-height: 1.65 !important;
        }

        .article-content ul > li {
            padding-left: 29px !important;
            font-size: 15px !important;
            line-height: 1.65 !important;
        }

        .article-content ol > li::before {
            width: 18px;
            height: 18px;

            font-size: 10px;
        }

        .article-content ul > li::before {
            width: 18px;
            height: 18px;

            font-size: 11px;
        }

        .article-content blockquote {
            font-size: 15px !important;
            line-height: 1.65 !important;
        }

        .article-content table {
            display: block !important;
            overflow-x: auto !important;
            white-space: nowrap;

            font-size: 14px !important;
        }

        .article-content th,
        .article-content td {
            font-size: 14px !important;
        }

        .article-content code {
            font-size: 12px !important;
        }

        .article-content pre {
            font-size: 13px !important;
        }

        .article-content pre code {
            font-size: 13px !important;
        }
    }
`}</style>
       <div
    className="article-content"
    dangerouslySetInnerHTML={{
        __html: articleContent || "",
    }}
/>
                            </div>

              


                            {/* =================================================
                                HELPFUL
                            ================================================== */}

                            <div className="
                                mt-9
                                flex
                                flex-col
                                gap-4
                                rounded-2xl
                                border
                                border-orange-100
                                bg-gradient-to-r
                                from-orange-50
                                to-white
                                p-4
                                sm:flex-row
                                sm:items-center
                                sm:justify-between
                                sm:p-5
                            ">

                                <p className="
                                    text-sm
                                    font-bold
                                    text-slate-800
                                ">
                                    Was this article helpful?
                                </p>

                                <div className="flex items-center gap-2">

                                    <button
                                        onClick={() => setHelpful("yes")}
                                        className={`
                                            flex
                                            items-center
                                            gap-2
                                            rounded-xl
                                            border
                                            px-4
                                            py-2.5
                                            text-[11px]
                                            font-semibold
                                            transition
                                            ${
                                                helpful === "yes"
                                                    ? "border-orange-500 bg-orange-500 text-white"
                                                    : "border-orange-200 bg-white text-orange-500 hover:bg-orange-50"
                                            }
                                        `}
                                    >
                                        <ThumbsUp size={14} />
                                        Yes
                                    </button>

                                    <button
                                        onClick={() => setHelpful("no")}
                                        className={`
                                            flex
                                            items-center
                                            gap-2
                                            rounded-xl
                                            border
                                            px-4
                                            py-2.5
                                            text-[11px]
                                            font-semibold
                                            transition
                                            ${
                                                helpful === "no"
                                                    ? "border-slate-700 bg-slate-700 text-white"
                                                    : "border-slate-200 bg-white text-slate-500 hover:bg-slate-50"
                                            }
                                        `}
                                    >
                                        <ThumbsDown size={14} />
                                        No
                                    </button>

                                </div>

                            </div>

                        </div>

                    </article>

                    {/* =====================================================
                        SIDEBAR
                    ====================================================== */}

                    <aside className="space-y-5">

                        {/* In this article */}
                      <div
    className="
        sticky
        top-[55px]
        max-h-80
        overflow-y-auto
        rounded-[20px]
        border
        border-slate-100
        bg-white
        p-5
        shadow-[0_10px_35px_rgba(15,23,42,0.05)]
    "
>
    <h3
        className="
            text-sm
            font-extrabold
            text-slate-900
        "
    >
        In this article
    </h3>

    <div className="mt-4 space-y-1">

        {articleSections.map((section) => {

            const isActive =
                activeSection === section.id;

            return (
                <button
                    key={section.id}
                    onClick={() =>
                        scrollToSection(section.id)
                    }
                    className={`
                        group
                        flex
                        w-full
                        items-start
                        gap-2
                        rounded-xl
                        px-3
                        py-2.5
                        text-left
                        text-[11px]
                        leading-5
                        transition-all
                        duration-200

                        ${
                            isActive
                                ? `
                                    bg-orange-50
                                    font-semibold
                                    text-orange-500
                                `
                                : `
                                    text-slate-500
                                    hover:bg-slate-50
                                    hover:text-orange-500
                                `
                        }
                    `}
                >
                    <ChevronRight
                        size={13}
                        className={`
                            mt-1
                            shrink-0
                            transition-all
                            duration-200

                            ${
                                isActive
                                    ? `
                                        translate-x-0.5
                                        text-orange-500
                                        opacity-100
                                    `
                                    : `
                                        opacity-50
                                        group-hover:translate-x-0.5
                                    `
                            }
                        `}
                    />

                    <span>
                        {section.title}
                    </span>
                </button>
            );
        })}

    </div>
</div>

                        {/* Support Card */}
                        <div className="
                            overflow-hidden
                            rounded-[20px]
                              sticky
                            top-100
                            border
                            border-orange-100
                            bg-gradient-to-br
                            from-orange-50
                            via-white
                            to-orange-50
                            p-6
                            text-center
                        ">

                            <div className="
                                mx-auto
                                flex h-16 w-16
                                items-center justify-center
                                rounded-full
                                bg-orange-100
                                text-orange-500
                            ">
                                <Headphones size={28} />
                            </div>

                            <h3 className="
                                mt-5
                                text-lg
                                font-extrabold
                                text-slate-900
                            ">
                                Still need help?
                            </h3>

                            <p className="
                                mt-2
                                text-[11px]
                                leading-5
                                text-slate-500
                            ">
                                Our support team is here to help
                                you whenever you need us.
                            </p>

                            <button className="
                                mt-5
                                flex
                                w-full
                                items-center
                                justify-center
                                gap-2
                                rounded-xl
                                bg-orange-500
                                px-4
                                py-3
                                text-[11px]
                                font-bold
                                text-white
                                shadow-lg
                                shadow-orange-500/20
                                transition
                                hover:bg-orange-600
                            ">
                                Contact Support
                                <ArrowRight size={14} />
                            </button>

                        </div>

                    </aside>

                </div>

                {/* =================================================
                    TICKET CTA
                ================================================== */}

                <section
                    id="help"
                    className="
                        mt-7
                        overflow-hidden
                        rounded-[22px]
                        border
                        border-slate-100
                        bg-white
                        shadow-[0_10px_40px_rgba(15,23,42,0.04)]
                    "
                >

                    <div className="
                        flex
                        flex-col
                        gap-6
                        p-5
                        sm:p-7
                        lg:flex-row
                        lg:items-center
                        lg:justify-between
                        lg:px-9
                    ">

                        <div className="flex items-center gap-4">

                            <div className="
                                flex
                                h-14 w-14
                                shrink-0
                                items-center justify-center
                                rounded-2xl
                                bg-orange-50
                                text-orange-500
                            ">
                                <Mail size={25} />
                            </div>

                            <div>

                                <h3 className="
                                    text-base
                                    font-extrabold
                                    text-slate-900
                                    sm:text-lg
                                ">
                                    Can't find what you're looking for?
                                </h3>

                                <p className="
                                    mt-1
                                    text-[11px]
                                    leading-5
                                    text-slate-500
                                ">
                                    Send us a message and we'll get back
                                    to you as soon as possible.
                                </p>

                            </div>

                        </div>

                        <button className="
                            flex
                            w-full
                            items-center
                            justify-center
                            gap-2
                            rounded-xl
                            bg-orange-500
                            px-6
                            py-3.5
                            text-sm
                            font-bold
                            text-white
                            shadow-lg
                            shadow-orange-500/20
                            transition
                            hover:bg-orange-600
                            sm:w-fit
                        ">
                            Submit a Ticket
                            <ArrowRight size={15} />
                        </button>

                    </div>

                </section>

                {/* =================================================
                    FEATURES
                ================================================== */}

                <section className="
                    mt-7
                    grid
                    grid-cols-1
                    divide-y
                    divide-slate-100
                    rounded-[20px]
                    border
                    border-slate-100
                    bg-white
                    sm:grid-cols-2
                    sm:divide-x
                    sm:divide-y-0
                    lg:grid-cols-4
                ">

                    {[
                        {
                            icon: Clock3,
                            title: "Fast Response",
                            text: "We reply within 24 hours",
                        },
                        {
                            icon: UserRound,
                            title: "Expert Support",
                            text: "Get help from our experts",
                        },
                        {
                            icon: Headphones,
                            title: "24/7 Available",
                            text: "Support anytime, anywhere",
                        },
                        {
                            icon: ShieldCheck,
                            title: "Secure & Safe",
                            text: "Your data is always protected",
                        },
                    ].map((item) => {
                        const Icon = item.icon;

                        return (
                            <div
                                key={item.title}
                                className="
                                    flex
                                    items-center
                                    gap-3
                                    p-5
                                "
                            >

                                <div className="
                                    flex h-9 w-9
                                    shrink-0
                                    items-center justify-center
                                    rounded-xl
                                    bg-orange-50
                                    text-orange-500
                                ">
                                    <Icon size={17} />
                                </div>

                                <div>
                                    <p className="
                                        text-[11px]
                                        font-bold
                                        text-slate-800
                                    ">
                                        {item.title}
                                    </p>

                                    <p className="
                                        mt-0.5
                                        text-[9px]
                                        text-slate-400
                                    ">
                                        {item.text}
                                    </p>
                                </div>

                            </div>
                        );
                    })}

                </section>

            </main>

     

        </div>
       </>
    )
}