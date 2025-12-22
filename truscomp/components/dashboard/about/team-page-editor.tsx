"use client";

import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "@/components/ui/image-upload";
import { Plus, Trash2, Loader2, Save, Users, Award, Target, HelpCircle, Sparkles, Image as ImageIcon, Briefcase } from "lucide-react";
import { toast } from "sonner";
import { axiosInstance } from "@/lib/api";
import PageSEOEditor from "@/components/dashboard/page-seo-editor";

export default function TeamPageEditor() {
  const [data, setData] = useState<{
    hero?: any;
    founders?: any;
    leadership?: any;
    legacy?: any;
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
      if (["hero", "founders", "leadership", "legacy", "faq", "cta", "seo"].includes(hash)) {
        setActiveTab(hash);
      }
    }
  }, []);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get("/api/about-page-settings/our-team");
      if (response.data.success) {
        setData(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load team page data");
    } finally {
      setLoading(false);
    }
  };

  const saveSection = async (section: string, sectionData: any) => {
    setSaving(true);
    try {
      const response = await axiosInstance.put(`/api/about-page-settings/our-team/${section}`, sectionData);
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
            <h3 className="font-semibold text-blue-900">Our Team Page Overview</h3>
            <p className="text-sm text-blue-700">Manage your team members, leadership, and company culture</p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="bg-white/60 p-3 rounded-lg">
            <div className="font-medium text-gray-900">Hero Section</div>
            <div className="text-gray-600">Main introduction</div>
          </div>
          <div className="bg-white/60 p-3 rounded-lg">
            <div className="font-medium text-gray-900">Founders</div>
            <div className="text-gray-600">{data?.founders?.members?.length || 0} founders</div>
          </div>
          <div className="bg-white/60 p-3 rounded-lg">
            <div className="font-medium text-gray-900">Leadership</div>
            <div className="text-gray-600">{data?.leadership?.members?.length || 0} leaders</div>
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
          <TabsTrigger value="founders" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Founders
          </TabsTrigger>
          <TabsTrigger value="leadership" className="flex items-center gap-2">
            <Briefcase className="w-4 h-4" />
            Leadership
          </TabsTrigger>
          <TabsTrigger value="legacy" className="flex items-center gap-2">
            <Award className="w-4 h-4" />
            Legacy
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

        <TabsContent value="leadership">
          <LeadershipEditor data={data.leadership} onSave={(sectionData: any) => saveSection("leadership", sectionData)} saving={saving} />
        </TabsContent>

        <TabsContent value="legacy">
          <LegacyEditor data={data.legacy} onSave={(sectionData: any) => saveSection("legacy", sectionData)} saving={saving} />
        </TabsContent>

        <TabsContent value="faq">
          <FaqEditor data={data.faq} onSave={(sectionData: any) => saveSection("faq", sectionData)} saving={saving} />
        </TabsContent>

        <TabsContent value="cta">
          <CtaEditor data={data.cta} onSave={(sectionData: any) => saveSection("cta", sectionData)} saving={saving} />
        </TabsContent>

        <TabsContent value="seo">
          <PageSEOEditor pageKey="our-team" pageName="Our Team" />
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Hero Editor
function HeroEditor({ data, onSave, saving }: { data: any; onSave: (data: any) => void; saving: boolean }) {
  const [formData, setFormData] = useState({
    subheading: data?.subheading || "Meet Our Team",
    heading: data?.heading || "The Team Behind TrusComp",
    description: data?.description || "At TrusComp, our team is the driving force behind our mission to simplify compliance and deliver transformative solutions.",
    backgroundImage: data?.backgroundImage || "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=2000&h=1200&fit=crop",
    primaryButtonText: data?.primaryButtonText || "Schedule a Call",
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
            <p className="text-sm text-green-700">The first impression - introduce your amazing team!</p>
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
                  placeholder="e.g., Meet Our Team"
                />
              </div>

              <div className="grid gap-2">
                <Label>Main Heading</Label>
                <Input 
                  value={formData.heading} 
                  onChange={(e) => setFormData({...formData, heading: e.target.value})}
                  placeholder="e.g., The Team Behind TrusComp"
                  className="text-lg font-semibold"
                />
              </div>

              <div className="grid gap-2">
                <Label>Description</Label>
                <Textarea 
                  value={formData.description} 
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Describe your team and what makes them special..."
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
                      <option value="/careers">Careers Page</option>
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
                <p>• Team photo or office image</p>
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

// Founders Editor
function FoundersEditor({ data, onSave, saving }: { data: any; onSave: (data: any) => void; saving: boolean }) {
  const [title, setTitle] = useState(data?.title || "Our Founders");
  const [subtitle, setSubtitle] = useState(data?.subtitle || "Meet the visionary leaders driving TrusComp's success");
  const [members, setMembers] = useState(data?.members || []);

  const addMember = () => {
    setMembers([...members, { 
      name: "", 
      title: "", 
      bio: "", 
      image: "", 
      linkedin: "" 
    }]);
  };

  const removeMember = (index: number) => {
    setMembers(members.filter((_: any, i: number) => i !== index));
  };

  const updateMember = (index: number, field: string, value: string) => {
    const updated = [...members];
    updated[index] = { ...updated[index], [field]: value };
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
            <h3 className="font-semibold text-purple-900">Founders Section</h3>
            <p className="text-sm text-purple-700">Showcase your company founders and their vision</p>
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
              placeholder="e.g., Our Founders"
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

      {/* Founders */}
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h4 className="text-lg font-semibold">Founders</h4>
            <p className="text-sm text-muted-foreground">Add your company founders with detailed bios</p>
          </div>
          <Button onClick={addMember} className="bg-purple-600 hover:bg-purple-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Founder
          </Button>
        </div>

        {members.length === 0 && (
          <div className="text-center py-12 bg-muted/50 rounded-lg border-2 border-dashed">
            <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No founders added yet</h3>
            <p className="text-muted-foreground mb-4">Start by adding your company founders</p>
            <Button onClick={addMember} variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Founder
            </Button>
          </div>
        )}

        <div className="space-y-6">
          {members.map((member: any, i: number) => (
            <Card key={i} className="p-6 border-l-4 border-l-purple-500">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h5 className="font-semibold text-lg">Founder {i + 1}</h5>
                  <p className="text-sm text-muted-foreground">{member.name || 'Unnamed founder'}</p>
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
                <div className="lg:col-span-2 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Full Name *</Label>
                      <Input
                        value={member.name}
                        onChange={(e) => updateMember(i, "name", e.target.value)}
                        placeholder="e.g., Mr. John Smith"
                        className="font-medium"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Title/Role *</Label>
                      <Input
                        value={member.title}
                        onChange={(e) => updateMember(i, "title", e.target.value)}
                        placeholder="e.g., Founder, Co-Founder"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Biography *</Label>
                    <Textarea
                      value={member.bio}
                      onChange={(e) => updateMember(i, "bio", e.target.value)}
                      placeholder="Write a detailed biography highlighting their experience, achievements, and role..."
                      rows={6}
                      className="text-sm"
                    />
                    <p className="text-xs text-muted-foreground">Include their background, expertise, and contributions to the company</p>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">LinkedIn Profile</Label>
                    <Input
                      value={member.linkedin}
                      onChange={(e) => updateMember(i, "linkedin", e.target.value)}
                      placeholder="https://linkedin.com/in/username"
                      type="url"
                    />
                  </div>
                </div>

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
                      <p>• Professional headshot</p>
                      <p>• Square format (400x400px)</p>
                      <p>• High quality image</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Card>

      {/* Save Button */}
      <Card className="p-4">
        <Button onClick={() => onSave({ title, subtitle, members })} disabled={saving} className="w-full h-12 text-lg">
          {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          <Save className="w-4 h-4 mr-2" />
          Save Founders Section
        </Button>
      </Card>
    </div>
  );
}

// Leadership Editor
function LeadershipEditor({ data, onSave, saving }: { data: any; onSave: (data: any) => void; saving: boolean }) {
  const [title, setTitle] = useState(data?.title || "Our Leadership Team");
  const [subtitle, setSubtitle] = useState(data?.subtitle || "Experienced professionals driving excellence in compliance management");
  const [badge, setBadge] = useState(data?.badge || "Leadership");
  const [members, setMembers] = useState(data?.members || []);

  const addMember = () => {
    setMembers([...members, { 
      name: "", 
      role: "", 
      bio: "", 
      image: "" 
    }]);
  };

  const removeMember = (index: number) => {
    setMembers(members.filter((_: any, i: number) => i !== index));
  };

  const updateMember = (index: number, field: string, value: string) => {
    const updated = [...members];
    updated[index] = { ...updated[index], [field]: value };
    setMembers(updated);
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <Card className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Briefcase className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-blue-900">Leadership Team Section</h3>
            <p className="text-sm text-blue-700">Showcase your leadership and management team</p>
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
              placeholder="e.g., Leadership"
            />
          </div>
          <div className="space-y-2">
            <Label>Section Title</Label>
            <Input 
              value={title} 
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Our Leadership Team"
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

      {/* Leadership Members */}
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h4 className="text-lg font-semibold">Leadership Members</h4>
            <p className="text-sm text-muted-foreground">Add your leadership and management team</p>
          </div>
          <Button onClick={addMember} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Leader
          </Button>
        </div>

        {members.length === 0 && (
          <div className="text-center py-12 bg-muted/50 rounded-lg border-2 border-dashed">
            <Briefcase className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No leadership members added yet</h3>
            <p className="text-muted-foreground mb-4">Start by adding your leadership team</p>
            <Button onClick={addMember} variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Leader
            </Button>
          </div>
        )}

        <div className="space-y-6">
          {members.map((member: any, i: number) => (
            <Card key={i} className="p-6 border-l-4 border-l-blue-500">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h5 className="font-semibold text-lg">Leader {i + 1}</h5>
                  <p className="text-sm text-muted-foreground">{member.name || 'Unnamed leader'}</p>
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
                <div className="lg:col-span-2 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Full Name *</Label>
                      <Input
                        value={member.name}
                        onChange={(e) => updateMember(i, "name", e.target.value)}
                        placeholder="e.g., Mr. John Smith"
                        className="font-medium"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Role/Position *</Label>
                      <Input
                        value={member.role}
                        onChange={(e) => updateMember(i, "role", e.target.value)}
                        placeholder="e.g., Chief Operating Officer"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Biography *</Label>
                    <Textarea
                      value={member.bio}
                      onChange={(e) => updateMember(i, "bio", e.target.value)}
                      placeholder="Write a biography highlighting their experience and expertise..."
                      rows={4}
                      className="text-sm"
                    />
                  </div>
                </div>

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
                      <p>• Professional headshot</p>
                      <p>• Square format (300x300px)</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Card>

      {/* Save Button */}
      <Card className="p-4">
        <Button onClick={() => onSave({ badge, title, subtitle, members })} disabled={saving} className="w-full h-12 text-lg">
          {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          <Save className="w-4 h-4 mr-2" />
          Save Leadership Section
        </Button>
      </Card>
    </div>
  );
}

// Legacy Editor
function LegacyEditor({ data, onSave, saving }: { data: any; onSave: (data: any) => void; saving: boolean }) {
  const [formData, setFormData] = useState({
    title: data?.title || "A Legacy of Excellence",
    description: data?.description || "With a legacy of excellence and a team of seasoned leaders, TrusComp delivers unmatched service and expertise.",
    buttonText: data?.buttonText || "Join Our Team",
    buttonLink: data?.buttonLink || "/careers",
    highlights: data?.highlights || [
      "50+ Years Combined Experience",
      "Industry-Leading Expertise",
      "Innovative Solutions",
      "Client-Focused Approach",
      "Proven Track Record"
    ]
  });

  const updateHighlight = (index: number, value: string) => {
    const updated = [...formData.highlights];
    updated[index] = value;
    setFormData({...formData, highlights: updated});
  };

  const addHighlight = () => {
    setFormData({...formData, highlights: [...formData.highlights, ""]});
  };

  const removeHighlight = (index: number) => {
    setFormData({...formData, highlights: formData.highlights.filter((_: string, i: number) => i !== index)});
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
            <h3 className="font-semibold text-orange-900">Legacy Section</h3>
            <p className="text-sm text-orange-700">Highlight your company's achievements and invite people to join</p>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h4 className="text-lg font-semibold mb-6">Legacy Content</h4>
        <div className="space-y-4">
          <div className="grid gap-2">
            <Label>Section Title</Label>
            <Input 
              value={formData.title} 
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              placeholder="e.g., A Legacy of Excellence"
              className="text-lg font-semibold"
            />
          </div>

          <div className="grid gap-2">
            <Label>Description</Label>
            <Textarea 
              value={formData.description} 
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Describe your company's legacy and achievements..."
              rows={4}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>Button Text</Label>
              <Input 
                value={formData.buttonText} 
                onChange={(e) => setFormData({...formData, buttonText: e.target.value})}
                placeholder="e.g., Join Our Team"
              />
            </div>
            <div className="grid gap-2">
              <Label>Button Link</Label>
              <select 
                value={formData.buttonLink} 
                onChange={(e) => setFormData({...formData, buttonLink: e.target.value})}
                className="p-2 border rounded-md bg-white"
              >
                <option value="/careers">Careers Page</option>
                <option value="/contact">Contact Page</option>
                <option value="/about">About Page</option>
              </select>
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <div className="flex justify-between items-center">
              <Label>Key Highlights</Label>
              <Button onClick={addHighlight} size="sm" variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Add Highlight
              </Button>
            </div>
            <div className="space-y-3">
              {formData.highlights.map((highlight: string, i: number) => (
                <div key={i} className="flex gap-2">
                  <Input
                    value={highlight}
                    onChange={(e) => updateHighlight(i, e.target.value)}
                    placeholder="e.g., 50+ Years Combined Experience"
                  />
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => removeHighlight(i)}
                    className="text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">These appear as checkmark bullet points</p>
          </div>
        </div>
      </Card>

      {/* Save Button */}
      <Card className="p-4">
        <Button onClick={() => onSave(formData)} disabled={saving} className="w-full h-12 text-lg">
          {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          <Save className="w-4 h-4 mr-2" />
          Save Legacy Section
        </Button>
      </Card>
    </div>
  );
}

// FAQ Editor
function FaqEditor({ data, onSave, saving }: { data: any; onSave: (data: any) => void; saving: boolean }) {
  const [title, setTitle] = useState(data?.title || "Frequently Asked Questions");
  const [description, setDescription] = useState(data?.description || "Common questions about our team and company");
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
            <p className="text-sm text-green-700">Answer common questions about your team</p>
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
            <p className="text-sm text-muted-foreground">Add common questions about your team</p>
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
                    placeholder="e.g., How experienced is the TrusComp team?"
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
    title: data?.title || "Ready to Work With Us?",
    description: data?.description || "Join our team of compliance experts and be part of transforming how businesses approach regulatory challenges.",
    primaryButtonText: data?.primaryButtonText || "View Careers",
    primaryButtonLink: data?.primaryButtonLink || "/careers",
    secondaryButtonText: data?.secondaryButtonText || "Contact Us",
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
              placeholder="e.g., Ready to Work With Us?" 
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
                    placeholder="e.g., View Careers" 
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
                    <option value="/careers">Careers Page</option>
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
                    placeholder="e.g., Contact Us" 
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
