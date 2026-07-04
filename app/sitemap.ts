import { MetadataRoute } from "next";

const BASE_URL = "https://www.ooshasprep.com"; // Replace with your domain

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "gre",
    "ielts",
    "pte",
    "sat",
    "duolingo",
    "about",
    "contact",
    "blogs",
    "privacy-policy",
    "terms-and-conditions",
  ];

  return routes.map((route) => ({
    url: `${BASE_URL}/${route}`.replace(/\/$/, ""),
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.8,
  }));
}