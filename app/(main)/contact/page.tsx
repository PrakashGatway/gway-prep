import ContactUs from "@/components/contactUs";
import { getPageInfo } from "@/app/services/api";
import Script from "next/script";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.ooshasprep.com";

const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const LOGO_ID = `${SITE_URL}/#logo`;

const SOCIAL_LINKS = [
  "https://www.instagram.com/ooshasprep",
  "https://www.facebook.com/share/18aH5VifRr/?mibextid=wwXIfr",
  "https://x.com/ooshasprep",
  "https://youtube.com/@ooshasprep",
];

export async function generateMetadata() {
  const data = await getPageInfo("contactus");
  const seo = data?.seoMeta || {};

  const canonical = seo?.canonicalUrl
    ? `${SITE_URL}/${seo.canonicalUrl.replace(/^\/+|\/+$/g, "")}`
    : `${SITE_URL}/contact`;

  const title = seo?.title?.trim() || "Contact Us | Ooshas Prep";

  const description =
    seo?.description?.trim() ||
    "Contact Ooshas Prep for information about IELTS, PTE, GRE, GMAT, SAT, TOEFL preparation, courses, test series and other services.";

  return {
    title,
    description,
    keywords: seo?.keywords,

    alternates: {
      canonical,
    },

    robots: {
      index: true,
      follow: true,
    },

    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "Ooshas Prep",
      type: "website",
      locale: "en_US",
      images: [
        {
          url: seo?.ogImage || `${SITE_URL}/image/logo.png`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [seo?.ogImage || `${SITE_URL}/image/logo.png`],
    },
  };
}

export default async function ContactPage() {
  const pageData = await getPageInfo("contactus");

  const seo = pageData?.seoMeta || {};

  const pageTitle = seo?.title?.trim() || "Contact Us | Ooshas Prep";

  const pageDescription =
    seo?.description?.trim() ||
    "Contact Ooshas Prep for information about test preparation, courses, test series and study materials.";

  const pageUrl = `${SITE_URL}/contact`;

  const organizationSchema = {
    "@type": "EducationalOrganization",
    "@id": ORGANIZATION_ID,

    name: "Ooshas Prep",

    url: SITE_URL,

    logo: {
      "@type": "ImageObject",
      "@id": LOGO_ID,
      url: `${SITE_URL}/image/logo.png`,
      contentUrl: `${SITE_URL}/image/logo.png`,
    },

    description:
      "Ooshas Prep is an online test preparation platform for IELTS, GRE, GMAT, SAT, TOEFL and PTE.",

    telephone: "+91-9166146538",

    email: "info@ooshasprep.com",

    sameAs: SOCIAL_LINKS,

    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+91-9166146538",
        email: "info@ooshasprep.com",
        contactType: "customer service",
        availableLanguage: ["English", "Hindi"],
      },
    ],
  };

  const websiteSchema = {
    "@type": "WebSite",
    "@id": WEBSITE_ID,

    url: SITE_URL,

    name: "Ooshas Prep",

    description:
      "Online test preparation and coaching platform for IELTS, GRE, GMAT, SAT, TOEFL and PTE.",

    publisher: {
      "@id": ORGANIZATION_ID,
    },

    inLanguage: "en-US",
  };


  const contactPageSchema = {
    "@type": "ContactPage",

    "@id": `${pageUrl}#contact-page`,

    url: pageUrl,

    name: pageTitle,

    description: pageDescription,

    isPartOf: {
      "@id": WEBSITE_ID,
    },

    about: {
      "@id": ORGANIZATION_ID,
    },

    primaryImageOfPage: {
      "@id": LOGO_ID,
    },

    inLanguage: "en-US",

    mainEntity: {
      "@id": `${pageUrl}#contact-point`,
    },
  };

  const contactPointSchema = {
    "@type": "ContactPoint",

    "@id": `${pageUrl}#contact-point`,

    contactType: "customer service",

    telephone: "+91-9166146538",

    email: "info@ooshasprep.com",

    availableLanguage: ["English", "Hindi"],

    areaServed: "IN",

    parentOrganization: {
      "@id": ORGANIZATION_ID,
    },
  };


  const breadcrumbSchema = {
    "@type": "BreadcrumbList",

    "@id": `${pageUrl}#breadcrumb`,

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

        name: "Contact Us",

        item: pageUrl,
      },
    ],
  };

  const webPageSchema = {
    "@type": "WebPage",

    "@id": `${pageUrl}#webpage`,

    url: pageUrl,

    name: pageTitle,

    description: pageDescription,

    isPartOf: {
      "@id": WEBSITE_ID,
    },

    about: {
      "@id": ORGANIZATION_ID,
    },

    primaryImageOfPage: {
      "@id": LOGO_ID,
    },

    breadcrumb: {
      "@id": `${pageUrl}#breadcrumb`,
    },

    mainEntity: {
      "@id": `${pageUrl}#contact-page`,
    },

    inLanguage: "en-US",
  };

  const pageSchema = {
    "@context": "https://schema.org",

    "@graph": [
      organizationSchema,
      websiteSchema,
      contactPageSchema,
      contactPointSchema,
      webPageSchema,
      breadcrumbSchema,
    ],
  };

  return (
    <>
      <Script
        id="contact-page-structured-data"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(pageSchema),
        }}
      />

      <main>
        <ContactUs Data={pageData?.sections || {}} />
      </main>
    </>
  );
}