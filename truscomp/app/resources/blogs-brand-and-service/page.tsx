import { Metadata } from "next";
import { Suspense } from "react";
import BlogListClient from "./BlogListClient";
import { axiosInstance } from "@/lib/api";

// Default SEO values
const DEFAULT_SEO = {
  title: "Blog | Expert Insights & Resources | TrusComp",
  description: "Explore expert insights on compliance, branding, and service excellence. Stay updated with the latest industry trends and strategies.",
  keywords: "compliance blog, business insights, labor law, brand strategy, service excellence",
};

interface PageSEO {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string;
  ogImage?: string;
}

async function getPageSEO(): Promise<PageSEO | null> {
  try {
    const response = await axiosInstance.get("/api/page-seo/blog-listing", {
      headers: { "Cache-Control": "no-cache" },
    });
    return response.data.success ? response.data.data : null;
  } catch {
    return null;
  }
}

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
      url: "/resources/blogs-brand-and-service",
      images: seo?.ogImage ? [{ url: seo.ogImage }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: seo?.ogImage ? [seo.ogImage] : [],
    },
    alternates: {
      canonical: "/resources/blogs-brand-and-service",
    },
  };
}

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

interface Category {
  _id: string;
  name: string;
}

interface BlogResponse {
  success: boolean;
  data: BlogPost[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

async function getBlogs(
  page: number = 1,
  limit: number = 9,
  search: string = "",
  category: string = ""
): Promise<BlogResponse> {
  try {
    const params: Record<string, string> = {
      page: page.toString(),
      limit: limit.toString(),
    };
    if (search) params.search = search;
    if (category) params.category = category;

    const response = await axiosInstance.get("/api/blog", {
      params,
      headers: { "Cache-Control": "no-cache" },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return { success: false, data: [] };
  }
}

async function getCategories(): Promise<Category[]> {
  try {
    const response = await axiosInstance.get("/api/categories", {
      headers: { "Cache-Control": "no-cache" },
    });
    return response.data.success ? response.data.data : [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

interface PageProps {
  searchParams: Promise<{ page?: string; search?: string; category?: string }>;
}

export default async function BlogsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = parseInt(params.page || "1");
  const search = params.search || "";
  const category = params.category || "";

  const [blogsData, categories] = await Promise.all([
    getBlogs(page, 9, search, category),
    getCategories(),
  ]);

  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <BlogListClient
        initialPosts={blogsData.data}
        pagination={blogsData.pagination}
        categories={categories}
        initialSearch={search}
        initialCategory={category}
      />
    </Suspense>
  );
}
