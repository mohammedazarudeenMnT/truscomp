"use client";
import Link from "next/link";
import { Settings2, Users, Code, Clock, Target, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageContainer, PageHeader } from "@/components/ui/page-components";
import { Card } from "@/components/ui/card";

export default function AboutDashboardPage() {
  const aboutPages = [
    {
      key: "about",
      title: "Main About Page",
      description: "Manage the main about page content and sections",
      icon: <Info className="w-6 h-6" />,
      href: "/dashboard/content/about/main",
      color: "bg-blue-500/10 text-blue-600 border-blue-200",
    },
    {
      key: "our-team",
      title: "Our Team",
      description: "Manage team members, leadership, and team content",
      icon: <Users className="w-6 h-6" />,
      href: "/dashboard/content/about/our-team",
      color: "bg-green-500/10 text-green-600 border-green-200",
    },
    {
      key: "software-architecture",
      title: "Software Architecture",
      description: "Manage technology and architecture content",
      icon: <Code className="w-6 h-6" />,
      href: "/dashboard/content/about/software-architecture",
      color: "bg-purple-500/10 text-purple-600 border-purple-200",
    },
    {
      key: "timelines-milestones",
      title: "Timelines & Milestones",
      description: "Manage company history and milestone content",
      icon: <Clock className="w-6 h-6" />,
      href: "/dashboard/content/about/timelines-milestones",
      color: "bg-orange-500/10 text-orange-600 border-orange-200",
    },
    {
      key: "vision-mission",
      title: "Vision, Mission & Values",
      description: "Manage company vision, mission, and core values",
      icon: <Target className="w-6 h-6" />,
      href: "/dashboard/content/about/vision-mission",
      color: "bg-red-500/10 text-red-600 border-red-200",
    },
  ];

  return (
    <PageContainer maxWidth="full">
      <PageHeader
        title="About Pages Management"
        subtitle="Manage all about page content, sections, and SEO settings"
        action={
          <Link href="/about">
            <Button variant="outline" size="sm">
              <Info className="w-4 h-4 mr-2" />
              View About Pages
            </Button>
          </Link>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {aboutPages.map((page) => (
          <Card key={page.key} className="p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-lg ${page.color}`}>
                {page.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold mb-2">{page.title}</h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {page.description}
                </p>
                <div className="flex gap-2">
                  <Link href={page.href}>
                    <Button size="sm">
                      <Settings2 className="w-4 h-4 mr-2" />
                      Manage Content
                    </Button>
                  </Link>
                  <Link href={`${page.href}#seo`}>
                    <Button variant="outline" size="sm">
                      SEO Settings
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-8 p-6 bg-muted/50 rounded-xl border">
        <h3 className="text-lg font-semibold mb-2">Quick Actions</h3>
        <p className="text-muted-foreground mb-4">
          Common tasks for managing about page content
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/dashboard/content/about/main#hero">
            <Button variant="outline" size="sm">
              Update Main Hero Section
            </Button>
          </Link>
          <Link href="/dashboard/content/about/our-team#founders">
            <Button variant="outline" size="sm">
              Manage Team Members
            </Button>
          </Link>
          <Link href="/dashboard/content/about/main#impact">
            <Button variant="outline" size="sm">
              Update Company Stats
            </Button>
          </Link>
        </div>
      </div>
    </PageContainer>
  );
}