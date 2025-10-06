// User-related type definitions

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  language: string;
  accessibility: AccessibilitySettings;
  privacy: PrivacySettings;
  shortcuts: Record<string, string>;
  toolDefaults: Record<string, unknown>;
  notifications: NotificationSettings;
  layout: LayoutSettings;
}

export interface AccessibilitySettings {
  reducedMotion: boolean;
  highContrast: boolean;
  fontSize: 'small' | 'medium' | 'large' | 'extra-large';
  screenReader: boolean;
  keyboardNavigation: boolean;
  focusIndicators: boolean;
  colorBlindnessSupport: 'none' | 'protanopia' | 'deuteranopia' | 'tritanopia';
}

export interface PrivacySettings {
  analytics: boolean;
  crashReporting: boolean;
  usageTracking: boolean;
  cloudSync: boolean;
  dataRetention: number; // days
  shareUsageData: boolean;
  personalizedRecommendations: boolean;
}

export interface NotificationSettings {
  enabled: boolean;
  types: {
    updates: boolean;
    tips: boolean;
    errors: boolean;
    achievements: boolean;
  };
  frequency: 'immediate' | 'daily' | 'weekly' | 'never';
}

export interface LayoutSettings {
  sidebarCollapsed: boolean;
  toolbarPosition: 'top' | 'bottom' | 'left' | 'right';
  gridView: boolean;
  compactMode: boolean;
  showDescriptions: boolean;
}

export interface ToolData {
  id: string;
  toolId: string;
  name: string;
  data: unknown;
  metadata: ToolDataMetadata;
  settings: Record<string, unknown>;
  shared: boolean;
  shareId?: string;
}

export interface ToolDataMetadata {
  created: Date;
  modified: Date;
  version: string;
  tags: string[];
  size: number;
  checksum?: string;
  encrypted: boolean;
}

export interface ActivityEvent {
  id: string;
  userId?: string;
  toolId: string;
  action: string;
  timestamp: Date;
  metadata: Record<string, unknown>;
  sessionId: string;
  duration?: number;
  success: boolean;
}

export interface UsageAnalytics {
  toolUsage: Record<string, number>;
  featureUsage: Record<string, number>;
  errorRates: Record<string, number>;
  performanceMetrics: PerformanceMetrics;
  userJourney: UserJourneyStep[];
  satisfaction: SatisfactionMetrics;
}

export interface PerformanceMetrics {
  loadTime: number;
  renderTime: number;
  memoryUsage: number;
  bundleSize: number;
  cacheHitRate: number;
  errorRate: number;
  throughput: number;
}

export interface UserJourneyStep {
  step: string;
  timestamp: Date;
  toolId?: string;
  action: string;
  duration: number;
  success: boolean;
}

export interface SatisfactionMetrics {
  overallRating: number;
  toolRatings: Record<string, number>;
  feedbackCount: number;
  npsScore?: number;
}

export interface UserProfile {
  id: string;
  email?: string;
  name?: string;
  avatar?: string;
  preferences: UserPreferences;
  subscription: SubscriptionInfo;
  stats: UserStats;
  achievements: Achievement[];
}

export interface SubscriptionInfo {
  plan: 'free' | 'pro' | 'enterprise';
  status: 'active' | 'inactive' | 'cancelled' | 'expired';
  startDate: Date;
  endDate?: Date;
  features: string[];
}

export interface UserStats {
  toolsUsed: number;
  totalSessions: number;
  totalTime: number;
  dataProcessed: number;
  joinDate: Date;
  lastActive: Date;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt: Date;
  category: 'usage' | 'productivity' | 'exploration' | 'social';
}