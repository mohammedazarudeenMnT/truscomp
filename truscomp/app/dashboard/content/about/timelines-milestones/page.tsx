"use client";
import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageContainer, PageHeader } from "@/components/ui/page-components";
import TimelinePageEditor from "@/components/dashboard/about/timeline-page-editor";

export default function TimelinesMilestonesDashboardPage() {
  return (
    <PageContainer maxWidth="full">
      <PageHeader
        title="Timelines & Milestones Page"
        subtitle="Manage project phases, implementation timeline, and milestone content"
        action={
          <div className="flex gap-2">
            <Link href="/about/timelines-and-milestones">
              <Button variant="outline" size="sm">
                <Clock className="w-4 h-4 mr-2" />
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
        <TimelinePageEditor />
      </div>
    </PageContainer>
  );
}