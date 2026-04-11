import BlogDetails from "@/app/(main)/components/Blogdetail";


interface PageProps {
  params: {
    slug: string;
  };
}

export default async function BlogDetailsPage({ params }: PageProps) {
    const { slug } = await params;
  return <BlogDetails slug={slug} />;
}
