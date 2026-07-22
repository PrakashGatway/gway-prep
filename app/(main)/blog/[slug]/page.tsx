

import { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogDetails from "@/app/components/Blogdetail";
import axiosInstance from "@/app/lib/axios";

interface PageProps {
  params: Promise<{ slug: string }>;
}


async function getBlogData(slug: string) {
  try {
    const response = await axiosInstance(`/admin/blogs/${slug}`);
    return response.data;
  } catch (error) {
    console.error("Server-side fetch error:", error);
    return null;
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {

  const { slug } = await params;
  const blog = await getBlogData(slug);

  if (!blog) {
    return { title: "Blog Not Found" };
  }

  return {
    title: blog?.metaTitle || blog.title || "Blog Details",
    description: blog?.metaDescription || blog.summary || "Read our latest blog post.",
  };
}


export default async function BlogDetailsPage({ params }: PageProps) {
  const { slug } = await params;

  const blog = await getBlogData(slug);

  const api = await axiosInstance(`/admin/blogs?page=1&limit=4`);
  const res = api.data.data;

  if (!blog) {
    notFound();
  }

  const SITE_URL = "https://ooshasprep.com";

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
        item: `${SITE_URL}/blog/${slug}`,
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

      <BlogDetails
        blog={blog}
        loading={false}
        res={res}
      />
    </>
  );
}


// export default async function BlogDetailsPage({ params }: PageProps) {
//   const { slug } = await params;

//   // Fetch data during server rendering
//   const blog = await getBlogData(slug);

//       const api = await axiosInstance(`/admin/blogs?page=1&limit=4`);
//       const res = await api.data.data;
    
//   if (!blog) {
//     notFound();
//   }

//   return <BlogDetails blog={blog} loading={false} res={res} />;
// }
