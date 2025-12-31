"use client";

import React from "react";
import { HeroSection } from "./hero-section";
import { WhyChooseSection } from "./why-choose-section";
import { FaqSection } from "./faq-section";
import { CtaSection } from "./cta-section";

interface HomePageData {
  hero: {
    sections: Array<{
      title: string;
      text: string;
      description: string;
      buttonText: string;
      buttonLink: string;
      img: string;
    }>;
  };
  whySection: {
    title: string;
    subtitle: string;
    features: Array<{
      icon: string;
      title: string;
      description: string;
    }>;
    stats: Array<{
      number: string;
      label: string;
      className: string;
    }>;
    trustIndicators: string[];
  };
  faq: {
    badge: string;
    title: string;
    subtitle: string;
    description: string;
    image: string;
    items: Array<{
      question: string;
      answer: string;
    }>;
  };
  cta: {
    imageSrc: string;
    title: string;
    subtitle: string;
    description: string;
    buttonText: string;
    buttonLink: string;
  };
}

interface HomePageProps {
  initialData?: HomePageData | null;
}

export const HomePage: React.FC<HomePageProps> = ({ initialData }) => {
  return (
    <main className="min-h-screen">
      <noscript>
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                This page works best with JavaScript enabled. Some interactive
                features may not work properly.
              </p>
            </div>
          </div>
        </div>
      </noscript>

      <HeroSection data={initialData?.hero} />
      <WhyChooseSection data={initialData?.whySection} />
      <FaqSection data={initialData?.faq} />
      <CtaSection data={initialData?.cta} />
    </main>
  );
};
