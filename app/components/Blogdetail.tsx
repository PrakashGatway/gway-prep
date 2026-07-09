// app/blog/[id]/page.tsx
"use client"

import { useRouter } from "next/navigation";

export default function BlogDetailPage({ blog, loading }: any) {

  const router = useRouter();

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (!blog) {
    return <div className="flex justify-center items-center min-h-screen">Blog not found</div>;
  }

  const data = blog.data;

  return (
    <div className="bg-neutral-50 min-h-screen ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Breadcrumb */}
        <nav className="text-sm text-neutral-500 mb-6">
          <span className="hover:text-[#F86C43] cursor-pointer" onClick={() => router.push('/')} >Home</span>
          <span className="mx-2">/</span>
          <span className="hover:text-[#F86C43] cursor-pointer" onClick={() => router.push('/blog')}>Blog</span>
          <span className="mx-2">/</span>
          <span className="text-neutral-800 font-medium">{data.category}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Blog Content */}
          <div className="lg:col-span-8">
            {/* Hero Image */}
            <div className="relative w-full h-64 md:h-108 rounded-2xl overflow-hidden mb-8 shadow-sm">
              <img
                src={data.image}
                alt={data.title}
                className="w-full h-full object-cover"
              />
              {/* <div className="absolute top-4 left-4">
                <span className="bg-[#F86C43] text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide">
                  {data.category}
                </span>
              </div> */}
            </div>

            {/* Title & Meta */}
            <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4 leading-tight">
              {data.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-500 mb-8 pb-8 border-b border-neutral-200">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-neutral-200 flex items-center justify-center text-xs font-bold text-neutral-600">
                  {data.author?.charAt(0)?.toUpperCase() || "A"}
                </div>
                <span className="font-medium text-neutral-700">{data.author}</span>
              </div>
              <span>•</span>
              <span>{new Date(data.publishedDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
            </div>

            {/* Blog Content */}
            <article
              className="prose prose-lg max-w-none text-neutral-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: data.content }}
            />

            {/* Tags */}
            <div className="mt-10 pt-8 border-t border-neutral-200">
              <div className="flex flex-wrap gap-2">
                {data.tags?.map((tag: string, idx: number) => (
                  <span
                    key={idx}
                    className="bg-neutral-100 text-neutral-600 px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-34 space-y-6">
              {/* Lead Form */}
              <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-6">
                <h3 className="text-center text-lg md:text-xl font-semibold mb-6 text-neutral-900">
                  Speak to an Expert
                </h3>
                <form className="space-y-3 md:space-y-4">
                  <input
                    type="text"
                    placeholder="Name"
                    className="w-full border border-neutral-300 rounded-lg px-4 py-2.5 md:py-3 outline-none focus:border-[#F86C43] focus:ring-1 focus:ring-[#F86C43] text-sm transition-colors"
                  />
                  <div className="flex">
                    <div className="w-20 md:w-24 border border-neutral-300 rounded-l-lg flex items-center justify-center gap-1 md:gap-2 bg-neutral-50 text-sm text-neutral-700">
                      🇮🇳 +91
                    </div>
                    <input
                      type="tel"
                      placeholder="Mobile Number"
                      className="flex-1 border border-l-0 border-neutral-300 rounded-r-lg px-4 py-2.5 md:py-3 outline-none focus:border-[#F86C43] focus:ring-1 focus:ring-[#F86C43] text-sm transition-colors"
                    />
                  </div>
                  <input
                    type="email"
                    placeholder="Email Id"
                    className="w-full border border-neutral-300 rounded-lg px-4 py-2.5 md:py-3 outline-none focus:border-[#F86C43] focus:ring-1 focus:ring-[#F86C43] text-sm transition-colors"
                  />
                  <select className="w-full border border-neutral-300 rounded-lg px-4 py-2.5 md:py-3 outline-none focus:border-[#F86C43] focus:ring-1 focus:ring-[#F86C43] bg-white text-sm text-neutral-600 transition-colors appearance-none">
                    <option>Interested in?</option>
                    <option>GRE</option>
                    <option>IELTS</option>
                    <option>GMAT</option>
                    <option>TOEFL</option>
                  </select>
                  <input
                    type="text"
                    placeholder="City Name"
                    className="w-full border border-neutral-300 rounded-lg px-4 py-2.5 md:py-3 outline-none focus:border-[#F86C43] focus:ring-1 focus:ring-[#F86C43] text-sm transition-colors"
                  />
                  <label className="flex items-start gap-2 text-xs text-neutral-500 cursor-pointer">
                    <input type="checkbox" defaultChecked className="accent-[#F86C43] mt-0.5" />
                    <span>Stay informed via SMS & WhatsApp</span>
                  </label>
                  <button
                    type="submit"
                    className="w-full bg-[#F86C43] hover:bg-[#e55a2f] active:bg-[#d14d24] transition-all text-white font-semibold py-2.5 md:py-3 rounded-lg text-sm md:text-base shadow-sm hover:shadow-md"
                  >
                    Schedule a Call
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}