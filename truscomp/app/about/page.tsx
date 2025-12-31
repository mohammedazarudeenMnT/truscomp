import AboutHeroSection from "@/components/about/hero-section";
import FoundersSection from "@/components/about/founders-section";
import ImpactSection from "@/components/about/impact-section";
import WhyTrusCompSection from "@/components/about/why-truscomp-section";
import FaqSection from "@/components/about/faq-section";
import { AboutCtaSection } from "@/components/about/cta-section";
import { axiosInstance } from "@/lib/api";
import type { Metadata } from "next";
import { cache } from "react";

// Force dynamic rendering
export const dynamic = "force-dynamic";
export const revalidate = 0;

const DEFAULT_SEO = {
  title: "About TrusComp | Leading Compliance Solutions Provider",
  description:
    "Learn about TrusComp's mission to transform regulatory adherence through innovation and expertise. Meet our team and discover our impact.",
  keywords:
    "about truscomp, compliance company, labor law experts, compliance team, company history",
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
    const response = await axiosInstance.get("/api/page-seo/about", {
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
      url: "https://truscomp.com/about",
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
      canonical: "https://truscomp.com/about",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function AboutPage() {
  // Fetch ALL section data from API
  let pageData = null;

  try {
    const response = await axiosInstance.get("/api/about-page-settings/about", {
      headers: { "Cache-Control": "no-cache, no-store, must-revalidate" },
    });
    pageData = response.data?.success ? response.data.data : null;
  } catch (error) {
    console.error("Error fetching about page data:", error);
  }

  // Structured Data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: pageData?.hero?.title || "About TrusComp",
    description: pageData?.hero?.description || DEFAULT_SEO.description,
    url: "https://truscomp.com/about",
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
        <AboutHeroSection data={pageData?.hero} />
        <FoundersSection data={pageData?.founders} />
        <ImpactSection data={pageData?.impact} />
        <WhyTrusCompSection data={pageData?.whySection} />
        <FaqSection data={pageData?.faq} />
        <AboutCtaSection data={pageData?.cta} />
      </main>
    </>
  );
}
