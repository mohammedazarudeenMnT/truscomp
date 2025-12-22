import ParallaxHero from "@/components/ui/parallax-hero";

interface ArchHeroSectionProps {
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

export default function ArchHeroSection({ data }: ArchHeroSectionProps) {
  const backgroundImage = data?.backgroundImage || "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=2000&h=1200&fit=crop";
  const subheading = data?.subheading || "Advanced Technology";
  const heading = data?.heading || "Software Architecture: The Engine Behind Our Solution";
  const description = data?.description || "At TrusComp, technology powers everything we do. Our advanced software architecture ensures efficient, secure, and scalable compliance solutions tailored to meet the demands of modern businesses. Explore the key technological features that make our platform a leader in compliance management.";
  const buttons = data?.buttons || [
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
