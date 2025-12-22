"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { CompanyLogo } from "@/components/ui/company-logo";

const footerLinks = [
  {
    title: "Services",
    links: [
      { text: "Compliance Management", href: "#" },
      { text: "Legal Advisory", href: "#" },
      { text: "Risk Assessment", href: "#" },
      { text: "Audit Support", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { text: "About Us", href: "#" },
      { text: "Our Team", href: "#" },
      { text: "Careers", href: "#" },
      { text: "Contact", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { text: "Blog", href: "#" },
      { text: "Case Studies", href: "#" },
      { text: "Documentation", href: "#" },
      { text: "Help Center", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { text: "Privacy Policy", href: "#" },
      { text: "Terms of Service", href: "#" },
      { text: "Cookie Policy", href: "#" },
      { text: "Security", href: "#" },
    ],
  },
];

const socialLinks = [
  {
    name: "LinkedIn",
    href: "#",
    icon: (
      <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37z" />
      </svg>
    ),
  },
  {
    name: "Twitter",
    href: "#",
    icon: (
      <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M10.488 14.651L15.25 21h7l-7.858-10.478L20.93 3h-2.65l-5.117 5.886L8.75 3h-7l7.51 10.015L2.32 21h2.65zM16.25 19L5.75 5h2l10.5 14z" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "#",
    icon: (
      <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95" />
      </svg>
    ),
  },
];

export const Footer: React.FC = () => {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-6 py-12 max-w-7xl">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-8">
          {/* Brand Section */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center mb-4">
              <CompanyLogo width={144} height={120} />
            </Link>
            <p className="text-sm text-muted-foreground mb-4 max-w-xs">
              Your trusted partner in compliance management. Simplifying
              regulatory complexity for businesses worldwide.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label={social.name}
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold mb-3 text-sm">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.text}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} TrusComp. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-primary transition-colors">
              Privacy
            </Link>
            <Link href="#" className="hover:text-primary transition-colors">
              Terms
            </Link>
            <Link href="#" className="hover:text-primary transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
