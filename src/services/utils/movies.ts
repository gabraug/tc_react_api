import { getMovieDetails } from '../endpoints/movies'
import type { MovieDetails } from '../../types/movie'

export const getMoviesByIds = async (ids: number[]): Promise<MovieDetails[]> => {
  const promises = ids.map(id => getMovieDetails(id))
  return Promise.all(promises)
}
