// Settings management service
import { UserPreferences, ToolData } from '@/types';
import { STORAGE_KEYS } from '@/config';
import { StorageService } from './storage';

export interface SettingsManager {
  getUserPreferences(): Promise<UserPreferences>;
  updatePreferences(updates: Partial<UserPreferences>): Promise<void>;
  getToolSettings(toolId: string): Promise<Record<string, unknown>>;
  updateToolSettings(toolId: string, settings: Partial<Record<string, unknown>>): Promise<void>;
  resetToDefaults(): Promise<void>;
}

export class DefaultSettingsManager implements SettingsManager {
  constructor(private storage: StorageService) {}

  private getDefaultPreferences(): UserPreferences {
    return {
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
        crashReporting: true,
        usageTracking: false,
        cloudSync: false,
      },
      shortcuts: {},
      toolDefaults: {},
    };
  }

  async getUserPreferences(): Promise<UserPreferences> {
    const stored = await this.storage.load<UserPreferences>(STORAGE_KEYS.USER_PREFERENCES);
    if (!stored) {
      const defaults = this.getDefaultPreferences();
      await this.storage.save(STORAGE_KEYS.USER_PREFERENCES, defaults);
      return defaults;
    }
    return { ...this.getDefaultPreferences(), ...stored };
  }

  async updatePreferences(updates: Partial<UserPreferences>): Promise<void> {
    const current = await this.getUserPreferences();
    const updated = { ...current, ...updates };
    await this.storage.save(STORAGE_KEYS.USER_PREFERENCES, updated);
  }

  async getToolSettings(toolId: string): Promise<Record<string, unknown>> {
    const toolData = await this.storage.load<ToolData[]>(STORAGE_KEYS.TOOL_DATA) || [];
    const tool = toolData.find(t => t.toolId === toolId);
    return tool?.settings || {};
  }

  async updateToolSettings(toolId: string, settings: Partial<Record<string, unknown>>): Promise<void> {
    const toolData = await this.storage.load<ToolData[]>(STORAGE_KEYS.TOOL_DATA) || [];
    const toolIndex = toolData.findIndex(t => t.toolId === toolId);
    
    if (toolIndex >= 0) {
      toolData[toolIndex].settings = { ...toolData[toolIndex].settings, ...settings };
      toolData[toolIndex].metadata.modified = new Date();
    } else {
      const newToolData: ToolData = {
        id: crypto.randomUUID(),
        toolId,
        name: `${toolId} Settings`,
        data: null,
        metadata: {
          created: new Date(),
          modified: new Date(),
          version: '1.0.0',
          tags: [],
        },
        settings,
      };
      toolData.push(newToolData);
    }
    
    await this.storage.save(STORAGE_KEYS.TOOL_DATA, toolData);
  }

  async resetToDefaults(): Promise<void> {
    const defaults = this.getDefaultPreferences();
    await this.storage.save(STORAGE_KEYS.USER_PREFERENCES, defaults);
  }
}