import { HomePage } from "@/components/home";
import { axiosInstance } from "@/lib/api";
import type { Metadata } from "next";
import { cache } from "react";

// Force dynamic rendering and disable caching for development
// In production, you might want to use ISR with revalidate
// export const revalidate = 60; // Revalidate every 60 seconds in production
export const dynamic = "force-dynamic";
export const revalidate = 0;

const DEFAULT_SEO = {
  title:
    "TrusComp | Comprehensive Compliance Solutions | Labor Law & Factory Compliance",
  description:
    "Transforming regulatory adherence through innovation and expertise. Trusted by 100+ companies for comprehensive compliance management solutions.",
  keywords:
    "compliance management, labor law compliance, factory compliance, regulatory compliance, TrusComp",
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
    const response = await axiosInstance.get("/api/page-seo/home", {
      headers: { "Cache-Control": "no-cache" },
    });
    return response.data.success ? response.data.data : null;
  } catch {
    return null;
  }
});

const getHomePageSettings = cache(async () => {
  try {
    const response = await axiosInstance.get("/api/home-page-settings", {
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    });
    return response.data?.success ? response.data.data : null;
  } catch (error) {
    console.error("Error fetching home page settings:", error);
    // Return null to use default fallback data in components
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
      url: "https://truscomp.com",
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
      canonical: "https://truscomp.com",
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

export default async function Home() {
  // Fetch data with error boundaries - this will use cached result from generateMetadata
  let pageSettings = null;

  try {
    pageSettings = await getHomePageSettings();
  } catch (error) {
    console.error("Error fetching home page data:", error);
    // Continue with null data - components have fallbacks
  }

  // Structured Data for SEO (JSON-LD)
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "TrusComp",
    description:
      pageSettings?.hero?.sections?.[0]?.description || DEFAULT_SEO.description,
    url: "https://truscomp.com",
    logo: "https://truscomp.com/logo.png",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-XXXXXXXXXX",
      contactType: "customer service",
      availableLanguage: "English",
    },
    sameAs: [
      "https://www.linkedin.com/company/truscomp",
      "https://twitter.com/truscomp",
    ],
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

      <HomePage initialData={pageSettings} />
    </>
  );
}
