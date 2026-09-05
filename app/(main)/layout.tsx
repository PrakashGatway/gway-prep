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

// export const revalidate = 600;

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
  const NavData = await getPages("300");

  

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
        
        <Script id="gtm-config" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-PQR897CK');`}
        </Script>

        <Script id="clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "ybgcoa85y5");`}
        </Script>

        <link
          rel="icon"
          href="/image/ooshasprep.png"
          className="w-20 "
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

        {/* Google Tag Manager (noscript) */}
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PQR897CK" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
          }}
        />
        
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




