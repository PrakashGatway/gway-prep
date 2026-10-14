import type { Metadata } from "next";
import { getPageInfo } from "@/app/services/api";
import SpokenEnglishTemplate from "../spoken-english-course/spoken-english-template";

export const dynamic = "force-dynamic";

const PAGE_SLUG = "spoken-english";
const FALLBACK_SLUG = "spoken-english-course";
const SITE_URL = "https://www.ooshasprep.com";

async function getSpokenEnglishPage() {
  const page = await getPageInfo(PAGE_SLUG);
  if (page && !Array.isArray(page) && Object.keys(page).length > 0) {
    return page;
  }

  const fallback = await getPageInfo(FALLBACK_SLUG);
  return fallback && !Array.isArray(fallback) ? fallback : undefined;
}

export async function generateMetadata(): Promise<Metadata> {
  const pageInfo = await getSpokenEnglishPage();
  const seo = pageInfo?.seoMeta || {};
  const title = seo.title?.trim() || "Spoken English Course | Ooshas Prep";
  const description =
    seo.description?.trim() ||
    "Build fluency and confidence with practical English speaking classes from Ooshas Prep.";
  const canonical = `${SITE_URL}/${PAGE_SLUG}`;

  return {
    title,
    description,
    keywords: seo.keywords,
    alternates: { canonical },
    openGraph: {
      title: seo.ogTitle || title,
      description: seo.ogDescription || description,
      url: canonical,
      siteName: "Ooshas Prep",
      type: "website",
      images: [{ url: seo.ogImage || "/image/logo.png", alt: title }],
    },
  };
}

export default async function SpokenEnglishPage() {
  const pageInfo = await getSpokenEnglishPage();
  return <SpokenEnglishTemplate pageInfo={pageInfo} />;
}
