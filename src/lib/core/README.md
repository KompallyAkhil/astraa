# Core Services Documentation

This directory contains the core services and utilities for the Astraa Tools application.

## Overview

The core services provide:
- **StorageService**: Persistent data storage with IndexedDB and localStorage fallback
- **SettingsManager**: User preferences and tool settings management
- **Validation**: Input validation and sanitization using Zod schemas

## Services

### StorageService

Provides persistent storage with encryption and compression support.

```typescript
import { storageService } from '@/lib/services'

// Basic usage
await storageService.save('key', data)
const data = await storageService.load('key')

// With options
await storageService.save('sensitive', data, {
  encrypt: true,
  ttl: 24 * 60 * 60 * 1000 // 24 hours
})

// Export/Import
const blob = await storageService.export(['key1', 'key2'])
await storageService.import(file)
```

**Features:**
- IndexedDB primary storage with localStorage fallback
- Optional encryption (basic XOR cipher for obfuscation)
- Optional compression
- TTL (Time To Live) support
- Export/Import functionality
- Automatic cleanup of expired items

### SettingsManager

Manages user preferences and tool-specific settings.

```typescript
import { settingsManager } from '@/lib/services'

// User preferences
const prefs = await settingsManager.getUserPreferences()
await settingsManager.updateUserPreferences({ theme: 'dark' })

// Tool settings
const toolSettings = await settingsManager.getToolSettings('calculator')
await settingsManager.updateToolSettings('calculator', {
  preferences: { precision: 4 }
})

// Usage tracking
await settingsManager.recordToolUsage('calculator')
```

**Features:**
- Type-safe user preferences management
- Tool-specific settings storage
- Usage tracking and analytics
- Settings export/import
- Cache management for performance
- Schema validation with defaults

### Validation

Input validation and sanitization utilities using Zod.

```typescript
import { 
  validateData, 
  sanitizeUserInput, 
  userPreferencesSchema 
} from '@/lib/core/validation'

// Validate data
const validData = validateData(userPreferencesSchema, userInput)

// Sanitize input
const safeInput = sanitizeUserInput(userInput)

// File validation
validateFileUpload(file, ['image/jpeg', 'image/png'], 5 * 1024 * 1024)
```

**Features:**
- Comprehensive Zod schemas for all data types
- XSS prevention through input sanitization
- File upload validation
- Safe validation with error handling
- Custom validation error types

## Types

All TypeScript interfaces are defined in `@/types/core`:

- `UserPreferences`: User settings and preferences
- `ToolSettings`: Tool-specific configuration
- `StorageService`: Storage interface
- `SettingsManager`: Settings management interface
- `AccessibilitySettings`: Accessibility preferences
- `PrivacySettings`: Privacy controls

## Security Considerations

### Data Protection
- All sensitive data can be encrypted before storage
- Input sanitization prevents XSS attacks
- File upload validation prevents malicious files
- TTL support for automatic data expiration

### Privacy
- All data stored locally (no server transmission)
- Optional analytics with user consent
- Clear privacy controls in settings
- Data export/import for user control

## Performance

### Optimization Features
- Caching for frequently accessed settings
- Lazy loading of tool settings
- Efficient IndexedDB operations
- Automatic cleanup of expired data

### Storage Efficiency
- Optional compression for large data
- Smart fallback to localStorage
- Minimal metadata overhead
- Batch operations for exports

## Error Handling

### Validation Errors
```typescript
try {
  const data = validateData(schema, input)
} catch (error) {
  if (error instanceof ValidationError) {
    console.log('Field:', error.field)
    console.log('Code:', error.code)
  }
}
```

### Storage Errors
- Graceful degradation when storage is full
- Automatic fallback between storage mechanisms
- Clear error messages for debugging
- Recovery mechanisms for corrupted data

## Usage Examples

See `example.ts` for comprehensive usage examples including:
- Basic storage operations
- Settings management workflows
- Data validation patterns
- Error handling strategies
- Complete application workflows

## Testing

The services are designed to be easily testable:
- Dependency injection support
- Mock-friendly interfaces
- Clear separation of concerns
- Comprehensive error scenarios

## Migration

When updating schemas or data structures:
1. Update the Zod schema
2. Implement migration logic in the service
3. Test with existing data
4. Provide fallbacks for invalid data

The services automatically handle schema evolution by merging with defaults and validating stored data.