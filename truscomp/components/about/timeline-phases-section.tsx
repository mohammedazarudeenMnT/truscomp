"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const phases = [
  {
    number: "01",
    title: "Needs Assessment",
    week: "Week 1-2",
    description:
      "We conduct comprehensive audits of your current compliance status, identify gaps, and understand your specific business requirements.",
    deliverables: [
      "Compliance Gap Analysis",
      "Risk Assessment Report",
      "Stakeholder Interviews",
      "Current State Documentation",
    ],
    duration: "2 weeks",
  },
  {
    number: "02",
    title: "Project Planning",
    week: "Week 3",
    description:
      "Our team establishes a detailed project timeline with clear deliverables and assigns skilled resources to ensure your project's success from start to finish.",
    deliverables: [
      "Timeline Development",
      "Milestone Definition",
      "Resource Allocation",
      "Risk Assessment",
    ],
    duration: "1 week",
  },
  {
    number: "03",
    title: "Technical Setup",
    week: "Week 4-5",
    description:
      "We implement compliance infrastructure, configure systems, and set up monitoring tools to ensure seamless operations.",
    deliverables: [
      "System Configuration",
      "Integration Setup",
      "Security Protocols",
      "Documentation Portal",
    ],
    duration: "2 weeks",
  },
  {
    number: "04",
    title: "User Testing",
    week: "Week 6",
    description:
      "Rigorous testing with your team ensures all systems work flawlessly and meet regulatory requirements before launch.",
    deliverables: [
      "Functionality Testing",
      "User Acceptance Testing",
      "Compliance Verification",
      "Bug Fixes & Adjustments",
    ],
    duration: "1 week",
  },
  {
    number: "05",
    title: "Pilot Launch",
    week: "Week 7",
    description:
      "A controlled rollout to a select group allows us to validate the solution in real-world conditions and gather critical feedback.",
    deliverables: [
      "Pilot Group Selection",
      "Training Sessions",
      "Performance Monitoring",
      "Feedback Collection",
    ],
    duration: "1 week",
  },
  {
    number: "06",
    title: "Full-Scale Launch",
    week: "Week 8",
    description:
      "Complete deployment across your organization with comprehensive training and support to ensure smooth adoption.",
    deliverables: [
      "Organization-Wide Rollout",
      "Comprehensive Training",
      "Documentation Delivery",
      "Support Activation",
    ],
    duration: "1 week",
  },
  {
    number: "07",
    title: "Ongoing Support",
    week: "Week 9+",
    description:
      "Continuous monitoring, updates, and dedicated support ensure your compliance solution evolves with changing regulations.",
    deliverables: [
      "Regular Health Checks",
      "Regulatory Updates",
      "Performance Optimization",
      "24/7 Support Access",
    ],
    duration: "Ongoing",
  },
];

interface TimelinePhasesSectionProps {
  data?: {
    title?: string;
    subtitle?: string;
    badge?: string;
    phases?: Array<{
      number?: string;
      title: string;
      week: string;
      description: string;
      deliverables: string[];
      duration: string;
    }>;
  } | null;
}

