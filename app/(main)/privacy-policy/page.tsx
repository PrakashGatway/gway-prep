// app/(main)/privacy-policy/page.tsx
import { getPageInfo } from "@/app/services/api";
import { LegalPageLayout } from "@/components/legal-page-layout";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getPageInfo("privacy-policy");
  const seo = data?.seoMeta;

  return {
    title: seo?.title?.trim() || "privacyPolicy",
    description: seo?.description,
    keywords: seo?.keywords,
    alternates: {
      canonical: seo?.canonicalUrl ? `/${seo.canonicalUrl}` : undefined,
    },
    openGraph: {
      title: seo?.ogTitle || seo?.title || "privacyPolicy",
      description: seo?.ogDescription || seo?.description,
      url: seo?.canonicalUrl 
        ? `https://ooshasprep.com/${seo.canonicalUrl}` 
        : "https://ooshasprep.com/privacy-policy",
      type: "website",
      images: seo?.ogImage ? [{ url: seo.ogImage }] : undefined,
    },
  };
}

export default async function PrivacyPolicyPage() {
  const pageData = await getPageInfo("privacy-policy");

  const heroSection = pageData.sections?.["hero-section"]?.fields;
  const settingDetails = pageData.sections?.["Setting-Details"]?.fields;

  return (
    <LegalPageLayout
      title={heroSection?.title || "Privacy Policy"}
      subtitle={heroSection?.subtitle}
      content={settingDetails?.allContent}
    >
      {/* <section className="mt-12 border-t border-slate-200 pt-8 dark:border-zinc-800">
        <h2 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-zinc-100">
          Website and portal activity
        </h2>
        <p className="mt-3 text-[0.98rem] leading-7 text-slate-600 sm:leading-8 dark:text-zinc-300">
          We record page visits, time spent on pages, button and link clicks,
          form starts and submissions, referral and UTM information, device
          type, and an approximate location derived from the IP address. For
          signed-in website or portal visitors, activity may include their
          account name, email, role, and selected category. We do not record
          passwords or form field values in these activity events. Authorized
          administrators can view this activity. Event records expire after
          seven days; database removal may follow shortly afterward.
        </p>
      </section> */}
    </LegalPageLayout>
  );
}

