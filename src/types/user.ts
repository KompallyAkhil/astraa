// User-related type definitions

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  language: string;
  accessibility: AccessibilitySettings;
  privacy: PrivacySettings;
  shortcuts: Record<string, string>;
  toolDefaults: Record<string, unknown>;
}

export interface AccessibilitySettings {
  reducedMotion: boolean;
  highContrast: boolean;
  fontSize: 'small' | 'medium' | 'large';
  screenReader: boolean;
}

export interface PrivacySettings {
  analytics: boolean;
  crashReporting: boolean;
  usageTracking: boolean;
  cloudSync: boolean;
}

export interface ToolData {
  id: string;
  toolId: string;
  name: string;
  data: unknown;
  metadata: {
    created: Date;
    modified: Date;
    version: string;
    tags: string[];
  };
  settings: Record<string, unknown>;
}

export interface ActivityEvent {
  id: string;
  userId?: string;
  toolId: string;
  action: string;
  timestamp: Date;
  metadata: Record<string, unknown>;
  sessionId: string;
}

export interface UsageAnalytics {
  toolUsage: Record<string, number>;
  featureUsage: Record<string, number>;
  errorRates: Record<string, number>;
  performanceMetrics: PerformanceMetrics;
}

export interface PerformanceMetrics {
  loadTime: number;
  renderTime: number;
  memoryUsage: number;
  bundleSize: number;
}