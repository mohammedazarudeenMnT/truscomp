import VisionHeroSection from "@/components/about/vision-hero-section";
import VisionMissionSection from "@/components/about/vision-mission-section";
import ValuesSection from "@/components/about/values-section";
import VisionFAQSection from "@/components/about/vision-faq-section";
import JoinCTASection from "@/components/about/join-cta-section";
import { axiosInstance } from "@/lib/api";
import type { Metadata } from "next";
import { cache } from "react";

// Force dynamic rendering
export const dynamic = "force-dynamic";
export const revalidate = 0;

const DEFAULT_SEO = {
  title: "Vision, Mission & Core Values | TrusComp's Guiding Principles",
  description:
    "Discover TrusComp's vision, mission, and core values. Learn about the principles that guide our compliance solutions and company culture.",
  keywords:
    "truscomp vision, company mission, core values, company culture, guiding principles",
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
    const response = await axiosInstance.get("/api/page-seo/vision-mission", {
      headers: { "Cache-Control": "no-cache" },
    });
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
      url: "https://truscomp.com/about/vision-mission-and-core-values",
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
      canonical: "https://truscomp.com/about/vision-mission-and-core-values",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function VisionMissionPage() {
  // Fetch ALL section data from API
  let pageData = null;

  try {
    const response = await axiosInstance.get(
      "/api/about-page-settings/vision-mission",
      {
        headers: { "Cache-Control": "no-cache, no-store, must-revalidate" },
      }
    );
    pageData = response.data?.success ? response.data.data : null;
  } catch (error) {
    console.error("Error fetching vision-mission page data:", error);
  }

  // Structured Data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: pageData?.hero?.heading || "Vision, Mission & Core Values",
    description: pageData?.hero?.description || DEFAULT_SEO.description,
    url: "https://truscomp.com/about/vision-mission-and-core-values",
    mainEntity: {
      "@type": "Organization",
      name: "TrusComp",
      description: pageData?.hero?.description || DEFAULT_SEO.description,
      url: "https://truscomp.com",
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
        name: "Vision, Mission & Core Values",
        item: "https://truscomp.com/about/vision-mission-and-core-values",
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
        <VisionHeroSection data={pageData?.hero} />
        <VisionMissionSection data={pageData?.visionMission} />
        <ValuesSection data={pageData?.values} />
        <VisionFAQSection data={pageData?.faq} />
        <JoinCTASection data={pageData?.cta} />
      </main>
    </>
  );
}
