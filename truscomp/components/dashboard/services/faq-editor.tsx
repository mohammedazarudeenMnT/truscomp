"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FaqSection } from "@/components/ui/faq-section";
import {
  Plus,
  Pencil,
  Trash2,
  Save,
  X,
  Eye,
  EyeOff,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import { axiosInstance } from "@/lib/api";

interface FaqItem {
  question: string;
  answer: string;
}

export default function FaqEditor() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    items: [] as FaqItem[],
  });
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [faqForm, setFaqForm] = useState<FaqItem>({
    question: "",
    answer: "",
  });

  useEffect(() => {
    const fetchFaq = async () => {
      try {
        const response = await axiosInstance.get("/api/services-page-settings");
        if (response.data.success && response.data.data?.faq) {
          setFormData(response.data.data.faq);
        }
      } catch (error) {
        toast.error("Failed to fetch FAQ section");
      } finally {
        setIsLoading(false);
      }
    };
    fetchFaq();
  }, []);

  const handleSave = async () => {
    if (!formData.title || !formData.description) {
      toast.error("Please fill in the title and description");
      return;
    }

    try {
      setIsSaving(true);
      const response = await axiosInstance.put(
        "/api/services-page-settings/faq",
        formData
      );
      if (response.data.success) {
        toast.success("FAQ section updated successfully");
      }
    } catch (error) {
      toast.error("Failed to update FAQ section");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  const handleAddFaq = () => {
    setIsAdding(true);
    setEditingIndex(null);
    setFaqForm({
      question: "",
      answer: "",
    });
  };

  const handleEditFaq = (index: number) => {
    setEditingIndex(index);
    setIsAdding(false);
    setFaqForm(formData.items[index]);
  };

  const handleSaveFaq = () => {
    if (!faqForm.question || !faqForm.answer) {
      toast.error("Please fill in both question and answer");
      return;
    }

    let updatedItems;
    if (isAdding) {
      updatedItems = [...formData.items, faqForm];
    } else if (editingIndex !== null) {
      updatedItems = formData.items.map((item, index) =>
        index === editingIndex ? faqForm : item
      );
    } else {
      return;
    }

    setFormData({ ...formData, items: updatedItems });
    setIsAdding(false);
    setEditingIndex(null);
    setFaqForm({ question: "", answer: "" });
    toast.success(isAdding ? "FAQ added" : "FAQ updated");
  };

  const handleCancelFaq = () => {
    setIsAdding(false);
    setEditingIndex(null);
    setFaqForm({ question: "", answer: "" });
  };

  const handleDeleteFaq = (index: number) => {
    if (confirm("Are you sure you want to delete this FAQ?")) {
      const updatedItems = formData.items.filter((_, i) => i !== index);
      setFormData({ ...formData, items: updatedItems });
      toast.success("FAQ deleted");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">FAQ Section</h3>
          <p className="text-sm text-muted-foreground">
            Manage frequently asked questions about your services
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setShowPreview(!showPreview)}
          >
            {showPreview ? (
              <EyeOff className="w-4 h-4 mr-2" />
            ) : (
              <Eye className="w-4 h-4 mr-2" />
            )}
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
          <CardContent className="p-0">
            <FaqSection
              title={formData.title || "FAQ Title"}
              subtitle=""
              description={formData.description || "FAQ description"}
              faqs={formData.items}
              badge="FAQ'S"
            />
          </CardContent>
        </Card>
      )}

      {/* Section Content */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Section Content</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="faqTitle">Title *</Label>
            <Input
              id="faqTitle"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Frequently Asked Questions"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="faqDescription">Description *</Label>
            <Textarea
              id="faqDescription"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Section description"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* FAQ Items */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-base">
              FAQ Items ({formData.items.length})
            </CardTitle>
            <Button
              onClick={handleAddFaq}
              disabled={isAdding || editingIndex !== null}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add FAQ
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Add/Edit Form */}
          {(isAdding || editingIndex !== null) && (
            <Card className="border-primary/20">
              <CardContent className="p-4 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="faqQuestion">Question *</Label>
                  <Input
                    id="faqQuestion"
                    value={faqForm.question}
                    onChange={(e) =>
                      setFaqForm({ ...faqForm, question: e.target.value })
                    }
                    placeholder="What is your question?"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="faqAnswer">Answer *</Label>
                  <Textarea
                    id="faqAnswer"
                    value={faqForm.answer}
                    onChange={(e) =>
                      setFaqForm({ ...faqForm, answer: e.target.value })
                    }
                    placeholder="Provide a detailed answer"
                    rows={4}
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleSaveFaq}>
                    <Save className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                  <Button variant="outline" onClick={handleCancelFaq}>
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* FAQ List */}
          <div className="space-y-3">
            {formData.items.map((item, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium mb-2">{item.question}</h4>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {item.answer}
                      </p>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditFaq(index)}
                        disabled={isAdding || editingIndex !== null}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteFaq(index)}
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

          {formData.items.length === 0 && !isAdding && (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                  <Plus className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No FAQs yet</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Add your first FAQ to get started
                </p>
                <Button onClick={handleAddFaq}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add FAQ
                </Button>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
