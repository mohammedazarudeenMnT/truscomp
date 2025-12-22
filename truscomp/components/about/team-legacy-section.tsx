"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

const defaultHighlights = [
    "50+ Years Combined Experience",
    "Industry-Leading Expertise",
    "Innovative Solutions",
    "Client-Focused Approach",
    "Proven Track Record"
];

interface TeamLegacySectionProps {
    data?: {
        title?: string;
        description?: string;
        buttonText?: string;
        buttonHref?: string;
        highlights?: string[];
    } | null;
}

export default function TeamLegacySection({ data }: TeamLegacySectionProps) {
    const title = data?.title || "A Legacy of Excellence";
    const description = data?.description || "With a legacy of excellence and a team of seasoned leaders, TrusComp delivers unmatched service and expertise. Join our team of compliance experts and be part of transforming how businesses approach regulatory challenges.";
    const buttonText = data?.buttonText || "Join Our Team";
    const buttonHref = data?.buttonHref || "/careers";
    const highlights = data?.highlights || defaultHighlights;

    return (
        <section className="py-32">
            <div className="container mx-auto">
                <div className="flex justify-center">
                    <div className="max-w-5xl">
                        <div className="flex flex-col items-start justify-between gap-8 rounded-lg bg-muted px-6 py-10 md:flex-row lg:px-20 lg:py-16">
                            {/* Left content */}
                            <div className="md:w-1/2">
                                <h2 className="mb-4 text-2xl font-bold md:text-3xl">
                                    {title}
                                </h2>
                                <p className="text-muted-foreground mb-6">
                                    {description}
                                </p>
                                <Button size="lg" asChild>
                                    <Link href={buttonHref}>
                                        {buttonText} <ArrowRight className="size-4 ml-2" />
                                    </Link>
                                </Button>
                            </div>

                            {/* Right content - highlights */}
                            <div className="md:w-1/3">
                                <ul className="flex flex-col space-y-2 text-sm font-medium">
                                    {highlights.map((item, idx) => (
                                        <li className="flex items-center" key={idx}>
                                            <Check className="mr-4 size-4 shrink-0 text-primary" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
