"use client";

import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "@/components/ui/image-upload";
import { IconPicker } from "@/components/ui/icon-picker";
import { Plus, Trash2, Loader2, Save } from "lucide-react";
import { toast } from "sonner";
import { axiosInstance } from "@/lib/api";
import PageSEOEditor from "@/components/dashboard/page-seo-editor";

interface AboutPageData {
  pageKey: string;
  pageName: string;
  hero: {
    badge: string;
    title: string;
    description: string;
    image: string;
    primaryButtonText: string;
    primaryButtonLink: string;
    secondaryButtonText: string;
    secondaryButtonLink: string;
    statsNumber: string;
    statsTitle: string;
    statsDescription: string;
  };
  founders: {
    title: string;
    subtitle: string;
    founders: Array<{
      name: string;
      title: string;
      description: string;
      image: string;
      linkedin: string;
      email: string;
    }>;
  };
  impact: {
    title: string;
    subtitle: string;
    stats: Array<{
      number: string;
      label: string;
      description: string;
    }>;
  };
  whySection: {
    title: string;
    subtitle: string;
    features: Array<{
      icon: string;
      title: string;
      description: string;
    }>;
  };
  faq: {
    title: string;
    description: string;
    items: Array<{
      question: string;
      answer: string;
    }>;
  };
  cta: {
    badge: string;
    title: string;
    description: string;
    primaryButtonText: string;
    primaryButtonLink: string;
    secondaryButtonText: string;
    secondaryButtonLink: string;
  };
}

interface AboutPageEditorProps {
  pageKey: string;
}

