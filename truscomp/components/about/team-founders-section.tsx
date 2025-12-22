"use client";

import { Linkedin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const defaultFounders = [
    {
        name: "Mr. S. Deenadayalan",
        title: "Founder",
        bio: "Affectionately known as &quot;Deen,&quot; S. Deenadayalan brings over 50 years of expertise to TrusComp. As the founder of the Centre for Excellence in Organization, he pioneered self-managed teams and grassroots competency development globally. Recognized with DuPont&apos;s &quot;Best Community Outreach Award,&quot; his visionary leadership guides TrusComp in delivering simplified compliance solutions that empower organizations to thrive.",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop",
        linkedin: "#",
    },
    {
        name: "Mr. Anand Gopalan",
        title: "Knowledge Partner",
        bio: "Anand Gopalan, founder of Agam Legal, is a Barrister from London&apos;s Middle Temple and a trusted expert in labor law and industrial relations. Known for his proactive and innovative approach, he is a key policy reform contributor in Tamil Nadu and serves on the governing boards of MCCI and EFSI. His expertise drives TrusComp&apos;s forward-thinking compliance tools, simplifying regulatory processes for businesses.",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
        linkedin: "#",
    },
    {
        name: "Mr. PPK Mahindhra",
        title: "Co-Founder",
        bio: "With over 26 years of diverse industry experience, PPK Mahindhra, or Mahe, is a pioneer in automating compliance solutions. His expertise spans high-performance systems, innovative HR practices, and RPA-powered compliance tools. At TrusComp, he combines creativity and technical acumen to develop highly customizable solutions that redefine the future of compliance management.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
        linkedin: "#",
    },
];

interface TeamFoundersSectionProps {
    data?: {
        foundersTitle?: string;
        foundersSubtitle?: string;
        founders?: Array<{
            name: string;
            role: string;
            bio: string;
            image: string;
            linkedinUrl?: string;
        }>;
    } | null;
}

export default function TeamFoundersSection({ data }: TeamFoundersSectionProps) {
    const title = data?.foundersTitle || "Our Founders";
    const subtitle = data?.foundersSubtitle || "Meet the visionary leaders driving TrusComp's success";
    const founders = data?.founders?.map(f => ({
        name: f.name,
        title: f.role,
        bio: f.bio,
        image: f.image,
        linkedin: f.linkedinUrl || "#",
    })) || defaultFounders;
    return (
        <section className="py-24 md:py-32 bg-muted/30">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                        {title}
                    </h2>
                    <p className="mt-6 text-lg text-muted-foreground">
                        {subtitle}
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
                    {founders.map((founder, index) => (
                        <div
                            key={index}
                            className="group relative flex flex-col bg-card border rounded-3xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] overflow-hidden"
                        >
                            {/* Background gradient overlay */}
                            <div className="absolute inset-0 bg-linear-to-t from-background/95 via-background/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

                            {/* Profile image */}
                            <div className="relative h-80 overflow-hidden">
                                <Image
                                    src={founder.image}
                                    alt={founder.name}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                {/* Smooth blur overlay */}
                                <div className="absolute inset-0 bg-linear-to-t from-background/90 via-background/20 to-transparent" />
                            </div>

                            {/* Content */}
                            <div className="relative p-6 flex-1 flex flex-col -mt-20 z-20">
                                <div className="bg-card/95 backdrop-blur-sm rounded-2xl p-6 border shadow-lg">
                                    <h3 className="text-xl font-bold text-foreground">
                                        {founder.name}
                                    </h3>
                                    <p className="text-sm text-primary font-semibold mt-1 mb-4">
                                        {founder.title}
                                    </p>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        {founder.bio}
                                    </p>

                                    <div className="mt-6 pt-4 border-t">
                                        <Link
                                            href={founder.linkedin}
                                            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors group/link"
                                        >
                                            <Linkedin className="w-4 h-4 transition-transform group-hover/link:scale-110" />
                                            Connect on LinkedIn
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
