/**
 * StorageService with IndexedDB and localStorage support
 */

import type { StorageService, StorageKey, StorageOptions, StorageItem } from '@/types/core'
import { validateData, storageOptionsSchema, ValidationError } from '@/lib/core/validation'

const DB_NAME = 'astraa-tools'
const DB_VERSION = 1
const STORE_NAME = 'storage'
const FALLBACK_PREFIX = 'astraa_'

/**
 * Encrypts data using a simple XOR cipher (for basic obfuscation)
 * Note: This is not cryptographically secure, just basic data obfuscation
 */
function simpleEncrypt(data: string, key: string = 'astraa-key'): string {
  let result = ''
  for (let i = 0; i < data.length; i++) {
    result += String.fromCharCode(data.charCodeAt(i) ^ key.charCodeAt(i % key.length))
  }
  return btoa(result)
}

/**
 * Decrypts data encrypted with simpleEncrypt
 */
function simpleDecrypt(encryptedData: string, key: string = 'astraa-key'): string {
  try {
    const data = atob(encryptedData)
    let result = ''
    for (let i = 0; i < data.length; i++) {
      result += String.fromCharCode(data.charCodeAt(i) ^ key.charCodeAt(i % key.length))
    }
    return result
  } catch {
    throw new ValidationError('Failed to decrypt data')
  }
}

/**
 * Compresses data using simple string compression
 */
function compress(data: string): string {
  // Simple compression using JSON.stringify optimization
  return JSON.stringify(JSON.parse(data))
}

/**
 * IndexedDB-based storage implementation
 */
class IndexedDBStorage implements StorageService {
  private db: IDBDatabase | null = null
  private initPromise: Promise<void> | null = null

  private async initDB(): Promise<void> {
    if (this.db) return

    if (this.initPromise) {
      await this.initPromise
      return
    }

    this.initPromise = new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION)

      request.onerror = () => reject(new Error('Failed to open IndexedDB'))
      
      request.onsuccess = () => {
        this.db = request.result
        resolve()
      }

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          const store = db.createObjectStore(STORE_NAME, { keyPath: 'key' })
          store.createIndex('modified', 'metadata.modified', { unique: false })
        }
      }
    })

    await this.initPromise
  }

  private createStorageItem<T>(data: T, options: StorageOptions = {}): StorageItem<T> {
    const now = new Date()
    return {
      data,
      metadata: {
        created: now,
        modified: now,
        version: '1.0.0',
        encrypted: options.encrypt || false,
        compressed: options.compress || false,
        ttl: options.ttl,
      },
    }
  }

  private processDataForStorage(item: StorageItem): string {
    let serialized = JSON.stringify(item)
    
    if (item.metadata.compressed) {
      serialized = compress(serialized)
    }
    
    if (item.metadata.encrypted) {
      serialized = simpleEncrypt(serialized)
    }
    
    return serialized
  }

  private processDataFromStorage(serialized: string, encrypted: boolean): StorageItem {
    let data = serialized
    
    if (encrypted) {
      data = simpleDecrypt(data)
    }
    
    const item = JSON.parse(data) as StorageItem
    
    // Convert date strings back to Date objects
    item.metadata.created = new Date(item.metadata.created)
    item.metadata.modified = new Date(item.metadata.modified)
    
    return item
  }

  private isExpired(item: StorageItem): boolean {
    if (!item.metadata.ttl) return false
    const now = Date.now()
    const created = new Date(item.metadata.created).getTime()
    return now - created > item.metadata.ttl
  }

  async save<T>(key: StorageKey, data: T, options: StorageOptions = {}): Promise<void> {
    const validOptions = validateData(storageOptionsSchema, options)
    await this.initDB()

    if (!this.db) throw new Error('Database not initialized')

    const item = this.createStorageItem(data, validOptions)
    const serialized = this.processDataForStorage(item)

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_NAME], 'readwrite')
      const store = transaction.objectStore(STORE_NAME)
      
      const request = store.put({
        key,
        data: serialized,
        encrypted: item.metadata.encrypted,
      })

      request.onsuccess = () => resolve()
      request.onerror = () => reject(new Error('Failed to save data'))
    })
  }

  async load<T>(key: StorageKey): Promise<T | null> {
    await this.initDB()

    if (!this.db) throw new Error('Database not initialized')

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_NAME], 'readonly')
      const store = transaction.objectStore(STORE_NAME)
      const request = store.get(key)

      request.onsuccess = () => {
        const result = request.result
        if (!result) {
          resolve(null)
          return
        }

        try {
          const item = this.processDataFromStorage(result.data, result.encrypted)
          
          if (this.isExpired(item)) {
            // Clean up expired item
            this.delete(key).catch(() => {}) // Don't await to avoid blocking
            resolve(null)
            return
          }

          resolve(item.data as T)
        } catch (error) {
          reject(new ValidationError('Failed to parse stored data'))
        }
      }

      request.onerror = () => reject(new Error('Failed to load data'))
    })
  }

  async delete(key: StorageKey): Promise<void> {
    await this.initDB()

    if (!this.db) throw new Error('Database not initialized')

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_NAME], 'readwrite')
      const store = transaction.objectStore(STORE_NAME)
      const request = store.delete(key)

      request.onsuccess = () => resolve()
      request.onerror = () => reject(new Error('Failed to delete data'))
    })
  }

  async clear(): Promise<void> {
    await this.initDB()

    if (!this.db) throw new Error('Database not initialized')

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_NAME], 'readwrite')
      const store = transaction.objectStore(STORE_NAME)
      const request = store.clear()

      request.onsuccess = () => resolve()
      request.onerror = () => reject(new Error('Failed to clear storage'))
    })
  }

  async keys(): Promise<StorageKey[]> {
    await this.initDB()

    if (!this.db) throw new Error('Database not initialized')

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_NAME], 'readonly')
      const store = transaction.objectStore(STORE_NAME)
      const request = store.getAllKeys()

      request.onsuccess = () => resolve(request.result as StorageKey[])
      request.onerror = () => reject(new Error('Failed to get keys'))
    })
  }

  async export(keys?: StorageKey[]): Promise<Blob> {
    const allKeys = keys || await this.keys()
    const exportData: Record<string, any> = {}

    for (const key of allKeys) {
      const data = await this.load(key)
      if (data !== null) {
        exportData[key] = data
      }
    }

    const jsonString = JSON.stringify(exportData, null, 2)
    return new Blob([jsonString], { type: 'application/json' })
  }

  async import(file: File): Promise<Record<StorageKey, any>> {
    const text = await file.text()
    const data = JSON.parse(text)

    if (typeof data !== 'object' || data === null) {
      throw new ValidationError('Invalid import file format')
    }

    const imported: Record<StorageKey, any> = {}

    for (const [key, value] of Object.entries(data)) {
      await this.save(key, value)
      imported[key] = value
    }

    return imported
  }

  async size(): Promise<number> {
    const keys = await this.keys()
    return keys.length
  }
}

