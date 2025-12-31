import ParallaxHero from "@/components/ui/parallax-hero";

interface ParallaxHeroButton {
  text: string;
  href: string;
  icon?: string;
  variant?: "default" | "outline";
}

interface TeamHeroSectionProps {
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

export default function TeamHeroSection({ data }: TeamHeroSectionProps) {
  const backgroundImage =
    data?.backgroundImage ||
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=2000&h=1200&fit=crop";
  const subheading = data?.subheading || "Meet Our Team";
  const heading = data?.heading || "The Team Behind TrusComp";
  const description =
    data?.description ||
    "At TrusComp, our team is the driving force behind our mission to simplify compliance and deliver transformative solutions. Led by visionary founders and an experienced leadership team, we combine decades of expertise with a passion for innovation to ensure unmatched service and results.";
  
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
        icon: "PhoneCall",
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
