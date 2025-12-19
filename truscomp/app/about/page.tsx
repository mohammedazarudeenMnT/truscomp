import AboutHeroSection from "@/components/about/hero-section";
import FoundersSection from "@/components/about/founders-section";
import ImpactSection from "@/components/about/impact-section";
import WhyTrusCompSection from "@/components/about/why-truscomp-section";
import FaqSection from "@/components/about/faq-section";
import { AboutCtaSection } from "@/components/about/cta-section";

export default function AboutPage() {
  return (
    <main>
      <AboutHeroSection />
      <FoundersSection />
      <ImpactSection />
      <WhyTrusCompSection />
      <FaqSection />
      <AboutCtaSection />
    </main>
  );
}
