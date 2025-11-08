import { useMemo } from 'react'
import type { Movie } from '../types/movie'
import type { SortOptionType } from '../types/common'

interface UseSortingProps {
  items: Movie[]
  sortBy: SortOptionType
  isFavorite?: (id: number) => boolean
}

export const useSorting = ({ items, sortBy, isFavorite }: UseSortingProps) => {
  const sortedItems = useMemo(() => {
    const sorted = [...items]

    switch (sortBy) {
      case 'title-asc':
        return sorted.sort((a, b) => a.title.localeCompare(b.title))
      case 'title-desc':
        return sorted.sort((a, b) => b.title.localeCompare(a.title))
      case 'rating-desc':
        return sorted.sort((a, b) => b.vote_average - a.vote_average)
      case 'rating-asc':
        return sorted.sort((a, b) => a.vote_average - b.vote_average)
      case 'favorites-first':
        if (!isFavorite) return sorted
        return sorted.sort((a, b) => {
          const aIsFavorite = isFavorite(a.id)
          const bIsFavorite = isFavorite(b.id)
          if (aIsFavorite && !bIsFavorite) return -1
          if (!aIsFavorite && bIsFavorite) return 1
          return 0
        })
      default:
        return sorted
    }
  }, [items, sortBy, isFavorite])

  return sortedItems
}
