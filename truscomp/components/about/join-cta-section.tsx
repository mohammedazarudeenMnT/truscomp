"use client";

import React from "react";
import { CtaHero } from "@/components/ui/cta-hero";

interface JoinCTASectionProps {
  data?: {
    badge?: string;
    title?: string;
    heading?: string;
    description?: string;
    primaryButtonText?: string;
    primaryButtonLink?: string;
    secondaryButtonText?: string;
    secondaryButtonLink?: string;
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
  const badge = data?.badge ?? "";
  const heading =
    (data?.title ?? data?.heading) || "Do you want to work with us?";
  const description =
    data?.description ||
    "Join a team that values innovation, integrity, and impact. Let's build the future of compliance together.";
  const buttons =
    data?.buttons ||
    (data?.primaryButtonText
      ? [
          {
            text: data.primaryButtonText,
            href: data.primaryButtonLink ?? "/careers",
            variant: "secondary" as const,
            icon: "ArrowRight",
          },
          ...(data.secondaryButtonText
            ? [
                {
                  text: data.secondaryButtonText,
                  href: data.secondaryButtonLink ?? "/careers",
                  variant: "outline" as const,
                },
              ]
            : []),
        ]
      : [
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
        ]);
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
