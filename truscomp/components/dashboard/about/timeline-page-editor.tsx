"use client";

import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "@/components/ui/image-upload";
import { Plus, Trash2, Loader2, Save, Target, Clock, Award, HelpCircle, Sparkles, Image as ImageIcon, Calendar } from "lucide-react";
import { toast } from "sonner";
import { axiosInstance } from "@/lib/api";
import PageSEOEditor from "@/components/dashboard/page-seo-editor";

export default function TimelinePageEditor() {
  const [data, setData] = useState<{
    hero?: any;
    timeline?: any;
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
      if (["hero", "timeline", "why", "faq", "cta", "seo"].includes(hash)) {
        setActiveTab(hash);
      }
    }
  }, []);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get("/api/about-page-settings/timelines-milestones");
      if (response.data.success) {
        setData(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load timeline page data");
    } finally {
      setLoading(false);
    }
  };

  const saveSection = async (section: string, sectionData: any) => {
    setSaving(true);
    try {
      const response = await axiosInstance.put(`/api/about-page-settings/timelines-milestones/${section}`, sectionData);
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
      <Card className="p-6 bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-indigo-100 rounded-lg">
            <Sparkles className="w-5 h-5 text-indigo-600" />
          </div>
          <div>
            <h3 className="font-semibold text-indigo-900">Timelines & Milestones Page Overview</h3>
            <p className="text-sm text-indigo-700">Manage your project phases, timelines, and implementation process</p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="bg-white/60 p-3 rounded-lg">
            <div className="font-medium text-gray-900">Hero Section</div>
            <div className="text-gray-600">Main introduction</div>
          </div>
          <div className="bg-white/60 p-3 rounded-lg">
            <div className="font-medium text-gray-900">Timeline Phases</div>
            <div className="text-gray-600">{data?.timeline?.phases?.length || 0} phases</div>
          </div>
          <div className="bg-white/60 p-3 rounded-lg">
            <div className="font-medium text-gray-900">Benefits</div>
            <div className="text-gray-600">{data?.why?.benefits?.length || 0} benefits</div>
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
          <TabsTrigger value="timeline" className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Timeline
          </TabsTrigger>
          <TabsTrigger value="why" className="flex items-center gap-2">
            <Award className="w-4 h-4" />
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

        <TabsContent value="timeline">
          <TimelineEditor data={data.timeline} onSave={(sectionData: any) => saveSection("timeline", sectionData)} saving={saving} />
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
          <PageSEOEditor pageKey="timelines-milestones" pageName="Timelines & Milestones" />
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Hero Editor
function HeroEditor({ data, onSave, saving }: { data: any; onSave: (data: any) => void; saving: boolean }) {
  const [formData, setFormData] = useState({
    subheading: data?.subheading || "Our Process",
    heading: data?.heading || "Timelines and Milestones",
    description: data?.description || "At TrusComp, we pride ourselves on delivering effective project implementation through a structured approach with clear timelines and milestones.",
    backgroundImage: data?.backgroundImage || "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=2000&h=1200&fit=crop",
    primaryButtonText: data?.primaryButtonText || "Book Now",
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
            <p className="text-sm text-green-700">Introduce your implementation process and timeline</p>
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
                  placeholder="e.g., Our Process"
                />
              </div>

              <div className="grid gap-2">
                <Label>Main Heading</Label>
                <Input 
                  value={formData.heading} 
                  onChange={(e) => setFormData({...formData, heading: e.target.value})}
                  placeholder="e.g., Timelines and Milestones"
                  className="text-lg font-semibold"
                />
              </div>

              <div className="grid gap-2">
                <Label>Description</Label>
                <Textarea 
                  value={formData.description} 
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Describe your implementation process..."
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
                <p>• Business/process theme</p>
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

// Timeline Editor - The main phases/milestones editor
function TimelineEditor({ data, onSave, saving }: { data: any; onSave: (data: any) => void; saving: boolean }) {
  const [title, setTitle] = useState(data?.title || "Phased Project Delivery");
  const [subtitle, setSubtitle] = useState(data?.subtitle || "A proven methodology that ensures successful implementation and lasting compliance");
  const [badge, setBadge] = useState(data?.badge || "8-9 weeks implementation timeline");
  const [phases, setPhases] = useState(data?.phases || []);

  const addPhase = () => {
    setPhases([...phases, { 
      number: String(phases.length + 1).padStart(2, '0'),
      title: "", 
      week: "", 
      description: "", 
      deliverables: [],
      duration: ""
    }]);
  };

  const removePhase = (index: number) => {
    setPhases(phases.filter((_: any, i: number) => i !== index));
  };

  const updatePhase = (index: number, field: string, value: any) => {
    const updated = [...phases];
    updated[index] = { ...updated[index], [field]: value };
    setPhases(updated);
  };

  const addDeliverable = (phaseIndex: number) => {
    const updated = [...phases];
    updated[phaseIndex].deliverables = [...(updated[phaseIndex].deliverables || []), ""];
    setPhases(updated);
  };

  const removeDeliverable = (phaseIndex: number, deliverableIndex: number) => {
    const updated = [...phases];
    updated[phaseIndex].deliverables = updated[phaseIndex].deliverables.filter((_: string, i: number) => i !== deliverableIndex);
    setPhases(updated);
  };

  const updateDeliverable = (phaseIndex: number, deliverableIndex: number, value: string) => {
    const updated = [...phases];
    updated[phaseIndex].deliverables[deliverableIndex] = value;
    setPhases(updated);
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <Card className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Calendar className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-blue-900">Timeline & Phases Section</h3>
            <p className="text-sm text-blue-700">Manage your project phases, milestones, and deliverables</p>
          </div>
        </div>
      </Card>

      {/* Basic Info */}
      <Card className="p-6">
        <h4 className="text-lg font-semibold mb-4">Section Information</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Badge Text</Label>
            <Input 
              value={badge} 
              onChange={(e) => setBadge(e.target.value)}
              placeholder="e.g., 8-9 weeks implementation"
            />
          </div>
          <div className="space-y-2">
            <Label>Section Title</Label>
            <Input 
              value={title} 
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Phased Project Delivery"
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

      {/* Phases */}
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h4 className="text-lg font-semibold">Project Phases</h4>
            <p className="text-sm text-muted-foreground">Add implementation phases with deliverables and timelines</p>
          </div>
          <Button onClick={addPhase} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Phase
          </Button>
        </div>

        {phases.length === 0 && (
          <div className="text-center py-12 bg-muted/50 rounded-lg border-2 border-dashed">
            <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No phases added yet</h3>
            <p className="text-muted-foreground mb-4">Start by adding your project implementation phases</p>
            <Button onClick={addPhase} variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Phase
            </Button>
          </div>
        )}

        <div className="space-y-6">
          {phases.map((phase: any, i: number) => (
            <Card key={i} className="p-6 border-l-4 border-l-blue-500">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h5 className="font-semibold text-lg">Phase {i + 1}</h5>
                  <p className="text-sm text-muted-foreground">{phase.title || 'Unnamed phase'}</p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => removePhase(i)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Phase Number</Label>
                    <Input
                      value={phase.number}
                      onChange={(e) => updatePhase(i, "number", e.target.value)}
                      placeholder="e.g., 01"
                      className="text-center font-bold"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Week/Timeline *</Label>
                    <Input
                      value={phase.week}
                      onChange={(e) => updatePhase(i, "week", e.target.value)}
                      placeholder="e.g., Week 1-2"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Duration *</Label>
                    <Input
                      value={phase.duration}
                      onChange={(e) => updatePhase(i, "duration", e.target.value)}
                      placeholder="e.g., 2 weeks"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Phase Title *</Label>
                    <Input
                      value={phase.title}
                      onChange={(e) => updatePhase(i, "title", e.target.value)}
                      placeholder="e.g., Needs Assessment"
                      className="font-medium"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Phase Description *</Label>
                  <Textarea
                    value={phase.description}
                    onChange={(e) => updatePhase(i, "description", e.target.value)}
                    placeholder="Describe what happens in this phase..."
                    rows={3}
                  />
                </div>

                {/* Deliverables */}
                <div className="space-y-3 p-4 bg-muted/50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <Label className="text-sm font-medium">Key Deliverables</Label>
                    <Button 
                      onClick={() => addDeliverable(i)} 
                      size="sm" 
                      variant="outline"
                    >
                      <Plus className="w-3 h-3 mr-1" />
                      Add Deliverable
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {(phase.deliverables || []).map((deliverable: string, j: number) => (
                      <div key={j} className="flex gap-2">
                        <Input
                          value={deliverable}
                          onChange={(e) => updateDeliverable(i, j, e.target.value)}
                          placeholder="e.g., Compliance Gap Analysis"
                          className="text-sm"
                        />
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => removeDeliverable(i, j)}
                          className="text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">Add specific deliverables for this phase</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Card>

      {/* Save Button */}
      <Card className="p-4">
        <Button onClick={() => onSave({ title, subtitle, badge, phases })} disabled={saving} className="w-full h-12 text-lg">
          {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          <Save className="w-4 h-4 mr-2" />
          Save Timeline Section
        </Button>
      </Card>
    </div>
  );
}

// Why Editor
function WhyEditor({ data, onSave, saving }: { data: any; onSave: (data: any) => void; saving: boolean }) {
  const [title, setTitle] = useState(data?.title || "Why Choose TrusComp's Phased Approach?");
  const [subtitle, setSubtitle] = useState(data?.subtitle || "Our proven methodology delivers results with minimal risk and maximum efficiency.");
  const [benefits, setBenefits] = useState(data?.benefits || []);

  const addBenefit = () => {
    setBenefits([...benefits, { title: "", description: "" }]);
  };

  const removeBenefit = (index: number) => {
    setBenefits(benefits.filter((_: any, i: number) => i !== index));
  };

  const updateBenefit = (index: number, field: string, value: string) => {
    const updated = [...benefits];
    updated[index] = { ...updated[index], [field]: value };
    setBenefits(updated);
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
            <h3 className="font-semibold text-orange-900">Why Choose Us Section</h3>
            <p className="text-sm text-orange-700">Highlight the benefits of your phased approach</p>
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
              placeholder="e.g., Why Choose TrusComp's Phased Approach?"
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
            <p className="text-sm text-muted-foreground">Add benefits of your phased approach</p>
          </div>
          <Button onClick={addBenefit} className="bg-orange-600 hover:bg-orange-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Benefit
          </Button>
        </div>

        {benefits.length === 0 && (
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
          {benefits.map((benefit: any, i: number) => (
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
                    placeholder="e.g., Seamless Transition"
                    className="font-medium"
                  />
                </div>

                <div className="md:col-span-2 space-y-2">
                  <Label className="text-sm font-medium">Description *</Label>
                  <Textarea
                    value={benefit.description}
                    onChange={(e) => updateBenefit(i, "description", e.target.value)}
                    placeholder="Explain this benefit..."
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
        <Button onClick={() => onSave({ title, subtitle, benefits })} disabled={saving} className="w-full h-12 text-lg">
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
  const [description, setDescription] = useState(data?.description || "Common questions about our implementation process");
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
            <p className="text-sm text-green-700">Answer questions about your timeline and process</p>
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
            <p className="text-sm text-muted-foreground">Add common questions about your process</p>
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
                    placeholder="e.g., How long does implementation take?"
                    className="font-medium"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Answer *</Label>
                  <Textarea
                    value={item.answer}
                    onChange={(e) => updateFaq(i, "answer", e.target.value)}
                    placeholder="Provide a clear answer..."
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
    title: data?.title || "Ready to Begin Your Compliance Journey?",
    description: data?.description || "Let us guide you through a seamless implementation process with clear timelines and milestones.",
    primaryButtonText: data?.primaryButtonText || "Schedule Consultation",
    primaryButtonLink: data?.primaryButtonLink || "/contact",
    secondaryButtonText: data?.secondaryButtonText || "View Services",
    secondaryButtonLink: data?.secondaryButtonLink || "/services"
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
            <p className="text-sm text-indigo-700">Encourage visitors to start their journey</p>
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
              placeholder="e.g., Ready to Begin Your Compliance Journey?" 
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
                    placeholder="e.g., Schedule Consultation" 
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
                    placeholder="e.g., View Services" 
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
                    <option value="/services">Services Page</option>
                    <option value="/about">About Page</option>
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
