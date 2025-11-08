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
})

