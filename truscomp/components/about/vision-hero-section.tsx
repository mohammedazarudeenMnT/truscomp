import ParallaxHero from "@/components/ui/parallax-hero";

interface VisionHeroSectionProps {
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

export default function VisionHeroSection({ data }: VisionHeroSectionProps) {
  const backgroundImage = data?.backgroundImage || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=2000&h=1200&fit=crop";
  const subheading = data?.subheading || "Our Purpose";
  const heading = data?.heading || "Vision, Mission, and Core Values";
  const description = data?.description || "Our guiding principles that drive us to transform compliance management and empower businesses across India.";
  const buttons = data?.buttons || [
    {
      text: "Get Started",
      href: "/contact",
      icon: "Target",
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
