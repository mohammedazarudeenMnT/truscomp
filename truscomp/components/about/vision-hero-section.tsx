import ParallaxHero from "@/components/ui/parallax-hero";

export default function VisionHeroSection() {
  return (
    <ParallaxHero
      backgroundImage="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=2000&h=1200&fit=crop"
      subheading="Our Purpose"
      heading="Vision, Mission, and Core Values"
      description="Our guiding principles that drive us to transform compliance management and empower businesses across India."
      buttons={[
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
      ]}
    />
  );
}
