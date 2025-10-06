// Configuration-related type definitions

export interface AppConfig {
  name: string;
  version: string;
  environment: 'development' | 'staging' | 'production';
  features: FeatureFlags;
  api: ApiConfig;
  storage: StorageConfig;
  analytics: AnalyticsConfig;
  security: SecurityConfig;
  ui: UIConfig;
}

export interface FeatureFlags {
  aiIntegration: boolean;
  cloudSync: boolean;
  analytics: boolean;
  collaboration: boolean;
  advancedTools: boolean;
  betaFeatures: boolean;
  experimentalFeatures: boolean;
}

export interface ApiConfig {
  baseUrl: string;
  timeout: number;
  retries: number;
  rateLimit: {
    requests: number;
    window: number; // milliseconds
  };
  endpoints: Record<string, string>;
}

export interface StorageConfig {
  type: 'localStorage' | 'indexedDB' | 'memory';
  encryption: boolean;
  compression: boolean;
  maxSize: number; // bytes
  ttl: number; // milliseconds
  backup: {
    enabled: boolean;
    frequency: number; // milliseconds
    retention: number; // days
  };
}

export interface AnalyticsConfig {
  enabled: boolean;
  provider: 'google' | 'mixpanel' | 'amplitude' | 'custom';
  trackingId?: string;
  anonymizeIp: boolean;
  cookieConsent: boolean;
  events: {
    pageViews: boolean;
    interactions: boolean;
    errors: boolean;
    performance: boolean;
  };
}

export interface SecurityConfig {
  csp: {
    enabled: boolean;
    directives: Record<string, string[]>;
  };
  encryption: {
    algorithm: string;
    keySize: number;
  };
  validation: {
    strict: boolean;
    sanitization: boolean;
  };
  rateLimit: {
    enabled: boolean;
    requests: number;
    window: number;
  };
}

export interface UIConfig {
  theme: {
    default: 'light' | 'dark' | 'system';
    customThemes: boolean;
  };
  layout: {
    sidebar: boolean;
    breadcrumbs: boolean;
    footer: boolean;
  };
  animations: {
    enabled: boolean;
    duration: number;
    easing: string;
  };
  accessibility: {
    highContrast: boolean;
    reducedMotion: boolean;
    focusIndicators: boolean;
  };
}

export interface ToolRegistryConfig {
  autoDiscovery: boolean;
  lazyLoading: boolean;
  categories: string[];
  defaultCategory: string;
  validation: {
    strict: boolean;
    schema: boolean;
  };
}

export interface PerformanceConfig {
  bundleSize: {
    maxSize: number;
    warnings: boolean;
  };
  caching: {
    enabled: boolean;
    strategy: 'aggressive' | 'conservative' | 'custom';
    ttl: number;
  };
  optimization: {
    codesplitting: boolean;
    treeshaking: boolean;
    minification: boolean;
  };
  monitoring: {
    enabled: boolean;
    metrics: string[];
    alerts: boolean;
  };
}

export interface TestingConfig {
  unit: {
    framework: 'jest' | 'vitest';
    coverage: {
      threshold: number;
      reports: string[];
    };
  };
  integration: {
    framework: 'playwright' | 'cypress';
    browsers: string[];
  };
  accessibility: {
    enabled: boolean;
    standards: 'wcag2a' | 'wcag2aa' | 'wcag2aaa';
  };
  performance: {
    enabled: boolean;
    budgets: Record<string, number>;
  };
}

export interface DeploymentConfig {
  target: 'static' | 'server' | 'edge';
  cdn: {
    enabled: boolean;
    provider?: string;
    caching: boolean;
  };
  monitoring: {
    enabled: boolean;
    provider?: string;
    alerts: boolean;
  };
  security: {
    headers: Record<string, string>;
    certificates: boolean;
  };
}