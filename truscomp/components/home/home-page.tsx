"use client";

import React from "react";
import { HeroSection } from "./hero-section";
import { WhyChooseSection } from "./why-choose-section";
import { FaqSection } from "./faq-section";
import { CtaSection } from "./cta-section";

export const HomePage: React.FC = () => {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <WhyChooseSection />
      <FaqSection />
      <CtaSection />
    </main>
  );
};