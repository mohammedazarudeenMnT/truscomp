"use client";

import { PageContainer, PageHeader } from "@/components/ui/page-components";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ImageIcon, HelpCircle, MessageSquare, Search } from "lucide-react";
import HeroEditor from "@/components/dashboard/services/hero-editor";
import WhySectionEditor from "@/components/dashboard/services/why-section-editor";
import FaqEditor from "@/components/dashboard/services/faq-editor";
import PageSEOEditor from "@/components/dashboard/page-seo-editor";

export default function ServicesPageSettings() {
  return (
    <PageContainer maxWidth="full">
      <PageHeader
        title="Services Page Settings"
        subtitle="Configure hero section, why choose section, FAQ, and SEO"
      />
      
      <Tabs defaultValue="hero" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="hero" className="flex items-center gap-2">
            <ImageIcon className="w-4 h-4" />
            Hero Section
          </TabsTrigger>
          <TabsTrigger value="why" className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            Why Section
          </TabsTrigger>
          <TabsTrigger value="faq" className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4" />
            FAQ
          </TabsTrigger>
          <TabsTrigger value="seo" className="flex items-center gap-2">
            <Search className="w-4 h-4" />
            SEO
          </TabsTrigger>
        </TabsList>

        <TabsContent value="hero" className="space-y-6">
          <HeroEditor />
        </TabsContent>

        <TabsContent value="why" className="space-y-6">
          <WhySectionEditor />
        </TabsContent>

        <TabsContent value="faq" className="space-y-6">
          <FaqEditor />
        </TabsContent>

        <TabsContent value="seo" className="space-y-6">
          <PageSEOEditor pageKey="services-listing" pageName="Services Listing Page" />
        </TabsContent>
      </Tabs>
    </PageContainer>
  );
}