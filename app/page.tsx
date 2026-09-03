import Hero from "@/components/Hero";
import BrandMarquee from "@/components/BrandMarquee";
import ServiceShowcase from "@/components/ServiceShowcase";
import WorkshopGallery from "@/components/WorkshopGallery";
import StatsGrid from "@/components/StatsGrid";
import StoryBlock from "@/components/StoryBlock";
import Testimonials from "@/components/Testimonials";
import LocationCard from "@/components/LocationCard";
import BigCTA from "@/components/BigCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <BrandMarquee />
      <ServiceShowcase />
      <WorkshopGallery />
      <StatsGrid />
      <StoryBlock />
      <Testimonials />
      <LocationCard />
      <BigCTA />
    </>
  );
}
