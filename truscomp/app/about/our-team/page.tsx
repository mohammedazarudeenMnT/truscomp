import TeamHeroSection from "@/components/about/team-hero-section";
import TeamFoundersSection from "@/components/about/team-founders-section";
import TeamLeadershipSection from "@/components/about/team-leadership-section";
import TeamLegacySection from "@/components/about/team-legacy-section";
import TeamFaqSection from "@/components/about/team-faq-section";
import { TeamCtaSection } from "@/components/about/team-cta-section";
import { axiosInstance } from "@/lib/api";
import type { Metadata } from "next";
import { cache } from "react";

// Force dynamic rendering
export const dynamic = "force-dynamic";
export const revalidate = 0;

const DEFAULT_SEO = {
  title: "Our Team | Meet the TrusComp Leadership & Experts",
  description:
    "Meet the passionate professionals behind TrusComp's success. Learn about our leadership team and compliance experts.",
  keywords:
    "truscomp team, compliance experts, leadership team, company founders, management team",
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
    const response = await axiosInstance.get("/api/page-seo/our-team", {
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
      url: "https://truscomp.com/about/our-team",
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
      canonical: "https://truscomp.com/about/our-team",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function OurTeamPage() {
  // Fetch ALL section data from API
  let pageData = null;

  try {
    const response = await axiosInstance.get(
      "/api/about-page-settings/our-team",
      {
        headers: { "Cache-Control": "no-cache, no-store, must-revalidate" },
      }
    );
    pageData = response.data?.success ? response.data.data : null;
  } catch (error) {
    console.error("Error fetching our team page data:", error);
  }

  // Structured Data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: pageData?.hero?.heading || "Our Team",
    description: pageData?.hero?.description || DEFAULT_SEO.description,
    url: "https://truscomp.com/about/our-team",
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
        name: "Our Team",
        item: "https://truscomp.com/about/our-team",
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
        <TeamHeroSection data={pageData?.hero} />
        <TeamFoundersSection data={pageData?.founders} />
        <TeamLeadershipSection data={pageData?.leadership} />
        <TeamLegacySection data={pageData?.legacy} />
        <TeamFaqSection data={pageData?.faq} />
        <TeamCtaSection data={pageData?.cta} />
      </main>
    </>
  );
}
