"use client";

import React from "react";
import { CtaHero } from "@/components/ui/cta-hero";

export const CtaSection: React.FC = () => {
  return (
    <CtaHero
      badge="Ready to Get Started?"
      heading="Transform Your Compliance Journey Today"
      description="Join hundreds of businesses that trust TrusComp for seamless, automated compliance management. Start your transformation with our expert solutions."
      buttons={[
        {
          text: "Get Started Now",
          href: "/contact",
          variant: "secondary",
          icon: "ArrowRight",
        },
        {
          text: "Schedule Consultation",
          href: "/contact",
          variant: "outline",
        },
      ]}
      isDark={true}
    />
  );
};
