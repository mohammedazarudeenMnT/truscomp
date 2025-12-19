"use client";

import React from "react";
import { CtaHero } from "@/components/ui/cta-hero";

export default function ArchCtaSection() {
  return (
    <CtaHero
      badge="Advanced Technology"
      heading="Experience Enterprise-Grade Compliance"
      description="Our cutting-edge software architecture delivers security, scalability, and reliability at every layer. Discover how our technology powers compliance excellence."
      buttons={[
        {
          text: "Request a Demo",
          href: "/demo",
          variant: "secondary",
          icon: "ArrowRight",
        },
        {
          text: "Explore Features",
          href: "/features",
          variant: "outline",
        },
      ]}
      isDark={true}
    />
  );
}
