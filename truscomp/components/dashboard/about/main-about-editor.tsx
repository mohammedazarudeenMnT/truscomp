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
import { Plus, Trash2, Loader2, Save, Users, Award, Target, HelpCircle, MessageSquare, Sparkles, Image as ImageIcon, Link as LinkIcon } from "lucide-react";
import { toast } from "sonner";
import { axiosInstance } from "@/lib/api";
import PageSEOEditor from "@/components/dashboard/page-seo-editor";

export default function MainAboutEditor() {
  const [data, setData] = useState<{
    hero?: any;
    founders?: any;
    impact?: any;
    whySection?: any;
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
      if (["hero", "founders", "impact", "why", "faq", "cta", "seo"].includes(hash)) {
        setActiveTab(hash);
      }
    }
  }, []);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get("/api/about-page-settings/about");
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
      const response = await axiosInstance.put(`/api/about-page-settings/about/${section}`, sectionData);
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
      <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Sparkles className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-blue-900">About Page Overview</h3>
            <p className="text-sm text-blue-700">Manage your company story, team, and key information</p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="bg-white/60 p-3 rounded-lg">
            <div className="font-medium text-gray-900">Hero Section</div>
            <div className="text-gray-600">Main introduction</div>
          </div>
          <div className="bg-white/60 p-3 rounded-lg">
            <div className="font-medium text-gray-900">Team</div>
            <div className="text-gray-600">{data?.founders?.members?.length || 0} members</div>
          </div>
          <div className="bg-white/60 p-3 rounded-lg">
            <div className="font-medium text-gray-900">Impact Stats</div>
            <div className="text-gray-600">{data?.impact?.stats?.length || 0} statistics</div>
          </div>
          <div className="bg-white/60 p-3 rounded-lg">
            <div className="font-medium text-gray-900">Features</div>
            <div className="text-gray-600">{data?.whySection?.features?.length || 0} features</div>
          </div>
        </div>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="hero" className="flex items-center gap-2">
            <Target className="w-4 h-4" />
            Hero
          </TabsTrigger>
          <TabsTrigger value="founders" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Team
          </TabsTrigger>
          <TabsTrigger value="impact" className="flex items-center gap-2">
            <Award className="w-4 h-4" />
            Impact
          </TabsTrigger>
          <TabsTrigger value="why" className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
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

        <TabsContent value="founders">
          <FoundersEditor data={data.founders} onSave={(sectionData: any) => saveSection("founders", sectionData)} saving={saving} />
        </TabsContent>

        <TabsContent value="impact">
          <ImpactEditor data={data.impact} onSave={(sectionData: any) => saveSection("impact", sectionData)} saving={saving} />
        </TabsContent>

        <TabsContent value="why">
          <WhyEditor data={data.whySection} onSave={(sectionData: any) => saveSection("why-section", sectionData)} saving={saving} />
        </TabsContent>

        <TabsContent value="faq">
          <FaqEditor data={data.faq} onSave={(sectionData: any) => saveSection("faq", sectionData)} saving={saving} />
        </TabsContent>

        <TabsContent value="cta">
          <CtaEditor data={data.cta} onSave={(sectionData: any) => saveSection("cta", sectionData)} saving={saving} />
        </TabsContent>

        <TabsContent value="seo">
          <PageSEOEditor pageKey="about" pageName="About Us" />
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Hero Editor - User-friendly with clear guidance
function HeroEditor({ data, onSave, saving }: { data: any; onSave: (data: any) => void; saving: boolean }) {
  const [formData, setFormData] = useState({
    badge: data?.badge || "About TrusComp",
    title: data?.title || "Who We Are",
    description: data?.description || "TrusComp Private Limited is a trusted leader in compliance solutions, committed to transforming regulatory adherence through innovation and expertise.",
    image: data?.image || "",
    primaryButtonText: data?.primaryButtonText || "Get Started",
    primaryButtonLink: data?.primaryButtonLink || "/contact",
    secondaryButtonText: data?.secondaryButtonText || "Meet the Team",
    secondaryButtonLink: data?.secondaryButtonLink || "#founders",
    statsNumber: data?.statsNumber || "7+",
    statsTitle: data?.statsTitle || "Years of Excellence",
    statsDescription: data?.statsDescription || "Trusted by Industry Leaders"
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
            <p className="text-sm text-green-700">The first thing visitors see - make it compelling!</p>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Main Content - 3 columns */}
        <div className="xl:col-span-3 space-y-6">
          {/* Basic Information */}
          <Card className="p-6">
            <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-blue-600" />
              Main Content
            </h4>
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label className="text-sm font-medium">Badge Text</Label>
                <Input 
                  value={formData.badge} 
                  onChange={(e) => setFormData({...formData, badge: e.target.value})}
                  placeholder="e.g., About TrusComp"
                  className="text-sm"
                />
                <p className="text-xs text-muted-foreground">Small text that appears above the main title</p>
              </div>

              <div className="grid gap-2">
                <Label className="text-sm font-medium">Main Title</Label>
                <Input 
                  value={formData.title} 
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="e.g., Who We Are"
                  className="text-lg font-semibold"
                />
                <p className="text-xs text-muted-foreground">The main headline visitors will see</p>
              </div>

              <div className="grid gap-2">
                <Label className="text-sm font-medium">Description</Label>
                <Textarea 
                  value={formData.description} 
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Tell your company story in 2-3 sentences..."
                  rows={4}
                  className="text-sm"
                />
                <p className="text-xs text-muted-foreground">Compelling description of your company (keep it concise but impactful)</p>
              </div>
            </div>
          </Card>

          {/* Action Buttons */}
          <Card className="p-6">
            <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <LinkIcon className="w-5 h-5 text-purple-600" />
              Call-to-Action Buttons
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h5 className="font-medium text-blue-900">Primary Button (Main Action)</h5>
                <div className="space-y-3">
                  <div className="grid gap-2">
                    <Label className="text-sm">Button Text</Label>
                    <Input 
                      value={formData.primaryButtonText} 
                      onChange={(e) => setFormData({...formData, primaryButtonText: e.target.value})}
                      placeholder="e.g., Get Started"
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
                      <option value="/about/our-team">Our Team</option>
                      <option value="#founders">Founders Section</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="space-y-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h5 className="font-medium text-gray-900">Secondary Button (Alternative Action)</h5>
                <div className="space-y-3">
                  <div className="grid gap-2">
                    <Label className="text-sm">Button Text</Label>
                    <Input 
                      value={formData.secondaryButtonText} 
                      onChange={(e) => setFormData({...formData, secondaryButtonText: e.target.value})}
                      placeholder="e.g., Meet the Team"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label className="text-sm">Link To</Label>
                    <select 
                      value={formData.secondaryButtonLink} 
                      onChange={(e) => setFormData({...formData, secondaryButtonLink: e.target.value})}
                      className="p-2 border rounded-md text-sm bg-white"
                    >
                      <option value="#founders">Founders Section</option>
                      <option value="/about/our-team">Our Team Page</option>
                      <option value="/about/vision-mission-and-core-values">Our Vision</option>
                      <option value="/services">Our Services</option>
                      <option value="/contact">Contact Us</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Sidebar - 1 column */}
        <div className="space-y-6">
          {/* Hero Image */}
          <Card className="p-6">
            <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-orange-600" />
              Hero Image
            </h4>
            <div className="space-y-4">
              <ImageUpload 
                label="Upload hero image" 
                value={formData.image} 
                onChange={(v) => setFormData({...formData, image: v || ""})} 
                aspectRatio="wide" 
              />
              <div className="text-xs text-muted-foreground space-y-1">
                <p>• Recommended: 1200x800px</p>
                <p>• Shows your office, team, or company</p>
                <p>• High quality, professional image</p>
              </div>
            </div>
          </Card>

          {/* Stats Card */}
          <Card className="p-6">
            <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-green-600" />
              Achievement Highlight
            </h4>
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label className="text-sm font-medium">Number/Stat</Label>
                <Input 
                  value={formData.statsNumber} 
                  onChange={(e) => setFormData({...formData, statsNumber: e.target.value})}
                  placeholder="e.g., 7+, 100+, 99%"
                  className="text-center text-lg font-bold"
                />
              </div>
              <div className="grid gap-2">
                <Label className="text-sm font-medium">Achievement Title</Label>
                <Input 
                  value={formData.statsTitle} 
                  onChange={(e) => setFormData({...formData, statsTitle: e.target.value})}
                  placeholder="e.g., Years of Excellence"
                />
              </div>
              <div className="grid gap-2">
                <Label className="text-sm font-medium">Description</Label>
                <Input 
                  value={formData.statsDescription} 
                  onChange={(e) => setFormData({...formData, statsDescription: e.target.value})}
                  placeholder="e.g., Trusted by Industry Leaders"
                />
              </div>
              <div className="text-xs text-muted-foreground">
                <p>This creates a highlight box showing your key achievement</p>
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

// Founders Editor - User-friendly team management
function FoundersEditor({ data, onSave, saving }: { data: any; onSave: (data: any) => void; saving: boolean }) {
  const [title, setTitle] = useState(data?.title || "Our Founders");
  const [subtitle, setSubtitle] = useState(data?.subtitle || "Meet the visionary leaders driving TrusComp's success");
  const [members, setMembers] = useState(data?.members || []);

  const addMember = () => {
    setMembers([...members, { 
      name: "", 
      role: "", 
      bio: "", 
      image: "", 
      social: { linkedin: "" }
    }]);
  };

  const removeMember = (index: number) => {
    setMembers(members.filter((_: any, i: number) => i !== index));
  };

  const updateMember = (index: number, field: string, value: any) => {
    const updated = [...members];
    if (field === "linkedin") {
      updated[index] = { ...updated[index], social: { linkedin: value } };
    } else {
      updated[index] = { ...updated[index], [field]: value };
    }
    setMembers(updated);
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <Card className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Users className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h3 className="font-semibold text-purple-900">Team & Founders Section</h3>
            <p className="text-sm text-purple-700">Showcase the people behind your success</p>
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
              placeholder="e.g., Our Founders, Meet Our Team"
            />
          </div>
          <div className="space-y-2">
            <Label>Section Subtitle</Label>
            <Input 
              value={subtitle} 
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="Brief description of your team"
            />
          </div>
        </div>
      </Card>

      {/* Team Members */}
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h4 className="text-lg font-semibold">Team Members</h4>
            <p className="text-sm text-muted-foreground">Add your founders, leadership team, or key personnel</p>
          </div>
          <Button onClick={addMember} className="bg-purple-600 hover:bg-purple-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Team Member
          </Button>
        </div>

        {members.length === 0 && (
          <div className="text-center py-12 bg-muted/50 rounded-lg border-2 border-dashed">
            <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No team members added yet</h3>
            <p className="text-muted-foreground mb-4">Start by adding your founders or key team members</p>
            <Button onClick={addMember} variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Team Member
            </Button>
          </div>
        )}

        <div className="space-y-6">
          {members.map((member: any, i: number) => (
            <Card key={i} className="p-6 border-l-4 border-l-purple-500">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h5 className="font-semibold text-lg">Team Member {i + 1}</h5>
                  <p className="text-sm text-muted-foreground">{member.name || 'Unnamed member'}</p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => removeMember(i)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Basic Info */}
                <div className="lg:col-span-2 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Full Name *</Label>
                      <Input
                        value={member.name}
                        onChange={(e) => updateMember(i, "name", e.target.value)}
                        placeholder="e.g., John Smith"
                        className="font-medium"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Role/Title *</Label>
                      <Input
                        value={member.role}
                        onChange={(e) => updateMember(i, "role", e.target.value)}
                        placeholder="e.g., Founder & CEO, Co-Founder"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Bio/Description *</Label>
                    <Textarea
                      value={member.bio}
                      onChange={(e) => updateMember(i, "bio", e.target.value)}
                      placeholder="Write a compelling bio highlighting their experience, achievements, and role in the company..."
                      rows={4}
                      className="text-sm"
                    />
                    <p className="text-xs text-muted-foreground">Tip: Include their background, expertise, and what they bring to the company</p>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">LinkedIn Profile</Label>
                    <Input
                      value={member.social?.linkedin || ""}
                      onChange={(e) => updateMember(i, "linkedin", e.target.value)}
                      placeholder="https://linkedin.com/in/username"
                      type="url"
                    />
                  </div>
                </div>

                {/* Profile Image */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Profile Photo</Label>
                    <ImageUpload
                      label="Upload profile photo"
                      value={member.image}
                      onChange={(v) => updateMember(i, "image", v || "")}
                      aspectRatio="square"
                    />
                    <div className="text-xs text-muted-foreground space-y-1">
                      <p>• Professional headshot recommended</p>
                      <p>• Square format (500x500px ideal)</p>
                      <p>• Clear, high-quality image</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}</div>
      </Card>

      {/* Save Button */}
      <Card className="p-4">
        <Button onClick={() => onSave({ title, subtitle, members })} disabled={saving} className="w-full h-12 text-lg">
          {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          <Save className="w-4 h-4 mr-2" />
          Save Team Section
        </Button>
      </Card>
    </div>
  );
}

// Impact Editor - User-friendly statistics
function ImpactEditor({ data, onSave, saving }: { data: any; onSave: (data: any) => void; saving: boolean }) {
  const [title, setTitle] = useState(data?.title || "Our Impact");
  const [subtitle, setSubtitle] = useState(data?.subtitle || "Measuring our success through the value we deliver to our clients and the industry.");
  const [stats, setStats] = useState(data?.stats || []);

  const addStat = () => {
    setStats([...stats, { 
      name: "", 
      description: "", 
      icon: "Star", 
      className: "md:col-span-1 bg-primary/5 border-primary/10" 
    }]);
  };

  const removeStat = (index: number) => {
    setStats(stats.filter((_: any, i: number) => i !== index));
  };

  const updateStat = (index: number, field: string, value: string) => {
    const updated = [...stats];
    updated[index] = { ...updated[index], [field]: value };
    setStats(updated);
  };

  const layoutOptions = [
    { value: "md:col-span-1 bg-primary/5 border-primary/10", label: "Small ", preview: "1 column" },
    { value: "md:col-span-2 bg-primary/5 border-primary/10", label: "Medium ", preview: "2 columns" },
    { value: "md:col-span-3 bg-primary/5 border-primary/10", label: "Large ", preview: "3 columns (full width)" },
    { value: "md:col-span-1 bg-primary/10 border-primary/20", label: "Small ", preview: "1 column" },
  ];

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <Card className="p-4 bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-orange-100 rounded-lg">
            <Award className="w-5 h-5 text-orange-600" />
          </div>
          <div>
            <h3 className="font-semibold text-orange-900">Impact & Statistics Section</h3>
            <p className="text-sm text-orange-700">Show your achievements and key metrics</p>
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
              placeholder="e.g., Our Impact, Key Achievements"
            />
          </div>
          <div className="space-y-2">
            <Label>Section Subtitle</Label>
            <Input 
              value={subtitle} 
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="Brief description of your impact"
            />
          </div>
        </div>
      </Card>

      {/* Statistics */}
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h4 className="text-lg font-semibold">Statistics & Achievements</h4>
            <p className="text-sm text-muted-foreground">Add key numbers that showcase your success</p>
          </div>
          <Button onClick={addStat} className="bg-orange-600 hover:bg-orange-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Statistic
          </Button>
        </div>

        {stats.length === 0 && (
          <div className="text-center py-12 bg-muted/50 rounded-lg border-2 border-dashed">
            <Award className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No statistics added yet</h3>
            <p className="text-muted-foreground mb-4">Add key metrics like years in business, clients served, success rate, etc.</p>
            <Button onClick={addStat} variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Statistic
            </Button>
          </div>
        )}

        <div className="space-y-6">
          {stats.map((stat: any, i: number) => (
            <Card key={i} className="p-6 border-l-4 border-l-orange-500">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h5 className="font-semibold text-lg">Statistic {i + 1}</h5>
                  <p className="text-sm text-muted-foreground">{stat.name || 'Unnamed statistic'}</p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => removeStat(i)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Statistic/Number *</Label>
                    <Input
                      value={stat.name}
                      onChange={(e) => updateStat(i, "name", e.target.value)}
                      placeholder="e.g., 7+ Years of Excellence, 100+ Clients"
                      className="text-lg font-bold"
                    />
                    <p className="text-xs text-muted-foreground">Include the number and description (e.g., "7+ Years of Excellence")</p>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Description *</Label>
                    <Textarea
                      value={stat.description}
                      onChange={(e) => updateStat(i, "description", e.target.value)}
                      placeholder="Explain what this statistic represents and why it matters..."
                      rows={3}
                    />
                    <p className="text-xs text-muted-foreground">Provide context for the statistic</p>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Layout & Color</Label>
                    <select 
                      value={stat.className} 
                      onChange={(e) => updateStat(i, "className", e.target.value)}
                      className="w-full p-3 border rounded-md bg-white"
                    >
                      {layoutOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label} ({option.preview})
                        </option>
                      ))}
                    </select>
                    <p className="text-xs text-muted-foreground">Choose how this statistic appears in the grid</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Icon</Label>
                    <IconPicker
                      value={stat.icon}
                      onChange={(v) => updateStat(i, "icon", v)}
                    />
                    <p className="text-xs text-muted-foreground">Choose an icon that represents this statistic</p>
                  </div>
                </div>
              </div>
            </Card>
          ))}</div>
      </Card>

      {/* Save Button */}
      <Card className="p-4">
        <Button onClick={() => onSave({ title, subtitle, stats })} disabled={saving} className="w-full h-12 text-lg">
          {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          <Save className="w-4 h-4 mr-2" />
          Save Impact Section
        </Button>
      </Card>
    </div>
  );
}

// Why Editor - User-friendly features showcase
function WhyEditor({ data, onSave, saving }: { data: any; onSave: (data: any) => void; saving: boolean }) {
  const [title, setTitle] = useState(data?.title || "Why TrusComp?");
  const [subtitle, setSubtitle] = useState(data?.subtitle || "We are more than a compliance partner; we are your ally in staying ahead of the curve.");
  const [features, setFeatures] = useState(data?.features || []);
  const [highlights, setHighlights] = useState(data?.highlights || ["Pan-India Presence", "Technology Driven", "Client-Centric Approach"]);

  const addFeature = () => {
    setFeatures([...features, { title: "", description: "", icon: "Lightbulb" }]);
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
    <div className="space-y-6">
      {/* Section Header */}
      <Card className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <MessageSquare className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-blue-900">Why Choose Us Section</h3>
            <p className="text-sm text-blue-700">Highlight what makes your company unique</p>
          </div>
        </div>
      </Card>

      {/* Basic Info */}
      <Card className="p-6">
        <h4 className="text-lg font-semibold mb-4">Section Information</h4>
        <div className="space-y-4">
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
              <Textarea 
                value={subtitle} 
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="Compelling reason why clients should choose you..."
                rows={2}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Key Highlights</Label>
            <Textarea 
              value={highlights.join("\n")} 
              onChange={(e) => setHighlights(e.target.value.split("\n").filter(h => h.trim()))}
              placeholder="Pan-India Presence
Technology Driven
Client-Centric Approach
Expert Team"
              rows={4}
            />
            <p className="text-xs text-muted-foreground">Enter one highlight per line. These appear as badges/tags.</p>
          </div>
        </div>
      </Card>

      {/* Features */}
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h4 className="text-lg font-semibold">Key Features & Benefits</h4>
            <p className="text-sm text-muted-foreground">Add detailed features that set you apart</p>
          </div>
          <Button onClick={addFeature} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Feature
          </Button>
        </div>

        {features.length === 0 && (
          <div className="text-center py-12 bg-muted/50 rounded-lg border-2 border-dashed">
            <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No features added yet</h3>
            <p className="text-muted-foreground mb-4">Add key features that explain why clients should choose you</p>
            <Button onClick={addFeature} variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Feature
            </Button>
          </div>
        )}

        <div className="space-y-6">
          {features.map((feature: any, i: number) => (
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
                  <p className="text-xs text-muted-foreground">Choose a relevant icon</p>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Feature Title *</Label>
                  <Input
                    value={feature.title}
                    onChange={(e) => updateFeature(i, "title", e.target.value)}
                    placeholder="e.g., Expert Consultation"
                    className="font-medium"
                  />
                </div>

                <div className="lg:col-span-2 space-y-2">
                  <Label className="text-sm font-medium">Feature Description *</Label>
                  <Textarea
                    value={feature.description}
                    onChange={(e) => updateFeature(i, "description", e.target.value)}
                    placeholder="Explain how this feature benefits your clients..."
                    rows={3}
                  />
                  <p className="text-xs text-muted-foreground">Focus on the benefit to the client</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Card>

      {/* Save Button */}
      <Card className="p-4">
        <Button onClick={() => onSave({ title, subtitle, features, highlights })} disabled={saving} className="w-full h-12 text-lg">
          {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          <Save className="w-4 h-4 mr-2" />
          Save Why Choose Section
        </Button>
      </Card>
    </div>
  );
}

// FAQ Editor - User-friendly Q&A management
function FaqEditor({ data, onSave, saving }: { data: any; onSave: (data: any) => void; saving: boolean }) {
  const [title, setTitle] = useState(data?.title || "Frequently Asked Questions");
  const [description, setDescription] = useState(data?.description || "Common questions about TrusComp and our services");
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
            <p className="text-sm text-green-700">Answer common questions to build trust</p>
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
              placeholder="Brief description of the FAQ section"
            />
          </div>
        </div>
      </Card>

      {/* FAQ Items */}
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h4 className="text-lg font-semibold">Questions & Answers</h4>
            <p className="text-sm text-muted-foreground">Add common questions your clients ask</p>
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
            <p className="text-muted-foreground mb-4">Start by adding common questions your clients ask</p>
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
                    placeholder="e.g., What services does TrusComp offer?"
                    className="font-medium"
                  />
                  <p className="text-xs text-muted-foreground">Make it clear and specific</p>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Answer *</Label>
                  <Textarea
                    value={item.answer}
                    onChange={(e) => updateFaq(i, "answer", e.target.value)}
                    placeholder="Provide a clear, helpful answer to the question..."
                    rows={4}
                  />
                  <p className="text-xs text-muted-foreground">Be thorough but concise</p>
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

// CTA Editor - User-friendly call-to-action
function CtaEditor({ data, onSave, saving }: { data: any; onSave: (data: any) => void; saving: boolean }) {
  const [formData, setFormData] = useState({
    badge: data?.badge || "Ready to Get Started?",
    title: data?.title || "Let's Transform Your Compliance Journey",
    description: data?.description || "Join hundreds of businesses that trust TrusComp for seamless compliance management.",
    primaryButtonText: data?.primaryButtonText || "Contact Us Today",
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
            <p className="text-sm text-indigo-700">Encourage visitors to take the next step</p>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h4 className="text-lg font-semibold mb-6">CTA Content</h4>
        <div className="space-y-4">
          <div className="grid gap-2">
            <Label>Badge Text</Label>
            <Input 
              placeholder="e.g., Ready to Get Started?" 
              value={formData.badge} 
              onChange={(e) => setFormData({...formData, badge: e.target.value})} 
            />
            <p className="text-xs text-muted-foreground">Small text above the main title</p>
          </div>

          <div className="grid gap-2">
            <Label>Main Title</Label>
            <Input 
              placeholder="e.g., Let's Transform Your Compliance Journey" 
              value={formData.title} 
              onChange={(e) => setFormData({...formData, title: e.target.value})} 
              className="text-lg font-semibold"
            />
            <p className="text-xs text-muted-foreground">Compelling headline that motivates action</p>
          </div>

          <div className="grid gap-2">
            <Label>Description</Label>
            <Textarea 
              placeholder="Join hundreds of businesses that trust TrusComp..." 
              value={formData.description} 
              onChange={(e) => setFormData({...formData, description: e.target.value})} 
              rows={3} 
            />
            <p className="text-xs text-muted-foreground">Supporting text that reinforces the value proposition</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            <div className="space-y-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h5 className="font-medium text-blue-900">Primary Button</h5>
              <div className="space-y-3">
                <div className="grid gap-2">
                  <Label className="text-sm">Button Text</Label>
                  <Input 
                    placeholder="e.g., Contact Us Today" 
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
                    <option value="/about/our-team">Our Team</option>
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
                    <option value="/contact">Contact Page</option>
                    <option value="/about/our-team">Our Team</option>
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
