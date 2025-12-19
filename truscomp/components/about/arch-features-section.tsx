"use client";

import { Cloud, Layers, Link2, Shield, Users, Zap } from "lucide-react";
import { GridPattern } from "@/components/ui/grid-pattern";

const features = [
  {
    icon: Cloud,
    title: "Cloud-Based Infrastructure",
    description:
      "Scalable and resilient cloud infrastructure ensuring high availability and seamless access to compliance tools anytime, anywhere with robust backup systems.",
  },
  {
    icon: Layers,
    title: "Multi-Tier Architecture",
    description:
      "Layered system design with dedicated layers for optimal performance and future modularity, simplifying maintenance and enabling seamless enhancements.",
  },
  {
    icon: Link2,
    title: "Open API Integration",
    description:
      "Seamless integration with existing HRM, ERP, and financial tools, providing unified operations and flexible connectivity for easy adoption.",
  },
  {
    icon: Shield,
    title: "Data Security",
    description:
      "Industry-standard encryption, multi-factor authentication, role-based access control, and continuous security measures to protect your data.",
  },
  {
    icon: Users,
    title: "User Access Management",
    description:
      "Role-based access control system with granular permissions and enhanced oversight through clear audit trails for all activities.",
  },
  {
    icon: Zap,
    title: "Scalability",
    description:
      "Built to grow with your business, offering consistent performance and future-ready design for evolving business needs.",
  },
];

export default function ArchFeaturesSection() {
  return (
    <section className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Grid Pattern Background */}
      <GridPattern
        width={56}
        height={56}
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
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Key Features
          </h2>
          <p className="text-lg text-muted-foreground">
            Explore the key technological features that make our platform a
            leader in compliance management
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-8 rounded-2xl border bg-card hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <feature.icon className="w-6 h-6" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
