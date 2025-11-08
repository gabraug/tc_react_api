import { useState, useMemo, useCallback, memo } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Movie, MovieDetails as MovieDetailsType } from '../../types/movie'
import { useFavorites } from '../../contexts/Favorites/FavoritesContext'
import { useToast } from '../../contexts/Toast/ToastContext'
import FavoriteModal from '../FavoriteModal/FavoriteModal'
import RemoveFavoriteModal from '../RemoveFavoriteModal/RemoveFavoriteModal'
import Text from '../Text/Text'
import Heart from '../../icons/Heart'
import Star from '../../icons/Star'
import Trash from '../../icons/Trash'
import { texts } from '../../constants/texts'
import {
  Card,
  PosterContainer,
  Poster,
  Placeholder,
  FavoriteButton,
  DeleteButton,
  Title,
  HighlightedText,
  Rating,
} from './MovieCard.styles'

interface MovieCardProps {
  movie: Movie | MovieDetailsType
  searchTerm?: string
  showDeleteButton?: boolean
  onDelete?: (movieId: number) => void
}

const MovieCard = memo(function MovieCard({
  movie,
  searchTerm = '',
  showDeleteButton = false,
  onDelete,
}: MovieCardProps) {
  const navigate = useNavigate()
  const { isFavoriteInAnyList, removeFavorite, addFavorite, getList, getListsContainingMovie } =
    useFavorites()
  const { showToast } = useToast()
  const [showModal, setShowModal] = useState(false)
  const [showRemoveModal, setShowRemoveModal] = useState(false)

  const favorite = useMemo(() => isFavoriteInAnyList(movie.id), [isFavoriteInAnyList, movie.id])

  const posterUrl = useMemo(() => {
    if ('poster_path' in movie && movie.poster_path) {
      return `https://image.tmdb.org/t/p/w300/${movie.poster_path}`
    }
    if ('backdrop_path' in movie && movie.backdrop_path) {
      return `https://image.tmdb.org/t/p/w300/${movie.backdrop_path}`
    }
    return null
  }, [movie])

  const rating = useMemo(() => {
    const voteAverage = 'vote_average' in movie ? movie.vote_average : 0
    return voteAverage.toFixed(1)
  }, [movie])

  const highlightText = useCallback((text: string, term: string) => {
    if (!term || !term.trim()) return text

    const trimmedTerm = term.trim()
    const escapedTerm = trimmedTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const regex = new RegExp(`(${escapedTerm})`, 'gi')
    const parts = text.split(regex)

    return parts
      .map((part, index) => {
        if (!part) return null
        const isMatch = regex.test(part)
        regex.lastIndex = 0
        return isMatch ? (
          <HighlightedText key={`highlight-${index}`}>{part}</HighlightedText>
        ) : (
          <span key={`text-${index}`}>{part}</span>
        )
      })
      .filter(Boolean)
  }, [])

  const handleCardClick = useCallback(() => {
    navigate(`/movie/${movie.id}`)
  }, [navigate, movie.id])

  const handleFavoriteClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      if (favorite) {
        const listsContainingMovie = getListsContainingMovie(movie.id)
        if (
          listsContainingMovie.length > 1 ||
          (listsContainingMovie.length === 1 && listsContainingMovie[0].id !== null)
        ) {
          setShowRemoveModal(true)
        } else {
          removeFavorite(movie.id)
          showToast(texts.info.movieRemovedFromFavorites(movie.title), 'info')
        }
      } else {
        setShowModal(true)
      }
    },
    [favorite, getListsContainingMovie, movie.id, movie.title, removeFavorite, showToast]
  )

  const handleModalClose = useCallback(() => {
    setShowModal(false)
  }, [])

  const handleModalConfirm = useCallback(
    (listId: string | null) => {
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
    [addFavorite, movie.id, movie.title, getList, showToast]
  )

  const handleRemoveModalConfirm = useCallback(
    (listId: string | null) => {
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
    [movie.id, movie.title, removeFavorite, getList, showToast]
  )

  const handleDeleteClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      if (onDelete) {
        onDelete(movie.id)
      }
    },
    [onDelete, movie.id]
  )

  return (
    <>
      <Card onClick={handleCardClick}>
        <PosterContainer>
          {posterUrl ? (
            <Poster src={posterUrl} alt={movie.title} loading="lazy" />
          ) : (
            <Placeholder>
              <Text size="xs" color="textDark" align="center">
                {texts.empty.noPoster}
              </Text>
            </Placeholder>
          )}
          {showDeleteButton ? (
            <DeleteButton onClick={handleDeleteClick}>
              <Trash size={20} color="white" />
            </DeleteButton>
          ) : (
            <FavoriteButton $isFavorite={favorite} onClick={handleFavoriteClick}>
              <Heart filled={favorite} size={20} color="white" />
            </FavoriteButton>
          )}
        </PosterContainer>
        <Title>
          {searchTerm ? (
            highlightText(movie.title, searchTerm)
          ) : (
            <Text as="span" size="sm" color="white" weight="semibold">
              {movie.title}
            </Text>
          )}
        </Title>
        <Rating>
          <Text as="span" size="xs" color="textLight" weight="normal">
            {texts.labels.tmdbRating}
          </Text>
          <Star filled={true} size={16} color="#FFD700" />
          <Text as="span" size="sm" color="white" weight="bold">
            {rating}
          </Text>
        </Rating>
      </Card>
      {showModal && !showDeleteButton && (
        <FavoriteModal
          movieId={movie.id}
          movieTitle={movie.title}
          isOpen={showModal}
          onClose={handleModalClose}
          onConfirm={handleModalConfirm}
        />
      )}
      {showRemoveModal && !showDeleteButton && (
        <RemoveFavoriteModal
          movieId={movie.id}
          movieTitle={movie.title}
          isOpen={showRemoveModal}
          onClose={() => setShowRemoveModal(false)}
          onConfirm={handleRemoveModalConfirm}
        />
      )}
    </>
  )
})

MovieCard.displayName = 'MovieCard'

export default MovieCard
