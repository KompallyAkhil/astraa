/**
 * Core type definitions for the application
 */

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system'
  language: string
  accessibility: AccessibilitySettings
  privacy: PrivacySettings
  shortcuts: Record<string, string>
  toolDefaults: Record<string, any>
}

export interface AccessibilitySettings {
  reducedMotion: boolean
  highContrast: boolean
  fontSize: 'small' | 'medium' | 'large'
  screenReader: boolean
}

export interface PrivacySettings {
  analytics: boolean
  errorReporting: boolean
  cloudSync: boolean
  dataRetention: number // days
}

export interface ToolSettings {
  id: string
  preferences: Record<string, any>
  shortcuts: Record<string, string>
  lastUsed: Date
  usageCount: number
}

export interface StorageOptions {
  encrypt?: boolean
  compress?: boolean
  ttl?: number // time to live in milliseconds
}

export interface StorageItem<T = any> {
  data: T
  metadata: {
    created: Date
    modified: Date
    version: string
    encrypted: boolean
    compressed: boolean
    ttl?: number
  }
}

export type StorageKey = string
export type StorageValue = any

export interface StorageService {
  save<T>(key: StorageKey, data: T, options?: StorageOptions): Promise<void>
  load<T>(key: StorageKey): Promise<T | null>
  delete(key: StorageKey): Promise<void>
  clear(): Promise<void>
  keys(): Promise<StorageKey[]>
  export(keys?: StorageKey[]): Promise<Blob>
  import(file: File): Promise<Record<StorageKey, any>>
  size(): Promise<number>
}

export interface SettingsManager {
  getUserPreferences(): Promise<UserPreferences>
  updateUserPreferences(updates: Partial<UserPreferences>): Promise<void>
  getToolSettings(toolId: string): Promise<ToolSettings | null>
  updateToolSettings(toolId: string, settings: Partial<ToolSettings>): Promise<void>
  resetToDefaults(): Promise<void>
  exportSettings(): Promise<Blob>
  importSettings(file: File): Promise<void>
}