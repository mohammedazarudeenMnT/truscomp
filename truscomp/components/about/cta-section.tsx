"use client";

import React from "react";
import { CtaHero } from "@/components/ui/cta-hero";

interface AboutCtaSectionProps {
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

export const AboutCtaSection: React.FC<AboutCtaSectionProps> = ({ data }) => {
  const badge = data?.badge ?? "";
  const heading = data?.title ?? data?.heading ?? "";
  const description = data?.description ?? "";
  const buttons =
    data?.buttons ||
    (data?.primaryButtonText
      ? [
          {
            text: data.primaryButtonText,
            href: data.primaryButtonLink ?? "/contact",
            variant: "secondary" as const,
            icon: "ArrowRight",
          },
          ...(data.secondaryButtonText
            ? [
                {
                  text: data.secondaryButtonText,
                  href: data.secondaryButtonLink ?? "/contact",
                  variant: "outline" as const,
                },
              ]
            : []),
        ]
      : []);
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
