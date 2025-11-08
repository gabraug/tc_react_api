import { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { searchMovies } from '../../services/endpoints/search'
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
  Header,
  Grid,
  LoadingContainer,
  LoadingSpinner,
  EmptyState,
  EmptyButton,
} from './Search.styles'

type SortOptionType = 'title-asc' | 'title-desc' | 'rating-desc' | 'rating-asc' | 'favorites-first'

function Search() {
  const { isFavoriteInAnyList } = useFavorites()
  const { showToast } = useToast()
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const [movies, setMovies] = useState<Movie[]>([])
  const [totalResults, setTotalResults] = useState(0)
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasMore, setHasMore] = useState(true)
  const [sortBy, setSortBy] = useState<SortOptionType>('title-asc')
  const loadedPagesRef = useRef<Set<number>>(new Set())
  const loadingRef = useRef(false)

  const loadMovies = useCallback(
    async (pageNum: number, searchQuery: string, isInitialLoad: boolean = false) => {
      if (!searchQuery.trim() || loadedPagesRef.current.has(pageNum) || loadingRef.current) {
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
        loadedPagesRef.current.add(pageNum)
      } catch (_err) {
        const errorMessage = texts.errors.searchMovies
        setError(errorMessage)
        if (isInitialLoad) {
          showToast(errorMessage, 'error')
        } else {
          showToast(texts.errors.loadMoreResults, 'error')
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
    const searchQuery = query.trim()
    if (searchQuery) {
      setMovies([])
      setTotalResults(0)
      setPage(1)
      setError(null)
      loadedPagesRef.current.clear()
      loadMovies(1, searchQuery, true)
    } else {
      setMovies([])
      setTotalResults(0)
      setIsLoading(false)
    }
  }, [query, loadMovies])

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.documentElement.offsetHeight - 1000 &&
        !loadingRef.current &&
        hasMore &&
        query.trim() &&
        !loadedPagesRef.current.has(page + 1)
      ) {
        setPage(prev => prev + 1)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [hasMore, page, query])

  useEffect(() => {
    if (page > 1 && query.trim() && !loadedPagesRef.current.has(page)) {
      loadMovies(page, query.trim(), false)
    }
  }, [page, query, loadMovies])

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
        <ContentWrapper>
          <LoadingContainer>
            <LoadingSpinner />
            <Text size="md" color="text">
              {texts.loading.searching}
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

export default Search
