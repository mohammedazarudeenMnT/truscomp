"use client";

import React from "react";
import { motion } from "framer-motion";
import { CtaCard } from "@/components/ui/cta-card";
import { GridPattern } from "@/components/ui/grid-pattern";

interface CtaSectionProps {
  data?: {
    imageSrc: string;
    title: string;
    subtitle: string;
    description: string;
    buttonText: string;
    buttonLink: string;
  };
}

export const CtaSection: React.FC<CtaSectionProps> = ({ data }) => {
  // Default data as fallback
  const defaultData = {
    imageSrc:
      "https://images.pexels.com/photos/3762800/pexels-photo-3762800.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", // Placeholder - replace with actual image
    title: "Ready to Get Started?",
    subtitle: "Transform Your Compliance Journey Today",
    description:
      "Join hundreds of businesses that trust TrusComp for seamless, automated compliance management. Start your transformation with our expert solutions.",
    buttonText: "Get Started Now",
    buttonLink: "/contact",
  };

  const sectionData = data || defaultData;

  return (
    <section className="py-24 md:py-32 relative overflow-hidden bg-background">
      {/* Enhanced Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <GridPattern
          width={40}
          height={40}
          x={-1}
          y={-1}
          squares={[
            [4, 4],
            [8, 8],
            [12, 12],
            [16, 16],
          ]}
          className="absolute inset-0 h-full w-full opacity-[0.03]"
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[60%] bg-gradient-radial from-primary/10 via-primary/5 to-transparent blur-[100px] rounded-full" />
        <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-primary/5 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-primary/5 blur-[80px] rounded-full translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          <div className="relative">
            {/* Subtle border effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-3xl blur opacity-30" />
            <div className="relative bg-card/50 backdrop-blur-sm border border-primary/10 rounded-3xl overflow-hidden shadow-2xl shadow-primary/5">
              <CtaCard
                imageSrc={sectionData.imageSrc}
                title={sectionData.title}
                subtitle={sectionData.subtitle}
                description={sectionData.description}
                buttonText={sectionData.buttonText}
                buttonLink={sectionData.buttonLink}
                className="bg-transparent border-0 shadow-none"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
