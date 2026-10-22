"use client";

import type { ReactNode } from "react";
import { useCallback, useState } from "react";
import Sidebar from "./sidebar";
import Nav from "./nav";

export default function AdminShell({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <div className="flex h-dvh min-h-0 overflow-hidden bg-[#f6f8fb]">
      <Sidebar open={menuOpen} onClose={closeMenu} />
      <div className="flex min-w-0 flex-1 flex-col lg:pl-64">
        <Nav onMenuClick={() => setMenuOpen(true)} />
        <main className="min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
