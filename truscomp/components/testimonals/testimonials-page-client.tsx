"use client";

import { AnimatedTestimonialGrid } from "@/components/testimonals/animated-testimonial-grid";
import { TestimonialSlider } from "@/components/testimonals/testimonals-slider";
import { FaqSection } from "@/components/ui/faq-section";
import { CtaHero } from "@/components/ui/cta-hero";
import WhyChooseTestimonials from "@/components/testimonals/why-choose-testimonials";

interface TestimonialImage {
  imgSrc: string;
  alt: string;
}

interface Review {
  id?: string | number;
  name: string;
  affiliation: string;
  quote: string;
  imageSrc?: string;
  thumbnailSrc?: string;
  rating?: number;
  isActive?: boolean;
}

interface Feature {
  title: string;
  description: string;
  icon?: string;
}

interface FAQ {
  question: string;
  answer: string;
  isActive?: boolean;
}

interface CTAButton {
  text: string;
  href: string;
  variant?: "default" | "secondary" | "outline";
  icon?: string;
}

interface PageData {
  hero: {
    badgeText: string;
    title: string;
    description: string;
    ctaText: string;
    ctaHref: string;
    testimonialImages: TestimonialImage[];
  };
  testimonials: {
    title: string;
    subtitle: string;
    reviews: Review[];
  };
  whyChoose: {
    title: string;
    subtitle: string;
    features: Feature[];
  };
  faqs: {
    badge: string;
    title: string;
    subtitle?: string;
    description: string;
    image?: string;
    questions: FAQ[];
  };
  cta: {
    badge: string;
    heading: string;
    description: string;
    buttons: CTAButton[];
    isDark?: boolean;
  };
}

interface TestimonialsPageClientProps {
  initialData: PageData | null;
}

// Default fallback data
const DEFAULT_DATA: PageData = {
  hero: {
    badgeText: "Testimonials",
    title: "Trusted by leaders\nfrom various industries",
    description: "Learn why professionals trust our solutions to complete their customer journeys.",
    ctaText: "Read Success Stories",
    ctaHref: "#testimonials",
    testimonialImages: Array.from({ length: 15 }, (_, i) => ({
      imgSrc: `https://i.pravatar.cc/150?img=${i + 1}`,
      alt: `Client ${i + 1}`,
    })),
  },
  testimonials: {
    title: "What Our Clients Say",
    subtitle: "Real stories from businesses transformed by our compliance solutions",
    reviews: [
      {
        id: 1,
        name: "Mr. Senthil",
        affiliation: "HR Lead, Government-Owned Utility Company",
        quote:
          "TrusComp's 'Innovative Self-funding Model' significantly improved our compliance process by shifting responsibility to vendors, ensuring smooth and efficient audits. The integration of QR codes streamlined our payment verification process. We achieved 100% compliance rate.",
        imageSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&h=500&auto=format&fit=crop",
        thumbnailSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&h=120&auto=format&fit=crop",
        rating: 5,
        isActive: true,
      },
      {
        id: 2,
        name: "Ms. Michele Sereno",
        affiliation: "HR Director",
        quote:
          "Appreciate your prompt support to have this reviewed along with the team. The responsiveness and dedication to our requirements has been outstanding and we truly value the partnership.",
        imageSrc: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&h=500&auto=format&fit=crop",
        thumbnailSrc: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&h=120&auto=format&fit=crop",
        rating: 5,
        isActive: true,
      },
    ],
  },
  whyChoose: {
    title: "Why Our Clients Choose TrusComp?",
    subtitle: "Discover what sets us apart",
    features: [
      {
        title: "Expert Solutions",
        description: "Customized services that address unique compliance challenges.",
        icon: "Sparkles",
      },
      {
        title: "Innovative Tools",
        description: "Technology-driven solutions like QR codes for enhanced efficiency.",
        icon: "Zap",
      },
      {
        title: "Proven Results",
        description: "Demonstrated success across industries with measurable outcomes.",
        icon: "Target",
      },
      {
        title: "Exceptional Support",
        description: "A dedicated team that delivers results, often exceeding expectations.",
        icon: "Headphones",
      },
    ],
  },
  faqs: {
    badge: "FAQ'S",
    title: "Frequently Asked Questions",
    description: "Find answers to common questions about our compliance services.",
    questions: [
      {
        question: "What makes TrusComp's services stand out?",
        answer: "Our innovative, technology-driven approach ensures seamless compliance management with measurable results, tailored to each client's needs.",
        isActive: true,
      },
      {
        question: "Can TrusComp handle industry-specific compliance requirements?",
        answer: "Yes, we specialize in providing customized compliance solutions across industries, from manufacturing to IT and beyond.",
        isActive: true,
      },
    ],
  },
  cta: {
    badge: "READY TO TRANSFORM?",
    heading: "Take the First Step",
    description: "Join the growing list of satisfied clients who trust TrusComp for their compliance needs. Start your seamless compliance journey today!",
    buttons: [
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
    ],
    isDark: true,
  },
};

export default function TestimonialsPageClient({ initialData }: TestimonialsPageClientProps) {
  // Use initialData from server or fallback to defaults
  const pageData = initialData || DEFAULT_DATA;

  // Filter active reviews and FAQs, and add IDs to reviews
  const activeReviews = pageData.testimonials.reviews
    .filter((r) => r.isActive !== false)
    .map((r, index) => ({
      ...r,
      id: r.id || index + 1,
      imageSrc: r.imageSrc || `https://i.pravatar.cc/400?img=${index + 1}`,
      thumbnailSrc: r.thumbnailSrc || `https://i.pravatar.cc/100?img=${index + 1}`,
    }));
  const activeFaqs = pageData.faqs.questions.filter((q) => q.isActive !== false);

  return (
    <div className="w-full">
      {/* Hero Section with AnimatedTestimonialGrid */}
      <AnimatedTestimonialGrid
        testimonials={pageData.hero.testimonialImages}
        badgeText={pageData.hero.badgeText}
        title={
          <>
            {pageData.hero.title.split("\n").map((line, i) => (
              <span key={i}>
                {line}
                {i < pageData.hero.title.split("\n").length - 1 && <br />}
              </span>
            ))}
          </>
        }
        description={pageData.hero.description}
        ctaText={pageData.hero.ctaText}
        ctaHref={pageData.hero.ctaHref}
      />

      {/* Testimonials Slider Section */}
      <section className="py-24 bg-background" id="testimonials">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              {pageData.testimonials.title}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {pageData.testimonials.subtitle}
            </p>
          </div>
          {activeReviews.length > 0 ? (
            <TestimonialSlider reviews={activeReviews} />
          ) : (
            <p className="text-center text-muted-foreground">
              No testimonials available
            </p>
          )}
        </div>
      </section>

      {/* Why Choose TrusComp Section */}
      <WhyChooseTestimonials data={pageData.whyChoose} />

      {/* FAQ Section using reusable FaqSection component */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-7xl">
          <FaqSection
            badge={pageData.faqs.badge}
            title={pageData.faqs.title}
            subtitle={pageData.faqs.subtitle || ""}
            description={pageData.faqs.description}
            faqs={activeFaqs}
          />
        </div>
      </section>

      {/* CTA Section using reusable CtaHero component */}
      <CtaHero
        badge={pageData.cta.badge}
        heading={pageData.cta.heading}
        description={pageData.cta.description}
        buttons={pageData.cta.buttons}
        isDark={pageData.cta.isDark}
      />
    </div>
  );
}
