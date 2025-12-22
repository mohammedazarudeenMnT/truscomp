"use client";

import React from "react";
import { CtaHero } from "@/components/ui/cta-hero";

interface AboutCtaSectionProps {
  data?: {
    badge?: string;
    heading?: string;
    description?: string;
    buttons?: Array<{
      text: string;
      href: string;
      variant?: "default" | "secondary" | "outline";
      icon?: string;
    }>;
    isDark?: boolean;
  } | null;
}

export const AboutCtaSection: React.FC<AboutCtaSectionProps> = ({ data }) => {
  const badge = data?.badge || "Ready to Partner?";
  const heading = data?.heading || "Transform Your Compliance Strategy";
  const description = data?.description || "Discover how TrusComp's proven methodology has helped hundreds of enterprises streamline their compliance operations. Schedule a consultation to explore your options.";
  const buttons = data?.buttons || [
    {
      text: "Schedule Consultation",
      href: "/contact",
      variant: "secondary" as const,
      icon: "ArrowRight",
    },
    {
      text: "View Case Studies",
      href: "/case-studies",
      variant: "outline" as const,
    },
  ];
  const isDark = data?.isDark ?? true;

  return (
    <CtaHero
      badge={badge}
      heading={heading}
      description={description}
      buttons={buttons}
      isDark={isDark}
    />
  );
};
