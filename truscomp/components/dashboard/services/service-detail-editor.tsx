"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Check, RefreshCw, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { axiosInstance } from "@/lib/api";
import { IconPicker } from "@/components/ui/icon-picker";
import { ImageUpload } from "@/components/ui/image-upload";
import { Switch } from "@/components/ui/switch";

interface SectionConfig {
  enabled: boolean;
  order: number;
  title?: string;
  subtitle?: string;
  description?: string;
}

interface ServiceDetail {
  _id: string;
  slug: string;
  heroTitle: string;
  heroDescription: string;
  heroImage?: string;
  heroButtonText: string;
  isActive: boolean;
  keyFeatures: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
  benefits: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
  whyChoose: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  cta: {
    badge: string;
    heading: string;
    description: string;
    primaryButtonText: string;
    primaryButtonHref: string;
    secondaryButtonText: string;
    secondaryButtonHref: string;
    isDark: boolean;
  };
  sectionConfig?: {
    keyFeatures: SectionConfig;
    benefits: SectionConfig;
    whyChoose: SectionConfig;
    faqs: SectionConfig;
    cta: SectionConfig;
  };
}

interface ServiceDetailEditorProps {
  serviceId?: string;
  isNew?: boolean;
}

const defaultCta = {
  badge: "Ready to Transform Your Compliance?",
  heading: "",
  description:
    "Join hundreds of businesses that trust TrusComp for seamless, automated labor law compliance management.",
  primaryButtonText: "Get Started Now",
  primaryButtonHref: "/contact",
  secondaryButtonText: "Schedule Consultation",
  secondaryButtonHref: "/contact",
  isDark: true,
};

const defaultSectionConfig = {
  keyFeatures: { enabled: true, order: 1, title: "Key Features", subtitle: "" },
  benefits: { enabled: true, order: 2, title: "Benefits", subtitle: "" },
  whyChoose: { enabled: true, order: 3, title: "Why Choose Us", subtitle: "" },
  faqs: {
    enabled: true,
    order: 4,
    title: "FAQs",
    subtitle: "Common Questions Answered",
    description:
      "Get answers to frequently asked questions about our services and how we can help your business.",
  },
  cta: { enabled: true, order: 5 },
};

