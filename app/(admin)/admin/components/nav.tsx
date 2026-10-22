"use client";

import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";

const pageNames: Record<string, string> = {
  dashboard: "Dashboard", student: "Students", editor: "Page editor",
  Blogs: "Blogs", events: "Study events", banners: "Page banners",
  Authors: "Authors", "support-articles": "Support articles",
  leads: "Leads", subscribe: "Subscribers", comment: "Comments",
  courses: "All courses", "test-series": "Test series",
};

export default function Nav({ onMenuClick }: { onMenuClick: () => void }) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const section = segments[2] || "dashboard";
  const title = section === "Blogs" && segments[3] === "add"
    ? "Write blog"
    : section === "Blogs" && segments[3] === "category"
      ? "Blog categories"
      : pageNames[section] || "Admin workspace";

  return (
    <header className="sticky top-0 z-30 flex min-h-16 items-center justify-between gap-3 border-b border-slate-200 bg-white/95 px-4 backdrop-blur sm:px-6 lg:px-8">
      <div className="flex min-w-0 items-center gap-3">
        <button type="button" onClick={onMenuClick} aria-label="Open menu" aria-controls="admin-navigation" className="rounded-xl border border-slate-200 p-2 text-slate-700 hover:bg-slate-50 lg:hidden">
          <Menu size={20} />
        </button>
        <div className="min-w-0">
          <p className="hidden text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400 sm:block">Workspace</p>
          <h1 className="truncate text-base font-semibold text-slate-900 sm:text-lg">{title}</h1>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-2 rounded-full border border-slate-200 bg-slate-50 py-1 pl-2 pr-3">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-orange-100 text-xs font-bold text-orange-700">A</span>
        <span className="text-xs font-semibold text-slate-700 sm:text-sm">Admin</span>
      </div>
    </header>
  );
}
