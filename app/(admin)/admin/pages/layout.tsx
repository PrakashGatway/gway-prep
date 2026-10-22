import type React from "react";
import { redirect } from "next/navigation";
import { Toaster } from "react-hot-toast";
import { getSession } from "@/app/lib/auth";
import AdminShell from "../components/admin-shell";

export default async function AdminPagesLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session) redirect("/admin");

  return (
    <AdminShell>
      {children}
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
    </AdminShell>
  );
}
