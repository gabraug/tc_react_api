import { useState, useEffect, useCallback, useRef } from 'react'
import { getPopularMovies } from '../../services/endpoints/movies'
import type { Movie } from '../../types/movie'
import { useFavorites } from '../../contexts/Favorites/FavoritesContext'
import { useToast } from '../../contexts/Toast/ToastContext'
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll'
import { useSorting } from '../../hooks/useSorting'
import type { SortOptionType } from '../../types/common'
import MovieCard from '../../components/MovieCard/MovieCard'
import MovieCardSkeleton from '../../components/MovieCardSkeleton/MovieCardSkeleton'
import SortPanel from '../../components/SortPanel/SortPanel'
import Text from '../../components/Text/Text'
import { texts } from '../../constants/texts'
import { Container, ContentWrapper, Grid, ErrorContainer, ErrorButton } from './Home.styles'

function Home() {
  const { isFavoriteInAnyList } = useFavorites()
  const { showToast } = useToast()
  const [movies, setMovies] = useState<Movie[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasMore, setHasMore] = useState(true)
  const [sortBy, setSortBy] = useState<SortOptionType>('title-asc')
  const setLoadingRef = useRef<((loading: boolean) => void) | null>(null)

  const loadMovies = useCallback(
    async (pageNum: number, isInitialLoad: boolean = false) => {
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
        setLoadingRef.current?.(false)
      } catch (_err) {
        const errorMessage = texts.errors.loadMovies
        setError(errorMessage)
        if (isInitialLoad) {
          showToast(errorMessage, 'error')
        } else {
          showToast(texts.errors.loadMoreMovies, 'error')
        }
        setLoadingRef.current?.(false)
      } finally {
        if (isInitialLoad) {
          setIsLoading(false)
        } else {
          setIsLoadingMore(false)
        }
      }
    },
    [showToast]
  )

  const infiniteScroll = useInfiniteScroll({
    hasMore,
    isLoading: isLoading || isLoadingMore,
    onLoadMore: page => loadMovies(page, false),
  })

  useEffect(() => {
    setLoadingRef.current = infiniteScroll.setLoading
  }, [infiniteScroll.setLoading])

  useEffect(() => {
    loadMovies(1, true)
    infiniteScroll.reset()
  }, [])

  const sortedMovies = useSorting({
    items: movies,
    sortBy,
    isFavorite: isFavoriteInAnyList,
  })

  if (isLoading) {
    return (
      <Container>
        <SortPanel
          title={texts.labels.sortBy}
          options={[
            { value: 'title-asc', label: texts.sortOptions.titleAsc },
            { value: 'title-desc', label: texts.sortOptions.titleDesc },
            { value: 'rating-desc', label: texts.sortOptions.ratingDesc },
            { value: 'rating-asc', label: texts.sortOptions.ratingAsc },
            { value: 'favorites-first', label: texts.sortOptions.favoritesFirst },
          ]}
          activeValue={sortBy}
          onSelect={() => {}}
        />
        <ContentWrapper>
          <Grid>
            <MovieCardSkeleton count={12} />
          </Grid>
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
          {isLoadingMore && <MovieCardSkeleton count={6} />}
        </Grid>
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
