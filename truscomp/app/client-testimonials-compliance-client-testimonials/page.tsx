import TestimonialsPageClient from "../../components/testimonals/testimonials-page-client";
import { axiosInstance } from "@/lib/api";
import type { Metadata } from "next";
import { cache } from "react";

// Force dynamic rendering and disable caching for development
// In production, you might want to use ISR with revalidate
// export const revalidate = 60; // Revalidate every 60 seconds in production
export const dynamic = "force-dynamic";
export const revalidate = 0;

const DEFAULT_SEO = {
  title: "Client Testimonials | TrusComp Compliance Solutions",
  description:
    "Read what our clients say about TrusComp's compliance management solutions. Trusted by industry leaders for seamless compliance and exceptional results.",
  keywords:
    "client testimonials, compliance reviews, TrusComp clients, compliance success stories, customer feedback",
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
      "/api/page-seo/client-testimonials",
      {
        headers: { "Cache-Control": "no-cache" },
      }
    );
    return response.data.success ? response.data.data : null;
  } catch {
    return null;
  }
});

const getTestimonialsPageSettings = cache(async () => {
  try {
    const response = await axiosInstance.get(
      "/api/testimonials-page-settings",
      {
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
        },
      }
    );
    return response.data?.success ? response.data.data : null;
  } catch (error) {
    console.error("Error fetching testimonials page settings:", error);
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
      url: "https://truscomp.com/client-testimonials-compliance-client-testimonials",
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
        "https://truscomp.com/client-testimonials-compliance-client-testimonials",
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

export default async function ClientTestimonialsPage() {
  // Fetch data with error boundaries - this will use cached result from generateMetadata
  let pageSettings = null;

  try {
    pageSettings = await getTestimonialsPageSettings();
  } catch (error) {
    console.error("Error fetching testimonials page data:", error);
    // Continue with null data - components have fallbacks
  }

  // Structured Data for SEO (JSON-LD)
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Client Testimonials",
    description: pageSettings?.hero?.description || DEFAULT_SEO.description,
    url: "https://truscomp.com/client-testimonials-compliance-client-testimonials",
    mainEntity: {
      "@type": "ItemList",
      itemListElement:
        pageSettings?.testimonials?.reviews
          ?.filter((r: { isActive?: boolean }) => r.isActive !== false)
          .map(
            (
              review: {
                name: string;
                affiliation: string;
                quote: string;
                rating?: number;
              },
              index: number
            ) => ({
              "@type": "Review",
              position: index + 1,
              author: {
                "@type": "Person",
                name: review.name,
                jobTitle: review.affiliation,
              },
              reviewBody: review.quote,
              reviewRating: {
                "@type": "Rating",
                ratingValue: review.rating || 5,
                bestRating: 5,
              },
            })
          ) || [],
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
        name: "Client Testimonials",
        item: "https://truscomp.com/client-testimonials-compliance-client-testimonials",
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

      <TestimonialsPageClient initialData={pageSettings} />
    </>
  );
}
