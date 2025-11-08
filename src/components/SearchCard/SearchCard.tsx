import { useNavigate } from 'react-router-dom'
import type { Movie } from '../../types/movie'
import Text from '../Text/Text'
import {
  Card,
  PosterContainer,
  Poster,
  Placeholder,
  Title,
  HighlightedTitle,
} from './SearchCard.styles'

interface SearchCardProps {
  movie: Movie
  searchTerm: string
}

function SearchCard({ movie, searchTerm }: SearchCardProps) {
  const navigate = useNavigate()

  const handleCardClick = () => {
    navigate(`/movie/${movie.id}`)
  }

  const highlightText = (text: string, term: string) => {
    if (!term) return text

    const regex = new RegExp(`(${term})`, 'gi')
    const parts = text.split(regex)

    return parts.map((part, index) =>
      regex.test(part) ? <HighlightedTitle key={index}>{part}</HighlightedTitle> : part
    )
  }

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w300/${movie.poster_path}`
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
      </PosterContainer>
      <Title>{highlightText(movie.title, searchTerm)}</Title>
    </Card>
  )
}

export default SearchCard
