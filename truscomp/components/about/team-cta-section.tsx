"use client";

import React from "react";
import { CtaHero } from "@/components/ui/cta-hero";

interface TeamCtaSectionProps {
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

export const TeamCtaSection: React.FC<TeamCtaSectionProps> = ({ data }) => {
  const badge = data?.badge || "Join Our Mission";
  const heading = data?.heading || "Build Your Career at TrusComp";
  const description = data?.description || "Work alongside industry experts who are reshaping compliance management. Explore exciting opportunities to grow your career and make an impact.";
  const buttons = data?.buttons || [
    {
      text: "View Open Positions",
      href: "/careers",
      variant: "secondary" as const,
      icon: "ArrowRight",
    },
    {
      text: "Learn About Our Culture",
      href: "/about/culture",
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
