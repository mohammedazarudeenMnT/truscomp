"use client";

import { FaqSection as FaqComponent } from "@/components/ui/faq-section";

const faqs = [
  {
    question: "What makes TrusComp's software architecture unique?",
    answer:
      "Our platform combines a scalable cloud-based infrastructure, robust security measures, and open APIs to deliver efficient and secure compliance solutions tailored to your business needs.",
  },
  {
    question: "How does the platform ensure data security?",
    answer:
      "We implement industry-leading encryption, multi-factor authentication, role-based access controls, and regular security audits to safeguard your data at all times.",
  },
  {
    question: "Can the platform integrate with existing systems?",
    answer:
      "Yes, our open APIs enable seamless integration with HRM, ERP, and financial systems, ensuring unified workflows without disruption.",
  },
  {
    question: "Is the platform suitable for businesses of all sizes?",
    answer:
      "Absolutely. Our scalable architecture supports businesses ranging from small enterprises to multinational corporations, growing with your needs.",
  },
  {
    question: "How do I start using TrusComp's software solutions?",
    answer:
      "Simply schedule a free consultation or request a demo to discover how our technology can transform your compliance management.",
  },
];

export default function ArchFaqSection() {
  return (
    <FaqComponent
      badge="FAQ'S"
      title="Frequently Asked Questions"
      subtitle=""
      description="Common questions about our software architecture and technology platform"
      image="https://images.unsplash.com/photo-1516534775068-bb57e39c2d1b?q=80&w=830&h=844&auto=format&fit=crop"
      faqs={faqs}
      layout="with-image"
    />
  );
}
