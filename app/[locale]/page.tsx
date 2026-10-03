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
import { SITE_URL, BUSINESS } from "@/lib/seo";

// No generateMetadata here — the root layout's generateMetadata already
// targets "/" and provides full title/description/OG/canonical for the
// homepage. A duplicate here would win Next's metadata merge and silently
// drop fields (like og:image) that aren't re-specified.

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
