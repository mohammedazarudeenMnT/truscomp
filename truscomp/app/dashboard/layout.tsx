"use client";

import { Sidebar, SidebarLink } from "@/components/ui/sidebar";
import { ProtectedRoute } from "@/components/protected-route";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import {
  LayoutDashboard,
  Settings,
  LogOut,
  Layers,
  BookOpen,
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useAuth();

  // Define sidebar links
  const sidebarLinks: SidebarLink[] = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
      isActive: pathname === "/dashboard",
      isSpecial: true,
    },
    {
      label: "Settings",
      href: "/dashboard/settings",
      icon: <Settings className="w-5 h-5" />,
      isActive: pathname === "/dashboard/settings",
    },
    {
      label: "Services",
      href: "/dashboard/content/services",
      icon: <Layers className="w-5 h-5" />,
      isActive: pathname.startsWith("/dashboard/content/services"),
    },
    {
      label: "Blog",
      href: "/dashboard/content/blogs",
      icon: <BookOpen className="w-5 h-5" />,
      isActive: pathname.startsWith("/dashboard/content/blogs"),
    },
    // Commmented out missing routes for now to avoid 404s
    /*
    {
      label: "Manage Members",
      href: "/dashboard/members",
      icon: <Users className="w-5 h-5" />,
      isActive: pathname === "/dashboard/members",
    },
    */
    {
      label: "Logout",
      href: "/logout",
      icon: <LogOut className="w-5 h-5" />,
      isActive: false,
    },
  ];

  // Handle link clicks
  const handleLinkClick = async (href: string) => {
    if (href === "/logout") {
      // Handle logout using auth context
      await logout();
    } else {
      router.push(href);
    }
  };

  return (
    <ProtectedRoute requireAdmin={true}>
      <div className="flex h-screen bg-gray-50 overflow-hidden dashboard-layout">
        {/* Sidebar */}
        <Sidebar
          links={sidebarLinks}
          user={
            user
              ? {
                  name: user.name,
                  email: user.email,
                  role: user.role,
                }
              : undefined
          }
          onLinkClick={handleLinkClick}
        />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden h-full">
          {children}
        </main>
      </div>
    </ProtectedRoute>
  );
}
