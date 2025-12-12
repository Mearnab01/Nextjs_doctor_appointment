import CTA from "@/components/homepage/CTA";
import FeaturesSection from "@/components/homepage/FeaturesSection";
import HeroSection from "@/components/homepage/HeroSection";
import PricingSection from "@/components/homepage/PricingSection";
import TestimonialsSection from "@/components/homepage/TestimonialsSection";

const HomePage = () => {
  return (
    <div className="bg-background">
      <HeroSection />
      <FeaturesSection />
      <PricingSection />
      <TestimonialsSection />
      <CTA />
    </div>
  );
};

export default HomePage;
