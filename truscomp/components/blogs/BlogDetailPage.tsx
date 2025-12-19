"use client";

import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, Calendar, Share2, Bookmark } from "lucide-react";
import { BlogPostCard } from "./BlogPostCard";

interface Author {
  name: string;
  avatar?: string;
  bio?: string;
  role?: string;
}

interface RelatedPost {
  tag: string;
  date: string;
  title: string;
  description: string;
  href: string;
  readTime?: string;
}

interface BlogDetailPageProps {
  category: string;
  title: string;
  subtitle?: string;
  author: Author;
  publishedDate: string;
  readTime: string;
  featuredImage?: string;
  content: string;
  relatedPosts?: RelatedPost[];
  onBack?: () => void;
}

export function BlogDetailPage({
  category,
  title,
  subtitle,
  author,
  publishedDate,
  readTime,
  featuredImage,
  content,
  relatedPosts = [],
  onBack,
}: BlogDetailPageProps) {
  const [completion, setCompletion] = React.useState(0);

  React.useEffect(() => {
    const updateScrollCompletion = () => {
      const currentProgress = window.scrollY;
      const scrollHeight = document.body.scrollHeight - window.innerHeight;
      if (scrollHeight) {
        setCompletion(
          Number((currentProgress / scrollHeight).toFixed(2)) * 100
        );
      }
    };

    window.addEventListener("scroll", updateScrollCompletion);
    return () => window.removeEventListener("scroll", updateScrollCompletion);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 z-[60]">
        <motion.div
          className="h-full bg-primary"
          style={{ width: `${completion}%` }}
        />
      </div>

      {/* Back Button */}
      <div className="border-b bg-background/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 max-w-5xl flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={onBack} className="gap-2 group">
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to articles
          </Button>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Share2 className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Bookmark className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <article className="pb-24">
        {/* Article Header */}
        <div className="relative pt-16 pb-12 md:pt-24 md:pb-20 overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_-20%,hsl(var(--primary)/0.1),transparent_70%)]" />
          
          <div className="container mx-auto px-6 max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <Badge className="px-4 py-1 text-xs font-bold uppercase tracking-widest bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
                {category}
              </Badge>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.15] text-balance">
                {title}
              </h1>

              {subtitle && (
                <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto text-balance">
                  {subtitle}
                </p>
              )}

              <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground pt-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                    {author.name.charAt(0)}
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-foreground">{author.name}</p>
                    <p className="text-xs">{author.role || "Author"}</p>
                  </div>
                </div>
                <div className="h-8 w-px bg-border hidden md:block" />
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{publishedDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{readTime}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Featured Image */}
        {featuredImage && (
          <div className="container mx-auto px-6 max-w-5xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl border border-border"
            >
              <img
                src={featuredImage}
                alt={title}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        )}

        {/* Article Content */}
        <div className="container mx-auto px-6 max-w-3xl pt-16 md:pt-24">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="prose prose-lg dark:prose-invert max-w-none 
              prose-headings:font-bold prose-headings:tracking-tight
              prose-p:leading-relaxed prose-p:text-muted-foreground/90
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline
              prose-img:rounded-2xl prose-img:shadow-lg
              prose-blockquote:border-l-primary prose-blockquote:bg-primary/5 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-xl"
            dangerouslySetInnerHTML={{ __html: content }}
          />

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="mt-32 pt-16 border-t">
              <h2 className="text-3xl font-bold mb-12">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {relatedPosts.map((post, index) => (
                  <BlogPostCard key={index} post={post} variant="default" />
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </div>
  );
}
