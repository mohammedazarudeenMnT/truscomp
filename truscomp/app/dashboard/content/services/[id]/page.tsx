"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ServiceDetailEditor from "@/components/dashboard/services/service-detail-editor";
import { axiosInstance } from "@/lib/api";
import { Loader2, ArrowLeft, AlertCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { PageContainer, PageHeader } from "@/components/ui/page-components";

interface Service {
  _id: string;
  slug: string;
  heroTitle: string;
  heroDescription: string;
  isActive: boolean;
  title?: string; // For backward compatibility
}

function EditServicePage() {
  const params = useParams();
  const [service, setService] = useState<Service | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await axiosInstance.get(`/api/services/${params.id}`);
        if (response.data.success) {
          setService(response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch service details", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (params.id) {
      fetchService();
    }
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">
            Loading service details...
          </p>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6 text-center">
            <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-destructive" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Service Not Found</h2>
            <p className="text-muted-foreground mb-6">
              The service you&apos;re looking for doesn&apos;t exist or has been
              deleted.
            </p>
            <Link href="/dashboard/content/services">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Services
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <PageContainer maxWidth="full">
      <PageHeader
        title="Edit Service"
        subtitle={`Update content and settings for "${service.heroTitle || service.title}"`}
        action={
          <Badge variant={service.isActive ? "default" : "secondary"}>
            {service.isActive ? "Active" : "Inactive"}
          </Badge>
        }
      />

      <ServiceDetailEditor serviceId={params.id as string} />
    </PageContainer>
  );
}

export default EditServicePage;