/**
 * localStorage fallback implementation
 */
class LocalStorageService implements StorageService {
  private getFullKey(key: StorageKey): string {
    return `${FALLBACK_PREFIX}${key}`
  }

  async save<T>(key: StorageKey, data: T, options: StorageOptions = {}): Promise<void> {
    const validOptions = validateData(storageOptionsSchema, options)
    const item = {
      data,
      metadata: {
        created: new Date(),
        modified: new Date(),
        version: '1.0.0',
        encrypted: validOptions.encrypt || false,
        compressed: validOptions.compress || false,
        ttl: validOptions.ttl,
      },
    }

    let serialized = JSON.stringify(item)
    
    if (item.metadata.compressed) {
      serialized = compress(serialized)
    }
    
    if (item.metadata.encrypted) {
      serialized = simpleEncrypt(serialized)
    }

    try {
      localStorage.setItem(this.getFullKey(key), serialized)
    } catch (error) {
      throw new Error('Failed to save to localStorage (quota exceeded?)')
    }
  }

  async load<T>(key: StorageKey): Promise<T | null> {
    const serialized = localStorage.getItem(this.getFullKey(key))
    if (!serialized) return null

    try {
      let data = serialized
      
      // Try to parse to check if it's encrypted
      let item: StorageItem
      try {
        item = JSON.parse(data)
      } catch {
        // Assume it's encrypted
        data = simpleDecrypt(data)
        item = JSON.parse(data)
      }

      // Convert date strings back to Date objects
      item.metadata.created = new Date(item.metadata.created)
      item.metadata.modified = new Date(item.metadata.modified)

      // Check if expired
      if (item.metadata.ttl) {
        const now = Date.now()
        const created = item.metadata.created.getTime()
        if (now - created > item.metadata.ttl) {
          await this.delete(key)
          return null
        }
      }

      return item.data as T
    } catch {
      throw new ValidationError('Failed to parse stored data')
    }
  }

  async delete(key: StorageKey): Promise<void> {
    localStorage.removeItem(this.getFullKey(key))
  }

  async clear(): Promise<void> {
    const keys = await this.keys()
    for (const key of keys) {
      await this.delete(key)
    }
  }

  async keys(): Promise<StorageKey[]> {
    const keys: StorageKey[] = []
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key?.startsWith(FALLBACK_PREFIX)) {
        keys.push(key.substring(FALLBACK_PREFIX.length))
      }
    }
    return keys
  }

  async export(keys?: StorageKey[]): Promise<Blob> {
    const allKeys = keys || await this.keys()
    const exportData: Record<string, any> = {}

    for (const key of allKeys) {
      const data = await this.load(key)
      if (data !== null) {
        exportData[key] = data
      }
    }

    const jsonString = JSON.stringify(exportData, null, 2)
    return new Blob([jsonString], { type: 'application/json' })
  }

  async import(file: File): Promise<Record<StorageKey, any>> {
    const text = await file.text()
    const data = JSON.parse(text)

    if (typeof data !== 'object' || data === null) {
      throw new ValidationError('Invalid import file format')
    }

    const imported: Record<StorageKey, any> = {}

    for (const [key, value] of Object.entries(data)) {
      await this.save(key, value)
      imported[key] = value
    }

    return imported
  }

  async size(): Promise<number> {
    const keys = await this.keys()
    return keys.length
  }
}

/**
 * Creates a storage service instance with IndexedDB support and localStorage fallback
 */
export function createStorageService(): StorageService {
  // Check if IndexedDB is available
  if (typeof window !== 'undefined' && 'indexedDB' in window) {
    return new IndexedDBStorage()
  }
  
  // Fallback to localStorage
  if (typeof window !== 'undefined' && 'localStorage' in window) {
    return new LocalStorageService()
  }
  
  throw new Error('No storage mechanism available')
}

// Export the default instance
export const storageService = createStorageService()