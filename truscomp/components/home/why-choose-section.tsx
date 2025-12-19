"use client";

import React from "react";
import { motion } from "framer-motion";
import { Shield, Users, Settings, Award, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { GridPattern } from "@/components/ui/grid-pattern";

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Feature: React.FC<FeatureProps> = ({ icon, title, description }) => {
  return (
    <div className="flex items-start gap-4 p-6 rounded-2xl bg-background border shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
      <div className="p-3 rounded-xl bg-primary/10 text-primary shrink-0">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-bold mb-2 text-foreground">{title}</h3>
        <p className="text-muted-foreground leading-relaxed text-sm">
          {description}
        </p>
      </div>
    </div>
  );
};

export const WhyChooseSection: React.FC = () => {
  const features = [
    {
      icon: <Shield className="size-5" />,
      title: "Comprehensive Compliance",
      description:
        "End-to-end management, risk assessments, and training programs tailored to your needs.",
    },
    {
      icon: <Award className="size-5" />,
      title: "Expertise You Can Trust",
      description:
        "Founded by industry leaders with decades of experience in labor law and consulting.",
    },
    {
      icon: <Settings className="size-5" />,
      title: "Customizable Solutions",
      description:
        "Scalable designs meeting unique requirements of SMEs and large enterprises.",
    },
    {
      icon: <Users className="size-5" />,
      title: "Proven Track Record",
      description:
        "Trusted by over 100 clients including Amara Raja and Blue Star for flawless compliance.",
    },
  ];

  const stats = [
    {
      number: "100+",
      label: "Trusted Clients",
      className: "bg-primary/5 border-primary/10",
    },
    {
      number: "15+",
      label: "Years Experience",
      className: "bg-primary/10 border-primary/20",
    },
    {
      number: "99.9%",
      label: "Compliance Rate",
      className: "bg-primary/5 border-primary/10",
    },
    {
      number: "24/7",
      label: "Support Available",
      className: "bg-primary/10 border-primary/20",
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-muted/30 relative overflow-hidden">
      {/* Grid Pattern Background */}
      <GridPattern
        width={50}
        height={50}
        x={-1}
        y={-1}
        squares={[
          [3, 3],
          [9, 5],
          [15, 7],
          [21, 9],
          [27, 4],
        ]}
        className="absolute inset-0 h-full w-full opacity-15"
      />
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
              Why Choose TrusComp?
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Choose TrusComp for effortless, future-ready compliance. Let us
              handle the complexity, so you can focus on growth!
            </p>

            <ul className="space-y-4">
              {[
                "Industry-Leading Expertise",
                "Tailored for Growth",
                "Technology-Driven Efficiency",
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 text-lg font-medium text-foreground/80"
                >
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid gap-6"
          >
            {features.map((feature, index) => (
              <Feature
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </motion.div>
        </div>

        {/* Stats Bento Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={cn(
                "flex flex-col items-center justify-center p-8 rounded-2xl border text-center transition-all hover:shadow-lg",
                stat.className
              )}
            >
              <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                {stat.number}
              </div>
              <div className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 pt-10 border-t text-center"
        >
          <p className="text-muted-foreground mb-8 text-sm uppercase tracking-wider font-semibold">
            Trusted by leading companies
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {[
              "Amara Raja",
              "Blue Star",
              "Dr. Reddy's",
              "Ola Electric",
              "Reckitt Benckiser",
            ].map((company, i) => (
              <span key={i} className="text-xl font-bold text-foreground/80">
                {company}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
