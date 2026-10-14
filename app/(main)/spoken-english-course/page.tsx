import type { Metadata } from "next";
import { getPageInfo } from "@/app/services/api";
import SpokenEnglishTemplate from "./spoken-english-template";

export const dynamic = "force-dynamic";

const PAGE_SLUG = "spoken-english-course";
const SITE_URL = "https://www.ooshasprep.com";

export async function generateMetadata(): Promise<Metadata> {
  const pageInfo = await getPageInfo(PAGE_SLUG);
  const seo = pageInfo?.seoMeta || {};
  const title = seo.title?.trim() || "English Speaking Course | Ooshas Prep";
  const description =
    seo.description?.trim() ||
    "Build fluency and confidence with practical English speaking classes from Ooshas Prep. Learn online or in the classroom with personalized guidance.";
  const canonical = seo.canonicalUrl?.trim() || PAGE_SLUG;

  return {
    title,
    description,
    keywords: seo.keywords,
    alternates: {
      canonical: canonical.startsWith("http")
        ? canonical
        : `${SITE_URL}/${canonical.replace(/^\/+|\/+$/g, "")}`,
    },
    openGraph: {
      title: seo.ogTitle || title,
      description: seo.ogDescription || description,
      url: canonical.startsWith("http")
        ? canonical
        : `${SITE_URL}/${canonical.replace(/^\/+|\/+$/g, "")}`,
      siteName: "Ooshas Prep",
      type: "website",
      images: [{ url: seo.ogImage || "/image/logo.png", alt: title }],
    },
  };
}

export default async function SpokenEnglishCoursePage() {
  const pageInfo = await getPageInfo(PAGE_SLUG);
  const savedPage = pageInfo && !Array.isArray(pageInfo) ? pageInfo : undefined;

  return <SpokenEnglishTemplate pageInfo={savedPage} />;
}
