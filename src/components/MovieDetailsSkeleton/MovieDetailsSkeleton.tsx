import { memo } from 'react'
import Button from '../Button/Button'
import Text from '../Text/Text'
import ArrowLeft from '../../icons/ArrowLeft'
import { texts } from '../../constants/texts'
import {
  Container,
  BackButtonWrapper,
  ContentWrapper,
  SkeletonImageContainer,
  SkeletonContent,
  SkeletonTitle,
  SkeletonGenres,
  SkeletonGenre,
  SkeletonInfoRow,
  SkeletonReleaseDate,
  SkeletonRating,
  SkeletonOverview,
  SkeletonButton,
  FavoriteButtonContent,
} from './MovieDetailsSkeleton.styles'

interface MovieDetailsSkeletonProps {
  onBack?: () => void
}

const MovieDetailsSkeleton = memo(function MovieDetailsSkeleton({
  onBack,
}: MovieDetailsSkeletonProps) {
  return (
    <Container>
      <BackButtonWrapper>
        <Button variant="secondary" size="sm" onClick={onBack}>
          <FavoriteButtonContent>
            <ArrowLeft size={18} color="currentColor" />
            <Text as="span" size="sm" color="white">
              {texts.navigation.back}
            </Text>
          </FavoriteButtonContent>
        </Button>
      </BackButtonWrapper>
      <ContentWrapper>
        <SkeletonImageContainer />
        <SkeletonContent>
          <SkeletonTitle />
          <SkeletonGenres>
            <SkeletonGenre />
            <SkeletonGenre />
            <SkeletonGenre />
          </SkeletonGenres>
          <SkeletonInfoRow>
            <SkeletonReleaseDate />
            <SkeletonRating />
          </SkeletonInfoRow>
          <SkeletonOverview>
            <SkeletonTitle style={{ width: '40%', marginBottom: '1rem' }} />
            <SkeletonTitle style={{ width: '100%', marginBottom: '0.5rem' }} />
            <SkeletonTitle style={{ width: '95%', marginBottom: '0.5rem' }} />
            <SkeletonTitle style={{ width: '90%', marginBottom: '0.5rem' }} />
            <SkeletonTitle style={{ width: '85%' }} />
          </SkeletonOverview>
          <SkeletonButton />
        </SkeletonContent>
      </ContentWrapper>
    </Container>
  )
})

MovieDetailsSkeleton.displayName = 'MovieDetailsSkeleton'

export default MovieDetailsSkeleton
