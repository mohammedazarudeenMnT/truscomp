"use client";
import Link from "next/link";
import { ArrowLeft, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageContainer, PageHeader } from "@/components/ui/page-components";
import TeamPageEditor from "@/components/dashboard/about/team-page-editor";

export default function OurTeamDashboardPage() {
  return (
    <PageContainer maxWidth="full">
      <PageHeader
        title="Our Team Page"
        subtitle="Manage team members, leadership content, and team page sections"
        action={
          <div className="flex gap-2">
            <Link href="/about/our-team">
              <Button variant="outline" size="sm">
                <Users className="w-4 h-4 mr-2" />
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
        <TeamPageEditor />
      </div>
    </PageContainer>
  );
}