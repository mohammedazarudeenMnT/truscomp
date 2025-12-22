import ParallaxHero from "@/components/ui/parallax-hero";

interface TeamHeroSectionProps {
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

export default function TeamHeroSection({ data }: TeamHeroSectionProps) {
  const backgroundImage = data?.backgroundImage || "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=2000&h=1200&fit=crop";
  const subheading = data?.subheading || "Meet Our Team";
  const heading = data?.heading || "The Team Behind TrusComp";
  const description = data?.description || "At TrusComp, our team is the driving force behind our mission to simplify compliance and deliver transformative solutions. Led by visionary founders and an experienced leadership team, we combine decades of expertise with a passion for innovation to ensure unmatched service and results.";
  const buttons = data?.buttons || [
    {
      text: "Schedule a Call",
      href: "/contact",
      icon: "PhoneCall",
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
