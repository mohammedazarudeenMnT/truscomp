import TimelineHeroSection from "@/components/about/timeline-hero-section";
import TimelinePhasesSection from "@/components/about/timeline-phases-section";
import TimelineWhySection from "@/components/about/timeline-why-section";
import TimelineFaqSection from "@/components/about/timeline-faq-section";
import TimelineCtaSection from "@/components/about/timeline-cta-section";
import { axiosInstance } from "@/lib/api";
import type { Metadata } from "next";
import { cache } from "react";

// Force dynamic rendering
export const dynamic = "force-dynamic";
export const revalidate = 0;

const DEFAULT_SEO = {
  title: "Timelines & Milestones | TrusComp's Journey & Growth Story",
  description:
    "Explore TrusComp's journey through key milestones and achievements. Discover our growth story and major accomplishments.",
  keywords:
    "truscomp history, company milestones, growth story, timeline, achievements, company journey",
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
      "/api/page-seo/timelines-milestones",
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
      url: "https://truscomp.com/about/timelines-and-milestones",
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
      canonical: "https://truscomp.com/about/timelines-and-milestones",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function TimelinesAndMilestonesPage() {
  // Fetch ALL section data from API
  let pageData = null;

  try {
    const response = await axiosInstance.get(
      "/api/about-page-settings/timelines-milestones",
      {
        headers: { "Cache-Control": "no-cache, no-store, must-revalidate" },
      }
    );
    pageData = response.data?.success ? response.data.data : null;
  } catch (error) {
    console.error("Error fetching timelines page data:", error);
  }

  // Structured Data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: pageData?.hero?.heading || "Timelines & Milestones",
    description: pageData?.hero?.description || DEFAULT_SEO.description,
    url: "https://truscomp.com/about/timelines-and-milestones",
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
        name: "Timelines & Milestones",
        item: "https://truscomp.com/about/timelines-and-milestones",
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
        <TimelineHeroSection data={pageData?.hero} />
        <TimelinePhasesSection data={pageData?.timeline} />
        <TimelineWhySection data={pageData?.why} />
        <TimelineFaqSection data={pageData?.faq} />
        <TimelineCtaSection data={pageData?.cta} />
      </main>
    </>
  );
}
