import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { searchMovies } from './search'
import api from '../api'
import type { MoviesResponse } from '../../types/movie'

vi.mock('../api', () => ({
  default: {
    get: vi.fn(),
  },
}))

describe('Search Endpoints Service', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('searchMovies function', () => {
    it('should search movies using search term and default page when page is not provided', async () => {
      const mockResponse: MoviesResponse = {
        page: 1,
        results: [],
        total_pages: 1,
        total_results: 0,
      }

      vi.mocked(api.get).mockResolvedValue({ data: mockResponse })

      const result = await searchMovies('batman')

      expect(api.get).toHaveBeenCalledWith('/search/movie', {
        params: { query: 'batman', page: 1, language: 'pt-BR' },
      })
      expect(result).toEqual(mockResponse)
    })

    it('should search movies using search term and specific page when page is provided', async () => {
      const mockResponse: MoviesResponse = {
        page: 2,
        results: [],
        total_pages: 2,
        total_results: 0,
      }

      vi.mocked(api.get).mockResolvedValue({ data: mockResponse })

      const result = await searchMovies('batman', 2)

      expect(api.get).toHaveBeenCalledWith('/search/movie', {
        params: { query: 'batman', page: 2, language: 'pt-BR' },
      })
      expect(result).toEqual(mockResponse)
    })

    it('should process empty search terms correctly', async () => {
      const mockResponse: MoviesResponse = {
        page: 1,
        results: [],
        total_pages: 1,
        total_results: 0,
      }

      vi.mocked(api.get).mockResolvedValue({ data: mockResponse })

      const result = await searchMovies('')

      expect(api.get).toHaveBeenCalledWith('/search/movie', {
        params: { query: '', page: 1, language: 'pt-BR' },
      })
      expect(result).toEqual(mockResponse)
    })
  })
})

