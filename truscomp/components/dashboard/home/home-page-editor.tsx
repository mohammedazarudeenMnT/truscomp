"use client";

import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImageUpload } from "@/components/ui/image-upload";
import { IconPicker } from "@/components/ui/icon-picker";
import { Plus, Trash2, Loader2, Save } from "lucide-react";
import { toast } from "sonner";
import { axiosInstance } from "@/lib/api";
import PageSEOEditor from "@/components/dashboard/page-seo-editor";

interface HeroSection {
  title: string;
  text: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  img: string;
}

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface Stat {
  number: string;
  label: string;
  className: string;
}

interface FaqItem {
  question: string;
  answer: string;
}

interface Button {
  text: string;
  href: string;
  variant: "primary" | "secondary" | "outline";
  icon: string;
}

interface HomePageData {
  hero: {
    sections: HeroSection[];
  };
  whySection: {
    title: string;
    subtitle: string;
    features: Feature[];
    stats: Stat[];
    trustIndicators: string[];
  };
  faq: {
    badge: string;
    title: string;
    subtitle: string;
    description: string;
    image: string;
    items: FaqItem[];
  };
  cta: {
    badge: string;
    heading: string;
    description: string;
    buttons: Button[];
    isDark: boolean;
  };
}

export default function HomePageEditor() {
  const [data, setData] = useState<HomePageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("hero");

  useEffect(() => {
    fetchData();

    // Check for hash in URL to set active tab
    if (typeof window !== "undefined") {
      const hash = window.location.hash.replace("#", "");
      if (["hero", "why", "faq", "cta", "seo"].includes(hash)) {
        setActiveTab(hash);
      }
    }
  }, []);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get("/api/home-page-settings");
      if (response.data.success) {
        setData(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load home page data");
    } finally {
      setLoading(false);
    }
  };

  const saveSection = async (section: string, sectionData: any) => {
    setSaving(true);
    try {
      const response = await axiosInstance.put(
        `/api/home-page-settings/${section}`,
        sectionData
      );

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
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="hero">Hero Section</TabsTrigger>
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
          <PageSEOEditor pageKey="home" pageName="Home Page" />
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Hero Section Editor Component
function HeroSectionEditor({
  data,
  onSave,
  saving,
}: {
  data: any;
  onSave: (data: any) => void;
  saving: boolean;
}) {
  const [sections, setSections] = useState<HeroSection[]>(data.sections || []);

  const addSection = () => {
    setSections([
      ...sections,
      {
        title: "",
        text: "",
        description: "",
        buttonText: "Learn More",
        buttonLink: "/contact",
        img: "",
      },
    ]);
  };

  const removeSection = (index: number) => {
    setSections(sections.filter((_, i) => i !== index));
  };

  const updateSection = (index: number, field: string, value: string) => {
    const updated = [...sections];
    updated[index] = { ...updated[index], [field]: value };
    setSections(updated);
  };

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Hero Sections</h3>
        <Button onClick={addSection} size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Section
        </Button>
      </div>

      <div className="space-y-6">
        {sections.map((section, index) => (
          <div key={index} className="border rounded-lg p-4 space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">Section {index + 1}</h4>
              <Button
                variant="outline"
                size="sm"
                onClick={() => removeSection(index)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input
                  value={section.title}
                  onChange={(e) =>
                    updateSection(index, "title", e.target.value)
                  }
                  placeholder="Section title"
                />
              </div>

              <div className="space-y-2">
                <Label>Text</Label>
                <Input
                  value={section.text}
                  onChange={(e) => updateSection(index, "text", e.target.value)}
                  placeholder="Section text"
                />
              </div>

              <div className="md:col-span-2 space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={section.description}
                  onChange={(e) =>
                    updateSection(index, "description", e.target.value)
                  }
                  placeholder="Section description"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label>Button Text</Label>
                <Input
                  value={section.buttonText}
                  onChange={(e) =>
                    updateSection(index, "buttonText", e.target.value)
                  }
                  placeholder="Button text"
                />
              </div>

              <div className="space-y-2">
                <Label>Button Link</Label>
                <Input
                  value={section.buttonLink}
                  onChange={(e) =>
                    updateSection(index, "buttonLink", e.target.value)
                  }
                  placeholder="Button link"
                />
              </div>

              <div className="md:col-span-2 space-y-2">
                <Label>Background Image</Label>
                <ImageUpload
                  label="Upload background image"
                  value={section.img}
                  onChange={(value) => updateSection(index, "img", value || "")}
                  aspectRatio="wide"
                />
              </div>
            </div>
          </div>
        ))}

        <Button
          onClick={() => onSave({ sections })}
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

// Why Section Editor Component
function WhySectionEditor({
  data,
  onSave,
  saving,
}: {
  data: any;
  onSave: (data: any) => void;
  saving: boolean;
}) {
  const [title, setTitle] = useState(data.title || "");
  const [subtitle, setSubtitle] = useState(data.subtitle || "");
  const [features, setFeatures] = useState<Feature[]>(data.features || []);
  const [stats, setStats] = useState<Stat[]>(data.stats || []);
  const [trustIndicators, setTrustIndicators] = useState<string[]>(
    data.trustIndicators || []
  );

  const addFeature = () => {
    setFeatures([...features, { icon: "Shield", title: "", description: "" }]);
  };

  const removeFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  const updateFeature = (index: number, field: string, value: string) => {
    const updated = [...features];
    updated[index] = { ...updated[index], [field]: value };
    setFeatures(updated);
  };

  const addStat = () => {
    setStats([
      ...stats,
      { number: "", label: "", className: "bg-primary/5 border-primary/10" },
    ]);
  };

  const removeStat = (index: number) => {
    setStats(stats.filter((_, i) => i !== index));
  };

  const updateStat = (index: number, field: string, value: string) => {
    const updated = [...stats];
    updated[index] = { ...updated[index], [field]: value };
    setStats(updated);
  };

  const addTrustIndicator = () => {
    setTrustIndicators([...trustIndicators, ""]);
  };

  const removeTrustIndicator = (index: number) => {
    setTrustIndicators(trustIndicators.filter((_, i) => i !== index));
  };

  const updateTrustIndicator = (index: number, value: string) => {
    const updated = [...trustIndicators];
    updated[index] = value;
    setTrustIndicators(updated);
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
              placeholder="Section title"
            />
          </div>

          <div className="space-y-2">
            <Label>Subtitle</Label>
            <Textarea
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="Section subtitle"
              rows={3}
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

          {features.map((feature, index) => (
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
                    onChange={(e) =>
                      updateFeature(index, "title", e.target.value)
                    }
                    placeholder="Feature title"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    value={feature.description}
                    onChange={(e) =>
                      updateFeature(index, "description", e.target.value)
                    }
                    placeholder="Feature description"
                    rows={2}
                  />
                </div>
              </div>
            </div>
          ))}
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

          {stats.map((stat, index) => (
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
                    onChange={(e) =>
                      updateStat(index, "number", e.target.value)
                    }
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
                  <Label>Style Class</Label>
                  <Select
                    value={stat.className}
                    onValueChange={(value) =>
                      updateStat(index, "className", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bg-primary/5 border-primary/10">
                        Light Primary
                      </SelectItem>
                      <SelectItem value="bg-primary/10 border-primary/20">
                        Medium Primary
                      </SelectItem>
                      <SelectItem value="bg-secondary/5 border-secondary/10">
                        Light Secondary
                      </SelectItem>
                      <SelectItem value="bg-secondary/10 border-secondary/20">
                        Medium Secondary
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="font-medium">Trust Indicators (Company Names)</h4>
            <Button onClick={addTrustIndicator} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Company
            </Button>
          </div>

          {trustIndicators.map((company, index) => (
            <div key={index} className="flex gap-2 items-center">
              <Input
                value={company}
                onChange={(e) => updateTrustIndicator(index, e.target.value)}
                placeholder="Company name"
                className="flex-1"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => removeTrustIndicator(index)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>

        <Button
          onClick={() =>
            onSave({ title, subtitle, features, stats, trustIndicators })
          }
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
function FaqSectionEditor({
  data,
  onSave,
  saving,
}: {
  data: any;
  onSave: (data: any) => void;
  saving: boolean;
}) {
  const [badge, setBadge] = useState(data.badge || "");
  const [title, setTitle] = useState(data.title || "");
  const [subtitle, setSubtitle] = useState(data.subtitle || "");
  const [description, setDescription] = useState(data.description || "");
  const [image, setImage] = useState(data.image || "");
  const [items, setItems] = useState<FaqItem[]>(data.items || []);

  const addFaq = () => {
    setItems([...items, { question: "", answer: "" }]);
  };

  const removeFaq = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
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
            <Label>Badge</Label>
            <Input
              value={badge}
              onChange={(e) => setBadge(e.target.value)}
              placeholder="FAQ"
            />
          </div>

          <div className="space-y-2">
            <Label>Title</Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Frequently Asked Questions"
            />
          </div>

          <div className="space-y-2">
            <Label>Subtitle</Label>
            <Input
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="Optional subtitle"
            />
          </div>

          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Section description"
              rows={3}
            />
          </div>
        </div>

        {/* Image */}
        <div className="space-y-2">
          <Label>Section Image</Label>
          <ImageUpload
            label="Upload FAQ section image"
            value={image}
            onChange={(value) => setImage(value || "")}
            aspectRatio="square"
          />
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

          {items.map((item, index) => (
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
                    onChange={(e) =>
                      updateFaq(index, "question", e.target.value)
                    }
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
          onClick={() =>
            onSave({ badge, title, subtitle, description, image, items })
          }
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
function CtaSectionEditor({
  data,
  onSave,
  saving,
}: {
  data: any;
  onSave: (data: any) => void;
  saving: boolean;
}) {
  const [imageSrc, setImageSrc] = useState(data.imageSrc || "");
  const [title, setTitle] = useState(data.title || "");
  const [subtitle, setSubtitle] = useState(data.subtitle || "");
  const [description, setDescription] = useState(data.description || "");
  const [buttonText, setButtonText] = useState(data.buttonText || "");
  const [buttonLink, setButtonLink] = useState(data.buttonLink || "");

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-6">CTA Card Section</h3>

      <div className="space-y-6">
        {/* Image Upload */}
        <div className="space-y-2">
          <Label>CTA Image</Label>
          <ImageUpload
            value={imageSrc}
            onChange={setImageSrc}
            placeholder="Upload CTA image"
          />
        </div>

        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Title</Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="CTA Title"
            />
          </div>

          <div className="md:col-span-2 space-y-2">
            <Label>Subtitle</Label>
            <Input
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="CTA Subtitle"
            />
          </div>

          <div className="md:col-span-2 space-y-2">
            <Label>Description</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="CTA description"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label>Button Text</Label>
            <Input
              value={buttonText}
              onChange={(e) => setButtonText(e.target.value)}
              placeholder="Get Started"
            />
          </div>

          <div className="space-y-2">
            <Label>Button Link</Label>
            <Input
              value={buttonLink}
              onChange={(e) => setButtonLink(e.target.value)}
              placeholder="/contact"
            />
          </div>
        </div>

        <Button
          onClick={() =>
            onSave({
              imageSrc,
              title,
              subtitle,
              description,
              buttonText,
              buttonLink,
            })
          }
          disabled={saving}
          className="w-full"
        >
          {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          <Save className="w-4 h-4 mr-2" />
          Save CTA Card Section
        </Button>
      </div>
    </Card>
  );
}
