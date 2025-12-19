import ThemeSettings from "../../models/settings/ThemeSettings.js";
import { converter, formatHex } from "culori";

// Convert hex to OKLCH using culori library
const hexToOklch = converter("oklch");

// Generate color scale from base color using exact OKLCH conversion
function generateColorScale(baseColor) {
  // Convert hex to OKLCH - this gives us the EXACT values
  const oklch = hexToOklch(baseColor);
  
  if (!oklch) {
    throw new Error('Failed to convert color to OKLCH');
  }

  // Extract exact values from culori conversion
  const baseL = oklch.l;
  const baseC = oklch.c;
  const baseH = oklch.h || 0;

  // Helper to format OKLCH values with proper precision
  const formatOklch = (lightness, chroma, hue) => {
    const formattedL = parseFloat(lightness.toFixed(4));
    const formattedC = parseFloat(chroma.toFixed(4));
    const formattedH = parseFloat(hue.toFixed(2));
    
    return `oklch(${formattedL} ${formattedC} ${formattedH})`;
  };

  // Generate full color scale matching globals.css structure
  // Using exact ratios from the default orange theme
  return {
    50: formatOklch(0.985, baseC * 0.0899, baseH + 10.18),
    100: formatOklch(0.96, baseC * 0.2394, baseH + 9.38),
    200: formatOklch(0.9199, baseC * 0.48, baseH + 8.42),
    300: formatOklch(0.8721, baseC * 0.7433, baseH + 5.39),
    400: formatOklch(0.8156, baseC * 0.9803, baseH + 3.19),
    500: formatOklch(baseL, baseC, baseH),
    600: formatOklch(0.6627, baseC * 0.9681, baseH - 1.88),
    700: formatOklch(0.5545, baseC * 0.8383, baseH - 3.42),
    800: formatOklch(0.4723, baseC * 0.7304, baseH - 6.10),
    900: formatOklch(0.4128, baseC * 0.5925, baseH - 7.37),
    950: formatOklch(0.2767, baseC * 0.4029, baseH - 8.59),
    1000: formatOklch(0.1881, baseC * 0.2783, baseH - 9.77),
  };
}

// Get theme settings (Public)
export const getThemeSettings = async (req, res) => {
  try {
    let settings = await ThemeSettings.findOne();

    if (!settings) {
      const defaultColor = "#ff9d01";
      settings = await ThemeSettings.create({
        primaryColor: defaultColor,
        primaryScale: generateColorScale(defaultColor),
      });
    }

    return res.status(200).json({
      success: true,
      data: settings,
    });
  } catch (error) {
    console.error("Get theme settings error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch theme settings",
    });
  }
};

// Update theme settings (Admin)
export const updateThemeSettings = async (req, res) => {
  try {
    const { primaryColor } = req.body;

    if (!primaryColor) {
      return res.status(400).json({
        success: false,
        message: "Primary color is required",
      });
    }

    let settings = await ThemeSettings.findOne();

    if (!settings) {
      settings = new ThemeSettings();
    }

    settings.primaryColor = primaryColor;
    settings.primaryScale = generateColorScale(primaryColor);

    await settings.save();

    return res.status(200).json({
      success: true,
      message: "Theme settings updated successfully",
      data: settings,
    });
  } catch (error) {
    console.error("Update theme settings error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update theme settings",
    });
  }
};
