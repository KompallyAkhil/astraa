// Application constants

export const APP_CONFIG = {
  name: 'Astraa Tools',
  version: '1.0.0',
  description: 'A comprehensive suite of developer and utility tools',
  author: 'Astraa Team',
} as const;

export const STORAGE_KEYS = {
  USER_PREFERENCES: 'astraa_user_preferences',
  TOOL_DATA: 'astraa_tool_data',
  ACTIVITY_EVENTS: 'astraa_activity_events',
  THEME: 'astraa_theme',
} as const;

export const API_ENDPOINTS = {
  ANALYTICS: '/api/analytics',
  FEEDBACK: '/api/feedback',
  EXPORT: '/api/export',
} as const;

export const PERFORMANCE_BUDGETS = {
  BUNDLE_SIZE: 500 * 1024, // 500KB
  LOAD_TIME: 2000, // 2 seconds
  RENDER_TIME: 100, // 100ms
} as const;

export const ACCESSIBILITY_CONFIG = {
  FOCUS_OUTLINE_WIDTH: '2px',
  FOCUS_OUTLINE_COLOR: 'hsl(var(--ring))',
  SKIP_LINK_HEIGHT: '40px',
} as const;