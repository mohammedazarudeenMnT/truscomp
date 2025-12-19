"use client";

import { useState } from "react";
import { Button } from "./button";
import { Input } from "./input";
import { Label } from "./label";
import { Card, CardContent } from "./card";
import { Search, ChevronDown, Check } from "lucide-react";
import * as Icons from "lucide-react";
import { cn } from "@/lib/utils";

interface IconPickerProps {
  value?: string;
  onChange: (value: string) => void;
  label?: string;
}

const popularIcons = [
  "CheckCircle", "Star", "Award", "Shield", "Clock", "Users", "TrendingUp",
  "Zap", "Heart", "ThumbsUp", "Sparkles", "Target", "Rocket", "Globe",
  "LayoutDashboard", "Workflow", "Calendar", "Bell", "Settings", "FileText",
  "Layers", "Cpu", "BarChart", "Lightbulb", "MapPin", "Send", "BookOpen"
];

export function IconPicker({ value, onChange, label }: IconPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredIcons = popularIcons.filter((icon) =>
    icon.toLowerCase().includes(search.toLowerCase())
  );

  const getIcon = (iconName: string) => {
    const IconComponent = Icons[iconName as keyof typeof Icons] as React.ComponentType<{ className?: string }>;
    return IconComponent ? <IconComponent className="w-5 h-5" /> : null;
  };

  return (
    <div className="space-y-2">
      {label && <Label>{label}</Label>}
      <div className="relative">
        <Button
          variant="outline"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full justify-between"
        >
          <div className="flex items-center gap-2">
            {value && getIcon(value)}
            <span>{value || "Select icon..."}</span>
          </div>
          <ChevronDown className="w-4 h-4 opacity-50" />
        </Button>
        
        {isOpen && (
          <Card className="absolute z-50 w-full mt-1 shadow-lg">
            <CardContent className="p-3 space-y-3">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search icons..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-8"
                />
              </div>
              <div className="max-h-[300px] overflow-y-auto">
                <div className="grid grid-cols-4 gap-2">
                  {filteredIcons.map((icon) => (
                    <button
                      key={icon}
                      type="button"
                      onClick={() => {
                        onChange(icon);
                        setIsOpen(false);
                        setSearch("");
                      }}
                      className={cn(
                        "flex flex-col items-center gap-1 p-3 rounded-lg hover:bg-accent transition-colors relative",
                        value === icon && "bg-accent ring-2 ring-primary"
                      )}
                    >
                      {value === icon && (
                        <Check className="absolute top-1 right-1 w-3 h-3 text-primary" />
                      )}
                      {getIcon(icon)}
                      <span className="text-[9px] text-center leading-tight">
                        {icon}
                      </span>
                    </button>
                  ))}
                </div>
                {filteredIcons.length === 0 && (
                  <div className="text-center py-6 text-sm text-muted-foreground">
                    No icons found
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
