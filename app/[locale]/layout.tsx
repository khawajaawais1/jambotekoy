import type { Metadata, Viewport } from "next";
import { Anton, Cormorant, Inter } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import "../globals.css";
import { routing } from "@/i18n/routing";
import { SITE_URL, BUSINESS, pageMetadata } from "@/lib/seo";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";

const anton = Anton({ subsets: ["latin"], weight: "400", variable: "--font-anton" });
const cormorant = Cormorant({ subsets: ["latin"], weight: ["500", "600"], style: ["italic"], variable: "--font-cormorant" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    metadataBase: new URL(SITE_URL),
    icons: { icon: "/favicon.png" },
    robots: { index: true, follow: true },
    // Not using a title template: every page's translated title already
    // ends in "— Jambotek Oy" by hand, so a template would double it up.
    ...pageMetadata({ pathname: "/", locale, title: t("title"), description: t("description") })
  };
}

function LocalBusinessJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    "@id": `${SITE_URL}/#business`,
    name: BUSINESS.name,
    legalName: BUSINESS.legalName,
    taxID: BUSINESS.taxID,
    url: SITE_URL,
    image: `${SITE_URL}/images/exterior-wide.jpg`,
    logo: `${SITE_URL}/images/logo-icon.png`,
    telephone: BUSINESS.telephone,
    email: BUSINESS.email,
    priceRange: "€€",
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS.streetAddress,
      postalCode: BUSINESS.postalCode,
      addressLocality: BUSINESS.addressLocality,
      addressCountry: BUSINESS.addressCountry
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: BUSINESS.latitude,
      longitude: BUSINESS.longitude
    },
    areaServed: {
      "@type": "City",
      name: "Jyväskylä"
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "17:00"
      }
    ],
    founder: {
      "@type": "Person",
      name: BUSINESS.founder
    },
    sameAs: BUSINESS.sameAs
  };

  return (
    <script
      type="application/ld+json"
      // Safe: jsonLd is built entirely from static, developer-controlled
      // constants above — no user input ever flows into this object.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export const viewport: Viewport = { themeColor: "#0a0a0a" };

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <html lang={locale} className={`${anton.variable} ${cormorant.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">
        <LocalBusinessJsonLd />
        <NextIntlClientProvider>
          <SmoothScroll />
          <Nav />
          <main>{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
