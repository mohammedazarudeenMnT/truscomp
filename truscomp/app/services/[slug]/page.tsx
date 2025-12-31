import { ServiceDetailHero } from "@/components/services/ServiceDetailHero";
import { KeyFeaturesSection } from "@/components/services/KeyFeaturesSection";
import { BenefitsSection } from "@/components/services/BenefitsSection";
import { WhyChooseSection } from "@/components/services/WhyChooseSection";
import { CtaHero } from "@/components/ui/cta-hero";
import { FaqSection } from "@/components/ui/faq-section";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { axiosInstance } from "@/lib/api";

interface SectionConfig {
  enabled: boolean;
  order: number;
  title?: string;
  subtitle?: string;
  description?: string;
}

interface ServiceDetail {
  _id: string;
  slug: string;
  heroTitle: string;
  heroDescription: string;
  heroImage?: string;
  heroButtonText: string;
  isActive: boolean;
  keyFeatures: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
  benefits: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
  whyChoose: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  cta?: {
    badge?: string;
    heading?: string;
    description?: string;
    primaryButtonText?: string;
    primaryButtonHref?: string;
    secondaryButtonText?: string;
    secondaryButtonHref?: string;
    isDark?: boolean;
  };
  sectionConfig?: {
    keyFeatures: SectionConfig;
    benefits: SectionConfig;
    whyChoose: SectionConfig;
    faqs: SectionConfig;
    cta: SectionConfig;
  };
}

// Force dynamic rendering and disable caching
export const dynamic = "force-dynamic";
export const revalidate = 0;

