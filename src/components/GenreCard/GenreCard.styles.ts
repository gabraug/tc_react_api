import styled from 'styled-components'
import { colors, spacing, dimensions, transitions } from '../../styles/constants'

export const GenreCardContainer = styled.div`
  padding: clamp(${spacing.xs}, 0.8vw, ${spacing.sm}) clamp(${spacing.sm}, 1.2vw, ${spacing.md});
  background: ${colors.gray.medium};
  border-radius: ${dimensions.search.borderRadius};
  border: 1px solid ${colors.gray.dark};
  transition: all ${transitions.default};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;

  &:hover {
    background: ${colors.gray.dark};
    border-color: ${colors.gray.darker};
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    padding: clamp(0.4rem, 0.7vw, 0.5rem) clamp(0.6rem, 1vw, 0.75rem);
  }

  @media (max-width: 480px) {
    padding: clamp(0.35rem, 0.6vw, 0.45rem) clamp(0.5rem, 0.9vw, 0.7rem);
  }
`
