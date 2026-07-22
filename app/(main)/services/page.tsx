import React from "react";
import { Metadata } from "next";
import ServicesPage from "@/components/servicesPage";
import { getPageInfo } from "@/app/services/api";

const SITE_URL = "https://ooshasprep.com";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getPageInfo("services");
  const seo = data?.seoMeta || {};

  const canonical = seo?.canonicalUrl?.replace(/^\/+|\/+$/g, "") || "services";

  const title = seo?.title?.trim() || "Services";
  const description =
    seo?.description ||
    "Explore our range of educational services designed to help you succeed.";

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

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: SITE_URL,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Services",
      item: `${SITE_URL}/services`,
    },
  ],
};

const Page = async () => {
  const pageData = await getPageInfo("services");
  const sections = pageData?.sections ?? {};

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      
      <ServicesPage sections={sections} />
    </>
  );
};

export default Page;
