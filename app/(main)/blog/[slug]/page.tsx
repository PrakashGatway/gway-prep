

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogDetails from "@/components/Blogdetail";
import axiosInstance from "@/app/lib/axios";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const SITE_URL = "https://ooshasprep.com";

async function getBlogData(slug: string) {
  try {
    const response = await axiosInstance.get(`/admin/blogs/${slug}`);
    return response.data;
  } catch (error) {
    console.error("Blog fetch error:", error);
    return null;
  }
}

async function getRelatedBlogs() {
  try {
    const response = await axiosInstance.get(
      `/admin/blogs?page=1&limit=4`
    );

    return response.data?.data || [];
  } catch (error) {
    console.error("Related blogs fetch error:", error);
    return [];
  }
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const blog = await getBlogData(slug);

  if (!blog) {
    return {
      title: "Blog Not Found | Ooshas Prep",
      description: "The requested blog could not be found.",
    };
  }

  const title =
    blog?.metaTitle ||
    blog?.title ||
    "Blog Details | Ooshas Prep";

  const description =
    blog?.metaDescription ||
    blog?.summary ||
    "Read the latest blog posts from Ooshas Prep.";

  const image =
    blog?.image ||
    blog?.featuredImage ||
    `${SITE_URL}/og-image.jpg`;

  const canonicalUrl = `${SITE_URL}/blog/${slug}`;

  return {
    metadataBase: new URL(SITE_URL),

    title,

    description,

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "Ooshas Prep",
      type: "article",

      ...(image && {
        images: [
          {
            url: image,
            width: 1200,
            height: 630,
            alt: blog?.title || "Ooshas Prep Blog",
          },
        ],
      }),

      publishedTime: blog?.createdAt,
      modifiedTime: blog?.updatedAt,
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,

      ...(image && {
        images: [image],
      }),
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function BlogDetailsPage({
  params,
}: PageProps) {
  const { slug } = await params;

  // Fetch blog
  const blog = await getBlogData(slug);

  // Show Next.js 404 page if blog doesn't exist
  if (!blog) {
    notFound();
  }

  // Fetch related blogs
  const res = await getRelatedBlogs();

  const blogUrl = `${SITE_URL}/blog/${slug}`;

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
      {
        "@type": "ListItem",
        position: 3,
        name: blog.title,
        item: blogUrl,
      },
    ],
  };

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",

    headline: blog.title,

    description:
      blog?.metaDescription ||
      blog?.summary ||
      "",

    url: blogUrl,

    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": blogUrl,
    },

    ...(blog?.image && {
      image: [blog.image],
    }),

    ...(blog?.createdAt && {
      datePublished: blog.createdAt,
    }),

    ...(blog?.updatedAt && {
      dateModified: blog.updatedAt,
    }),

    author: {
      "@type": "Organization",
      name: "Ooshas Prep",
      url: SITE_URL,
    },

    publisher: {
      "@type": "Organization",
      name: "Ooshas Prep",
      url: SITE_URL,
    },
  };

  return (
    <>
      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      {/* Blog Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogSchema),
        }}
      />

      <BlogDetails
        blog={blog}
        loading={false}
        res={res}
        slug={slug}
      />
    </>
  );
}
  





// import { Metadata } from "next";
// import { notFound } from "next/navigation";
// import BlogDetails from "@/components/Blogdetail";
// import axiosInstance from "@/app/lib/axios";

// interface PageProps {
//   params: Promise<{ slug: string }>;
// }


// async function getBlogData(slug: string) {
//   try {
//     const response = await axiosInstance(`/admin/blogs/${slug}`);
//     return response.data;
//   } catch (error) {
//     console.error("Server-side fetch error:", error);
//     return null;
//   }
// }

// export async function generateMetadata({ params }: PageProps): Promise<Metadata> {

//   const { slug } = await params;
//   const blog = await getBlogData(slug);

//   if (!blog) {
//     return { title: "Blog Not Found" };
//   }

//   return {
//     title: blog?.metaTitle || blog.title || "Blog Details",
//     description: blog?.metaDescription || blog.summary || "Read our latest blog post.",
//   };
// }


// export default async function BlogDetailsPage({ params }: PageProps) {
//   const { slug } = await params;

//   const blog = await getBlogData(slug);

//   const api = await axiosInstance(`/admin/blogs?page=1&limit=4`);
//   const res = api.data.data;

//   if (!blog) {
//     notFound();
//   }

//   const SITE_URL = "https://ooshasprep.com";

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
//         name: "Blog",
//         item: `${SITE_URL}/blog`,
//       },
//       {
//         "@type": "ListItem",
//         position: 3,
//         name: blog.title,
//         item: `${SITE_URL}/blog/${slug}`,
//       },
//     ],
//   };

//   return (
//     <>
//       <script
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{
//           __html: JSON.stringify(breadcrumbSchema),
//         }}
//       />

//       <BlogDetails
//         blog={blog}
//         loading={false}
//         res={res}
//         slug={slug}
//       />
//     </>
//   );
// }

