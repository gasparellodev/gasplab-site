import type { MetadataRoute } from "next";
import { cases, services, site } from "@/lib/content";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;
  return [
    "",
    "/cases",
    "/sobre",
    "/diagnostico",
    "/privacidade",
    "/termos",
    ...services.map((s) => `/servicos/${s.slug}`),
    ...cases.map((c) => `/cases/${c.slug}`),
  ].map((url) => ({
    url: base + url,
    lastModified: new Date(),
    changeFrequency: url === "" ? "weekly" : "monthly",
  }));
}
