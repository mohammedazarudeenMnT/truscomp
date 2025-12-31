import ArchHeroSection from "@/components/about/arch-hero-section";
import ArchFeaturesSection from "@/components/about/arch-features-section";
import ArchBenefitsSection from "@/components/about/arch-benefits-section";
import ArchWhySection from "@/components/about/arch-why-section";
import ArchFaqSection from "@/components/about/arch-faq-section";
import ArchCtaSection from "@/components/about/arch-cta-section";
import { axiosInstance } from "@/lib/api";
import type { Metadata } from "next";
import { cache } from "react";

// Force dynamic rendering
export const dynamic = "force-dynamic";
export const revalidate = 0;

const DEFAULT_SEO = {
  title: "Software Architecture | The Engine Behind TrusComp Solutions",
  description:
    "Discover the robust software architecture powering TrusComp's compliance solutions. Learn about our technology stack and engineering excellence.",
  keywords:
    "software architecture, compliance technology, engineering, tech stack, system design",
};

interface PageSEO {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string;
  ogImage?: string;
}

// Cache the API calls to avoid duplicate requests
const getPageSEO = cache(async (): Promise<PageSEO | null> => {
  try {
    const response = await axiosInstance.get(
      "/api/page-seo/software-architecture",
      {
        headers: { "Cache-Control": "no-cache" },
      }
    );
    return response.data.success ? response.data.data : null;
  } catch {
    return null;
  }
});

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
      url: "https://truscomp.com/about/software-architecture-the-engine-behind-our-solution",
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
      canonical:
        "https://truscomp.com/about/software-architecture-the-engine-behind-our-solution",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function SoftwareArchitecturePage() {
  // Fetch ALL section data from API
  let pageData = null;

  try {
    const response = await axiosInstance.get(
      "/api/about-page-settings/software-architecture",
      {
        headers: { "Cache-Control": "no-cache, no-store, must-revalidate" },
      }
    );
    pageData = response.data?.success ? response.data.data : null;
  } catch (error) {
    console.error("Error fetching software architecture page data:", error);
  }

  // Structured Data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    name: pageData?.hero?.heading || "Software Architecture",
    description: pageData?.hero?.description || DEFAULT_SEO.description,
    url: "https://truscomp.com/about/software-architecture-the-engine-behind-our-solution",
    author: {
      "@type": "Organization",
      name: "TrusComp",
    },
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
        name: "About",
        item: "https://truscomp.com/about",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Software Architecture",
        item: "https://truscomp.com/about/software-architecture-the-engine-behind-our-solution",
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
        <ArchHeroSection data={pageData?.hero} />
        <ArchFeaturesSection data={pageData?.features} />
        <ArchBenefitsSection data={pageData?.benefits} />
        <ArchWhySection data={pageData?.why} />
        <ArchFaqSection data={pageData?.faq} />
        <ArchCtaSection data={pageData?.cta} />
      </main>
    </>
  );
}
