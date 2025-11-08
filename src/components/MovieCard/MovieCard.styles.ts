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
  border: 1px solid ${colors.gray.medium};
  border-radius: ${dimensions.card.borderRadius};
  padding: ${spacing.xs};
  background: ${colors.surface};

  &:hover {
    transform: ${transforms.cardHover};
    border-color: ${colors.gray.dark};
  }
`

export const PosterContainer = styled.div`
  position: relative;
  width: 100%;
  padding-top: ${dimensions.card.posterAspectRatio};
  background: ${colors.gray.light};
  border-radius: ${dimensions.card.borderRadius};
  overflow: hidden;
  margin-bottom: 0.25rem;
`

export const Poster = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.2s;

  &[loading='lazy'] {
    opacity: 0;
    animation: fadeIn 0.3s ease-in forwards;
  }

  @keyframes fadeIn {
    to {
      opacity: 1;
    }
  }
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
  background: transparent;
  border: 1px solid ${colors.gray.medium};
  color: ${colors.gray.text};
  font-size: ${typography.sizes.xs};
  text-align: center;
  padding: ${spacing.sm};
`

export const FavoriteButton = styled.button<{ $isFavorite: boolean }>`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: ${({ $isFavorite }) => ($isFavorite ? colors.favorite.default : colors.overlay.light)};
  border: none;
  border-radius: 50%;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${colors.white};
  font-size: 1.25rem;
  transition: background ${transitions.default};

  &:hover {
    background: ${({ $isFavorite }) => ($isFavorite ? colors.favorite.hover : colors.overlay.medium)};
  }
`

export const DeleteButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: ${colors.delete.default};
  border: none;
  border-radius: 50%;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${colors.white};
  font-size: 1.25rem;
  transition: all ${transitions.default};

  &:hover {
    background: ${colors.delete.hover};
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }
`

export const Title = styled.h3`
  font-size: ${typography.sizes.sm};
  font-weight: ${typography.weights.semibold};
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${colors.white};
  line-height: 1.4;
`

export const HighlightedText = styled.mark`
  background: ${colors.highlight.background} !important;
  color: ${colors.highlight.text} !important;
  font-weight: ${typography.weights.bold};
  padding: 0.15em 0.25em;
  border-radius: 3px;
  box-decoration-break: clone;
  -webkit-box-decoration-break: clone;
  display: inline-block;
  box-shadow: 0 1px 3px ${colors.shadow.dark};
  position: relative;
  margin: 0 1px;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 2px;
    background: ${colors.highlight.text};
    border-radius: 3px 0 0 3px;
  }
`

export const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.xs};
  margin-top: 0.25rem;
  border-radius: ${dimensions.search.borderRadius};
  padding: 0.25rem 0.5rem;
  background: ${colors.gray.medium};
  width: fit-content;
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
