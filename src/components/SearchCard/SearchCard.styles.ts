import styled from 'styled-components'
import {
  colors,
  spacing,
  dimensions,
  typography,
  transitions,
  transforms,
} from '../../styles/constants'

export const Card = styled.div`
  cursor: pointer;
  transition: transform ${transitions.default};

  &:hover {
    transform: ${transforms.cardHover};
  }
`

export const PosterContainer = styled.div`
  position: relative;
  width: 100%;
  padding-top: ${dimensions.card.posterAspectRatio};
  background: ${colors.gray.light};
  border-radius: ${dimensions.card.borderRadius};
  overflow: hidden;
  margin-bottom: ${spacing.xs};
`

export const Poster = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`

export const Placeholder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${colors.gray.medium};
  color: ${colors.gray.textDark};
  font-size: ${typography.sizes.xs};
`

export const Title = styled.h3`
  font-size: ${typography.sizes.sm};
  font-weight: ${typography.weights.semibold};
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${colors.white};
`

export const HighlightedTitle = styled.span`
  background: ${colors.gray.dark};
  color: ${colors.white};
  font-weight: ${typography.weights.bold};
`
