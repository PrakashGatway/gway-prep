// app/author/[slug]/page.tsx

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Briefcase,
  GraduationCap,
  Award,
  Calendar,
  Linkedin,
  Globe,
} from "lucide-react";


interface AutherProps {
  slug : string;
  author: any;
  relatedBlogs: any[];
}

export default function Auther({
  slug,
  author,
  relatedBlogs,
}: AutherProps) {

  // console.log(slug,"data", author,relatedBlogs);


  return (
    <main className="min-h-screen bg-[#FDF8F5]">

    
      {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Link
            href="/"
            className="hover:text-[#F0642C] transition-colors"
          >
            Home
          </Link>

          <span>/</span>

          <Link
            href="/authors"
            className="hover:text-[#F0642C] transition-colors"
          >
            Authors
          </Link>

          <span>/</span>

          <span className="text-gray-800 font-medium">
            {author.name}
          </span>
        </div>
      </div> */}

      {/* ================= AUTHOR HERO ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        <div className="bg-white rounded-3xl border border-orange-100 shadow-sm overflow-hidden">

          {/* Orange Top Area */}
          <div className="h-32 bg-gradient-to-r from-[#F0642C] to-[#F86C43]" />

          <div className="px-6 sm:px-10 pb-10">

            {/* Author Image */}
            <div className="-mt-16 mb-6">
              {author.image && author.image !== "oijoij" ? (
                <Image
                  src={author.image}
                  alt={author.name}
                  width={140}
                  height={140}
                  className="w-32 h-32 sm:w-36 sm:h-36 rounded-full object-cover border-8 border-white shadow-md"
                />
              ) : (
                <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full border-8 border-white bg-gradient-to-br from-[#F0642C] to-[#F86C43] flex items-center justify-center text-white text-5xl font-bold shadow-md">
                  {author.name?.charAt(0)?.toUpperCase()}
                </div>
              )}
            </div>

            {/* Author Header */}
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">

              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
                  {author.name}
                </h1>

                {author.subtitle && (
                  <p className="mt-2 text-lg font-medium text-[#F0642C]">
                    {author.subtitle}
                  </p>
                )}

                {author.shortBio && (
                  <p className="mt-4 max-w-3xl text-gray-600 leading-relaxed">
                    {author.shortBio}
                  </p>
                )}
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-3">

                {author.linkedin &&
                  author.linkedin !== "oijoij" && (
                    <a
                      href={author.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-11 h-11 rounded-full bg-orange-50 flex items-center justify-center text-[#F0642C] hover:bg-[#F0642C] hover:text-white transition-all"
                    >
                      <Linkedin size={20} />
                    </a>
                  )}

                {author.website &&
                  author.website !== "oijoij" && (
                    <a
                      href={author.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-11 h-11 rounded-full bg-orange-50 flex items-center justify-center text-[#F0642C] hover:bg-[#F0642C] hover:text-white transition-all"
                    >
                      <Globe size={20} />
                    </a>
                  )}

              </div>
            </div>

            {/* ================= AUTHOR STATS ================= */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">

              {author.experience && (
                <div className="flex items-center gap-4 rounded-2xl bg-orange-50 p-5">
                  <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center text-[#F0642C]">
                    <Briefcase size={21} />
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">
                      Experience
                    </p>
                    <p className="font-semibold text-gray-900">
                      {author.experience}
                    </p>
                  </div>
                </div>
              )}

              {author.education && (
                <div className="flex items-center gap-4 rounded-2xl bg-orange-50 p-5">
                  <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center text-[#F0642C]">
                    <GraduationCap size={21} />
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">
                      Education
                    </p>
                    <p className="font-semibold text-gray-900">
                      {author.education}
                    </p>
                  </div>
                </div>
              )}

              {author.specializations &&
                author.specializations.length > 0 && (
                  <div className="flex items-center gap-4 rounded-2xl bg-orange-50 p-5">
                    <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center text-[#F0642C]">
                      <Award size={21} />
                    </div>

                    <div>
                      <p className="text-xs text-gray-500">
                        Specializations
                      </p>
                      <p className="font-semibold text-gray-900">
                        {author.specializations.length} Areas
                      </p>
                    </div>
                  </div>
                )}

            </div>
          </div>
        </div>
      </section>

      {/* ================= DETAILS ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Main Details */}
          <div className="lg:col-span-8">

            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-8">

              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
                About {author.name}
              </h2>

              {author.details ? (
                <div
                  className="author-content prose prose-lg max-w-none text-gray-600 leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: author.details,
                  }}
                />
              ) : (
                <p className="text-gray-500">
                  No additional information available.
                </p>
              )}

            </div>

            {/* ================= SPECIALIZATIONS ================= */}
            {author.specializations &&
              author.specializations.length > 0 && (
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-8 mt-6">

                  <h2 className="text-2xl font-bold text-gray-900 mb-5">
                    Areas of Specialization
                  </h2>

                  <div className="flex flex-wrap gap-3">
                    {author.specializations.map(
                      (specialization, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 rounded-full bg-[#F0642C]/10 text-[#F0642C] text-sm font-medium"
                        >
                          {specialization}
                        </span>
                      )
                    )}
                  </div>

                </div>
              )}

          </div>

          {/* ================= SIDEBAR ================= */}
          <aside className="lg:col-span-4">

            <div className="sticky top-24 space-y-6">

              {/* Quick Author Info */}
              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">

                <h3 className="text-xl font-bold text-gray-900 mb-5">
                  Author Information
                </h3>

                <div className="space-y-5">

                  {author.education && (
                    <div className="flex gap-3">
                      <GraduationCap
                        size={20}
                        className="text-[#F0642C] flex-shrink-0"
                      />

                      <div>
                        <p className="text-xs text-gray-400">
                          Education
                        </p>
                        <p className="text-sm font-medium text-gray-800">
                          {author.education}
                        </p>
                      </div>
                    </div>
                  )}

                  {author.experience && (
                    <div className="flex gap-3">
                      <Briefcase
                        size={20}
                        className="text-[#F0642C] flex-shrink-0"
                      />

                      <div>
                        <p className="text-xs text-gray-400">
                          Experience
                        </p>
                        <p className="text-sm font-medium text-gray-800">
                          {author.experience}
                        </p>
                      </div>
                    </div>
                  )}

                </div>
              </div>

              {/* Specializations */}
              {author.specializations &&
                author.specializations.length > 0 && (
                  <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">

                    <h3 className="text-xl font-bold text-gray-900 mb-5">
                      Expertise
                    </h3>

                    <div className="space-y-2">
                      {author.specializations.map(
                        (item, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 text-sm text-gray-600"
                          >
                            <span className="w-2 h-2 rounded-full bg-[#F0642C]" />
                            {item}
                          </div>
                        )
                      )}
                    </div>

                  </div>
                )}

            </div>
          </aside>

        </div>
      </section>

      {/* ================= RELATED BLOGS ================= */}
      {relatedBlogs.length > 0 && (
        <section className="bg-white border-t border-gray-100 py-14">

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="flex items-end justify-between gap-4 mb-8">

              <div>
                <p className="text-sm font-semibold text-[#F0642C] uppercase tracking-wider">
                  From the Author
                </p>

                <h2 className="text-3xl font-bold text-gray-900 mt-1">
                  Related Blogs
                </h2>

                <p className="text-gray-500 mt-2">
                  Explore more articles and insights.
                </p>
              </div>

              <Link
                href="/blog"
                className="hidden sm:block text-sm font-semibold text-[#F0642C] hover:underline"
              >
                View All Blogs →
              </Link>

            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

              {relatedBlogs.map((blog) => (
                <Link
                  key={blog._id}
                  href={`/blog/${blog.slug || blog._id}`}
                  className="group"
                >

                  <article className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300">

                    {/* Image */}
                    <div className="relative h-52 overflow-hidden bg-gray-100">

                      {blog.image ? (
                        <Image
                          src={blog.image}
                          alt={blog.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-orange-50">
                          <span className="text-[#F0642C] font-semibold">
                            Blog
                          </span>
                        </div>
                      )}

                      {blog.category && (
                        <span className="absolute top-3 left-3 bg-[#F0642C] text-white text-xs font-semibold px-3 py-1 rounded-full">
                          {blog.category}
                        </span>
                      )}

                    </div>

                    {/* Content */}
                    <div className="p-5">

                      <h3 className="text-lg font-bold text-gray-900 line-clamp-2 group-hover:text-[#F0642C] transition-colors">
                        {blog.title}
                      </h3>

                      {blog.excerpt && (
                        <p className="text-sm text-gray-500 mt-3 line-clamp-2">
                          {blog.excerpt}
                        </p>
                      )}

                      <div className="flex items-center gap-2 mt-4 text-xs text-gray-400">
                        <Calendar size={14} />

                        {blog.publishedDate
                          ? new Date(
                              blog.publishedDate
                            ).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })
                          : "Date not available"}
                      </div>

                    </div>

                  </article>

                </Link>
              ))}

            </div>

          </div>
        </section>
      )}

      {/* ================= PAGE STYLES ================= */}
      <style>{`
        .author-content h2 {
          font-size: 26px;
          font-weight: 700;
          color: #00306a;
          margin: 30px 0 14px;
        }

        .author-content h3 {
          font-size: 21px;
          font-weight: 600;
          color: #00306a;
          margin: 24px 0 10px;
        }

        .author-content p {
          margin: 12px 0;
          line-height: 1.8;
        }

        .author-content ul {
          margin: 16px 0;
          padding-left: 24px;
          list-style: disc;
        }

        .author-content ol {
          margin: 16px 0;
          padding-left: 24px;
          list-style: decimal;
        }

        .author-content li {
          margin: 7px 0;
        }

        .author-content a {
          color: #F0642C;
          text-decoration: underline;
        }

        .author-content strong {
          font-weight: 600;
          color: #222;
        }
      `}</style>

    </main>
  );
}