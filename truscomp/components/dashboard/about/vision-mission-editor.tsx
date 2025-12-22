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
import { Plus, Trash2, Loader2, Save, Target, Compass, Heart, HelpCircle, Sparkles, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { axiosInstance } from "@/lib/api";
import PageSEOEditor from "@/components/dashboard/page-seo-editor";

export default function VisionMissionEditor() {
  const [data, setData] = useState<{
    hero?: any;
    visionMission?: any;
    values?: any;
    faq?: any;
    cta?: any;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("hero");

  useEffect(() => {
    fetchData();
    if (typeof window !== "undefined") {
      const hash = window.location.hash.replace("#", "");
      if (["hero", "vision-mission", "values", "faq", "cta", "seo"].includes(hash)) {
        setActiveTab(hash);
      }
    }
  }, []);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get("/api/about-page-settings/vision-mission");
      if (response.data.success) {
        setData(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load vision-mission page data");
    } finally {
      setLoading(false);
    }
  };

  const saveSection = async (section: string, sectionData: any) => {
    setSaving(true);
    try {
      const response = await axiosInstance.put(`/api/about-page-settings/vision-mission/${section}`, sectionData);
      if (response.data.success) {
        toast.success(`${section} section updated successfully`);
        fetchData();
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

  if (!data) return <div>Failed to load data</div>;

  return (
    <div className="space-y-6">
      {/* Quick Overview Card */}
      <Card className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Sparkles className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h3 className="font-semibold text-purple-900">Vision, Mission & Values Page Overview</h3>
            <p className="text-sm text-purple-700">Manage your company's guiding principles and core values</p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="bg-white/60 p-3 rounded-lg">
            <div className="font-medium text-gray-900">Hero Section</div>
            <div className="text-gray-600">Main introduction</div>
          </div>
          <div className="bg-white/60 p-3 rounded-lg">
            <div className="font-medium text-gray-900">Vision & Mission</div>
            <div className="text-gray-600">Core purpose</div>
          </div>
          <div className="bg-white/60 p-3 rounded-lg">
            <div className="font-medium text-gray-900">Core Values</div>
            <div className="text-gray-600">{data?.values?.items?.length || 0} values</div>
          </div>
          <div className="bg-white/60 p-3 rounded-lg">
            <div className="font-medium text-gray-900">FAQ</div>
            <div className="text-gray-600">{data?.faq?.items?.length || 0} questions</div>
          </div>
        </div>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="hero" className="flex items-center gap-2">
            <Target className="w-4 h-4" />
            Hero
          </TabsTrigger>
          <TabsTrigger value="vision-mission" className="flex items-center gap-2">
            <Compass className="w-4 h-4" />
            Vision & Mission
          </TabsTrigger>
          <TabsTrigger value="values" className="flex items-center gap-2">
            <Heart className="w-4 h-4" />
            Values
          </TabsTrigger>
          <TabsTrigger value="faq" className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4" />
            FAQ
          </TabsTrigger>
          <TabsTrigger value="cta">CTA</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
        </TabsList>

        <TabsContent value="hero">
          <HeroEditor data={data.hero} onSave={(sectionData: any) => saveSection("hero", sectionData)} saving={saving} />
        </TabsContent>

        <TabsContent value="vision-mission">
          <VisionMissionSectionEditor data={data.visionMission} onSave={(sectionData: any) => saveSection("vision-mission", sectionData)} saving={saving} />
        </TabsContent>

        <TabsContent value="values">
          <ValuesEditor data={data.values} onSave={(sectionData: any) => saveSection("values", sectionData)} saving={saving} />
        </TabsContent>

        <TabsContent value="faq">
          <FaqEditor data={data.faq} onSave={(sectionData: any) => saveSection("faq", sectionData)} saving={saving} />
        </TabsContent>

        <TabsContent value="cta">
          <CtaEditor data={data.cta} onSave={(sectionData: any) => saveSection("cta", sectionData)} saving={saving} />
        </TabsContent>

        <TabsContent value="seo">
          <PageSEOEditor pageKey="vision-mission" pageName="Vision, Mission & Core Values" />
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Hero Editor
function HeroEditor({ data, onSave, saving }: { data: any; onSave: (data: any) => void; saving: boolean }) {
  const [formData, setFormData] = useState({
    subheading: data?.subheading || "Our Purpose",
    heading: data?.heading || "Vision, Mission, and Core Values",
    description: data?.description || "Our guiding principles that drive us to transform compliance management and empower businesses across India.",
    backgroundImage: data?.backgroundImage || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=2000&h=1200&fit=crop",
    primaryButtonText: data?.primaryButtonText || "Get Started",
    primaryButtonLink: data?.primaryButtonLink || "/contact",
    secondaryButtonText: data?.secondaryButtonText || "Learn More",
    secondaryButtonLink: data?.secondaryButtonLink || "/about"
  });

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <Card className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-100 rounded-lg">
            <Target className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <h3 className="font-semibold text-green-900">Hero Section</h3>
            <p className="text-sm text-green-700">The first impression - make it inspiring!</p>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Main Content */}
        <div className="xl:col-span-3 space-y-6">
          <Card className="p-6">
            <h4 className="text-lg font-semibold mb-4">Main Content</h4>
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label>Subheading</Label>
                <Input 
                  value={formData.subheading} 
                  onChange={(e) => setFormData({...formData, subheading: e.target.value})}
                  placeholder="e.g., Our Purpose"
                />
                <p className="text-xs text-muted-foreground">Small text above the main heading</p>
              </div>

              <div className="grid gap-2">
                <Label>Main Heading</Label>
                <Input 
                  value={formData.heading} 
                  onChange={(e) => setFormData({...formData, heading: e.target.value})}
                  placeholder="e.g., Vision, Mission, and Core Values"
                  className="text-lg font-semibold"
                />
              </div>

              <div className="grid gap-2">
                <Label>Description</Label>
                <Textarea 
                  value={formData.description} 
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Describe your guiding principles..."
                  rows={4}
                />
              </div>
            </div>
          </Card>

          {/* Buttons */}
          <Card className="p-6">
            <h4 className="text-lg font-semibold mb-4">Call-to-Action Buttons</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h5 className="font-medium text-blue-900">Primary Button</h5>
                <div className="space-y-3">
                  <div className="grid gap-2">
                    <Label className="text-sm">Button Text</Label>
                    <Input 
                      value={formData.primaryButtonText} 
                      onChange={(e) => setFormData({...formData, primaryButtonText: e.target.value})}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label className="text-sm">Link To</Label>
                    <select 
                      value={formData.primaryButtonLink} 
                      onChange={(e) => setFormData({...formData, primaryButtonLink: e.target.value})}
                      className="p-2 border rounded-md text-sm bg-white"
                    >
                      <option value="/contact">Contact Page</option>
                      <option value="/services">Services Page</option>
                      <option value="/about">About Page</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="space-y-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h5 className="font-medium text-gray-900">Secondary Button</h5>
                <div className="space-y-3">
                  <div className="grid gap-2">
                    <Label className="text-sm">Button Text</Label>
                    <Input 
                      value={formData.secondaryButtonText} 
                      onChange={(e) => setFormData({...formData, secondaryButtonText: e.target.value})}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label className="text-sm">Link To</Label>
                    <select 
                      value={formData.secondaryButtonLink} 
                      onChange={(e) => setFormData({...formData, secondaryButtonLink: e.target.value})}
                      className="p-2 border rounded-md text-sm bg-white"
                    >
                      <option value="/about">About Page</option>
                      <option value="/services">Services Page</option>
                      <option value="/contact">Contact Page</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card className="p-6">
            <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-orange-600" />
              Background Image
            </h4>
            <div className="space-y-4">
              <ImageUpload 
                label="Upload background image" 
                value={formData.backgroundImage} 
                onChange={(v) => setFormData({...formData, backgroundImage: v || ""})} 
                aspectRatio="wide" 
              />
              <div className="text-xs text-muted-foreground space-y-1">
                <p>• Recommended: 2000x1200px</p>
                <p>• High quality, inspiring image</p>
                <p>• Will have overlay effect</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Save Button */}
      <Card className="p-4">
        <Button onClick={() => onSave(formData)} disabled={saving} className="w-full h-12 text-lg">
          {saving && <Loader2 className="w-5 h-5 mr-2 animate-spin" />}
          <Save className="w-5 h-5 mr-2" />
          Save Hero Section
        </Button>
      </Card>
    </div>
  );
}

// Vision & Mission Section Editor
function VisionMissionSectionEditor({ data, onSave, saving }: { data: any; onSave: (data: any) => void; saving: boolean }) {
  const [vision, setVision] = useState({
    badge: data?.vision?.badge || "Our Vision",
    title: data?.vision?.title || "Transforming Compliance Management",
    description: data?.vision?.description || "To be the leading force in transforming compliance management in India, enabling organizations to achieve regulatory excellence effortlessly.",
    image: data?.vision?.image || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"
  });

  const [mission, setMission] = useState({
    badge: data?.mission?.badge || "Our Mission",
    title: data?.mission?.title || "Empowering Business Growth",
    description: data?.mission?.description || "To empower businesses with innovative compliance solutions that simplify regulatory adherence and enhance operational efficiency.",
    image: data?.mission?.image || "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"
  });

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <Card className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Compass className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-blue-900">Vision & Mission Section</h3>
            <p className="text-sm text-blue-700">Define your company's purpose and direction</p>
          </div>
        </div>
      </Card>

      {/* Vision Block */}
      <Card className="p-6">
        <h4 className="text-lg font-semibold mb-6 flex items-center gap-2">
          <Target className="w-5 h-5 text-purple-600" />
          Vision Statement
        </h4>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="grid gap-2">
              <Label>Badge Text</Label>
              <Input 
                value={vision.badge} 
                onChange={(e) => setVision({...vision, badge: e.target.value})}
                placeholder="e.g., Our Vision"
              />
            </div>

            <div className="grid gap-2">
              <Label>Vision Title</Label>
              <Input 
                value={vision.title} 
                onChange={(e) => setVision({...vision, title: e.target.value})}
                placeholder="e.g., Transforming Compliance Management"
                className="text-lg font-semibold"
              />
            </div>

            <div className="grid gap-2">
              <Label>Vision Description</Label>
              <Textarea 
                value={vision.description} 
                onChange={(e) => setVision({...vision, description: e.target.value})}
                placeholder="Describe your long-term vision..."
                rows={4}
              />
              <p className="text-xs text-muted-foreground">What do you aspire to achieve in the future?</p>
            </div>
          </div>

          <div className="space-y-4">
            <Label>Vision Image</Label>
            <ImageUpload 
              label="Upload vision image" 
              value={vision.image} 
              onChange={(v) => setVision({...vision, image: v || ""})} 
              aspectRatio="wide" 
            />
            <p className="text-xs text-muted-foreground">Image representing your vision (800x600px recommended)</p>
          </div>
        </div>
      </Card>

      {/* Mission Block */}
      <Card className="p-6">
        <h4 className="text-lg font-semibold mb-6 flex items-center gap-2">
          <Compass className="w-5 h-5 text-green-600" />
          Mission Statement
        </h4>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="grid gap-2">
              <Label>Badge Text</Label>
              <Input 
                value={mission.badge} 
                onChange={(e) => setMission({...mission, badge: e.target.value})}
                placeholder="e.g., Our Mission"
              />
            </div>

            <div className="grid gap-2">
              <Label>Mission Title</Label>
              <Input 
                value={mission.title} 
                onChange={(e) => setMission({...mission, title: e.target.value})}
                placeholder="e.g., Empowering Business Growth"
                className="text-lg font-semibold"
              />
            </div>

            <div className="grid gap-2">
              <Label>Mission Description</Label>
              <Textarea 
                value={mission.description} 
                onChange={(e) => setMission({...mission, description: e.target.value})}
                placeholder="Describe your mission..."
                rows={4}
              />
              <p className="text-xs text-muted-foreground">What do you do and why do you do it?</p>
            </div>
          </div>

          <div className="space-y-4">
            <Label>Mission Image</Label>
            <ImageUpload 
              label="Upload mission image" 
              value={mission.image} 
              onChange={(v) => setMission({...mission, image: v || ""})} 
              aspectRatio="wide" 
            />
            <p className="text-xs text-muted-foreground">Image representing your mission (800x600px recommended)</p>
          </div>
        </div>
      </Card>

      {/* Save Button */}
      <Card className="p-4">
        <Button onClick={() => onSave({ vision, mission })} disabled={saving} className="w-full h-12 text-lg">
          {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          <Save className="w-4 h-4 mr-2" />
          Save Vision & Mission
        </Button>
      </Card>
    </div>
  );
}

// Values Editor
function ValuesEditor({ data, onSave, saving }: { data: any; onSave: (data: any) => void; saving: boolean }) {
  const [title, setTitle] = useState(data?.title || "Our Value System");
  const [subtitle, setSubtitle] = useState(data?.subtitle || "The core principles that define who we are and how we operate.");
  const [items, setItems] = useState(data?.items || []);

  const addValue = () => {
    setItems([...items, { 
      title: "", 
      description: "", 
      icon: "ShieldCheck", 
      className: "md:col-span-1 bg-primary/5 border-primary/10" 
    }]);
  };

  const removeValue = (index: number) => {
    setItems(items.filter((_: any, i: number) => i !== index));
  };

  const updateValue = (index: number, field: string, value: string) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: value };
    setItems(updated);
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <Card className="p-4 bg-gradient-to-r from-pink-50 to-rose-50 border-pink-200">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-pink-100 rounded-lg">
            <Heart className="w-5 h-5 text-pink-600" />
          </div>
          <div>
            <h3 className="font-semibold text-pink-900">Core Values Section</h3>
            <p className="text-sm text-pink-700">Define the principles that guide your company</p>
          </div>
        </div>
      </Card>

      {/* Basic Info */}
      <Card className="p-6">
        <h4 className="text-lg font-semibold mb-4">Section Information</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Section Title</Label>
            <Input 
              value={title} 
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Our Value System"
            />
          </div>
          <div className="space-y-2">
            <Label>Section Subtitle</Label>
            <Input 
              value={subtitle} 
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="Brief description of your values"
            />
          </div>
        </div>
      </Card>

      {/* Values */}
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h4 className="text-lg font-semibold">Core Values</h4>
            <p className="text-sm text-muted-foreground">Add the principles that define your company culture</p>
          </div>
          <Button onClick={addValue} className="bg-pink-600 hover:bg-pink-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Value
          </Button>
        </div>

        {items.length === 0 && (
          <div className="text-center py-12 bg-muted/50 rounded-lg border-2 border-dashed">
            <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No values added yet</h3>
            <p className="text-muted-foreground mb-4">Start by adding your company's core values</p>
            <Button onClick={addValue} variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Value
            </Button>
          </div>
        )}

        <div className="space-y-6">
          {items.map((value: any, i: number) => (
            <Card key={i} className="p-6 border-l-4 border-l-pink-500">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h5 className="font-semibold text-lg">Value {i + 1}</h5>
                  <p className="text-sm text-muted-foreground">{value.title || 'Unnamed value'}</p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => removeValue(i)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Icon</Label>
                  <IconPicker
                    value={value.icon}
                    onChange={(v) => updateValue(i, "icon", v)}
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Value Title *</Label>
                  <Input
                    value={value.title}
                    onChange={(e) => updateValue(i, "title", e.target.value)}
                    placeholder="e.g., Trust, Innovation"
                    className="font-medium"
                  />
                </div>

                <div className="lg:col-span-2 space-y-2">
                  <Label className="text-sm font-medium">Description *</Label>
                  <Textarea
                    value={value.description}
                    onChange={(e) => updateValue(i, "description", e.target.value)}
                    placeholder="Explain what this value means to your company..."
                    rows={3}
                  />
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <Label className="text-sm font-medium">Card Size & Style</Label>
                <select 
                  value={value.className} 
                  onChange={(e) => updateValue(i, "className", e.target.value)}
                  className="w-full p-3 border rounded-md bg-white"
                >
                  <optgroup label="Small Cards (1 column width)">
                    <option value="md:col-span-1 bg-primary/5 border-primary/10">Primary Blue</option>
                    <option value="md:col-span-1 bg-green-50 border-green-200">Green</option>
                    <option value="md:col-span-1 bg-orange-50 border-orange-200">Orange</option>
                    <option value="md:col-span-1 bg-purple-50 border-purple-200">Purple</option>
                    <option value="md:col-span-1 bg-pink-50 border-pink-200">Pink</option>
                  </optgroup>
                  <optgroup label="Medium Cards (2 columns width)">
                    <option value="md:col-span-2 bg-primary/5 border-primary/10">Primary Blue</option>
                    <option value="md:col-span-2 bg-green-50 border-green-200">Green</option>
                    <option value="md:col-span-2 bg-primary/10 border-primary/20">Primary Blue (Darker)</option>
                  </optgroup>
                </select>
              </div>
            </Card>
          ))}
        </div>
      </Card>

      {/* Save Button */}
      <Card className="p-4">
        <Button onClick={() => onSave({ title, subtitle, items })} disabled={saving} className="w-full h-12 text-lg">
          {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          <Save className="w-4 h-4 mr-2" />
          Save Core Values
        </Button>
      </Card>
    </div>
  );
}

// FAQ Editor
function FaqEditor({ data, onSave, saving }: { data: any; onSave: (data: any) => void; saving: boolean }) {
  const [title, setTitle] = useState(data?.title || "Frequently Asked Questions");
  const [description, setDescription] = useState(data?.description || "Common questions about our vision, mission, and values");
  const [items, setItems] = useState(data?.items || []);

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
    <div className="space-y-6">
      {/* Section Header */}
      <Card className="p-4 bg-gradient-to-r from-green-50 to-teal-50 border-green-200">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-100 rounded-lg">
            <HelpCircle className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <h3 className="font-semibold text-green-900">FAQ Section</h3>
            <p className="text-sm text-green-700">Answer common questions about your values and principles</p>
          </div>
        </div>
      </Card>

      {/* Basic Info */}
      <Card className="p-6">
        <h4 className="text-lg font-semibold mb-4">Section Information</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Section Title</Label>
            <Input 
              value={title} 
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Frequently Asked Questions"
            />
          </div>
          <div className="space-y-2">
            <Label>Section Description</Label>
            <Input 
              value={description} 
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description"
            />
          </div>
        </div>
      </Card>

      {/* FAQ Items */}
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h4 className="text-lg font-semibold">Questions & Answers</h4>
            <p className="text-sm text-muted-foreground">Add common questions about your company values</p>
          </div>
          <Button onClick={addFaq} className="bg-green-600 hover:bg-green-700">
            <Plus className="w-4 h-4 mr-2" />
            Add FAQ
          </Button>
        </div>

        {items.length === 0 && (
          <div className="text-center py-12 bg-muted/50 rounded-lg border-2 border-dashed">
            <HelpCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No FAQs added yet</h3>
            <p className="text-muted-foreground mb-4">Start by adding common questions</p>
            <Button onClick={addFaq} variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Add Your First FAQ
            </Button>
          </div>
        )}

        <div className="space-y-6">
          {items.map((item: any, i: number) => (
            <Card key={i} className="p-6 border-l-4 border-l-green-500">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h5 className="font-semibold text-lg">FAQ {i + 1}</h5>
                  <p className="text-sm text-muted-foreground">{item.question || 'No question set'}</p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => removeFaq(i)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Question *</Label>
                  <Input
                    value={item.question}
                    onChange={(e) => updateFaq(i, "question", e.target.value)}
                    placeholder="e.g., What are TrusComp's core values?"
                    className="font-medium"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Answer *</Label>
                  <Textarea
                    value={item.answer}
                    onChange={(e) => updateFaq(i, "answer", e.target.value)}
                    placeholder="Provide a clear, helpful answer..."
                    rows={4}
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Card>

      {/* Save Button */}
      <Card className="p-4">
        <Button onClick={() => onSave({ title, description, items })} disabled={saving} className="w-full h-12 text-lg">
          {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          <Save className="w-4 h-4 mr-2" />
          Save FAQ Section
        </Button>
      </Card>
    </div>
  );
}

// CTA Editor
function CtaEditor({ data, onSave, saving }: { data: any; onSave: (data: any) => void; saving: boolean }) {
  const [formData, setFormData] = useState({
    badge: data?.badge || "Join Us",
    title: data?.title || "Ready to Transform Your Compliance Journey?",
    description: data?.description || "Join hundreds of businesses that trust TrusComp for seamless compliance management.",
    primaryButtonText: data?.primaryButtonText || "Get Started",
    primaryButtonLink: data?.primaryButtonLink || "/contact",
    secondaryButtonText: data?.secondaryButtonText || "Learn More",
    secondaryButtonLink: data?.secondaryButtonLink || "/about"
  });

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <Card className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-100 rounded-lg">
            <Target className="w-5 h-5 text-indigo-600" />
          </div>
          <div>
            <h3 className="font-semibold text-indigo-900">Call-to-Action Section</h3>
            <p className="text-sm text-indigo-700">Encourage visitors to take action</p>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h4 className="text-lg font-semibold mb-6">CTA Content</h4>
        <div className="space-y-4">
          <div className="grid gap-2">
            <Label>Badge Text</Label>
            <Input 
              placeholder="e.g., Join Us" 
              value={formData.badge} 
              onChange={(e) => setFormData({...formData, badge: e.target.value})} 
            />
          </div>

          <div className="grid gap-2">
            <Label>Main Title</Label>
            <Input 
              placeholder="e.g., Ready to Transform Your Compliance Journey?" 
              value={formData.title} 
              onChange={(e) => setFormData({...formData, title: e.target.value})} 
              className="text-lg font-semibold"
            />
          </div>

          <div className="grid gap-2">
            <Label>Description</Label>
            <Textarea 
              placeholder="Compelling description..." 
              value={formData.description} 
              onChange={(e) => setFormData({...formData, description: e.target.value})} 
              rows={3} 
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            <div className="space-y-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h5 className="font-medium text-blue-900">Primary Button</h5>
              <div className="space-y-3">
                <div className="grid gap-2">
                  <Label className="text-sm">Button Text</Label>
                  <Input 
                    placeholder="e.g., Get Started" 
                    value={formData.primaryButtonText} 
                    onChange={(e) => setFormData({...formData, primaryButtonText: e.target.value})} 
                  />
                </div>
                <div className="grid gap-2">
                  <Label className="text-sm">Link To</Label>
                  <select 
                    value={formData.primaryButtonLink} 
                    onChange={(e) => setFormData({...formData, primaryButtonLink: e.target.value})}
                    className="p-2 border rounded-md text-sm bg-white"
                  >
                    <option value="/contact">Contact Page</option>
                    <option value="/services">Services Page</option>
                    <option value="/about">About Page</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h5 className="font-medium text-gray-900">Secondary Button</h5>
              <div className="space-y-3">
                <div className="grid gap-2">
                  <Label className="text-sm">Button Text</Label>
                  <Input 
                    placeholder="e.g., Learn More" 
                    value={formData.secondaryButtonText} 
                    onChange={(e) => setFormData({...formData, secondaryButtonText: e.target.value})} 
                  />
                </div>
                <div className="grid gap-2">
                  <Label className="text-sm">Link To</Label>
                  <select 
                    value={formData.secondaryButtonLink} 
                    onChange={(e) => setFormData({...formData, secondaryButtonLink: e.target.value})}
                    className="p-2 border rounded-md text-sm bg-white"
                  >
                    <option value="/about">About Page</option>
                    <option value="/services">Services Page</option>
                    <option value="/contact">Contact Page</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Save Button */}
      <Card className="p-4">
        <Button onClick={() => onSave(formData)} disabled={saving} className="w-full h-12 text-lg">
          {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          <Save className="w-4 h-4 mr-2" />
          Save CTA Section
        </Button>
      </Card>
    </div>
  );
}
