import TeamHeroSection from "@/components/about/team-hero-section";
import TeamFoundersSection from "@/components/about/team-founders-section";
import TeamLeadershipSection from "@/components/about/team-leadership-section";
import TeamLegacySection from "@/components/about/team-legacy-section";
import TeamFaqSection from "@/components/about/team-faq-section";
import { TeamCtaSection } from "@/components/about/team-cta-section";

export default function OurTeamPage() {
  return (
    <main>
      <TeamHeroSection />
      <TeamFoundersSection />
      <TeamLeadershipSection />
      <TeamLegacySection />
      <TeamFaqSection />
      <TeamCtaSection />
    </main>
  );
}
