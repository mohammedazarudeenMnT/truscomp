"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { axiosInstance } from "@/lib/api";
import { 
  Loader2, 
  ArrowLeft, 
  Save,
  FileText,
  Tag,
  Eye,
  Star,
  Plus,
  X,
} from "lucide-react";
import { ImageUpload } from "@/components/ui/image-upload";
import LexicalEditor from "@/components/ui/lexical/LexicalEditor";

interface BlogFormProps {
  initialData?: {
    _id?: string;
    title?: string;
    subtitle?: string;
    description?: string;
    content?: string;
    category?: string;
    tags?: string[] | string;
    status?: string;
    isFeatured?: boolean;
    featuredImage?: {
      url?: string;
    };
  };
  isEditing?: boolean;
}

export default function BlogForm({ initialData, isEditing }: BlogFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
    content: "",
    category: "",
    tags: "",
    status: "draft",
    isFeatured: false,
    image: null as string | null,
  });

  const [categories, setCategories] = useState<string[]>([]);
  const [newCategory, setNewCategory] = useState("");
  const [isAddingCategory, setIsAddingCategory] = useState(false);

  // Fetch existing categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get("/api/categories");
        if (response.data.success) {
          const categoryNames = response.data.data.map((cat: { name: string }) => cat.name);
          setCategories(categoryNames);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        subtitle: initialData.subtitle || "",
        description: initialData.description || "",
        content: initialData.content || "",
        category: initialData.category || "",
        tags: Array.isArray(initialData.tags) ? initialData.tags.join(", ") : initialData.tags || "",
        status: initialData.status || "draft",
        isFeatured: initialData.isFeatured || false,
        image: initialData.featuredImage?.url || null,
      });
      if (initialData.category) {
        setCategories(prev => 
          prev.includes(initialData.category!) ? prev : [...prev, initialData.category!]
        );
      }
    }
  }, [initialData]);

  const handleImageChange = (value: string | null) => {
    setFormData({ ...formData, image: value });
  };

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      const cat = newCategory.trim();
      if (!categories.includes(cat)) {
        setCategories([...categories, cat]);
      }
      setFormData({ ...formData, category: cat });
      setNewCategory("");
      setIsAddingCategory(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.category) {
      toast.error("Please select or create a category");
      return;
    }

    setIsLoading(true);

    try {
      const payload = {
        ...formData,
        featuredImage: formData.image,
      };

      if (isEditing) {
        await axiosInstance.put(`/api/blog/${initialData?._id}`, payload);
        toast.success("Blog post updated successfully");
      } else {
        await axiosInstance.post("/api/blog", payload);
        toast.success("Blog post created successfully");
      }
      router.push("/dashboard/content/blogs");
      router.refresh();
    } catch (error: unknown) {
      console.error("Error submitting form:", error);
      toast.error(
        (error as { response?: { data?: { message?: string } } })?.response?.data?.message || 
        "Something went wrong"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div className="flex items-center gap-4">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="shrink-0"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-semibold text-foreground">
              {isEditing ? "Edit Article" : "Create New Article"}
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              {isEditing ? "Update your blog post details" : "Fill in the details to publish a new article"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Save className="w-4 h-4 mr-2" />
            )}
            {isEditing ? "Update" : "Publish"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info Card */}
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <FileText className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">Article Details</h3>
            </div>
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Enter article title..."
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="subtitle">Subtitle</Label>
                <Input
                  id="subtitle"
                  placeholder="A brief subtitle or tagline..."
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Brief description for SEO and previews..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />
              </div>
            </div>
          </div>

          {/* Content Editor Card */}
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <FileText className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">Content</h3>
            </div>
            <div className="min-h-[500px] border border-border rounded-lg overflow-hidden">
              <LexicalEditor
                value={formData.content}
                onChange={(value) => setFormData({ ...formData, content: value })}
                placeholder="Write your article content here..."
              />
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Featured Image Card */}
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Featured Image</h3>
            <ImageUpload
              value={formData.image}
              onChange={handleImageChange}
              aspectRatio="wide"
            />
            <p className="text-xs text-muted-foreground mt-2">
              Recommended: 1200×630px
            </p>
          </div>

          {/* Publishing Options Card */}
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <Eye className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">Publishing</h3>
            </div>
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label>Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => setFormData({ ...formData, status: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between py-3 px-4 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-amber-500" />
                  <Label htmlFor="featured" className="cursor-pointer">Featured Article</Label>
                </div>
                <Switch
                  id="featured"
                  checked={formData.isFeatured}
                  onCheckedChange={(checked) => setFormData({ ...formData, isFeatured: checked })}
                />
              </div>
            </div>
          </div>

          {/* Category & Tags Card */}
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <Tag className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">Organization</h3>
            </div>
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label>Category <span className="text-destructive">*</span></Label>
                {!isAddingCategory ? (
                  <div className="space-y-2">
                    {categories.length > 0 ? (
                      <Select
                        value={formData.category}
                        onValueChange={(value) => setFormData({ ...formData, category: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((cat) => (
                            <SelectItem key={cat} value={cat}>
                              {cat}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <p className="text-sm text-muted-foreground py-2">No categories yet</p>
                    )}
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm"
                      className="w-full"
                      onClick={() => setIsAddingCategory(true)}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Create New Category
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Enter category name..."
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        autoFocus
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            handleAddCategory();
                          }
                        }}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        type="button" 
                        size="sm"
                        onClick={handleAddCategory}
                        disabled={!newCategory.trim()}
                      >
                        Add
                      </Button>
                      <Button 
                        type="button" 
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          setIsAddingCategory(false);
                          setNewCategory("");
                        }}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="tags">Tags</Label>
                <Input
                  id="tags"
                  placeholder="Separate tags with commas..."
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                />
                <p className="text-xs text-muted-foreground">
                  e.g., compliance, security, updates
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
