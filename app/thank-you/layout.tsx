import React, { Suspense } from "react";
import "@/app/globals.css";
import { Montserrat } from "next/font/google";
import { GlobalProvider } from "@/hooks/AppStateContext";
import FloatingWhatsApp from "@/components/floating-whatsapp";
import WebsiteTracker from "@/components/analytics/WebsiteTracker";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body
        className={`${montserrat.className} font-sans font-medium antialiased bg-white text-gray-900 selection:bg-[#f36d45]/15 selection:text-[#f36d45]`}
        suppressHydrationWarning
      >
        <GlobalProvider>
          <WebsiteTracker />
          {children}
          <Suspense fallback={null}><FloatingWhatsApp /></Suspense>
        </GlobalProvider>
      </body>
    </html>
  );
}
