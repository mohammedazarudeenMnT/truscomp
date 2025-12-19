"use client";

import { FaqSection as FaqComponent } from "@/components/ui/faq-section";

const faqs = [
  {
    question: "What makes TrusComp unique in the compliance industry?",
    answer:
      "TrusComp stands out through its unique blend of deep domain expertise in labor laws and cutting-edge technology. Our commitment to Trust, Transparency, and Transformation ensures we deliver not just compliance, but value-added solutions that drive organizational growth.",
  },
  {
    question: "Who are the founders of TrusComp?",
    answer:
      "TrusComp was founded by visionary leaders: Mr. S. Deenadayalan (Chairman), Mr. Anand Gopalan (Managing Partner), and Mr. PPK Mahindhra (Managing Partner). Together, they bring decades of experience in consulting, labor law, and technology innovation.",
  },
  {
    question: "How has TrusComp impacted businesses?",
    answer:
      "We have empowered over 100+ clients, including industry leaders like Blue Star and Ola Electric, to achieve flawless compliance management. Our solutions reduce risk, streamline operations, and allow businesses to focus on their core growth strategies.",
  },
  {
    question: "What industries does TrusComp serve?",
    answer:
      "TrusComp serves a diverse range of industries. Our customized compliance solutions are designed to meet the specific regulatory needs of various sectors, ensuring comprehensive coverage and peace of mind for all our clients.",
  },
  {
    question: "How can I connect with TrusComp?",
    answer:
      "Connecting with us is easy! You can reach out through our website's contact form, email us directly, or give us a call. Our team is ready to discuss your compliance needs and how we can assist you.",
  },
];

export default function FAQSection() {
  return (
    <FaqComponent
      badge="FAQ'S"
      title="Frequently Asked Questions"
      subtitle=""
      description="Find answers to common questions about our services, expertise, and impact."
      image="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=830&h=844&auto=format&fit=crop"
      faqs={faqs}
      layout="with-image"
    />
  );
}
