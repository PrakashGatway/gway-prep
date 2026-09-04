



"use client";


import {
  Home,
  Users,
  LogOut,
  FileEditIcon,
  File,
  BookUser
} from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

interface NavItem {
  icon: React.ReactNode;
  label: string;
  href: string;
}

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
  try {
    await fetch("/api/admin/auth/logout", {
      method: "POST",
    });

    router.replace("/admin");
    router.refresh();
  } catch (error) {
    console.error("Logout error:", error);
  }
};

  // ✅ Logout Function
  // const handleLogout = () => {
  //   document.cookie = "adminToken=; path=/; max-age=0";
  //   document.cookie = "role=; path=/; max-age=0";
  //   router.push("/admin");
  // };

  const navItems: NavItem[] = [
    { icon: <Home size={18} />, label: "Dashboard", href: "/admin/pages/dashboard" },
    { icon: <Users size={18} />, label: "Students", href: "/admin/pages/student" },
    { icon: <FileEditIcon size={18} />, label: "Editor", href: "/admin/pages/editor" },
    { icon: <File size={18} />, label: "Blog", href: "/admin/pages/Blogs" },
    { icon: <BookUser size={18} />, label: "Authors", href: "/admin/pages/Authors"},
    { icon: <File size={18} />, label: "Support Articles", href: "/admin/pages/support-articles" },
    { icon: <File size={18} />, label: "Leads ", href: "/admin/pages/leads" },
  ];

  // if (!isAuthChecked) return null;

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-gray-200 bg-white">
      <div className="h-auto flex items-center flex-col p-6 border-b border-gray-100">
        <img
          src="/image/logo.png"
          alt="logo"
          className="w-24 object-contain mb-2"
        />
        <span className="text-sm font-medium text-gray-700">
          Admin Panel
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-2 text-sm">
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <button
              key={item.label}
              onClick={() => router.push(item.href)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition
              ${
                isActive
                  ? "bg-orange-50 text-[#f26e46] font-medium"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-100">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 transition"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;