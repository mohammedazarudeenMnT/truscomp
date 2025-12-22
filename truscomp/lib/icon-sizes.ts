/**
 * Icon Size Constants
 *
 * Standardized Tailwind CSS classes for consistent icon sizing
 * throughout the application.
 *
 * @module lib/icon-sizes
 */

/**
 * Predefined icon size classes using Tailwind CSS
 *
 * Use these constants instead of hardcoding size classes
 * to ensure consistency across the application
 *
 * @example
 * <Icon className={ICON_SIZES.md} />
 * // Renders a medium icon (5x5)
 */
export const ICON_SIZES = {
  /** Extra small - 12x12 */
  xs: "w-3 h-3",

  /** Small - 16x16 */
  sm: "w-4 h-4",

  /** Medium - 20x20 (default) */
  md: "w-5 h-5",

  /** Large - 24x24 */
  lg: "w-6 h-6",

  /** Extra large - 32x32 */
  xl: "w-8 h-8",

  /** 2X large - 40x40 */
  "2xl": "w-10 h-10",

  /** 3X large - 48x48 */
  "3xl": "w-12 h-12",
} as const;

/**
 * Standard icon button sizing patterns
 * Used for icon selector grids and icon-only buttons
 */
export const ICON_BUTTON_SIZES = {
  /** Small icon button - 2.5rem */
  sm: "h-10",

  /** Medium icon button - 3rem (default) */
  md: "h-12",

  /** Large icon button - 4rem */
  lg: "h-16",

  /** Extra large icon button - 5rem */
  xl: "h-20",
} as const;

/**
 * Common icon + text combinations
 * For use in buttons and components that display both icon and text
 */
export const ICON_WITH_TEXT = {
  /** Small icon (4x4) with small margin */
  sm: "w-4 h-4 mr-1.5",

  /** Medium icon (5x5) with medium margin */
  md: "w-5 h-5 mr-2",

  /** Large icon (6x6) with large margin */
  lg: "w-6 h-6 mr-3",
} as const;

/**
 * Type for icon size keys
 * Ensures type safety when using ICON_SIZES
 */
export type IconSizeKey = keyof typeof ICON_SIZES;

/**
 * Type for icon button size keys
 */
export type IconButtonSizeKey = keyof typeof ICON_BUTTON_SIZES;

/**
 * Type for icon with text size keys
 */
export type IconWithTextKey = keyof typeof ICON_WITH_TEXT;

/**
 * Utility function to get icon size class
 * Provides type-safe access to icon sizes with fallback
 *
 * @param size - The size key (xs, sm, md, lg, xl, etc.)
 * @returns The Tailwind CSS classes for that size
 *
 * @example
 * const sizeClass = getIconSize('lg');
 * // Returns: "w-6 h-6"
 */
export function getIconSize(size: IconSizeKey): string {
  return ICON_SIZES[size] || ICON_SIZES.md;
}

/**
 * Utility function to get icon button size class
 *
 * @param size - The button size key (sm, md, lg, xl)
 * @returns The Tailwind CSS classes for that size
 */
export function getIconButtonSize(size: IconButtonSizeKey): string {
  return ICON_BUTTON_SIZES[size] || ICON_BUTTON_SIZES.md;
}

/**
 * Utility function to get icon + text size class
 *
 * @param size - The size key (sm, md, lg)
 * @returns The Tailwind CSS classes for that size
 */
export function getIconWithTextSize(size: IconWithTextKey): string {
  return ICON_WITH_TEXT[size] || ICON_WITH_TEXT.md;
}
