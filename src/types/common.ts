// Common type definitions used across the application

export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ApiResponse<T = unknown> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
  timestamp: Date;
  requestId?: string;
}

export interface PaginatedResponse<T = unknown> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export interface AsyncState<T = unknown> {
  data: T | null;
  loading: LoadingState;
  error: string | null;
  lastUpdated?: Date;
}

export interface ErrorContext {
  component?: string;
  action?: string;
  userId?: string;
  sessionId: string;
  timestamp: Date;
  userAgent: string;
  url: string;
  additionalData?: Record<string, unknown>;
}

export interface ErrorReporter {
  reportError(error: Error, context: ErrorContext): void;
  reportPerformanceIssue(metric: PerformanceMetric): void;
  reportUserFeedback(feedback: UserFeedback): void;
}

export interface PerformanceMetric {
  name: string;
  value: number;
  unit: string;
  timestamp: Date;
  context?: Record<string, unknown>;
}

export interface UserFeedback {
  id: string;
  type: 'bug' | 'feature' | 'improvement' | 'general';
  rating?: number;
  message: string;
  email?: string;
  timestamp: Date;
  resolved: boolean;
  metadata?: Record<string, unknown>;
}

export interface CacheEntry<T = unknown> {
  key: string;
  data: T;
  timestamp: Date;
  ttl: number;
  size: number;
}

export interface CacheManager {
  get<T>(key: string): Promise<T | null>;
  set<T>(key: string, data: T, ttl?: number): Promise<void>;
  delete(key: string): Promise<void>;
  clear(): Promise<void>;
  size(): Promise<number>;
  keys(): Promise<string[]>;
}

// Re-export types from other modules for convenience
export type { ToolPlugin, ToolConfig, ToolMetadata } from './tools';