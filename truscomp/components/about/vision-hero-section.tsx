import ParallaxHero from "@/components/ui/parallax-hero";

interface ParallaxHeroButton {
  text: string;
  href: string;
  icon?: string;
  variant?: "default" | "outline";
}

interface VisionHeroSectionProps {
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
      variant?: string;
    }>;
    // Old format (for backward compatibility)
    primaryButtonText?: string;
    primaryButtonLink?: string;
    secondaryButtonText?: string;
    secondaryButtonLink?: string;
  } | null;
}

export default function VisionHeroSection({ data }: VisionHeroSectionProps) {
  const backgroundImage =
    data?.backgroundImage ||
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=2000&h=1200&fit=crop";
  const subheading = data?.subheading || "Our Purpose";
  const heading = data?.heading || "Vision, Mission, and Core Values";
  const description =
    data?.description ||
    "Our guiding principles that drive us to transform compliance management and empower businesses across India.";

  // Handle both old format (primaryButtonText/secondaryButtonText) and new format (buttons array)
  let buttons: ParallaxHeroButton[];
  if (data?.buttons && data.buttons.length > 0) {
    // New format - use buttons array (with type assertion for compatibility)
    buttons = data.buttons.map((btn) => ({
      text: btn.text,
      href: btn.href,
      icon: btn.icon,
      variant: (btn.variant === "outline" ? "outline" : "default") as
        | "outline"
        | "default",
    }));
  } else if (data?.primaryButtonText || data?.secondaryButtonText) {
    // Old format - convert to buttons array
    buttons = [];
    if (data.primaryButtonText) {
      buttons.push({
        text: data.primaryButtonText,
        href: data.primaryButtonLink || "/contact",
        icon: "Target",
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
