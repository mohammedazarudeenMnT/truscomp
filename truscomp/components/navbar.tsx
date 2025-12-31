"use client";
import { Component } from "@/components/ui/scroll-navigation-menu";

interface DropdownNavbarProps {
  className?: string;
}

export const DropdownNavbar = ({ className }: DropdownNavbarProps) => {
  return <Component className={className} />;
};
