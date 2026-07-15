// app/(main)/preparation/[slug]/page.tsx
import Gre from "@/app/components/test-preparation/Gre";
import { getPageInfo } from "@/app/services/api";
import Link from "next/link";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}


const SITE_URL = "https://www.ooshasprep.com"; 

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  if (!slug) {
    return {
      title: "No Data Found",
      description: "Preparation material not found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const data = await getPageInfo(slug);
  const seo = data?.seoMeta || {};

  const canonical =
    seo?.canonicalUrl?.replace(/^\/+|\/+$/g, "") || `preparation/${slug}`;

  const title = seo?.title?.trim() || `${slug.toUpperCase()} Preparation`;

  const description =
    seo?.description ||
    `Prepare for ${slug.toUpperCase()} with Ooshas Prep.`;

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

// export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
//   const { slug } = await params;
  
//   if (!slug) {
//     return {
//       title: "No Data Found",
//       description: "Preparation material not found",
//     };
//   }

//   const data = await getPageInfo(slug);
//   const seo = data?.seoMeta;

//   return {
//     title: seo?.title?.trim() || "GRE Preparation",
//     description: seo?.description,
//     keywords: seo?.keywords,
//     alternates: {
//       canonical: seo?.canonicalUrl ? `/${seo.canonicalUrl}` : undefined,
//     },
//     openGraph: {
//       title: seo?.title || "GRE Preparation",
//       description: seo?.description,
//       url: seo?.canonicalUrl 
//         ? `https://ooshasprap.com/${seo.canonicalUrl}` 
//         : "https://ooshasprap.com/gre",
//       type: "website",
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
//           url: seo?.ogImage || "/image/logo.png",
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
//       images: [seo?.ogImage || "/image/logo.png"],
//     },
    
//   };
// }

export default async function PreparationPage({ params }: PageProps) {
  const { slug } = await params;

  if (!slug) {
    return <NoDataFoundUI />;
  }

  const pageData = await getPageInfo(slug);

  const hasValidData =
    pageData &&
    (!Array.isArray(pageData) || pageData.length > 0) &&
    Object.keys(pageData).length > 0;

  if (hasValidData) {
    return <Gre pageInfo={pageData} slug={slug}/>;
  }

  return <NoDataFoundUI />;
}

// ── MODERN NO DATA FOUND UI COMPONENT ──────────────────────────────────────
function NoDataFoundUI() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      {/* Visual Anchor Icon */}
      <div className="mb-4 rounded-full bg-gray-50 p-4 dark:bg-zinc-900">
        <svg
          className="h-12 w-12 text-gray-400 dark:text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>

      {/* Heading */}
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
        No Data Found
      </h3>

      {/* Description */}
      <p className="mt-2 max-w-sm text-sm text-gray-500 dark:text-gray-400">
        We could not find any preparation materials for this course. Please
        verify the link or try searching again.
      </p>

      {/* Action Button */}
      <div className="mt-6">
        <Link
          href="/"
          className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
        >
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
}




// // app\(main)\preparation\[slug]\page.tsx
// import Gre from "@/app/components/test-preparation/Gre";
// import { getPageInfo } from "@/app/services/api";
// import Link from "next/link"; // For the navigation button

// interface PageProps {
//   params: Promise<{ slug: string }>;
// }




// export default async function PreparationPage({ params }: PageProps) {
//   const { slug } = await params;

//   if (!slug) {
//     return <NoDataFoundUI />;
//   }

//   const pageData = await getPageInfo(slug);

//   const hasValidData =
//     pageData &&
//     (!Array.isArray(pageData) || pageData.length > 0) &&
//     Object.keys(pageData).length > 0;

//   if (hasValidData) {
//     return <Gre pageInfo={pageData} />;
//   }

//   return <NoDataFoundUI />;
// }

// // ── MODERN NO DATA FOUND UI COMPONENT ──────────────────────────────────────
// function NoDataFoundUI() {
//   return (
//     <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
//       {/* Visual Anchor Icon */}
//       <div className="mb-4 rounded-full bg-gray-50 p-4 dark:bg-zinc-900">
//         <svg
//           className="h-12 w-12 text-gray-400 dark:text-gray-500"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//           aria-hidden="true"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//           />
//         </svg>
//       </div>

//       {/* Heading */}
//       <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
//         No Data Found
//       </h3>

//       {/* Description */}
//       <p className="mt-2 max-w-sm text-sm text-gray-500 dark:text-gray-400">
//         We could not find any preparation materials for this course. Please
//         verify the link or try searching again.
//       </p>

//       {/* Action Button */}
//       <div className="mt-6">
//         <Link
//           href="/"
//           className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
//         >
//           Return to Dashboard
//         </Link>
//       </div>
//     </div>
//   );
// }



