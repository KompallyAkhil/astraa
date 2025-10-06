// Core type definitions that bring together all essential interfaces
// This file serves as a comprehensive reference for the main types used throughout the application

import type { 
  ToolPlugin, 
  ToolConfig, 
  ToolMetadata, 
  ToolComponentProps,
  ToolIntegration,
  ToolSettings,
  KeyboardShortcut,
  ExportFormat,
  ImportFormat
} from './tools';

import type {
  UserPreferences,
  AccessibilitySettings,
  PrivacySettings,
  ToolData,
  ActivityEvent,
  UsageAnalytics,
  UserProfile
} from './user';

import type {
  StorageService,
  SettingsManager,
  ErrorReporter,
  CacheManager
} from './common';

import type {
  CloudSyncService,
  AIService,
  NotificationService,
  AnalyticsService,
  SecurityService
} from './services';

import type {
  AppConfig,
  FeatureFlags,
  PerformanceConfig
} from './config';

// Core application interfaces that combine multiple type domains
export interface ApplicationContext {
  config: AppConfig;
  user: UserProfile;
  tools: ToolRegistry;
  services: ServiceRegistry;
  storage: StorageService;
  settings: SettingsManager;
}

export interface ToolRegistry {
  plugins: Map<string, ToolPlugin>;
  categories: Map<string, ToolPlugin[]>;
  register(plugin: ToolPlugin): void;
  unregister(pluginId: string): void;
  get(pluginId: string): ToolPlugin | undefined;
  getByCategory(category: string): ToolPlugin[];
  search(query: string): ToolPlugin[];
  validate(plugin: ToolPlugin): ValidationResult;
}

export interface ServiceRegistry {
  storage: StorageService;
  settings: SettingsManager;
  cache: CacheManager;
  error: ErrorReporter;
  notification: NotificationService;
  analytics?: AnalyticsService;
  ai?: AIService;
  cloudSync?: CloudSyncService;
  security: SecurityService;
}

export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
}

export interface ValidationError {
  field: string;
  message: string;
  code: string;
  severity: 'error' | 'warning';
}

export interface ValidationWarning {
  field: string;
  message: string;
  code: string;
}

// State management interfaces
export interface AppState {
  user: UserState;
  tools: ToolsState;
  ui: UIState;
  system: SystemState;
}

export interface UserState {
  profile: UserProfile | null;
  preferences: UserPreferences;
  isAuthenticated: boolean;
  loading: boolean;
}

export interface ToolsState {
  activeTools: string[];
  toolData: Map<string, ToolData>;
  recentlyUsed: string[];
  favorites: string[];
  loading: boolean;
}

export interface UIState {
  theme: 'light' | 'dark' | 'system';
  sidebarOpen: boolean;
  commandMenuOpen: boolean;
  notifications: Notification[];
  modals: Modal[];
  loading: boolean;
}

export interface SystemState {
  online: boolean;
  performance: PerformanceMetrics;
  errors: SystemError[];
  maintenance: boolean;
}

export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actions?: NotificationAction[];
}

export interface NotificationAction {
  label: string;
  action: () => void;
  primary?: boolean;
}

export interface Modal {
  id: string;
  type: string;
  props: Record<string, unknown>;
  closable: boolean;
}

export interface SystemError {
  id: string;
  message: string;
  stack?: string;
  timestamp: Date;
  context: Record<string, unknown>;
  resolved: boolean;
}

export interface PerformanceMetrics {
  loadTime: number;
  renderTime: number;
  memoryUsage: number;
  bundleSize: number;
  cacheHitRate: number;
  errorRate: number;
}

// Event system interfaces
export interface EventBus {
  emit<T = unknown>(event: string, data?: T): void;
  on<T = unknown>(event: string, handler: EventHandler<T>): () => void;
  off(event: string, handler: EventHandler): void;
  once<T = unknown>(event: string, handler: EventHandler<T>): void;
}

export type EventHandler<T = unknown> = (data: T) => void;

// Plugin system interfaces
export interface PluginManager {
  register(plugin: Plugin): void;
  unregister(pluginId: string): void;
  get(pluginId: string): Plugin | undefined;
  getAll(): Plugin[];
  isEnabled(pluginId: string): boolean;
  enable(pluginId: string): void;
  disable(pluginId: string): void;
}

export interface Plugin {
  id: string;
  name: string;
  version: string;
  description: string;
  author: string;
  dependencies: string[];
  permissions: string[];
  activate(): Promise<void>;
  deactivate(): Promise<void>;
  configure?(config: Record<string, unknown>): void;
}

// Re-export all essential types for convenience
export type {
  // Tools
  ToolPlugin,
  ToolConfig,
  ToolMetadata,
  ToolComponentProps,
  ToolIntegration,
  ToolSettings,
  KeyboardShortcut,
  ExportFormat,
  ImportFormat,
  
  // User
  UserPreferences,
  AccessibilitySettings,
  PrivacySettings,
  ToolData,
  ActivityEvent,
  UsageAnalytics,
  UserProfile,
  
  // Services
  StorageService,
  SettingsManager,
  ErrorReporter,
  CacheManager,
  CloudSyncService,
  AIService,
  NotificationService,
  AnalyticsService,
  SecurityService,
  
  // Config
  AppConfig,
  FeatureFlags,
  PerformanceConfig
};