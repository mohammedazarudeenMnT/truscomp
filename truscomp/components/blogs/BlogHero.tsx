"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ArrowRight, Sparkles, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface BlogHeroProps {
  badge?: {
    text: string;
    icon?: React.ReactNode;
  };
  title: string;
  subtitle: string;
  primaryAction?: {
    label: string;
    onClick?: () => void;
    href?: string;
  };
  secondaryAction?: {
    label: string;
    onClick?: () => void;
    href?: string;
  };
  className?: string;
}

const transitionVariants = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  },
  item: {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        bounce: 0.3,
        duration: 1,
      },
    },
  },
};

export function BlogHero() {
  return (
    <section className="relative w-full overflow-hidden bg-background pt-24 pb-16 md:pt-32 md:pb-24">
      {/* Background Gradient */}
      <div className="absolute inset-0 -z-10 size-full [background:radial-gradient(125%_125%_at_50%_10%,transparent_0%,hsl(var(--primary)/0.05)_100%)]" />

      {/* Subtle Grid Pattern */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.015]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
      />

      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          variants={transitionVariants.container}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center"
        >
          {/* Badge */}
          <motion.div variants={transitionVariants.item}>
            <div className="inline-flex items-center gap-2 rounded-full border bg-background/50 backdrop-blur-sm px-4 py-2 text-sm mb-8">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-muted-foreground">
                Expert Insights & Resources
              </span>
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            variants={transitionVariants.item}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight max-w-4xl mb-6"
          >
            <span className="bg-gradient-to-br from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
              Knowledge Hub for Excellence
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={transitionVariants.item}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10"
          >
            Stay ahead with expert guidance on compliance, brand strategy, and
            service excellence
          </motion.p>

          {/* Search Bar */}
          <motion.div
            variants={transitionVariants.item}
            className="w-full max-w-2xl"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search articles, topics, or keywords..."
                className="pl-12 pr-4 py-6 text-base rounded-2xl border-2 focus-visible:ring-2"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
