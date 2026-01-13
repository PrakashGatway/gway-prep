import type React from "react"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import "./globals.css"
import { Topbar } from "@/components/topbar"
import { Navbar } from "@/components/navbar"
import { Noto_Sans } from "next/font/google";
import { Footer } from "@/components/footer"

const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-sans",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${notoSans.className} bg-white text-gray-900`}
      suppressHydrationWarning>
        <Topbar />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
