"use client";

import { Check } from "lucide-react";
import { GridPattern } from "@/components/ui/grid-pattern";

const benefits = [
  {
    title: "Enhanced Efficiency",
    description:
      "Streamline compliance processes with automation and modular architecture, reducing manual effort and saving valuable time.",
  },
  {
    title: "Improved Security",
    description:
      "Industry-leading encryption, access controls, and regulatory compliance protect your sensitive data at all times.",
  },
  {
    title: "Seamless Integration",
    description:
      "Open APIs ensure easy integration with existing systems, enhancing functionality without disrupting workflows.",
  },
  {
    title: "Future-Ready",
    description:
      "Scalable and modular architecture evolves with your growing business needs, ensuring long-term value.",
  },
];

export default function ArchBenefitsSection() {
  return (
    <section className="py-24 md:py-32 bg-muted/30 relative overflow-hidden">
      {/* Grid Pattern Background */}
      <GridPattern
        width={48}
        height={48}
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
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Benefits of Our Technology
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Discover how our advanced software architecture delivers tangible
              value to your business
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex gap-6 p-6 rounded-2xl bg-card border hover:shadow-lg transition-all duration-300"
              >
                <div className="shrink-0">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary">
                    <Check className="w-6 h-6" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
