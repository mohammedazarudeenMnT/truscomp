"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, LucideIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GridPattern } from "@/components/ui/grid-pattern";

interface CtaButton {
  text: string;
  href: string;
  variant?: "default" | "secondary" | "outline";
  icon?: string;
}

interface CtaHeroProps {
  badge?: string;
  heading: string;
  description: string;
  buttons: CtaButton[];
  isDark?: boolean;
  customBackground?: React.ReactNode;
}

const IconMap: { [key: string]: LucideIcon } = {
  ArrowRight,
  Sparkles,
};

export const CtaHero: React.FC<CtaHeroProps> = ({
  badge = "Ready to Transform?",
  heading,
  description,
  buttons,
  isDark = true,
  customBackground,
}) => {
  const bgColorClass = isDark
    ? "bg-primary text-primary-foreground"
    : "bg-accent text-accent-foreground";
  const textColorClass = isDark
    ? "text-primary-foreground/80"
    : "text-accent-foreground/80";

  return (
    <section className="py-20 lg:py-32 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div
          className={`relative rounded-3xl overflow-hidden ${bgColorClass} px-6 py-20 md:px-20 md:py-24 text-center shadow-2xl`}
        >
          {/* Background Pattern */}
          {customBackground ? (
            customBackground
          ) : (
            <GridPattern
              width={30}
              height={30}
              x={-1}
              y={-1}
              squares={[
                [2, 2],
                [5, 8],
                [8, 5],
                [11, 9],
                [14, 3],
              ]}
              className="absolute inset-0 h-full w-full opacity-40"
            />
          )}

          <div className="relative z-10 flex flex-col items-center gap-8 max-w-3xl mx-auto">
            {badge && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm font-medium"
              >
                <Sparkles className="w-4 h-4" /> {badge}
              </motion.div>
            )}

            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight"
            >
              {heading}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className={`text-xl ${textColorClass} leading-relaxed max-w-2xl`}
            >
              {description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 w-full justify-center"
            >
              {buttons.map((button, index) => {
                const IconComponent = button.icon
                  ? (IconMap[button.icon] as LucideIcon)
                  : ArrowRight;

                return (
                  <Button
                    key={index}
                    size="lg"
                    variant={(button.variant as any) || "secondary"}
                    className={`h-14 px-8 text-lg gap-2 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 ${
                      button.variant === "outline"
                        ? "bg-transparent border-white/30 text-white hover:bg-white/10 hover:text-white"
                        : ""
                    }`}
                    asChild
                  >
                    <Link href={button.href}>
                      {button.text}
                      {button.icon !== "Sparkles" && (
                        <IconComponent className="w-5 h-5" />
                      )}
                    </Link>
                  </Button>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
