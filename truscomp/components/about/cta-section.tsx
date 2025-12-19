"use client";

import React from "react";
import { CtaHero } from "@/components/ui/cta-hero";

export const AboutCtaSection: React.FC = () => {
  return (
    <CtaHero
      badge="Ready to Partner?"
      heading="Transform Your Compliance Strategy"
      description="Discover how TrusComp's proven methodology has helped hundreds of enterprises streamline their compliance operations. Schedule a consultation to explore your options."
      buttons={[
        {
          text: "Schedule Consultation",
          href: "/contact",
          variant: "secondary",
          icon: "ArrowRight",
        },
        {
          text: "View Case Studies",
          href: "/case-studies",
          variant: "outline",
        },
      ]}
      isDark={true}
    />
  );
};
