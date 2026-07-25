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
            <p className="text-lg  dark:text-white">{heroSection.subtitle}</p>
          </div>
        </div>
      )}

      {/* Content Section */}
      {settingDetails?.allContent && (
        <div className="max-w-4xl mx-auto px-4 py-12">
          {/* <div 
            className="prose prose-lg dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: settingDetails.allContent }}
          /> */}
          <div
            className="
              prose 
              prose-lg 
              dark:prose-invert 
              max-w-none

              [&_h1]:text-4xl
              [&_h1]:font-bold
              [&_h1]:text-[#1a1a1a]
              [&_h1]:mb-6

              [&_h2]:text-3xl
              [&_h2]:font-semibold
              [&_h2]:text-[#1a1a1a]
              [&_h2]:mt-8
              [&_h2]:mb-4

              [&_h3]:text-2xl
              [&_h3]:font-semibold
              [&_h3]:mt-6

              [&_p]:text-base
              [&_p]:leading-8
              [&_p]:text-gray-700
              [&_p]:mb-4

              [&_div]:my-4

              [&_ul]:list-disc
              [&_ul]:pl-6
              [&_ul]:space-y-2

              [&_ol]:list-decimal
              [&_ol]:pl-6
              [&_ol]:space-y-2

              [&_li]:text-gray-700
              [&_li]:leading-7

              [&_a]:text-[#f26e46]
              [&_a]:font-semibold
              [&_a]:underline
              [&_a:hover]:text-[#d9532f]

              [&_strong]:font-bold
              [&_strong]:text-black

              [&_img]:rounded-xl
              [&_img]:my-6
            "
            dangerouslySetInnerHTML={{
              __html: settingDetails?.allContent || "",
            }}
          />
        </div>
      )}
    </div>
  );
}
