import styled from 'styled-components'
import { colors, spacing, dimensions, typography, transitions } from '../../styles/constants'

export const Container = styled.div`
  margin-top: ${dimensions.header.height};
  padding: clamp(${spacing.sm}, 2vw, ${spacing.md});
  max-width: ${dimensions.grid.maxWidth};
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  min-height: calc(100vh - ${dimensions.header.height});

  @media (max-width: 768px) {
    padding: clamp(${spacing.xs}, 1.5vw, ${spacing.sm});
  }
`

export const MainContainer = styled.div`
  display: flex;
  gap: clamp(${spacing.sm}, 2vw, ${spacing.lg});
  margin-top: clamp(${spacing.sm}, 2vw, ${spacing.lg});
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
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

  @media (max-width: 768px) {
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

export const ListsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm};
  margin-bottom: clamp(${spacing.md}, 3vw, ${spacing.xl});
  padding: ${spacing.md};
  background: ${colors.surface};
  border-radius: ${dimensions.card.borderRadius};
  border: 1px solid ${colors.gray.medium};
`

export const ListSection = styled.div<{ $selected?: boolean }>`
  display: flex;
  align-items: center;
  padding: ${spacing.sm} ${spacing.md};
  background: ${({ $selected }) => ($selected ? colors.gray.medium : 'transparent')};
  border: 1px solid ${({ $selected }) => ($selected ? colors.gray.dark : colors.gray.medium)};
  border-radius: ${dimensions.search.borderRadius};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${colors.gray.medium};
    border-color: ${colors.gray.dark};
  }
`

export const ListHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
`

export const ListTitle = styled.h3`
  font-size: ${typography.sizes.sm};
  font-weight: ${typography.weights.semibold};
  margin: 0;
  color: ${colors.white};
`

export const ListActions = styled.div`
  display: flex;
  gap: ${spacing.xs};
`

export const ActionButton = styled.button`
  padding: ${spacing.xs} ${spacing.sm};
  border: 1px solid ${colors.gray.medium};
  border-radius: 4px;
  background: ${colors.gray.medium};
  color: ${colors.white};
  font-size: ${typography.sizes.xs};
  font-family: ${typography.fontFamily};
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;

  &:hover {
    background: ${colors.gray.dark};
    border-color: ${colors.gray.dark};
  }
`

export const CreateListButton = styled.button`
  padding: ${spacing.sm} ${spacing.md};
  border: 1px dashed ${colors.gray.medium};
  border-radius: ${dimensions.search.borderRadius};
  background: transparent;
  color: ${colors.gray.text};
  font-size: ${typography.sizes.sm};
  font-family: ${typography.fontFamily};
  cursor: pointer;
  transition: all 0.2s;
  text-align: left;
  width: 100%;

  &:hover:not(:disabled) {
    background: ${colors.gray.medium};
    border-color: ${colors.gray.dark};
    border-style: solid;
    color: ${colors.white};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    border-style: solid;
    border-color: ${colors.gray.dark};
  }
`

export const CreateListButtonContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: ${spacing.sm};
`

export const ListCountBadge = styled.span<{ $isFull: boolean }>`
  padding: 0.25rem 0.5rem;
  border-radius: ${dimensions.search.borderRadius};
  background: ${({ $isFull }) => ($isFull ? colors.error : colors.gray.medium)};
  color: ${colors.white};
  font-size: ${typography.sizes.xs};
  font-weight: ${typography.weights.bold};
  white-space: nowrap;
  min-width: 2.5rem;
  text-align: center;
`

export const CreateListInputWrapper = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
`

export const CreateListInput = styled.input<{ $hasClearButton: boolean }>`
  flex: 1;
  padding: ${spacing.sm};
  padding-right: 4rem;
  padding-left: ${({ $hasClearButton }) => ($hasClearButton ? '2.5rem' : spacing.sm)};
  border: 1px solid ${colors.gray.medium};
  border-radius: ${dimensions.search.borderRadius};
  font-size: ${typography.sizes.sm};
  font-family: ${typography.fontFamily};
  background: ${colors.gray.light};
  color: ${colors.white};

  &:focus {
    outline: none;
    border-color: ${colors.gray.dark};
    background: ${colors.surfaceLight};
  }

  &::placeholder {
    color: ${colors.gray.textDark};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

export const ClearInputButton = styled.button`
  position: absolute;
  left: 0.5rem;
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 50%;
  background: ${colors.gray.medium};
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  transition: all ${transitions.default};

  &:hover {
    background: ${colors.gray.dark};
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }
`

export const ClearInputIcon = styled.span`
  position: relative;
  width: 0.6rem;
  height: 0.6rem;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0.1rem;
    height: 0.6rem;
    background: ${colors.white};
    border-radius: 2px;
  }

  &::before {
    transform: translate(-50%, -50%) rotate(45deg);
  }

  &::after {
    transform: translate(-50%, -50%) rotate(-45deg);
  }
`

export const InputCharacterCount = styled.span<{ $warning: boolean }>`
  position: absolute;
  right: 0.5rem;
  font-size: ${typography.sizes.xs};
  color: ${({ $warning }) => ($warning ? colors.error : colors.gray.textDark)};
  pointer-events: none;
  font-weight: ${({ $warning }) =>
    $warning ? typography.weights.bold : typography.weights.normal};
  transition: color ${transitions.default};
`

export const Header = styled.div`
  margin-bottom: ${spacing.md};
`

export const Title = styled.h1`
  font-size: ${typography.sizes.lg};
  font-weight: ${typography.weights.bold};
  margin: 0;
  color: ${colors.white};
`

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(${dimensions.card.minWidth}, 1fr));
  gap: clamp(${spacing.sm}, 1.5vw, ${dimensions.grid.gap});
  width: 100%;

  @media (max-width: 480px) {
    grid-template-columns: repeat(auto-fill, minmax(clamp(120px, 30vw, 160px), 1fr));
    gap: clamp(${spacing.xs}, 1vw, ${spacing.sm});
  }
`

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: clamp(${spacing.lg}, 3vw, ${spacing.xl});
  text-align: center;
  min-height: clamp(300px, 40vh, 500px);
  width: 100%;
  gap: clamp(${spacing.sm}, 2vw, ${spacing.md});
`

export const EmptyImage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: clamp(${spacing.sm}, 2vw, ${spacing.md});
  opacity: 0.6;
`

export const EmptyText = styled.p`
  font-size: ${typography.sizes.md};
  color: ${colors.gray.text};
  margin: ${spacing.xs} 0;
`

export const EmptyButton = styled.button`
  margin-top: ${spacing.md};
  padding: ${spacing.sm} ${spacing.lg};
  background: ${colors.gray.dark};
  color: ${colors.white};
  border: none;
  border-radius: ${dimensions.card.borderRadius};
  font-size: ${typography.sizes.sm};
  font-family: ${typography.fontFamily};
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: ${colors.gray.darker};
  }
`
