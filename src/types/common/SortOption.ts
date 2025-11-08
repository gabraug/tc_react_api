export type SortOptionType =
  | 'title-asc'
  | 'title-desc'
  | 'rating-desc'
  | 'rating-asc'
  | 'favorites-first'

export interface SortOption {
  value: SortOptionType
  label: string
}

export const DEFAULT_SORT_OPTIONS: SortOption[] = [
  { value: 'title-asc', label: 'A-Z' },
  { value: 'title-desc', label: 'Z-A' },
  { value: 'rating-desc', label: 'Nota: Maior' },
  { value: 'rating-asc', label: 'Nota: Menor' },
  { value: 'favorites-first', label: 'Favoritos primeiro' },
]
