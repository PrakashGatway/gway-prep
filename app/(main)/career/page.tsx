import Career from "@/components/Career";
import { getPageInfo } from "@/app/services/api";

import { Metadata } from "next";

const SITE_URL = "https://www.ooshasprep.com"; 

export async function generateMetadata(): Promise<Metadata> {
  const data = await getPageInfo("career");
  const seo = data?.seoMeta || {};

  const canonical =
    seo?.canonicalUrl?.replace(/^\/+|\/+$/g, "") || "Career";

  const title = seo?.title?.trim() || "Career";
  const description =
    seo?.description ||
    "Stay updated with the latest news and insights from Ooshas Prep.";

  return {
    metadataBase: new URL(SITE_URL),

    title,
    description,
    keywords: seo?.keywords,

    alternates: {
      canonical: `/${canonical}`,
    },

    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },

    openGraph: {
      title: seo?.ogTitle || title,
      description: seo?.ogDescription || description,
      url: `${SITE_URL}/${canonical}`,
      siteName: "Ooshas Prep",
      type: "website",
      locale: "en_US",
      images: [
        {
          url: seo?.ogImage || "/image/logo.png",
          width: 1200,
          height: 630,
          alt: seo?.ogTitle || title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: seo?.ogTitle || title,
      description: seo?.ogDescription || description,
      images: [seo?.ogImage || "/image/logo.png"],
    },
  };
}


export default async function CareerPage() {
  const data = await getPageInfo("career");
  const sections = data?.sections || {};
    return (

      <>
         {sections["Career-FAQ"]?.fields?.items && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": sections['Career-FAQ'].fields.items.map(item => ({
                  "@type": "Question",
                  "name": item.question,
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": item.answer
                  }
                }))
              }),
            }}
          />
        )}
        
        <Career sections={sections}/>
      </>

    )
}