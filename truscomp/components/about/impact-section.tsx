"use client";

import { Star, ThumbsUp, Users, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { GridPattern } from "@/components/ui/grid-pattern";

const stats = [
  {
    name: "7+ Years of Excellence",
    description:
      "Delivering customized compliance solutions across diverse industries",
    icon: Star,
    className: "md:col-span-2 bg-primary/5 border-primary/10",
  },
  {
    name: "60+ Compliance Specialists",
    description:
      "A dedicated team committed to providing top-tier service and support.",
    icon: ThumbsUp,
    className: "md:col-span-1 bg-primary/10 border-primary/20",
  },
  {
    name: "100+ Clients",
    description:
      "Trusted by industry leaders, including Blue Star, Reckitt Benckiser, and Ola Electric, to ensure flawless compliance management.",
    icon: Users,
    className: "md:col-span-3 bg-primary/5 border-primary/10",
  },
];

export default function ImpactSection() {
  return (
    <section className="py-20 lg:py-32 bg-background relative overflow-hidden">
      {/* Grid Pattern Background */}
      <GridPattern
        width={45}
        height={45}
        x={-1}
        y={-1}
        squares={[
          [4, 4],
          [10, 6],
          [16, 8],
          [22, 3],
          [28, 9],
        ]}
        className="absolute inset-0 h-full w-full opacity-5"
      />
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
              Our Impact
            </h2>
            <p className="text-lg text-muted-foreground">
              Measuring our success through the value we deliver to our clients
              and the industry.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={cn(
                "group relative p-8 rounded-3xl border transition-all duration-300 hover:shadow-lg",
                stat.className
              )}
            >
              <div className="flex justify-between items-start mb-8">
                <div className="p-3 rounded-2xl bg-background shadow-sm">
                  <stat.icon className="w-6 h-6 text-foreground" />
                </div>
                <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
              </div>

              <h3 className="text-3xl font-bold mb-3">{stat.name}</h3>
              <p className="text-muted-foreground leading-relaxed max-w-lg">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