async function getServiceBySlug(slug: string): Promise<ServiceDetail | null> {
  try {
    // Validate slug parameter
    if (!slug || typeof slug !== "string") {
      console.error("Invalid slug parameter:", slug);
      return null;
    }

    const response = await axiosInstance.get(`/api/services/slug/${slug}`, {
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    });
    return response.data?.success ? response.data.data : null;
  } catch (error) {
    console.error("Error fetching service:", error);
    return null;
  }
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  let service = null;

  try {
    const resolvedParams = await params;
    service = await getServiceBySlug(resolvedParams.slug);
  } catch (error) {
    console.error("Error generating service metadata:", error);
  }

  if (!service) {
    return {
      title: "Service Not Found | TrusComp",
      description:
        "The service you're looking for doesn't exist or has been removed.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  // Create structured description
  const description =
    service.heroDescription.length > 160
      ? service.heroDescription.substring(0, 157) + "..."
      : service.heroDescription;

  // Generate dynamic keywords from service content
  const dynamicKeywords = [
    service.heroTitle,
    "compliance services",
    "labor law compliance",
    "TrusComp",
    ...service.keyFeatures.slice(0, 3).map((f) => f.title.toLowerCase()),
    ...service.benefits.slice(0, 2).map((b) => b.title.toLowerCase()),
  ];

  return {
    title: `${service.heroTitle} | TrusComp Compliance Services`,
    description,
    keywords: dynamicKeywords,
    openGraph: {
      title: service.heroTitle,
      description,
      type: "website",
      url: `https://truscomp.com/services/${service.slug}`,
      siteName: "TrusComp",
      images: service.heroImage
        ? [
            {
              url: service.heroImage,
              width: 1200,
              height: 630,
              alt: service.heroTitle,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: service.heroTitle,
      description,
      images: service.heroImage ? [service.heroImage] : [],
    },
    alternates: {
      canonical: `https://truscomp.com/services/${service.slug}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const service = await getServiceBySlug(resolvedParams.slug);

  if (!service) {
    notFound();
  }

  // Structured Data for SEO (JSON-LD)
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.heroTitle,
    description: service.heroDescription,
    provider: {
      "@type": "Organization",
      name: "TrusComp",
      url: "https://truscomp.com",
    },
    areaServed: {
      "@type": "Country",
      name: "India",
    },
    serviceType: "Compliance Management",
    url: `https://truscomp.com/services/${service.slug}`,
    ...(service.heroImage && {
      image: service.heroImage,
    }),
    ...(service.keyFeatures.length > 0 && {
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Key Features",
        itemListElement: service.keyFeatures.map((feature) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: feature.title,
            description: feature.description,
          },
        })),
      },
    }),
    ...(service.faqs.length > 0 && {
      mainEntity: service.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    }),
  };

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://truscomp.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Services",
        item: "https://truscomp.com/services",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: service.heroTitle,
        item: `https://truscomp.com/services/${service.slug}`,
      },
    ],
  };

  // Default section config if not provided
  const defaultSectionConfig = {
    keyFeatures: {
      enabled: true,
      order: 1,
      title: "Key Features",
      subtitle: "",
    },
    benefits: { enabled: true, order: 2, title: "Benefits", subtitle: "" },
    whyChoose: {
      enabled: true,
      order: 3,
      title: "Why Choose Us",
      subtitle: "",
    },
    faqs: {
      enabled: true,
      order: 4,
      title: "FAQs",
      subtitle: "Common Questions Answered",
      description:
        "Get answers to frequently asked questions about our services and how we can help your business.",
    },
    cta: { enabled: true, order: 5 },
  };

  const sectionConfig = service.sectionConfig || defaultSectionConfig;

  // Create section components map
  const sectionComponents: Record<
    string,
    { component: JSX.Element | null; order: number }
  > = {
    keyFeatures: {
      component:
        sectionConfig.keyFeatures.enabled && service.keyFeatures.length > 0 ? (
          <KeyFeaturesSection
            features={service.keyFeatures}
            title={sectionConfig.keyFeatures.title}
            subtitle={sectionConfig.keyFeatures.subtitle}
          />
        ) : null,
      order: sectionConfig.keyFeatures.order,
    },
    benefits: {
      component:
        sectionConfig.benefits.enabled && service.benefits.length > 0 ? (
          <BenefitsSection
            benefits={service.benefits}
            title={sectionConfig.benefits.title}
            subtitle={sectionConfig.benefits.subtitle}
          />
        ) : null,
      order: sectionConfig.benefits.order,
    },
    whyChoose: {
      component:
        sectionConfig.whyChoose.enabled && service.whyChoose.length > 0 ? (
          <WhyChooseSection
            reasons={service.whyChoose}
            title={sectionConfig.whyChoose.title}
            subtitle={sectionConfig.whyChoose.subtitle}
          />
        ) : null,
      order: sectionConfig.whyChoose.order,
    },
    faqs: {
      component:
        sectionConfig.faqs.enabled && service.faqs.length > 0 ? (
          <FaqSection
            title={sectionConfig.faqs.title || `${service.heroTitle} FAQs`}
            subtitle={
              sectionConfig.faqs.subtitle || "Common Questions Answered"
            }
            description={
              sectionConfig.faqs.description ||
              "Get answers to frequently asked questions about our services and how we can help your business."
            }
            faqs={service.faqs}
          />
        ) : null,
      order: sectionConfig.faqs.order,
    },
    cta: {
      component: sectionConfig.cta.enabled ? (
        <CtaHero
          badge={service.cta?.badge || "Ready to Transform Your Compliance?"}
          heading={
            service.cta?.heading ||
            `Start Your ${service.heroTitle} Journey Today`
          }
          description={
            service.cta?.description ||
            "Join hundreds of businesses that trust TrusComp for seamless, automated labor law compliance management."
          }
          buttons={[
            {
              text: service.cta?.primaryButtonText || "Get Started Now",
              href: service.cta?.primaryButtonHref || "/contact",
              variant: "secondary",
            },
            {
              text: service.cta?.secondaryButtonText || "Schedule Consultation",
              href: service.cta?.secondaryButtonHref || "/contact",
              variant: "outline",
            },
          ]}
          isDark={service.cta?.isDark !== undefined ? service.cta.isDark : true}
        />
      ) : null,
      order: sectionConfig.cta.order,
    },
  };

  // Sort sections by order and filter out null components
  const orderedSections = Object.entries(sectionComponents)
    .sort(([, a], [, b]) => a.order - b.order)
    .filter(([, section]) => section.component !== null)
    .map(([key, section]) => ({ key, component: section.component }));

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />

      <div className="min-h-screen bg-background">
        {/* Hero Section - Always visible */}
        <ServiceDetailHero
          title={service.heroTitle}
          description={service.heroDescription}
          buttonText={service.heroButtonText}
          buttonHref="/contact"
          backgroundImage={
            service.heroImage ||
            "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&q=80"
          }
        />

        {/* Dynamic Sections - Rendered based on configuration */}
        {orderedSections.map(({ key, component }) => (
          <div key={key}>{component}</div>
        ))}
      </div>
    </>
  );
}
