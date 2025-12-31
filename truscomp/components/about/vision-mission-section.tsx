"use client";

import { Target, Compass } from "lucide-react";
import Image from "next/image";
import { GridPattern } from "@/components/ui/grid-pattern";

interface VisionMissionSectionProps {
  data?: {
    vision?: {
      badge?: string;
      title?: string;
      description?: string;
      image?: string;
    };
    mission?: {
      badge?: string;
      title?: string;
      description?: string;
      image?: string;
    };
  } | null;
}

export default function VisionMissionSection({ data }: VisionMissionSectionProps) {
  const visionTitle = data?.vision?.title || "Transforming Compliance Management";
  const visionContent = data?.vision?.description || "To be the leading force in transforming compliance management in India, enabling organizations to achieve regulatory excellence effortlessly. We aim to set new benchmarks for ethical business practices across industries, fostering trust, transparency, and innovation.";
  const visionImage = data?.vision?.image || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop";
  
  const missionTitle = data?.mission?.title || "Empowering Business Growth";
  const missionContent = data?.mission?.description || "To empower businesses with innovative compliance solutions that simplify regulatory adherence and enhance operational efficiency. We strive to enable organizations to focus on growth with complete trust in their compliance.";
  const missionImage = data?.mission?.image || "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop";

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
              <Image
                src={visionImage}
                alt="Vision"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-primary/10 mix-blend-multiply" />
            </div>
            <div className="w-full md:w-1/2 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <Target className="w-4 h-4" /> Our Vision
              </div>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                {visionTitle}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {visionContent}
              </p>
            </div>
          </div>

          {/* Mission Block */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-12">
            <div className="w-full md:w-1/2 relative aspect-video rounded-2xl overflow-hidden shadow-2xl -rotate-1 hover:rotate-0 transition-transform duration-500">
              <Image
                src={missionImage}
                alt="Mission"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-secondary/10 mix-blend-multiply" />
            </div>
            <div className="w-full md:w-1/2 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/20 text-secondary-foreground text-sm font-medium">
                <Compass className="w-4 h-4" /> Our Mission
              </div>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                {missionTitle}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {missionContent}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
