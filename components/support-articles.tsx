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

            <section className="
                relative
                overflow-hidden
                bg-gradient-to-br
                from-orange-50
                via-[#fff8f2]
                to-white
            ">

                {/* Decorative circles */}
                <div className="
                    absolute
                    -left-24
                    top-10
                    h-64 w-64
                    rounded-full
                    bg-orange-200/20
                    blur-3xl
                " />

                <div className="
                    absolute
                    right-0
                    top-0
                    h-[380px]
                    w-[380px]
                    rounded-full
                    bg-orange-300/15
                    blur-3xl
                " />

                <div className="
                    relative
                    mx-auto
                    flex
                    min-h-[360px]
                    max-w-[1280px]
                    items-center
                    px-5
                    py-1
                    sm:px-8
                    lg:min-h-[300px]
                    lg:px-10
                ">

                    <div className="
                        grid w-full
                        grid-cols-1
                        items-center
                        gap-10
                        lg:grid-cols-[1fr_0.85fr]
                    ">

                        {/* Hero Content */}
                        <div>

                            <div className="
                                mb-5
                                inline-flex
                                items-center
                                gap-2
                                rounded-full
                                border
                                border-orange-200
                                bg-white/80
                                px-3.5
                                py-2
                                text-[11px]
                                font-semibold
                                text-orange-500
                            ">
                                <MessageCircle size={14} />
                                We're Here to Help
                            </div>

                            <h1 className="
                                max-w-[650px]
                                text-xl
                                font-extrabold
                                leading-[1.1]
                                tracking-tight
                                text-slate-900
                                sm:text-5xl
                                lg:text-3xl
                            ">
                                How can we{" "}
                                <span className="text-orange-500">
                                    help you?
                                </span>
                            </h1>

                            <p className="
                                
                                max-w-[560px]
                                text-sm
                                leading-6
                                text-slate-500
                                sm:text-[15px]
                            ">
                                Find quick answers, step-by-step guides,
                                and all the support you need in one place.
                            </p>

                            {/* Search */}
                            <div className="
                                mt-2
                                flex
                                max-w-[650px]
                                items-center
                                rounded-2xl
                                border
                                border-slate-100
                                bg-white
                                p-1.5
                                shadow-xl
                                shadow-orange-100/40
                            ">

                                <div className="
                                    flex
                                    min-w-0
                                    flex-1
                                    items-center
                                    gap-3
                                    px-4
                                ">
                                    <Search
                                        size={19}
                                        className="shrink-0 text-slate-400"
                                    />

                                    <input
                                        type="text"
                                        placeholder="Search for articles, topics or keywords..."
                                        className="
                                            h-11
                                            w-full
                                            min-w-0
                                            bg-transparent
                                            text-sm
                                            text-slate-700
                                            outline-none
                                            placeholder:text-slate-400
                                        "
                                    />
                                </div>

                                <button className="
                                    flex
                                    h-11
                                    shrink-0
                                    items-center
                                    gap-2
                                    rounded-xl
                                    bg-orange-500
                                    px-5
                                    text-xs
                                    font-bold
                                    text-white
                                    shadow-lg
                                    shadow-orange-500/20
                                    transition
                                    hover:bg-orange-600
                                ">
                                    Search
                                    <ArrowRight size={15} />
                                </button>

                            </div>

                            {/* Popular */}
                            <div className="
                                mt-5
                                flex
                                flex-wrap
                                items-center
                                gap-2
                            ">

                                <span className="
                                    mr-1
                                    text-[11px]
                                    font-bold
                                    text-slate-700
                                ">
                                    Popular:
                                </span>

                                {popularTopics.map((topic) => (
                                    <button
                                        key={topic}
                                        className="
                                            rounded-full
                                            border
                                            border-orange-100
                                            bg-white
                                            px-3
                                            py-1.5
                                            text-[10px]
                                            font-medium
                                            text-slate-600
                                            transition
                                            hover:border-orange-300
                                            hover:bg-orange-50
                                            hover:text-orange-500
                                        "
                                    >
                                        {topic}
                                    </button>
                                ))}

                            </div>

                        </div>

                        {/* Hero Illustration */}
                        <div className="
                            relative
                            hidden
                            w-120
                            h-[340px]
                            lg:block
                        ">

                          <img src="/image/support-article.png" alt="" />

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

                            {/* Article Header */}
                            <div className="
                                flex
                                flex-col
                                gap-5
                                sm:flex-row
                                sm:items-start
                                sm:justify-between
                            ">

                                <div className="flex items-start gap-4">

                                    <div className="
                                        flex
                                        h-12 w-12
                                        shrink-0
                                        items-center justify-center
                                        rounded-2xl
                                        bg-orange-50
                                        text-orange-500
                                        sm:h-14
                                        sm:w-14
                                    ">
                                        <UserRound size={25} />
                                    </div>

                                    <div>

                                        <span className="
                                            inline-flex
                                            rounded-full
                                            bg-orange-50
                                            px-2.5
                                            py-1
                                            text-[10px]
                                            font-bold
                                            text-orange-500
                                        ">
                                            {article?.category}
                                        </span>

                                        <h2 className="
                                            mt-2
                                            text-2xl
                                            font-extrabold
                                            tracking-tight
                                            text-slate-900
                                            sm:text-3xl
                                        ">
                                           {article?.title}
                                        </h2>

                                        <div className="
                                            mt-2
                                            flex
                                            flex-wrap
                                            items-center
                                            gap-2
                                            text-[10px]
                                            text-slate-400
                                        ">
                                            <span>
                                                Updated on {new Date(article?.updatedAt).toLocaleDateString("en-US",{
                                                    month : "short",
                                                    day : "numeric",
                                                    year : "numeric"
                                                })}
                                            </span>

                                            <span>•</span>

                                            <span className="flex items-center gap-1">
                                                <EyeIcon size={12} />
                                                {article?.views}
                                            </span>
                                        </div>

                                    </div>

                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-2">

                                    <button
                                        title="Print article"
                                        className="
                                            flex h-9 w-9
                                            items-center justify-center
                                            rounded-xl
                                            border
                                            border-slate-200
                                            text-slate-500
                                            transition
                                            hover:border-orange-200
                                            hover:bg-orange-50
                                            hover:text-orange-500
                                        "
                                    >
                                        <Printer size={16} />
                                    </button>

                                    <button
                                        title="Share article"
                                        className="
                                            flex h-9 w-9
                                            items-center justify-center
                                            rounded-xl
                                            border
                                            border-slate-200
                                            text-slate-500
                                            transition
                                            hover:border-orange-200
                                            hover:bg-orange-50
                                            hover:text-orange-500
                                        "
                                    >
                                        <Send size={15} />
                                    </button>

                                </div>

                            </div>

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
                                    text-xs
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
        font-size: 12px;
        line-height: 1.6;
        word-break: break-word;
    }

    /* =========================================================
       PARAGRAPHS
    ========================================================= */

    .article-content p {
        margin: 0 0 14px !important;
        color: #374151 !important;
        font-size: 12px !important;
        line-height: 1.65 !important;
    }

    /* =========================================================
       HEADINGS
    ========================================================= */

    .article-content h1 {
        margin: 26px 0 14px !important;
        color: #111827 !important;
        font-size: 25px !important;
        font-weight: 800 !important;
        line-height: 1.25 !important;
    }

    .article-content h2 {
        position: relative;
        margin: 28px 0 14px !important;
        padding-left: 28px !important;

        color: #111827 !important;
        font-size: 15px !important;
        font-weight: 700 !important;
        line-height: 1.4 !important;
    }

    /* Orange circle before H2 */
    .article-content h2::before {
        content: "!";
        position: absolute;
        left: 0;
        top: 1px;

        display: flex;
        align-items: center;
        justify-content: center;

        width: 17px;
        height: 17px;

        border: 1.5px solid #f97316;
        border-radius: 50%;

        color: #f97316;
        font-size: 10px;
        font-weight: 800;
        line-height: 1;
    }

    .article-content h3 {
        margin: 22px 0 10px !important;
        color: #111827 !important;
        font-size: 14px !important;
        font-weight: 700 !important;
        line-height: 1.4 !important;
    }

    .article-content h4 {
        margin: 18px 0 8px !important;
        color: #111827 !important;
        font-size: 13px !important;
        font-weight: 700 !important;
    }

    /* =========================================================
       ORDERED LIST
       Orange numbered circles
       ========================================================= */

    .article-content ol {
        counter-reset: article-counter;

        margin: 10px 0 18px !important;
        padding: 0 !important;

        list-style: none !important;
    }

    .article-content ol > li {
        position: relative;

        display: flex;
        align-items: flex-start;

        min-height: 21px;

        margin: 0 0 7px !important;
        padding: 0 0 0 28px !important;

        color: #374151 !important;
        font-size: 11px !important;
        line-height: 1.55 !important;

        list-style: none !important;
    }

    /* Number circle */
    .article-content ol > li::before {
        counter-increment: article-counter;
        content: counter(article-counter);

        position: absolute;
        left: 0;
        top: 0;

        display: flex;
        align-items: center;
        justify-content: center;

        width: 17px;
        height: 17px;

        border-radius: 50%;

        background: #f97316;
        color: white;

        font-size: 9px;
        font-weight: 700;
        line-height: 1;
    }

    /* =========================================================
       UNORDERED LIST
       Orange check/icon circles
       ========================================================= */

    .article-content ul {
        margin: 10px 0 18px !important;
        padding: 0 !important;

        list-style: none !important;
    }

    .article-content ul > li {
        position: relative;

        display: flex;
        align-items: flex-start;

        margin: 0 0 9px !important;
        padding: 0 0 0 30px !important;

        color: #374151 !important;
        font-size: 11px !important;
        line-height: 1.55 !important;

        list-style: none !important;
    }

    /* Orange outlined icon */
    .article-content ul > li::before {
        content: "✓";

        position: absolute;
        left: 0;
        top: 0;

        display: flex;
        align-items: center;
        justify-content: center;

        width: 18px;
        height: 18px;

        border: 1.5px solid #f97316;
        border-radius: 50%;

        color: #f97316;

        font-size: 9px;
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

        font-size: 16px;
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
        margin: 18px 0 !important;
        padding: 12px 15px !important;

        border-left: 3px solid #f97316 !important;
        border-radius: 0 10px 10px 0 !important;

        background: #fff7ed !important;

        color: #4b5563 !important;

        font-size: 11px !important;
        line-height: 1.65 !important;
    }

    /* =========================================================
       HORIZONTAL LINE
    ========================================================= */

    .article-content hr {
        margin: 22px 0 !important;

        border: 0 !important;
        border-top: 1px solid #eeeeee !important;
    }

    /* =========================================================
       TABLE
    ========================================================= */

    .article-content table {
        width: 100% !important;
        margin: 20px 0 !important;

        border-collapse: collapse !important;

        border: 1px solid #eeeeee !important;

        font-size: 11px !important;
    }

    .article-content th {
        padding: 9px 10px !important;

        border: 1px solid #eeeeee !important;

        background: #fff7ed !important;

        color: #111827 !important;

        font-size: 11px !important;
        font-weight: 700 !important;
        text-align: left !important;
    }

    .article-content td {
        padding: 9px 10px !important;

        border: 1px solid #eeeeee !important;

        color: #4b5563 !important;

        font-size: 11px !important;
    }

    /* =========================================================
       IMAGES
    ========================================================= */

    .article-content img {
        display: block !important;

        max-width: 100% !important;
        height: auto !important;

        margin: 20px auto !important;

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

        margin: 20px auto !important;

        border: 0 !important;
        border-radius: 12px !important;
    }

    /* =========================================================
       CODE
    ========================================================= */

    .article-content code {
        padding: 2px 5px !important;

        border-radius: 5px !important;

        background: #f3f4f6 !important;

        color: #ea580c !important;

        font-size: 11px !important;
    }

    .article-content pre {
        overflow-x: auto !important;

        margin: 18px 0 !important;
        padding: 14px !important;

        border-radius: 10px !important;

        background: #111827 !important;
        color: #f9fafb !important;
    }

    .article-content pre code {
        padding: 0 !important;
        background: transparent !important;
        color: inherit !important;
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
            font-size: 11px;
            line-height: 1.6;
        }

        .article-content p {
            font-size: 11px !important;
            line-height: 1.6 !important;
        }

        .article-content h1 {
            font-size: 22px !important;
        }

        .article-content h2 {
            margin-top: 22px !important;
            padding-left: 25px !important;

            font-size: 14px !important;
        }

        .article-content h2::before {
            width: 16px;
            height: 16px;

            font-size: 9px;
        }

        .article-content h3 {
            font-size: 13px !important;
        }

        .article-content ol > li {
            padding-left: 26px !important;
            font-size: 10.5px !important;
        }

        .article-content ul > li {
            padding-left: 27px !important;
            font-size: 10.5px !important;
        }

        .article-content ol > li::before {
            width: 16px;
            height: 16px;
        }

        .article-content ul > li::before {
            width: 17px;
            height: 17px;
        }

        .article-content table {
            display: block !important;
            overflow-x: auto !important;
            white-space: nowrap !important;
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
                                    text-xs
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
                            text-xs
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