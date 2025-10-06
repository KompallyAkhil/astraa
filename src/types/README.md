# Type Definitions Documentation

This directory contains comprehensive TypeScript type definitions for the astraa utility tools suite. The types are organized into logical modules to maintain clarity and enable easy maintenance.

## File Structure

### Core Files

- **`index.ts`** - Main export file that re-exports all type definitions
- **`core.ts`** - Central interfaces that combine multiple type domains
- **`common.ts`** - Common types used across the application

### Domain-Specific Files

- **`tools.ts`** - Tool-related interfaces and types
- **`user.ts`** - User preferences, data, and analytics types
- **`services.ts`** - Service layer interfaces
- **`config.ts`** - Configuration and settings types

## Key Interfaces

### Tool System

#### `ToolPlugin`
The main interface for tool plugins that defines the structure of each tool in the system.

```typescript
interface ToolPlugin {
  id: string;
  name: string;
  description: string;
  category: ToolCategory;
  icon: LucideIcon;
  component: React.ComponentType<ToolComponentProps>;
  config: ToolConfig;
  metadata: ToolMetadata;
  integration?: ToolIntegration;
  permissions?: ToolPermissions;
}
```

#### `ToolConfig`
Configuration interface for tool settings, shortcuts, and data formats.

#### `ToolIntegration`
Enables data sharing between compatible tools.

### User Management

#### `UserPreferences`
Comprehensive user preferences including theme, accessibility, privacy, and layout settings.

#### `ToolData`
Structure for storing user data within tools, including metadata and sharing capabilities.

#### `ActivityEvent`
Tracks user interactions for analytics and usage insights.

### Services

#### `StorageService`
Interface for data persistence with support for multiple storage backends.

#### `SettingsManager`
Manages user preferences and tool settings with persistence.

#### `CloudSyncService`
Optional cloud synchronization with conflict resolution.

#### `AIService`
AI integration for text-based tools with quota management.

### Configuration

#### `AppConfig`
Main application configuration including feature flags and service settings.

#### `FeatureFlags`
Toggle features like AI integration, cloud sync, and experimental features.

## Type Categories

### 1. Core Application Types
- `ApplicationContext` - Main application context
- `ToolRegistry` - Tool management system
- `ServiceRegistry` - Service container

### 2. State Management Types
- `AppState` - Global application state
- `UserState` - User-specific state
- `ToolsState` - Tool-related state
- `UIState` - UI component state

### 3. Event System Types
- `EventBus` - Event system interface
- `EventHandler` - Event handler type

### 4. Plugin System Types
- `PluginManager` - Plugin management
- `Plugin` - Plugin interface

## Usage Examples

### Implementing a Tool Plugin

```typescript
import type { ToolPlugin, ToolComponentProps } from '@/types';

const MyTool: React.FC<ToolComponentProps> = ({ config, onDataChange, onError }) => {
  // Tool implementation
};

const myToolPlugin: ToolPlugin = {
  id: 'my-tool',
  name: 'My Tool',
  description: 'A sample tool',
  category: 'utility',
  icon: MyIcon,
  component: MyTool,
  config: {
    settings: {},
    shortcuts: [],
    exportFormats: [],
    importFormats: []
  },
  metadata: {
    id: 'my-tool',
    name: 'My Tool',
    description: 'A sample tool',
    category: 'utility',
    icon: MyIcon,
    version: '1.0.0',
    tags: ['utility'],
    created: new Date(),
    modified: new Date()
  }
};
```

### Using Storage Service

```typescript
import type { StorageService } from '@/types';

class MyStorageService implements StorageService {
  async save<T>(key: string, data: T): Promise<void> {
    // Implementation
  }
  
  async load<T>(key: string): Promise<T | null> {
    // Implementation
  }
  
  // ... other methods
}
```

### Managing User Preferences

```typescript
import type { UserPreferences, SettingsManager } from '@/types';

const updateUserTheme = async (
  settingsManager: SettingsManager, 
  theme: 'light' | 'dark' | 'system'
) => {
  const preferences = await settingsManager.getUserPreferences();
  await settingsManager.updatePreferences({
    ...preferences,
    theme
  });
};
```

## Type Safety Guidelines

1. **Always use strict TypeScript** - All interfaces use strict typing with no `any` types
2. **Prefer interfaces over types** - Use interfaces for object shapes, types for unions
3. **Use generic types** - Leverage generics for reusable interfaces
4. **Document complex types** - Add JSDoc comments for complex interfaces
5. **Export consistently** - Always export through the main index.ts file

## Extension Points

The type system is designed to be extensible:

1. **Tool Categories** - Add new categories to `ToolCategory` union
2. **Service Interfaces** - Extend service interfaces for new functionality
3. **User Preferences** - Add new preference categories to `UserPreferences`
4. **Configuration** - Extend `AppConfig` for new configuration options

## Validation

All types include validation interfaces where appropriate:

- `ValidationResult` - Standard validation result format
- `ValidationRule` - Input validation rules
- `ValidationSchema` - Schema-based validation

## Performance Considerations

- Types are organized to minimize circular dependencies
- Large interfaces are split into smaller, focused interfaces
- Optional properties are used to reduce memory footprint
- Generic types enable type reuse without duplication

## Migration Guide

When updating types:

1. Check for breaking changes in dependent code
2. Update related interfaces consistently
3. Add deprecation notices for removed properties
4. Provide migration utilities for complex changes
5. Update documentation and examples