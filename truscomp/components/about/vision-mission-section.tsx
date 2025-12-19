"use client";

import { Target, Compass } from "lucide-react";
import Image from "next/image";
import { GridPattern } from "@/components/ui/grid-pattern";

export default function VisionMissionSection() {
  return (
    <section className="py-20 lg:py-32 bg-background overflow-hidden relative">
      {/* Grid Pattern Background */}
      <GridPattern
        width={58}
        height={58}
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
        <div className="flex flex-col gap-20">
          {/* Vision Block */}
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="w-full md:w-1/2 relative aspect-video rounded-2xl overflow-hidden shadow-2xl rotate-1 hover:rotate-0 transition-transform duration-500">
              <img
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"
                alt="Vision"
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-primary/10 mix-blend-multiply" />
            </div>
            <div className="w-full md:w-1/2 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <Target className="w-4 h-4" /> Our Vision
              </div>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                Transforming Compliance Management
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                To be the leading force in transforming compliance management in
                India, enabling organizations to achieve regulatory excellence
                effortlessly. We aim to set new benchmarks for ethical business
                practices across industries, fostering trust, transparency, and
                innovation.
              </p>
            </div>
          </div>

          {/* Mission Block */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-12">
            <div className="w-full md:w-1/2 relative aspect-video rounded-2xl overflow-hidden shadow-2xl -rotate-1 hover:rotate-0 transition-transform duration-500">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"
                alt="Mission"
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-secondary/10 mix-blend-multiply" />
            </div>
            <div className="w-full md:w-1/2 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/20 text-secondary-foreground text-sm font-medium">
                <Compass className="w-4 h-4" /> Our Mission
              </div>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                Empowering Business Growth
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                To empower businesses with innovative compliance solutions that
                simplify regulatory adherence and enhance operational
                efficiency. We strive to enable organizations to focus on growth
                with complete trust in their compliance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
