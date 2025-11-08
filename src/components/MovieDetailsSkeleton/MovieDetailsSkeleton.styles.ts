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

const SkeletonBase = styled.div`
  background: linear-gradient(
    90deg,
    ${colors.gray.light} 0%,
    ${colors.gray.medium} 50%,
    ${colors.gray.light} 100%
  );
  background-size: 1000px 100%;
  animation: ${shimmer} 2s infinite;
  border-radius: ${dimensions.card.borderRadius};
`

export const Container = styled.div`
  margin-top: ${dimensions.header.height};
  padding: clamp(${spacing.sm}, 2vw, ${spacing.md});
  max-width: ${dimensions.grid.maxWidth};
  margin-left: auto;
  margin-right: auto;
  min-height: calc(100vh - ${dimensions.header.height});
  width: 100%;

  @media (max-width: 768px) {
    padding: clamp(${spacing.xs}, 1.5vw, ${spacing.sm});
  }
`

export const BackButtonWrapper = styled.div`
  margin-bottom: ${spacing.md};
  display: flex;
  align-items: center;
`

export const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(${spacing.md}, 3vw, ${spacing.xl});
  align-items: start;
  width: 100%;

  @media (max-width: 1024px) {
    gap: clamp(${spacing.sm}, 2vw, ${spacing.lg});
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: clamp(${spacing.sm}, 1.5vw, ${spacing.md});
  }
`

export const SkeletonImageContainer = styled(SkeletonBase)`
  width: 100%;
  aspect-ratio: 16 / 9;
  min-height: clamp(400px, 50vh, 600px);

  @media (max-width: 768px) {
    min-height: clamp(200px, 35vh, 300px);
  }

  @media (max-width: 480px) {
    min-height: clamp(180px, 30vh, 250px);
  }
`

export const SkeletonContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.md};
`

export const SkeletonTitle = styled(SkeletonBase)`
  height: 2rem;
  width: 80%;
  border-radius: 4px;
`

export const SkeletonGenres = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${spacing.sm};
`

export const SkeletonGenre = styled(SkeletonBase)`
  height: 2rem;
  width: 80px;
  border-radius: 20px;
`

export const SkeletonInfoRow = styled.div`
  display: flex;
  gap: ${spacing.md};
  align-items: center;
  flex-wrap: wrap;
`

export const SkeletonReleaseDate = styled(SkeletonBase)`
  height: 1.5rem;
  width: 200px;
  border-radius: 4px;
`

export const SkeletonRating = styled(SkeletonBase)`
  height: 2rem;
  width: 120px;
  border-radius: ${dimensions.search.borderRadius};
`

export const SkeletonOverview = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.xs};
`

export const SkeletonButton = styled(SkeletonBase)`
  height: 3rem;
  width: 200px;
  border-radius: 4px;
  margin-top: ${spacing.sm};
`

export const FavoriteButtonContent = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.xs};
`
