export interface StorageError {
  type: 'quota_exceeded' | 'read_only' | 'unknown'
  message: string
  originalError?: unknown
}

export interface StorageOptions {
  maxRetries?: number
  enableCompression?: boolean
  enableCleanup?: boolean
  onQuotaExceeded?: (error: StorageError) => void
}

const DEFAULT_OPTIONS: Required<StorageOptions> = {
  maxRetries: 3,
  enableCompression: true,
  enableCleanup: true,
  onQuotaExceeded: () => {},
}

let storageAvailableCache: boolean | null = null

export function resetStorageCache(): void {
  storageAvailableCache = null
}

export function isStorageAvailable(): boolean {
  if (storageAvailableCache !== null) {
    return storageAvailableCache
  }

  try {
    const test = '__storage_test__'
    localStorage.setItem(test, test)
    localStorage.removeItem(test)
    storageAvailableCache = true
    return true
  } catch {
    storageAvailableCache = false
    return false
  }
}

function compressData(data: string): string {
  try {
    const parsed = JSON.parse(data)
    return JSON.stringify(parsed)
  } catch {
    return data
  }
}

function cleanupStorage(excludeKeys: Set<string>): number {
  let cleaned = 0
  const keysToRemove: string[] = []

  for (const key in localStorage) {
    if (Object.prototype.hasOwnProperty.call(localStorage, key) && !excludeKeys.has(key)) {
      if (key.startsWith('_temp_') || key.startsWith('_old_')) {
        keysToRemove.push(key)
      }
    }
  }

  for (let i = 0; i < keysToRemove.length; i++) {
    try {
      localStorage.removeItem(keysToRemove[i])
      cleaned++
    } catch (error) {
      console.warn('Failed to remove temporary storage item during cleanup', {
        key: keysToRemove[i],
        error,
      })
    }
  }

  return cleaned
}

function findLargestItem(excludeKey: string): string | null {
  let largestKey: string | null = null
  let largestSize = 0

  for (const key in localStorage) {
    if (Object.prototype.hasOwnProperty.call(localStorage, key) && key !== excludeKey) {
      const item = localStorage.getItem(key)
      if (item) {
        const size = item.length + key.length
        if (size > largestSize) {
          largestSize = size
          largestKey = key
        }
      }
    }
  }

  return largestKey
}

export function setStorageItem(
  key: string,
  value: string,
  options: StorageOptions = {}
): { success: boolean; error?: StorageError } {
  const opts = { ...DEFAULT_OPTIONS, ...options }

  if (!isStorageAvailable()) {
    const error: StorageError = {
      type: 'read_only',
      message: 'localStorage is not available or is read-only',
    }
    opts.onQuotaExceeded(error)
    return { success: false, error }
  }

  let attempts = 0
  let lastError: StorageError | undefined
  const excludeSet = new Set([key])

  while (attempts < opts.maxRetries) {
    try {
      localStorage.setItem(key, value)
      return { success: true }
    } catch (err) {
      const error = err as DOMException | Error

      const isQuotaError =
        error.name === 'QuotaExceededError' ||
        error.name === 'NS_ERROR_DOM_QUOTA_REACHED' ||
        (error instanceof DOMException && (error.code === 22 || error.code === 1014))

      if (isQuotaError) {
        lastError = {
          type: 'quota_exceeded',
          message: 'Storage quota exceeded. Attempting recovery...',
          originalError: error,
        }

        if (opts.enableCompression && attempts === 0) {
          try {
            const compressed = compressData(value)
            if (compressed.length < value.length) {
              localStorage.setItem(key, compressed)
              return { success: true }
            }
          } catch (error) {
            console.warn('Failed to compress data during storage operation', { key, error })
          }
        }

        if (opts.enableCleanup && attempts < 2) {
          const cleaned = cleanupStorage(excludeSet)
          if (cleaned > 0) {
            attempts++
            continue
          }
        }

        if (attempts >= 2) {
          const largestKey = findLargestItem(key)
          if (largestKey) {
            try {
              localStorage.removeItem(largestKey)
              localStorage.setItem(key, value)
              return { success: true }
            } catch (error) {
              console.warn('Failed to remove largest item and save new value', {
                key,
                largestKey,
                error,
              })
            }
          }
        }

        attempts++
      } else {
        const isReadOnly =
          error.message?.toLowerCase().includes('read-only') ||
          error.message?.toLowerCase().includes('readonly') ||
          error.name === 'ReadOnlyError'

        lastError = {
          type: isReadOnly ? 'read_only' : 'unknown',
          message: isReadOnly ? 'Storage is read-only' : error.message || 'Unknown storage error',
          originalError: error,
        }
        opts.onQuotaExceeded(lastError)
        return { success: false, error: lastError }
      }
    }
  }

  if (lastError) {
    lastError.message = 'Failed to save data after multiple recovery attempts. Storage may be full.'
    opts.onQuotaExceeded(lastError)
  }

  return { success: false, error: lastError }
}

export function getStorageItem(key: string): string | null {
  if (!isStorageAvailable()) {
    return null
  }

  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}

export function setStorageJSON<T>(
  key: string,
  value: T,
  options: StorageOptions = {}
): { success: boolean; error?: StorageError } {
  try {
    const jsonString = JSON.stringify(value)
    return setStorageItem(key, jsonString, options)
  } catch (err) {
    const error: StorageError = {
      type: 'unknown',
      message: `Failed to stringify data: ${err instanceof Error ? err.message : 'Unknown error'}`,
      originalError: err,
    }
    options.onQuotaExceeded?.(error)
    return { success: false, error }
  }
}

export function getStorageJSON<T>(key: string): T | null {
  const item = getStorageItem(key)
  if (!item) {
    return null
  }

  try {
    return JSON.parse(item) as T
  } catch {
    return null
  }
}

export function getStorageSize(): number {
  let total = 0
  for (const key in localStorage) {
    if (Object.prototype.hasOwnProperty.call(localStorage, key)) {
      const item = localStorage.getItem(key)
      if (item) {
        total += item.length + key.length
      }
    }
  }
  return total
}

export function getItemSize(key: string): number {
  const item = localStorage.getItem(key)
  if (!item) return 0
  return item.length + key.length
}

export function removeStorageItem(key: string): boolean {
  if (!isStorageAvailable()) {
    return false
  }

  try {
    localStorage.removeItem(key)
    return true
  } catch {
    return false
  }
}

export function getStorageInfo(): {
  used: number
  usedFormatted: string
  available: boolean
  itemCount: number
} {
  const available = isStorageAvailable()
  const used = available ? getStorageSize() : 0
  const itemCount = available ? Object.keys(localStorage).length : 0

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return `${Math.round((bytes / Math.pow(k, i)) * 100) / 100} ${sizes[i]}`
  }

  return {
    used,
    usedFormatted: formatBytes(used),
    available,
    itemCount,
  }
}
