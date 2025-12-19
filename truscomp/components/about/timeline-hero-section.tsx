import ParallaxHero from "@/components/ui/parallax-hero";

export default function TimelineHeroSection() {
    return (
        <ParallaxHero
            backgroundImage="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=2000&h=1200&fit=crop"
            subheading="Our Process"
            heading="Timelines and Milestones"
            description="At TrusComp, we pride ourselves on delivering effective project implementation through a structured approach with clear timelines and milestones. Our phased delivery framework ensures a seamless transition to compliance and operational efficiency."
            buttons={[
                {
                    text: "Book Now",
                    href: "/contact",
                    icon: "Calendar",
                },
                {
                    text: "Learn More",
                    href: "/about",
                    icon: "ArrowRight",
                    variant: "outline",
                },
            ]}
        />
    );
}
