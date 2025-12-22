"use client";
import Link from "next/link";
import { ArrowLeft, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageContainer, PageHeader } from "@/components/ui/page-components";
import MainAboutEditor from "@/components/dashboard/about/main-about-editor";

export default function MainAboutDashboardPage() {
  return (
    <PageContainer maxWidth="full">
      <PageHeader
        title="Main About Page"
        subtitle="Manage the main about page content, sections, and SEO"
        action={
          <div className="flex gap-2">
            <Link href="/about">
              <Button variant="outline" size="sm">
                <Info className="w-4 h-4 mr-2" />
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
        <MainAboutEditor />
      </div>
    </PageContainer>
  );
}