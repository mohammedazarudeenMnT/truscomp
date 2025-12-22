"use client";

import { useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  Sparkles,
  Search,
  ChevronRight,
  ChevronLeft,
  Loader2,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BlogPostCard } from "@/components/blogs/BlogPostCard";
import { cn } from "@/lib/utils";

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  subtitle?: string;
  description?: string;
  category: string;
  featuredImage?: { url?: string } | string;
  publishedAt?: string;
  isFeatured?: boolean;
}

interface Category {
  _id: string;
  name: string;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface BlogListClientProps {
  initialPosts: BlogPost[];
  pagination?: Pagination;
  categories: Category[];
  initialSearch: string;
  initialCategory: string;
}

export default function BlogListClient({
  initialPosts,
  pagination,
  categories,
  initialSearch,
  initialCategory,
}: BlogListClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState(initialSearch);
  const [isSearching, setIsSearching] = useState(false);

  const currentPage = pagination?.page || 1;
  const totalPages = pagination?.totalPages || 1;

  const updateUrl = useCallback(
    (params: { page?: number; search?: string; category?: string }) => {
      const newParams = new URLSearchParams(searchParams.toString());

      if (params.page !== undefined) {
        if (params.page === 1) newParams.delete("page");
        else newParams.set("page", params.page.toString());
      }
      if (params.search !== undefined) {
        if (params.search === "") newParams.delete("search");
        else newParams.set("search", params.search);
      }
      if (params.category !== undefined) {
        if (params.category === "") newParams.delete("category");
        else newParams.set("category", params.category);
      }

      // Reset to page 1 when search or category changes
      if (params.search !== undefined || params.category !== undefined) {
        newParams.delete("page");
      }

      const queryString = newParams.toString();
      router.push(
        `/resources/blogs-brand-and-service${
          queryString ? `?${queryString}` : ""
        }`,
        { scroll: false }
      );
    },
    [router, searchParams]
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    updateUrl({ search: searchValue });
    setTimeout(() => setIsSearching(false), 500);
  };

  const handleCategoryClick = (categoryName: string) => {
    updateUrl({
      category: categoryName === initialCategory ? "" : categoryName,
    });
  };

  const clearFilters = () => {
    setSearchValue("");
    updateUrl({ search: "", category: "" });
  };

  const featuredPost =
    initialPosts.find((p) => p.isFeatured) || initialPosts[0];
  const otherPosts = initialPosts.filter((p) => p._id !== featuredPost?._id);

  const getImageUrl = (post: BlogPost) => {
    if (!post.featuredImage) return undefined;
    if (typeof post.featuredImage === "string") return post.featuredImage;
    return post.featuredImage.url;
  };

  const hasActiveFilters = initialSearch || initialCategory;

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden bg-background pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_120%,hsl(var(--primary)/0.15),transparent_70%)]" />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] -z-10"
        />

        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex flex-col items-center text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight max-w-5xl mb-8 leading-[1.1]"
            >
              <span className="bg-gradient-to-br from-foreground via-foreground to-foreground/40 bg-clip-text text-transparent">
                Empowering Your <br />
                <span className="text-primary">Business Growth</span>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl md:text-2xl text-muted-foreground max-w-3xl mb-12 leading-relaxed"
            >
              Insights and strategies from industry experts to help you navigate
              compliance, branding, and service excellence.
            </motion.p>

            {/* Search Bar */}
            <motion.form
              onSubmit={handleSearch}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="w-full max-w-2xl relative"
            >
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/50 to-primary/20 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000" />
                <div className="relative bg-background border-2 border-border/50 rounded-2xl overflow-hidden focus-within:border-primary/50 transition-colors">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    placeholder="Search articles, topics, or keywords..."
                    className="pl-12 pr-4 py-8 text-lg border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <Button
                      type="submit"
                      size="sm"
                      className="rounded-xl px-6"
                      disabled={isSearching}
                    >
                      {isSearching ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        "Search"
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </motion.form>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="container mx-auto px-6 py-16 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold mb-2">Browse by Category</h2>
          <p className="text-muted-foreground">
            Explore articles organized by topic
          </p>
        </motion.div>
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category._id}
              onClick={() => handleCategoryClick(category.name)}
              className={cn(
                "px-4 py-2 rounded-full border transition-all",
                initialCategory === category.name
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card hover:bg-primary/10 hover:border-primary/20 border-border"
              )}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Active Filters */}
        {hasActiveFilters && (
          <div className="mt-6 flex items-center gap-3">
            <span className="text-sm text-muted-foreground">
              Active filters:
            </span>
            {initialSearch && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                Search: {initialSearch}
              </span>
            )}
            {initialCategory && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                {initialCategory}
              </span>
            )}
            <button
              onClick={clearFilters}
              className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
              Clear all
            </button>
          </div>
        )}
      </section>

      {/* Blog Content Section */}
      <section id="articles" className="container mx-auto px-6 py-16 max-w-6xl">
        {initialPosts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-muted-foreground mb-4">
              No articles found
            </p>
            {hasActiveFilters && (
              <Button variant="outline" onClick={clearFilters}>
                Clear filters
              </Button>
            )}
          </div>
        ) : (
          <>
            {/* Featured Article (only on first page without filters) */}
            {featuredPost && currentPage === 1 && !hasActiveFilters && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mb-20"
              >
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-3xl font-bold mb-2">
                      Featured Article
                    </h2>
                    <p className="text-muted-foreground">
                      Our top pick for this week
                    </p>
                  </div>
                </div>
                <BlogPostCard
                  post={{
                    tag: featuredPost.category || "General",
                    date: featuredPost.publishedAt
                      ? new Date(featuredPost.publishedAt).toLocaleDateString(
                          "en-US",
                          { year: "numeric", month: "2-digit", day: "2-digit" }
                        )
                      : "Draft",
                    title: featuredPost.title,
                    description:
                      featuredPost.description || featuredPost.subtitle || "",
                    imageUrl: getImageUrl(featuredPost),
                    href: `/resources/blogs-brand-and-service/${featuredPost.slug}`,
                  }}
                  variant="featured"
                />
              </motion.div>
            )}

            {/* All Articles Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
                <div>
                  <h2 className="text-3xl font-bold mb-2">
                    {hasActiveFilters ? "Search Results" : "All Articles"}
                  </h2>
                  <p className="text-muted-foreground">
                    {pagination?.total
                      ? `${pagination.total} article${
                          pagination.total !== 1 ? "s" : ""
                        } found`
                      : "Explore our complete collection"}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(hasActiveFilters || currentPage > 1
                  ? initialPosts
                  : otherPosts
                ).map((post) => (
                  <BlogPostCard
                    key={post._id}
                    post={{
                      tag: post.category || "General",
                      date: post.publishedAt
                        ? new Date(post.publishedAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "2-digit",
                              day: "2-digit",
                            }
                          )
                        : "Draft",
                      title: post.title,
                      description: post.description || post.subtitle || "",
                      imageUrl: getImageUrl(post),
                      href: `/resources/blogs-brand-and-service/${post.slug}`,
                    }}
                    variant="default"
                  />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-12">
                  <Button
                    variant="outline"
                    size="icon"
                    disabled={currentPage === 1}
                    onClick={() => updateUrl({ page: currentPage - 1 })}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (pageNum) => (
                      <Button
                        key={pageNum}
                        variant={
                          pageNum === currentPage ? "default" : "outline"
                        }
                        size="icon"
                        onClick={() => updateUrl({ page: pageNum })}
                      >
                        {pageNum}
                      </Button>
                    )
                  )}
                  <Button
                    variant="outline"
                    size="icon"
                    disabled={currentPage === totalPages}
                    onClick={() => updateUrl({ page: currentPage + 1 })}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </section>
    </div>
  );
}
