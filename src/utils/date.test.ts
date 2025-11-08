import { describe, it, expect } from 'vitest'
import { formatDate, formatDateShort } from './date'

describe('Date Formatting Utility', () => {
  describe('formatDate function', () => {
    it('should format valid date correctly in extended format', () => {
      const dateString = '2024-01-15'
      const formatted = formatDate(dateString)
      expect(formatted).toContain('2024')
      expect(formatted).toContain('janeiro')
      expect(formatted).toMatch(/\d{1,2}/)
    })

    it('should return default message when date is null', () => {
      const result = formatDate(null)
      expect(result).toBeTruthy()
    })

    it('should return default message when date is undefined', () => {
      const result = formatDate(undefined)
      expect(result).toBeTruthy()
    })

    it('should return error message when date is invalid', () => {
      const result = formatDate('data-invalida')
      expect(result).toBeTruthy()
    })

    it('should format using different locale when provided', () => {
      const dateString = '2024-01-15'
      const formatted = formatDate(dateString, 'en-US')
      expect(formatted).toContain('2024')
    })
  })

  describe('formatDateShort function', () => {
    it('should format valid date correctly in short format', () => {
      const dateString = '2024-01-15'
      const formatted = formatDateShort(dateString)
      expect(formatted).toMatch(/\d{2}\/\d{2}\/\d{4}/)
    })

    it('should return "N/A" when date is null', () => {
      const result = formatDateShort(null)
      expect(result).toBe('N/A')
    })

    it('should return "N/A" when date is undefined', () => {
      const result = formatDateShort(undefined)
      expect(result).toBe('N/A')
    })

    it('should return "N/A" or "Invalid Date" when date is invalid', () => {
      const result = formatDateShort('data-invalida')
      expect(result === 'N/A' || result === 'Invalid Date').toBe(true)
    })

    it('should format using different locale when provided', () => {
      const dateString = '2024-01-15'
      const formatted = formatDateShort(dateString, 'en-US')
      expect(formatted).toMatch(/\d{2}\/\d{2}\/\d{4}/)
    })
  })
})

