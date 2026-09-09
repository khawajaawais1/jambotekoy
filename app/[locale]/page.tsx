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

export default function Home() {
  return (
    <>
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
