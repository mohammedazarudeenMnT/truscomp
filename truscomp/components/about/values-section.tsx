"use client";

import { GridPattern } from "@/components/ui/grid-pattern";
import { getIconComponent } from "@/lib/icons";
import { ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const defaultValues = [
  {
    title: "Trust",
    description:
      "We build and maintain trust with our clients, employees, and stakeholders. Trust forms the foundation of ethical compliance.",
    icon: "ShieldCheck",
    className: "md:col-span-2 bg-primary/5 border-primary/10",
  },
  {
    title: "Transparency",
    description:
      "Open and honest communication is at the heart of our operations. Transparency fosters accountability.",
    icon: "Eye",
    className: "md:col-span-1 bg-primary/10 border-primary/20",
  },
  {
    title: "Ethical Practices",
    description:
      "Upholding the highest ethical standards is integral to our philosophy.",
    icon: "Scale",
    className: "md:col-span-1 bg-primary/5 border-primary/10",
  },
  {
    title: "Innovation",
    description:
      "By embracing cutting-edge technology, we deliver compliance solutions that are efficient and future-ready.",
    icon: "Lightbulb",
    className: "md:col-span-2 bg-primary/10 border-primary/20",
  },
  {
    title: "Client-Centric",
    description:
      "Our clients are at the center of everything we do. We provide tailored solutions that meet their unique needs.",
    icon: "Users",
    className: "md:col-span-1 bg-primary/5 border-primary/10",
  },
  {
    title: "Continuous Learning",
    description:
      "We cultivate a culture of ongoing improvement. Our team remains updated on the latest regulations.",
    icon: "BookOpen",
    className: "md:col-span-1 bg-primary/10 border-primary/20",
  },
  {
    title: "Collaboration",
    description:
      "Collaboration is key to creativity. We foster teamwork to deliver exceptional results.",
    icon: "Handshake",
    className: "md:col-span-1 bg-primary/5 border-primary/10",
  },
];

interface ValuesSectionProps {
  data?: {
    title?: string;
    subtitle?: string;
    items?: Array<{
      title: string;
      description: string;
      icon?: string;
      className?: string;
    }>;
  } | null;
}

export default function ValuesSection({ data }: ValuesSectionProps) {
  const title = data?.title || "Our Value System";
  const subtitle =
    data?.subtitle ||
    "The core principles that define who we are and how we operate.";

  const values =
    data?.items?.map((value, index) => {
      const IconComponent = getIconComponent(value.icon) || ShieldCheck;
      return {
        title: value.title,
        description: value.description,
        icon: IconComponent,
        className: value.className || defaultValues[index % defaultValues.length].className,
      };
    }) ||
    defaultValues.map((v) => ({
      ...v,
      icon: getIconComponent(v.icon) || ShieldCheck,
    }));
  return (
    <section className="py-20 lg:py-32 bg-background relative overflow-hidden">
      {/* Grid Pattern Background */}
      <GridPattern
        width={55}
        height={55}
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
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">{title}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {values.map((value, index) => (
            <div
              key={index}
              className={cn(
                "group relative overflow-hidden p-8 rounded-3xl border transition-all duration-300 hover:shadow-xl hover:-translate-y-1",
                value.className
              )}
            >
              <div className="mb-4 inline-flex p-3 rounded-2xl bg-background shadow-sm text-foreground">
                <value.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">{value.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                {value.description}
              </p>

              {/* Decorative gradient blob */}
              <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-linear-to-br from-white/20 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
