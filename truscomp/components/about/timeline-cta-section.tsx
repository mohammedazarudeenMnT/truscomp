"use client";

import React from "react";
import { CtaHero } from "@/components/ui/cta-hero";

export default function TimelineCtaSection() {
  return (
    <CtaHero
      badge="Structured Implementation"
      heading="Start Your 8-Week Transformation"
      description="Our proven phased approach ensures smooth, successful compliance implementation. Join hundreds of companies that have transformed their operations with TrusComp."
      buttons={[
        {
          text: "Begin Implementation",
          href: "/contact",
          variant: "secondary",
          icon: "ArrowRight",
        },
        {
          text: "Download Timeline",
          href: "/resources/timeline",
          variant: "outline",
        },
      ]}
      isDark={true}
    />
  );
}
