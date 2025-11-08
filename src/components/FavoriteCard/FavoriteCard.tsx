import { useNavigate } from 'react-router-dom'
import type { MovieDetails as MovieDetailsType } from '../../types/movie'
import Text from '../Text/Text'
import Trash from '../../icons/Trash'
import { texts } from '../../constants/texts'
import {
  Card,
  PosterContainer,
  Poster,
  Placeholder,
  Title,
  DeleteButton,
} from './FavoriteCard.styles'

interface FavoriteCardProps {
  movie: MovieDetailsType
  onDelete: (movieId: number) => void
}

function FavoriteCard({ movie, onDelete }: FavoriteCardProps) {
  const navigate = useNavigate()

  const handleCardClick = () => {
    navigate(`/movie/${movie.id}`)
  }

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    onDelete(movie.id)
  }

  const posterUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/w300/${movie.backdrop_path}`
    : null

  return (
    <Card onClick={handleCardClick}>
      <PosterContainer>
        {posterUrl ? (
          <Poster src={posterUrl} alt={movie.title} />
        ) : (
          <Placeholder>
            <Text size="xs" color="textDark" align="center">
              Sem imagem
            </Text>
          </Placeholder>
        )}
        <DeleteButton onClick={handleDeleteClick}>
          <Trash size={20} color="white" />
        </DeleteButton>
      </PosterContainer>
      <Title>
        <Text as="span" size="sm" color="white" weight="semibold">
          {movie.title}
        </Text>
      </Title>
    </Card>
  )
}

export default FavoriteCard
