import axiosInstance from "@/app/lib/axios";
import SupportArticlePage from "@/components/support-articles";
import RecentTestBlogs from "@/components/recent-test-blogs";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  try {
    const res = await axiosInstance.get(`/articles/${slug}`);

    const article = res.data.data;

    const category = typeof article?.category === "string"
      ? article.category
      : article?.category?.name || slug;

    return (
      <>
        <SupportArticlePage article={article} />
        <RecentTestBlogs source={category} />
      </>
    );
  } catch (error: any) {
    console.error(
      "Article API Error:",
      error?.response?.status,
      error?.response?.data,
      error?.message,
    );

    return <div className="p-10 text-center">Article not found</div>;
  }
}
