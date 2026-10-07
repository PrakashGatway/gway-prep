import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogDetails from "@/components/Blogdetail";
import axiosInstance from "@/app/lib/axios";
import Script from "next/script";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.ooshasprep.com";

const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const LOGO_ID = `${SITE_URL}/#logo`;

async function getBlogData(slug: string) {
  try {
    const response = await axiosInstance.get(
      `/admin/blogs/${slug}`
    );

    return response.data;
  } catch (error) {
    console.error("Blog fetch error:", error);
    return null;
  }
}

async function getRelatedBlogs() {
  try {
    const response = await axiosInstance.get(
      `/admin/blogs?page=1&limit=4&isPublished=true`
    );

    return response.data?.data || [];
  } catch (error) {
    console.error(
      "Related blogs fetch error:",
      error
    );

    return [];
  }
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const response = await getBlogData(slug);
  const blog = response?.data;

  if (!blog) {
    return {
      title: "Blog Not Found | Ooshas Prep",
      description:
        "The requested blog could not be found.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title =
    blog?.metaTitle?.trim() ||
    blog?.title?.trim() ||
    "Ooshas Prep Blog";

  const description =
    blog?.metaDescription?.trim() ||
    blog?.summary?.trim() ||
    "";

  const image =
    blog?.image ||
    blog?.featuredImage ||
    `${SITE_URL}/image/logo.png`;

  const canonicalUrl =
    blog?.canonicalUrl ||
    `${SITE_URL}/blog/${slug}`;

  return {
    metadataBase: new URL(SITE_URL),

    title,
    description,

    keywords:
      blog?.keywords ||
      blog?.tags ||
      undefined,

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      title,
      description,

      url: canonicalUrl,

      siteName: "Ooshas Prep",

      type: "article",

      locale: "en_US",

      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt:
            blog?.title ||
            "Ooshas Prep Blog",
        },
      ],

      ...(blog?.createdAt && {
        publishedTime: blog.createdAt,
      }),

      ...(blog?.updatedAt && {
        modifiedTime: blog.updatedAt,
      }),
    },

    twitter: {
      card: "summary_large_image",

      title,

      description,

      images: [image],
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
  };
}

export default async function BlogDetailsPage({
  params,
}: PageProps) {
  const { slug } = await params;

  const response = await getBlogData(slug);

  const blog = response?.data;

  if (!blog) {
    notFound();
  }


  const res = await getRelatedBlogs();
  const blogUrl = `${SITE_URL}/blog/${slug}`;

  const blogTitle =
    blog?.title ||
    blog?.metaTitle ||
    "Ooshas Prep Blog";

  const blogDescription =
    blog?.metaDescription ||
    blog?.summary ||
    "";

  const blogImage =
    blog?.image ||
    blog?.featuredImage ||
    `${SITE_URL}/image/logo.png`;


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

    sameAs: [
      "https://www.instagram.com/ooshasprep",
      "https://www.facebook.com/share/18aH5VifRr/?mibextid=wwXIfr",
      "https://x.com/ooshasprep",
      "https://youtube.com/@ooshasprep",
    ],
  };

  /*
   * -------------------------------------------------------
   * WEBSITE SCHEMA
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
   * IMAGE SCHEMA
   * -------------------------------------------------------
   */

  const imageSchema = {
    "@type": "ImageObject",

    "@id": `${blogUrl}#primaryimage`,

    url: blogImage,

    contentUrl: blogImage,

    caption: blogTitle,
  };

  /*
   * -------------------------------------------------------
   * BREADCRUMB SCHEMA
   * -------------------------------------------------------
   */

  const breadcrumbSchema = {
    "@type": "BreadcrumbList",

    "@id": `${blogUrl}#breadcrumb`,

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

      {
        "@type": "ListItem",

        position: 3,

        name: blogTitle,

        item: blogUrl,
      },
    ],
  };

  /*
   * -------------------------------------------------------
   * WEBPAGE SCHEMA
   * -------------------------------------------------------
   */

  const webPageSchema = {
    "@type": "WebPage",

    "@id": `${blogUrl}#webpage`,

    url: blogUrl,

    name: blogTitle,

    description: blogDescription,

    isPartOf: {
      "@id": WEBSITE_ID,
    },

    about: {
      "@id": ORGANIZATION_ID,
    },

    primaryImageOfPage: {
      "@id": `${blogUrl}#primaryimage`,
    },

    breadcrumb: {
      "@id": `${blogUrl}#breadcrumb`,
    },

    inLanguage: "en-US",

    mainEntity: {
      "@id": `${blogUrl}#article`,
    },
  };

  /*
   * -------------------------------------------------------
   * AUTHOR
   * -------------------------------------------------------
   */

  const authorSchema = blog?.author
    ? {
        "@type": "Person",

        "@id": `${blogUrl}#author`,

        name:
          typeof blog.author === "string"
            ? blog.author
            : blog.author?.name,

        ...(typeof blog.author === "object" &&
          blog.author?.url && {
            url: blog.author.url,
          }),
      }
    : {
        "@type": "Organization",

        "@id": ORGANIZATION_ID,

        name: "Ooshas Prep",

        url: SITE_URL,
      };

  /*
   * -------------------------------------------------------
   * BLOG POSTING SCHEMA
   * -------------------------------------------------------
   */

  const blogPostingSchema = {
    "@type": "BlogPosting",

    "@id": `${blogUrl}#article`,

    headline: blogTitle,

    description: blogDescription,

    url: blogUrl,

    mainEntityOfPage: {
      "@id": `${blogUrl}#webpage`,
    },

    image: {
      "@id": `${blogUrl}#primaryimage`,
    },

    author: authorSchema,

    publisher: {
      "@id": ORGANIZATION_ID,
    },

    ...(blog?.createdAt && {
      datePublished: new Date(
        blog.createdAt
      ).toISOString(),
    }),

    ...(blog?.updatedAt && {
      dateModified: new Date(
        blog.updatedAt
      ).toISOString(),
    }),

    ...(blog?.category && {
      articleSection:
        typeof blog.category === "string"
          ? blog.category
          : blog.category?.name,
    }),

    ...(blog?.tags &&
      Array.isArray(blog.tags) && {
        keywords: blog.tags.join(", "),
      }),

    inLanguage: "en-US",

    isPartOf: {
      "@id": WEBSITE_ID,
    },
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
      imageSchema,
      breadcrumbSchema,
      webPageSchema,
      blogPostingSchema,
    ],
  };

  return (
    <>
      <Script
        id="blog-detail-structured-data"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(pageSchema),
        }}
      />

      <BlogDetails
        blog={response}
        loading={false}
        res={res}
        slug={slug}
      />
    </>
  );
}