import styled from 'styled-components'
import { colors, spacing, dimensions, typography } from '../../styles/constants'

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

export const ImageContainer = styled.div`
  width: 100%;
  border-radius: ${dimensions.card.borderRadius};
  overflow: hidden;
  background: ${colors.gray.light};
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (min-width: 769px) {
    min-height: clamp(400px, 50vh, 600px);
    aspect-ratio: 16 / 9;
    position: sticky;
    top: calc(${dimensions.header.height} + ${spacing.md});
    max-height: calc(100vh - ${dimensions.header.height} - ${spacing.md} * 2);
  }

  @media (max-width: 768px) {
    position: static;
    max-height: clamp(200px, 35vh, 300px);
    aspect-ratio: 16 / 9;
    min-height: auto;
  }

  @media (max-width: 480px) {
    max-height: clamp(180px, 30vh, 250px);
    aspect-ratio: 16 / 9;
  }
`

export const BackdropImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: ${dimensions.card.borderRadius};
  z-index: 0;

  @media (min-width: 769px) {
    position: absolute;
    top: 0;
    left: 0;
    border-radius: ${dimensions.card.borderRadius};
  }

  @media (max-width: 768px) {
    position: relative;
    display: block;
    object-fit: cover;
    border-radius: ${dimensions.card.borderRadius};
  }
`

export const Placeholder = styled.div`
  width: 100%;
  padding: clamp(${spacing.lg}, 3vw, ${spacing.xl});
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${colors.gray.medium};
  color: ${colors.gray.textDark};
  font-size: ${typography.sizes.sm};
  text-align: center;
  border-radius: ${dimensions.card.borderRadius};

  @media (min-width: 769px) {
    min-height: clamp(250px, 35vh, 400px);
  }

  @media (max-width: 768px) {
    min-height: clamp(180px, 30vh, 250px);
    padding: clamp(${spacing.sm}, 2vw, ${spacing.lg});
  }

  @media (max-width: 480px) {
    min-height: clamp(150px, 25vh, 200px);
    padding: clamp(${spacing.xs}, 1.5vw, ${spacing.md});
  }
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.md};

  @media (max-width: 768px) {
    gap: ${spacing.sm};
  }
`

export const Title = styled.h1`
  font-size: ${typography.sizes.lg};
  font-weight: ${typography.weights.bold};
  margin: 0 0 ${spacing.xs} 0;
  color: ${colors.white};
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: ${typography.sizes.md};
  }
`

export const Genres = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: clamp(${spacing.xs}, 1vw, ${spacing.sm});
`

export const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: ${spacing.sm};
  font-size: ${typography.sizes.sm};
  color: ${colors.gray.text};
  padding: ${spacing.sm} 0;
  border-top: 1px solid ${colors.gray.medium};
  border-bottom: 1px solid ${colors.gray.medium};

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`

export const ReleaseDate = styled.div`
  color: ${colors.gray.text};

  strong {
    color: ${colors.white};
    margin-right: ${spacing.xs};
  }
`

export const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.xs};
  padding: ${spacing.xs} ${spacing.sm};
  background: ${colors.gray.medium};
  border-radius: ${dimensions.search.borderRadius};
  flex-wrap: wrap;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
    gap: ${spacing.xs};
  }
`

export const RatingLabel = styled.span`
  font-size: ${typography.sizes.xs};
  color: ${colors.gray.textLight};
  font-weight: ${typography.weights.normal};
`

export const RatingValue = styled.span`
  font-size: ${typography.sizes.sm};
  color: ${colors.white};
  font-weight: ${typography.weights.bold};
`

export const Overview = styled.div`
  margin-top: ${spacing.xs};

  h3 {
    font-size: ${typography.sizes.md};
    font-weight: ${typography.weights.semibold};
    margin: 0 0 ${spacing.sm} 0;
    color: ${colors.white};
  }

  p {
    font-size: ${typography.sizes.sm};
    line-height: 1.8;
    color: ${colors.gray.text};
    margin: 0;
    text-align: justify;

    @media (max-width: 768px) {
      text-align: left;
    }
  }
`

export const FavoriteButtonWrapper = styled.div`
  margin-top: ${spacing.md};
  display: flex;
  align-items: center;
`

export const FavoriteButtonContent = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.xs};
`

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: clamp(${spacing.lg}, 3vw, ${spacing.xl});
  min-height: clamp(300px, 40vh, 500px);
  gap: clamp(${spacing.sm}, 2vw, ${spacing.md});
  width: 100%;
`

export const LoadingSpinner = styled.div`
  width: clamp(40px, 5vw, 60px);
  height: clamp(40px, 5vw, 60px);
  border: clamp(3px, 0.4vw, 5px) solid ${colors.gray.medium};
  border-top: clamp(3px, 0.4vw, 5px) solid ${colors.white};
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`

export const LoadingText = styled.p`
  font-size: ${typography.sizes.md};
  color: ${colors.gray.text};
  margin: 0;
`

export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: clamp(${spacing.lg}, 3vw, ${spacing.xl});
  min-height: clamp(300px, 40vh, 500px);
  text-align: center;
  gap: clamp(${spacing.sm}, 2vw, ${spacing.md});
  width: 100%;
`

export const ErrorText = styled.p`
  font-size: ${typography.sizes.md};
  color: ${colors.error};
  margin: 0;
`

export const ImageLoadingContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${colors.gray.light};
  gap: clamp(${spacing.sm}, 2vw, ${spacing.md});
  z-index: 2;

  @media (max-width: 768px) {
    z-index: 1;
  }
`

export const ImageLoadingSpinner = styled.div`
  width: clamp(50px, 6vw, 70px);
  height: clamp(50px, 6vw, 70px);
  border: clamp(4px, 0.5vw, 6px) solid ${colors.gray.medium};
  border-top: clamp(4px, 0.5vw, 6px) solid ${colors.white};
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`
