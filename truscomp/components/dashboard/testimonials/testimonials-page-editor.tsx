"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Plus, Trash2, Loader2, Save, Star, MessageSquare, HelpCircle, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { axiosInstance } from "@/lib/api";
import { ImageUpload } from "@/components/ui/image-upload";
import { IconSelector } from "@/components/ui/icon-selector";
import PageSEOEditor from "@/components/dashboard/page-seo-editor";

export default function TestimonialsPageEditor() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("hero");

  useEffect(() => {
    fetchData();

    if (typeof window !== "undefined") {
      const hash = window.location.hash.replace("#", "");
      if (hash) setActiveTab(hash);
    }
  }, []);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get("/api/testimonials-page-settings");
      if (response.data.success) {
        setData(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load page data");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (section: string, sectionData: any) => {
    setSaving(true);
    try {
      const response = await axiosInstance.put(`/api/testimonials-page-settings/${section}`, sectionData);

      if (response.data.success) {
        toast.success(`${section} section updated successfully`);
        fetchData();
      } else {
        toast.error(response.data.message || "Failed to update section");
      }
    } catch (error: any) {
      console.error("Error saving:", error);
      toast.error(error.response?.data?.message || "Failed to save changes");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center p-12">
        <p className="text-muted-foreground">No data available</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="hero">Hero</TabsTrigger>
          <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
          <TabsTrigger value="why-choose">Why Choose</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
          <TabsTrigger value="cta">CTA</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
        </TabsList>

        {/* Hero Section */}
        <TabsContent value="hero" className="space-y-6">
          <HeroSection data={data.hero} onSave={(heroData) => handleSave("hero", heroData)} saving={saving} />
        </TabsContent>

        {/* Testimonials Section */}
        <TabsContent value="testimonials" className="space-y-6">
          <TestimonialsSection data={data.testimonials} onSave={(testimonialsData) => handleSave("testimonials", testimonialsData)} saving={saving} />
        </TabsContent>

        {/* Why Choose Section */}
        <TabsContent value="why-choose" className="space-y-6">
          <WhyChooseSection data={data.whyChoose} onSave={(whyChooseData) => handleSave("why-choose", whyChooseData)} saving={saving} />
        </TabsContent>

        {/* FAQ Section */}
        <TabsContent value="faq" className="space-y-6">
          <FaqSection data={data.faqs} onSave={(faqData) => handleSave("faq", faqData)} saving={saving} />
        </TabsContent>

        {/* CTA Section */}
        <TabsContent value="cta" className="space-y-6">
          <CtaSection data={data.cta} onSave={(ctaData) => handleSave("cta", ctaData)} saving={saving} />
        </TabsContent>

        {/* SEO Section */}
        <TabsContent value="seo">
          <PageSEOEditor pageKey="client-testimonials" pageName="Client Testimonials" />
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Hero Section Component
function HeroSection({ data, onSave, saving }: any) {
  const [formData, setFormData] = useState(data);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const addTestimonialImage = () => {
    setFormData({
      ...formData,
      testimonialImages: [...(formData.testimonialImages || []), { imgSrc: "", alt: "" }],
    });
  };

  const removeTestimonialImage = (index: number) => {
    const updated = formData.testimonialImages.filter((_: any, i: number) => i !== index);
    setFormData({ ...formData, testimonialImages: updated });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Star className="w-5 h-5" />
          Hero Section
        </h3>
        <div className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="badgeText">Badge Text</Label>
            <Input
              id="badgeText"
              value={formData.badgeText || ""}
              onChange={(e) => setFormData({ ...formData, badgeText: e.target.value })}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Textarea
              id="title"
              value={formData.title || ""}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              rows={2}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description || ""}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="ctaText">CTA Button Text</Label>
              <Input
                id="ctaText"
                value={formData.ctaText || ""}
                onChange={(e) => setFormData({ ...formData, ctaText: e.target.value })}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="ctaHref">CTA Button Link</Label>
              <Input
                id="ctaHref"
                value={formData.ctaHref || ""}
                onChange={(e) => setFormData({ ...formData, ctaHref: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Testimonial Images (Grid)</Label>
              <Button type="button" size="sm" onClick={addTestimonialImage}>
                <Plus className="w-4 h-4 mr-2" />
                Add Image
              </Button>
            </div>
            {formData.testimonialImages?.map((img: any, index: number) => (
              <div key={index} className="flex gap-4 items-start p-4 border rounded-lg">
                <div className="flex-1 space-y-2">
                  <Label>Client Image</Label>
                  <ImageUpload
                    value={img.imgSrc || ""}
                    onChange={(value) => {
                      const updated = [...formData.testimonialImages];
                      updated[index].imgSrc = value;
                      setFormData({ ...formData, testimonialImages: updated });
                    }}
                    aspectRatio="square"
                  />
                </div>
                <div className="flex-1 grid gap-2">
                  <Label>Alt Text</Label>
                  <Input
                    value={img.alt || ""}
                    onChange={(e) => {
                      const updated = [...formData.testimonialImages];
                      updated[index].alt = e.target.value;
                      setFormData({ ...formData, testimonialImages: updated });
                    }}
                    placeholder="Client name"
                  />
                </div>
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  onClick={() => removeTestimonialImage(index)}
                  className="mt-6"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <div className="flex justify-end">
        <Button type="submit" disabled={saving}>
          {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          <Save className="w-4 h-4 mr-2" />
          Save Hero Section
        </Button>
      </div>
    </form>
  );
}

// Testimonials Section Component
function TestimonialsSection({ data, onSave, saving }: any) {
  const [formData, setFormData] = useState(data);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const addReview = () => {
    setFormData({
      ...formData,
      reviews: [
        ...(formData.reviews || []),
        {
          name: "",
          affiliation: "",
          quote: "",
          imageSrc: "",
          thumbnailSrc: "",
          rating: 5,
          isActive: true,
        },
      ],
    });
  };

  const removeReview = (index: number) => {
    const updated = formData.reviews.filter((_: any, i: number) => i !== index);
    setFormData({ ...formData, reviews: updated });
  };

  const updateReview = (index: number, field: string, value: any) => {
    const updated = [...formData.reviews];
    updated[index][field] = value;
    setFormData({ ...formData, reviews: updated });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <MessageSquare className="w-5 h-5" />
          Testimonials Section
        </h3>
        <div className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="testimonialsTitle">Section Title</Label>
            <Input
              id="testimonialsTitle"
              value={formData.title || ""}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="testimonialsSubtitle">Section Subtitle</Label>
            <Input
              id="testimonialsSubtitle"
              value={formData.subtitle || ""}
              onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
            />
          </div>
        </div>
      </Card>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-semibold">Client Reviews</h4>
          <Button type="button" onClick={addReview}>
            <Plus className="w-4 h-4 mr-2" />
            Add Review
          </Button>
        </div>

        {formData.reviews?.map((review: any, index: number) => (
          <Card key={index} className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h5 className="font-semibold">Review #{index + 1}</h5>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={review.isActive}
                    onCheckedChange={(checked) => updateReview(index, "isActive", checked)}
                  />
                  <Label>Active</Label>
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => removeReview(index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Client Name</Label>
                  <Input
                    value={review.name || ""}
                    onChange={(e) => updateReview(index, "name", e.target.value)}
                    placeholder="Mr. John Doe"
                  />
                </div>

                <div className="grid gap-2">
                  <Label>Affiliation/Title</Label>
                  <Input
                    value={review.affiliation || ""}
                    onChange={(e) => updateReview(index, "affiliation", e.target.value)}
                    placeholder="HR Manager, Company Name"
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label>Testimonial Quote</Label>
                <Textarea
                  value={review.quote || ""}
                  onChange={(e) => updateReview(index, "quote", e.target.value)}
                  rows={4}
                  placeholder="Enter the client's testimonial..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Client Image (Large)</Label>
                  <ImageUpload
                    value={review.imageSrc || ""}
                    onChange={(value) => updateReview(index, "imageSrc", value)}
                    aspectRatio="wide"
                    label="Upload client photo"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Thumbnail Image</Label>
                  <ImageUpload
                    value={review.thumbnailSrc || ""}
                    onChange={(value) => updateReview(index, "thumbnailSrc", value)}
                    aspectRatio="square"
                    label="Upload thumbnail"
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label>Rating (1-5)</Label>
                <Input
                  type="number"
                  min="1"
                  max="5"
                  value={review.rating || 5}
                  onChange={(e) => updateReview(index, "rating", parseInt(e.target.value))}
                />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={saving}>
          {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          <Save className="w-4 h-4 mr-2" />
          Save Testimonials
        </Button>
      </div>
    </form>
  );
}

// Why Choose Section Component
function WhyChooseSection({ data, onSave, saving }: any) {
  const [formData, setFormData] = useState(data);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const addFeature = () => {
    setFormData({
      ...formData,
      features: [...(formData.features || []), { title: "", description: "", icon: "" }],
    });
  };

  const removeFeature = (index: number) => {
    const updated = formData.features.filter((_: any, i: number) => i !== index);
    setFormData({ ...formData, features: updated });
  };

  const updateFeature = (index: number, field: string, value: string) => {
    const updated = [...formData.features];
    updated[index][field] = value;
    setFormData({ ...formData, features: updated });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Sparkles className="w-5 h-5" />
          Why Choose Section
        </h3>
        <div className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="whyTitle">Section Title</Label>
            <Input
              id="whyTitle"
              value={formData.title || ""}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="whySubtitle">Section Subtitle</Label>
            <Input
              id="whySubtitle"
              value={formData.subtitle || ""}
              onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
            />
          </div>
        </div>
      </Card>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-semibold">Features</h4>
          <Button type="button" onClick={addFeature}>
            <Plus className="w-4 h-4 mr-2" />
            Add Feature
          </Button>
        </div>

        {formData.features?.map((feature: any, index: number) => (
          <Card key={index} className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h5 className="font-semibold">Feature #{index + 1}</h5>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => removeFeature(index)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="grid gap-2">
                <Label>Title</Label>
                <Input
                  value={feature.title || ""}
                  onChange={(e) => updateFeature(index, "title", e.target.value)}
                  placeholder="Feature title"
                />
              </div>

              <div className="grid gap-2">
                <Label>Description</Label>
                <Textarea
                  value={feature.description || ""}
                  onChange={(e) => updateFeature(index, "description", e.target.value)}
                  rows={3}
                  placeholder="Feature description"
                />
              </div>

              <IconSelector
                label="Icon (optional)"
                value={feature.icon || ""}
                onChange={(value) => updateFeature(index, "icon", value)}
              />
            </div>
          </Card>
        ))}
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={saving}>
          {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          <Save className="w-4 h-4 mr-2" />
          Save Why Choose Section
        </Button>
      </div>
    </form>
  );
}

// FAQ Section Component
function FaqSection({ data, onSave, saving }: any) {
  const [formData, setFormData] = useState(data);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const addQuestion = () => {
    setFormData({
      ...formData,
      questions: [...(formData.questions || []), { question: "", answer: "", isActive: true }],
    });
  };

  const removeQuestion = (index: number) => {
    const updated = formData.questions.filter((_: any, i: number) => i !== index);
    setFormData({ ...formData, questions: updated });
  };

  const updateQuestion = (index: number, field: string, value: any) => {
    const updated = [...formData.questions];
    updated[index][field] = value;
    setFormData({ ...formData, questions: updated });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <HelpCircle className="w-5 h-5" />
          FAQ Section
        </h3>
        <div className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="faqBadge">Badge Text</Label>
            <Input
              id="faqBadge"
              value={formData.badge || ""}
              onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="faqTitle">Section Title</Label>
            <Input
              id="faqTitle"
              value={formData.title || ""}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="faqDescription">Description</Label>
            <Textarea
              id="faqDescription"
              value={formData.description || ""}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label>FAQ Section Image</Label>
            <ImageUpload
              value={formData.image || ""}
              onChange={(value) => setFormData({ ...formData, image: value })}
              aspectRatio="wide"
              label="Upload FAQ section image"
            />
          </div>
        </div>
      </Card>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-semibold">FAQ Questions</h4>
          <Button type="button" onClick={addQuestion}>
            <Plus className="w-4 h-4 mr-2" />
            Add Question
          </Button>
        </div>

        {formData.questions?.map((faq: any, index: number) => (
          <Card key={index} className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h5 className="font-semibold">Question #{index + 1}</h5>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={faq.isActive}
                    onCheckedChange={(checked) => updateQuestion(index, "isActive", checked)}
                  />
                  <Label>Active</Label>
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => removeQuestion(index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="grid gap-2">
                <Label>Question</Label>
                <Input
                  value={faq.question || ""}
                  onChange={(e) => updateQuestion(index, "question", e.target.value)}
                  placeholder="Enter question..."
                />
              </div>

              <div className="grid gap-2">
                <Label>Answer</Label>
                <Textarea
                  value={faq.answer || ""}
                  onChange={(e) => updateQuestion(index, "answer", e.target.value)}
                  rows={3}
                  placeholder="Enter answer..."
                />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={saving}>
          {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          <Save className="w-4 h-4 mr-2" />
          Save FAQ Section
        </Button>
      </div>
    </form>
  );
}

// CTA Section Component
function CtaSection({ data, onSave, saving }: any) {
  const [formData, setFormData] = useState(data);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const addButton = () => {
    setFormData({
      ...formData,
      buttons: [...(formData.buttons || []), { text: "", href: "", variant: "secondary", icon: "" }],
    });
  };

  const removeButton = (index: number) => {
    const updated = formData.buttons.filter((_: any, i: number) => i !== index);
    setFormData({ ...formData, buttons: updated });
  };

  const updateButton = (index: number, field: string, value: string) => {
    const updated = [...formData.buttons];
    updated[index][field] = value;
    setFormData({ ...formData, buttons: updated });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Sparkles className="w-5 h-5" />
          CTA Section
        </h3>
        <div className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="ctaBadge">Badge Text</Label>
            <Input
              id="ctaBadge"
              value={formData.badge || ""}
              onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="ctaHeading">Heading</Label>
            <Input
              id="ctaHeading"
              value={formData.heading || ""}
              onChange={(e) => setFormData({ ...formData, heading: e.target.value })}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="ctaDescription">Description</Label>
            <Textarea
              id="ctaDescription"
              value={formData.description || ""}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
            />
          </div>

          <div className="flex items-center gap-2">
            <Switch
              id="isDark"
              checked={formData.isDark}
              onCheckedChange={(checked) => setFormData({ ...formData, isDark: checked })}
            />
            <Label htmlFor="isDark">Dark Background</Label>
          </div>
        </div>
      </Card>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-semibold">CTA Buttons</h4>
          <Button type="button" onClick={addButton}>
            <Plus className="w-4 h-4 mr-2" />
            Add Button
          </Button>
        </div>

        {formData.buttons?.map((button: any, index: number) => (
          <Card key={index} className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h5 className="font-semibold">Button #{index + 1}</h5>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => removeButton(index)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Button Text</Label>
                  <Input
                    value={button.text || ""}
                    onChange={(e) => updateButton(index, "text", e.target.value)}
                    placeholder="Click here"
                  />
                </div>

                <div className="grid gap-2">
                  <Label>Button Link</Label>
                  <Input
                    value={button.href || ""}
                    onChange={(e) => updateButton(index, "href", e.target.value)}
                    placeholder="/contact"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Variant</Label>
                  <select
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={button.variant || "secondary"}
                    onChange={(e) => updateButton(index, "variant", e.target.value)}
                  >
                    <option value="default">Default</option>
                    <option value="secondary">Secondary</option>
                    <option value="outline">Outline</option>
                  </select>
                </div>

                <IconSelector
                  label="Icon (optional)"
                  value={button.icon || ""}
                  onChange={(value) => updateButton(index, "icon", value)}
                />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={saving}>
          {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          <Save className="w-4 h-4 mr-2" />
          Save CTA Section
        </Button>
      </div>
    </form>
  );
}
