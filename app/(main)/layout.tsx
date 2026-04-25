import type React from "react";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../globals.css";
import { Navbar } from "@/app/components/navbar";
import { Noto_Sans } from "next/font/google";
import { Footer } from "@/app/components/footer";
import Script from "next/script";
import { Montserrat } from "next/font/google";
import { getPages } from "../services/api";




const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

// const notoSans = Noto_Sans({
//   subsets: ["latin"],
//   weight: ["400", "500", "600", "700"],
//   variable: "--font-noto-sans",
//   display: "swap",
// });


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const NavData = await getPages();

  return (
    <html lang="en">
      <head>
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];
              w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
              var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
              j.async=true;
              j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
              f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-WPTCBD4T');
            `,
          }}
        />
      </head>
      <body
        className={`${montserrat.className} bg-white text-gray-900 max-w-[1640px] mx-auto`}
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
        <Navbar Data={NavData} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
