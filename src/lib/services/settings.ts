/**
 * SettingsManager for user preferences and tool settings
 */

import type { SettingsManager, UserPreferences, ToolSettings } from '@/types/core'
import { storageService } from './storage'
import { 
  validateData, 
  userPreferencesSchema, 
  toolSettingsSchema,
  ValidationError 
} from '@/lib/core/validation'

const USER_PREFERENCES_KEY = 'user_preferences'
const TOOL_SETTINGS_PREFIX = 'tool_settings_'

/**
 * Default user preferences
 */
const DEFAULT_USER_PREFERENCES: UserPreferences = {
  theme: 'system',
  language: 'en',
  accessibility: {
    reducedMotion: false,
    highContrast: false,
    fontSize: 'medium',
    screenReader: false,
  },
  privacy: {
    analytics: false,
    errorReporting: true,
    cloudSync: false,
    dataRetention: 30,
  },
  shortcuts: {},
  toolDefaults: {},
}

/**
 * Creates default tool settings
 */
function createDefaultToolSettings(toolId: string): ToolSettings {
  return {
    id: toolId,
    preferences: {},
    shortcuts: {},
    lastUsed: new Date(),
    usageCount: 0,
  }
}

/**
 * SettingsManager implementation
 */
class SettingsManagerImpl implements SettingsManager {
  private userPreferencesCache: UserPreferences | null = null
  private toolSettingsCache = new Map<string, ToolSettings>()

  async getUserPreferences(): Promise<UserPreferences> {
    if (this.userPreferencesCache) {
      return this.userPreferencesCache
    }

    try {
      const stored = await storageService.load<UserPreferences>(USER_PREFERENCES_KEY)
      
      if (stored) {
        // Validate and merge with defaults to handle schema changes
        const merged = {
          ...DEFAULT_USER_PREFERENCES,
          ...stored,
          accessibility: { ...DEFAULT_USER_PREFERENCES.accessibility, ...stored.accessibility },
          privacy: { ...DEFAULT_USER_PREFERENCES.privacy, ...stored.privacy },
        }
        const validated = validateData(userPreferencesSchema, merged) as UserPreferences
        this.userPreferencesCache = validated
        return validated
      }
    } catch (error) {
      console.warn('Failed to load user preferences, using defaults:', error)
    }

    // Return defaults if no stored preferences or validation failed
    this.userPreferencesCache = DEFAULT_USER_PREFERENCES
    return DEFAULT_USER_PREFERENCES
  }

  async updateUserPreferences(updates: Partial<UserPreferences>): Promise<void> {
    const current = await this.getUserPreferences()
    
    // Deep merge the updates
    const updated: UserPreferences = {
      ...current,
      ...updates,
      accessibility: {
        ...current.accessibility,
        ...(updates.accessibility || {}),
      },
      privacy: {
        ...current.privacy,
        ...(updates.privacy || {}),
      },
      shortcuts: {
        ...current.shortcuts,
        ...(updates.shortcuts || {}),
      },
      toolDefaults: {
        ...current.toolDefaults,
        ...(updates.toolDefaults || {}),
      },
    }

    // Validate the updated preferences
    const validated = validateData(userPreferencesSchema, updated) as UserPreferences

    // Save to storage
    await storageService.save(USER_PREFERENCES_KEY, validated)
    
    // Update cache
    this.userPreferencesCache = validated
  }

  async getToolSettings(toolId: string): Promise<ToolSettings | null> {
    if (!toolId) {
      throw new ValidationError('Tool ID is required')
    }

    // Check cache first
    if (this.toolSettingsCache.has(toolId)) {
      return this.toolSettingsCache.get(toolId)!
    }

    try {
      const key = `${TOOL_SETTINGS_PREFIX}${toolId}`
      const stored = await storageService.load<ToolSettings>(key)
      
      if (stored) {
        // Validate stored settings
        const validated = validateData(toolSettingsSchema, {
          ...createDefaultToolSettings(toolId),
          ...stored,
          id: toolId, // Ensure ID matches
        }) as ToolSettings
        
        this.toolSettingsCache.set(toolId, validated)
        return validated
      }
    } catch (error) {
      console.warn(`Failed to load settings for tool ${toolId}:`, error)
    }

    return null
  }

