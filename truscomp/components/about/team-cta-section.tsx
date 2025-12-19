"use client";

import React from "react";
import { CtaHero } from "@/components/ui/cta-hero";

export const TeamCtaSection: React.FC = () => {
  return (
    <CtaHero
      badge="Join Our Mission"
      heading="Build Your Career at TrusComp"
      description="Work alongside industry experts who are reshaping compliance management. Explore exciting opportunities to grow your career and make an impact."
      buttons={[
        {
          text: "View Open Positions",
          href: "/careers",
          variant: "secondary",
          icon: "ArrowRight",
        },
        {
          text: "Learn About Our Culture",
          href: "/about/culture",
          variant: "outline",
        },
      ]}
      isDark={true}
    />
  );
};
