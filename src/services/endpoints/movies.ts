import api from '../api'
import type { MoviesResponse, MovieDetails } from '../../types/movie'

export const getPopularMovies = async (page: number = 1): Promise<MoviesResponse> => {
  const response = await api.get<MoviesResponse>('/movie/popular', {
    params: { page, language: 'pt-BR' },
  })
  return response.data
}

export const getMovieDetails = async (id: number): Promise<MovieDetails> => {
  const response = await api.get<MovieDetails>(`/movie/${id}`, {
    params: { language: 'pt-BR' },
  })
  return response.data
}
