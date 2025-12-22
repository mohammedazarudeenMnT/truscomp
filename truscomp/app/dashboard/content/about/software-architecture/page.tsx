"use client";
import Link from "next/link";
import { ArrowLeft, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageContainer, PageHeader } from "@/components/ui/page-components";
import SoftwareArchitectureEditor from "@/components/dashboard/about/software-architecture-editor";

export default function SoftwareArchitectureDashboardPage() {
  return (
    <PageContainer maxWidth="full">
      <PageHeader
        title="Software Architecture Page"
        subtitle="Manage technology content, architecture details, and technical sections"
        action={
          <div className="flex gap-2">
            <Link href="/about/software-architecture-the-engine-behind-our-solution">
              <Button variant="outline" size="sm">
                <Code className="w-4 h-4 mr-2" />
                View Page
              </Button>
            </Link>
            <Link href="/dashboard/content/about">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to About Pages
              </Button>
            </Link>
          </div>
        }
      />

      <div className="space-y-6">
        <SoftwareArchitectureEditor />
      </div>
    </PageContainer>
  );
}