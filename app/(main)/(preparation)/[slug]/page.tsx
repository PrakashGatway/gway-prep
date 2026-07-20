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
    seo?.description || `Prepare for ${slug.toUpperCase()} with Ooshas Prep.`;

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


export default async function PreparationPage({ params }: PageProps) {
  const { slug } = await params;

  if (!slug || slug.toLowerCase() === "home") {
    return <NoDataFoundUI />;
  }

  const pageData = await getPageInfo(slug);

  const hasValidData =
    pageData &&
    (!Array.isArray(pageData) || pageData.length > 0) &&
    Object.keys(pageData).length > 0;

  if (hasValidData) {
    return <Gre pageInfo={pageData} slug={slug} />;
  }

  return <NoDataFoundUI />;
}

// ── MODERN NO DATA FOUND UI COMPONENT ──────────────────────────────────────
function NoDataFoundUI() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDF4EE] px-4 font-['Open_Sans','Helvetica_Neue',Arial,sans-serif]">
      <div className="text-center max-w-md">
        {/* 404 */}
        <h1 className="text-8xl font-bold text-[#F36C45]">404</h1>
        
        {/* Message */}
        <h2 className="text-2xl font-semibold text-gray-800 mt-4">
          Page Not Found
        </h2>
        
        <p className="text-gray-600 mt-2">
          Sorry, the page you are looking for does not exist.
        </p>

        {/* Home Button */}
        <Link
          href="/"
          className="inline-block mt-6 px-6 py-3 bg-[#F36C45] text-white rounded-lg hover:bg-[#e05a33] transition-colors"
        >
          ← Back to Home
        </Link>

        {/* Footer */}
        <p className="mt-8 text-sm text-gray-400">
          © {new Date().getFullYear()} Ooshas Prep
        </p>
      </div>
    </div>
    );
}
