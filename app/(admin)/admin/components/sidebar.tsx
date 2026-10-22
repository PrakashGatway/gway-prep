"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  BellRing, BookOpen, BookUser, CalendarDays, FileEdit,
  GraduationCap, Home, Image as ImageIcon, LogOut,
  MessageCircle, ScrollText, Users, X,
} from "lucide-react";

const navGroups = [
  {
    title: "Overview",
    items: [
      { icon: Home, label: "Dashboard", href: "/admin/pages/dashboard" },
      { icon: Users, label: "Students", href: "/admin/pages/student" },
      { icon: GraduationCap, label: "Leads", href: "/admin/pages/leads" },
      { icon: BellRing, label: "Subscribers", href: "/admin/pages/subscribe" },
    ],
  },
  {
    title: "Content",
    items: [
      { icon: FileEdit, label: "Page editor", href: "/admin/pages/editor" },
      { icon: BookOpen, label: "Blogs", href: "/admin/pages/Blogs" },
      { icon: CalendarDays, label: "Study events", href: "/admin/pages/events" },
      { icon: ImageIcon, label: "Page banners", href: "/admin/pages/banners" },
      { icon: BookUser, label: "Authors", href: "/admin/pages/Authors" },
      { icon: ScrollText, label: "Support articles", href: "/admin/pages/support-articles" },
      { icon: MessageCircle, label: "Comments", href: "/admin/pages/comment" },
    ],
  },
  {
    title: "Learning",
    items: [
      { icon: GraduationCap, label: "All courses", href: "/admin/pages/courses" },
      { icon: BookOpen, label: "Test series", href: "/admin/pages/test-series" },
    ],
  },
];

export default function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!open) return;
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onEscape);
    return () => document.removeEventListener("keydown", onEscape);
  }, [open, onClose]);

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth/logout", { method: "POST" });
      router.replace("/admin");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <>
      {open && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-slate-950/50 backdrop-blur-[2px] lg:hidden"
          aria-label="Close navigation"
          onClick={onClose}
        />
      )}
      <aside
        id="admin-navigation"
        aria-label="Admin navigation"
        className={`fixed inset-y-0 left-0 z-50 flex w-64 max-w-[85vw] flex-col border-r border-slate-200 bg-white shadow-2xl transition-transform duration-200 lg:translate-x-0 lg:shadow-none ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex shrink-0 items-center justify-between gap-3 border-b border-slate-100 px-5 py-5">
          <Link href="/admin/pages/dashboard" onClick={onClose} className="flex min-w-0 items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-50 p-1.5">
              <img src="/image/logo.png" alt="Ooshas Prep" className="max-h-full max-w-full object-contain" />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-bold text-slate-900">Ooshas Prep</span>
              <span className="block text-xs text-slate-500">Admin workspace</span>
            </span>
          </Link>
          <button type="button" onClick={onClose} aria-label="Close menu" className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden"><X size={20} /></button>
        </div>

        <nav className="min-h-0 flex-1 space-y-5 overflow-y-auto overscroll-contain px-3 py-5" aria-label="Main menu">
          {navGroups.map((group) => (
            <div key={group.title}>
              <p className="px-3 pb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">{group.title}</p>
              <div className="space-y-1">
                {group.items.map(({ icon: Icon, label, href }) => {
                  const active = pathname === href || pathname.startsWith(`${href}/`);
                  return (
                    <Link
                      key={href}
                      href={href}
                      onClick={onClose}
                      aria-current={active ? "page" : undefined}
                      className={`flex min-h-10 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-500 ${active ? "bg-orange-50 text-[#e85d32]" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"}`}
                    >
                      <Icon size={18} className="shrink-0" />
                      <span>{label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="shrink-0 border-t border-slate-100 p-3">
          <button onClick={handleLogout} className="flex min-h-10 w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-rose-600 transition hover:bg-rose-50">
            <LogOut size={18} /> Sign out
          </button>
        </div>
      </aside>
    </>
  );
}
