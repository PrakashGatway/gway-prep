import Blog from "@/components/Blog";
import {
  getBlogCategory,
  getPageInfo,
} from "@/app/services/api";
import type { Metadata } from "next";
import axiosInstance from "@/app/lib/axios";
import Script from "next/script";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.ooshasprep.com";

const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const LOGO_ID = `${SITE_URL}/#logo`;
const BLOG_PAGE_URL = `${SITE_URL}/blog`;

const SOCIAL_LINKS = [
  "https://www.instagram.com/ooshasprep",
  "https://www.facebook.com/share/18aH5VifRr/?mibextid=wwXIfr",
  "https://x.com/ooshasprep",
  "https://youtube.com/@ooshasprep",
];

export async function generateMetadata(): Promise<Metadata> {
  const data = await getPageInfo("blog");
  const seo = data?.seoMeta || {};

  const canonicalPath =
    seo?.canonicalUrl
      ?.replace(/^\/+|\/+$/g, "")
      ?.trim() || "blog";

  const title =
    seo?.title?.trim() || "Blog | Ooshas Prep";

  const description =
    seo?.description?.trim() ||
    "Stay updated with the latest news, tips, guides and insights from Ooshas Prep.";

  const ogTitle =
    seo?.ogTitle?.trim() || title;

  const ogDescription =
    seo?.ogDescription?.trim() || description;

  const ogImage =
    seo?.ogImage || `${SITE_URL}/image/logo.png`;

  const canonicalUrl = `${SITE_URL}/${canonicalPath}`;

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
      title: ogTitle,
      description: ogDescription,
      url: canonicalUrl,
      siteName: "Ooshas Prep",
      type: "website",
      locale: "en_US",

      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: ogTitle,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDescription,
      images: [ogImage],
    },
  };
}

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

  /*
   * -------------------------------------------------------
   * URL FILTERS
   * -------------------------------------------------------
   */

  const page = Math.max(
    Number(params?.page) || 1,
    1
  );

  const search =
    params?.search?.trim() || "";

  const category =
    params?.category?.trim() || "";

  /*
   * -------------------------------------------------------
   * GET PAGE + CATEGORIES
   * -------------------------------------------------------
   */

  const [data, categoriesResponse] =
    await Promise.all([
      getPageInfo("blog"),
      getBlogCategory(),
    ]);

  /*
   * -------------------------------------------------------
   * BLOG API QUERY
   * -------------------------------------------------------
   */

  const queryParams = new URLSearchParams();

  queryParams.set("page", String(page));
  queryParams.set("limit", "12");

  if (search) {
    queryParams.set("search", search);
  }

  if (category) {
    queryParams.set("category", category);
  }

  let blogsData: any = {
    data: [],

    pagination: {
      page,
      limit: 12,
      total: 0,
      totalPages: 1,
    },
  };

  try {
    const response = await axiosInstance.get(
      `/admin/blogs?${queryParams.toString()}&isPublished=true`
    );

    blogsData = response?.data || blogsData;
  } catch (error) {
    console.error(
      "Failed to fetch blogs:",
      error
    );
  }

  const blogs = Array.isArray(blogsData?.data)
    ? blogsData.data
    : [];

  /*
   * -------------------------------------------------------
   * SEO DATA
   * -------------------------------------------------------
   */

  const seo = data?.seoMeta || {};

  const pageTitle =
    seo?.title?.trim() ||
    "Blog | Ooshas Prep";

  const pageDescription =
    seo?.description?.trim() ||
    "Stay updated with the latest news, tips, guides and insights from Ooshas Prep.";

  /*
   * -------------------------------------------------------
   * ORGANIZATION
   * -------------------------------------------------------
   */

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

  /*
   * -------------------------------------------------------
   * WEBSITE
   * -------------------------------------------------------
   */

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

  /*
   * -------------------------------------------------------
   * BLOG LISTING PAGE
   * -------------------------------------------------------
   */

  const collectionPageSchema = {
    "@type": "CollectionPage",

    "@id": `${BLOG_PAGE_URL}#collection`,

    url: BLOG_PAGE_URL,

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

    breadcrumb: {
      "@id": `${BLOG_PAGE_URL}#breadcrumb`,
    },

    mainEntity: {
      "@id": `${BLOG_PAGE_URL}#blog-list`,
    },
  };

  /*
   * -------------------------------------------------------
   * WEBPAGE
   * -------------------------------------------------------
   */

  const webPageSchema = {
    "@type": "WebPage",

    "@id": `${BLOG_PAGE_URL}#webpage`,

    url: BLOG_PAGE_URL,

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
      "@id": `${BLOG_PAGE_URL}#breadcrumb`,
    },

    mainEntity: {
      "@id": `${BLOG_PAGE_URL}#collection`,
    },

    inLanguage: "en-US",
  };

  /*
   * -------------------------------------------------------
   * BREADCRUMB
   * -------------------------------------------------------
   */

  const breadcrumbSchema = {
    "@type": "BreadcrumbList",

    "@id": `${BLOG_PAGE_URL}#breadcrumb`,

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

        item: BLOG_PAGE_URL,
      },
    ],
  };

  /*
   * -------------------------------------------------------
   * BLOG POST ITEM LIST
   * -------------------------------------------------------
   */

  const blogItems = blogs
    .map((blog: any, index: number) => {
      const slug =
        blog?.slug ||
        blog?.seoSlug ||
        blog?.urlSlug;

      if (!slug) {
        return null;
      }

      const blogUrl = `${SITE_URL}/blog/${slug}`;

      return {
        "@type": "ListItem",

        position: index + 1,

        url: blogUrl,

        item: {
          "@type": "BlogPosting",

          "@id": `${blogUrl}#article`,

          url: blogUrl,

          headline:
            blog?.title ||
            blog?.seoMeta?.title ||
            "Ooshas Prep Blog",

          description:
            blog?.description ||
            blog?.excerpt ||
            blog?.seoMeta?.description ||
            undefined,

          image:
            blog?.featuredImage ||
            blog?.image ||
            blog?.thumbnail ||
            undefined,

          datePublished:
            blog?.publishedAt ||
            blog?.createdAt ||
            undefined,

          dateModified:
            blog?.updatedAt ||
            blog?.publishedAt ||
            blog?.createdAt ||
            undefined,

          author: blog?.author
            ? {
                "@type": "Person",
                name:
                  typeof blog.author === "string"
                    ? blog.author
                    : blog.author?.name,
              }
            : {
                "@type": "Organization",
                name: "Ooshas Prep",
                "@id": ORGANIZATION_ID,
              },

          publisher: {
            "@id": ORGANIZATION_ID,
          },

          mainEntityOfPage: {
            "@id": `${blogUrl}#webpage`,
          },

          inLanguage: "en-US",
        },
      };
    })
    .filter(Boolean);

  /*
   * -------------------------------------------------------
   * ITEM LIST
   * -------------------------------------------------------
   */

  const itemListSchema = {
    "@type": "ItemList",

    "@id": `${BLOG_PAGE_URL}#blog-list`,

    name: "Ooshas Prep Blog",

    description:
      "Latest articles, guides, tips and insights from Ooshas Prep.",

    numberOfItems: blogItems.length,

    itemListOrder: "https://schema.org/ItemListOrderDescending",

    itemListElement: blogItems,
  };

  /*
   * -------------------------------------------------------
   * FINAL SCHEMA GRAPH
   * -------------------------------------------------------
   */

  const pageSchema = {
    "@context": "https://schema.org",

    "@graph": [
      organizationSchema,
      websiteSchema,
      collectionPageSchema,
      webPageSchema,
      breadcrumbSchema,
      itemListSchema,
    ],
  };

  return (
    <>
      <Script
        id="blog-page-structured-data"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(pageSchema),
        }}
      />

      <Blog
        pageInfo={data}
        categories={
          categoriesResponse?.data || []
        }
        blogs={blogs}
        allBlog={blogsData}
        pagination={{
          page:
            blogsData?.pagination?.page ||
            page,

          totalPages:
            blogsData?.pagination?.totalPages ||
            1,

          total:
            blogsData?.pagination?.total ||
            0,

          limit:
            blogsData?.pagination?.limit ||
            12,
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