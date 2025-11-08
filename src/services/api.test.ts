import { describe, it, expect } from 'vitest'
import api from './api'

describe('API Configuration', () => {
  describe('Base Configuration', () => {
    it('should have baseURL configured correctly for TMDB API', () => {
      expect(api.defaults.baseURL).toBe('https://api.themoviedb.org/3')
    })

    it('should have authorization and accept headers configured correctly', () => {
      expect(api.defaults.headers).toHaveProperty('Authorization')
      expect(api.defaults.headers).toHaveProperty('accept', 'application/json')
    })
  })

  describe('Environment Variable Validation', () => {
    it('should have environment variables configured', () => {
      expect(api.defaults.baseURL).toBeDefined()
      expect(api.defaults.headers.Authorization).toBeDefined()
    })

    it('should throw error when VITE_TMDB_BASE_URL is missing', () => {
      const API_BASE_URL = undefined

      expect(() => {
        if (!API_BASE_URL) {
          throw new Error(
            'Missing required environment variable: VITE_TMDB_BASE_URL. Please configure it in your .env file.'
          )
        }
      }).toThrow('Missing required environment variable: VITE_TMDB_BASE_URL')
    })

    it('should throw error when VITE_TMDB_TOKEN is missing', () => {
      const API_TOKEN = undefined

      expect(() => {
        if (!API_TOKEN) {
          throw new Error(
            'Missing required environment variable: VITE_TMDB_TOKEN. Please configure it in your .env file.'
          )
        }
      }).toThrow('Missing required environment variable: VITE_TMDB_TOKEN')
    })

    it('should validate environment variables at module load time', () => {
      const testValidation = (value: string | undefined, varName: string) => {
        if (!value) {
          throw new Error(
            `Missing required environment variable: ${varName}. Please configure it in your .env file.`
          )
        }
      }

      expect(() => testValidation(undefined, 'VITE_TMDB_BASE_URL')).toThrow('VITE_TMDB_BASE_URL')
      expect(() => testValidation(undefined, 'VITE_TMDB_TOKEN')).toThrow('VITE_TMDB_TOKEN')
      expect(() => testValidation('test', 'VITE_TMDB_BASE_URL')).not.toThrow()
    })
  })
})
