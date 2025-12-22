"use client";

import React from "react";
import AnimatedSections from "@/components/ui/animated-sections-1";

interface HeroSectionProps {
  className?: string;
  data?: {
    sections: Array<{
      title: string;
      text: string;
      description: string;
      buttonText: string;
      buttonLink: string;
      img: string;
    }>;
  };
}

export const HeroSection: React.FC<HeroSectionProps> = ({ className, data }) => {
  // Default sections as fallback
  const defaultSections = [
    {
      title: "Welcome to TrusComp",
      text: "Comprehensive Compliance Solutions",
      description: "Transforming regulatory adherence through innovation and expertise. Guided by Trust, Transparency, and Transformation.",
      buttonText: "Get Started",
      buttonLink: "/contact",
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1920&h=1080&fit=crop&crop=center"
    },
    {
      title: "7+ Years of Excellence",
      text: "Expertise You Can Trust",
      description: "With 60+ compliance specialists, we deliver customized solutions across diverse industries with unwavering commitment to excellence.",
      buttonText: "Learn More",
      buttonLink: "/about",
      img: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1920&h=1080&fit=crop&crop=center"
    },
    {
      title: "Innovation Meets Compliance",
      text: "Future-Ready Compliance",
      description: "Leveraging cutting-edge technology and deep domain expertise in labor law, consulting, and automation to keep you ahead of the curve.",
      buttonText: "Our Services",
      buttonLink: "/services",
      img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&h=1080&fit=crop&crop=center"
    },
    {
      title: "Industry Leaders Choose Us",
      text: "Trusted by 100+ Companies",
      description: "Join Blue Star, Reckitt Benckiser, Ola Electric, and other industry leaders who trust us for flawless compliance management.",
      buttonText: "View Case Studies",
      buttonLink: "/case-studies",
      img: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1920&h=1080&fit=crop&crop=center"
    }
  ];

  const sections = data?.sections || defaultSections;

  return (
    <section className={`${className}`}>
      <AnimatedSections sections={sections} />
    </section>
  );
};