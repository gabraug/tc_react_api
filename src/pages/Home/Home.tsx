import { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import { getPopularMovies } from '../../services/endpoints/movies'
import type { Movie } from '../../types/movie'
import { useFavorites } from '../../contexts/Favorites/FavoritesContext'
import { useToast } from '../../contexts/Toast/ToastContext'
import MovieCard from '../../components/MovieCard/MovieCard'
import SortPanel from '../../components/SortPanel/SortPanel'
import Text from '../../components/Text/Text'
import { texts } from '../../constants/texts'
import {
  Container,
  ContentWrapper,
  Grid,
  LoadingContainer,
  LoadingSpinner,
  ErrorContainer,
  ErrorButton,
} from './Home.styles'

type SortOptionType = 'title-asc' | 'title-desc' | 'rating-desc' | 'rating-asc' | 'favorites-first'

function Home() {
  const { isFavoriteInAnyList } = useFavorites()
  const { showToast } = useToast()
  const [movies, setMovies] = useState<Movie[]>([])
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasMore, setHasMore] = useState(true)
  const [sortBy, setSortBy] = useState<SortOptionType>('title-asc')
  const loadedPagesRef = useRef<Set<number>>(new Set())
  const loadingRef = useRef(false)

  const loadMovies = useCallback(
    async (pageNum: number, isInitialLoad: boolean = false) => {
      if (loadedPagesRef.current.has(pageNum) || loadingRef.current) {
        return
      }

      loadingRef.current = true
      if (isInitialLoad) {
        setIsLoading(true)
      } else {
        setIsLoadingMore(true)
      }

      try {
        setError(null)
        const data = await getPopularMovies(pageNum)
        setMovies(prev => {
          if (isInitialLoad) {
            return data.results
          }
          const existingIds = new Set(prev.map(m => m.id))
          const newMovies = data.results.filter(m => !existingIds.has(m.id))
          return [...prev, ...newMovies]
        })
        setHasMore(pageNum < data.total_pages)
        loadedPagesRef.current.add(pageNum)
      } catch (_err) {
        const errorMessage = texts.errors.loadMovies
        setError(errorMessage)
        if (isInitialLoad) {
          showToast(errorMessage, 'error')
        } else {
          showToast(texts.errors.loadMoreMovies, 'error')
        }
      } finally {
        if (isInitialLoad) {
          setIsLoading(false)
        } else {
          setIsLoadingMore(false)
        }
        loadingRef.current = false
      }
    },
    [showToast]
  )

  useEffect(() => {
    loadMovies(1, true)
  }, [loadMovies])

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.documentElement.offsetHeight - 1000 &&
        !loadingRef.current &&
        hasMore &&
        !loadedPagesRef.current.has(page + 1)
      ) {
        setPage(prev => prev + 1)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [hasMore, page])

  useEffect(() => {
    if (page > 1 && !loadedPagesRef.current.has(page)) {
      loadMovies(page, false)
    }
  }, [page, loadMovies])

  const sortedMovies = useMemo(() => {
    const sorted = [...movies]

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
        return sorted.sort((a, b) => {
          const aIsFavorite = isFavoriteInAnyList(a.id)
          const bIsFavorite = isFavoriteInAnyList(b.id)
          if (aIsFavorite && !bIsFavorite) return -1
          if (!aIsFavorite && bIsFavorite) return 1
          return 0
        })
      default:
        return sorted
    }
  }, [movies, sortBy, isFavoriteInAnyList])

  if (isLoading) {
    return (
      <Container>
        <ContentWrapper>
          <LoadingContainer>
            <LoadingSpinner />
            <Text size="md" color="text">
              {texts.loading.movies}
            </Text>
          </LoadingContainer>
        </ContentWrapper>
      </Container>
    )
  }

  if (error && movies.length === 0) {
    return (
      <Container>
        <ContentWrapper>
          <ErrorContainer>
            <Text size="md" color="error">
              {error}
            </Text>
            <ErrorButton onClick={() => loadMovies(1, true)}>{texts.buttons.retry}</ErrorButton>
          </ErrorContainer>
        </ContentWrapper>
      </Container>
    )
  }

  const sortOptions = [
    { value: 'title-asc', label: texts.sortOptions.titleAsc },
    { value: 'title-desc', label: texts.sortOptions.titleDesc },
    { value: 'rating-desc', label: texts.sortOptions.ratingDesc },
    { value: 'rating-asc', label: texts.sortOptions.ratingAsc },
    { value: 'favorites-first', label: texts.sortOptions.favoritesFirst },
  ]

  return (
    <Container>
      <SortPanel
        title={texts.labels.sortBy}
        options={sortOptions}
        activeValue={sortBy}
        onSelect={value => setSortBy(value as SortOptionType)}
      />
      <ContentWrapper>
        <Grid>
          {sortedMovies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </Grid>
        {isLoadingMore && (
          <LoadingContainer>
            <LoadingSpinner />
            <Text size="md" color="text">
              {texts.loading.moreMovies}
            </Text>
          </LoadingContainer>
        )}
        {error && movies.length > 0 && (
          <Text size="sm" color="error">
            {error}
          </Text>
        )}
      </ContentWrapper>
    </Container>
  )
}

export default Home
