"use client";

import { FaqSection as FaqComponent } from "@/components/ui/faq-section";

interface PageSettings {
  faq?: {
    title?: string;
    description?: string;
    items?: Array<{
      question: string;
      answer: string;
    }>;
  };
}

interface ServicesFaqSectionProps {
  pageSettings?: PageSettings | null;
}

export default function ServicesFaqSection({ pageSettings }: ServicesFaqSectionProps) {
  // Use dynamic FAQs or fallback to default
  const faqs = pageSettings?.faq?.items?.length ? 
    pageSettings.faq.items : [
    {
      question: "What is end-to-end labor law compliance management?",
      answer:
        "It includes comprehensive solutions for managing labor law requirements, from records generation to remittances, enhanced with automation for seamless operations.",
    },
    {
      question: "How does the Compliance Calendar help businesses?",
      answer:
        "The Compliance Calendar provides automated tracking of all critical compliance deadlines, ensuring your business never misses important regulatory requirements and stays on schedule with timely reminders and notifications.",
    },
    {
      question: "What is the Social Security Bot (SS Bot)?",
      answer:
        "The SS Bot simplifies the process of generating UANs and IPs for employees, offering a fast and accurate solution to manage social security registrations.",
    },
    {
      question: "Can TrusComp handle inspections and audits?",
      answer:
        "Yes, TrusComp provides expert assistance for inspection handling, audit appearances, and vendor and employer audits, ensuring you are fully prepared.",
    },
    {
      question: "How do TrusComp's services enhance ROI?",
      answer:
        "Our innovative tools and scalable solutions ensure compliance while improving efficiency, reducing manual effort, and delivering measurable operational benefits.",
    },
  ];

  return (
    <FaqComponent
      badge="FAQ'S"
      title={pageSettings?.faq?.title || "Frequently Asked Questions"}
      subtitle=""
      description={pageSettings?.faq?.description || "Find answers to common questions about our compliance services."}
      faqs={faqs}
    />
  );
}
