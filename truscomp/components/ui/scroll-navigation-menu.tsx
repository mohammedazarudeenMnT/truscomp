"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import {
  Menu,
  X,
  Home,
  User,
  LogOut,
  LayoutDashboard,
  ChevronDown,
  Info,
  Briefcase,
  FileText,
  Star,
  Phone,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import { CompanyLogo } from "@/components/ui/company-logo";
import { axiosInstance } from "@/lib/api";
import { cn } from "@/lib/utils";

interface NavItem {
  name: string;
  icon: React.ReactNode;
  link?: string;
  submenu?: {
    name: string;
    link: string;
  }[];
}

interface MenuItem {
  id: number;
  title: string;
  url: string;
  icon: React.ReactNode;
  submenu?: {
    name: string;
    link: string;
  }[];
}

interface ScrollNavbarProps {
  className?: string;
}

export const Component: React.FC<ScrollNavbarProps> = ({ className = "" }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [services, setServices] = useState<
    Array<{ slug: string; heroTitle: string }>
  >([]);

  const { scrollY } = useScroll();
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuth();

  // Fetch services from API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axiosInstance.get("/api/services");
        if (response.data.success) {
          setServices(response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch services:", error);
      }
    };
    fetchServices();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    // Initial check
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (link?: string) => {
    if (!link) return false;
    if (link === "/") return pathname === "/";
    return pathname.startsWith(link);
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navItems: NavItem[] = [
    {
      name: "Home",
      link: "/",
      icon: <Home className="w-5 h-5" />,
    },
    {
      name: "About Us",
      link: "/about",
      icon: <Info className="w-5 h-5" />,
      submenu: [
        {
          name: "Vision, Mission, and Core Values",
          link: "/about/vision-mission-and-core-values",
        },
        { name: "Our Team", link: "/about/our-team" },
        {
          name: "Software Architecture",
          link: "/about/software-architecture-the-engine-behind-our-solution",
        },
        {
          name: "Timelines and Milestones",
          link: "/about/timelines-and-milestones",
        },
      ],
    },
    {
      name: "Services",
      link: "/services",
      icon: <Briefcase className="w-5 h-5" />,
      submenu:
        services.length > 0
          ? services.map((service) => ({
              name: service.heroTitle,
              link: `/services/${service.slug}`,
            }))
          : [
              {
                name: "View All Services",
                link: "/services",
              },
            ],
    },
    {
      name: "Resources",
      link: "/resources",
      icon: <FileText className="w-5 h-5" />,
      submenu: [
        {
          name: "Monthly Labour Law Updates",
          link: "/resources#monthly-updates",
        },
        { name: "Blogs", link: "/resources/blogs-brand-and-service" },
        { name: "Compliance Challenges", link: "/resources#challenges" },
        { name: "Cost Structure", link: "/resources#cost-structure" },
        { name: "NFH List 2025", link: "/resources#nfh-list" },
        { name: "ACT", link: "/resources#act" },
        { name: "Laws", link: "/resources#laws" },
        { name: "Labour Welfare fund", link: "/resources#welfare-fund" },
        { name: "PF & ESI", link: "/resources#pf-esi" },
        { name: "Case Studies", link: "/resources#case-studies" },
        {
          name: "In-house vendor Audit VS Vendor Audit",
          link: "/resources#vendor-comparison",
        },
        {
          name: "Professional Tax in India: Rates, Registration & Compliance Guide",
          link: "/resources#professional-tax",
        },
      ],
    },
    {
      name: "Client Testimonials",
      link: "/client-testimonials-compliance-client-testimonials",
      icon: <Star className="w-5 h-5" />,
    },
    {
      name: "Contact Us",
      link: "/contact",
      icon: <Phone className="w-5 h-5" />,
    },
  ];

  // Convert navItems to menuItems format for mobile menu
  const menuItems: MenuItem[] = navItems.map((item, index) => ({
    id: index + 1,
    title: item.name,
    url: item.link || "#",
    icon: item.icon,
    submenu: item.submenu,
  }));

  return (
    <>
      {/* 1. Desktop Floating Navbar - Always Visible (Sticky) */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none"
      >
        <nav className="w-full max-w-7xl flex items-center justify-between px-8 py-2.5 bg-background/85 backdrop-blur-3xl saturate-150 border border-white/30 dark:border-white/10 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.5)] pointer-events-auto overflow-visible ring-1 ring-white/10 bg-gradient-to-b from-white/5 to-transparent">
          {/* Logo */}
          <Link href="/" className="shrink-0 group">
            <CompanyLogo width={120} height={40} />
          </Link>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center px-1.5 py-1 bg-white/5 rounded-full border border-white/10 backdrop-blur-md shadow-inner">
            {navItems.map((item) => {
              const active = isActive(item.link || "");
              return (
                <div key={item.name} className="relative group">
                  {item.submenu ? (
                    <div className="relative">
                      <Link
                        href={item.link || "#"}
                        className={cn(
                          "relative flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 z-10",
                          active ? "text-primary" : "text-foreground hover:text-primary"
                        )}
                      >
                        <span>{item.name}</span>
                        <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180 opacity-80" />
                        
                        {active && (
                          <motion.div
                            layoutId="nav-pill"
                            className="absolute inset-0 bg-primary/15 rounded-full -z-10 shadow-sm"
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                          />
                        )}
                      </Link>
                      
                      {/* Premium Dropdown */}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform scale-95 group-hover:scale-100 z-[100]">
                        <div className="w-80 bg-background border border-white/20 dark:border-white/10 rounded-[2rem] shadow-[0_30px_60px_rgba(0,0,0,0.6)] p-5 overflow-hidden">
                          <div className="space-y-1 relative z-10">
                            {item.submenu.map((subItem) => (
                              <Link
                                key={subItem.name}
                                href={subItem.link}
                                className={cn(
                                  "block px-5 py-3.5 rounded-2xl text-sm font-bold transition-all duration-200",
                                  isActive(subItem.link)
                                    ? "bg-primary/10 text-primary shadow-sm"
                                    : "text-foreground/80 hover:bg-primary/5 hover:text-primary"
                                )}
                              >
                                {subItem.name}
                              </Link>
                            ))}
                          </div>
                          {/* Accent Glow */}
                          <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 blur-3xl rounded-full" />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={item.link || "#"}
                      className={cn(
                        "relative px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 z-10",
                        active ? "text-primary" : "text-foreground hover:text-primary"
                      )}
                    >
                      {item.name}
                      {active && (
                        <motion.div
                          layoutId="nav-pill"
                          className="absolute inset-0 bg-primary/15 rounded-full -z-10 shadow-sm"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                    </Link>
                  )}
                </div>
              );
            })}
          </div>

          {/* Desktop Actions */}
          <div className="flex items-center gap-3">
            {isAuthenticated && user ? (
              <div className="hidden sm:flex items-center gap-3">
                <Button 
                  variant="ghost" 
                  className="rounded-full text-red-500 font-bold hover:bg-red-500/10 hover:text-red-600 transition-all px-6 border border-transparent hover:border-red-500/20" 
                  onClick={() => { logout(); toggleMenu(); }}
                >
                  LOGOUT
                </Button>
              </div>
            ) : (
              <Button 
                className="rounded-full bg-primary text-primary-foreground font-black text-xs px-6 h-10 shadow-[0_8px_20px_rgba(var(--primary-rgb),0.2)] hover:shadow-primary/40 transition-all duration-500"
                asChild
              >
                <Link href="/login">LOGIN</Link>
              </Button>
            )}
            
            {/* Mobile Menu Toggle */}
            <button
              onClick={toggleMenu}
              className="lg:hidden p-2 text-foreground/70 hover:text-primary transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </nav>
      </motion.div>

      {/* 3. Navigation Modal */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/60 backdrop-blur-sm z-[60]"
              onClick={toggleMenu}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none"
            >
              <div className="relative w-full max-w-[420px] bg-background/80 backdrop-blur-3xl border border-white/20 rounded-[3rem] shadow-[0_30px_100px_rgba(0,0,0,0.4)] overflow-hidden flex flex-col max-h-[90vh] pointer-events-auto">
                <div className="flex items-center justify-between p-10 pb-4">
                  <CompanyLogo width={120} height={60} />
                  <motion.button
                    onClick={toggleMenu}
                    className="p-3 text-foreground/40 hover:text-primary rounded-2xl hover:bg-primary/5 transition-colors"
                    whileHover={{ rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X className="w-7 h-7" />
                  </motion.button>
                </div>

                <div className="flex-1 overflow-y-auto px-8 py-4 custom-scrollbar">
                  <div className="space-y-2">
                    {navItems.map((item, index) => (
                      <motion.div
                        key={item.name}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        {item.submenu ? (
                          <div className="space-y-1">
                            <button
                              onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                              className="group flex items-center justify-between w-full p-4 rounded-2xl hover:bg-primary/5 transition-all"
                            >
                              <div className="flex items-center gap-4">
                                <span className="text-primary group-hover:scale-110 transition-transform">{item.icon}</span>
                                <span className="text-lg font-bold text-foreground/90">{item.name}</span>
                              </div>
                              <ChevronDown className={cn("w-5 h-5 transition-transform duration-500", activeDropdown === item.name && "rotate-180 text-primary")} />
                            </button>
                            
                            <AnimatePresence>
                              {activeDropdown === item.name && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  className="overflow-hidden bg-primary/5 rounded-2xl mx-2 border border-primary/10"
                                >
                                  <div className="py-2">
                                    {item.submenu.map((subItem) => (
                                      <Link
                                        key={subItem.name}
                                        href={subItem.link}
                                        onClick={toggleMenu}
                                        className={cn(
                                          "block px-8 py-3 text-sm font-medium transition-colors hover:text-primary",
                                          isActive(subItem.link) ? "text-primary border-l-2 border-primary" : "text-foreground/70"
                                        )}
                                      >
                                        {subItem.name}
                                      </Link>
                                    ))}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ) : (
                          <Link
                            href={item.link || "#"}
                            onClick={toggleMenu}
                            className="group flex items-center gap-4 p-4 rounded-2xl hover:bg-primary/5 transition-all text-lg font-bold text-foreground/90"
                          >
                            <span className="text-primary group-hover:scale-110 transition-transform">{item.icon}</span>
                            {item.name}
                          </Link>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="p-10 border-t border-white/10 bg-white/5">
                  {isAuthenticated && user ? (
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 px-2">
                        <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                          <User className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="font-bold">{user.name}</p>
                          <p className="text-xs text-foreground/40">{user.email}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <Button variant="outline" className="rounded-full border-white/10" asChild>
                          <Link href="/dashboard" onClick={toggleMenu}>Dashboard</Link>
                        </Button>
                        <Button variant="ghost" className="rounded-full text-red-500 font-bold" onClick={() => { logout(); toggleMenu(); }}>
                          Logout
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <Button 
                      className="w-full h-14 rounded-full bg-primary text-primary-foreground font-black text-lg shadow-[0_10px_30px_rgba(var(--primary-rgb),0.3)] hover:shadow-primary/50 transition-all hover:scale-[1.02] active:scale-[0.98]"
                      asChild
                    >
                      <Link href="/login" onClick={toggleMenu}>LOGIN TO ACCESS</Link>
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

