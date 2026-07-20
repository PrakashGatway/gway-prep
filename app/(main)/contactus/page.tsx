import ContactUs from "@/app/components/contactUs";
import { getPageInfo } from "@/app/services/api";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://ooshasprep.com";

export async function generateMetadata() {
  const data = await getPageInfo("contactus");
  const seo = data?.seoMeta || {};

  const canonical = seo?.canonicalUrl
    ? `${SITE_URL}/${seo.canonicalUrl.replace(/^\/+/, "")}`
    : `${SITE_URL}/contactus`;

  return {
    title: seo?.title?.trim() || "Contact Us",
    description: seo?.description || "Get in touch with us.",
    keywords: seo?.keywords,
    alternates: {
      canonical,
    },
    openGraph: {
      title: seo?.title || "Contact Us",
      description: seo?.description || "Get in touch with us.",
      url: canonical,
      type: "website",
    },
  };
}

export default async function ContactPage() {
  const pageData = await getPageInfo("contactus");

  return (
    <main className="min-h-screen bg-white">
      <ContactUs Data={pageData?.sections || {}} />
    </main>
  );
}