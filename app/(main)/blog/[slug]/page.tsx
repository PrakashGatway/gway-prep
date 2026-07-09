import { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogDetails from "@/app/components/Blogdetail";
import axiosInstance from "@/app/lib/axios";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// 1. Helper function to fetch data securely on the server
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
    title: blog.title || "Blog Details",
    description: blog.excerpt || blog.summary || "Read our latest blog post.",
  };
}

// 3. The Server Page Component
export default async function BlogDetailsPage({ params }: PageProps) {
  
  const { slug } = await params; 
  
  // Fetch data during server rendering
  const blog = await getBlogData(slug);

  
  if (!blog) {
    notFound();
  }

  return <BlogDetails blog={blog} loading={false} />; 
}
