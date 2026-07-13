import About from "@/app/components/About";
import { getPageInfo } from "@/app/services/api";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await getPageInfo("about");

  const seo = pageData?.seoMeta || {};

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ooshasprep.com";

  const canonical =
    seo.canonicalUrl && seo.canonicalUrl !== ""
      ? `${siteUrl}/${seo.canonicalUrl.replace(/^\/+/, "")}`
      : `${siteUrl}/about`;

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords
      ? seo.keywords.split(",").map((item: string) => item.trim())
      : [],

    alternates: {
      canonical,
    },

    openGraph: {
      title: seo.ogTitle || seo.title,
      description: seo.ogDescription || seo.description,
      url: canonical,
      type: "website",
      images: seo.ogImage
        ? [
            {
              url: seo.ogImage,
              width: 1200,
              height: 630,
              alt: seo.ogTitle || seo.title,
            },
          ]
        : [],
    },

    twitter: {
      card: "summary_large_image",
      title: seo.ogTitle || seo.title,
      description: seo.ogDescription || seo.description,
      images: seo.ogImage ? [seo.ogImage] : [],
    },

    robots: {
      index: seo.isPublished ?? true,
      follow: seo.isPublished ?? true,
    },
  };
}

export default async function AboutPage() {
  const pageData = await getPageInfo("about");

  const sections = pageData?.sections || {};
  const extraDetails = pageData?.extraDetails || {};

  return (
    <About
      sections={sections}
      extraDetails={extraDetails}
    />
  );
}