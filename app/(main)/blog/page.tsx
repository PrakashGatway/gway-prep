import Blog from "@/components/Blog";
import { getBlogCategory, getPageInfo } from "@/app/services/api";
import { Metadata } from "next";
import axiosInstance from "@/app/lib/axios";

const SITE_URL = "https://ooshasprep.com";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getPageInfo("blog");
  const seo = data?.seoMeta || {};

  const canonical =
    seo?.canonicalUrl?.replace(/^\/+|\/+$/g, "") || "blog";

  const title = seo?.title?.trim() || "Blog";

  const description =
    seo?.description ||
    "Stay updated with the latest news and insights from Ooshas Prep.";

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
      name: "Blog",
      item: `${SITE_URL}/blog`,
    },
  ],
};

interface BlogPageProps {
  searchParams: Promise<{
    page?: string;
    search?: string;
    category?: string;
  }>;
}

export default async function BlogPage({
  searchParams,
}: BlogPageProps) {
  const params = await searchParams;

  // Get filters from URL
  const page = Number(params?.page) || 1;
  const search = params?.search || "";
  const category = params?.category || "";

  // Page information + categories
  const [data, categoriesResponse] = await Promise.all([
    getPageInfo("blog"),
    getBlogCategory(),
  ]);

  // Build API query
  const queryParams = new URLSearchParams({
    page: String(page),
    limit: "10",
  });

  if (search) {
    queryParams.append("search", search);
  }

  if (category) {
    queryParams.append("category", category);
  }

  let blogsData = {
    data: [],
    currentPage: page,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
  };

  try {
    const api = await axiosInstance(
      `/admin/blogs?${queryParams.toString()}`
    );

    blogsData = api.data;
  } catch (error) {
    console.error("Failed to fetch blogs:", error);
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      <Blog
        pageInfo={data}
        categories={categoriesResponse?.data || []}
        blogs={blogsData.data || []}
        pagination={{
          currentPage: blogsData.currentPage || page,
          totalPages: blogsData.totalPages || 1,
          totalItems: blogsData.totalItems || 0,
          itemsPerPage: blogsData.itemsPerPage || 10,
        }}
        filters={{
          search,
          category,
          page,
        }}
      />
    </>
  );
}