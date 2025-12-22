"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { GridPattern } from "@/components/ui/grid-pattern";

const defaultMembers = [
  {
    name: "Mr. S. Deenadayalan",
    role: "Chairman",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop",
    bio: "Chairman of the CEO Group of Companies with 25+ years of consulting expertise, known for delivering impactful organizational transformation.",
    social: {
      linkedin: "#",
    },
  },
  {
    name: "Mr. Anand Gopalan",
    role: "Managing Partner",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop",
    bio: "Managing Partner at Agam Legal Services, a renowned labor law expert dedicated to ensuring seamless compliance.",
    social: {
      linkedin: "#",
    },
  },
  {
    name: "Mr. PPK Mahindhra",
    role: "Managing Partner",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    bio: "A technology innovator and Managing Partner at JZ Tec, specializing in automating compliance management for modern businesses.",
    social: {
      linkedin: "#",
    },
  },
];

interface FoundersSectionProps {
  data?: {
    title?: string;
    subtitle?: string;
    members?: Array<{
      name: string;
      role: string;
      image: string;
      bio: string;
      linkedinUrl?: string;
    }>;
  } | null;
}

export default function FoundersSection({ data }: FoundersSectionProps) {
  const title = data?.title || "Our Founders";
  const subtitle = data?.subtitle || "Meet the visionary leaders driving TrusComp's success:";
  const members = data?.members?.map(m => ({
    ...m,
    social: { linkedin: m.linkedinUrl || "#" }
  })) || defaultMembers;
  return (
    <section
      id="founders"
      className="py-20 lg:py-32 bg-muted/30 relative overflow-hidden"
    >
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
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">{title}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {members.map((member, index) => (
            <div
              key={index}
              className="group relative bg-background rounded-2xl overflow-hidden border transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
            >
              <div className="aspect-4/5 overflow-hidden relative">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-2xl font-bold mb-1">{member.name}</h3>
                  <p className="text-white/80 font-medium text-sm mb-4">
                    {member.role}
                  </p>
                  <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-300 opacity-0 group-hover:opacity-100">
                    <p className="text-sm text-white/90 line-clamp-4 mb-4">
                      {member.bio}
                    </p>
                    {member.social.linkedin && (
                      <Link
                        href={member.social.linkedin}
                        className="inline-flex items-center gap-2 text-sm font-medium hover:underline"
                      >
                        Connect on LinkedIn <ArrowUpRight className="w-4 h-4" />
                      </Link>
                    )}
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
