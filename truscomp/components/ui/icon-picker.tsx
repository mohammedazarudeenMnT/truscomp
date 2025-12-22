"use client";

import { useState } from "react";
import { Button } from "./button";
import { Input } from "./input";
import { Label } from "./label";
import { Card, CardContent } from "./card";
import { Search, ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { getIconComponent, getAvailableIcons } from "@/lib/icons";
import { ICON_SIZES } from "@/lib/icon-sizes";

interface IconPickerProps {
  value?: string;
  onChange: (value: string) => void;
  label?: string;
}

export function IconPicker({ value, onChange, label }: IconPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const iconNames = getAvailableIcons();
  const filteredIcons = iconNames.filter((icon) =>
    icon.toLowerCase().includes(search.toLowerCase())
  );

  const getIcon = (iconName: string) => {
    const IconComponent = getIconComponent(iconName);
    return IconComponent ? <IconComponent className={ICON_SIZES.md} /> : null;
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
          <ChevronDown className={`${ICON_SIZES.sm} opacity-50`} />
        </Button>

        {isOpen && (
          <Card className="absolute z-50 w-full mt-1 shadow-lg">
            <CardContent className="p-3 space-y-3">
              <div className="relative">
                <Search
                  className={`absolute left-2 top-2.5 ${ICON_SIZES.sm} text-muted-foreground`}
                />
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
                        <Check
                          className={`absolute top-1 right-1 ${ICON_SIZES.xs} text-primary`}
                        />
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
