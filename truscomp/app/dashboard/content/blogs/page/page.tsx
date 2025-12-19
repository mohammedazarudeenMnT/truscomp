"use client";

import { PageContainer, PageHeader } from "@/components/ui/page-components";
import PageSEOEditor from "@/components/dashboard/page-seo-editor";

export default function BlogPageSettings() {
  return (
    <PageContainer maxWidth="full">
      <PageHeader
        title="Blog Page Settings"
        subtitle="Configure SEO settings for the main blog listing page"
      />
      
      <PageSEOEditor pageKey="blog-listing" pageName="Blog Listing Page" />
    </PageContainer>
  );
}
