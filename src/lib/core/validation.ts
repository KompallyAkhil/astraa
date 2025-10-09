/**
 * Validation utilities using Zod schemas
 */

import { z } from 'zod'

// Base validation schemas
export const accessibilitySettingsSchema = z.object({
  reducedMotion: z.boolean().default(false),
  highContrast: z.boolean().default(false),
  fontSize: z.enum(['small', 'medium', 'large']).default('medium'),
  screenReader: z.boolean().default(false),
})

export const privacySettingsSchema = z.object({
  analytics: z.boolean().default(false),
  errorReporting: z.boolean().default(true),
  cloudSync: z.boolean().default(false),
  dataRetention: z.number().min(1).max(365).default(30),
})

export const userPreferencesSchema = z.object({
  theme: z.enum(['light', 'dark', 'system']).default('system'),
  language: z.string().default('en'),
  accessibility: accessibilitySettingsSchema,
  privacy: privacySettingsSchema,
  shortcuts: z.record(z.string()).default({}),
  toolDefaults: z.record(z.any()).default({}),
})

export const toolSettingsSchema = z.object({
  id: z.string(),
  preferences: z.record(z.any()).default({}),
  shortcuts: z.record(z.string()).default({}),
  lastUsed: z.date().default(() => new Date()),
  usageCount: z.number().min(0).default(0),
})

export const storageOptionsSchema = z.object({
  encrypt: z.boolean().optional(),
  compress: z.boolean().optional(),
  ttl: z.number().positive().optional(),
})

// File validation schemas
export const fileValidationSchema = z.object({
  name: z.string().min(1),
  size: z.number().min(0).max(10 * 1024 * 1024), // 10MB max
  type: z.string().min(1),
})

export const imageFileSchema = fileValidationSchema.extend({
  type: z.string().regex(/^image\/(jpeg|jpg|png|gif|webp|svg\+xml)$/),
})

export const textFileSchema = fileValidationSchema.extend({
  type: z.string().regex(/^text\/|application\/(json|xml)$/),
})

// Input validation utilities
export class ValidationError extends Error {
  constructor(
    message: string,
    public field?: string,
    public code?: string
  ) {
    super(message)
    this.name = 'ValidationError'
  }
}

/**
 * Validates data against a Zod schema and throws ValidationError on failure
 */
export function validateData<T>(
  schema: z.ZodSchema<T>,
  data: unknown,
  fieldName?: string
): T {
  try {
    return schema.parse(data)
  } catch (error) {
    if (error instanceof z.ZodError) {
      const firstError = error.errors[0]
      throw new ValidationError(
        `Validation failed: ${firstError?.message || 'Invalid data'}`,
        fieldName || firstError?.path.join('.'),
        firstError?.code
      )
    }
    throw error
  }
}

/**
 * Safely validates data and returns result with success flag
 */
export function safeValidateData<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): { success: true; data: T } | { success: false; error: ValidationError } {
  try {
    const validData = validateData(schema, data)
    return { success: true, data: validData }
  } catch (error) {
    return {
      success: false,
      error: error instanceof ValidationError ? error : new ValidationError('Unknown validation error')
    }
  }
}

/**
 * Sanitizes string input to prevent XSS attacks
 */
export function sanitizeString(input: string): string {
  return input
    .replace(/[<>]/g, '') // Remove angle brackets
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim()
}

/**
 * Validates and sanitizes user input
 */
export function sanitizeUserInput(input: unknown): string {
  if (typeof input !== 'string') {
    throw new ValidationError('Input must be a string')
  }
  
  if (input.length > 10000) {
    throw new ValidationError('Input too long (max 10000 characters)')
  }
  
  return sanitizeString(input)
}

/**
 * Validates file upload
 */
export function validateFileUpload(
  file: File,
  allowedTypes: string[] = [],
  maxSize: number = 10 * 1024 * 1024 // 10MB
): void {
  // Basic file validation
  validateData(fileValidationSchema, {
    name: file.name,
    size: file.size,
    type: file.type,
  })
  
  // Size check
  if (file.size > maxSize) {
    throw new ValidationError(`File too large (max ${maxSize / 1024 / 1024}MB)`)
  }
  
  // Type check
  if (allowedTypes.length > 0 && !allowedTypes.includes(file.type)) {
    throw new ValidationError(`File type not allowed. Allowed types: ${allowedTypes.join(', ')}`)
  }
}

// Export schemas for external use
export {
  userPreferencesSchema,
  toolSettingsSchema,
  accessibilitySettingsSchema,
  privacySettingsSchema,
  storageOptionsSchema,
  fileValidationSchema,
  imageFileSchema,
  textFileSchema,
}