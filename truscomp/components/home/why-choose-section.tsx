"use client";

import React from "react";
import { motion } from "framer-motion";
import { Shield, Users, Settings, Award, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { GridPattern } from "@/components/ui/grid-pattern";
import { getIconComponent } from "@/lib/icons";

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

interface WhyChooseSectionProps {
  data?: {
    title: string;
    subtitle: string;
    features: Array<{
      icon: string;
      title: string;
      description: string;
    }>;
    stats: Array<{
      number: string;
      label: string;
      className: string;
    }>;
    trustIndicators: string[];
  };
}

export const WhyChooseSection: React.FC<WhyChooseSectionProps> = ({ data }) => {
  // Default data as fallback
  const defaultData = {
    title: "Why Choose TrusComp?",
    subtitle:
      "Choose TrusComp for effortless, future-ready compliance. Let us handle the complexity, so you can focus on growth!",
    features: [
      {
        icon: "Shield",
        title: "Comprehensive Compliance",
        description:
          "End-to-end management, risk assessments, and training programs tailored to your needs.",
      },
      {
        icon: "Award",
        title: "Expertise You Can Trust",
        description:
          "Founded by industry leaders with decades of experience in labor law and consulting.",
      },
      {
        icon: "Settings",
        title: "Customizable Solutions",
        description:
          "Scalable designs meeting unique requirements of SMEs and large enterprises.",
      },
      {
        icon: "Users",
        title: "Proven Track Record",
        description:
          "Trusted by over 100 clients including Amara Raja and Blue Star for flawless compliance.",
      },
    ],
    stats: [
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
    ],
    trustIndicators: [
      "Amara Raja",
      "Blue Star",
      "Dr. Reddy's",
      "Ola Electric",
      "Reckitt Benckiser",
    ],
  };

  const sectionData = data || defaultData;

  return (
    <section className="py-24 md:py-32 relative overflow-hidden bg-background">
      {/* Background Refinements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <GridPattern
          width={60}
          height={60}
          x={-1}
          y={-1}
          squares={[
            [3, 3], [5, 5], [7, 7], [9, 9], [11, 11]
          ]}
          className="absolute inset-0 h-full w-full opacity-[0.05]"
        />
        <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-primary/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-primary/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-5 gap-16 items-start mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-10"
          >
            <div>
             
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.1]">
                {sectionData.title}
              </h2>
            </div>
            
            <p className="text-xl text-muted-foreground/80 leading-relaxed max-w-md">
              {sectionData.subtitle}
            </p>

            <div className="grid gap-4">
              {[
                "Industry-Leading Expertise",
                "Tailored for Growth",
                "Technology-Driven Efficiency",
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group flex items-center gap-4 p-4 rounded-2xl transition-all hover:bg-primary/5 border border-transparent hover:border-primary/10"
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <span className="text-lg font-bold text-foreground/90 group-hover:text-primary transition-colors">
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <div className="lg:col-span-3 grid md:grid-cols-2 gap-6">
            {sectionData.features.map((feature, index) => {
              const IconComponent = getIconComponent(feature.icon) || Shield;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative p-8 rounded-[2rem] bg-card border shadow-sm hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 transition-all group-hover:bg-primary/20" />
                  
                  <div className="relative z-10">
                    <div className="inline-flex p-4 rounded-2xl bg-primary/5 text-primary mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 shadow-sm">
                      <IconComponent className="size-6" />
                    </div>
                    <h3 className="text-xl font-black mb-4 text-foreground">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed text-sm font-medium">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Stats Bento Grid Refinement */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {sectionData.stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={cn(
                "relative group flex flex-col items-center justify-center p-10 rounded-[2.5rem] border overflow-hidden transition-all duration-500 hover:-translate-y-2",
                stat.className
              )}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="text-4xl md:text-5xl font-black text-foreground mb-3 tracking-tighter relative z-10">
                {stat.number}
              </div>
              <div className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground/60 relative z-10">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* High-End Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-32 pt-16 border-t border-primary/10"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-12 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
            <div className="text-left">
              <p className="text-xs font-black uppercase tracking-[0.4em] text-muted-foreground mb-2">Our Network</p>
              <h4 className="text-xl font-bold">Trusted by Industry Leaders</h4>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20">
              {sectionData.trustIndicators.map((company, i) => (
                <span key={i} className="text-lg md:text-xl font-black text-foreground tracking-tighter hover:text-primary transition-colors cursor-default">
                  {company}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
