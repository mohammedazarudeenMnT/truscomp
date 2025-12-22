"use client";

import {
  Lightbulb,
  ShieldCheck,
  HeartHandshake,
  CheckCircle2,
} from "lucide-react";
import { GridPattern } from "@/components/ui/grid-pattern";
import { getIconComponent } from "@/lib/icons";

const defaultFeatures = [
  {
    title: "Innovation",
    description:
      "Leveraging cutting-edge technology to reshape compliance management.",
    icon: "Lightbulb",
  },
  {
    title: "Expertise",
    description: "Deep domain knowledge in labor law and regulatory adherence.",
    icon: "ShieldCheck",
  },
  {
    title: "Commitment",
    description: "Unwavering commitment to excellence and client success.",
    icon: "HeartHandshake",
  },
];

interface WhyTrusCompSectionProps {
  data?: {
    title?: string;
    description?: string;
    highlights?: string[];
    features?: Array<{
      title: string;
      description: string;
      icon?: string;
    }>;
  } | null;
}

export default function WhyTrusCompSection({ data }: WhyTrusCompSectionProps) {
  const title = data?.title || "Why TrusComp?";
  const description =
    data?.description ||
    "We are more than a compliance partner; we are your ally in staying ahead of the curve. Join us in reshaping compliance management, leveraging innovation, expertise, and unwavering commitment to excellence.";
  const highlights = data?.highlights || [
    "Pan-India Presence",
    "Technology Driven",
    "Client-Centric Approach",
  ];
  const features =
    data?.features?.map((f) => {
      const IconComponent = getIconComponent(f.icon) || Lightbulb;
      return {
        title: f.title,
        description: f.description,
        icon: IconComponent,
      };
    }) ||
    defaultFeatures.map((f) => ({
      ...f,
      icon: getIconComponent(f.icon) || Lightbulb,
    }));

  return (
    <section className="py-20 lg:py-32 bg-muted/30 relative overflow-hidden">
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
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
              {title}
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {description}
            </p>

            <ul className="space-y-4">
              {highlights.map((item, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 text-lg font-medium"
                >
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-start gap-6 p-6 rounded-2xl bg-background border shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="p-3 rounded-xl bg-primary/10 text-primary shrink-0">
                  <feature.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
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
