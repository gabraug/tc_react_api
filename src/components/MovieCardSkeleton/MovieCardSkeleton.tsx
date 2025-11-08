import { memo } from 'react'
import {
  SkeletonCard,
  SkeletonPoster,
  SkeletonTitle,
  SkeletonRating,
} from './MovieCardSkeleton.styles'

interface MovieCardSkeletonProps {
  count?: number
}

const MovieCardSkeleton = memo(function MovieCardSkeleton({ count = 1 }: MovieCardSkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonCard key={index} data-testid="skeleton-card">
          <SkeletonPoster />
          <SkeletonTitle />
          <SkeletonRating />
        </SkeletonCard>
      ))}
    </>
  )
})

MovieCardSkeleton.displayName = 'MovieCardSkeleton'

export default MovieCardSkeleton
