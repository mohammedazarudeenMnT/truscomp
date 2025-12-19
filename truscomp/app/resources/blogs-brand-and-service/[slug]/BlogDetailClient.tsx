"use client";

import { useRouter } from "next/navigation";
import { BlogDetailPage } from "@/components/blogs/BlogDetailPage";

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  subtitle?: string;
  description?: string;
  content: string;
  category: string;
  featuredImage?: { url?: string } | string;
  publishedAt?: string;
}

interface BlogDetailClientProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
}

export default function BlogDetailClient({
  post,
  relatedPosts,
}: BlogDetailClientProps) {
  const router = useRouter();

  const getImageUrl = (p: BlogPost) => {
    if (!p.featuredImage) return undefined;
    if (typeof p.featuredImage === "string") return p.featuredImage;
    return p.featuredImage.url;
  };

  const formattedRelatedPosts = relatedPosts.map((p) => ({
    tag: p.category || "General",
    date: p.publishedAt
      ? new Date(p.publishedAt).toLocaleDateString()
      : "Draft",
    title: p.title,
    description: p.description || p.subtitle || "",
    href: `/resources/blogs-brand-and-service/${p.slug}`,
    readTime: "5 min read",
    imageUrl: getImageUrl(p),
  }));

  return (
    <BlogDetailPage
      category={post.category || "General"}
      title={post.title}
      subtitle={post.subtitle || post.description}
      author={{ name: "TrusComp", role: "Editorial Team" }}
      publishedDate={
        post.publishedAt
          ? new Date(post.publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          : "Draft"
      }
      readTime="5 min read"
      featuredImage={getImageUrl(post)}
      content={post.content}
      relatedPosts={formattedRelatedPosts}
      onBack={() => router.push("/resources/blogs-brand-and-service")}
    />
  );
}
