"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { axiosInstance } from "@/lib/api";
import { Loader2, Save, Search } from "lucide-react";
import { ImageUpload } from "@/components/ui/image-upload";

interface PageSEOEditorProps {
  pageKey: string;
  pageName: string;
}

export default function PageSEOEditor({ pageKey, pageName }: PageSEOEditorProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [formData, setFormData] = useState({
    metaTitle: "",
    metaDescription: "",
    keywords: "",
    ogImage: null as string | null,
  });

  useEffect(() => {
    const fetchSEO = async () => {
      try {
        const response = await axiosInstance.get(`/api/page-seo/${pageKey}`);
        if (response.data.success && response.data.data) {
          const data = response.data.data;
          setFormData({
            metaTitle: data.metaTitle || "",
            metaDescription: data.metaDescription || "",
            keywords: data.keywords || "",
            ogImage: data.ogImage || null,
          });
        }
      } catch (error) {
        console.error("Failed to fetch SEO settings:", error);
      } finally {
        setIsFetching(false);
      }
    };
    fetchSEO();
  }, [pageKey]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await axiosInstance.post("/api/page-seo", {
        pageKey,
        pageName,
        ...formData,
      });
      toast.success("SEO settings saved successfully");
    } catch (error) {
      console.error("Error saving SEO:", error);
      toast.error("Failed to save SEO settings");
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <Search className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">SEO Settings</h3>
            </div>
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="metaTitle">Meta Title</Label>
                <Input
                  id="metaTitle"
                  placeholder="Enter SEO title..."
                  value={formData.metaTitle}
                  onChange={(e) =>
                    setFormData({ ...formData, metaTitle: e.target.value })
                  }
                />
                <p className="text-xs text-muted-foreground">
                  {formData.metaTitle.length}/60 characters recommended
                </p>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="metaDescription">Meta Description</Label>
                <Textarea
                  id="metaDescription"
                  placeholder="Enter SEO description..."
                  value={formData.metaDescription}
                  onChange={(e) =>
                    setFormData({ ...formData, metaDescription: e.target.value })
                  }
                  rows={3}
                />
                <p className="text-xs text-muted-foreground">
                  {formData.metaDescription.length}/160 characters recommended
                </p>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="keywords">Keywords</Label>
                <Input
                  id="keywords"
                  placeholder="keyword1, keyword2, keyword3"
                  value={formData.keywords}
                  onChange={(e) =>
                    setFormData({ ...formData, keywords: e.target.value })
                  }
                />
                <p className="text-xs text-muted-foreground">
                  Separate keywords with commas
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">OG Image</h3>
            <ImageUpload
              value={formData.ogImage}
              onChange={(value) => setFormData({ ...formData, ogImage: value })}
              aspectRatio="wide"
            />
            <p className="text-xs text-muted-foreground mt-2">
              Image shown when shared on social media (1200×630px)
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-6 border-t">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Save className="w-4 h-4 mr-2" />
          )}
          Save SEO Settings
        </Button>
      </div>
    </form>
  );
}
