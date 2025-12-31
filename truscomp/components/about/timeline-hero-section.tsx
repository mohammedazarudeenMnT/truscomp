import ParallaxHero from "@/components/ui/parallax-hero";

interface ParallaxHeroButton {
  text: string;
  href: string;
  icon?: string;
  variant?: "default" | "outline";
}

interface TimelineHeroSectionProps {
  data?: {
    backgroundImage?: string;
    subheading?: string;
    heading?: string;
    description?: string;
    // New format
    buttons?: Array<{
      text: string;
      href: string;
      icon?: string;
      variant?: "outline" | "default";
    }>;
    // Old format (for backward compatibility)
    primaryButtonText?: string;
    primaryButtonLink?: string;
    secondaryButtonText?: string;
    secondaryButtonLink?: string;
  } | null;
}

export default function TimelineHeroSection({
  data,
}: TimelineHeroSectionProps) {
  const backgroundImage =
    data?.backgroundImage ||
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=2000&h=1200&fit=crop";
  const subheading = data?.subheading || "Our Process";
  const heading = data?.heading || "Timelines and Milestones";
  const description =
    data?.description ||
    "At TrusComp, we pride ourselves on delivering effective project implementation through a structured approach with clear timelines and milestones. Our phased delivery framework ensures a seamless transition to compliance and operational efficiency.";
  
  // Handle both old format (primaryButtonText/secondaryButtonText) and new format (buttons array)
  let buttons: ParallaxHeroButton[];
  if (data?.buttons && data.buttons.length > 0) {
    // New format - use buttons array (with type assertion for compatibility)
    buttons = data.buttons.map(btn => ({
      text: btn.text,
      href: btn.href,
      icon: btn.icon,
      variant: (btn.variant === "outline" ? "outline" : "default") as "outline" | "default"
    }));
  } else if (data?.primaryButtonText || data?.secondaryButtonText) {
    // Old format - convert to buttons array
    buttons = [];
    if (data.primaryButtonText) {
      buttons.push({
        text: data.primaryButtonText,
        href: data.primaryButtonLink || "/contact",
        icon: "Calendar",
        variant: "default" as const,
      });
    }
    if (data.secondaryButtonText) {
      buttons.push({
        text: data.secondaryButtonText,
        href: data.secondaryButtonLink || "/about",
        icon: "ArrowRight",
        variant: "outline" as const,
      });
    }
  } else {
    // Fallback buttons
    buttons = [
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
  }

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
