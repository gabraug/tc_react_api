import { useState, useEffect, useCallback, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { searchMovies } from '../../services/endpoints/search'
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
import { Container, ContentWrapper, Header, Grid, EmptyState, EmptyButton } from './Search.styles'

function Search() {
  const { isFavoriteInAnyList } = useFavorites()
  const { showToast } = useToast()
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const [movies, setMovies] = useState<Movie[]>([])
  const [totalResults, setTotalResults] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasMore, setHasMore] = useState(true)
  const [sortBy, setSortBy] = useState<SortOptionType>('title-asc')
  const setLoadingRef = useRef<((loading: boolean) => void) | null>(null)

  const loadMovies = useCallback(
    async (pageNum: number, searchQuery: string, isInitialLoad: boolean = false) => {
      if (!searchQuery.trim()) {
        return
      }

      if (isInitialLoad) {
        setIsLoading(true)
      } else {
        setIsLoadingMore(true)
      }

      try {
        setError(null)
        const data = await searchMovies(searchQuery, pageNum)
        setMovies(prev => {
          if (isInitialLoad) {
            return data.results
          }
          const existingIds = new Set(prev.map(m => m.id))
          const newMovies = data.results.filter(m => !existingIds.has(m.id))
          return [...prev, ...newMovies]
        })
        setTotalResults(data.total_results)
        setHasMore(pageNum < data.total_pages)
        setLoadingRef.current?.(false)
      } catch (_err) {
        const errorMessage = texts.errors.searchMovies
        setError(errorMessage)
        if (isInitialLoad) {
          showToast(errorMessage, 'error')
        } else {
          showToast(texts.errors.loadMoreResults, 'error')
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
    hasMore: hasMore && !!query.trim(),
    isLoading: isLoading || isLoadingMore,
    onLoadMore: page => loadMovies(page, query.trim(), false),
  })

  useEffect(() => {
    setLoadingRef.current = infiniteScroll.setLoading
  }, [infiniteScroll.setLoading])

  useEffect(() => {
    const searchQuery = query.trim()
    if (searchQuery) {
      setMovies([])
      setTotalResults(0)
      setError(null)
      infiniteScroll.reset()
      loadMovies(1, searchQuery, true)
    } else {
      setMovies([])
      setTotalResults(0)
      setIsLoading(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query])

  const sortedMovies = useSorting({
    items: movies,
    sortBy,
    isFavorite: isFavoriteInAnyList,
  })

  if (!query.trim()) {
    return (
      <Container>
        <ContentWrapper>
          <EmptyState>
            <Text size="md" color="text" align="center">
              {texts.empty.noSearchTerm}
            </Text>
          </EmptyState>
        </ContentWrapper>
      </Container>
    )
  }

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
          <Header>
            <Text as="h2" size="md" color="white" weight="bold">
              {texts.search.resultsFor(query)}
            </Text>
            <Text size="sm" color="textLight">
              {texts.loading.searching}
            </Text>
          </Header>
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
          <EmptyState>
            <Text size="md" color="error">
              {error}
            </Text>
            <EmptyButton
              onClick={() => {
                const searchInput = document.getElementById(
                  'header-search-input'
                ) as HTMLInputElement
                if (searchInput) {
                  searchInput.focus()
                  searchInput.select()
                }
              }}
            >
              {texts.buttons.retry}
            </EmptyButton>
          </EmptyState>
        </ContentWrapper>
      </Container>
    )
  }

  if (movies.length === 0 && !isLoading) {
    return (
      <Container>
        <ContentWrapper>
          <EmptyState>
            <Text size="md" color="text" align="center">
              {texts.empty.noMoviesFound(query)}
            </Text>
            <Text size="sm" color="textLight" align="center">
              {texts.empty.noMoviesFoundDescription}
            </Text>
            <EmptyButton
              onClick={() => {
                const searchInput = document.getElementById(
                  'header-search-input'
                ) as HTMLInputElement
                if (searchInput) {
                  searchInput.focus()
                  searchInput.select()
                }
              }}
            >
              {texts.buttons.searchAgain}
            </EmptyButton>
          </EmptyState>
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
        <Header>
          <Text as="h2" size="md" color="white" weight="bold">
            {texts.search.resultsFor(query)}
          </Text>
          <Text size="sm" color="textLight">
            {texts.search.foundMovies(totalResults)}
          </Text>
        </Header>
        <Grid>
          {sortedMovies.map(movie => (
            <MovieCard key={movie.id} movie={movie} searchTerm={query} />
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

export default Search
