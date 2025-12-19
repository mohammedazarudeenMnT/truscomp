"use client";

import React from "react";
import { CtaHero } from "@/components/ui/cta-hero";

export default function JoinCTASection() {
  return (
    <CtaHero
      badge="Careers at TrusComp"
      heading="Do you want to work with us?"
      description="Join a team that values innovation, integrity, and impact. Let's build the future of compliance together."
      buttons={[
        {
          text: "Join Here",
          href: "/careers",
          variant: "secondary",
          icon: "ArrowRight",
        },
        {
          text: "View Openings",
          href: "/careers",
          variant: "outline",
        },
      ]}
      isDark={true}
    />
  );
}
