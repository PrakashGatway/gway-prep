// app/(main)/terms-and-conditions/page.tsx
import { getPageInfo } from "@/app/services/api";
import { LegalPageLayout } from "@/components/legal-page-layout";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getPageInfo("terms-and-conditions");
  const seo = data?.seoMeta;

  return {
    title: seo?.title?.trim() || "Terms & Conditions",
    description: seo?.description,
    keywords: seo?.keywords,
    alternates: {
      canonical: seo?.canonicalUrl ? `/${seo.canonicalUrl}` : undefined,
    },
    openGraph: {
      title: seo?.ogTitle || seo?.title || "Terms & Conditions",
      description: seo?.ogDescription || seo?.description,
      url: seo?.canonicalUrl
        ? `https://ooshasprep.com/${seo.canonicalUrl}`
        : "https://ooshasprep.com/terms-and-conditions",
      type: "website",
      images: seo?.ogImage ? [{ url: seo.ogImage }] : undefined,
    },
  };
}

export default async function TermsAndConditionsPage() {
  const pageData = await getPageInfo("terms-and-conditions");

  const heroSection = pageData.sections?.["hero-section"]?.fields;
  const settingDetails = pageData.sections?.["Setting-Details"]?.fields;

  return (
    <LegalPageLayout
      title={heroSection?.title || "Terms and Conditions"}
      subtitle={heroSection?.subtitle}
      content={settingDetails?.allContent}
    />
  );
}
