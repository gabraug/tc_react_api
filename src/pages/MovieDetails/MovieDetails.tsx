import { useEffect, useState, useCallback, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getMovieDetails } from '../../services/endpoints/movies'
import type { MovieDetails as MovieDetailsType } from '../../types/movie'
import { useFavorites } from '../../contexts/Favorites/FavoritesContext'
import { useToast } from '../../contexts/Toast/ToastContext'
import FavoriteModal from '../../components/FavoriteModal/FavoriteModal'
import RemoveFavoriteModal from '../../components/RemoveFavoriteModal/RemoveFavoriteModal'
import GenreCard from '../../components/GenreCard/GenreCard'
import Button from '../../components/Button/Button'
import Text from '../../components/Text/Text'
import Heart from '../../icons/Heart'
import Star from '../../icons/Star'
import ArrowLeft from '../../icons/ArrowLeft'
import { texts } from '../../constants/texts'
import { colors } from '../../styles/constants'
import {
  Container,
  BackButtonWrapper,
  ContentWrapper,
  ImageContainer,
  BackdropImage,
  Placeholder,
  Content,
  Genres,
  InfoRow,
  ReleaseDate,
  Rating,
  Overview,
  FavoriteButtonWrapper,
  FavoriteButtonContent,
  LoadingContainer,
  LoadingSpinner,
  ErrorContainer,
  ImageLoadingContainer,
  ImageLoadingSpinner,
} from './MovieDetails.styles'

