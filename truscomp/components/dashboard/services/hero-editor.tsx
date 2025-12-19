"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ImageUpload } from "@/components/ui/image-upload";
import { Save, Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { axiosInstance } from "@/lib/api";
import Image from "next/image";

export default function HeroEditor() {
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    backgroundImage: "",
    primaryButtonText: "",
    secondaryButtonText: "",
  });
  const [showPreview, setShowPreview] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const response = await axiosInstance.get("/api/services-page-settings");
        if (response.data.success && response.data.data?.hero) {
          setFormData(response.data.data.hero);
        }
      } catch (error) {
        toast.error("Failed to fetch hero section");
      } finally {
        setIsLoading(false);
      }
    };
    fetchHero();
  }, []);

  const handleSave = async () => {
    if (!formData.title || !formData.subtitle) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      setIsSaving(true);
      const response = await axiosInstance.put("/api/services-page-settings/hero", formData);
      if (response.data.success) {
        toast.success("Hero section updated successfully");
      }
    } catch (error) {
      toast.error("Failed to update hero section");
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = async () => {
    try {
      const response = await axiosInstance.get("/api/services-page-settings");
      if (response.data.success && response.data.data?.hero) {
        setFormData(response.data.data.hero);
        toast.info("Changes reset");
      }
    } catch (error) {
      toast.error("Failed to reset");
    }
  };

  if (isLoading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Hero Section</h3>
          <p className="text-sm text-muted-foreground">
            Configure the main hero section of your services page
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setShowPreview(!showPreview)}
          >
            {showPreview ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
            {showPreview ? "Hide Preview" : "Show Preview"}
          </Button>
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </div>

      {showPreview && (
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="text-base">Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative rounded-lg overflow-hidden min-h-[300px] flex items-center justify-center">
              {formData.backgroundImage && (
                <div className="absolute inset-0">
                  <Image
                    src={formData.backgroundImage}
                    alt="Hero background"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40" />
                </div>
              )}
              <div className="relative z-10 text-center text-white p-8">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  {formData.title || "Hero Title"}
                </h1>
                <p className="text-lg mb-6 max-w-2xl">
                  {formData.subtitle || "Hero subtitle"}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg">
                    {formData.primaryButtonText || "Primary Button"}
                  </Button>
                  <Button variant="secondary" size="lg">
                    {formData.secondaryButtonText || "Secondary Button"}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Content</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Hero section title"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subtitle">Subtitle *</Label>
              <Textarea
                id="subtitle"
                value={formData.subtitle}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                placeholder="Hero section subtitle"
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Buttons & Image</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="primaryButton">Primary Button Text</Label>
              <Input
                id="primaryButton"
                value={formData.primaryButtonText}
                onChange={(e) => setFormData({ ...formData, primaryButtonText: e.target.value })}
                placeholder="Primary button text"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="secondaryButton">Secondary Button Text</Label>
              <Input
                id="secondaryButton"
                value={formData.secondaryButtonText}
                onChange={(e) => setFormData({ ...formData, secondaryButtonText: e.target.value })}
                placeholder="Secondary button text"
              />
            </div>
            <div className="space-y-2">
              <ImageUpload
                label="Background Image"
                value={formData.backgroundImage}
                onChange={(value) => setFormData({ ...formData, backgroundImage: value || "" })}
                aspectRatio="wide"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-2">
        <Button variant="outline" onClick={handleReset}>
          Reset Changes
        </Button>
      </div>
    </div>
  );
}