export default function AboutPageEditor({ pageKey }: AboutPageEditorProps) {
  const [data, setData] = useState<AboutPageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("hero");

  useEffect(() => {
    fetchData();
    
    // Check for hash in URL to set active tab
    if (typeof window !== "undefined") {
      const hash = window.location.hash.replace("#", "");
      if (["hero", "founders", "impact", "why", "faq", "cta", "seo"].includes(hash)) {
        setActiveTab(hash);
      }
    }
  }, [pageKey]);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get(`/api/about-page-settings/${pageKey}`);
      if (response.data.success) {
        setData(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load about page data");
    } finally {
      setLoading(false);
    }
  };

  const saveSection = async (section: string, sectionData: any) => {
    setSaving(true);
    try {
      const response = await axiosInstance.put(`/api/about-page-settings/${pageKey}/${section}`, sectionData);

      if (response.data.success) {
        toast.success(`${section} section updated successfully`);
        fetchData(); // Refresh data
      } else {
        toast.error(response.data.message || "Failed to update section");
      }
    } catch (error) {
      console.error("Error saving section:", error);
      toast.error("Failed to save changes");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (!data) {
    return <div>Failed to load data</div>;
  }

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="hero">Hero</TabsTrigger>
          <TabsTrigger value="founders">Founders</TabsTrigger>
          <TabsTrigger value="impact">Impact</TabsTrigger>
          <TabsTrigger value="why">Why Choose</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
          <TabsTrigger value="cta">CTA</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
        </TabsList>

        <TabsContent value="hero" className="space-y-6">
          <HeroSectionEditor
            data={data.hero}
            onSave={(heroData) => saveSection("hero", heroData)}
            saving={saving}
          />
        </TabsContent>

        <TabsContent value="founders" className="space-y-6">
          <FoundersSectionEditor
            data={data.founders}
            onSave={(foundersData) => saveSection("founders", foundersData)}
            saving={saving}
          />
        </TabsContent>

        <TabsContent value="impact" className="space-y-6">
          <ImpactSectionEditor
            data={data.impact}
            onSave={(impactData) => saveSection("impact", impactData)}
            saving={saving}
          />
        </TabsContent>

        <TabsContent value="why" className="space-y-6">
          <WhySectionEditor
            data={data.whySection}
            onSave={(whyData) => saveSection("why-section", whyData)}
            saving={saving}
          />
        </TabsContent>

        <TabsContent value="faq" className="space-y-6">
          <FaqSectionEditor
            data={data.faq}
            onSave={(faqData) => saveSection("faq", faqData)}
            saving={saving}
          />
        </TabsContent>

        <TabsContent value="cta" className="space-y-6">
          <CtaSectionEditor
            data={data.cta}
            onSave={(ctaData) => saveSection("cta", ctaData)}
            saving={saving}
          />
        </TabsContent>

        <TabsContent value="seo" className="space-y-6">
          <PageSEOEditor pageKey={pageKey} pageName={data.pageName} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Hero Section Editor Component
function HeroSectionEditor({ data, onSave, saving }: { data: any; onSave: (data: any) => void; saving: boolean }) {
  const [formData, setFormData] = useState(data);

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-6">Hero Section</h3>

      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
              <h4 className="text-md font-semibold mb-4">Content</h4>
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label>Badge</Label>
                  <Input
                    value={formData.badge}
                    onChange={(e) => handleChange("badge", e.target.value)}
                    placeholder="About TrusComp"
                  />
                </div>

                <div className="grid gap-2">
                  <Label>Title</Label>
                  <Input
                    value={formData.title}
                    onChange={(e) => handleChange("title", e.target.value)}
                    placeholder="Who We Are"
                  />
                </div>

                <div className="grid gap-2">
                  <Label>Description</Label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => handleChange("description", e.target.value)}
                    placeholder="Company description..."
                    rows={4}
                  />
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
              <h4 className="text-md font-semibold mb-4">Buttons</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label>Primary Button Text</Label>
                    <Input
                      value={formData.primaryButtonText}
                      onChange={(e) => handleChange("primaryButtonText", e.target.value)}
                      placeholder="Get Started"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>Primary Button Link</Label>
                    <Input
                      value={formData.primaryButtonLink}
                      onChange={(e) => handleChange("primaryButtonLink", e.target.value)}
                      placeholder="/contact"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label>Secondary Button Text</Label>
                    <Input
                      value={formData.secondaryButtonText}
                      onChange={(e) => handleChange("secondaryButtonText", e.target.value)}
                      placeholder="Meet the Team"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>Secondary Button Link</Label>
                    <Input
                      value={formData.secondaryButtonLink}
                      onChange={(e) => handleChange("secondaryButtonLink", e.target.value)}
                      placeholder="#founders"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
              <h4 className="text-md font-semibold mb-4">Hero Image</h4>
              <ImageUpload
                label="Upload hero image"
                value={formData.image}
                onChange={(value) => handleChange("image", value || "")}
                aspectRatio="wide"
              />
            </div>

            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
              <h4 className="text-md font-semibold mb-4">Stats Card</h4>
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label>Stats Number</Label>
                  <Input
                    value={formData.statsNumber}
                    onChange={(e) => handleChange("statsNumber", e.target.value)}
                    placeholder="7+"
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Stats Title</Label>
                  <Input
                    value={formData.statsTitle}
                    onChange={(e) => handleChange("statsTitle", e.target.value)}
                    placeholder="Years of Excellence"
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Stats Description</Label>
                  <Input
                    value={formData.statsDescription}
                    onChange={(e) => handleChange("statsDescription", e.target.value)}
                    placeholder="Trusted by Industry Leaders"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <Button
          onClick={() => onSave(formData)}
          disabled={saving}
          className="w-full"
        >
          {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          <Save className="w-4 h-4 mr-2" />
          Save Hero Section
        </Button>
      </div>
    </Card>
  );
}

// Founders Section Editor Component
function FoundersSectionEditor({ data, onSave, saving }: { data: any; onSave: (data: any) => void; saving: boolean }) {
  const [title, setTitle] = useState(data.title || "");
  const [subtitle, setSubtitle] = useState(data.subtitle || "");
  const [founders, setFounders] = useState(data.founders || []);

  const addFounder = () => {
    setFounders([...founders, { name: "", title: "", description: "", image: "", linkedin: "", email: "" }]);
  };

  const removeFounder = (index: number) => {
    setFounders(founders.filter((_: any, i: number) => i !== index));
  };

  const updateFounder = (index: number, field: string, value: string) => {
    const updated = [...founders];
    updated[index] = { ...updated[index], [field]: value };
    setFounders(updated);
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-6">Founders Section</h3>

      <div className="space-y-6">
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Title</Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Meet Our Founders"
            />
          </div>

          <div className="space-y-2">
            <Label>Subtitle</Label>
            <Input
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="Visionary leaders driving compliance innovation"
            />
          </div>
        </div>

        {/* Founders */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="font-medium">Founders</h4>
            <Button onClick={addFounder} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Founder
            </Button>
          </div>

          {founders.map((founder: any, index: number) => (
            <div key={index} className="border rounded-lg p-4 space-y-4">
              <div className="flex justify-between items-center">
                <h5 className="font-medium">Founder {index + 1}</h5>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeFounder(index)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Name</Label>
                    <Input
                      value={founder.name}
                      onChange={(e) => updateFounder(index, "name", e.target.value)}
                      placeholder="Founder name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Title</Label>
                    <Input
                      value={founder.title}
                      onChange={(e) => updateFounder(index, "title", e.target.value)}
                      placeholder="CEO & Founder"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>LinkedIn URL</Label>
                    <Input
                      value={founder.linkedin}
                      onChange={(e) => updateFounder(index, "linkedin", e.target.value)}
                      placeholder="https://linkedin.com/in/..."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input
                      value={founder.email}
                      onChange={(e) => updateFounder(index, "email", e.target.value)}
                      placeholder="founder@truscomp.com"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                      value={founder.description}
                      onChange={(e) => updateFounder(index, "description", e.target.value)}
                      placeholder="Founder bio and background..."
                      rows={4}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Profile Image</Label>
                    <ImageUpload
                      label="Upload founder image"
                      value={founder.image}
                      onChange={(value) => updateFounder(index, "image", value || "")}
                      aspectRatio="square"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Button
          onClick={() => onSave({ title, subtitle, founders })}
          disabled={saving}
          className="w-full"
        >
          {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          <Save className="w-4 h-4 mr-2" />
          Save Founders Section
        </Button>
      </div>
    </Card>
  );
}

// Impact Section Editor Component
function ImpactSectionEditor({ data, onSave, saving }: { data: any; onSave: (data: any) => void; saving: boolean }) {
  const [title, setTitle] = useState(data.title || "");
  const [subtitle, setSubtitle] = useState(data.subtitle || "");
  const [stats, setStats] = useState(data.stats || []);

  const addStat = () => {
    setStats([...stats, { number: "", label: "", description: "" }]);
  };

  const removeStat = (index: number) => {
    setStats(stats.filter((_: any, i: number) => i !== index));
  };

  const updateStat = (index: number, field: string, value: string) => {
    const updated = [...stats];
    updated[index] = { ...updated[index], [field]: value };
    setStats(updated);
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-6">Impact Section</h3>

      <div className="space-y-6">
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Title</Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Our Impact"
            />
          </div>

          <div className="space-y-2">
            <Label>Subtitle</Label>
            <Input
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="Making a difference in compliance management"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="font-medium">Statistics</h4>
            <Button onClick={addStat} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Stat
            </Button>
          </div>

          {stats.map((stat: any, index: number) => (
            <div key={index} className="border rounded-lg p-4 space-y-4">
              <div className="flex justify-between items-center">
                <h5 className="font-medium">Stat {index + 1}</h5>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeStat(index)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Number</Label>
                  <Input
                    value={stat.number}
                    onChange={(e) => updateStat(index, "number", e.target.value)}
                    placeholder="100+"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Label</Label>
                  <Input
                    value={stat.label}
                    onChange={(e) => updateStat(index, "label", e.target.value)}
                    placeholder="Trusted Clients"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Description</Label>
                  <Input
                    value={stat.description}
                    onChange={(e) => updateStat(index, "description", e.target.value)}
                    placeholder="Companies rely on our expertise"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <Button
          onClick={() => onSave({ title, subtitle, stats })}
          disabled={saving}
          className="w-full"
        >
          {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          <Save className="w-4 h-4 mr-2" />
          Save Impact Section
        </Button>
      </div>
    </Card>
  );
}

// Why Section Editor Component
function WhySectionEditor({ data, onSave, saving }: { data: any; onSave: (data: any) => void; saving: boolean }) {
  const [title, setTitle] = useState(data.title || "");
  const [subtitle, setSubtitle] = useState(data.subtitle || "");
  const [features, setFeatures] = useState(data.features || []);

  const addFeature = () => {
    setFeatures([...features, { icon: "Shield", title: "", description: "" }]);
  };

  const removeFeature = (index: number) => {
    setFeatures(features.filter((_: any, i: number) => i !== index));
  };

  const updateFeature = (index: number, field: string, value: string) => {
    const updated = [...features];
    updated[index] = { ...updated[index], [field]: value };
    setFeatures(updated);
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-6">Why Choose Section</h3>

      <div className="space-y-6">
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Title</Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Why Choose TrusComp?"
            />
          </div>

          <div className="space-y-2">
            <Label>Subtitle</Label>
            <Input
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="Experience the TrusComp advantage"
            />
          </div>
        </div>

        {/* Features */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="font-medium">Features</h4>
            <Button onClick={addFeature} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Feature
            </Button>
          </div>

          {features.map((feature: any, index: number) => (
            <div key={index} className="border rounded-lg p-4 space-y-4">
              <div className="flex justify-between items-center">
                <h5 className="font-medium">Feature {index + 1}</h5>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeFeature(index)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Icon</Label>
                  <IconPicker
                    value={feature.icon}
                    onChange={(value) => updateFeature(index, "icon", value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input
                    value={feature.title}
                    onChange={(e) => updateFeature(index, "title", e.target.value)}
                    placeholder="Feature title"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    value={feature.description}
                    onChange={(e) => updateFeature(index, "description", e.target.value)}
                    placeholder="Feature description"
                    rows={2}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <Button
          onClick={() => onSave({ title, subtitle, features })}
          disabled={saving}
          className="w-full"
        >
          {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          <Save className="w-4 h-4 mr-2" />
          Save Why Section
        </Button>
      </div>
    </Card>
  );
}

// FAQ Section Editor Component
function FaqSectionEditor({ data, onSave, saving }: { data: any; onSave: (data: any) => void; saving: boolean }) {
  const [title, setTitle] = useState(data.title || "");
  const [description, setDescription] = useState(data.description || "");
  const [items, setItems] = useState(data.items || []);

  const addFaq = () => {
    setItems([...items, { question: "", answer: "" }]);
  };

  const removeFaq = (index: number) => {
    setItems(items.filter((_: any, i: number) => i !== index));
  };

  const updateFaq = (index: number, field: string, value: string) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: value };
    setItems(updated);
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-6">FAQ Section</h3>

      <div className="space-y-6">
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Title</Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Frequently Asked Questions"
            />
          </div>

          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Common questions about TrusComp and our services"
              rows={3}
            />
          </div>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="font-medium">FAQ Items</h4>
            <Button onClick={addFaq} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add FAQ
            </Button>
          </div>

          {items.map((item: any, index: number) => (
            <div key={index} className="border rounded-lg p-4 space-y-4">
              <div className="flex justify-between items-center">
                <h5 className="font-medium">FAQ {index + 1}</h5>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeFaq(index)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Question</Label>
                  <Input
                    value={item.question}
                    onChange={(e) => updateFaq(index, "question", e.target.value)}
                    placeholder="Enter question"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Answer</Label>
                  <Textarea
                    value={item.answer}
                    onChange={(e) => updateFaq(index, "answer", e.target.value)}
                    placeholder="Enter answer"
                    rows={4}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <Button
          onClick={() => onSave({ title, description, items })}
          disabled={saving}
          className="w-full"
        >
          {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          <Save className="w-4 h-4 mr-2" />
          Save FAQ Section
        </Button>
      </div>
    </Card>
  );
}

// CTA Section Editor Component
function CtaSectionEditor({ data, onSave, saving }: { data: any; onSave: (data: any) => void; saving: boolean }) {
  const [formData, setFormData] = useState(data);

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-6">CTA Section</h3>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Badge</Label>
            <Input
              value={formData.badge}
              onChange={(e) => handleChange("badge", e.target.value)}
              placeholder="Ready to Get Started?"
            />
          </div>

          <div className="space-y-2">
            <Label>Title</Label>
            <Input
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              placeholder="Let's Transform Your Compliance Journey"
            />
          </div>

          <div className="md:col-span-2 space-y-2">
            <Label>Description</Label>
            <Textarea
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Section description"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label>Primary Button Text</Label>
            <Input
              value={formData.primaryButtonText}
              onChange={(e) => handleChange("primaryButtonText", e.target.value)}
              placeholder="Contact Us Today"
            />
          </div>

          <div className="space-y-2">
            <Label>Primary Button Link</Label>
            <Input
              value={formData.primaryButtonLink}
              onChange={(e) => handleChange("primaryButtonLink", e.target.value)}
              placeholder="/contact"
            />
          </div>

          <div className="space-y-2">
            <Label>Secondary Button Text</Label>
            <Input
              value={formData.secondaryButtonText}
              onChange={(e) => handleChange("secondaryButtonText", e.target.value)}
              placeholder="View Services"
            />
          </div>

          <div className="space-y-2">
            <Label>Secondary Button Link</Label>
            <Input
              value={formData.secondaryButtonLink}
              onChange={(e) => handleChange("secondaryButtonLink", e.target.value)}
              placeholder="/services"
            />
          </div>
        </div>

        <Button
          onClick={() => onSave(formData)}
          disabled={saving}
          className="w-full"
        >
          {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          <Save className="w-4 h-4 mr-2" />
          Save CTA Section
        </Button>
      </div>
    </Card>
  );
}