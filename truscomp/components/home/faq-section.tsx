"use client";

import React from "react";
import { FaqSection as FaqComponent } from "@/components/ui/faq-section";

export const FaqSection: React.FC = () => {
  const faqs = [
    {
      question: "What is compliance management, and why is it important?",
      answer:
        "Compliance management is the process of ensuring your organization adheres to all relevant laws, regulations, and industry standards. It's crucial for avoiding legal penalties, maintaining operational licenses, protecting your reputation, and ensuring sustainable business growth.",
    },
    {
      question: "How can TrusComp support my business?",
      answer:
        "TrusComp provides comprehensive compliance solutions including end-to-end compliance management, risk assessments, training programs, regulatory monitoring, and automated reporting. Our expert team helps you navigate complex regulatory landscapes and maintain continuous compliance.",
    },
    {
      question: "Who are TrusComp's clients?",
      answer:
        "We proudly serve over 100 clients ranging from SMEs to large enterprises across various industries. Our notable clients include Amara Raja, Blue Star, and Dr. Reddy's Laboratories. We work with companies in manufacturing, pharmaceuticals, technology, healthcare, and many other sectors.",
    },
    {
      question: "Are TrusComp's solutions suitable for SMEs?",
      answer:
        "Absolutely! Our solutions are designed to be scalable and customizable for businesses of all sizes. We understand that SMEs have unique requirements and budget constraints, so we offer flexible packages and tailored solutions that grow with your business.",
    },
    {
      question: "How do I start with TrusComp?",
      answer:
        "Getting started is simple! Contact us for a free consultation where we'll assess your current compliance needs and challenges. We'll then propose a customized solution plan, provide implementation timelines, and assign a dedicated compliance expert to guide you through the entire process.",
    },
  ];

  return (
    <FaqComponent
      badge="FAQ"
      title="Frequently Asked Questions"
      subtitle=""
      description="Common questions about our compliance management solutions."
      image="https://images.unsplash.com/photo-1555212697-194d092e3b8f?q=80&w=830&h=844&auto=format&fit=crop"
      faqs={faqs}
      layout="with-image"
    />
  );
};
