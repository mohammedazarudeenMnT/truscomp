import ParallaxHero from "@/components/ui/parallax-hero";

interface ParallaxHeroButton {
  text: string;
  href: string;
  icon?: string;
  variant?: "default" | "outline";
}

interface ArchHeroSectionProps {
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

export default function ArchHeroSection({ data }: ArchHeroSectionProps) {
  const backgroundImage =
    data?.backgroundImage ||
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=2000&h=1200&fit=crop";
  const subheading = data?.subheading || "Advanced Technology";
  const heading =
    data?.heading || "Software Architecture: The Engine Behind Our Solution";
  const description =
    data?.description ||
    "At TrusComp, technology powers everything we do. Our advanced software architecture ensures efficient, secure, and scalable compliance solutions tailored to meet the demands of modern businesses. Explore the key technological features that make our platform a leader in compliance management.";
  
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
        href: data.secondaryButtonLink || "/demo",
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
        text: "Book Demo",
        href: "/demo",
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
