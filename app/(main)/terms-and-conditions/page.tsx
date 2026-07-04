// app/(main)/terms-and-conditions/page.tsx
import { getPageInfo } from "@/app/services/api";
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
        ? `https://ooshasprap.com/${seo.canonicalUrl}` 
        : "https://ooshasprap.com/terms-and-conditions",
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
    <div className="min-h-screen bg-white dark:bg-zinc-900">
      {/* Hero Section */}
      {heroSection && (
        <div className="bg-[#f26e46bb] py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {heroSection.title}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {heroSection.subtitle}
            </p>
          </div>
        </div>
      )}

      {/* Content Section */}
      {settingDetails?.allContent && (
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div 
            className="prose prose-lg dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: settingDetails.allContent }}
          />
        </div>
      )}
    </div>
  );
}

