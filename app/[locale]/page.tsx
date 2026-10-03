import Hero from "@/components/Hero";
import BrandMarquee from "@/components/BrandMarquee";
import SystemsReveal from "@/components/SystemsReveal";
import ServiceShowcase from "@/components/ServiceShowcase";
import WorkshopGallery from "@/components/WorkshopGallery";
import LiveAtTheShop from "@/components/LiveAtTheShop";
import StatsGrid from "@/components/StatsGrid";
import Testimonials from "@/components/Testimonials";
import LocationCard from "@/components/LocationCard";
import BigCTA from "@/components/BigCTA";
import { getTranslations } from "next-intl/server";
import { SITE_URL, BUSINESS, localizedAlternates, ogLocale } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const { canonical, languages } = localizedAlternates("/", locale);
  return {
    title: t("title"),
    description: t("description"),
    alternates: { canonical, languages },
    openGraph: { type: "website", url: canonical, locale: ogLocale(locale), title: t("title"), description: t("description") },
    twitter: { card: "summary_large_image", title: t("title"), description: t("description") }
  };
}

function WebsiteJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: BUSINESS.name,
    url: SITE_URL
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;
}

export default function Home() {
  return (
    <>
      <WebsiteJsonLd />
      <Hero />
      <BrandMarquee />
      <SystemsReveal />
      <ServiceShowcase />
      <WorkshopGallery />
      <LiveAtTheShop />
      <StatsGrid />
      <Testimonials />
      <LocationCard />
      <BigCTA />
    </>
  );
}
