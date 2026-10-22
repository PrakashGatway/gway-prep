import Link from "next/link";
import { ArrowUpRight, BookOpen, FileEdit, GraduationCap, Users } from "lucide-react";

const shortcuts = [
  { label: "Students", description: "View and manage student records", href: "/admin/pages/student", icon: Users },
  { label: "Blogs", description: "Review and publish articles", href: "/admin/pages/Blogs", icon: BookOpen },
  { label: "Page editor", description: "Update website page content", href: "/admin/pages/editor", icon: FileEdit },
  { label: "Courses", description: "Manage course information", href: "/admin/pages/courses", icon: GraduationCap },
];

export default function AdminDashboard() {
  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8">
      <section className="relative overflow-hidden rounded-3xl bg-[#072c60] px-6 py-8 text-white shadow-sm sm:px-9 sm:py-10">
        <div className="pointer-events-none absolute -right-12 -top-20 h-64 w-64 rounded-full bg-orange-400/20 blur-3xl" />
        <div className="relative">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-orange-300">Admin workspace</p>
          <h2 className="max-w-xl text-2xl font-bold tracking-tight sm:text-3xl">Welcome back</h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-blue-100 sm:text-base">Everything you need to manage your content, students, and learning programs is one click away.</p>
        </div>
      </section>

      <section aria-labelledby="quick-access-title">
        <div className="mb-4">
          <h2 id="quick-access-title" className="text-lg font-bold text-slate-900">Quick access</h2>
          <p className="mt-1 text-sm text-slate-500">Jump to your most-used sections.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {shortcuts.map(({ label, description, href, icon: Icon }) => (
            <Link key={href} href={href} className="group flex min-h-40 flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-500">
              <div className="flex items-start justify-between gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-[#f26e46]"><Icon size={21} /></span>
                <ArrowUpRight size={18} className="text-slate-400 transition group-hover:text-[#f26e46]" />
              </div>
              <h3 className="mt-5 font-semibold text-slate-900">{label}</h3>
              <p className="mt-1 text-sm text-slate-500">{description}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
