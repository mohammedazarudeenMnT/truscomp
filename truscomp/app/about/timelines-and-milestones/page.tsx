import TimelineHeroSection from "@/components/about/timeline-hero-section";
import TimelinePhasesSection from "@/components/about/timeline-phases-section";
import TimelineWhySection from "@/components/about/timeline-why-section";
import TimelineFaqSection from "@/components/about/timeline-faq-section";
import TimelineCtaSection from "@/components/about/timeline-cta-section";

export default function TimelinesAndMilestonesPage() {
    return (
        <main>
            <TimelineHeroSection />
            <TimelinePhasesSection />
            <TimelineWhySection />
            <TimelineFaqSection />
            <TimelineCtaSection />
        </main>
    );
}
