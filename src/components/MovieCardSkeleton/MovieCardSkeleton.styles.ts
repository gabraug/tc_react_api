import styled, { keyframes } from 'styled-components'
import { colors, spacing, dimensions } from '../../styles/constants'

const shimmer = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`

export const SkeletonCard = styled.div`
  border: 1px solid ${colors.gray.medium};
  border-radius: ${dimensions.card.borderRadius};
  padding: ${spacing.xs};
  background: ${colors.surface};
`

export const SkeletonPoster = styled.div`
  width: 100%;
  padding-top: ${dimensions.card.posterAspectRatio};
  background: linear-gradient(
    90deg,
    ${colors.gray.light} 0%,
    ${colors.gray.medium} 50%,
    ${colors.gray.light} 100%
  );
  background-size: 1000px 100%;
  animation: ${shimmer} 2s infinite;
  border-radius: ${dimensions.card.borderRadius};
  margin-bottom: 0.25rem;
`

export const SkeletonTitle = styled.div`
  height: 1.2rem;
  width: 80%;
  background: linear-gradient(
    90deg,
    ${colors.gray.medium} 0%,
    ${colors.gray.dark} 50%,
    ${colors.gray.medium} 100%
  );
  background-size: 1000px 100%;
  animation: ${shimmer} 2s infinite;
  border-radius: 4px;
  margin-bottom: 0.5rem;
`

export const SkeletonRating = styled.div`
  height: 1.5rem;
  width: 40%;
  background: linear-gradient(
    90deg,
    ${colors.gray.medium} 0%,
    ${colors.gray.dark} 50%,
    ${colors.gray.medium} 100%
  );
  background-size: 1000px 100%;
  animation: ${shimmer} 2s infinite;
  border-radius: ${dimensions.search.borderRadius};
`
