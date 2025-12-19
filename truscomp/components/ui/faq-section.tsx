"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface FAQItem {
  question: string;
  answer: string;
}

interface FaqSectionProps {
  title: string;
  subtitle: string;
  description: string;
  faqs: FAQItem[];
  badge?: string;
}

export const FaqSection: React.FC<FaqSectionProps> = ({
  title,
  subtitle,
  description,
  faqs,
  badge = "FAQ's",
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto w-full">
            <div className="space-y-2 mb-8">
              {badge && (
                <p className="text-sm font-semibold text-primary uppercase tracking-wide">
                  {badge}
                </p>
              )}
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
                {title}
              </h2>
              {subtitle && (
                <p className="text-sm md:text-base text-muted-foreground mt-2">
                  {subtitle}
                </p>
              )}
              {description && (
                <p className="text-sm text-muted-foreground mt-2 pb-4">
                  {description}
                </p>
              )}
            </div>

            {/* FAQ Items */}
            <div className="space-y-0">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="border-b border-border py-4 cursor-pointer transition-colors hover:bg-muted/30 px-2 -mx-2"
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                >
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-base font-semibold text-foreground">
                      {faq.question}
                    </h3>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className={cn(
                        "shrink-0 text-primary transition-transform duration-500 ease-in-out",
                        openIndex === index && "rotate-180"
                      )}
                    >
                      <path
                        d="m4.5 7.2 3.793 3.793a1 1 0 0 0 1.414 0L13.5 7.2"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>

                  {/* Answer */}
                  <p
                    className={cn(
                      "text-sm text-muted-foreground transition-all duration-500 ease-in-out",
                      openIndex === index
                        ? "opacity-100 max-h-96 pt-4"
                        : "opacity-0 max-h-0 -translate-y-2"
                    )}
                  >
                    {faq.answer}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};
