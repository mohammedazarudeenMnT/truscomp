"use client";

import { FaqSection as FaqComponent } from "@/components/ui/faq-section";

const faqs = [
  {
    question: "What is TrusComp's vision for compliance management?",
    answer:
      "Our vision is to transform compliance management in India, enabling businesses to achieve regulatory excellence with ease while fostering ethical practices across industries.",
  },
  {
    question: "How does TrusComp embody its core values?",
    answer:
      "Our core values of trust, transparency, ethical practices, and innovation are reflected in every service we provide. These values guide our actions and help us deliver tailored compliance solutions.",
  },
  {
    question: "Why is innovation important in compliance management?",
    answer:
      "Innovation enables us to offer cutting-edge compliance solutions that simplify regulatory adherence and ensure efficiency, keeping our clients ahead in a dynamic regulatory landscape.",
  },
  {
    question: "What sets TrusComp apart in its approach?",
    answer:
      "Our client-centric approach, combined with a commitment to trust, transparency, and continuous learning, ensures customized solutions that exceed client expectations.",
  },
  {
    question: "How does TrusComp foster collaboration within its team?",
    answer:
      "We encourage teamwork and mutual support to drive creativity and deliver the best results. Collaboration is central to our success and the success of our clients.",
  },
];

export default function VisionFAQSection() {
  return (
    <FaqComponent
      badge="FAQ'S"
      title="Frequently Asked Questions"
      subtitle=""
      description="Common questions about our vision, mission, and values."
      image="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=830&h=844&auto=format&fit=crop"
      faqs={faqs}
      layout="with-image"
    />
  );
}
