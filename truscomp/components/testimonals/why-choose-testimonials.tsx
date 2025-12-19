"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Sparkles, Zap, Target, Headphones } from "lucide-react";
import { cn } from "@/lib/utils";
import { GridPattern } from "@/components/ui/grid-pattern";

export default function WhyChooseTestimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });

  const benefits = [
    {
      icon: <Sparkles className="w-5 h-5" />,
      title: "Expert Solutions",
      description:
        "Customized services that address unique compliance challenges.",
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: "Innovative Tools",
      description:
        "Technology-driven solutions like QR codes for enhanced efficiency.",
    },
    {
      icon: <Target className="w-5 h-5" />,
      title: "Proven Results",
      description:
        "Demonstrated success across industries with measurable outcomes.",
    },
    {
      icon: <Headphones className="w-5 h-5" />,
      title: "Exceptional Support",
      description:
        "A dedicated team that delivers results, often exceeding expectations.",
    },
  ];

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
            Why Our Clients Choose TrusComp?
          </h2>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => (
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
                  <div className="text-primary">{benefit.icon}</div>
                  {benefit.title}
                </span>

                {/* Description */}
                <p className="text-2xl font-semibold leading-tight">
                  {benefit.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
