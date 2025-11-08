import Text from '../Text/Text'
import { GenreCardContainer } from './GenreCard.styles'

interface GenreCardProps {
  name: string
}

function GenreCard({ name }: GenreCardProps) {
  return (
    <GenreCardContainer>
      <Text as="span" size="xs" color="white" weight="normal">
        {name}
      </Text>
    </GenreCardContainer>
  )
}

export default GenreCard
