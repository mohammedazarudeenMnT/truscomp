"use client";

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Check } from 'lucide-react';
import { axiosInstance } from '@/lib/api';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

export default function ThemeColorSettings() {
  const [selectedColor, setSelectedColor] = useState('#ff9d01');
  const [currentColor, setCurrentColor] = useState('#ff9d01');
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const presetColors = [
    { color: '#ff9d01', name: 'Orange (Default)' },
    { color: '#ef4444', name: 'Red' },
    { color: '#f97316', name: 'Orange Light' },
    { color: '#eab308', name: 'Yellow' },
    { color: '#22c55e', name: 'Green' },
    { color: '#3b82f6', name: 'Blue' },
    { color: '#8b5cf6', name: 'Purple' },
    { color: '#ec4899', name: 'Pink' },
  ];

  useEffect(() => {
    fetchCurrentTheme();
  }, []);

  const fetchCurrentTheme = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get('/api/theme-settings');
      if (response.data.success) {
        const color = response.data.data.primaryColor;
        setCurrentColor(color);
        setSelectedColor(color);
      }
    } catch (error) {
      console.error('Failed to fetch theme:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const applyThemeColor = async () => {
    try {
      setIsSaving(true);
      const response = await axiosInstance.put('/api/theme-settings', {
        primaryColor: selectedColor
      });

      if (response.data.success) {
        setCurrentColor(selectedColor);
        toast.success('Theme color updated successfully');
        
        // Reload page to apply new theme
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }
    } catch (error: any) {
      console.error('Failed to update theme:', error);
      toast.error(error.response?.data?.message || 'Failed to update theme color');
    } finally {
      setIsSaving(false);
    }
  };

  const hasChanges = selectedColor !== currentColor;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Preset Colors */}
      <div>
        <Label className="mb-3 block text-sm font-medium">
          Preset Colors
        </Label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {presetColors.map((preset) => (
            <button
              key={preset.color}
              type="button"
              onClick={() => setSelectedColor(preset.color)}
              className={cn(
                "flex items-center gap-3 p-3 rounded-lg border-2 transition-all hover:shadow-md",
                selectedColor === preset.color
                  ? 'border-foreground ring-2 ring-ring ring-offset-2 bg-muted'
                  : 'border-border hover:border-muted-foreground'
              )}
            >
              <div
                className="w-10 h-10 rounded-md border-2 border-border flex-shrink-0"
                style={{ backgroundColor: preset.color }}
              />
              <div className="text-left flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{preset.name}</p>
                {selectedColor === preset.color && (
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Check className="w-3 h-3" /> Selected
                  </p>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Custom Color */}
      <div>
        <Label htmlFor="custom-color" className="mb-3 block text-sm font-medium">
          Custom Color
        </Label>
        <div className="flex items-center gap-3">
          <input
            type="color"
            id="custom-color"
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
            className="h-12 w-12 cursor-pointer rounded-md border-2 border-border"
          />
          <Input
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
            placeholder="#000000"
            className="flex-1 font-mono"
          />
        </div>
      </div>

      {/* Preview */}
      <div
        className="rounded-lg border-2 p-6"
        style={{ 
          backgroundColor: selectedColor + '15',
          borderColor: selectedColor + '40'
        }}
      >
        <p className="text-sm font-medium mb-3" style={{ color: selectedColor }}>
          Preview
        </p>
        <p className="text-sm mb-4" style={{ color: selectedColor }}>
          This is how your theme color will look across buttons, links, and interactive elements.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button 
            size="sm" 
            style={{ 
              backgroundColor: selectedColor,
              color: 'white'
            }}
          >
            Primary Button
          </Button>
          <Button 
            size="sm" 
            variant="outline"
            style={{ 
              borderColor: selectedColor,
              color: selectedColor
            }}
          >
            Outline Button
          </Button>
          <Button 
            size="sm" 
            variant="ghost"
            style={{ 
              color: selectedColor
            }}
          >
            Ghost Button
          </Button>
        </div>
      </div>

      {/* Apply Button */}
      {hasChanges && (
        <div className="flex items-center justify-between p-4 bg-muted rounded-lg border">
          <div>
            <p className="text-sm font-medium">Unsaved Changes</p>
            <p className="text-xs text-muted-foreground">
              Click apply to save your new theme color
            </p>
          </div>
          <Button
            onClick={applyThemeColor}
            disabled={isSaving}
            style={{ backgroundColor: selectedColor }}
            className="text-white"
          >
            {isSaving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            Apply Color
          </Button>
        </div>
      )}
    </div>
  );
}
