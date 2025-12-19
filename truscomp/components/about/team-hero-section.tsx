import ParallaxHero from "@/components/ui/parallax-hero";

export default function TeamHeroSection() {
  return (
    <ParallaxHero
      backgroundImage="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=2000&h=1200&fit=crop"
      subheading="Meet Our Team"
      heading="The Team Behind TrusComp"
      description="At TrusComp, our team is the driving force behind our mission to simplify compliance and deliver transformative solutions. Led by visionary founders and an experienced leadership team, we combine decades of expertise with a passion for innovation to ensure unmatched service and results."
      buttons={[
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
      ]}
    />
  );
}
