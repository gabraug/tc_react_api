import api from '../api'
import type { MoviesResponse } from '../../types/movie'

export const searchMovies = async (query: string, page: number = 1): Promise<MoviesResponse> => {
  const response = await api.get<MoviesResponse>('/search/movie', {
    params: { query, page, language: 'pt-BR' },
  })
  return response.data
}
