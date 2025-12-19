"use client";

import React from "react";
import { CtaHero } from "@/components/ui/cta-hero";

export const VisionCtaSection: React.FC = () => {
  return (
    <CtaHero
      badge="Live Our Values"
      heading="Be Part of Our Vision"
      description="Join us in creating a world where compliance is simple, transparent, and empowering. Together, we're building the future of business integrity."
      buttons={[
        {
          text: "Get Started Today",
          href: "/contact",
          variant: "secondary",
          icon: "ArrowRight",
        },
        {
          text: "Contact Us",
          href: "/contact",
          variant: "outline",
        },
      ]}
      isDark={true}
    />
  );
};
