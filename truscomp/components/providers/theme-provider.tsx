"use client";

import { useEffect } from "react";
import { axiosInstance } from "@/lib/api";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Fetch theme settings and apply exact OKLCH color scale
    const applyTheme = async () => {
      try {
        const response = await axiosInstance.get("/api/theme-settings");

        if (response.data.success && response.data.data.primaryScale) {
          const scale = response.data.data.primaryScale;
          const root = document.documentElement;
          
          // Apply the full exact OKLCH color scale
          Object.entries(scale).forEach(([key, value]) => {
            root.style.setProperty(`--primary-${key}`, value as string);
          });

          // Update the primary variable to use the 500 shade
          if (scale["500"]) {
            root.style.setProperty("--primary", scale["500"]);
          }

          // Also set the hex for reference
          if (response.data.data.primaryColor) {
            root.style.setProperty(
              "--primary-color-hex",
              response.data.data.primaryColor
            );
          }
        }
      } catch (error) {
        console.error("Failed to load theme:", error);
      }
    };

    applyTheme();
  }, []);

  return <>{children}</>;
}
