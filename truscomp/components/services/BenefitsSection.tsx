"use client";

import { motion } from "framer-motion";
import { GridPattern } from "@/components/ui/grid-pattern";
import { getIconComponent } from "@/lib/icons";
import { CheckCircle } from "lucide-react";

interface Benefit {
  icon: string;
  title: string;
  description: string;
}

interface BenefitsSectionProps {
  benefits?: Benefit[];
  title?: string;
  subtitle?: string;
}

export function BenefitsSection({
  benefits = [],
  title = "Benefits",
  subtitle,
}: BenefitsSectionProps) {
  return (
    <section className="py-20 lg:py-28 bg-linear-to-b from-muted/50 to-background relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 -right-48 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            {title}
          </h2>
          {subtitle && (
            <p className="text-muted-foreground text-lg max-w-3xl">
              {subtitle}
            </p>
          )}
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const IconComponent = getIconComponent(benefit.icon) || CheckCircle;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
                className="group relative"
              >
                <div className="relative p-8 rounded-3xl border bg-card hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 overflow-hidden h-full">
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-linear-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Grid Pattern */}
                  <GridPattern
                    width={20}
                    height={20}
                    className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500"
                    squares={[
                      [1, 0],
                      [3, 1],
                      [5, 2],
                    ]}
                  />

                  <div className="relative z-10">
                    {/* Icon with enhanced styling */}
                    <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg shadow-primary/10">
                      <IconComponent className="w-8 h-8 text-primary" />
                    </div>

                    <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                      {benefit.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
