/**
 * Icon Selector Component
 *
 * Provides a UI for selecting icons from the unified icon library.
 * Uses a popover interface for clean, accessible icon selection.
 *
 * @module components/ui/icon-selector
 */

"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  iconMap,
  getIconComponent,
  renderIcon,
  getAvailableIcons,
} from "@/lib/icons";
import { ICON_SIZES } from "@/lib/icon-sizes";

/**
 * Props for the IconSelector component
 */
interface IconSelectorProps {
  /** The currently selected icon name */
  value?: string;

  /** Callback when an icon is selected */
  onChange: (value: string) => void;

  /** Optional label for the selector */
  label?: string;
}

/**
 * Icon Selector Component
 *
 * Provides an interactive UI for selecting from available icons.
 * Features:
 * - Search/filter functionality
 * - Grid layout for easy browsing
 * - Visual feedback for selected icon
 *
 * @example
 * ```tsx
 * <IconSelector
 *   value={selectedIcon}
 *   onChange={setSelectedIcon}
 *   label="Choose an icon"
 * />
 * ```
 */
export function IconSelector({ value, onChange, label }: IconSelectorProps) {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const iconNames = getAvailableIcons();
  const filteredIcons = search
    ? iconNames.filter((name) =>
        name.toLowerCase().includes(search.toLowerCase())
      )
    : iconNames;

  const SelectedIcon = value ? getIconComponent(value) : null;

  return (
    <div className="space-y-2">
      {label && <Label>{label}</Label>}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-start"
            type="button"
          >
            {SelectedIcon ? (
              <>
                <SelectedIcon className={`${ICON_SIZES.sm} mr-2`} />
                {value}
              </>
            ) : (
              <span className="text-muted-foreground">Select an icon...</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-0" align="start">
          <div className="p-2 border-b">
            <Input
              placeholder="Search icons..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-9"
            />
          </div>
          <div className="max-h-80 overflow-y-auto p-2">
            <div className="grid grid-cols-4 gap-2">
              {filteredIcons.map((iconName) => {
                const IconComponent = getIconComponent(iconName);
                return (
                  <Button
                    key={iconName}
                    variant={value === iconName ? "default" : "ghost"}
                    className="h-16 flex flex-col items-center justify-center gap-1 p-2"
                    onClick={() => {
                      onChange(iconName);
                      setOpen(false);
                    }}
                    type="button"
                    title={iconName}
                  >
                    {IconComponent && (
                      <IconComponent className={ICON_SIZES.md} />
                    )}
                    <span className="text-xs truncate w-full text-center">
                      {iconName}
                    </span>
                  </Button>
                );
              })}
            </div>
            {filteredIcons.length === 0 && (
              <div className="text-center py-6 text-sm text-muted-foreground">
                No icons found
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

/**
 * Re-export icon utilities for backwards compatibility
 *
 * @deprecated Import directly from @/lib/icons instead
 */
export {
  iconMap,
  getIconComponent,
  renderIcon,
  getAvailableIcons,
} from "@/lib/icons";
