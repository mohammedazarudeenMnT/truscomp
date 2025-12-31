"use client";

import React from "react";
import { CtaHero } from "@/components/ui/cta-hero";

interface ArchCtaSectionProps {
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

export default function ArchCtaSection({ data }: ArchCtaSectionProps) {
  const badge = data?.badge || "Advanced Technology";
  const heading =
    (data?.title ?? data?.heading) || "Experience Enterprise-Grade Compliance";
  const description =
    data?.description ||
    "Our cutting-edge software architecture delivers security, scalability, and reliability at every layer. Discover how our technology powers compliance excellence.";
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
      : [
          {
            text: "Request a Demo",
            href: "/demo",
            variant: "secondary" as const,
            icon: "ArrowRight",
          },
          {
            text: "Explore Features",
            href: "/features",
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
