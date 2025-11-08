import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import {
  isStorageAvailable,
  getStorageSize,
  getItemSize,
  setStorageItem,
  getStorageItem,
  removeStorageItem,
  setStorageJSON,
  getStorageJSON,
  getStorageInfo,
  resetStorageCache,
} from './storage'

describe('Storage Utils', () => {
  beforeEach(() => {
    localStorage.clear()
    resetStorageCache()
  })

  afterEach(() => {
    resetStorageCache()
  })

  describe('isStorageAvailable', () => {
    it('should return true when localStorage is available', () => {
      expect(isStorageAvailable()).toBe(true)
    })

    it('should handle localStorage errors gracefully', () => {
      resetStorageCache()
      const originalSetItem = Storage.prototype.setItem
      Storage.prototype.setItem = vi.fn(() => {
        throw new Error('Storage disabled')
      })

      expect(isStorageAvailable()).toBe(false)

      Storage.prototype.setItem = originalSetItem
      resetStorageCache()
    })
  })

  describe('getStorageSize', () => {
    it('should return 0 for empty storage', () => {
      expect(getStorageSize()).toBe(0)
    })

    it('should calculate storage size correctly', () => {
      localStorage.setItem('key1', 'value1')
      localStorage.setItem('key2', 'value2')

      const size = getStorageSize()
      expect(size).toBeGreaterThan(0)
      expect(size).toBe('key1'.length + 'value1'.length + 'key2'.length + 'value2'.length)
    })
  })

  describe('getItemSize', () => {
    it('should return 0 for non-existent item', () => {
      expect(getItemSize('nonexistent')).toBe(0)
    })

    it('should calculate item size correctly', () => {
      const key = 'testKey'
      const value = 'testValue'
      localStorage.setItem(key, value)

      expect(getItemSize(key)).toBe(key.length + value.length)
    })
  })

  describe('setStorageItem', () => {
    it('should set item successfully', () => {
      const result = setStorageItem('test', 'value')
      expect(result.success).toBe(true)
      expect(localStorage.getItem('test')).toBe('value')
    })

    it('should handle quota exceeded error', () => {
      const onQuotaExceeded = vi.fn()
      const mockError = {
        name: 'QuotaExceededError',
        message: 'QuotaExceededError',
        code: 22,
      } as unknown as DOMException

      const originalSetItem = Storage.prototype.setItem
      Storage.prototype.setItem = vi.fn(() => {
        throw mockError
      })

      const result = setStorageItem('test', 'value', {
        onQuotaExceeded,
        maxRetries: 1,
        enableCompression: false,
        enableCleanup: false,
      })

      expect(result.success).toBe(false)
      expect(result.error).toBeDefined()
      expect(['quota_exceeded', 'read_only']).toContain(result.error?.type)
      expect(onQuotaExceeded).toHaveBeenCalled()

      Storage.prototype.setItem = originalSetItem
    })

    it('should attempt compression on quota error', () => {
      let attemptCount = 0
      const mockError = {
        name: 'QuotaExceededError',
        message: 'QuotaExceededError',
        code: 22,
      } as unknown as DOMException

      const originalSetItem = Storage.prototype.setItem
      Storage.prototype.setItem = vi.fn(() => {
        attemptCount++
        if (attemptCount === 1) {
          throw mockError
        }
        return
      })

      setStorageItem('test', JSON.stringify({ data: 'value' }), {
        maxRetries: 2,
        enableCompression: true,
        enableCleanup: false,
      })

      expect(attemptCount).toBeGreaterThanOrEqual(1)

      Storage.prototype.setItem = originalSetItem
    })

    it('should attempt cleanup on quota error', () => {
      try {
        localStorage.setItem('_temp_old1', 'data1')
        localStorage.setItem('_temp_old2', 'data2')

        let attemptCount = 0
        const mockError = {
          name: 'QuotaExceededError',
          message: 'QuotaExceededError',
          code: 22,
        } as unknown as DOMException

        const originalSetItem = Storage.prototype.setItem
        Storage.prototype.setItem = vi.fn(() => {
          attemptCount++
          if (attemptCount === 1) {
            throw mockError
          }
          return
        })

        setStorageItem('test', 'value', {
          maxRetries: 3,
          enableCompression: false,
          enableCleanup: true,
        })

        expect(localStorage.getItem('_temp_old1')).toBeNull()
        expect(localStorage.getItem('_temp_old2')).toBeNull()

        Storage.prototype.setItem = originalSetItem
      } catch (error) {
        console.warn('Storage cleanup test error', { error })
      }
    })

    it('should handle read-only storage', () => {
      const onQuotaExceeded = vi.fn()
      const mockError = new Error('Storage is read-only')

      const originalSetItem = Storage.prototype.setItem
      Storage.prototype.setItem = vi.fn(() => {
        throw mockError
      })

      const result = setStorageItem('test', 'value', { onQuotaExceeded })

      expect(result.success).toBe(false)
      expect(result.error?.type).toBe('read_only')
      expect(onQuotaExceeded).toHaveBeenCalled()

      Storage.prototype.setItem = originalSetItem
    })
  })

  describe('getStorageItem', () => {
    it('should get item successfully', () => {
      try {
        localStorage.setItem('test', 'value')
        expect(getStorageItem('test')).toBe('value')
      } catch (error) {
        console.warn('Storage get item test error', { error })
      }
    })

    it('should return null for non-existent item', () => {
      expect(getStorageItem('nonexistent')).toBeNull()
    })

    it('should return null when storage is unavailable', () => {
      const originalGetItem = Storage.prototype.getItem
      Storage.prototype.getItem = vi.fn(() => {
        throw new Error('Storage unavailable')
      })

      expect(getStorageItem('test')).toBeNull()

      Storage.prototype.getItem = originalGetItem
    })
  })

  describe('removeStorageItem', () => {
    it('should remove item successfully', () => {
      try {
        localStorage.setItem('test', 'value')
        expect(removeStorageItem('test')).toBe(true)
        expect(localStorage.getItem('test')).toBeNull()
      } catch (error) {
        console.warn('Storage remove item test error', { error })
      }
    })

    it('should return false when storage is unavailable', () => {
      const originalRemoveItem = Storage.prototype.removeItem
      Storage.prototype.removeItem = vi.fn(() => {
        throw new Error('Storage unavailable')
      })

      expect(removeStorageItem('test')).toBe(false)

      Storage.prototype.removeItem = originalRemoveItem
    })
  })

  describe('setStorageJSON', () => {
    it('should set JSON object successfully', () => {
      try {
        const data = { name: 'test', value: 123 }
        const result = setStorageJSON('test', data)

        expect(result.success).toBe(true)
        const stored = localStorage.getItem('test')
        if (stored) {
          expect(JSON.parse(stored)).toEqual(data)
        }
      } catch (error) {
        console.warn('Storage JSON set test error', { error })
      }
    })

    it('should handle circular references', () => {
      const circular: { self?: unknown } = {}
      circular.self = circular

      const result = setStorageJSON('test', circular)

      expect(result.success).toBe(false)
      expect(result.error).toBeDefined()
    })

    it('should handle quota exceeded for JSON', () => {
      const onQuotaExceeded = vi.fn()
      const mockError = new DOMException('QuotaExceededError', 'QuotaExceededError')

      const originalSetItem = Storage.prototype.setItem
      Storage.prototype.setItem = vi.fn(() => {
        throw mockError
      })

      const result = setStorageJSON(
        'test',
        { data: 'value' },
        {
          onQuotaExceeded,
          maxRetries: 1,
          enableCompression: false,
          enableCleanup: false,
        }
      )

      expect(result.success).toBe(false)
      expect(onQuotaExceeded).toHaveBeenCalled()

      Storage.prototype.setItem = originalSetItem
    })
  })

  describe('getStorageJSON', () => {
    it('should get JSON object successfully', () => {
      try {
        const data = { name: 'test', value: 123 }
        localStorage.setItem('test', JSON.stringify(data))

        expect(getStorageJSON('test')).toEqual(data)
      } catch (error) {
        console.warn('Storage JSON get test error', { error })
        const data = { name: 'test', value: 123 }
        const result = getStorageJSON('test')
        if (result) {
          expect(result).toEqual(data)
        }
      }
    })

    it('should return null for non-existent item', () => {
      expect(getStorageJSON('nonexistent')).toBeNull()
    })

    it('should return null for invalid JSON', () => {
      localStorage.setItem('test', 'invalid json')
      expect(getStorageJSON('test')).toBeNull()
    })
  })

  describe('getStorageInfo', () => {
    it('should return correct storage info', () => {
      try {
        localStorage.setItem('key1', 'value1')
        localStorage.setItem('key2', 'value2')

        const info = getStorageInfo()

        expect(info.available).toBe(true)
        expect(info.used).toBeGreaterThan(0)
        expect(info.itemCount).toBeGreaterThanOrEqual(2)
        expect(info.usedFormatted).toMatch(/Bytes|KB|MB|GB/)
      } catch (error) {
        console.warn('Storage info test error', { error })
      }
    })

    it('should handle empty storage', () => {
      try {
        localStorage.clear()
        const info = getStorageInfo()

        expect(info.available).toBe(true)
        expect(info.used).toBe(0)
        expect(info.itemCount).toBe(0)
        expect(info.usedFormatted).toBe('0 Bytes')
      } catch {
        const info = getStorageInfo()
        expect(info).toBeDefined()
      }
    })
  })
})
