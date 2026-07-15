import React from "react";
import { Metadata } from "next";
import ServicesPage from "@/app/components/servicesPage";
import { getPageInfo } from "@/app/services/api";


const SITE_URL = "https://ooshasprep.com"; 

export async function generateMetadata(): Promise<Metadata> {
  const data = await getPageInfo("services");
  const seo = data?.seoMeta || {};

  const canonical =
    seo?.canonicalUrl?.replace(/^\/+|\/+$/g, "") || "services";

  const title = seo?.title?.trim() || "Services";
  const description =
    seo?.description ||
    "Explore our range of educational services designed to help you succeed.";

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
          url: seo?.ogImage || "/image/logo.png",
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
      images: [seo?.ogImage || "/image/logo.png"],
    },
  };
}

// export async function generateMetadata(): Promise<Metadata> {
//   const pageData = await getPageInfo("services");
//   const seo = pageData?.seoMeta;

//   const siteUrl =
//     process.env.NEXT_PUBLIC_SITE_URL || "https://ooshasprep.com";

//   const canonical = seo?.canonicalUrl
//     ? `${siteUrl}/${seo.canonicalUrl.replace(/^\/+/, "")}`
//     : `${siteUrl}/services`;

//   return {
//     title: seo?.title ?? "",
//     description: seo?.description ?? "",
//     keywords: seo?.keywords
//       ? seo.keywords.split(",").map((k: string) => k.trim())
//       : [],

//     alternates: {
//       canonical,
//     },

//     openGraph: {
//       title: seo?.ogTitle || seo?.title || "",
//       description: seo?.ogDescription || seo?.description || "",
//       url: canonical,
//       type: "website",
//       images: seo?.ogImage
//         ? [
//             {
//               url: seo.ogImage,
//               alt: seo?.ogTitle || seo?.title || "",
//             },
//           ]
//         : [],
//     },

//     robots: {
//       index: seo?.isPublished ?? true,
//       follow: seo?.isPublished ?? true,
//     },
//   };
// }

const Page = async () => {
  const pageData = await getPageInfo("services");
  const sections = pageData?.sections ?? {};

  return <ServicesPage sections={sections} />;
};

export default Page;