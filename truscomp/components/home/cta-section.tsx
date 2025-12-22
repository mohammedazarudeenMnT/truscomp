"use client";

import React from "react";
import { CtaHero } from "@/components/ui/cta-hero";

interface CtaSectionProps {
  data?: {
    badge: string;
    heading: string;
    description: string;
    buttons: Array<{
      text: string;
      href: string;
      variant: "primary" | "secondary" | "outline";
      icon: string;
    }>;
    isDark: boolean;
  };
}

export const CtaSection: React.FC<CtaSectionProps> = ({ data }) => {
  // Default data as fallback
  const defaultData = {
    badge: "Ready to Get Started?",
    heading: "Transform Your Compliance Journey Today",
    description: "Join hundreds of businesses that trust TrusComp for seamless, automated compliance management. Start your transformation with our expert solutions.",
    buttons: [
      {
        text: "Get Started Now",
        href: "/contact",
        variant: "secondary" as const,
        icon: "ArrowRight",
      },
      {
        text: "Schedule Consultation",
        href: "/contact",
        variant: "outline" as const,
        icon: "",
      },
    ],
    isDark: true,
  };

  const sectionData = data || defaultData;

  return (
    <CtaHero
      badge={sectionData.badge}
      heading={sectionData.heading}
      description={sectionData.description}
      buttons={sectionData.buttons}
      isDark={sectionData.isDark}
    />
  );
};
