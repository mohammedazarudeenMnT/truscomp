/**
 * Unified Icon Library
 * 
 * Central location for all icon exports and utilities.
 * Consolidates all icon definitions and provides helper functions
 * for consistent icon usage across the application.
 * 
 * @module lib/icons
 */

import {
  // Common icons
  Check,
  X,
  Plus,
  Minus,
  ChevronRight,
  ChevronLeft,
  ChevronUp,
  ChevronDown,
  ArrowRight,
  ArrowLeft,
  ArrowUp,
  ArrowDown,
  // Business & Office
  Briefcase,
  Building,
  Users,
  User,
  UserCheck,
  Mail,
  Phone,
  Calendar,
  Clock,
  // Technology
  Code,
  Cpu,
  Database,
  Server,
  Cloud,
  Zap,
  Wifi,
  Monitor,
  Smartphone,
  // UI & Navigation
  Home,
  Settings,
  Search,
  Filter,
  Menu,
  MoreHorizontal,
  MoreVertical,
  // Status & Feedback
  CheckCircle,
  CheckCircle2,
  XCircle,
  AlertCircle,
  AlertTriangle,
  Info,
  HelpCircle,
  // Actions
  Edit,
  Trash2,
  Save,
  Download,
  Upload,
  Copy,
  Share2,
  Send,
  // Media
  Image,
  File,
  FileText,
  Folder,
  Video,
  Music,
  // Social & Communication
  MessageSquare,
  MessageCircle,
  Heart,
  ThumbsUp,
  Star,
  // Business Features
  ShoppingCart,
  CreditCard,
  DollarSign,
  TrendingUp,
  TrendingDown,
  BarChart,
  PieChart,
  // Security
  Lock,
  Unlock,
  Shield,
  ShieldCheck,
  Eye,
  EyeOff,
  Key,
  // Nature & Objects
  Sun,
  Moon,
  Sparkles,
  Award,
  Target,
  Flag,
  Bookmark,
  // Shapes & Design
  Circle,
  Square,
  Triangle,
  Layers,
  Layout,
  Grid,
  // Misc
  Bell,
  Gift,
  Lightbulb,
  Compass,
  Map,
  MapPin,
  Globe,
  Link,
  Link2,
  ExternalLink,
  Paperclip,
  Tag,
  Hash,
  AtSign,
  Percent,
  type LucideIcon,
} from "lucide-react";

/**
 * Complete icon map for easy lookup by name
 * 
 * Organized by category for maintainability
 */
export const iconMap: Record<string, LucideIcon> = {
  // Common
  Check,
  X,
  Plus,
  Minus,
  ChevronRight,
  ChevronLeft,
  ChevronUp,
  ChevronDown,
  ArrowRight,
  ArrowLeft,
  ArrowUp,
  ArrowDown,
  // Business & Office
  Briefcase,
  Building,
  Users,
  User,
  UserCheck,
  Mail,
  Phone,
  Calendar,
  Clock,
  // Technology
  Code,
  Cpu,
  Database,
  Server,
  Cloud,
  Zap,
  Wifi,
  Monitor,
  Smartphone,
  // UI & Navigation
  Home,
  Settings,
  Search,
  Filter,
  Menu,
  MoreHorizontal,
  MoreVertical,
  // Status & Feedback
  CheckCircle,
  CheckCircle2,
  XCircle,
  AlertCircle,
  AlertTriangle,
  Info,
  HelpCircle,
  // Actions
  Edit,
  Trash2,
  Save,
  Download,
  Upload,
  Copy,
  Share2,
  Send,
  // Media
  Image,
  File,
  FileText,
  Folder,
  Video,
  Music,
  // Social & Communication
  MessageSquare,
  MessageCircle,
  Heart,
  ThumbsUp,
  Star,
  // Business Features
  ShoppingCart,
  CreditCard,
  DollarSign,
  TrendingUp,
  TrendingDown,
  BarChart,
  PieChart,
  // Security
  Lock,
  Unlock,
  Shield,
  ShieldCheck,
  Eye,
  EyeOff,
  Key,
  // Nature & Objects
  Sun,
  Moon,
  Sparkles,
  Award,
  Target,
  Flag,
  Bookmark,
  // Shapes & Design
  Circle,
  Square,
  Triangle,
  Layers,
  Layout,
  Grid,
  // Misc
  Bell,
  Gift,
  Lightbulb,
  Compass,
  Map,
  MapPin,
  Globe,
  Link,
  Link2,
  ExternalLink,
  Paperclip,
  Tag,
  Hash,
  AtSign,
  Percent,
};

