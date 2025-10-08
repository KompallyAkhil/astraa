/**
 * Example test file showing how to test the Zustand stores
 * This demonstrates the testing patterns for the new state management system
 */

import { useUserPreferences, useToolSettings, useActivityTracking } from './index'

// Mock localStorage for testing
const mockStorage = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => { store[key] = value },
    removeItem: (key: string) => { delete store[key] },
    clear: () => { store = {} }
  }
})()

Object.defineProperty(window, 'localStorage', { value: mockStorage })

/**
 * Test user preferences store
 */
export function testUserPreferences() {
  console.log('Testing User Preferences Store...')
  
  const { preferences, updatePreferences, updateAccessibilitySettings } = useUserPreferences.getState()
  
  // Test initial state
  console.assert(preferences.theme === 'system', 'Default theme should be system')
  console.assert(preferences.language === 'en', 'Default language should be en')
  
  // Test updating preferences
  updatePreferences({ theme: 'dark' })
  const updatedPrefs = useUserPreferences.getState().preferences
  console.assert(updatedPrefs.theme === 'dark', 'Theme should be updated to dark')
  
  // Test updating accessibility settings
  updateAccessibilitySettings({ reducedMotion: true })
  const accessibilitySettings = useUserPreferences.getState().preferences.accessibility
  console.assert(accessibilitySettings.reducedMotion === true, 'Reduced motion should be enabled')
  
  console.log('✅ User Preferences Store tests passed')
}

/**
 * Test tool settings store
 */
export function testToolSettings() {
  console.log('Testing Tool Settings Store...')
  
  const { updateToolSettings, getToolSettings, updateToolUsage, getToolUsageCount } = useToolSettings.getState()
  
  const toolId = 'test-tool'
  
  // Test initial state
  const initialSettings = getToolSettings(toolId)
  console.assert(initialSettings === null, 'Initial tool settings should be null')
  
  // Test updating tool settings
  updateToolSettings(toolId, {
    settings: { testSetting: 'value' }
  })
  
  const updatedSettings = getToolSettings(toolId)
  console.assert(updatedSettings !== null, 'Tool settings should exist after update')
  console.assert(updatedSettings?.settings.testSetting === 'value', 'Tool setting should be saved')
  
  // Test usage tracking
  const initialUsage = getToolUsageCount(toolId)
  updateToolUsage(toolId)
  const updatedUsage = getToolUsageCount(toolId)
  console.assert(updatedUsage === initialUsage + 1, 'Usage count should increment')
  
  console.log('✅ Tool Settings Store tests passed')
}

/**
 * Test activity tracking store
 */
export function testActivityTracking() {
  console.log('Testing Activity Tracking Store...')
  
  const { trackActivity, stats, getRecentActivities, getDailyUsage } = useActivityTracking.getState()
  
  const initialUsage = stats.totalUsage
  const initialActivities = getRecentActivities().length
  
  // Test tracking activity
  trackActivity('tool', 'test-tool', { testMetadata: 'value' })
  
  const updatedStats = useActivityTracking.getState().stats
  console.assert(updatedStats.totalUsage === initialUsage + 1, 'Total usage should increment')
  
  const updatedActivities = useActivityTracking.getState().getRecentActivities()
  console.assert(updatedActivities.length === initialActivities + 1, 'Recent activities should include new activity')
  
  // Test daily usage
  const todayUsage = getDailyUsage()
  console.assert(todayUsage > 0, 'Daily usage should be greater than 0')
  
  console.log('✅ Activity Tracking Store tests passed')
}

/**
 * Run all tests
 */
export function runAllTests() {
  console.log('🧪 Running Zustand Store Tests...')
  
  try {
    testUserPreferences()
    testToolSettings()
    testActivityTracking()
    
    console.log('🎉 All tests passed!')
    return true
  } catch (error) {
    console.error('❌ Tests failed:', error)
    return false
  }
}

/**
 * Performance test
 */
export function performanceTest() {
  console.log('⚡ Running Performance Tests...')
  
  const iterations = 1000
  
  // Test user preferences updates
  const startTime = performance.now()
  
  for (let i = 0; i < iterations; i++) {
    useUserPreferences.getState().updatePreferences({
      theme: i % 2 === 0 ? 'light' : 'dark'
    })
  }
  
  const endTime = performance.now()
  const duration = endTime - startTime
  
  console.log(`✅ ${iterations} preference updates completed in ${duration.toFixed(2)}ms`)
  console.log(`📊 Average: ${(duration / iterations).toFixed(4)}ms per update`)
  
  // Test activity tracking
  const activityStartTime = performance.now()
  
  for (let i = 0; i < iterations; i++) {
    useActivityTracking.getState().trackActivity('tool', `test-tool-${i}`)
  }
  
  const activityEndTime = performance.now()
  const activityDuration = activityEndTime - activityStartTime
  
  console.log(`✅ ${iterations} activity tracks completed in ${activityDuration.toFixed(2)}ms`)
  console.log(`📊 Average: ${(activityDuration / iterations).toFixed(4)}ms per track`)
}

// Export for use in development/testing
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  (window as any).testStores = {
    runAllTests,
    performanceTest,
    testUserPreferences,
    testToolSettings,
    testActivityTracking
  }
}