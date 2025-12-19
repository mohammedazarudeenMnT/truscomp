import ParallaxHero from "@/components/ui/parallax-hero";

export default function ArchHeroSection() {
  return (
    <ParallaxHero
      backgroundImage="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=2000&h=1200&fit=crop"
      subheading="Advanced Technology"
      heading="Software Architecture: The Engine Behind Our Solution"
      description="At TrusComp, technology powers everything we do. Our advanced software architecture ensures efficient, secure, and scalable compliance solutions tailored to meet the demands of modern businesses. Explore the key technological features that make our platform a leader in compliance management."
      buttons={[
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
      ]}
    />
  );
}
