import React from "react";
import { Metadata } from "next";
import ServicesPage from "@/app/components/servicesPage";
import { getPageInfo } from "@/app/services/api";

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await getPageInfo("services");
  const seo = pageData?.seoMeta;

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://ooshasprep.com";

  const canonical = seo?.canonicalUrl
    ? `${siteUrl}/${seo.canonicalUrl.replace(/^\/+/, "")}`
    : `${siteUrl}/services`;

  return {
    title: seo?.title ?? "",
    description: seo?.description ?? "",
    keywords: seo?.keywords
      ? seo.keywords.split(",").map((k: string) => k.trim())
      : [],

    alternates: {
      canonical,
    },

    openGraph: {
      title: seo?.ogTitle || seo?.title || "",
      description: seo?.ogDescription || seo?.description || "",
      url: canonical,
      type: "website",
      images: seo?.ogImage
        ? [
            {
              url: seo.ogImage,
              alt: seo?.ogTitle || seo?.title || "",
            },
          ]
        : [],
    },

    robots: {
      index: seo?.isPublished ?? true,
      follow: seo?.isPublished ?? true,
    },
  };
}

const Page = async () => {
  const pageData = await getPageInfo("services");
  const sections = pageData?.sections ?? {};

  return <ServicesPage sections={sections} />;
};

export default Page;