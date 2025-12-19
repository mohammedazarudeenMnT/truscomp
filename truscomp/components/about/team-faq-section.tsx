"use client";

import { FaqSection as FaqComponent } from "@/components/ui/faq-section";

const faqs = [
  {
    question: "Who are the founders of TrusComp?",
    answer:
      "TrusComp was founded by S. Deenadayalan, Anand Gopalan, and PPK Mahindhra—visionaries with expertise in compliance, labor law, and technology.",
  },
  {
    question: "What makes TrusComp's leadership team unique?",
    answer:
      "Our leadership team blends decades of experience in HR, compliance, and business development with a forward-thinking approach to delivering innovative solutions.",
  },
  {
    question: "How does TrusComp's team ensure compliance excellence?",
    answer:
      "With a commitment to innovation, our team leverages advanced tools, industry expertise, and a client-focused approach to deliver compliance solutions that drive results.",
  },
  {
    question: "What industries does TrusComp's team serve?",
    answer:
      "TrusComp serves diverse industries, including manufacturing, healthcare, technology, and more, offering tailored compliance solutions for each sector.",
  },
  {
    question: "How can I connect with TrusComp's team?",
    answer:
      "Reach out to schedule a consultation or request a demo and discover how our team can support your compliance journey.",
  },
];

export default function TeamFaqSection() {
  return (
    <FaqComponent
      badge="FAQ'S"
      title="Frequently Asked Questions"
      subtitle=""
      description="Questions about our team, leadership, and expertise."
      image="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=830&h=844&auto=format&fit=crop"
      faqs={faqs}
      layout="with-image"
    />
  );
}
