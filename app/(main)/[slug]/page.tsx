import Gre from "@/components/test-preparation/Gre";
import { getPageInfo } from "@/app/services/api";
import Link from "next/link";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import ExamDetails from "@/components/examDetails";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const SITE_URL = "https://www.ooshasprep.com";

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  // // 1. Decode the text twice to remove %2520 and %20
  const cleanText = decodeURIComponent(decodeURIComponent(slug));

  // // 2. Convert spaces to hyphens for the URL slug
  const rowtext = cleanText.toLowerCase().replace(/\s+/g, "-");

  if (!rowtext) {
    return {
      title: "No Data Found",
      description: "Preparation material not found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const data = await getPageInfo(rowtext);

  const seo = data?.seoMeta || {};

  const canonical = seo?.canonicalUrl?.replace(/^\/+|\/+$/g, "") || rowtext;

  const title = seo?.title?.trim() || `${rowtext.toUpperCase()} Preparation`;

  const description =
    seo?.description ||
    `Prepare for ${rowtext.toUpperCase()} with Ooshas Prep.`;

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

export default async function PreparationPage({ params }: PageProps) {
  const { slug } = await params;

  // // 1. Decode the text twice to remove %2520 and %20
  const cleanText = decodeURIComponent(decodeURIComponent(slug));

  // // 2. Convert spaces to hyphens for the URL slug
  const rowtext = cleanText.toLowerCase().replace(/\s+/g, "-");

  console.log(rowtext); // Output: gmat-coaching-in-jaipur

  if (!rowtext || rowtext.toLowerCase() === "home") {
    redirect("/");
  }

  const pageData = await getPageInfo(rowtext);

  const hasValidData =
    pageData &&
    (!Array.isArray(pageData) || pageData.length > 0) &&
    Object.keys(pageData).length > 0;

  if (!hasValidData) {
    return <NoDataFoundUI />;
  }

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

        name: pageData?.seoMeta?.title || rowtext.toUpperCase(),

        item: `${SITE_URL}/${rowtext}`,
      },
    ],
  };

  const courseSchema = {
    "@context": "https://schema.org",

    "@type": "Course",

    name: pageData?.seoMeta?.title || rowtext.toUpperCase(),

    description:
      pageData?.seoMeta?.description ||
      `Learn ${rowtext.toUpperCase()} preparation with Ooshas Prep.`,

    provider: {
      "@type": "Organization",

      name: "Ooshas Prep",

      sameAs: SITE_URL,
    },
  };

  const faqItems = pageData?.sections?.["f&q"]?.fields?.items || [];

  const faqSchema =
    faqItems.length > 0
      ? {
          "@context": "https://schema.org",

          "@type": "FAQPage",

          mainEntity: faqItems
            .filter((item: any) => item.question && item.answer)

            .map((item: any) => ({
              "@type": "Question",

              name: item.question,

              acceptedAnswer: {
                "@type": "Answer",

                text: item.answer,
              },
            })),
        }
      : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(courseSchema),
        }}
      />

      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema),
          }}
        />
      )}

      {pageData?.template === 'preparation' ? 
        (<Gre pageInfo={pageData} slug={rowtext} />) 
        : <ExamDetails pagedata={pageData}/>
      }

    </>
  );
}

// ================= 404 UI =================

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
