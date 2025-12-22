import { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogDetailClient from "./BlogDetailClient";
import { axiosInstance } from "@/lib/api";

// Force dynamic rendering
export const dynamic = "force-dynamic";
export const revalidate = 0;

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  subtitle?: string;
  description?: string;
  content: string;
  category: string;
  tags?: string[];
  featuredImage?: { url?: string } | string;
  status: string;
  publishedAt?: string;
  isFeatured?: boolean;
  createdAt: string;
}

async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const response = await axiosInstance.get(`/api/blog/slug/${slug}`, {
      headers: { 
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "Pragma": "no-cache",
        "Expires": "0"
      },
    });
    return response.data.success ? response.data.data : null;
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return null;
  }
}

async function getRelatedPosts(
  category: string,
  currentSlug: string
): Promise<BlogPost[]> {
  try {
    const response = await axiosInstance.get("/api/blog", {
      params: { category, limit: 3 },
      headers: { 
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "Pragma": "no-cache",
        "Expires": "0"
      },
    });
    return response.data.success
      ? response.data.data.filter((p: BlogPost) => p.slug !== currentSlug).slice(0, 2)
      : [];
  } catch (error) {
    console.error("Error fetching related posts:", error);
    return [];
  }
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    return {
      title: "Post Not Found | TrusComp",
      description: "The requested blog post could not be found.",
    };
  }

  const imageUrl =
    typeof post.featuredImage === "string"
      ? post.featuredImage
      : post.featuredImage?.url;

  const metaDescription = post.description || post.subtitle || post.title;

  return {
    title: `${post.title} | TrusComp Blog`,
    description: metaDescription,
    keywords: post.tags || [post.category],
    openGraph: {
      title: post.title,
      description: metaDescription,
      type: "article",
      url: `/resources/blogs-brand-and-service/${post.slug}`,
      images: imageUrl ? [{ url: imageUrl, alt: post.title }] : [],
      publishedTime: post.publishedAt,
      section: post.category,
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: metaDescription,
      images: imageUrl ? [imageUrl] : [],
    },
    alternates: {
      canonical: `/resources/blogs-brand-and-service/${post.slug}`,
    },
  };
}

export default async function BlogPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(post.category, post.slug);

  const imageUrl =
    typeof post.featuredImage === "string"
      ? post.featuredImage
      : post.featuredImage?.url;

  // JSON-LD structured data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description || post.subtitle,
    image: imageUrl,
    datePublished: post.publishedAt,
    dateModified: post.createdAt,
    author: {
      "@type": "Organization",
      name: "TrusComp",
    },
    publisher: {
      "@type": "Organization",
      name: "TrusComp",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `/resources/blogs-brand-and-service/${post.slug}`,
    },
    articleSection: post.category,
    keywords: post.tags?.join(", "),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogDetailClient post={post} relatedPosts={relatedPosts} />
    </>
  );
}
