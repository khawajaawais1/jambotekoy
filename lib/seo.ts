import { getPathname } from "@/i18n/routing";
import { routing } from "@/i18n/routing";

// Hardcoded fallback matches the real production domain, so nothing breaks
// even if NEXT_PUBLIC_SITE_URL is missing from a deploy target's env vars.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://jambotek.fi").replace(/\/$/, "");

// Single source of truth for the business's real-world identity (NAP —
// name/address/phone), reused by JSON-LD structured data across the site.
// Keep in sync with the address/contact details rendered in Footer.tsx,
// LocationCard.tsx and ContactPageClient.tsx.
export const BUSINESS = {
  name: "Jambotek Oy",
  legalName: "Jambotek Oy",
  taxID: "3373658-3",
  telephone: "+358451824414",
  email: "jambotek6@gmail.com",
  streetAddress: "Yritystie 10 A 5",
  postalCode: "40320",
  addressLocality: "Jyväskylä",
  addressCountry: "FI",
  // Geocoded from the address above (OpenStreetMap Nominatim) — update if the
  // business relocates.
  latitude: 62.2875813,
  longitude: 25.8214537,
  founder: "Joseph Kiuna Kamau",
  sameAs: ["https://www.facebook.com/profile.php?id=61594088317755", "https://www.instagram.com/jambotekoy/"]
} as const;

type AppPathname = "/" | "/about" | "/services" | "/contact";

/**
 * Canonical + hreflang alternates for a given app route, across both locales.
 * Keeps metadata correct for next-intl's "as-needed" prefix strategy (fi is
 * unprefixed, en lives under /en) without hardcoding path-prefix logic here.
 */
export function absoluteUrl(pathname: AppPathname, locale: string) {
  // getPathname returns "" (not "/") for the unprefixed default-locale root,
  // which would otherwise produce a path-less URL like "https://jambotek.fi".
  const path = getPathname({ href: pathname, locale }) || "/";
  return `${SITE_URL}${path}`;
}

export function localizedAlternates(pathname: AppPathname, currentLocale: string) {
  const languages: Record<string, string> = {};
  for (const locale of routing.locales) {
    languages[locale] = absoluteUrl(pathname, locale);
  }
  // x-default points at the Finnish version — the site's default locale.
  languages["x-default"] = absoluteUrl(pathname, routing.defaultLocale);

  return {
    canonical: languages[currentLocale],
    languages
  };
}

export function ogLocale(locale: string) {
  return locale === "en" ? "en_US" : "fi_FI";
}

const OG_IMAGES = [{ url: "/og-image.jpg", width: 1200, height: 630, alt: BUSINESS.name }];

/**
 * Full per-page metadata block (canonical/hreflang + Open Graph + Twitter).
 * Next.js's metadata merging REPLACES a parent's `openGraph`/`twitter` object
 * wholesale when a page defines its own — it does not deep-merge per field —
 * so every page must re-specify `images` itself or og:image silently
 * disappears site-wide. Centralized here so that can't happen again.
 */
export function pageMetadata({
  pathname,
  locale,
  title,
  description
}: {
  pathname: AppPathname;
  locale: string;
  title: string;
  description: string;
}) {
  const { canonical, languages } = localizedAlternates(pathname, locale);
  return {
    title,
    description,
    alternates: { canonical, languages },
    openGraph: {
      type: "website" as const,
      siteName: BUSINESS.name,
      url: canonical,
      locale: ogLocale(locale),
      title,
      description,
      images: OG_IMAGES
    },
    twitter: {
      card: "summary_large_image" as const,
      title,
      description,
      images: OG_IMAGES.map((i) => i.url)
    }
  };
}
