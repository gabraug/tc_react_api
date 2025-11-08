import type { Genre } from './Genre'

export interface MovieDetails {
  id: number
  title: string
  backdrop_path: string | null
  genres: Genre[]
  release_date: string
  vote_average: number
  overview: string
}
