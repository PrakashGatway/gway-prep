// import Gre from "@/components/test-preparation/Gre";
// import { getPageInfo, getPages } from "@/app/services/api";
// import Link from "next/link";
// import { Metadata } from "next";
// import { redirect } from "next/navigation";
// import ExamDetails from "@/components/examDetails";
// import ScoreCalculatorPage from "@/components/calculator/page";
// import axiosInstance from "@/app/lib/axios";
// import Script from "next/script";

// interface PageProps {
//   params: Promise<{ slug: string }>;
// }

// const SITE_URL = "https://www.ooshasprep.com";

// export async function generateMetadata({
//   params,
// }: PageProps): Promise<Metadata> {
//   const { slug } = await params;

//   const cleanText = decodeURIComponent(decodeURIComponent(slug));

//   const rowtext = cleanText.toLowerCase().replace(/\s+/g, "-");

//   if (rowtext === "favicon.ico") return {};
//   if (!rowtext) {
//     return {
//       title: "No Data Found",
//       description: "Preparation material not found",
//       robots: {
//         index: false,
//         follow: false,
//       },
//     };
//   }

//   const data = await getPageInfo(rowtext);
//   const seoMeta = data?.seoMeta;

//   if (!data || !seoMeta || Object.keys(seoMeta).length === 0) {
//     return {
//       title: "No Data Found",
//       description: "Preparation material not found",
//       robots: {
//         index: false,
//         follow: false,
//       },
//     };
//   }

//   const seo = data?.seoMeta || {};

//   const canonical = seo?.canonicalUrl?.replace(/^\/+|\/+$/g, "") || rowtext;

//   const title = seo?.title?.trim() || `${rowtext.toUpperCase()} Preparation`;

//   const description =
//     seo?.description ||
//     `Prepare for ${rowtext.toUpperCase()} with Ooshas Prep.`;

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

// export default async function PreparationPage({ params }: PageProps) {
//   const { slug } = await params;

//   const cleanText = decodeURIComponent(decodeURIComponent(slug));
//   const rowtext = cleanText.toLowerCase().replace(/\s+/g, "-");

//   if (!rowtext || rowtext.toLowerCase() === "home") {
//     redirect("/");
//   }

//   const pageData = await getPageInfo(rowtext);
//   const Data = await getPages(300);

//   const hasValidData =
//     pageData &&
//     (!Array.isArray(pageData) || pageData.length > 0) &&
//     Object.keys(pageData).length > 0;

//   if (!hasValidData) {
//     return <NoDataFoundUI />;
//   }

//   const breadcrumbSchema = {
//     "@context": "https://schema.org",

//     "@type": "BreadcrumbList",

//     itemListElement: [
//       {
//         "@type": "ListItem",
//         position: 1,
//         name: "Home",
//         item: SITE_URL,
//       },

//       {
//         "@type": "ListItem",
//         position: 2,
//         name: pageData?.seoMeta?.title || rowtext.toUpperCase(),
//         item: `${SITE_URL}/${rowtext}`,
//       },
//     ],
//   };

//   const courseSchema = {
//     "@context": "https://schema.org",

//     "@type": "Course",

//     name: pageData?.seoMeta?.title || rowtext.toUpperCase(),

//     description:
//       pageData?.seoMeta?.description ||
//       `Learn ${rowtext.toUpperCase()} preparation with Ooshas Prep.`,

//     provider: {
//       "@type": "Organization",

//       name: "Ooshas Prep",

//       sameAs: SITE_URL,
//     },
//   };

//   const faqItems = pageData?.sections?.["f&q"]?.fields?.items || [];

//   const faqSchema =
//     faqItems.length > 0
//       ? {
//           "@context": "https://schema.org",

//           "@type": "FAQPage",

//           mainEntity: faqItems
//             .filter((item: any) => item.question && item.answer)

//             .map((item: any) => ({
//               "@type": "Question",

//               name: item.question,

//               acceptedAnswer: {
//                 "@type": "Answer",

//                 text: item.answer,
//               },
//             })),
//         }
//       : null;

//   let Blogdata = [];

//   try {
//     const response = await axiosInstance.get(
//       "/admin/blogs?limit=8&isPublished=true",
//     );

//     Blogdata = response?.data;
//   } catch (error) {
//     console.error("Failed to fetch blogs:", error);
//   }