export default function ServiceDetailEditor({
  serviceId,
  isNew = false,
}: ServiceDetailEditorProps = {}) {
  const [serviceDetails, setServiceDetails] = useState<ServiceDetail[]>([]);
  const [selectedId, setSelectedId] = useState(serviceId || "");
  const [detail, setDetail] = useState<ServiceDetail | null>(
    isNew
      ? {
          _id: "",
          slug: "",
          heroTitle: "",
          heroDescription: "",
          heroImage: "",
          heroButtonText: "Get Started",
          isActive: true,
          keyFeatures: [],
          benefits: [],
          whyChoose: [],
          faqs: [],
          cta: { ...defaultCta },
          sectionConfig: { ...defaultSectionConfig },
        }
      : null
  );
  const [saved, setSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(!isNew);

  const updateCtaField = (field: string, value: string | boolean) => {
    if (!detail) return;
    setDetail({
      ...detail,
      cta: {
        ...defaultCta,
        ...detail.cta,
        [field]: value,
      },
    });
  };

  useEffect(() => {
    if (isNew) return;

    const fetchServices = async () => {
      try {
        const response = await axiosInstance.get("/api/services");
        if (response.data.success) {
          setServiceDetails(response.data.data);
          if (serviceId) {
            const found = response.data.data.find(
              (d: ServiceDetail) => d._id === serviceId
            );
            if (found) {
              setSelectedId(serviceId);
              setDetail({
                ...found,
                cta: found.cta || { ...defaultCta },
                sectionConfig: found.sectionConfig || {
                  ...defaultSectionConfig,
                },
              });
            }
          } else if (response.data.data.length > 0) {
            const firstService = response.data.data[0];
            setSelectedId(firstService._id);
            setDetail({
              ...firstService,
              cta: firstService.cta || { ...defaultCta },
              sectionConfig: firstService.sectionConfig || {
                ...defaultSectionConfig,
              },
            });
          }
        }
      } catch {
        toast.error("Failed to fetch services");
      } finally {
        setIsLoading(false);
      }
    };
    fetchServices();
  }, [serviceId, isNew]);

  const handleSelectService = (id: string) => {
    setSelectedId(id);
    const found = serviceDetails.find((d) => d._id === id);
    if (found) {
      setDetail({
        ...found,
        cta: found.cta || { ...defaultCta },
        sectionConfig: found.sectionConfig || { ...defaultSectionConfig },
      });
    } else {
      setDetail(null);
    }
  };

  const handleSave = async () => {
    if (!detail) return;

    if (!detail.slug || !detail.heroTitle || !detail.heroDescription) {
      toast.error(
        "Please fill in required fields: slug, title, and description"
      );
      return;
    }

    try {
      if (isNew) {
        const response = await axiosInstance.post("/api/services", detail);
        if (response.data.success) {
          toast.success("Service created successfully");
          window.location.href = "/dashboard/content/services";
        }
      } else {
        const response = await axiosInstance.put(
          `/api/services/${detail._id}`,
          detail
        );
        if (response.data.success) {
          setSaved(true);
          toast.success("Service updated successfully");
          setTimeout(() => setSaved(false), 1000);
        }
      }
    } catch {
      toast.error(
        isNew ? "Failed to create service" : "Failed to update service"
      );
    }
  };

  const handleReset = () => {
    const found = serviceDetails.find((d) => d._id === selectedId);
    if (found) {
      setDetail({
        ...found,
        cta: found.cta || { ...defaultCta },
        sectionConfig: found.sectionConfig || { ...defaultSectionConfig },
      });
    } else {
      setDetail(null);
    }
  };

  const updateSectionConfig = (
    section: keyof NonNullable<ServiceDetail["sectionConfig"]>,
    field: keyof SectionConfig,
    value: boolean | number | string
  ) => {
    if (!detail || !detail.sectionConfig) return;
    setDetail({
      ...detail,
      sectionConfig: {
        ...detail.sectionConfig,
        [section]: {
          ...detail.sectionConfig[section],
          [field]: value,
        },
      },
    });
  };

  if (isLoading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  // Feature management
  const addFeature = (section: "keyFeatures" | "benefits" | "whyChoose") => {
    if (!detail) return;
    setDetail({
      ...detail,
      [section]: [
        ...detail[section],
        {
          icon: "CheckCircle",
          title: "New Item",
          description: "Description here",
        },
      ],
    });
  };

  const updateFeatureItem = (
    section: "keyFeatures" | "benefits" | "whyChoose",
    index: number,
    field: string,
    value: string
  ) => {
    if (!detail) return;
    const newItems = [...detail[section]];
    newItems[index] = { ...newItems[index], [field]: value };
    setDetail({ ...detail, [section]: newItems });
  };

  const deleteFeatureItem = (
    section: "keyFeatures" | "benefits" | "whyChoose",
    index: number
  ) => {
    if (!detail) return;
    setDetail({
      ...detail,
      [section]: detail[section].filter((_, i) => i !== index),
    });
  };

  // FAQ management
  const addFaq = () => {
    if (!detail) return;
    setDetail({
      ...detail,
      faqs: [
        ...detail.faqs,
        { question: "New Question?", answer: "Answer here" },
      ],
    });
  };

  const updateFaqItem = (index: number, field: string, value: string) => {
    if (!detail) return;
    const newFaqs = [...detail.faqs];
    newFaqs[index] = { ...newFaqs[index], [field]: value };
    setDetail({ ...detail, faqs: newFaqs });
  };

  const deleteFaqItem = (index: number) => {
    if (!detail) return;
    setDetail({
      ...detail,
      faqs: detail.faqs.filter((_, i) => i !== index),
    });
  };

  if (!detail) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No service details available</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="hero" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="hero">Hero</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="benefits">Benefits</TabsTrigger>
          <TabsTrigger value="why">Why Choose</TabsTrigger>
          <TabsTrigger value="cta">CTA</TabsTrigger>
          <TabsTrigger value="faqs">FAQs</TabsTrigger>
        </TabsList>

        <TabsContent value="hero" className="space-y-4 mt-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Hero Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input
                    value={detail.heroTitle}
                    onChange={(e) =>
                      setDetail({ ...detail, heroTitle: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    value={detail.heroDescription}
                    onChange={(e) =>
                      setDetail({ ...detail, heroDescription: e.target.value })
                    }
                    rows={4}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Button Text</Label>
                  <Input
                    value={detail.heroButtonText}
                    onChange={(e) =>
                      setDetail({ ...detail, heroButtonText: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Slug</Label>
                  <Input
                    value={detail.slug}
                    onChange={(e) =>
                      setDetail({ ...detail, slug: e.target.value })
                    }
                  />
                </div>
                <div className="flex items-center gap-2 pt-2">
                  <Switch
                    id="isActive"
                    checked={detail.isActive}
                    onCheckedChange={(checked) =>
                      setDetail({ ...detail, isActive: checked })
                    }
                  />
                  <Label htmlFor="isActive" className="cursor-pointer">
                    Active (visible on website)
                  </Label>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Hero Image</CardTitle>
              </CardHeader>
              <CardContent>
                <ImageUpload
                  label="Hero Image"
                  value={detail.heroImage}
                  onChange={(value) =>
                    setDetail({ ...detail, heroImage: value || "" })
                  }
                  aspectRatio="wide"
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="features" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Section Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/30">
                <div className="flex items-center gap-3">
                  <Switch
                    checked={detail.sectionConfig?.keyFeatures.enabled}
                    onCheckedChange={(checked) =>
                      updateSectionConfig("keyFeatures", "enabled", checked)
                    }
                  />
                  <div>
                    <Label className="text-base font-semibold">
                      Show on Page
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      {detail.sectionConfig?.keyFeatures.enabled
                        ? "Section is visible"
                        : "Section is hidden"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Label className="text-sm">Display Order:</Label>
                  <Input
                    type="number"
                    min="1"
                    max="5"
                    value={detail.sectionConfig?.keyFeatures.order}
                    onChange={(e) =>
                      updateSectionConfig(
                        "keyFeatures",
                        "order",
                        parseInt(e.target.value) || 1
                      )
                    }
                    className="w-20"
                  />
                </div>
              </div>
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label>Section Title</Label>
                  <Input
                    value={detail.sectionConfig?.keyFeatures.title}
                    onChange={(e) =>
                      updateSectionConfig(
                        "keyFeatures",
                        "title",
                        e.target.value
                      )
                    }
                    placeholder="Key Features"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Section Subtitle (optional)</Label>
                  <Input
                    value={detail.sectionConfig?.keyFeatures.subtitle}
                    onChange={(e) =>
                      updateSectionConfig(
                        "keyFeatures",
                        "subtitle",
                        e.target.value
                      )
                    }
                    placeholder="Optional subtitle"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button onClick={() => addFeature("keyFeatures")}>
              <Plus className="mr-2 h-4 w-4" />
              Add Feature
            </Button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {detail.keyFeatures.map((feature, index) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">
                      Feature {index + 1}
                    </CardTitle>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive"
                      onClick={() => deleteFeatureItem("keyFeatures", index)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <IconPicker
                    value={feature.icon}
                    onChange={(value) =>
                      updateFeatureItem("keyFeatures", index, "icon", value)
                    }
                  />
                  <Input
                    value={feature.title}
                    onChange={(e) =>
                      updateFeatureItem(
                        "keyFeatures",
                        index,
                        "title",
                        e.target.value
                      )
                    }
                    placeholder="Title"
                  />
                  <Textarea
                    value={feature.description}
                    onChange={(e) =>
                      updateFeatureItem(
                        "keyFeatures",
                        index,
                        "description",
                        e.target.value
                      )
                    }
                    placeholder="Description"
                    rows={2}
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="benefits" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Section Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/30">
                <div className="flex items-center gap-3">
                  <Switch
                    checked={detail.sectionConfig?.benefits.enabled}
                    onCheckedChange={(checked) =>
                      updateSectionConfig("benefits", "enabled", checked)
                    }
                  />
                  <div>
                    <Label className="text-base font-semibold">
                      Show on Page
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      {detail.sectionConfig?.benefits.enabled
                        ? "Section is visible"
                        : "Section is hidden"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Label className="text-sm">Display Order:</Label>
                  <Input
                    type="number"
                    min="1"
                    max="5"
                    value={detail.sectionConfig?.benefits.order}
                    onChange={(e) =>
                      updateSectionConfig(
                        "benefits",
                        "order",
                        parseInt(e.target.value) || 2
                      )
                    }
                    className="w-20"
                  />
                </div>
              </div>
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label>Section Title</Label>
                  <Input
                    value={detail.sectionConfig?.benefits.title}
                    onChange={(e) =>
                      updateSectionConfig("benefits", "title", e.target.value)
                    }
                    placeholder="Benefits"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Section Subtitle (optional)</Label>
                  <Input
                    value={detail.sectionConfig?.benefits.subtitle}
                    onChange={(e) =>
                      updateSectionConfig(
                        "benefits",
                        "subtitle",
                        e.target.value
                      )
                    }
                    placeholder="Optional subtitle"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button onClick={() => addFeature("benefits")}>
              <Plus className="mr-2 h-4 w-4" />
              Add Benefit
            </Button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {detail.benefits.map((benefit, index) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">
                      Benefit {index + 1}
                    </CardTitle>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive"
                      onClick={() => deleteFeatureItem("benefits", index)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <IconPicker
                    value={benefit.icon}
                    onChange={(value) =>
                      updateFeatureItem("benefits", index, "icon", value)
                    }
                  />
                  <Input
                    value={benefit.title}
                    onChange={(e) =>
                      updateFeatureItem(
                        "benefits",
                        index,
                        "title",
                        e.target.value
                      )
                    }
                    placeholder="Title"
                  />
                  <Textarea
                    value={benefit.description}
                    onChange={(e) =>
                      updateFeatureItem(
                        "benefits",
                        index,
                        "description",
                        e.target.value
                      )
                    }
                    placeholder="Description"
                    rows={2}
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="why" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Section Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/30">
                <div className="flex items-center gap-3">
                  <Switch
                    checked={detail.sectionConfig?.whyChoose.enabled}
                    onCheckedChange={(checked) =>
                      updateSectionConfig("whyChoose", "enabled", checked)
                    }
                  />
                  <div>
                    <Label className="text-base font-semibold">
                      Show on Page
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      {detail.sectionConfig?.whyChoose.enabled
                        ? "Section is visible"
                        : "Section is hidden"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Label className="text-sm">Display Order:</Label>
                  <Input
                    type="number"
                    min="1"
                    max="5"
                    value={detail.sectionConfig?.whyChoose.order}
                    onChange={(e) =>
                      updateSectionConfig(
                        "whyChoose",
                        "order",
                        parseInt(e.target.value) || 3
                      )
                    }
                    className="w-20"
                  />
                </div>
              </div>
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label>Section Title</Label>
                  <Input
                    value={detail.sectionConfig?.whyChoose.title}
                    onChange={(e) =>
                      updateSectionConfig("whyChoose", "title", e.target.value)
                    }
                    placeholder="Why Choose Us"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Section Subtitle (optional)</Label>
                  <Input
                    value={detail.sectionConfig?.whyChoose.subtitle}
                    onChange={(e) =>
                      updateSectionConfig(
                        "whyChoose",
                        "subtitle",
                        e.target.value
                      )
                    }
                    placeholder="Optional subtitle"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button onClick={() => addFeature("whyChoose")}>
              <Plus className="mr-2 h-4 w-4" />
              Add Reason
            </Button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {detail.whyChoose.map((reason, index) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">
                      Reason {index + 1}
                    </CardTitle>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive"
                      onClick={() => deleteFeatureItem("whyChoose", index)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <IconPicker
                    value={reason.icon}
                    onChange={(value) =>
                      updateFeatureItem("whyChoose", index, "icon", value)
                    }
                  />
                  <Input
                    value={reason.title}
                    onChange={(e) =>
                      updateFeatureItem(
                        "whyChoose",
                        index,
                        "title",
                        e.target.value
                      )
                    }
                    placeholder="Title"
                  />
                  <Textarea
                    value={reason.description}
                    onChange={(e) =>
                      updateFeatureItem(
                        "whyChoose",
                        index,
                        "description",
                        e.target.value
                      )
                    }
                    placeholder="Description"
                    rows={2}
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="cta" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Section Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/30">
                <div className="flex items-center gap-3">
                  <Switch
                    checked={detail.sectionConfig?.cta.enabled}
                    onCheckedChange={(checked) =>
                      updateSectionConfig("cta", "enabled", checked)
                    }
                  />
                  <div>
                    <Label className="text-base font-semibold">
                      Show on Page
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      {detail.sectionConfig?.cta.enabled
                        ? "Section is visible"
                        : "Section is hidden"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Label className="text-sm">Display Order:</Label>
                  <Input
                    type="number"
                    min="1"
                    max="5"
                    value={detail.sectionConfig?.cta.order}
                    onChange={(e) =>
                      updateSectionConfig(
                        "cta",
                        "order",
                        parseInt(e.target.value) || 5
                      )
                    }
                    className="w-20"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Call-to-Action Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid lg:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Badge Text</Label>
                  <Input
                    value={detail.cta?.badge || ""}
                    onChange={(e) => updateCtaField("badge", e.target.value)}
                    placeholder="Ready to Transform Your Compliance?"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Heading</Label>
                  <Input
                    value={detail.cta?.heading || ""}
                    onChange={(e) => updateCtaField("heading", e.target.value)}
                    placeholder="Start Your Journey Today"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={detail.cta?.description || ""}
                  onChange={(e) =>
                    updateCtaField("description", e.target.value)
                  }
                  placeholder="Join hundreds of businesses..."
                  rows={3}
                />
              </div>
              <div className="grid lg:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Primary Button Text</Label>
                  <Input
                    value={detail.cta?.primaryButtonText || ""}
                    onChange={(e) =>
                      updateCtaField("primaryButtonText", e.target.value)
                    }
                    placeholder="Get Started Now"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Primary Button Link</Label>
                  <Input
                    value={detail.cta?.primaryButtonHref || ""}
                    onChange={(e) =>
                      updateCtaField("primaryButtonHref", e.target.value)
                    }
                    placeholder="/contact"
                  />
                </div>
              </div>
              <div className="grid lg:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Secondary Button Text</Label>
                  <Input
                    value={detail.cta?.secondaryButtonText || ""}
                    onChange={(e) =>
                      updateCtaField("secondaryButtonText", e.target.value)
                    }
                    placeholder="Schedule Consultation"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Secondary Button Link</Label>
                  <Input
                    value={detail.cta?.secondaryButtonHref || ""}
                    onChange={(e) =>
                      updateCtaField("secondaryButtonHref", e.target.value)
                    }
                    placeholder="/contact"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  id="isDark"
                  checked={
                    detail.cta?.isDark !== undefined ? detail.cta.isDark : true
                  }
                  onCheckedChange={(checked) =>
                    updateCtaField("isDark", checked)
                  }
                />
                <Label htmlFor="isDark">Use Dark Background</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="faqs" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Section Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/30">
                <div className="flex items-center gap-3">
                  <Switch
                    checked={detail.sectionConfig?.faqs.enabled}
                    onCheckedChange={(checked) =>
                      updateSectionConfig("faqs", "enabled", checked)
                    }
                  />
                  <div>
                    <Label className="text-base font-semibold">
                      Show on Page
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      {detail.sectionConfig?.faqs.enabled
                        ? "Section is visible"
                        : "Section is hidden"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Label className="text-sm">Display Order:</Label>
                  <Input
                    type="number"
                    min="1"
                    max="5"
                    value={detail.sectionConfig?.faqs.order}
                    onChange={(e) =>
                      updateSectionConfig(
                        "faqs",
                        "order",
                        parseInt(e.target.value) || 4
                      )
                    }
                    className="w-20"
                  />
                </div>
              </div>
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label>Section Title</Label>
                  <Input
                    value={detail.sectionConfig?.faqs.title}
                    onChange={(e) =>
                      updateSectionConfig("faqs", "title", e.target.value)
                    }
                    placeholder="FAQs"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Section Subtitle (optional)</Label>
                  <Input
                    value={detail.sectionConfig?.faqs.subtitle}
                    onChange={(e) =>
                      updateSectionConfig("faqs", "subtitle", e.target.value)
                    }
                    placeholder="Common Questions Answered"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Section Description (optional)</Label>
                  <Textarea
                    value={detail.sectionConfig?.faqs.description}
                    onChange={(e) =>
                      updateSectionConfig("faqs", "description", e.target.value)
                    }
                    placeholder="Get answers to frequently asked questions..."
                    rows={2}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button onClick={addFaq}>
              <Plus className="mr-2 h-4 w-4" />
              Add FAQ
            </Button>
          </div>
          <div className="space-y-4">
            {detail.faqs.map((faq, index) => (
              <Card key={index}>
                <CardContent className="pt-4">
                  <div className="flex items-start gap-4">
                    <div className="flex-1 space-y-3">
                      <Input
                        value={faq.question}
                        onChange={(e) =>
                          updateFaqItem(index, "question", e.target.value)
                        }
                        placeholder="Question"
                      />
                      <Textarea
                        value={faq.answer}
                        onChange={(e) =>
                          updateFaqItem(index, "answer", e.target.value)
                        }
                        placeholder="Answer"
                        rows={2}
                      />
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive shrink-0"
                      onClick={() => deleteFaqItem(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex items-center gap-4">
        <Button onClick={handleSave} className="min-w-32">
          {saved ? (
            <>
              <Check className="mr-2 h-4 w-4" />
              Saved!
            </>
          ) : (
            "Save Changes"
          )}
        </Button>
        <Button variant="outline" onClick={handleReset}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Reset
        </Button>
      </div>
    </div>
  );
}
