import { MetadataRoute } from "next";
import axiosInstance from "./lib/axios";

const BASE_URL = "https://www.ooshasprep.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const response = await axiosInstance.get("/admin/pageInfo/all");
    const response1 = await axiosInstance.get("/admin/blogs/all");
    const pages = response.data?.data || [];
    const pages1 = response1.data?.data || [];
console.log(pages,'pages data')
    const routes: string[] = [""];

    pages.forEach((page: any) => {
      const slug = page.seoMeta?.canonicalUrl || page.name;

      if (!slug || slug === "home") return;

      if (page.template === "preparation") {
        routes.push(`${slug}`);
      } else {
        routes.push(slug);
      }
    });

    pages1.forEach((ele : any) => {
      const slug = ele.slug;
      routes.push(`blog/${slug}`);
    })

    const uniqueRoutes = [...new Set(routes)];

    return uniqueRoutes.map((route) => ({
      url: route ? `${BASE_URL}/${route}` : BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: route === "" ? 1 : 0.8,
    }));
  } catch (error) {
    console.error("Sitemap generation failed:", error);

    return [
      {
        url: BASE_URL,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 1,
      },
    ];
  }
}

















// import { MetadataRoute } from "next";

// const BASE_URL = "https://www.ooshasprep.com"; // Replace with your domain

// export default function sitemap(): MetadataRoute.Sitemap {
//   const routes = [
//     "",
//     "gre",
//     "ielts",
//     "pte",
//     "sat",
//     "duolingo",
//     "about",
//     "contactus",
//     "blog",
//     "privacy-policy",
//     "terms-and-conditions",
//   ];

//   return routes.map((route) => ({
//     url: `${BASE_URL}/${route}`.replace(/\/$/, ""),
//     lastModified: new Date(),
//     changeFrequency: "weekly",
//     priority: route === "" ? 1 : 0.8,
//   }));
// }