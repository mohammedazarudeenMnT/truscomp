"use client";

import { GridPattern } from "@/components/ui/grid-pattern";

const defaultStats = [
  { value: "100+", label: "Trusted Clients" },
  { value: "99.9%", label: "Uptime Guarantee" },
  { value: "24/7", label: "Support Available" },
];

const defaultReasons = [
  {
    title: "Proven Expertise",
    description:
      "Trusted by 100+ clients for secure, efficient compliance solutions backed by years of industry experience.",
  },
  {
    title: "Cutting-Edge Tools",
    description:
      "Stay ahead with advanced features like role-based access, secure APIs, and continuous security updates.",
  },
  {
    title: "Customizable Solutions",
    description:
      "Adapt our platform to fit your organization&apos;s unique needs with flexible configuration options.",
  },
];

interface ArchWhySectionProps {
  data?: {
    title?: string;
    subtitle?: string;
    stats?: Array<{
      value: string;
      label: string;
    }>;
    reasons?: Array<{
      title: string;
      description: string;
    }>;
  } | null;
}

export default function ArchWhySection({ data }: ArchWhySectionProps) {
  const title = data?.title || "Why Choose TrusComp?";
  const subtitle = data?.subtitle || "Our technology platform delivers unmatched value through proven expertise and innovation";
  const stats = data?.stats || defaultStats;
  const reasons = data?.reasons || defaultReasons;

  return (
    <section className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Grid Pattern Background */}
      <GridPattern
        width={54}
        height={54}
        x={-1}
        y={-1}
        squares={[
          [2, 2],
          [8, 6],
          [14, 8],
          [20, 4],
          [26, 10],
        ]}
        className="absolute inset-0 h-full w-full opacity-15"
      />
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              {title}
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {subtitle}
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mb-16 p-8 rounded-2xl border bg-card">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <p className="text-sm text-muted-foreground font-medium">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* Reasons */}
          <div className="grid gap-8 md:grid-cols-3">
            {reasons.map((reason, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-2xl border bg-card hover:shadow-lg transition-all duration-300"
              >
                <h3 className="text-xl font-bold mb-3">{reason.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {reason.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
