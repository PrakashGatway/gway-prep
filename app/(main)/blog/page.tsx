import Blog from "@/app/components/Blog";
import { getBlogCategory, getPageInfo } from "@/app/services/api";


export async function generateMetadata() {
  const  data  = await getPageInfo("blog");
  const seo = data.seoMeta;

  return {
    title: seo?.title?.trim() || "Blog",
    description: seo?.description,
    keywords: seo?.keywords,
    alternates: {
      canonical: `/${seo?.canonicalUrl || ""}`,
    },
    openGraph: {
      title: seo?.title,
      description: seo?.description,
      url: `${seo?.canonicalUrl || "https://ooshasprap.com/blog/"}`,
      type: "website",
    },
  };
}

export default async function BlogPage() {
    const data = await getPageInfo("blog");
    const categories = await getBlogCategory();
    return(
        <Blog pageInfo={data} categories={categories.data} />
    )
}