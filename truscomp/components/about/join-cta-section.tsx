"use client";

import React from "react";
import { CtaHero } from "@/components/ui/cta-hero";

interface JoinCTASectionProps {
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

export default function JoinCTASection({ data }: JoinCTASectionProps) {
  const badge = data?.badge || "Careers at TrusComp";
  const heading = data?.heading || "Do you want to work with us?";
  const description = data?.description || "Join a team that values innovation, integrity, and impact. Let's build the future of compliance together.";
  const buttons = data?.buttons || [
    {
      text: "Join Here",
      href: "/careers",
      variant: "secondary" as const,
      icon: "ArrowRight",
    },
    {
      text: "View Openings",
      href: "/careers",
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
}
