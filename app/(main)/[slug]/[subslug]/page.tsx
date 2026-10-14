import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ExamDetails from "@/components/examDetails";
import axiosInstance from "@/app/lib/axios";
import { getPageInfo, getPages } from "@/app/services/api";
import { slugify } from "@/app/lib/slug";

interface ExamSubpageProps {
  params: Promise<{ slug: string; subslug: string }>;
}

const SITE_URL = "https://www.ooshasprep.com";

const getStorageSlug = (parentSlug: string, subSlug: string) =>
  `${slugify(parentSlug)}-${slugify(subSlug)}`;

const getNestedCanonical = (parentSlug: string, subSlug: string) =>
  `${SITE_URL}/${parentSlug}/${subSlug}`;

async function getExamSubpage(parentSlug: string, subSlug: string) {
  const parent = slugify(parentSlug);
  const child = slugify(subSlug);
  const isChildOfParent = (page: any) => {
    const pageTemplate = String(page?.template || page?.seoMeta?.template || "")
      .trim()
      .toLowerCase();
    const pageParent = slugify(page?.seoMeta?.duplicateOf || "");
    return pageTemplate === "examdetails" && pageParent === parent;
  };

  const exactPage = await getPageInfo(getStorageSlug(parent, child));
  if (exactPage && !Array.isArray(exactPage) && isChildOfParent(exactPage)) {
    return exactPage;
  }

  // Older child records can use a flat canonical slug, so resolve them by parent and leaf too.
  const pages = await getPages(300).catch(() => []);
  return pages.find((page: any) => {
    if (!isChildOfParent(page)) return false;

    const storedSlug = slugify(page?.seoMeta?.slug || page?.slug || page?.name || "");
    const canonicalPath = String(page?.seoMeta?.canonicalUrl || "")
      .replace(/^https?:\/\/[^/]+/i, "")
      .replace(/^\/+|\/+$/g, "");
    const canonicalParts = canonicalPath.split("/").filter(Boolean).map(slugify);
    const canonicalLeaf = canonicalParts.at(-1) || "";
    const storageLeaf = storedSlug.startsWith(`${parent}-`)
      ? storedSlug.slice(parent.length + 1)
      : storedSlug;

    return (
      canonicalLeaf === child ||
      storageLeaf === child ||
      storedSlug === getStorageSlug(parent, child)
    );
  });
}

export async function generateMetadata({
  params,
}: ExamSubpageProps): Promise<Metadata> {
  const { slug, subslug } = await params;
  const parent = slugify(slug);
  const child = slugify(subslug);
  const page = await getExamSubpage(parent, child);
  const seo = page?.seoMeta || {};
  const title =
    seo.title?.trim() ||
    `${child.replace(/-/g, " ").replace(/\b\w/g, (char: string) => char.toUpperCase())} | Ooshas Prep`;
  const description =
    seo.description?.trim() ||
    `Explore ${child.replace(/-/g, " ")} information for ${parent.replace(/-/g, " ").toUpperCase()}.`;
  const canonical = getNestedCanonical(parent, child);

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    keywords: seo.keywords,
    alternates: { canonical },
    robots: { index: Boolean(page), follow: true },
    openGraph: {
      title: seo.ogTitle?.trim() || title,
      description: seo.ogDescription?.trim() || description,
      url: canonical,
      siteName: "Ooshas Prep",
      type: "website",
      images: [seo.ogImage || `${SITE_URL}/image/logo.png`],
    },
  };
}

export default async function ExamSubpage({ params }: ExamSubpageProps) {
  const { slug, subslug } = await params;
  const parent = slugify(slug);
  const child = slugify(subslug);
  const pageData = await getExamSubpage(parent, child);
  if (!pageData) notFound();

  const [pages, blogResponse] = await Promise.all([
    getPages(300).catch(() => []),
    axiosInstance
      .get("/admin/blogs?limit=8&isPublished=true")
      .then((response) => response.data?.data || [])
      .catch(() => []),
  ]);

  return (
    <ExamDetails
      pagedata={pageData}
      Data={pages}
      slug={pageData?.seoMeta?.slug || getStorageSlug(parent, child)}
      Blogdata={blogResponse}
    />
  );
}
