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

export const DeleteButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: rgba(211, 47, 47, 0.8);
  border: none;
  border-radius: 50%;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.25rem;
  transition: background ${transitions.default};

  &:hover {
    background: rgba(211, 47, 47, 1);
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
`
