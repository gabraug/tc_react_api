import styled from 'styled-components'
import { colors, spacing, dimensions, typography } from '../../styles/constants'
import { media } from '../../utils/responsive'

export const Container = styled.div`
  margin-top: ${dimensions.header.height};
  padding: clamp(${spacing.sm}, 2vw, ${spacing.md});
  display: flex;
  gap: clamp(${spacing.sm}, 2vw, ${spacing.lg});
  max-width: ${dimensions.grid.maxWidth};
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  min-height: calc(100vh - ${dimensions.header.height});

  ${media.mobileLarge} {
    flex-direction: column;
    padding: clamp(${spacing.xs}, 1.5vw, ${spacing.sm});
    gap: clamp(${spacing.xs}, 1.5vw, ${spacing.md});
  }
`

export const SortContainer = styled.div`
  min-width: 180px;
  background: ${colors.surface};
  border-radius: ${dimensions.card.borderRadius};
  border: 1px solid ${colors.gray.medium};
  padding: ${spacing.sm};
  height: fit-content;
  position: sticky;
  top: calc(${dimensions.header.height} + ${spacing.md});

  ${media.mobileLarge} {
    position: static;
    min-width: 100%;
  }
`

export const SortTitle = styled.h3`
  font-size: ${typography.sizes.xs};
  font-weight: ${typography.weights.bold};
  margin: 0 0 ${spacing.xs} 0;
  color: ${colors.white};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`

export const SortList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 ${spacing.sm} 0;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`

export const SortOption = styled.li<{ $active: boolean }>`
  padding: 0.5rem ${spacing.xs};
  background: ${({ $active }) => ($active ? colors.gray.medium : 'transparent')};
  border: 1px solid ${({ $active }) => ($active ? colors.gray.dark : 'transparent')};
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: ${typography.sizes.xs};
  color: ${({ $active }) => ($active ? colors.white : colors.gray.text)};

  &:hover {
    background: ${colors.gray.medium};
    border-color: ${colors.gray.dark};
    color: ${colors.white};
  }
`

export const SortDivider = styled.hr`
  border: none;
  border-top: 1px solid ${colors.gray.medium};
  margin: ${spacing.sm} 0;
`

export const ContentWrapper = styled.div`
  flex: 1;
`

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(${dimensions.card.minWidth}, 1fr));
  gap: clamp(${spacing.sm}, 1.5vw, ${dimensions.grid.gap});
  width: 100%;

  ${media.mobile} {
    grid-template-columns: repeat(auto-fill, minmax(clamp(120px, 30vw, 160px), 1fr));
    gap: clamp(${spacing.xs}, 1vw, ${spacing.sm});
  }
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

export const Loading = styled.div`
  text-align: center;
  padding: ${spacing.lg};
  font-size: ${typography.sizes.sm};
  color: ${colors.gray.text};
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

export const ErrorButton = styled.button`
  padding: ${spacing.sm} ${spacing.lg};
  background: ${colors.gray.dark};
  color: ${colors.white};
  border: none;
  border-radius: ${dimensions.search.borderRadius};
  font-size: ${typography.sizes.sm};
  font-family: ${typography.fontFamily};
  cursor: pointer;
  transition: background 0.2s;
  margin-top: ${spacing.md};

  &:hover {
    background: ${colors.gray.darker};
  }
`

export const Error = styled.div`
  text-align: center;
  padding: ${spacing.lg};
  color: ${colors.error};
  font-size: ${typography.sizes.sm};
`
