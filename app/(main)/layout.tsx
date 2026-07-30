import type React from "react";
import type { Metadata } from "next";
import { Inter, Noto_Sans } from "next/font/google";
import Script from "next/script";
import "../globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { getPages } from "../services/api";
import { GlobalProvider } from "@/hooks/AppStateContext";

export const metadata: Metadata = {
  title:
    "Ooshas Prep | IELTS, GRE, GMAT, SAT, TOEFL & PTE Online Test Preparation",
  description:
    "Prepare for IELTS, GRE, GMAT, SAT, TOEFL, and PTE with Ooshas Prep. Access expert study materials, mock tests, practice questions, performance analytics, and a powerful exam portal to achieve your target scores and study abroad success.",
  icons: {
    icon: "/images/ooshasprep.png",
  },
};

export const revalidate = 600;

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});
const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-sans",
  display: "swap",
});

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const NavData = await getPages("30");

  return (
    <html lang="en" className={inter.variable}>
      <head>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-99BQY1744X"
          strategy="afterInteractive"
        />
        <Script id="gtag-config" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-99BQY1744X');
          `}
        </Script>

        <link
          rel="icon"
          href="/image/ooshasprep.png"
          className="w-20 font-['Open_Sans','Helvetica_Neue',Arial,sans-serif]"
        />
        <meta
          name="google-site-verification"
          content="2C7LwN4EhdIjyPz-O86evTun7OVY91YICLZQBpfjQnM"
        />
      </head>
      <body
        className={`${notoSans.className} bg-white text-gray-900 max-w-[1640px] mx-auto`}
        suppressHydrationWarning
      >
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WPTCBD4T"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        <GlobalProvider>
          <Navbar Data={NavData} />
          {children}
          <Footer Data={NavData} />
        </GlobalProvider>
      </body>
    </html>
  );
}


