import type React from "react";
import '@/app/globals.css'
import { Noto_Sans } from "next/font/google";






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
      <body className={`${notoSans.className}`} suppressHydrationWarning>{children}</body>
    </html>
  );
}
