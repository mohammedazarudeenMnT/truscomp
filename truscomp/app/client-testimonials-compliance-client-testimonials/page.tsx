"use client";

import { AnimatedTestimonialGrid } from "@/components/testimonals/animated-testimonial-grid";
import { TestimonialSlider } from "@/components/testimonals/testimonals-slider";
import { FaqSection } from "@/components/ui/faq-section";
import { CtaHero } from "@/components/ui/cta-hero";
import WhyChooseTestimonials from "@/components/testimonals/why-choose-testimonials";

export default function ClientTestimonialsPage() {
  // Testimonial profile images for hero section
  const testimonials = [
    { imgSrc: "https://i.pravatar.cc/150?img=1", alt: "Client 1" },
    { imgSrc: "https://i.pravatar.cc/150?img=2", alt: "Client 2" },
    { imgSrc: "https://i.pravatar.cc/150?img=3", alt: "Client 3" },
    { imgSrc: "https://i.pravatar.cc/150?img=4", alt: "Client 4" },
    { imgSrc: "https://i.pravatar.cc/150?img=5", alt: "Client 5" },
    { imgSrc: "https://i.pravatar.cc/150?img=6", alt: "Client 6" },
    { imgSrc: "https://i.pravatar.cc/150?img=7", alt: "Client 7" },
    { imgSrc: "https://i.pravatar.cc/150?img=8", alt: "Client 8" },
    { imgSrc: "https://i.pravatar.cc/150?img=9", alt: "Client 9" },
    { imgSrc: "https://i.pravatar.cc/150?img=10", alt: "Client 10" },
    { imgSrc: "https://i.pravatar.cc/150?img=11", alt: "Client 11" },
    { imgSrc: "https://i.pravatar.cc/150?img=12", alt: "Client 12" },
    { imgSrc: "https://i.pravatar.cc/150?img=13", alt: "Client 13" },
    { imgSrc: "https://i.pravatar.cc/150?img=14", alt: "Client 14" },
    { imgSrc: "https://i.pravatar.cc/150?img=15", alt: "Client 15" },
  ];

  // Reviews data for the testimonial slider
  const reviews = [
    {
      id: 1,
      name: "Mr. Senthil",
      affiliation: "HR Lead, Government-Owned Utility Company",
      quote:
        "TrusComp's 'Innovative Self-funding Model' significantly improved our compliance process by shifting responsibility to vendors, ensuring smooth and efficient audits. The integration of QR codes streamlined our payment verification process. We achieved 100% compliance rate.",
      imageSrc:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&h=500&auto=format&fit=crop",
      thumbnailSrc:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&h=120&auto=format&fit=crop",
    },
    {
      id: 2,
      name: "Ms. Michele Sereno",
      affiliation: "HR Director",
      quote:
        "Appreciate your prompt support to have this reviewed along with the team. The responsiveness and dedication to our requirements has been outstanding and we truly value the partnership.",
      imageSrc:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&h=500&auto=format&fit=crop",
      thumbnailSrc:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&h=120&auto=format&fit=crop",
    },
    {
      id: 3,
      name: "Mr. Nikhil Jain",
      affiliation: "Partner, BCL",
      quote:
        "Thanks for sharing the comprehensive document. It covers most of our queries and is prepared with great depth. Your team has done outstanding work preparing and sharing all the details with us.",
      imageSrc:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&h=500&auto=format&fit=crop",
      thumbnailSrc:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&h=120&auto=format&fit=crop",
    },
    {
      id: 4,
      name: "Mr. Noel Fernades",
      affiliation: "HR Manager, ITC",
      quote:
        "You have achieved the impossible and made it possible. Great job; very happy to see the achievement. Your team has done a wonderful job by sharing the attendance of all vendors efficiently.",
      imageSrc:
        "https://images.unsplash.com/photo-1507092091211-81342ee5ff30?q=80&w=400&h=500&auto=format&fit=crop",
      thumbnailSrc:
        "https://images.unsplash.com/photo-1507092091211-81342ee5ff30?q=80&w=100&h=120&auto=format&fit=crop",
    },
    {
      id: 5,
      name: "Mr. Parameswaran",
      affiliation: "HR Manager, Proklearn",
      quote:
        "Thank you very much for sharing the valuable compliance report. The detailed analysis and insights provided have significantly improved our understanding of our compliance status.",
      imageSrc:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&h=500&auto=format&fit=crop",
      thumbnailSrc:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=100&h=120&auto=format&fit=crop",
    },
  ];

  // FAQ data
  const faqs = [
    {
      question: "What makes TrusComp's services stand out?",
      answer:
        "Our innovative, technology-driven approach ensures seamless compliance management with measurable results, tailored to each client's needs.",
    },
    {
      question:
        "Can TrusComp handle industry-specific compliance requirements?",
      answer:
        "Yes, we specialize in providing customized compliance solutions across industries, from manufacturing to IT and beyond.",
    },
    {
      question: "How does TrusComp ensure client satisfaction?",
      answer:
        "We prioritize transparency, proactive communication, and technology-driven efficiency to exceed client expectations consistently.",
    },
    {
      question: "Can I get references or case studies from your clients?",
      answer:
        "Yes, we're happy to share success stories and connect you with satisfied clients upon request.",
    },
    {
      question: "How can I start my compliance journey with TrusComp?",
      answer:
        "Simply Schedule a Free Consultation or Request a Demo to discuss your compliance needs with our experts.",
    },
  ];

  return (
    <div className="w-full">
      {/* Hero Section with AnimatedTestimonialGrid */}
      <AnimatedTestimonialGrid
        testimonials={testimonials}
        badgeText="Testimonials"
        title={
          <>
            Trusted by leaders
            <br />
            from various industries
          </>
        }
        description="Learn why professionals trust our solutions to complete their customer journeys."
        ctaText="Read Success Stories"
        ctaHref="#testimonials"
      />

      {/* Testimonials Slider Section */}
      <section className="py-24 bg-background" id="testimonials">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              What Our Clients Say
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real stories from businesses transformed by our compliance
              solutions
            </p>
          </div>
          <TestimonialSlider reviews={reviews} />
        </div>
      </section>

      {/* Why Choose TrusComp Section */}
      <WhyChooseTestimonials />

      {/* FAQ Section using reusable FaqSection component */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-7xl">
          <FaqSection
            badge="FAQ'S"
            title="Frequently Asked Questions"
            subtitle=""
            description="Find answers to common questions about our compliance services."
            image="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=830&h=844&auto=format&fit=crop"
            faqs={faqs}
            layout="with-image"
          />
        </div>
      </section>

      {/* CTA Section using reusable CtaHero component */}
      <CtaHero
        badge="READY TO TRANSFORM?"
        heading="Take the First Step"
        description="Join the growing list of satisfied clients who trust TrusComp for their compliance needs. Start your seamless compliance journey today!"
        buttons={[
          {
            text: "Schedule a Free Consultation",
            href: "/contact",
            variant: "secondary",
          },
          {
            text: "Request a Demo",
            href: "/contact",
            variant: "outline",
          },
        ]}
      />
    </div>
  );
}