//   const reviewSchema: Record<string, { name: string; rating: string }> = {
//     gmat: { name: "GMAT", rating: "4.8" },
//     gre: { name: "GRE", rating: "4.9" },
//     sat: { name: "SAT", rating: "4.7" },
//     toefl: { name: "TOEFL", rating: "4.8" },
//     pte: { name: "PTE", rating: "4.9" },
//     ielts: { name: "IELTS", rating: "4.5" },
//   };

//   const examName = reviewSchema[rowtext];

//   return (
//     <>
//       <script
//         type="application/ld+json"
//         async={true}
//         strategy="afterInteractive"
//         dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
//       />

//       <Script
//         type="application/ld+json"
//         async={true}
//         strategy="afterInteractive"
//         dangerouslySetInnerHTML={{
//           __html: JSON.stringify({
//             ...courseSchema,

//             ...(examName && {
//               aggregateRating: {
//                 "@type": "AggregateRating",
//                 ratingValue: examName.rating,
//                 bestRating: "5",
//                 worstRating: "1",
//                 ratingCount: "10000",
//               },

//               review: [
//                 {
//                   "@type": "Review",
//                   author: {
//                     "@type": "Person",
//                     name: "Student",
//                   },
//                   reviewRating: {
//                     "@type": "Rating",
//                     ratingValue: examName.rating,
//                     bestRating: "5",
//                   },
//                   reviewBody: `Ooshas Prep helped me prepare effectively and improve my confidence for my ${examName.name} exam.`,
//                 },
//               ],
//             }),
//           }),
//         }}
//       />

//       {pageData?.template === "preparation" ? (
//         <Gre pageInfo={pageData} slug={rowtext} />
//       ) : pageData?.template === "calculator" ? (
//         <ScoreCalculatorPage pageInfo={pageData} slug={rowtext} />
//       ) : (
//         <ExamDetails
//           pagedata={pageData}
//           Data={Data}
//           slug={slug}
//           Blogdata={Blogdata.data}
//         />
//       )}
//     </>
//   );
// }

// function NoDataFoundUI() {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#FDF4EE] px-4">
//       <div className="text-center max-w-md">
//         <h1 className="text-8xl font-bold text-[#F36C45]">404</h1>

//         <h2 className="text-2xl font-semibold text-gray-800 mt-4">
//           Page Not Found
//         </h2>

//         <p className="text-gray-600 mt-2">
//           Sorry, the page you are looking for does not exist.
//         </p>

//         <Link
//           href="/"
//           className="inline-block mt-6 px-6 py-3 bg-[#F36C45] text-white rounded-lg"
//         >
//           ← Back to Home
//         </Link>

//         <p className="mt-8 text-sm text-gray-400">
//           © {new Date().getFullYear()} Ooshas Prep
//         </p>
//       </div>
//     </div>
//   );
// }

import Gre from "@/components/test-preparation/Gre";
import { getPageInfo, getPages } from "@/app/services/api";
import Link from "next/link";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import ExamDetails from "@/components/examDetails";
import ScoreCalculatorPage from "@/components/calculator/page";
import axiosInstance from "@/app/lib/axios";
import Script from "next/script";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const SITE_URL = "https://www.ooshasprep.com";

const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const LOGO_ID = `${SITE_URL}/#logo`;

const SOCIAL_LINKS = [
  "https://www.instagram.com/ooshasprep",
  "https://www.facebook.com/share/18aH5VifRr/?mibextid=wwXIfr",
  "https://x.com/ooshasprep",
  "https://youtube.com/@ooshasprep",
];

function normalizeSlug(value: string) {
  return decodeURIComponent(decodeURIComponent(value))
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/^\/+|\/+$/g, "");
}

