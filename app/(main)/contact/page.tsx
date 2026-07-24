import ContactUs from "@/components/contactUs";
import { getPageInfo } from "@/app/services/api";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://ooshasprep.com";

export async function generateMetadata() {
  const data = await getPageInfo("contactus");
  const seo = data?.seoMeta || {};

  const canonical = seo?.canonicalUrl
    ? `${SITE_URL}/${seo.canonicalUrl.replace(/^\/+/, "")}`
    : `${SITE_URL}/contact`;

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

  // Breadcrumb Schema
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
        name: "Contact US",
        item: `${SITE_URL}/contact`,
      },
    ],
  };

export default async function ContactPage() {
  const pageData = await getPageInfo("contactus");

  return (
    <main>
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      <ContactUs Data={pageData?.sections || {}} />
    </main>
  );
}