import ParallaxHero from "@/components/ui/parallax-hero";

interface TimelineHeroSectionProps {
    data?: {
        backgroundImage?: string;
        subheading?: string;
        heading?: string;
        description?: string;
        buttons?: Array<{
            text: string;
            href: string;
            icon?: string;
            variant?: string;
        }>;
    } | null;
}

export default function TimelineHeroSection({ data }: TimelineHeroSectionProps) {
    const backgroundImage = data?.backgroundImage || "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=2000&h=1200&fit=crop";
    const subheading = data?.subheading || "Our Process";
    const heading = data?.heading || "Timelines and Milestones";
    const description = data?.description || "At TrusComp, we pride ourselves on delivering effective project implementation through a structured approach with clear timelines and milestones. Our phased delivery framework ensures a seamless transition to compliance and operational efficiency.";
    const buttons = data?.buttons || [
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
    ];

    return (
        <ParallaxHero
            backgroundImage={backgroundImage}
            subheading={subheading}
            heading={heading}
            description={description}
            buttons={buttons}
        />
    );
}
