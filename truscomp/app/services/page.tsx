import ServicesHeroSection from "@/components/services/services-hero-section";
import ServicesGridSection from "@/components/services/services-grid-section";
import ServicesWhySection from "@/components/services/services-why-section";
import ServicesFaqSection from "@/components/services/services-faq-section";
import { axiosInstance } from "@/lib/api";
import type { Metadata } from "next";

// Force dynamic rendering and disable caching
export const dynamic = "force-dynamic";
export const revalidate = 0;

interface Service {
  _id: string;
  slug: string;
  heroTitle: string;
  heroDescription: string;
  heroImage?: string;
  isActive?: boolean;
}

const DEFAULT_SEO = {
  title:
    "Compliance Services | Labor Law & Factory Compliance Solutions | TrusComp",
  description:
    "Explore TrusComp's comprehensive compliance services including labor law compliance, payroll management, factory audits, and contractor compliance solutions.",
  keywords:
    "labor law compliance, factory compliance, contractor compliance, payroll compliance, compliance management",
};

interface PageSEO {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string;
  ogImage?: string;
}

async function getPageSEO(): Promise<PageSEO | null> {
  try {
    const response = await axiosInstance.get("/api/page-seo/services-listing", {
      headers: { "Cache-Control": "no-cache" },
    });
    return response.data.success ? response.data.data : null;
  } catch {
    return null;
  }
}

// Generate dynamic metadata
export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSEO();

  const title = seo?.metaTitle || DEFAULT_SEO.title;
  const description = seo?.metaDescription || DEFAULT_SEO.description;
  const keywords = seo?.keywords || DEFAULT_SEO.keywords;

  return {
    title,
    description,
    keywords: keywords.split(",").map((k) => k.trim()),
    openGraph: {
      title,
      description,
      type: "website",
      url: "https://truscomp.com/services",
      siteName: "TrusComp",
      images: seo?.ogImage
        ? [{ url: seo.ogImage, width: 1200, height: 630 }]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: seo?.ogImage ? [seo.ogImage] : [],
    },
    alternates: {
      canonical: "https://truscomp.com/services",
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

async function getServices(page: number = 1, limit: number = 12) {
  try {
    const response = await axiosInstance.get("/api/services", {
      params: { page, limit },
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    });
    return {
      services: response.data.success ? response.data.data : [],
      pagination: response.data.pagination || null,
    };
  } catch (error) {
    console.error("Error fetching services:", error);
    return { services: [], pagination: null };
  }
}

async function getServicesPageSettings() {
  try {
    const response = await axiosInstance.get("/api/services-page-settings", {
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    });
    return response.data?.success ? response.data.data : null;
  } catch (error) {
    console.error("Error fetching services page settings:", error);
    return null;
  }
}

export default async function ServicesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  // Await searchParams as it's now a Promise in Next.js 15+
  const resolvedSearchParams = await searchParams;
  // Parse page number with fallback
  const page = Math.max(1, parseInt(resolvedSearchParams?.page || "1") || 1);

  const [{ services, pagination }, pageSettings] = await Promise.all([
    getServices(page, 12),
    getServicesPageSettings(),
  ]);

  // Use dynamic SEO data from backend
  const seoTitle =
    pageSettings?.hero?.title ||
    "Compliance Services | Labor Law & Factory Compliance Solutions | TrusComp";
  const seoDescription =
    pageSettings?.hero?.subtitle ||
    "Explore TrusComp's comprehensive compliance services including labor law compliance, payroll management, factory audits, and contractor compliance solutions.";

  // Structured Data for SEO (JSON-LD)
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: seoTitle,
    description: seoDescription,
    itemListElement: services.map((service: Service, index: number) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        name: service.heroTitle,
        description: service.heroDescription,
        url: `https://truscomp.com/services/${service.slug}`,
        provider: {
          "@type": "Organization",
          name: "TrusComp",
        },
      },
    })),
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
    ],
  };

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

      <main>
        <ServicesHeroSection pageSettings={pageSettings} />
        <ServicesGridSection services={services} pagination={pagination} />
        <ServicesWhySection pageSettings={pageSettings} />
        <ServicesFaqSection pageSettings={pageSettings} />
      </main>
    </>
  );
}
