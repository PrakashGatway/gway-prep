export type BlogCategoryValue = string | { name?: unknown } | null | undefined;

function categoryName(value: BlogCategoryValue): string {
  if (typeof value === "string") return value.trim();
  if (value && typeof value === "object" && typeof value.name === "string") {
    return value.name.trim();
  }
  return "";
}

export function getBlogCategories(blog: {
  categories?: unknown;
  category?: unknown;
} | null | undefined): string[] {
  if (!blog) return [];
  const raw = [
    ...(Array.isArray(blog.categories) ? blog.categories : []),
    blog.category,
  ];
  const seen = new Set<string>();
  return raw.reduce<string[]>((result, value) => {
    const name = categoryName(value as BlogCategoryValue);
    const key = name.toLocaleLowerCase();
    if (name && !seen.has(key)) {
      seen.add(key);
      result.push(name);
    }
    return result;
  }, []);
}
