"use client";
import Link from "next/link";
import { ArrowLeft, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageContainer, PageHeader } from "@/components/ui/page-components";
import VisionMissionEditor from "@/components/dashboard/about/vision-mission-editor";

export default function VisionMissionDashboardPage() {
  return (
    <PageContainer maxWidth="full">
      <PageHeader
        title="Vision, Mission & Values Page"
        subtitle="Manage company vision, mission statement, and core values"
        action={
          <div className="flex gap-2">
            <Link href="/about/vision-mission-and-core-values">
              <Button variant="outline" size="sm">
                <Target className="w-4 h-4 mr-2" />
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
        <VisionMissionEditor />
      </div>
    </PageContainer>
  );
}