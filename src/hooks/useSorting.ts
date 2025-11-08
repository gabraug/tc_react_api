import { useMemo } from 'react'
import type { SortOptionType } from '../types/common'

interface SortableItem {
  id: number
  title: string
  vote_average: number
}

interface UseSortingProps<T extends SortableItem> {
  items: T[]
  sortBy: SortOptionType
  isFavorite?: (id: number) => boolean
}

export const useSorting = <T extends SortableItem>({
  items,
  sortBy,
  isFavorite,
}: UseSortingProps<T>) => {
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
