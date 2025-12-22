"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { GridPattern } from "@/components/ui/grid-pattern";

interface AboutHeroSectionProps {
  data?: {
    badge?: string;
    title?: string;
    description?: string;
    image?: string;
    stats?: {
      value: string;
      label: string;
      description: string;
    };
    buttons?: Array<{
      text: string;
      href: string;
      variant?: "default" | "outline";
    }>;
  } | null;
}

export default function AboutHeroSection({ data }: AboutHeroSectionProps) {
  const badge = data?.badge || "About TrusComp";
  const title = data?.title || "Who We Are";
  const description = data?.description || "TrusComp Private Limited is a trusted leader in compliance solutions, committed to transforming regulatory adherence through innovation and expertise. Guided by our core values of Trust, Transparency, and Transformation, we unite domain expertise in labor law, consulting, and technology to deliver exceptional value to our clients.";
  const image = data?.image || "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=600&fit=crop";
  const statsValue = data?.stats?.value || "7+";
  const statsLabel = data?.stats?.label || "Years of Excellence";
  const statsDescription = data?.stats?.description || "Trusted by Industry Leaders";

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="flex flex-col gap-6">
            <div>
              <Badge
                variant="outline"
                className="px-4 py-1 text-base rounded-full border-primary/20 bg-primary/5 text-primary"
              >
                {badge}
              </Badge>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-foreground to-foreground/70">
              {title}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {description}
            </p>
            <div className="flex flex-row gap-4 pt-4">
              <Button
                size="lg"
                className="h-12 px-8 text-base rounded-full"
                asChild
              >
                <Link href="/contact">
                  Get Started <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-12 px-8 text-base rounded-full"
                asChild
              >
                <Link href="#founders">Meet the Team</Link>
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border bg-muted aspect-4/3">
              <img
                src={image}
                alt="TrusComp Team"
                className="object-cover w-full h-full hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-linear-to-tr from-primary/20 to-transparent mix-blend-overlay" />
              {/* Grid Pattern Overlay */}
              <GridPattern
                width={40}
                height={40}
                x={-1}
                y={-1}
                squares={[
                  [3, 3],
                  [9, 7],
                  [15, 5],
                  [21, 9],
                  [27, 4],
                ]}
                className="absolute inset-0 h-full w-full opacity-20"
              />
            </div>
            {/* Floating Stats Card */}
            <div className="absolute -bottom-6 -left-6 bg-background p-6 rounded-xl shadow-xl border max-w-xs hidden md:block">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
                  {statsValue}
                </div>
                <div>
                  <p className="font-bold text-lg">{statsLabel}</p>
                  <p className="text-sm text-muted-foreground">
                    {statsDescription}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
