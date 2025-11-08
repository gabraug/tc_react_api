import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { getMoviesByIds } from './movies'
import { getMovieDetails } from '../endpoints/movies'
import type { MovieDetails } from '../../types/movie'

vi.mock('../endpoints/movies', () => ({
  getMovieDetails: vi.fn(),
}))

describe('Movie Utilities', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('getMoviesByIds function', () => {
    it('should fetch multiple movies simultaneously through array of identifiers', async () => {
      const mockMovie1: MovieDetails = {
        id: 1,
        title: 'Movie 1',
        overview: 'Overview 1',
        release_date: '2024-01-01',
        vote_average: 8.0,
        genres: [],
        backdrop_path: '/backdrop1.jpg',
      }

      const mockMovie2: MovieDetails = {
        id: 2,
        title: 'Movie 2',
        overview: 'Overview 2',
        release_date: '2024-02-01',
        vote_average: 7.5,
        genres: [],
        backdrop_path: '/backdrop2.jpg',
      }

      vi.mocked(getMovieDetails)
        .mockResolvedValueOnce(mockMovie1)
        .mockResolvedValueOnce(mockMovie2)

      const result = await getMoviesByIds([1, 2])

      expect(getMovieDetails).toHaveBeenCalledTimes(2)
      expect(getMovieDetails).toHaveBeenCalledWith(1)
      expect(getMovieDetails).toHaveBeenCalledWith(2)
      expect(result).toEqual([mockMovie1, mockMovie2])
    })

    it('should return empty array when no identifiers are provided', async () => {
      const result = await getMoviesByIds([])

      expect(getMovieDetails).not.toHaveBeenCalled()
      expect(result).toEqual([])
    })

    it('should process duplicate identifiers in array correctly', async () => {
      const mockMovie: MovieDetails = {
        id: 1,
        title: 'Movie 1',
        overview: 'Overview 1',
        release_date: '2024-01-01',
        vote_average: 8.0,
        genres: [],
        backdrop_path: '/backdrop1.jpg',
      }

      vi.mocked(getMovieDetails).mockResolvedValue(mockMovie)

      const result = await getMoviesByIds([1, 1, 1])

      expect(getMovieDetails).toHaveBeenCalledTimes(3)
      expect(result).toHaveLength(3)
      expect(result.every(movie => movie.id === 1)).toBe(true)
    })
  })
})

