import { useEffect, useRef, useState, useCallback } from 'react'

interface UseInfiniteScrollProps {
  hasMore: boolean
  isLoading: boolean
  onLoadMore: (page: number) => void
  threshold?: number
}

export const useInfiniteScroll = ({
  hasMore,
  isLoading,
  onLoadMore,
  threshold = 1000,
}: UseInfiniteScrollProps) => {
  const [page, setPage] = useState(1)
  const loadedPagesRef = useRef<Set<number>>(new Set())
  const loadingRef = useRef(false)

  const reset = useCallback(() => {
    setPage(1)
    loadedPagesRef.current.clear()
    loadingRef.current = false
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.documentElement.offsetHeight - threshold &&
        !loadingRef.current &&
        hasMore &&
        !isLoading &&
        !loadedPagesRef.current.has(page + 1)
      ) {
        setPage(prev => prev + 1)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [hasMore, isLoading, page, threshold])

  useEffect(() => {
    if (
      page > 1 &&
      !loadedPagesRef.current.has(page) &&
      hasMore &&
      !isLoading &&
      !loadingRef.current
    ) {
      loadedPagesRef.current.add(page)
      loadingRef.current = true
      onLoadMore(page)
    }
  }, [page, hasMore, isLoading, onLoadMore])

  const setLoading = useCallback((loading: boolean) => {
    loadingRef.current = loading
  }, [])

  return { page, reset, setPage, setLoading }
}
