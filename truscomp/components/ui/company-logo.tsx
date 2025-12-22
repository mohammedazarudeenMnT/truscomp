"use client";

import Image from "next/image";
import { useCompanySettings } from "@/hooks/use-company-settings";
import { cn } from "@/lib/utils";

interface CompanyLogoProps {
  className?: string;
  width?: number;
  height?: number;
}

export function CompanyLogo({ 
  className = "", 
  width = 120, 
  height = 40,
}: CompanyLogoProps) {
  const { settings, loading } = useCompanySettings();

  if (loading) {
    return (
      <div 
        className={cn("animate-pulse bg-muted rounded", className)}
        style={{ width, height }}
      />
    );
  }

  // Use the logo from settings, or fallback to default logo
  const logoSrc = settings?.companyLogo || '/images/logo/logo.webp';

  return (
    <Image
      src={logoSrc}
      alt={settings?.companyName || "Company Logo"}
      width={width}
      height={height}
      className={cn("object-contain", className)}
      priority
    />
  );
}
