import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { getPopularMovies, getMovieDetails } from './movies'
import api from '../api'
import type { MoviesResponse, MovieDetails } from '../../types/movie'

vi.mock('../api', () => ({
  default: {
    get: vi.fn(),
  },
}))

describe('Movies Endpoints Service', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('getPopularMovies function', () => {
    it('should fetch popular movies using default page when no parameter is provided', async () => {
      const mockResponse: MoviesResponse = {
        page: 1,
        results: [],
        total_pages: 1,
        total_results: 0,
      }

      vi.mocked(api.get).mockResolvedValue({ data: mockResponse })

      const result = await getPopularMovies()

      expect(api.get).toHaveBeenCalledWith('/movie/popular', {
        params: { page: 1, language: 'pt-BR' },
      })
      expect(result).toEqual(mockResponse)
    })

    it('should fetch popular movies using specific page when parameter is provided', async () => {
      const mockResponse: MoviesResponse = {
        page: 2,
        results: [],
        total_pages: 2,
        total_results: 0,
      }

      vi.mocked(api.get).mockResolvedValue({ data: mockResponse })

      const result = await getPopularMovies(2)

      expect(api.get).toHaveBeenCalledWith('/movie/popular', {
        params: { page: 2, language: 'pt-BR' },
      })
      expect(result).toEqual(mockResponse)
    })
  })

  describe('getMovieDetails function', () => {
    it('should fetch complete movie details through identifier', async () => {
      const mockMovieDetails: MovieDetails = {
        id: 1,
        title: 'Test Movie',
        overview: 'Test overview',
        release_date: '2024-01-01',
        vote_average: 8.5,
        genres: [],
        backdrop_path: '/backdrop.jpg',
      }

      vi.mocked(api.get).mockResolvedValue({ data: mockMovieDetails })

      const result = await getMovieDetails(1)

      expect(api.get).toHaveBeenCalledWith('/movie/1', {
        params: { language: 'pt-BR' },
      })
      expect(result).toEqual(mockMovieDetails)
    })
  })
})