function MovieDetails() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [movie, setMovie] = useState<MovieDetailsType | null>(null)
  const [loading, setLoading] = useState(true)
  const [imageLoading, setImageLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [showRemoveModal, setShowRemoveModal] = useState(false)
  const { isFavoriteInAnyList, removeFavorite, addFavorite, getList } = useFavorites()
  const { showToast } = useToast()

  const loadMovie = useCallback(async () => {
    if (!id) return

    try {
      setLoading(true)
      setImageLoading(true)
      setError(null)
      const data = await getMovieDetails(Number(id))
      setMovie(data)
    } catch (_err) {
      const errorMessage = texts.errors.loadMovieDetails
      setError(errorMessage)
      showToast(errorMessage, 'error')
    } finally {
      setLoading(false)
    }
  }, [id, showToast])

  useEffect(() => {
    loadMovie()
  }, [loadMovie])

  const handleFavoriteClick = useCallback(() => {
    if (!movie) return
    const favorite = isFavoriteInAnyList(movie.id)
    if (favorite) {
      setShowRemoveModal(true)
    } else {
      setShowModal(true)
    }
  }, [movie, isFavoriteInAnyList])

  const handleModalConfirm = useCallback(
    (listId: string | null) => {
      if (!movie) return
      if (listId) {
        addFavorite(movie.id, listId)
        const list = getList(listId)
        showToast(
          texts.success.movieAddedToList(movie.title, list?.name || texts.lists.defaultListName),
          'success'
        )
      } else {
        addFavorite(movie.id)
        showToast(texts.success.movieAddedToFavorites(movie.title), 'success')
      }
      setShowModal(false)
    },
    [movie, addFavorite, getList, showToast]
  )

  const handleRemoveModalConfirm = useCallback(
    (listId: string | null) => {
      if (!movie) return
      removeFavorite(movie.id, listId || undefined)
      if (listId) {
        const list = getList(listId)
        showToast(
          texts.info.movieRemovedFromList(movie.title, list?.name || texts.lists.defaultListName),
          'info'
        )
      } else {
        showToast(texts.info.movieRemovedFromFavorites(movie.title), 'info')
      }
      setShowRemoveModal(false)
    },
    [movie, removeFavorite, getList, showToast]
  )

  const handleBack = useCallback(() => {
    navigate(-1)
  }, [navigate])

  const handleRetry = useCallback(() => {
    if (id) {
      loadMovie()
    }
  }, [id, loadMovie])

  const backdropUrl = movie?.backdrop_path
    ? `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`
    : null

  const imageRef = useRef<HTMLImageElement | null>(null)

  const handleImageLoad = useCallback(() => {
    setImageLoading(false)
  }, [])

  const handleImageError = useCallback(() => {
    setImageLoading(false)
  }, [])

  useEffect(() => {
    if (movie && backdropUrl) {
      setImageLoading(true)
      const img = new Image()

      const handleLoad = () => {
        setImageLoading(false)
      }

      const handleError = () => {
        setImageLoading(false)
      }

      img.onload = handleLoad
      img.onerror = handleError
      img.src = backdropUrl

      if (img.complete) {
        setImageLoading(false)
      }
    } else if (!backdropUrl) {
      setImageLoading(false)
    }
  }, [movie, backdropUrl])

  const favorite = movie ? isFavoriteInAnyList(movie.id) : false

  if (loading) {
    return (
      <Container>
        <BackButtonWrapper>
          <Button variant="secondary" size="sm" onClick={handleBack}>
            <FavoriteButtonContent>
              <ArrowLeft size={18} color="currentColor" />
              <Text as="span" size="sm" color="white">
                {texts.navigation.back}
              </Text>
            </FavoriteButtonContent>
          </Button>
        </BackButtonWrapper>
        <LoadingContainer>
          <LoadingSpinner />
          <Text size="md" color="text">
            {texts.loading.movieDetails}
          </Text>
        </LoadingContainer>
      </Container>
    )
  }

  if (error || !movie) {
    return (
      <Container>
        <BackButtonWrapper>
          <Button variant="secondary" size="sm" onClick={handleBack}>
            <FavoriteButtonContent>
              <ArrowLeft size={18} color="currentColor" />
              <Text as="span" size="sm" color="white">
                {texts.navigation.back}
              </Text>
            </FavoriteButtonContent>
          </Button>
        </BackButtonWrapper>
        <ErrorContainer>
          <Text size="md" color="error">
            {error || texts.errors.loadMovieDetails}
          </Text>
          <Button variant="primary" size="md" onClick={handleRetry}>
            {texts.buttons.retry}
          </Button>
        </ErrorContainer>
      </Container>
    )
  }

  const releaseDate = movie.release_date
    ? new Date(movie.release_date).toLocaleDateString('pt-BR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : texts.empty.noReleaseDate

  const rating = movie.vote_average.toFixed(1)

  return (
    <Container>
      <BackButtonWrapper>
        <Button variant="secondary" size="sm" onClick={handleBack}>
          <FavoriteButtonContent>
            <ArrowLeft size={18} color="currentColor" />
            <Text as="span" size="sm" color="white">
              {texts.navigation.back}
            </Text>
          </FavoriteButtonContent>
        </Button>
      </BackButtonWrapper>
      <ContentWrapper>
        <ImageContainer>
          {backdropUrl ? (
            <>
              {imageLoading && (
                <ImageLoadingContainer>
                  <ImageLoadingSpinner />
                  <Text size="sm" color="textLight" align="center">
                    {texts.loading.image}
                  </Text>
                </ImageLoadingContainer>
              )}
              <BackdropImage
                ref={imageRef}
                src={backdropUrl}
                alt={movie.title}
                onLoad={handleImageLoad}
                onError={handleImageError}
                loading="lazy"
                style={{ opacity: imageLoading ? 0 : 1, transition: 'opacity 0.3s ease-in-out' }}
              />
            </>
          ) : (
            <Placeholder>
              <Text size="sm" color="textDark" align="center">
                {texts.empty.noImage}
              </Text>
            </Placeholder>
          )}
        </ImageContainer>
        <Content>
          <Text as="h1" size="lg" color="white" weight="bold">
            {movie.title}
          </Text>
          <Genres>
            {movie.genres.length > 0 ? (
              movie.genres.map(genre => <GenreCard key={genre.id} name={genre.name} />)
            ) : (
              <GenreCard name={texts.empty.noGenre} />
            )}
          </Genres>
          <InfoRow>
            <ReleaseDate>
              <Text as="span" size="sm" color="text">
                <Text as="strong" size="sm" color="white" weight="bold">
                  {texts.labels.releaseDate}
                </Text>{' '}
                {releaseDate}
              </Text>
            </ReleaseDate>
            <Rating>
              <Text as="span" size="xs" color="textLight" weight="normal">
                {texts.labels.tmdbRating}
              </Text>
              <Star filled={true} size={18} color={colors.star} />
              <Text as="span" size="sm" color="white" weight="bold">
                {rating}
              </Text>
            </Rating>
          </InfoRow>
          <Overview>
            <Text as="h3" size="md" color="white" weight="semibold">
              {texts.labels.synopsis}
            </Text>
            <Text size="sm" color="text" align="justify" lineHeight={1.8}>
              {movie.overview || texts.empty.noSynopsis}
            </Text>
          </Overview>
          <FavoriteButtonWrapper>
            <Button
              variant={favorite ? 'danger' : 'primary'}
              size="md"
              onClick={handleFavoriteClick}
            >
              <FavoriteButtonContent>
                <Heart filled={favorite} size={18} color="white" />
                <Text as="span" size="sm" color="white">
                  {favorite ? texts.buttons.removeFromFavorites : texts.buttons.addToFavorites}
                </Text>
              </FavoriteButtonContent>
            </Button>
          </FavoriteButtonWrapper>
        </Content>
      </ContentWrapper>
      {movie && (
        <>
          <FavoriteModal
            movieId={movie.id}
            movieTitle={movie.title}
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            onConfirm={handleModalConfirm}
          />
          <RemoveFavoriteModal
            movieId={movie.id}
            movieTitle={movie.title}
            isOpen={showRemoveModal}
            onClose={() => setShowRemoveModal(false)}
            onConfirm={handleRemoveModalConfirm}
          />
        </>
      )}
    </Container>
  )
}

export default MovieDetails
