"use client";

import { Check } from "lucide-react";
import { GridPattern } from "@/components/ui/grid-pattern";

const defaultBenefits = [
    {
      title: "Seamless Transition",
      description:
        "A structured process minimizes disruptions during implementation.",
    },
    {
      title: "Tailored Solutions",
      description:
        "Customization ensures solutions meet your specific compliance needs.",
    },
    {
      title: "Ongoing Support",
      description:
        "Continuous updates and reviews keep your system aligned with regulatory changes.",
    },
    {
      title: "Operational Efficiency",
      description:
        "Pilot testing and feedback ensure optimal workflows before full deployment.",
    },
  ];

interface TimelineWhySectionProps {
  data?: {
    title?: string;
    subtitle?: string;
    benefits?: Array<{
      title: string;
      description: string;
    }>;
  } | null;
}

export default function TimelineWhySection({ data }: TimelineWhySectionProps) {
  const title = data?.title || "Why Choose TrusComp's Phased Approach?";
  const subtitle = data?.subtitle || "Our proven methodology delivers results with minimal risk and maximum efficiency.";
  const benefits = data?.benefits || defaultBenefits;

  return (
    <section className="py-20 lg:py-32 bg-background relative overflow-hidden">
      {/* Grid Pattern Background */}
      <GridPattern
        width={50}
        height={50}
        x={-1}
        y={-1}
        squares={[
          [4, 4],
          [10, 6],
          [16, 8],
          [22, 3],
          [28, 9],
        ]}
        className="absolute inset-0 h-full w-full opacity-15"
      />
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              {title}
            </h2>
            <p className="text-lg text-muted-foreground">
              {subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex gap-4 p-6 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
              >
                <div className="shrink-0">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Check className="w-5 h-5 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
