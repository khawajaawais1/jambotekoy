import { absoluteUrl } from "@/lib/seo";

type Crumb = { name: string; path: "/" | "/about" | "/services" | "/contact" };

// Matches the visible "Home / Page" breadcrumb rendered on each inner page —
// gives Google a breadcrumb rich-snippet instead of a bare URL in results.
export default function BreadcrumbJsonLd({ locale, items }: { locale: string; items: Crumb[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path, locale)
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
