"use client";

import { FaqSection as FaqComponent } from "@/components/ui/faq-section";

export default function TimelineFaqSection() {
  const faqs = [
    {
      question: "How long does TrusComp's implementation process take?",
      answer:
        "The full implementation process typically spans 8-9 weeks, with ongoing support provided after deployment.",
    },
    {
      question:
        "Can the project timeline be adjusted to meet urgent requirements?",
      answer:
        "Yes, we can customize the timeline to prioritize urgent compliance needs, ensuring prompt delivery.",
    },
    {
      question: "What kind of training is included in the onboarding phase?",
      answer:
        "Our training sessions include hands-on workshops, system walkthroughs, and detailed user manuals to ensure a smooth transition for all users.",
    },
    {
      question: "How does TrusComp handle compliance updates?",
      answer:
        "We provide regular system updates to reflect the latest regulatory changes, ensuring continued compliance.",
    },
    {
      question: "What support is available after deployment?",
      answer:
        "Our ongoing support includes technical assistance, quarterly reviews, and continuous compliance updates to keep your system running efficiently.",
    },
  ];

  return (
    <FaqComponent
      badge="FAQ'S"
      title="Frequently Asked Questions"
      subtitle=""
      description="Find answers to common questions about our implementation process."
      image="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=830&h=844&auto=format&fit=crop"
      faqs={faqs}
      layout="with-image"
    />
  );
}
