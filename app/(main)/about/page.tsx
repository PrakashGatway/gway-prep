import About from "@/components/About";
import { getPageInfo } from "@/app/services/api";
import { Metadata } from "next";

const SITE_URL = "https://ooshasprep.com";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getPageInfo("about");
  const seo = data?.seoMeta || {};

  const canonical =
    seo?.canonicalUrl?.replace(/^\/+|\/+$/g, "") || "about";

  const title = seo?.title?.trim() || "About Us";
  const description =
    seo?.description ||
    "Learn more about Ooshas Prep and our mission to help students achieve their study abroad goals.";

  return {
    metadataBase: new URL(SITE_URL),

    title,
    description,
    keywords: seo?.keywords,

    alternates: {
      canonical: `/${canonical}`,
    },

    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },

    openGraph: {
      title: seo?.ogTitle || title,
      description: seo?.ogDescription || description,
      url: `${SITE_URL}/${canonical}`,
      siteName: "Ooshas Prep",
      type: "website",
      locale: "en_US",
      images: [
        {
          url: seo?.ogImage || "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: seo?.ogTitle || title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: seo?.ogTitle || title,
      description: seo?.ogDescription || description,
      images: [seo?.ogImage || "/og-image.jpg"],
    },
  };
}

export default async function AboutPage() {
  const pageData = await getPageInfo("about");

  const sections = pageData?.sections || {};
  const extraDetails = pageData?.extraDetails || {};

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
        name: "About",
        item: `${SITE_URL}/about`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      <About
        sections={sections}
        extraDetails={extraDetails}
      />
    </>
  );
}








// import About from "@/app/components/About";
// import { getPageInfo } from "@/app/services/api";
// import { Metadata } from "next";

// const SITE_URL = "https://ooshasprep.com"; 

// export async function generateMetadata(): Promise<Metadata> {
//   const data = await getPageInfo("about");
//   const seo = data?.seoMeta || {};

//   const canonical =
//     seo?.canonicalUrl?.replace(/^\/+|\/+$/g, "") || "about";

//   const title = seo?.title?.trim() || "About Us";
//   const description =
//     seo?.description ||
//     "Learn more about Ooshas Prep and our mission to help students achieve their study abroad goals.";

//   return {
//     metadataBase: new URL(SITE_URL),

//     title,
//     description,
//     keywords: seo?.keywords,

//     alternates: {
//       canonical: `/${canonical}`,
//     },

//     robots: {
//       index: true,
//       follow: true,
//       nocache: false,
//       googleBot: {
//         index: true,
//         follow: true,
//         "max-image-preview": "large",
//         "max-snippet": -1,
//         "max-video-preview": -1,
//       },
//     },

//     openGraph: {
//       title: seo?.ogTitle || title,
//       description: seo?.ogDescription || description,
//       url: `${SITE_URL}/${canonical}`,
//       siteName: "Ooshas Prep",
//       type: "website",
//       locale: "en_US",
//       images: [
//         {
//           url: seo?.ogImage || "/og-image.jpg",
//           width: 1200,
//           height: 630,
//           alt: seo?.ogTitle || title,
//         },
//       ],
//     },

//     twitter: {
//       card: "summary_large_image",
//       title: seo?.ogTitle || title,
//       description: seo?.ogDescription || description,
//       images: [seo?.ogImage || "/og-image.jpg"],
//     },
//   };
// }

// export default async function AboutPage() {
//   const pageData = await getPageInfo("about");

//   const sections = pageData?.sections || {};
//   const extraDetails = pageData?.extraDetails || {};

//   return (
//     <About
//       sections={sections}
//       extraDetails={extraDetails}
//     />
//   );
// }