"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Sparkles } from "lucide-react";
import { GridPattern } from "@/components/ui/grid-pattern";
import { getIconComponent } from "@/components/ui/icon-selector";

interface Feature {
  title: string;
  description: string;
  icon?: string;
}

interface WhyChooseData {
  title?: string;
  subtitle?: string;
  features?: Feature[];
}

interface WhyChooseTestimonialsProps {
  data?: WhyChooseData;
}

export default function WhyChooseTestimonials({ data }: WhyChooseTestimonialsProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });

  const defaultBenefits = [
    {
      icon: "Sparkles",
      title: "Expert Solutions",
      description:
        "Customized services that address unique compliance challenges.",
    },
    {
      icon: "Zap",
      title: "Innovative Tools",
      description:
        "Technology-driven solutions like QR codes for enhanced efficiency.",
    },
    {
      icon: "Target",
      title: "Proven Results",
      description:
        "Demonstrated success across industries with measurable outcomes.",
    },
    {
      icon: "Headphones",
      title: "Exceptional Support",
      description:
        "A dedicated team that delivers results, often exceeding expectations.",
    },
  ];

  const benefits = data?.features && data.features.length > 0 
    ? data.features 
    : defaultBenefits;

  const title = data?.title || "Why Our Clients Choose TrusComp?";
  const subtitle = data?.subtitle;

  return (
    <section
      ref={sectionRef}
      className="relative py-24 bg-white dark:bg-background overflow-hidden"
    >
      {/* Grid Pattern Background */}
      <GridPattern
        width={64}
        height={64}
        x={-1}
        y={-1}
        squares={[
          [2, 2],
          [6, 8],
          [10, 4],
          [14, 10],
          [18, 6],
        ]}
        className="absolute inset-0 h-full w-full opacity-50 dark:opacity-30"
      />

      {/* Gradient Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_200px,rgba(var(--primary-rgb,59,130,246),0.08),transparent)]" />

      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        {/* Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-semibold mb-4 max-w-2xl">
            {title}
          </h2>
          {subtitle && (
            <p className="text-lg text-muted-foreground max-w-2xl">
              {subtitle}
            </p>
          )}
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon ? getIconComponent(benefit.icon) : Sparkles;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="group relative rounded-lg border bg-card text-card-foreground shadow-sm p-6 h-full hover:shadow-xl transition-all duration-300">
                  {/* Corner Decorators */}
                  <span className="border-primary absolute -left-px -top-px block size-2 border-l-2 border-t-2"></span>
                  <span className="border-primary absolute -right-px -top-px block size-2 border-r-2 border-t-2"></span>
                  <span className="border-primary absolute -bottom-px -left-px block size-2 border-b-2 border-l-2"></span>
                  <span className="border-primary absolute -bottom-px -right-px block size-2 border-b-2 border-r-2"></span>

                  {/* Icon */}
                  <span className="text-muted-foreground flex items-center gap-2 mb-8">
                    <div className="text-primary">
                      {IconComponent && <IconComponent className="w-5 h-5" />}
                    </div>
                    {benefit.title}
                  </span>

                  {/* Description */}
                  <p className="text-2xl font-semibold leading-tight">
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
