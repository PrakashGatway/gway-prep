"use client"

import React from "react";
import { ShieldIcon, Home, Users, Settings, LogOut, FileEditIcon } from "lucide-react";

interface NavItem {
  icon: React.ReactNode;
  label: string;
  href: string;
  active?: boolean;
}

const Sidebar = () => {

  const navItems: NavItem[] = [
    { icon: <Home size={18} />, label: "Dashboard", href: "/admin", active: true },
    { icon: <Users size={18} />, label: "Users", href: "/admin/pages/users" },
    { icon: <FileEditIcon size={18} />, label: "Editer", href: "/admin/pages/editor" },
    { icon: <Settings size={18} />, label: "Settings", href: "/admin/pages/settings" },
    { icon: <LogOut size={18} />, label: "Logout", href: "/admin/" },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="h-auto flex items-center flex-col p-6 border-b border-gray-100">
        
          {/* <ShieldIcon className="text-white w-5 h-5" /> */}
          <img src="/image/logo.png" alt="logo" />
          
        <span className="font-medium text-gray-800">Admin</span>
      </div>

      <nav className="flex-1 p-4 space-y-2 text-sm">
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
              item.active
                ? "bg-orange-50 text-orange-700 font-medium"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {item.icon}
            {item.label}
          </a>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