function normalizeCanonicalUrl(
  canonicalUrl: string | undefined,
  fallbackSlug: string,
) {
  const value = canonicalUrl?.trim() || fallbackSlug;

  if (value.startsWith("http://") || value.startsWith("https://")) {
    return value.replace(/\/+$/, "");
  }
  return `${SITE_URL}/${value.replace(/^\/+|\/+$/g, "")}`;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const rowtext = normalizeSlug(slug);

  if (rowtext === "favicon.ico") {
    return {};
  }

  if (!rowtext) {
    return {
      title: "No Data Found",
      description: "Preparation material not found.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const data = await getPageInfo(rowtext);

  const seoMeta = data?.seoMeta;

  if (!data || !seoMeta || Object.keys(seoMeta).length === 0) {
    return {
      title: "No Data Found",
      description: "Preparation material not found.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const seo = data.seoMeta || {};

  const canonicalUrl = normalizeCanonicalUrl(seo?.canonicalUrl, rowtext);

  const title =
    seo?.title?.trim() || `${rowtext.toUpperCase()} Preparation | Ooshas Prep`;
  const description =
    seo?.description?.trim() ||
    `Prepare for ${rowtext.toUpperCase()} with Ooshas Prep through expert coaching, practice tests, study material and personalized preparation.`;
  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    keywords: seo?.keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      title: seo?.ogTitle?.trim() || title,
      description: seo?.ogDescription?.trim() || description,
      url: canonicalUrl,
      siteName: "Ooshas Prep",
      type: "website",
      locale: "en_US",
      images: [
        {
          url: seo?.ogImage || `${SITE_URL}/image/logo.png`,
          width: 1200,
          height: 630,
          alt: seo?.ogTitle?.trim() || title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seo?.ogTitle?.trim() || title,
      description: seo?.ogDescription?.trim() || description,
      images: [seo?.ogImage || `${SITE_URL}/image/logo.png`],
    },
  };
}

const reviewSchema: Record<
  string,
  {
    name: string;
    rating: string;
    reviewCount: string;
    reviews: {
      author: string;
      rating: string;
      text: string;
    }[];
  }
> = {
  gmat: {
    name: "GMAT",
    rating: "4.8",
    reviewCount: "3858",
    reviews: [
      {
        author: "Student",
        rating: "5",
        text: "Ooshas Prep helped me prepare effectively for my GMAT exam.",
      },
    ],
  },

  gre: {
    name: "GRE",
    rating: "4.9",
    reviewCount: "3677",
    reviews: [
      {
        author: "Student",
        rating: "5",
        text: "Ooshas Prep helped me prepare effectively for my GRE exam.",
      },
    ],
  },

  sat: {
    name: "SAT",
    rating: "4.7",
    reviewCount: "3429",
    reviews: [
      {
        author: "Student",
        rating: "5",
        text: "Ooshas Prep helped me prepare effectively for my SAT exam.",
      },
    ],
  },

  toefl: {
    name: "TOEFL",
    rating: "4.8",
    reviewCount: "1800",
    reviews: [
      {
        author: "Student",
        rating: "5",
        text: "Ooshas Prep helped me prepare effectively for my TOEFL exam.",
      },
    ],
  },

  pte: {
    name: "PTE",
    rating: "4.9",
    reviewCount: "4652",
    reviews: [
      {
        author: "Student",
        rating: "5",
        text: "Ooshas Prep helped me prepare effectively for my PTE exam.",
      },
    ],
  },

  ielts: {
    name: "IELTS",
    rating: "4.5",
    reviewCount: "4877",
    reviews: [
      {
        author: "Student",
        rating: "5",
        text: "Ooshas Prep helped me prepare effectively for my IELTS exam.",
      },
    ],
  },
  duolingo: {
    name: "DUOLINGO",
    rating: "4.5",
    reviewCount: "2378",
    reviews: [
      {
        author: "Student",
        rating: "5",
        text: "Ooshas Prep helped me prepare effectively for my DUOLINGO exam.",
      },
    ],
  },
};

export default async function PreparationPage({ params }: PageProps) {
  const { slug } = await params;
  const rowtext = normalizeSlug(slug);
  if (!rowtext || rowtext === "home") {
    redirect("/");
  }

  const pageData = await getPageInfo(rowtext);
  const Data = await getPages(300);
  const hasValidData =
    pageData && !Array.isArray(pageData) && Object.keys(pageData).length > 0;

  if (!hasValidData) {
    return <NoDataFoundUI />;
  }
  const template = pageData?.template;
  const isPreparation = template === "preparation";
  const isCalculator = template === "calculator";
  const isExamDetails = template === "examdetails";

  const seo = pageData?.seoMeta || {};

  const pageTitle =
    seo?.title?.trim() || `${rowtext.toUpperCase()} Preparation | Ooshas Prep`;

  const pageDescription =
    seo?.description?.trim() ||
    `Prepare for ${rowtext.toUpperCase()} with Ooshas Prep through expert coaching, practice tests, study material and personalized preparation.`;

  const pageUrl = normalizeCanonicalUrl(seo?.canonicalUrl, rowtext);

  const faqItems = pageData?.sections?.["f&q"]?.fields?.items || [];

  const validFaqItems = Array.isArray(faqItems)
    ? faqItems.filter(
        (item: any) => item?.question?.trim() && item?.answer?.trim(),
      )
    : [];

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

        name: pageTitle,

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

    inLanguage: "en-US",
  };

  const examReviewData = Object.entries(reviewSchema).find(([exam]) =>
  rowtext.includes(exam)
)?.[1];

  const courseSchema = isPreparation || isExamDetails
    ? {
        "@type": "Course",

        "@id": `${pageUrl}#course`,

        name: pageTitle,

        description: pageDescription,

        url: pageUrl,

        provider: {
          "@id": ORGANIZATION_ID,
        },

        ...(examReviewData && {
          aggregateRating: {
            "@type": "AggregateRating",

            ratingValue: examReviewData.rating,

            bestRating: "5",

            worstRating: "1",

            ratingCount: examReviewData.reviewCount,
          },
        }),
      }
    : null;

  const reviewSchemaData =
    (isPreparation || isExamDetails) && examReviewData
      ? examReviewData.reviews.map((review, index) => ({
          "@type": "Review",

          "@id": `${pageUrl}#review-${index + 1}`,

          author: {
            "@type": "Person",

            name: review.author,
          },

          reviewRating: {
            "@type": "Rating",

            ratingValue: review.rating,

            bestRating: "5",

            worstRating: "1",
          },

          reviewBody: review.text,

          itemReviewed: {
            "@id": `${pageUrl}#course`,
          },
        }))
      : [];

  if (isPreparation && courseSchema) {
    webPageSchema["mainEntity" as keyof typeof webPageSchema] = {
      "@id": `${pageUrl}#course`,
    };
  }

  const faqSchema =
    validFaqItems.length > 0
      ? {
          "@type": "FAQPage",

          "@id": `${pageUrl}#faq`,

          url: pageUrl,

          name: `${pageTitle} - Frequently Asked Questions`,

          mainEntity: validFaqItems.map((item: any) => ({
            "@type": "Question",

            name: item.question.trim(),

            acceptedAnswer: {
              "@type": "Answer",

              text: item.answer.trim(),
            },
          })),
        }
      : null;

  const schemaGraph: any[] = [
    organizationSchema,
    websiteSchema,
    webPageSchema,
    breadcrumbSchema,
  ];

  if (isPreparation && courseSchema) {
    schemaGraph.push(courseSchema);
  }

  if (isExamDetails && courseSchema) {
    schemaGraph.push(courseSchema);
  }

  if (faqSchema) {
    schemaGraph.push(faqSchema);
  }

  if (reviewSchemaData.length > 0) {
    schemaGraph.push(...reviewSchemaData);
  }

  const pageSchema = {
    "@context": "https://schema.org",
    "@graph": schemaGraph,
  };

  let Blogdata: any = [];

  try {
    const response = await axiosInstance.get(
      "/admin/blogs?limit=8&isPublished=true",
    );

    Blogdata = response?.data;
  } catch (error) {
    console.error("Failed to fetch blogs:", error);
  }

  return (
    <>
      <Script
        id="page-structured-data"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(pageSchema),
        }}
      />
      {isPreparation ? (
        <Gre pageInfo={pageData} slug={rowtext} />
      ) : isCalculator ? (
        <ScoreCalculatorPage pageInfo={pageData} slug={rowtext} />
      ) : (
        <ExamDetails
          pagedata={pageData}
          Data={Data}
          slug={slug}
          Blogdata={Blogdata?.data || []}
        />
      )}
    </>
  );
}

function NoDataFoundUI() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDF4EE] px-4">
      <div className="text-center max-w-md">
        <h1 className="text-8xl font-bold text-[#F36C45]">404</h1>

        <h2 className="text-2xl font-semibold text-gray-800 mt-4">
          Page Not Found
        </h2>

        <p className="text-gray-600 mt-2">
          Sorry, the page you are looking for does not exist.
        </p>

        <Link
          href="/"
          className="inline-block mt-6 px-6 py-3 bg-[#F36C45] text-white rounded-lg"
        >
          ← Back to Home
        </Link>

        <p className="mt-8 text-sm text-gray-400">
          © {new Date().getFullYear()} Ooshas Prep
        </p>
      </div>
    </div>
  );
}