  async updateToolSettings(toolId: string, settings: Partial<ToolSettings>): Promise<void> {
    if (!toolId) {
      throw new ValidationError('Tool ID is required')
    }

    // Get current settings or create defaults
    const current = await this.getToolSettings(toolId) || createDefaultToolSettings(toolId)
    
    // Merge updates
    const updated: ToolSettings = {
      ...current,
      ...settings,
      id: toolId, // Ensure ID is correct
      preferences: {
        ...current.preferences,
        ...(settings.preferences || {}),
      },
      shortcuts: {
        ...current.shortcuts,
        ...(settings.shortcuts || {}),
      },
    }

    // Validate the updated settings
    const validated = validateData(toolSettingsSchema, updated) as ToolSettings

    // Save to storage
    const key = `${TOOL_SETTINGS_PREFIX}${toolId}`
    await storageService.save(key, validated)
    
    // Update cache
    this.toolSettingsCache.set(toolId, validated)
  }

  async resetToDefaults(): Promise<void> {
    // Clear user preferences
    await storageService.delete(USER_PREFERENCES_KEY)
    this.userPreferencesCache = null

    // Clear all tool settings
    const keys = await storageService.keys()
    const toolSettingsKeys = keys.filter(key => key.startsWith(TOOL_SETTINGS_PREFIX))
    
    for (const key of toolSettingsKeys) {
      await storageService.delete(key)
    }
    
    this.toolSettingsCache.clear()
  }

  async exportSettings(): Promise<Blob> {
    const keys = await storageService.keys()
    const settingsKeys = keys.filter(key => 
      key === USER_PREFERENCES_KEY || key.startsWith(TOOL_SETTINGS_PREFIX)
    )
    
    return storageService.export(settingsKeys)
  }

  async importSettings(file: File): Promise<void> {
    try {
      const imported = await storageService.import(file)
      
      // Validate imported data
      for (const [key, value] of Object.entries(imported)) {
        if (key === USER_PREFERENCES_KEY) {
          validateData(userPreferencesSchema, value)
        } else if (key.startsWith(TOOL_SETTINGS_PREFIX)) {
          validateData(toolSettingsSchema, value)
        }
      }
      
      // Clear caches to force reload
      this.userPreferencesCache = null
      this.toolSettingsCache.clear()
      
    } catch (error) {
      throw new ValidationError('Invalid settings file format')
    }
  }

  /**
   * Utility method to increment tool usage count
   */
  async recordToolUsage(toolId: string): Promise<void> {
    const current = await this.getToolSettings(toolId) || createDefaultToolSettings(toolId)
    
    await this.updateToolSettings(toolId, {
      lastUsed: new Date(),
      usageCount: current.usageCount + 1,
    })
  }

  /**
   * Get all tool settings for analytics or management
   */
  async getAllToolSettings(): Promise<ToolSettings[]> {
    const keys = await storageService.keys()
    const toolSettingsKeys = keys.filter(key => key.startsWith(TOOL_SETTINGS_PREFIX))
    
    const allSettings: ToolSettings[] = []
    
    for (const key of toolSettingsKeys) {
      const toolId = key.substring(TOOL_SETTINGS_PREFIX.length)
      const settings = await this.getToolSettings(toolId)
      if (settings) {
        allSettings.push(settings)
      }
    }
    
    return allSettings
  }

  /**
   * Clear cache (useful for testing or manual refresh)
   */
  clearCache(): void {
    this.userPreferencesCache = null
    this.toolSettingsCache.clear()
  }
}

// Export the default instance
export const settingsManager = new SettingsManagerImpl()

// Export the class for testing
export { SettingsManagerImpl }