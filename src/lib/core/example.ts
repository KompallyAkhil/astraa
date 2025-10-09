/**
 * Example usage of the core services
 * This file demonstrates how to use the StorageService, SettingsManager, and validation utilities
 */

import { storageService, settingsManager } from '@/lib/services'
import { validateData, userPreferencesSchema, sanitizeUserInput } from '@/lib/core/validation'
import type { UserPreferences } from '@/types/core'

/**
 * Example: Basic storage operations
 */
export async function storageExample() {
  // Save some data
  await storageService.save('user_data', { name: 'John', age: 30 })
  
  // Save with encryption and TTL
  await storageService.save('sensitive_data', { token: 'secret123' }, {
    encrypt: true,
    ttl: 24 * 60 * 60 * 1000 // 24 hours
  })
  
  // Load data
  const userData = await storageService.load('user_data')
  console.log('User data:', userData)
  
  // Export data
  const exportBlob = await storageService.export(['user_data'])
  console.log('Export size:', exportBlob.size)
}

/**
 * Example: Settings management
 */
export async function settingsExample() {
  // Get current user preferences (will return defaults if none exist)
  const preferences = await settingsManager.getUserPreferences()
  console.log('Current preferences:', preferences)
  
  // Update theme preference
  await settingsManager.updateUserPreferences({
    theme: 'dark',
    accessibility: {
      ...preferences.accessibility,
      reducedMotion: true
    }
  })
  
  // Record tool usage
  await settingsManager.recordToolUsage('calculator')
  
  // Get tool settings
  const calculatorSettings = await settingsManager.getToolSettings('calculator')
  console.log('Calculator settings:', calculatorSettings)
  
  // Update tool preferences
  await settingsManager.updateToolSettings('calculator', {
    preferences: {
      precision: 4,
      showHistory: true
    }
  })
}

/**
 * Example: Data validation
 */
export async function validationExample() {
  // Validate user preferences
  const userInput = {
    theme: 'dark',
    language: 'en',
    accessibility: {
      reducedMotion: true,
      highContrast: false,
      fontSize: 'large',
      screenReader: false
    },
    privacy: {
      analytics: false,
      errorReporting: true,
      cloudSync: false,
      dataRetention: 30
    },
    shortcuts: {},
    toolDefaults: {}
  }
  
  try {
    const validPreferences = validateData(userPreferencesSchema, userInput)
    console.log('Valid preferences:', validPreferences)
  } catch (error) {
    console.error('Validation error:', error)
  }
  
  // Sanitize user input
  const unsafeInput = '<script>alert("xss")</script>Hello World'
  const safeInput = sanitizeUserInput(unsafeInput)
  console.log('Sanitized input:', safeInput) // "Hello World"
}

/**
 * Example: Complete workflow
 */
export async function completeWorkflowExample() {
  try {
    // 1. Load user preferences
    const preferences = await settingsManager.getUserPreferences()
    
    // 2. Update preferences based on user input
    await settingsManager.updateUserPreferences({
      theme: 'dark',
      privacy: {
        ...preferences.privacy,
        analytics: true
      }
    })
    
    // 3. Save some tool data
    await storageService.save('calculator_history', [
      { expression: '2 + 2', result: 4, timestamp: new Date() },
      { expression: '10 * 5', result: 50, timestamp: new Date() }
    ])
    
    // 4. Record tool usage
    await settingsManager.recordToolUsage('calculator')
    
    // 5. Export all settings for backup
    const settingsBlob = await settingsManager.exportSettings()
    console.log('Settings backup size:', settingsBlob.size)
    
    console.log('Workflow completed successfully!')
    
  } catch (error) {
    console.error('Workflow error:', error)
  }
}

/**
 * Example: Error handling
 */
export async function errorHandlingExample() {
  try {
    // This will throw a validation error
    validateData(userPreferencesSchema, { theme: 'invalid-theme' })
  } catch (error) {
    console.log('Caught validation error:', error.message)
  }
  
  try {
    // This will throw a sanitization error
    sanitizeUserInput(123 as any) // Invalid input type
  } catch (error) {
    console.log('Caught sanitization error:', error.message)
  }
}