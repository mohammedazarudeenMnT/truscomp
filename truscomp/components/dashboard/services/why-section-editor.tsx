"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2, Save, X, Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { axiosInstance } from "@/lib/api";
import { IconPicker } from "@/components/ui/icon-picker";

interface WhyFeature {
  icon: string;
  title: string;
  description: string;
}

export default function WhySectionEditor() {
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    features: [] as WhyFeature[],
  });
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [featureForm, setFeatureForm] = useState<WhyFeature>({
    icon: "",
    title: "",
    description: "",
  });

  useEffect(() => {
    const fetchWhySection = async () => {
      try {
        const response = await axiosInstance.get("/api/services-page-settings");
        if (response.data.success && response.data.data?.whySection) {
          setFormData(response.data.data.whySection);
        }
      } catch (error) {
        toast.error("Failed to fetch why section");
      } finally {
        setIsLoading(false);
      }
    };
    fetchWhySection();
  }, []);

  const handleSave = async () => {
    if (!formData.title || !formData.subtitle) {
      toast.error("Please fill in the title and subtitle");
      return;
    }

    try {
      setIsSaving(true);
      const response = await axiosInstance.put("/api/services-page-settings/why-section", formData);
      if (response.data.success) {
        toast.success("Why section updated successfully");
      }
    } catch (error) {
      toast.error("Failed to update why section");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  const handleAddFeature = () => {
    setIsAdding(true);
    setEditingIndex(null);
    setFeatureForm({
      icon: "",
      title: "",
      description: "",
    });
  };

  const handleEditFeature = (index: number) => {
    setEditingIndex(index);
    setIsAdding(false);
    setFeatureForm(formData.features[index]);
  };

  const handleSaveFeature = () => {
    if (!featureForm.title || !featureForm.description) {
      toast.error("Please fill in all feature fields");
      return;
    }

    const newFeature = {
      ...featureForm,
      icon: featureForm.icon || "Star",
    };

    let updatedFeatures;
    if (isAdding) {
      updatedFeatures = [...formData.features, newFeature];
    } else if (editingIndex !== null) {
      updatedFeatures = formData.features.map((feature, index) =>
        index === editingIndex ? newFeature : feature
      );
    } else {
      return;
    }

    setFormData({ ...formData, features: updatedFeatures });
    setIsAdding(false);
    setEditingIndex(null);
    setFeatureForm({ icon: "", title: "", description: "" });
    toast.success(isAdding ? "Feature added" : "Feature updated");
  };

  const handleCancelFeature = () => {
    setIsAdding(false);
    setEditingIndex(null);
    setFeatureForm({ icon: "", title: "", description: "" });
  };

  const handleDeleteFeature = (index: number) => {
    if (confirm("Are you sure you want to delete this feature?")) {
      const updatedFeatures = formData.features.filter((_, i) => i !== index);
      setFormData({ ...formData, features: updatedFeatures });
      toast.success("Feature deleted");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Why Choose Section</h3>
          <p className="text-sm text-muted-foreground">
            Highlight the key reasons customers should choose your services
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
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">{formData.title || "Why Choose Us?"}</h2>
              <p className="text-lg text-muted-foreground">{formData.subtitle || "Section subtitle"}</p>
            </div>
            {formData.features.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {formData.features.map((feature, index) => {
                  const IconComponent = require("lucide-react")[feature.icon] || require("lucide-react")["Star"];
                  return (
                    <div key={index} className="text-center">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <IconComponent className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <p>No features added yet. Add features to see the preview.</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Section Content */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Section Content</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="whyTitle">Title *</Label>
              <Input
                id="whyTitle"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Why choose us?"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="whySubtitle">Subtitle *</Label>
              <Input
                id="whySubtitle"
                value={formData.subtitle}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                placeholder="Section subtitle"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Features */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-base">
              Features ({formData.features.length})
            </CardTitle>
            <Button
              onClick={handleAddFeature}
              disabled={isAdding || editingIndex !== null}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Feature
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Add/Edit Form */}
          {(isAdding || editingIndex !== null) && (
            <Card className="border-primary/20">
              <CardContent className="p-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="featureTitle">Title *</Label>
                    <Input
                      id="featureTitle"
                      value={featureForm.title}
                      onChange={(e) => setFeatureForm({ ...featureForm, title: e.target.value })}
                      placeholder="Feature title"
                    />
                  </div>
                  <div className="space-y-2">
                    <IconPicker
                      label="Icon"
                      value={featureForm.icon}
                      onChange={(value) => setFeatureForm({ ...featureForm, icon: value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="featureDescription">Description *</Label>
                  <Textarea
                    id="featureDescription"
                    value={featureForm.description}
                    onChange={(e) => setFeatureForm({ ...featureForm, description: e.target.value })}
                    placeholder="Feature description"
                    rows={3}
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleSaveFeature}>
                    <Save className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                  <Button variant="outline" onClick={handleCancelFeature}>
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Features List */}
          <div className="space-y-3">
            {formData.features.map((feature, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-medium">{feature.title}</h4>
                        <Badge variant="outline" className="text-xs">
                          {feature.icon}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditFeature(index)}
                        disabled={isAdding || editingIndex !== null}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteFeature(index)}
                        disabled={isAdding || editingIndex !== null}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {formData.features.length === 0 && !isAdding && (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                  <Plus className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No features yet</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Add your first feature to get started
                </p>
                <Button onClick={handleAddFeature}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Feature
                </Button>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
}