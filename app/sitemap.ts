import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { absoluteUrl } from "@/lib/seo";

type Route = { path: "/" | "/about" | "/services" | "/contact"; priority: number; changeFrequency: "weekly" | "monthly" };

const ROUTES: Route[] = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" },
  { path: "/services", priority: 0.9, changeFrequency: "monthly" },
  { path: "/about", priority: 0.7, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.8, changeFrequency: "monthly" }
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return ROUTES.flatMap((route) => {
    const languages: Record<string, string> = {};
    for (const locale of routing.locales) {
      languages[locale] = absoluteUrl(route.path, locale);
    }

    return routing.locales.map((locale) => ({
      url: languages[locale],
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: { languages }
    }));
  });
}
