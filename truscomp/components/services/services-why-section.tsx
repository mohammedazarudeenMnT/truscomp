"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Layers, Cpu, TrendingUp } from "lucide-react";
import { GridPattern } from "@/components/ui/grid-pattern";
import { getIconComponent } from "@/lib/icons";

interface PageSettings {
  whySection?: {
    title?: string;
    subtitle?: string;
    features?: Array<{
      icon: string;
      title: string;
      description: string;
    }>;
  };
}

interface ServicesWhySectionProps {
  pageSettings?: PageSettings | null;
}

export default function ServicesWhySection({
  pageSettings,
}: ServicesWhySectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });

  // Use dynamic features or fallback to default
  const features = pageSettings?.whySection?.features?.length
    ? pageSettings.whySection.features
    : [
        {
          icon: "Layers",
          title: "Scalable Solutions",
          description:
            "Tailored to fit businesses of all sizes, from SMEs to large enterprises.",
        },
        {
          icon: "Cpu",
          title: "Innovative Tools",
          description:
            "Utilize cutting-edge technology, including QR code integrations for audits and self-service dashboards, to streamline compliance.",
        },
        {
          icon: "TrendingUp",
          title: "Proven ROI",
          description:
            "Achieve compliance while enhancing operational efficiency, ensuring measurable returns on investment.",
        },
      ];

  return (
    <section
      ref={sectionRef}
      className="py-20 lg:py-32 bg-muted/30 relative overflow-hidden"
    >
      {/* Grid Pattern Background */}
      <GridPattern
        width={48}
        height={48}
        x={-1}
        y={-1}
        squares={[
          [3, 3],
          [9, 7],
          [15, 5],
          [21, 9],
          [27, 4],
        ]}
        className="absolute inset-0 h-full w-full opacity-15"
      />
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            {pageSettings?.whySection?.title || "Why TrusComp?"}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {pageSettings?.whySection?.subtitle ||
              "Experience the TrusComp advantage with solutions designed for excellence."}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const IconComponent = getIconComponent(feature.icon) || Layers;

            return (
              <motion.div
                key={index}
                className="bg-background border rounded-xl p-8 text-center group hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                }
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <motion.div
                  className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6 text-primary group-hover:bg-primary/20 transition-colors"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8 }}
                >
                  <IconComponent className="w-8 h-8" />
                </motion.div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
                <motion.div className="w-12 h-1 bg-primary mx-auto mt-6 group-hover:w-20 transition-all duration-300" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
