import { notFound } from "next/navigation";
import Auther from "@/components/auther";
import axiosInstance from "@/app/lib/axios";

interface PageProps {
  params: Promise<{ slug: string }>;
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

async function getAuthorData(slug: string) {
  try {
  console.log(slug, 'data')

    const response = await axiosInstance.get(
      `/admin/auther?slug=${encodeURIComponent(slug)}`
    );

    console.log(response.data?.data,"update")
    return response.data?.data || null;
  } catch (error) {
    console.error("Author fetch error:", error);
    return null;
  }
}

export default async function BlogDetailsPage({
  params,
}: PageProps) {
  const { slug } = await params;

  // Fetch author and related blogs at the same time
  const [authorData, relatedBlogs] = await Promise.all([
    getAuthorData(slug),
    getRelatedBlogs(),
  ]);

  if (!authorData) {
    notFound();
  }

  return (
    <Auther
      slug={slug}
      author={authorData}
      relatedBlogs={relatedBlogs}
    />
  );
}