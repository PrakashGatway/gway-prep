import type React from "react";
import "@/app/globals.css";
import { Noto_Sans } from "next/font/google";
import Sidebar from "../components/sidebar";
import Nav from "../components/nav";

const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-sans",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${notoSans.className}`} suppressHydrationWarning>
        <div className="min-h-screen flex bg-gray-50">
          <Sidebar />

          <div className="flex-1 flex flex-col">
            {/* Content */}
            <Nav />
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
