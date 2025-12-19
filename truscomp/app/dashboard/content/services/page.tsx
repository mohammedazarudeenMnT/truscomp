"use client";
import Link from "next/link";
import { Settings2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageContainer, PageHeader } from "@/components/ui/page-components";
import ServicesListEditor from "@/components/dashboard/services/services-list-editor";

export default function ServicesDashboardPage() {
  return (
    <PageContainer maxWidth="full">
      <PageHeader
        title="Services Management"
        subtitle="Create and manage your service offerings and page content"
        action={
          <div className="flex gap-2">
            <Link href="/dashboard/content/services/page">
              <Button variant="outline" size="sm">
                <Settings2 className="w-4 h-4 mr-2" />
                Page Settings
              </Button>
            </Link>
            <Link href="/dashboard/content/services/new">
              <Button size="sm" className="bg-primary hover:bg-primary/90">
                <Plus className="w-4 h-4 mr-2" />
                Add Service Detail
              </Button>
            </Link>
          </div>
        }
      />

      <div className="space-y-6">
        <ServicesListEditor />
      </div>
    </PageContainer>
  );
}