export default function ProjectDeliverySection({ data }: TimelinePhasesSectionProps) {
  const [activePhase, setActivePhase] = useState(0);
  
  // Use data from API if available, otherwise use default phases
  const title = data?.title || "Phased Project Delivery";
  const subtitle = data?.subtitle || "A proven methodology that ensures successful implementation and lasting compliance";
  const badge = data?.badge || "8-9 weeks implementation timeline";
  
  const displayPhases = data?.phases?.map((phase, index) => ({
    number: phase.number || String(index + 1).padStart(2, '0'),
    title: phase.title,
    week: phase.week,
    description: phase.description,
    deliverables: phase.deliverables,
    duration: phase.duration,
  })) || phases;

  return (
    <section className="relative overflow-hidden bg-linear-to-b from-background via-background to-background/95 py-24 sm:py-32">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[4rem_4rem] opacity-40" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm shadow-sm">
            <Clock className="h-4 w-4 text-primary" />
            <span className="text-muted-foreground">
              {badge}
            </span>
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-4">
            {title}
          </h2>
          <p className="text-lg text-muted-foreground">
            {subtitle}
          </p>
        </div>

        {/* Phase Navigation */}
        <div className="mb-16 flex flex-wrap items-center justify-center gap-3">
          {displayPhases.map((phase, index) => (
            <motion.button
              key={index}
              onClick={() => setActivePhase(index)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`group relative flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300 ${
                activePhase === index
                  ? "border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                  : "border-border/50 bg-background/50 text-muted-foreground hover:border-primary/50 hover:bg-card hover:text-foreground"
              }`}
            >
              <span className="text-xs opacity-75 font-semibold">
                {phase.number}
              </span>
              <span className="hidden sm:inline">{phase.title}</span>
              <span className="sm:hidden">Phase {index + 1}</span>
            </motion.button>
          ))}
        </div>

        {/* Phase Content */}
        <div className="mx-auto max-w-5xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePhase}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid gap-8 lg:grid-cols-2"
            >
              {/* Left Column - Details */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-8"
              >
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-primary/20 to-accent/20"
                    >
                      <span className="text-3xl font-bold text-primary">
                        {displayPhases[activePhase].number}
                      </span>
                    </motion.div>
                    <div className="flex-1">
                      <div className="mb-1 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                        {displayPhases[activePhase].week}
                      </div>
                      <h3 className="text-3xl font-bold text-foreground">
                        {displayPhases[activePhase].title}
                      </h3>
                    </div>
                  </div>
                  <p className="text-lg leading-relaxed text-muted-foreground ml-4">
                    {displayPhases[activePhase].description}
                  </p>
                </div>

                {/* Deliverables */}
                <div className="space-y-4 rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm">
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    Key Deliverables
                  </h4>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {displayPhases[activePhase].deliverables.map((deliverable, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-start gap-3 rounded-lg bg-background/50 p-3 text-sm text-muted-foreground"
                      >
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                        <span>{deliverable}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Duration Badge */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-2.5 text-sm"
                >
                  <Clock className="h-5 w-5 text-primary" />
                  <span className="font-medium text-foreground">Duration:</span>
                  <span className="font-semibold text-primary">
                    {displayPhases[activePhase].duration}
                  </span>
                </motion.div>
              </motion.div>

              {/* Right Column - Visual */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center justify-center"
              >
                <div className="relative w-full max-w-md overflow-hidden rounded-3xl">
                  {/* Image Display */}
                  <motion.div
                    whileHover={{ scale: 1.05, y: -10 }}
                    className="relative h-96 w-full overflow-hidden rounded-3xl border-2 border-primary/20 shadow-2xl transition-shadow hover:shadow-primary/30"
                  >
                    <motion.img
                      key={activePhase}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4 }}
                      src={`https://images.unsplash.com/photo-${
                        activePhase === 0
                          ? "1552664730-d307ca884978?w=500&h=500&fit=crop" // Needs Assessment
                          : activePhase === 1
                          ? "1454165804606-c3d57bc86b40?w=500&h=500&fit=crop" // Project Planning
                          : activePhase === 2
                          ? "1517694712202-14dd9538aa97?w=500&h=500&fit=crop" // Technical Setup
                          : activePhase === 3
                          ? "1516534775068-ec28c9fccf0d?w=500&h=500&fit=crop" // User Testing
                          : activePhase === 4
                          ? "1552664899-4f32908e397f?w=500&h=500&fit=crop" // Pilot Launch
                          : activePhase === 5
                          ? "1552664730-d307ca884978?w=500&h=500&fit=crop" // Full-Scale Launch
                          : "1552664730-d307ca884978?w=500&h=500&fit=crop" // Ongoing Support
                      }`}
                      alt={displayPhases[activePhase].title}
                      className="h-full w-full object-cover"
                    />
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent"
                    />
                  </motion.div>

                  {/* Phase Info Overlay */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-background to-transparent p-6"
                  >
                    <div className="flex items-end gap-3">
                      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/20 backdrop-blur-sm">
                        <span className="text-2xl font-bold text-primary">
                          {displayPhases[activePhase].number}
                        </span>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-primary">
                          {displayPhases[activePhase].week}
                        </p>
                        <p className="font-semibold text-white">
                          {displayPhases[activePhase].title}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-20 text-center"
          >
            <Button
              size="lg"
              className="group bg-linear-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/30"
            >
              Start Your Compliance Journey
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
