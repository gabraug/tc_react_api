import styled from 'styled-components'
import { colors, spacing, dimensions, typography, transitions } from '../../styles/constants'

export const SortContainer = styled.div`
  min-width: 180px;
  background: ${colors.surface};
  border-radius: ${dimensions.card.borderRadius};
  border: 1px solid ${colors.gray.medium};
  padding: ${spacing.sm};
  height: fit-content;
  position: sticky;
  top: calc(${dimensions.header.height} + ${spacing.md});

  @media (max-width: 768px) {
    position: static;
    min-width: 100%;
  }
`

export const SortHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${spacing.xs};
`

export const SortToggleButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  color: ${colors.gray.text};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${spacing.xs};
  border-radius: 4px;
  transition: all ${transitions.default};

  &:hover {
    color: ${colors.white};
    background: ${colors.gray.medium};
  }

  &:active {
    transform: scale(0.95);
  }
`

export const SortContent = styled.div`
  animation: slideDown 0.2s ease-out;

  @keyframes slideDown {
    from {
      opacity: 0;
      max-height: 0;
    }
    to {
      opacity: 1;
      max-height: 1000px;
    }
  }
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
  transition: all ${transitions.default};
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
