import { slugify } from "@/app/lib/slug";

export function getStudentCaseStudySlug(student: any): string {
  const customSlug = slugify(String(student?.slug || "")).replace(/^-+|-+$/g, "");
  if (customSlug) return customSlug;

  const nameSlug = slugify(String(student?.name || "student")).replace(/^-+|-+$/g, "") || "student";
  const id = String(student?._id || student?.id || "").replace(/[^a-z0-9]/gi, "").toLowerCase();
  return id ? `${nameSlug}-${id.slice(-8)}` : nameSlug;
}
