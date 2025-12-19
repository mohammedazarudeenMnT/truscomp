"use client";

import Image from "next/image";
import { GridPattern } from "@/components/ui/grid-pattern";

const leadership = [
  {
    name: "Mr. C. Sreetharan",
    role: "Chief Operating Officer",
    bio: "With over 40 years of HR expertise, Sreetharan brings a strategic approach to labor compliance and employee relations. A graduate of the Madras School of Social Work, his balanced perspective ensures innovative, forward-thinking solutions that address both employer and employee needs.",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=300&fit=crop",
  },
  {
    name: "Mr. M.V. Prakash",
    role: "Senior Vice President, Business Expansion",
    bio: "Prakash leads TrusComp&apos;s business growth initiatives, drawing on 45+ years of experience in market expansion and strategic partnerships. His visionary leadership strengthens TrusComp&apos;s position as a trusted compliance solutions provider.",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop",
  },
  {
    name: "Mr. Ramesh",
    role: "Head of Operations",
    bio: "Ramesh&apos;s 20+ years of experience in HR compliance, coupled with his legal expertise and advanced training from the Institute of Company Secretaries of India, makes him a cornerstone of TrusComp&apos;s operations. He drives innovative solutions that simplify complex compliance initiatives across India.",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop",
  },
];

export default function TeamLeadershipSection() {
  return (
    <section className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Grid Pattern Background */}
      <GridPattern
        width={52}
        height={52}
        x={-1}
        y={-1}
        squares={[
          [4, 4],
          [10, 8],
          [16, 6],
          [22, 10],
          [28, 4],
        ]}
        className="absolute inset-0 h-full w-full opacity-15"
      />
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h3 className="text-lg font-medium text-primary mb-2">Leadership</h3>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            Our Leadership Team
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Experienced professionals driving excellence in compliance
            management
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {leadership.map((leader, index) => (
            <div
              key={index}
              className="group flex flex-col items-center text-center"
            >
              {/* Profile image with border and shadow */}
              <div className="relative mb-6">
                <div className="size-32 rounded-full border-2 border-border p-1 shadow-lg shadow-black/5 bg-background transition-all duration-300 group-hover:border-primary group-hover:shadow-xl">
                  <div className="relative size-full rounded-full overflow-hidden">
                    <Image
                      src={leader.image}
                      alt={leader.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-foreground transition-colors duration-300 group-hover:text-primary">
                  {leader.name}
                </h3>
                <p className="text-sm text-muted-foreground font-medium">
                  {leader.role}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed pt-2">
                  {leader.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
