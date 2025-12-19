"use client";

import { usePathname } from "next/navigation";
import { DropdownNavbar } from "./navbar";
import { Footer } from "./footer";

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

export function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname();

  // Define paths where Navbar and Footer should be hidden
  // We use strict equality for exact matches (like /login)
  // And startsWith for section matches (like /dashboard/*)
  const isAuthPage = 
    pathname === "/login" || 
    pathname === "/register" ||
    pathname === "/forgot-password";
    
  const isDashboardPage = 
    pathname?.startsWith("/dashboard") || 
    pathname?.startsWith("/admin");

  const shouldHideLayout = isAuthPage || isDashboardPage;

  return (
    <>
      {!shouldHideLayout && <DropdownNavbar />}
      {children}
      {!shouldHideLayout && <Footer />}
    </>
  );
}
