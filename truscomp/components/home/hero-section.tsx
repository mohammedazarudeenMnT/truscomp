"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

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

interface HeroSectionData {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  backgroundImage: string;
}

interface ModernHeroCarouselProps {
  sections: HeroSectionData[];
  autoPlayInterval?: number;
}

const defaultSections: HeroSectionData[] = [
  {
    id: 1,
    title: "Welcome to TrusComp",
    subtitle: "Comprehensive Compliance Solutions",
    description:
      "Transforming regulatory adherence through innovation and expertise. Guided by Trust, Transparency, and Transformation.",
    buttonText: "Get Started",
    buttonLink: "/contact",
    backgroundImage:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1920&h=1080&fit=crop&crop=center",
  },
  {
    id: 2,
    title: "7+ Years of Excellence",
    subtitle: "Expertise You Can Trust",
    description:
      "With 60+ compliance specialists, we deliver customized solutions across diverse industries with unwavering commitment to excellence.",
    buttonText: "Learn More",
    buttonLink: "/about",
    backgroundImage:
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1920&h=1080&fit=crop&crop=center",
  },
  {
    id: 3,
    title: "Innovation Meets Compliance",
    subtitle: "Future-Ready Compliance",
    description:
      "Leveraging cutting-edge technology and deep domain expertise in labor law, consulting, and automation to keep you ahead of the curve.",
    buttonText: "Our Services",
    buttonLink: "/services",
    backgroundImage:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&h=1080&fit=crop&crop=center",
  },
  {
    id: 4,
    title: "Industry Leaders Choose Us",
    subtitle: "Trusted by 100+ Companies",
    description:
      "Join Blue Star, Reckitt Benckiser, Ola Electric, and other industry leaders who trust us for flawless compliance management.",
    buttonText: "View Case Studies",
    buttonLink: "/case-studies",
    backgroundImage:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1920&h=1080&fit=crop&crop=center",
  },
];

const containerVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: "easeOut",
      staggerChildren: 0.1,
    } as any,
  },
  exit: {
    opacity: 0,
    y: -20,
    filter: "blur(10px)",
    transition: {
      duration: 0.5,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: "easeOut",
    } as any,
  },
};

function ModernHeroCarousel({
  sections = defaultSections,
  autoPlayInterval = 5000,
}: ModernHeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const nextSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % sections.length);
    setTimeout(() => setIsAnimating(false), 800);
  }, [isAnimating, sections.length]);

  const prevSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + sections.length) % sections.length);
    setTimeout(() => setIsAnimating(false), 800);
  }, [isAnimating, sections.length]);

  const goToSlide = useCallback(
    (index: number) => {
      if (isAnimating || index === currentIndex) return;
      setIsAnimating(true);
      setCurrentIndex(index);
      setTimeout(() => setIsAnimating(false), 800);
    },
    [isAnimating, currentIndex]
  );

  useEffect(() => {
    if (autoPlayInterval > 0) {
      autoPlayRef.current = setInterval(() => {
        nextSlide();
      }, autoPlayInterval);

      return () => {
        if (autoPlayRef.current) {
          clearInterval(autoPlayRef.current);
        }
      };
    }
  }, [currentIndex, autoPlayInterval, nextSlide]);

  const currentSection = sections[currentIndex];

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSection.id}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 z-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${currentSection.backgroundImage})`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 flex min-h-screen flex-col">
        <div className="flex flex-1 items-center">
          <div className="mx-auto w-full max-w-7xl px-6 py-24 md:px-12 lg:px-16">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSection.id}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="max-w-3xl"
              >
                <motion.div variants={itemVariants} className="flex items-center gap-3">
                  <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-xs font-black uppercase tracking-[0.2em] text-primary border border-primary/20 backdrop-blur-md shadow-[0_0_20px_rgba(var(--primary-rgb),0.1)]">
                    {currentSection.subtitle}
                  </span>
                  <div className="h-px w-12 bg-gradient-to-r from-primary/50 to-transparent" />
                </motion.div>

                <motion.h1
                  variants={itemVariants}
                  className="mt-8 text-5xl font-extrabold tracking-tight text-white md:text-6xl lg:text-8xl drop-shadow-2xl"
                >
                  {currentSection.title}
                </motion.h1>

                <motion.p
                  variants={itemVariants}
                  className="mt-8 text-lg font-medium text-white/80 md:text-xl max-w-2xl leading-relaxed drop-shadow-md"
                >
                  {currentSection.description}
                </motion.p>

                <motion.div variants={itemVariants} className="mt-10">
                  <Link href={currentSection.buttonLink}>
                    <Button
                      size="lg"
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      {currentSection.buttonText}
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="relative z-20 pb-12">
          <div className="mx-auto w-full max-w-7xl px-6 md:px-12 lg:px-16">
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                {sections.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-300",
                      index === currentIndex
                        ? "w-12 bg-white"
                        : "w-8 bg-white/40 hover:bg-white/60"
                    )}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={prevSlide}
                  disabled={isAnimating}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-all hover:bg-white/20 disabled:opacity-50"
                  aria-label="Previous slide"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={nextSlide}
                  disabled={isAnimating}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-all hover:bg-white/20 disabled:opacity-50"
                  aria-label="Next slide"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  className,
  data,
}) => {
  const sections = data?.sections || defaultSections;

  // Map the data to the expected format
  const mappedSections: HeroSectionData[] = sections.map((section: any, index: number) => ({
    id: index + 1,
    title: section.title,
    subtitle: section.subtitle || section.text || "",
    description: section.description,
    buttonText: section.buttonText,
    buttonLink: section.buttonLink,
    backgroundImage: section.backgroundImage || section.img || "",
  }));

  return (
    <section className={cn("relative", className)}>
      <ModernHeroCarousel sections={mappedSections} />
    </section>
  );
};
