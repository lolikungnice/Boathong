import type { MetadataRoute } from "next";

const baseUrl = "https://boathong.example.com";
const routes = ["", "/menu", "/about", "/access", "/reservation", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.7,
  }));
}
