import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'
import type { FavoriteList, FavoritesData } from '../../types/favorites'
import { texts } from '../../constants/texts'
import { getStorageJSON, setStorageJSON, type StorageError } from '../../utils/storage'

interface FavoritesContextType {
  favorites: number[]
  lists: FavoriteList[]
  addFavorite: (movieId: number, listId?: string) => void
  removeFavorite: (movieId: number, listId?: string) => void
  isFavorite: (movieId: number, listId?: string) => boolean
  isFavoriteInAnyList: (movieId: number) => boolean
  getListsContainingMovie: (movieId: number) => Array<{ id: string | null; name: string }>
  toggleFavorite: (movieId: number, listId?: string) => void
  createList: (name: string) => string
  updateList: (listId: string, name: string) => void
  deleteList: (listId: string) => void
  getList: (listId: string) => FavoriteList | undefined
  onStorageError?: (error: StorageError) => void
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

const STORAGE_KEY = 'favorites_data'

function migrateOldFavorites(): FavoritesData {
  const oldFavorites = getStorageJSON<number[]>('favorites')
  if (oldFavorites && Array.isArray(oldFavorites)) {
    try {
      localStorage.removeItem('favorites')
    } catch (error) {
      console.warn('Failed to remove old favorites during migration', { error })
    }
    return {
      general: oldFavorites,
      lists: [],
    }
  }
  return { general: [], lists: [] }
}

export function FavoritesProvider({
  children,
  onStorageError,
}: {
  children: ReactNode
  onStorageError?: (error: StorageError) => void
}) {
  const [data, setData] = useState<FavoritesData>(() => {
    const stored = getStorageJSON<FavoritesData>(STORAGE_KEY)
    if (stored) {
      return stored
    }
    return migrateOldFavorites()
  })

  const handleStorageError = useCallback(
    (error: StorageError) => {
      onStorageError?.(error)
    },
    [onStorageError]
  )

  useEffect(() => {
    const result = setStorageJSON(STORAGE_KEY, data, {
      onQuotaExceeded: handleStorageError,
    })

    if (!result.success && result.error) {
      handleStorageError(result.error)
    }
  }, [data, handleStorageError])

  const favorites = data.general
  const lists = data.lists

  const addFavorite = useCallback((movieId: number, listId?: string) => {
    setData(prev => {
      if (listId) {
        const listIndex = prev.lists.findIndex(l => l.id === listId)
        if (listIndex >= 0) {
          const list = prev.lists[listIndex]
          if (list.movieIds.includes(movieId)) return prev
          const updatedLists = [...prev.lists]
          updatedLists[listIndex] = {
            ...list,
            movieIds: [...list.movieIds, movieId],
          }
          return { ...prev, lists: updatedLists }
        }
        return prev
      } else {
        if (prev.general.includes(movieId)) return prev
        return { ...prev, general: [...prev.general, movieId] }
      }
    })
  }, [])

  const removeFavorite = useCallback((movieId: number, listId?: string) => {
    setData(prev => {
      if (listId) {
        const listIndex = prev.lists.findIndex(l => l.id === listId)
        if (listIndex >= 0) {
          const updatedLists = [...prev.lists]
          updatedLists[listIndex] = {
            ...prev.lists[listIndex],
            movieIds: prev.lists[listIndex].movieIds.filter(id => id !== movieId),
          }
          return { ...prev, lists: updatedLists }
        }
        return prev
      } else {
        return { ...prev, general: prev.general.filter(id => id !== movieId) }
      }
    })
  }, [])

  const isFavorite = useCallback(
    (movieId: number, listId?: string) => {
      if (listId) {
        const list = data.lists.find(l => l.id === listId)
        return list ? list.movieIds.includes(movieId) : false
      }
      return data.general.includes(movieId)
    },
    [data]
  )

  const isFavoriteInAnyList = useCallback(
    (movieId: number) => {
      if (data.general.includes(movieId)) {
        return true
      }
      return data.lists.some(list => list.movieIds.includes(movieId))
    },
    [data]
  )

  const getListsContainingMovie = useCallback(
    (movieId: number): Array<{ id: string | null; name: string }> => {
      const result: Array<{ id: string | null; name: string }> = []

      if (data.general.includes(movieId)) {
        result.push({ id: null, name: texts.lists.favorites })
      }

      data.lists.forEach(list => {
        if (list.movieIds.includes(movieId)) {
          result.push({ id: list.id, name: list.name })
        }
      })

      return result
    },
    [data]
  )

  const toggleFavorite = useCallback(
    (movieId: number, listId?: string) => {
      if (isFavorite(movieId, listId)) {
        removeFavorite(movieId, listId)
      } else {
        addFavorite(movieId, listId)
      }
    },
    [isFavorite, addFavorite, removeFavorite]
  )

  const createList = useCallback((name: string): string => {
    const newList: FavoriteList = {
      id: Math.random().toString(36).substring(7),
      name,
      movieIds: [],
      createdAt: new Date().toISOString(),
    }
    setData(prev => ({
      ...prev,
      lists: [...prev.lists, newList],
    }))
    return newList.id
  }, [])

  const updateList = useCallback((listId: string, name: string) => {
    setData(prev => {
      const listIndex = prev.lists.findIndex(l => l.id === listId)
      if (listIndex >= 0) {
        const updatedLists = [...prev.lists]
        updatedLists[listIndex] = { ...prev.lists[listIndex], name }
        return { ...prev, lists: updatedLists }
      }
      return prev
    })
  }, [])

  const deleteList = useCallback((listId: string) => {
    setData(prev => ({
      ...prev,
      lists: prev.lists.filter(l => l.id !== listId),
    }))
  }, [])

  const getList = useCallback(
    (listId: string) => {
      return data.lists.find(l => l.id === listId)
    },
    [data.lists]
  )

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        lists,
        addFavorite,
        removeFavorite,
        isFavorite,
        isFavoriteInAnyList,
        getListsContainingMovie,
        toggleFavorite,
        createList,
        updateList,
        deleteList,
        getList,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider')
  }
  return context
}
