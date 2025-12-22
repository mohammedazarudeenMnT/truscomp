"use client";
import Link from "next/link";
import { ArrowLeft, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageContainer, PageHeader } from "@/components/ui/page-components";
import TestimonialsPageEditor from "@/components/dashboard/testimonials/testimonials-page-editor";

export default function TestimonialsDashboardPage() {
  return (
    <PageContainer maxWidth="full">
      <PageHeader
        title="Client Testimonials Page"
        subtitle="Manage client testimonials, reviews, and testimonials page content"
        action={
          <div className="flex gap-2">
            <Link href="/client-testimonials-compliance-client-testimonials">
              <Button variant="outline" size="sm">
                <MessageSquare className="w-4 h-4 mr-2" />
                View Page
              </Button>
            </Link>
            <Link href="/dashboard/content">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Content
              </Button>
            </Link>
          </div>
        }
      />

      <div className="space-y-6">
        <TestimonialsPageEditor />
      </div>
    </PageContainer>
  );
}
