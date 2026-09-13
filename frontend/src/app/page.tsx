// frontend/src/app/page.tsx
import HeroSection from "@/components/HeroSection";
import FeaturedProjects from "@/components/FeaturedProjects";
import ExpertisesPreview from "@/components/ExpertisesPreview";
import AgencyPreview from "@/components/AgencyPreview";
import ContactCTA from "@/components/ContactCTA";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <main className="bg-ivoire text-encre min-h-screen">
      <HeroSection />
      <FeaturedProjects />
      <ExpertisesPreview />
      <AgencyPreview />
      <ContactCTA />
      <Footer />
    </main>
  );
}