import { MetadataRoute } from "next";
import { axiosInstance } from "@/lib/api";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://truscomp.com";

interface BlogPost {
  slug: string;
  publishedAt?: string;
  createdAt: string;
}

async function getBlogs(): Promise<BlogPost[]> {
  try {
    const response = await axiosInstance.get("/api/blog", {
      headers: { "Cache-Control": "no-cache" },
    });
    return response.data.success ? response.data.data : [];
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogs = await getBlogs();

  const blogUrls = blogs.map((blog) => ({
    url: `${SITE_URL}/resources/blogs-brand-and-service/${blog.slug}`,
    lastModified: new Date(blog.publishedAt || blog.createdAt),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: `${SITE_URL}/resources/blogs-brand-and-service`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    ...blogUrls,
  ];
}
