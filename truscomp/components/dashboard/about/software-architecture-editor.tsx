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
import { Plus, Trash2, Loader2, Save, Target, Cpu, Award, HelpCircle, Sparkles, Image as ImageIcon, TrendingUp } from "lucide-react";
import { toast } from "sonner";
import { axiosInstance } from "@/lib/api";
import PageSEOEditor from "@/components/dashboard/page-seo-editor";

export default function SoftwareArchitectureEditor() {
  const [data, setData] = useState<{
    hero?: any;
    features?: any;
    benefits?: any;
    why?: any;
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
      if (["hero", "features", "benefits", "why", "faq", "cta", "seo"].includes(hash)) {
        setActiveTab(hash);
      }
    }
  }, []);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get("/api/about-page-settings/software-architecture");
      if (response.data.success) {
        setData(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load software architecture page data");
    } finally {
      setLoading(false);
    }
  };

  const saveSection = async (section: string, sectionData: any) => {
    setSaving(true);
    try {
      const response = await axiosInstance.put(`/api/about-page-settings/software-architecture/${section}`, sectionData);
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
      <Card className="p-6 bg-gradient-to-r from-cyan-50 to-blue-50 border-cyan-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-cyan-100 rounded-lg">
            <Sparkles className="w-5 h-5 text-cyan-600" />
          </div>
          <div>
            <h3 className="font-semibold text-cyan-900">Software Architecture Page Overview</h3>
            <p className="text-sm text-cyan-700">Manage your technology features, benefits, and technical details</p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="bg-white/60 p-3 rounded-lg">
            <div className="font-medium text-gray-900">Hero Section</div>
            <div className="text-gray-600">Main introduction</div>
          </div>
          <div className="bg-white/60 p-3 rounded-lg">
            <div className="font-medium text-gray-900">Features</div>
            <div className="text-gray-600">{data?.features?.items?.length || 0} features</div>
          </div>
          <div className="bg-white/60 p-3 rounded-lg">
            <div className="font-medium text-gray-900">Benefits</div>
            <div className="text-gray-600">{data?.benefits?.items?.length || 0} benefits</div>
          </div>
          <div className="bg-white/60 p-3 rounded-lg">
            <div className="font-medium text-gray-900">FAQ</div>
            <div className="text-gray-600">{data?.faq?.items?.length || 0} questions</div>
          </div>
        </div>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="hero" className="flex items-center gap-2">
            <Target className="w-4 h-4" />
            Hero
          </TabsTrigger>
          <TabsTrigger value="features" className="flex items-center gap-2">
            <Cpu className="w-4 h-4" />
            Features
          </TabsTrigger>
          <TabsTrigger value="benefits" className="flex items-center gap-2">
            <Award className="w-4 h-4" />
            Benefits
          </TabsTrigger>
          <TabsTrigger value="why" className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Why Us
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

        <TabsContent value="features">
          <FeaturesEditor data={data.features} onSave={(sectionData: any) => saveSection("features", sectionData)} saving={saving} />
        </TabsContent>

        <TabsContent value="benefits">
          <BenefitsEditor data={data.benefits} onSave={(sectionData: any) => saveSection("benefits", sectionData)} saving={saving} />
        </TabsContent>

        <TabsContent value="why">
          <WhyEditor data={data.why} onSave={(sectionData: any) => saveSection("why", sectionData)} saving={saving} />
        </TabsContent>

        <TabsContent value="faq">
          <FaqEditor data={data.faq} onSave={(sectionData: any) => saveSection("faq", sectionData)} saving={saving} />
        </TabsContent>

        <TabsContent value="cta">
          <CtaEditor data={data.cta} onSave={(sectionData: any) => saveSection("cta", sectionData)} saving={saving} />
        </TabsContent>

        <TabsContent value="seo">
          <PageSEOEditor pageKey="software-architecture" pageName="Software Architecture" />
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Hero Editor
function HeroEditor({ data, onSave, saving }: { data: any; onSave: (data: any) => void; saving: boolean }) {
  const [formData, setFormData] = useState({
    subheading: data?.subheading || "Advanced Technology",
    heading: data?.heading || "Software Architecture: The Engine Behind Our Solution",
    description: data?.description || "At TrusComp, technology powers everything we do. Our advanced software architecture ensures efficient, secure, and scalable compliance solutions.",
    backgroundImage: data?.backgroundImage || "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=2000&h=1200&fit=crop",
    primaryButtonText: data?.primaryButtonText || "Schedule a Call",
    primaryButtonLink: data?.primaryButtonLink || "/contact",
    secondaryButtonText: data?.secondaryButtonText || "Book Demo",
    secondaryButtonLink: data?.secondaryButtonLink || "/demo"
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
            <p className="text-sm text-green-700">Introduce your technology and software architecture</p>
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
                  placeholder="e.g., Advanced Technology"
                />
              </div>

              <div className="grid gap-2">
                <Label>Main Heading</Label>
                <Input 
                  value={formData.heading} 
                  onChange={(e) => setFormData({...formData, heading: e.target.value})}
                  placeholder="e.g., Software Architecture: The Engine Behind Our Solution"
                  className="text-lg font-semibold"
                />
              </div>

              <div className="grid gap-2">
                <Label>Description</Label>
                <Textarea 
                  value={formData.description} 
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Describe your technology and architecture..."
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
                      <option value="/demo">Demo Page</option>
                      <option value="/services">Services Page</option>
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
                      <option value="/demo">Demo Page</option>
                      <option value="/contact">Contact Page</option>
                      <option value="/about">About Page</option>
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
                <p>• Technology/digital theme</p>
                <p>• High quality, professional</p>
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

// Features Editor
function FeaturesEditor({ data, onSave, saving }: { data: any; onSave: (data: any) => void; saving: boolean }) {
  const [title, setTitle] = useState(data?.title || "Key Features");
  const [subtitle, setSubtitle] = useState(data?.subtitle || "Explore the key technological features that make our platform a leader in compliance management");
  const [items, setItems] = useState(data?.items || []);

  const addFeature = () => {
    setItems([...items, { 
      icon: "Cloud", 
      title: "", 
      description: "" 
    }]);
  };

  const removeFeature = (index: number) => {
    setItems(items.filter((_: any, i: number) => i !== index));
  };

  const updateFeature = (index: number, field: string, value: string) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: value };
    setItems(updated);
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <Card className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Cpu className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-blue-900">Key Features Section</h3>
            <p className="text-sm text-blue-700">Highlight your technology features and capabilities</p>
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
              placeholder="e.g., Key Features"
            />
          </div>
          <div className="space-y-2">
            <Label>Section Subtitle</Label>
            <Input 
              value={subtitle} 
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="Brief description"
            />
          </div>
        </div>
      </Card>

      {/* Features */}
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h4 className="text-lg font-semibold">Technical Features</h4>
            <p className="text-sm text-muted-foreground">Add key features of your software architecture</p>
          </div>
          <Button onClick={addFeature} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Feature
          </Button>
        </div>

        {items.length === 0 && (
          <div className="text-center py-12 bg-muted/50 rounded-lg border-2 border-dashed">
            <Cpu className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No features added yet</h3>
            <p className="text-muted-foreground mb-4">Start by adding your key technical features</p>
            <Button onClick={addFeature} variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Feature
            </Button>
          </div>
        )}

        <div className="space-y-6">
          {items.map((feature: any, i: number) => (
            <Card key={i} className="p-6 border-l-4 border-l-blue-500">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h5 className="font-semibold text-lg">Feature {i + 1}</h5>
                  <p className="text-sm text-muted-foreground">{feature.title || 'Unnamed feature'}</p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => removeFeature(i)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Icon</Label>
                  <IconPicker
                    value={feature.icon}
                    onChange={(v) => updateFeature(i, "icon", v)}
                  />
                  <p className="text-xs text-muted-foreground">Choose a relevant tech icon</p>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Feature Title *</Label>
                  <Input
                    value={feature.title}
                    onChange={(e) => updateFeature(i, "title", e.target.value)}
                    placeholder="e.g., Cloud-Based Infrastructure"
                    className="font-medium"
                  />
                </div>

                <div className="lg:col-span-2 space-y-2">
                  <Label className="text-sm font-medium">Feature Description *</Label>
                  <Textarea
                    value={feature.description}
                    onChange={(e) => updateFeature(i, "description", e.target.value)}
                    placeholder="Explain this technical feature and its benefits..."
                    rows={3}
                  />
                </div>
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
          Save Features Section
        </Button>
      </Card>
    </div>
  );
}

// Benefits Editor
function BenefitsEditor({ data, onSave, saving }: { data: any; onSave: (data: any) => void; saving: boolean }) {
  const [title, setTitle] = useState(data?.title || "Benefits of Our Technology");
  const [subtitle, setSubtitle] = useState(data?.subtitle || "Discover how our advanced software architecture delivers tangible value to your business");
  const [items, setItems] = useState(data?.items || []);

  const addBenefit = () => {
    setItems([...items, { 
      title: "", 
      description: "" 
    }]);
  };

  const removeBenefit = (index: number) => {
    setItems(items.filter((_: any, i: number) => i !== index));
  };

  const updateBenefit = (index: number, field: string, value: string) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: value };
    setItems(updated);
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <Card className="p-4 bg-gradient-to-r from-orange-50 to-amber-50 border-orange-200">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-orange-100 rounded-lg">
            <Award className="w-5 h-5 text-orange-600" />
          </div>
          <div>
            <h3 className="font-semibold text-orange-900">Benefits Section</h3>
            <p className="text-sm text-orange-700">Show the business value of your technology</p>
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
              placeholder="e.g., Benefits of Our Technology"
            />
          </div>
          <div className="space-y-2">
            <Label>Section Subtitle</Label>
            <Input 
              value={subtitle} 
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="Brief description"
            />
          </div>
        </div>
      </Card>

      {/* Benefits */}
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h4 className="text-lg font-semibold">Key Benefits</h4>
            <p className="text-sm text-muted-foreground">Add the business benefits of your technology</p>
          </div>
          <Button onClick={addBenefit} className="bg-orange-600 hover:bg-orange-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Benefit
          </Button>
        </div>

        {items.length === 0 && (
          <div className="text-center py-12 bg-muted/50 rounded-lg border-2 border-dashed">
            <Award className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No benefits added yet</h3>
            <p className="text-muted-foreground mb-4">Start by adding key benefits</p>
            <Button onClick={addBenefit} variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Benefit
            </Button>
          </div>
        )}

        <div className="space-y-6">
          {items.map((benefit: any, i: number) => (
            <Card key={i} className="p-6 border-l-4 border-l-orange-500">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h5 className="font-semibold text-lg">Benefit {i + 1}</h5>
                  <p className="text-sm text-muted-foreground">{benefit.title || 'Unnamed benefit'}</p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => removeBenefit(i)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Benefit Title *</Label>
                  <Input
                    value={benefit.title}
                    onChange={(e) => updateBenefit(i, "title", e.target.value)}
                    placeholder="e.g., Enhanced Efficiency"
                    className="font-medium"
                  />
                </div>

                <div className="md:col-span-2 space-y-2">
                  <Label className="text-sm font-medium">Benefit Description *</Label>
                  <Textarea
                    value={benefit.description}
                    onChange={(e) => updateBenefit(i, "description", e.target.value)}
                    placeholder="Explain how this benefit helps businesses..."
                    rows={3}
                  />
                </div>
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
          Save Benefits Section
        </Button>
      </Card>
    </div>
  );
}

// Why Editor
function WhyEditor({ data, onSave, saving }: { data: any; onSave: (data: any) => void; saving: boolean }) {
  const [title, setTitle] = useState(data?.title || "Why Choose TrusComp?");
  const [subtitle, setSubtitle] = useState(data?.subtitle || "Our technology platform delivers unmatched value through proven expertise and innovation");
  const [stats, setStats] = useState(data?.stats || []);
  const [reasons, setReasons] = useState(data?.reasons || []);

  const addStat = () => {
    setStats([...stats, { value: "", label: "" }]);
  };

  const removeStat = (index: number) => {
    setStats(stats.filter((_: any, i: number) => i !== index));
  };

  const updateStat = (index: number, field: string, value: string) => {
    const updated = [...stats];
    updated[index] = { ...updated[index], [field]: value };
    setStats(updated);
  };

  const addReason = () => {
    setReasons([...reasons, { title: "", description: "" }]);
  };

  const removeReason = (index: number) => {
    setReasons(reasons.filter((_: any, i: number) => i !== index));
  };

  const updateReason = (index: number, field: string, value: string) => {
    const updated = [...reasons];
    updated[index] = { ...updated[index], [field]: value };
    setReasons(updated);
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <Card className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-100 rounded-lg">
            <TrendingUp className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h3 className="font-semibold text-purple-900">Why Choose Us Section</h3>
            <p className="text-sm text-purple-700">Show statistics and reasons to choose your technology</p>
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
              placeholder="e.g., Why Choose TrusComp?"
            />
          </div>
          <div className="space-y-2">
            <Label>Section Subtitle</Label>
            <Input 
              value={subtitle} 
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="Brief description"
            />
          </div>
        </div>
      </Card>

      {/* Statistics */}
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h4 className="text-lg font-semibold">Key Statistics</h4>
            <p className="text-sm text-muted-foreground">Add impressive numbers (max 3 recommended)</p>
          </div>
          <Button onClick={addStat} size="sm" variant="outline">
            <Plus className="w-4 h-4 mr-2" />
            Add Stat
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stats.map((stat: any, i: number) => (
            <Card key={i} className="p-4 border-l-4 border-l-purple-500">
              <div className="flex justify-between items-start mb-3">
                <h5 className="font-semibold text-sm">Stat {i + 1}</h5>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => removeStat(i)}
                  className="h-6 w-6 p-0 text-red-600"
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
              <div className="space-y-3">
                <Input
                  value={stat.value}
                  onChange={(e) => updateStat(i, "value", e.target.value)}
                  placeholder="e.g., 100+, 99.9%"
                  className="text-center font-bold"
                />
                <Input
                  value={stat.label}
                  onChange={(e) => updateStat(i, "label", e.target.value)}
                  placeholder="e.g., Trusted Clients"
                  className="text-sm"
                />
              </div>
            </Card>
          ))}
        </div>
      </Card>

      {/* Reasons */}
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h4 className="text-lg font-semibold">Reasons to Choose</h4>
            <p className="text-sm text-muted-foreground">Add compelling reasons</p>
          </div>
          <Button onClick={addReason} className="bg-purple-600 hover:bg-purple-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Reason
          </Button>
        </div>

        <div className="space-y-6">
          {reasons.map((reason: any, i: number) => (
            <Card key={i} className="p-6 border-l-4 border-l-purple-500">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h5 className="font-semibold text-lg">Reason {i + 1}</h5>
                  <p className="text-sm text-muted-foreground">{reason.title || 'Unnamed reason'}</p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => removeReason(i)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Reason Title *</Label>
                  <Input
                    value={reason.title}
                    onChange={(e) => updateReason(i, "title", e.target.value)}
                    placeholder="e.g., Proven Expertise"
                    className="font-medium"
                  />
                </div>

                <div className="md:col-span-2 space-y-2">
                  <Label className="text-sm font-medium">Description *</Label>
                  <Textarea
                    value={reason.description}
                    onChange={(e) => updateReason(i, "description", e.target.value)}
                    placeholder="Explain this reason..."
                    rows={3}
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Card>

      {/* Save Button */}
      <Card className="p-4">
        <Button onClick={() => onSave({ title, subtitle, stats, reasons })} disabled={saving} className="w-full h-12 text-lg">
          {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          <Save className="w-4 h-4 mr-2" />
          Save Why Choose Section
        </Button>
      </Card>
    </div>
  );
}

// FAQ Editor
function FaqEditor({ data, onSave, saving }: { data: any; onSave: (data: any) => void; saving: boolean }) {
  const [title, setTitle] = useState(data?.title || "Frequently Asked Questions");
  const [description, setDescription] = useState(data?.description || "Common questions about our software architecture");
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
            <p className="text-sm text-green-700">Answer technical questions about your architecture</p>
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
            <p className="text-sm text-muted-foreground">Add technical FAQs</p>
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
            <p className="text-muted-foreground mb-4">Start by adding common technical questions</p>
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
                    placeholder="e.g., Is the platform cloud-based?"
                    className="font-medium"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Answer *</Label>
                  <Textarea
                    value={item.answer}
                    onChange={(e) => updateFaq(i, "answer", e.target.value)}
                    placeholder="Provide a clear, technical answer..."
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
    badge: data?.badge || "Get Started",
    title: data?.title || "Ready to Experience Our Technology?",
    description: data?.description || "Discover how our advanced software architecture can transform your compliance management.",
    primaryButtonText: data?.primaryButtonText || "Schedule Demo",
    primaryButtonLink: data?.primaryButtonLink || "/demo",
    secondaryButtonText: data?.secondaryButtonText || "Contact Sales",
    secondaryButtonLink: data?.secondaryButtonLink || "/contact"
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
            <p className="text-sm text-indigo-700">Encourage visitors to try your technology</p>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h4 className="text-lg font-semibold mb-6">CTA Content</h4>
        <div className="space-y-4">
          <div className="grid gap-2">
            <Label>Badge Text</Label>
            <Input 
              placeholder="e.g., Get Started" 
              value={formData.badge} 
              onChange={(e) => setFormData({...formData, badge: e.target.value})} 
            />
          </div>

          <div className="grid gap-2">
            <Label>Main Title</Label>
            <Input 
              placeholder="e.g., Ready to Experience Our Technology?" 
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
                    placeholder="e.g., Schedule Demo" 
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
                    <option value="/demo">Demo Page</option>
                    <option value="/contact">Contact Page</option>
                    <option value="/services">Services Page</option>
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
                    placeholder="e.g., Contact Sales" 
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
                    <option value="/contact">Contact Page</option>
                    <option value="/about">About Page</option>
                    <option value="/services">Services Page</option>
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
