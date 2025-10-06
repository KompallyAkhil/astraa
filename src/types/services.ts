// Service-related type definitions

export interface CloudSyncService {
  isEnabled(): boolean;
  sync(): Promise<SyncResult>;
  upload(data: unknown, key: string): Promise<void>;
  download(key: string): Promise<unknown>;
  delete(key: string): Promise<void>;
  getConflicts(): Promise<SyncConflict[]>;
  resolveConflict(conflictId: string, resolution: ConflictResolution): Promise<void>;
}

export interface SyncResult {
  success: boolean;
  uploaded: number;
  downloaded: number;
  conflicts: number;
  errors: SyncError[];
  timestamp: Date;
}

export interface SyncConflict {
  id: string;
  key: string;
  localData: unknown;
  remoteData: unknown;
  localTimestamp: Date;
  remoteTimestamp: Date;
  type: 'data' | 'settings' | 'preferences';
}

export interface ConflictResolution {
  strategy: 'local' | 'remote' | 'merge' | 'manual';
  mergedData?: unknown;
}

export interface SyncError {
  key: string;
  message: string;
  code: string;
  retryable: boolean;
}

export interface AIService {
  generateText(prompt: string, options?: AIGenerationOptions): Promise<string>;
  enhanceText(text: string, enhancement: TextEnhancement): Promise<string>;
  analyzeText(text: string): Promise<TextAnalysis>;
  isAvailable(): boolean;
  getRemainingQuota(): Promise<number>;
}

export interface AIGenerationOptions {
  maxTokens?: number;
  temperature?: number;
  model?: string;
  context?: string;
}

export type TextEnhancement = 
  | 'grammar'
  | 'clarity'
  | 'tone'
  | 'length'
  | 'formality'
  | 'creativity';

export interface TextAnalysis {
  sentiment: 'positive' | 'negative' | 'neutral';
  readabilityScore: number;
  wordCount: number;
  keyPhrases: string[];
  language: string;
  topics: string[];
}

export interface NotificationService {
  show(notification: NotificationOptions): Promise<void>;
  showError(message: string, details?: string): Promise<void>;
  showSuccess(message: string): Promise<void>;
  showWarning(message: string): Promise<void>;
  showInfo(message: string): Promise<void>;
  requestPermission(): Promise<boolean>;
  isSupported(): boolean;
}

export interface NotificationOptions {
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  duration?: number;
  actions?: NotificationAction[];
  persistent?: boolean;
}

export interface NotificationAction {
  label: string;
  action: () => void;
  primary?: boolean;
}

export interface AnalyticsService {
  track(event: AnalyticsEvent): void;
  identify(userId: string, traits?: Record<string, unknown>): void;
  page(name: string, properties?: Record<string, unknown>): void;
  setUserProperties(properties: Record<string, unknown>): void;
  flush(): Promise<void>;
  isEnabled(): boolean;
}

export interface AnalyticsEvent {
  name: string;
  properties?: Record<string, unknown>;
  timestamp?: Date;
  userId?: string;
  sessionId?: string;
}

export interface SecurityService {
  encrypt(data: string, key?: string): Promise<string>;
  decrypt(encryptedData: string, key?: string): Promise<string>;
  hash(data: string, algorithm?: HashAlgorithm): Promise<string>;
  generateKey(): Promise<string>;
  validateInput(input: string, rules: ValidationRule[]): ValidationResult;
  sanitizeHtml(html: string): string;
}

export type HashAlgorithm = 'sha256' | 'sha512' | 'md5' | 'sha1';

export interface ValidationRule {
  type: 'required' | 'minLength' | 'maxLength' | 'pattern' | 'email' | 'url' | 'custom';
  value?: unknown;
  message: string;
  validator?: (input: string) => boolean;
}

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

export interface BackupService {
  createBackup(): Promise<BackupInfo>;
  restoreBackup(backupId: string): Promise<void>;
  listBackups(): Promise<BackupInfo[]>;
  deleteBackup(backupId: string): Promise<void>;
  scheduleBackup(schedule: BackupSchedule): Promise<void>;
  exportBackup(backupId: string): Promise<Blob>;
}

export interface BackupInfo {
  id: string;
  name: string;
  size: number;
  created: Date;
  type: 'manual' | 'automatic';
  dataTypes: string[];
  compressed: boolean;
}

export interface BackupSchedule {
  enabled: boolean;
  frequency: 'daily' | 'weekly' | 'monthly';
  time: string; // HH:MM format
  retention: number; // days
}