/**
 * Retrieves an icon component by name
 * 
 * @param iconName - The name of the icon to retrieve
 * @returns The LucideIcon component, or null if not found
 * 
 * @example
 * const IconComponent = getIconComponent('Home');
 * // Returns: Home icon component
 */
export function getIconComponent(
  iconName: string | null | undefined
): LucideIcon | null {
  if (!iconName) return null;
  return iconMap[iconName] || null;
}

/**
 * Renders an icon component by name with optional styling
 * 
 * @param iconName - The name of the icon to render
 * @param className - Optional Tailwind CSS classes to apply to the icon
 * @returns The rendered icon element, or null if icon not found
 * 
 * @example
 * renderIcon('Home', 'w-5 h-5 text-blue-500')
 * // Returns: <Home className="w-5 h-5 text-blue-500" />
 */
export function renderIcon(
  iconName: string | null | undefined,
  className?: string
) {
  const IconComponent = getIconComponent(iconName);
  if (!IconComponent) return null;
  return <IconComponent className={className} />;
}

/**
 * Gets the list of all available icon names
 * 
 * @returns Array of all available icon names
 * 
 * @example
 * const icons = getAvailableIcons();
 * // Returns: ['Check', 'X', 'Plus', ...]
 */
export function getAvailableIcons(): string[] {
  return Object.keys(iconMap);
}

// Re-export all icons for direct imports if needed
export {
  Check,
  X,
  Plus,
  Minus,
  ChevronRight,
  ChevronLeft,
  ChevronUp,
  ChevronDown,
  ArrowRight,
  ArrowLeft,
  ArrowUp,
  ArrowDown,
  Briefcase,
  Building,
  Users,
  User,
  UserCheck,
  Mail,
  Phone,
  Calendar,
  Clock,
  Code,
  Cpu,
  Database,
  Server,
  Cloud,
  Zap,
  Wifi,
  Monitor,
  Smartphone,
  Home,
  Settings,
  Search,
  Filter,
  Menu,
  MoreHorizontal,
  MoreVertical,
  CheckCircle,
  CheckCircle2,
  XCircle,
  AlertCircle,
  AlertTriangle,
  Info,
  HelpCircle,
  Edit,
  Trash2,
  Save,
  Download,
  Upload,
  Copy,
  Share2,
  Send,
  Image,
  File,
  FileText,
  Folder,
  Video,
  Music,
  MessageSquare,
  MessageCircle,
  Heart,
  ThumbsUp,
  Star,
  ShoppingCart,
  CreditCard,
  DollarSign,
  TrendingUp,
  TrendingDown,
  BarChart,
  PieChart,
  Lock,
  Unlock,
  Shield,
  ShieldCheck,
  Eye,
  EyeOff,
  Key,
  Sun,
  Moon,
  Sparkles,
  Award,
  Target,
  Flag,
  Bookmark,
  Circle,
  Square,
  Triangle,
  Layers,
  Layout,
  Grid,
  Bell,
  Gift,
  Lightbulb,
  Compass,
  Map,
  MapPin,
  Globe,
  Link,
  Link2,
  ExternalLink,
  Paperclip,
  Tag,
  Hash,
  AtSign,
  Percent,
  type LucideIcon,
};
