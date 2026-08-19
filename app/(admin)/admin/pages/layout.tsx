import type React from "react";
import "@/app/globals.css";
import { Noto_Sans } from "next/font/google";
import Sidebar from "../components/sidebar";
import Nav from "../components/nav";
import { redirect } from "next/navigation";
import { getSession } from "@/app/lib/auth";

const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-sans",
  display: "swap",
});

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();

  console.log(session,"session");

  if (!session) {
    redirect("/admin");
  }


  return (
    <html lang="en">
      <body className={`${notoSans.className}`} suppressHydrationWarning>
        <div className="h-[100vh] overflow-hidden flex bg-gray-50">
          <Sidebar />

          <div className="flex-1 flex flex-col overflow-y-auto ml-64">
            {/* Content */}
            <Nav />
            <div className="overflow-auto">
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
