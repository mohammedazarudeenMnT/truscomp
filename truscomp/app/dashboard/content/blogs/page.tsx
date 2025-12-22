"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Plus,
  Pencil,
  Trash2,
  Search,
  Loader2,
  FileText,
  LayoutGrid,
  List,
  CheckCircle2,
  Clock,
  Eye,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { PageContainer, PageHeader } from "@/components/ui/page-components";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { axiosInstance } from "@/lib/api";

interface BlogPost {
  _id: string;
  title: string;
  subtitle?: string;
  category: string;
  status: string;
  isFeatured?: boolean;
  publishedAt: string;
  createdAt: string;
  featuredImage?: {
    url?: string;
  };
}

export default function BlogDashboardPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "table">("table");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterCategory, setFilterCategory] = useState<string>("all");

  const fetchPosts = async (search = "", status = "all", category = "all") => {
    try {
      setIsLoading(true);
      const params: any = {
        page: 1,
        limit: 100,
      };

      // Add search parameter
      if (search) {
        params.search = search;
      }

      // Add status filter
      if (status !== "all") {
        params.status = status;
      }

      // Add category filter
      if (category !== "all") {
        params.category = category;
      }

      const response = await axiosInstance.get("/api/blog", {
        params,
      });

      if (response.data.success) {
        setPosts(response.data.data);
      }
    } catch (error) {
      toast.error("Failed to fetch blog posts");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(searchTerm, filterStatus, filterCategory);
  }, [searchTerm, filterStatus, filterCategory]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      const response = await axiosInstance.delete(`/api/blog/${id}`);
      if (response.data.success) {
        toast.success("Post deleted successfully");
        fetchPosts(searchTerm, filterStatus, filterCategory);
      }
    } catch {
      toast.error("Failed to delete post");
    }
  };

  const categories = [...new Set(posts.map((p) => p.category).filter(Boolean))];

  const publishedCount = posts.filter((p) => p.status === "published").length;
  const draftCount = posts.filter((p) => p.status === "draft").length;

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <PageContainer maxWidth="full">
      <PageHeader
        title="Blog Posts"
        subtitle="Manage and publish your articles"
        action={
          <div className="flex gap-2">
            <Link href="/dashboard/content/blogs/page">
              <Button variant="outline" size="sm">
                <Search className="w-4 h-4 mr-2" />
                Page Settings
              </Button>
            </Link>
            <Link href="/dashboard/content/blogs/new">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                New Article
              </Button>
            </Link>
          </div>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-10">
        <Card className="bg-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{posts.length}</p>
                <p className="text-xs text-muted-foreground">Total Posts</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{publishedCount}</p>
                <p className="text-xs text-muted-foreground">Published</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-500/10 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-amber-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{draftCount}</p>
                <p className="text-xs text-muted-foreground">Drafts</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-violet-500/10 rounded-lg flex items-center justify-center">
                <Star className="w-5 h-5 text-violet-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {posts.filter((p) => p.isFeatured).length}
                </p>
                <p className="text-xs text-muted-foreground">Featured</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between bg-card border border-border rounded-xl p-4 mt-8">
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search articles..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-full sm:w-36">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
            </SelectContent>
          </Select>
          {categories.length > 0 && (
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
        <div className="flex gap-1 border border-border rounded-lg p-1">
          <Button
            variant={viewMode === "table" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setViewMode("table")}
          >
            <List className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === "grid" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setViewMode("grid")}
          >
            <LayoutGrid className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : posts.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
              <FileText className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No articles found</h3>
            <p className="text-sm text-muted-foreground mb-4 text-center">
              {searchTerm || filterStatus !== "all" || filterCategory !== "all"
                ? "Try adjusting your filters"
                : "Get started by creating your first article"}
            </p>
            {!searchTerm &&
              filterStatus === "all" &&
              filterCategory === "all" && (
                <Link href="/dashboard/content/blogs/new">
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Article
                  </Button>
                </Link>
              )}
          </CardContent>
        </Card>
      ) : viewMode === "table" ? (
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[400px]">Article</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts.map((post) => (
                <TableRow key={post._id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {post.featuredImage?.url ? (
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted shrink-0">
                          <Image
                            src={post.featuredImage.url}
                            alt={post.title}
                            width={48}
                            height={48}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center shrink-0">
                          <FileText className="w-5 h-5 text-muted-foreground" />
                        </div>
                      )}
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-medium truncate">{post.title}</p>
                          {post.isFeatured && (
                            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500 shrink-0" />
                          )}
                        </div>
                        {post.subtitle && (
                          <p className="text-sm text-muted-foreground truncate">
                            {post.subtitle}
                          </p>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {post.category || "Uncategorized"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        post.status === "published" ? "default" : "secondary"
                      }
                      className={
                        post.status === "published"
                          ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                          : ""
                      }
                    >
                      {post.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {formatDate(post.publishedAt || post.createdAt)}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Link href={`/dashboard/content/blogs/${post._id}`}>
                        <Button variant="ghost" size="icon" title="Edit">
                          <Pencil className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Link
                        href={`/resources/blogs-brand-and-service/${post._id}`}
                        target="_blank"
                      >
                        <Button variant="ghost" size="icon" title="View">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(post._id)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {posts.map((post) => (
            <Card
              key={post._id}
              className="group overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="aspect-video relative bg-muted">
                {post.featuredImage?.url ? (
                  <Image
                    src={post.featuredImage.url}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <FileText className="w-12 h-12 text-muted-foreground/50" />
                  </div>
                )}
                <div className="absolute top-3 left-3 flex gap-2">
                  <Badge
                    variant={
                      post.status === "published" ? "default" : "secondary"
                    }
                    className={
                      post.status === "published"
                        ? "bg-emerald-500 text-white"
                        : ""
                    }
                  >
                    {post.status}
                  </Badge>
                  {post.isFeatured && (
                    <Badge className="bg-amber-500 text-white">
                      <Star className="w-3 h-3 mr-1 fill-white" />
                      Featured
                    </Badge>
                  )}
                </div>
              </div>
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <Badge variant="outline" className="text-xs shrink-0">
                    {post.category || "Uncategorized"}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {formatDate(post.publishedAt || post.createdAt)}
                  </span>
                </div>
                <h3 className="font-semibold line-clamp-2 mb-1 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                {post.subtitle && (
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                    {post.subtitle}
                  </p>
                )}
                <div className="flex gap-2 pt-2 border-t border-border">
                  <Link
                    href={`/dashboard/content/blogs/${post._id}`}
                    className="flex-1"
                  >
                    <Button variant="outline" size="sm" className="w-full">
                      <Pencil className="w-3.5 h-3.5 mr-2" />
                      Edit
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(post._id)}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </PageContainer>
  );
}
