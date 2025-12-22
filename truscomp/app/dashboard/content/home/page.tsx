"use client";
import Link from "next/link";
import { Settings2, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageContainer, PageHeader } from "@/components/ui/page-components";
import HomePageEditor from "@/components/dashboard/home/home-page-editor";

export default function HomeDashboardPage() {
  return (
    <PageContainer maxWidth="full">
      <PageHeader
        title="Home Page Management"
        subtitle="Manage your home page content, sections, and settings"
        action={
          <div className="flex gap-2">
            <Link href="/">
              <Button variant="outline" size="sm">
                <Home className="w-4 h-4 mr-2" />
                View Home Page
              </Button>
            </Link>
            <Link href="/dashboard/content/home#seo">
              <Button variant="outline" size="sm">
                <Settings2 className="w-4 h-4 mr-2" />
                SEO Settings
              </Button>
            </Link>
          </div>
        }
      />

      <div className="space-y-6">
        <HomePageEditor />
      </div>
    </PageContainer>
  );
}