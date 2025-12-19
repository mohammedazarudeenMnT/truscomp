"use client";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown, Menu, User, LogOut, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";

interface NavItem {
  name: string;
  link?: string;
  submenu?: {
    name: string;
    link: string;
  }[];
}

interface DropdownNavbarProps {
  className?: string;
}

export const DropdownNavbar = ({ className }: DropdownNavbarProps) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuth();

  const isActive = (link?: string) => {
    if (!link) return false;
    if (link === "/") return pathname === "/";
    return pathname.startsWith(link);
  };

  const navItems: NavItem[] = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "About Us",
      link: "/about",
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
      submenu: [
        {
          name: "End-to-End Labor Law Compliance Management",
          link: "/services#end-to-end",
        },
        { name: "Compliance Calendar", link: "/services#calendar" },
        {
          name: "Records & Registers Compliance – Automated Solutions by TrusComp",
          link: "/services#records",
        },
        {
          name: "Remittances & Return's – Automated Compliance by TrusComp",
          link: "/services#remittances",
        },
        {
          name: "Inspection Handling & Audit Appearance",
          link: "/services#inspection",
        },
        {
          name: "Licenses & Registrations (Renewals & Amendments)",
          link: "/services#licenses",
        },
        { name: "Vendor Audit", link: "/services#vendor-audit" },
        {
          name: "Employer Audit (S&E and Factory)",
          link: "/services#employer-audit",
        },
        {
          name: "Contractor Compliance Solutions",
          link: "/services#contractor",
        },
        { name: "Factory Compliance Solutions", link: "/services#factory" },
        { name: "Payroll Compliance", link: "/services#payroll" },
        {
          name: "UAN and IP Generation (SS Bot – Social Security Bot)",
          link: "/services#uan-ip",
        },
        {
          name: "Compliance Risk Assessment",
          link: "/services#risk-assessment",
        },
        { name: "Training and Awareness Programs", link: "/services#training" },
      ],
    },
    {
      name: "Resources",
      link: "/resources",
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
    },
    {
      name: "Contact Us",
      link: "/contact",
    },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        "bg-white shadow-sm dark:bg-base-950",
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="shrink-0">
            <Link href="/" className="flex items-center cursor-pointer">
              <div className="h-16 w-32 relative">
                <Image
                  src="/images/logo/logo.webp"
                  alt="TrusComp logo"
                  fill
                  sizes="128px"
                  className="object-contain"
                  priority
                />
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() =>
                  item.submenu && setActiveDropdown(item.name)
                }
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {item.submenu ? (
                  <>
                    <Link
                      href={item.link || "#"}
                      className={cn(
                        "flex items-center space-x-1 px-3 py-2 text-sm font-medium transition-colors relative cursor-pointer",
                        isActive(item.link)
                          ? "text-primary-600 dark:text-primary-400"
                          : "text-base-700 hover:text-primary-600 dark:text-base-300 dark:hover:text-primary-400"
                      )}
                    >
                      <span className="relative z-10">{item.name}</span>
                      <ChevronDown
                        className={cn(
                          "w-4 h-4 transition-transform relative z-10",
                          activeDropdown === item.name && "rotate-180"
                        )}
                      />
                    </Link>
                    <AnimatePresence>
                      {activeDropdown === item.name && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute left-0 mt-2 w-72 bg-white dark:bg-base-900 rounded-lg shadow-xl py-2 border border-base-200 dark:border-base-700 z-50"
                        >
                          {item.submenu.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.link}
                              className={cn(
                                "block px-4 py-2.5 text-sm transition-all cursor-pointer",
                                isActive(subItem.link)
                                  ? "bg-primary-50 text-primary-700 font-medium dark:bg-base-800 dark:text-primary-400"
                                  : "text-base-700 hover:bg-primary-50 hover:text-primary-700 dark:text-base-300 dark:hover:bg-base-800 dark:hover:text-primary-400"
                              )}
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <Link
                    href={item.link || "#"}
                    className={cn(
                      "px-3 py-2 text-sm font-medium transition-colors relative block cursor-pointer",
                      isActive(item.link)
                        ? "text-primary-600 dark:text-primary-400"
                        : "text-base-700 hover:text-primary-600 dark:text-base-300 dark:hover:text-primary-400"
                    )}
                  >
                    <span className="relative z-10">{item.name}</span>
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center gap-3 ml-4">
            {isAuthenticated && user ? (
              <>
                <Button variant="ghost" size="sm" className="text-base-700 hover:text-primary-600 hover:bg-primary-50 dark:text-base-300" asChild>
                  <Link href={user.role === 'admin' ? '/dashboard' : '/dashboard'}>
                    <User className="w-4 h-4 mr-2" />
                    Dashboard
                  </Link>
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => logout()}
                  className="text-base-700 hover:text-red-600 hover:border-red-600 dark:text-base-300"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground" asChild>
                <Link href="/login">Login</Link>
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={cn(
                "inline-flex items-center justify-center p-2 rounded-md focus:outline-none transition-all cursor-pointer",
                "text-base-700 hover:text-primary-600 hover:bg-base-100 dark:text-base-300 dark:hover:text-primary-400 dark:hover:bg-base-800"
              )}
            >
              {isMobileMenuOpen ? (
                <LayoutDashboard className="h-6 w-6 rotate-45" /> // Using a different icon or simple close icon
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white dark:bg-base-900 border-t border-base-200 dark:border-base-800 shadow-lg max-h-[80vh] overflow-y-auto"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <div key={item.name}>
                  {item.submenu ? (
                    <>
                      <div className="flex items-center">
                        <Link
                          href={item.link || "#"}
                          className={cn(
                            "flex-1 px-3 py-2.5 text-base font-medium rounded-l-md cursor-pointer transition-all",
                            isActive(item.link)
                              ? "bg-primary-50 text-primary-700 dark:bg-base-800 dark:text-primary-400"
                              : "text-base-700 hover:bg-base-100 dark:text-base-300 dark:hover:bg-base-800"
                          )}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                        <button
                          onClick={() =>
                            setActiveDropdown(
                              activeDropdown === item.name ? null : item.name
                            )
                          }
                          className="px-3 py-2.5 text-base-700 hover:bg-base-100 dark:text-base-300 dark:hover:bg-base-800 rounded-r-md cursor-pointer transition-all"
                        >
                          <ChevronDown
                            className={cn(
                              "w-4 h-4 transition-transform",
                              activeDropdown === item.name && "rotate-180"
                            )}
                          />
                        </button>
                      </div>
                      <AnimatePresence>
                        {activeDropdown === item.name && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="pl-4 space-y-1"
                          >
                            {item.submenu.map((subItem) => (
                              <Link
                                key={subItem.name}
                                href={subItem.link}
                                className={cn(
                                  "block px-3 py-2 text-sm rounded-md cursor-pointer transition-all",
                                  isActive(subItem.link)
                                    ? "bg-primary-50 text-primary-700 font-medium dark:bg-base-800 dark:text-primary-400"
                                    : "text-base-600 hover:bg-base-100 dark:text-base-400 dark:hover:bg-base-800"
                                )}
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                {subItem.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      href={item.link || "#"}
                      className={cn(
                        "block px-3 py-2.5 text-base font-medium rounded-md cursor-pointer transition-all",
                        isActive(item.link)
                          ? "bg-primary-50 text-primary-700 dark:bg-base-800 dark:text-primary-400"
                          : "text-base-700 hover:bg-base-100 dark:text-base-300 dark:hover:bg-base-800"
                      )}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}

              {/* Mobile Auth Buttons */}
              <div className="pt-4 mt-2 border-t border-base-200 dark:border-base-800">
                {isAuthenticated && user ? (
                  <>
                     <div className="flex items-center gap-3 px-3 py-2 mb-2 bg-base-50 dark:bg-base-800/50 rounded-lg mx-2">
                        <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center font-bold text-sm">
                            {user.name?.[0]?.toUpperCase() || 'U'}
                        </div>
                        <div className="overflow-hidden">
                            <p className="font-semibold text-sm text-base-900 dark:text-base-100 truncate">{user.name}</p>
                            <p className="text-xs text-base-500 dark:text-base-400 truncate">{user.email}</p>
                        </div>
                     </div>
                    <Link 
                      href={user.role === 'admin' ? '/dashboard' : '/dashboard'}
                      className="flex items-center w-full px-3 py-2.5 text-base font-medium text-base-700 hover:bg-base-100 dark:text-base-300 dark:hover:bg-base-800 rounded-md"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <LayoutDashboard className="w-4 h-4 mr-2" />
                      Dashboard
                    </Link>
                    <button
                      onClick={() => logout()}
                      className="flex items-center w-full px-3 py-2.5 text-base font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/10 rounded-md"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </button>
                  </>
                ) : (
                  <Link
                    href="/login"
                    className="block mx-3 mt-2 px-4 py-2 text-center text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 rounded-md"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
