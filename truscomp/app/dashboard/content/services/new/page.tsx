"use client";

import { PageContainer, PageHeader } from "@/components/ui/page-components";
import ServiceDetailEditor from "@/components/dashboard/services/service-detail-editor";

export default function NewServicePage() {
  return (
    <PageContainer maxWidth="full">
      <PageHeader
        title="Create Service Detail"
        subtitle="Create detailed service pages with features, benefits, and FAQs"
      />

      <ServiceDetailEditor isNew={true} />
    </PageContainer>
  );
}
