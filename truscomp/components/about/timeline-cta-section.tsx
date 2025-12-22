"use client";

import React from "react";
import { CtaHero } from "@/components/ui/cta-hero";

interface TimelineCtaSectionProps {
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

export default function TimelineCtaSection({ data }: TimelineCtaSectionProps) {
  const badge = data?.badge || "Structured Implementation";
  const heading = data?.heading || "Start Your 8-Week Transformation";
  const description = data?.description || "Our proven phased approach ensures smooth, successful compliance implementation. Join hundreds of companies that have transformed their operations with TrusComp.";
  const buttons = data?.buttons || [
    {
      text: "Begin Implementation",
      href: "/contact",
      variant: "secondary" as const,
      icon: "ArrowRight",
    },
    {
      text: "Download Timeline",
      href: "/resources/timeline",
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
