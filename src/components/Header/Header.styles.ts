import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { colors, spacing, dimensions, typography, transitions } from '../../styles/constants'

export const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: ${dimensions.header.height};
  background: ${colors.surface};
  border-bottom: 1px solid ${colors.gray.medium};
  padding: ${dimensions.header.padding} ${dimensions.header.paddingHorizontal};
  z-index: ${dimensions.header.zIndex};
  display: grid;
  grid-template-columns: auto 1fr auto auto;
  align-items: center;
  gap: ${spacing.md};
  box-shadow: 0 2px 8px ${colors.shadow.light};

  @media (max-width: 1024px) {
    gap: ${spacing.sm};
    padding: ${spacing.sm} ${spacing.md};
  }

  @media (max-width: 768px) {
    grid-template-columns: auto 1fr auto;
    gap: ${spacing.sm};
    padding: ${spacing.sm};
    height: auto;
    min-height: ${dimensions.header.height};
  }

  @media (max-width: 480px) {
    gap: ${spacing.xs};
    padding: ${spacing.xs};
    min-height: 60px;
  }
`

export const Logo = styled.div`
  font-size: clamp(1.1rem, 1rem + 0.75vw, 1.5rem);
  font-weight: ${typography.weights.bold};
  cursor: pointer;
  color: ${colors.white};
  white-space: nowrap;
  transition: all ${transitions.default};
  padding: ${spacing.xs} 0;
  user-select: none;

  &:hover {
    opacity: 0.8;
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }

  @media (max-width: 1024px) {
    font-size: clamp(1rem, 0.9rem + 0.5vw, 1.2rem);
  }

  @media (max-width: 768px) {
    font-size: clamp(0.9rem, 0.85rem + 0.4vw, 1rem);
  }

  @media (max-width: 480px) {
    font-size: clamp(0.8rem, 0.75rem + 0.3vw, 0.9rem);
    padding: 0;
  }
`

export const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  min-width: 0;
  max-width: 100%;
  padding: 0 ${spacing.sm};

  @media (max-width: 768px) {
    padding: 0 ${spacing.xs};
  }

  @media (max-width: 480px) {
    padding: 0;
  }
`

export const SearchForm = styled.form`
  width: 100%;
  max-width: ${dimensions.search.maxWidth};
  min-width: 150px;

  @media (max-width: 1024px) {
    max-width: 100%;
  }

  @media (max-width: 768px) {
    max-width: 100%;
    min-width: 120px;
  }

  @media (max-width: 480px) {
    min-width: 100px;
  }
`

export const SearchWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  border-radius: ${dimensions.search.borderRadius};
  overflow: hidden;
`

export const SearchButton = styled.button`
  position: absolute;
  right: 0;
  top: 0;
  width: clamp(2.5rem, 3.5vw, 3rem);
  height: 100%;
  border-radius: 0 ${dimensions.search.borderRadius} ${dimensions.search.borderRadius} 0;
  background: ${colors.gray.dark};
  border: 1px solid ${colors.gray.medium};
  border-left: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
  transition: all ${transitions.default};
  flex-shrink: 0;
  box-shadow: none;
  margin: 0;
  padding: 0;

  &:hover {
    background: ${colors.gray.darker};
    border-color: ${colors.gray.dark};
  }

  &:active {
    background: ${colors.gray.medium};
    transform: scale(0.98);
  }

  &:focus {
    outline: none;
    border-color: ${colors.gray.dark};
  }

  &:focus-visible {
    outline: 2px solid ${colors.gray.dark};
    outline-offset: -2px;
    border-color: ${colors.gray.dark};
  }

  @media (max-width: 768px) {
    right: 0;
    width: clamp(2.5rem, 3vw, 2.75rem);
    height: 100%;
  }

  @media (max-width: 480px) {
    right: 0;
    width: clamp(2.25rem, 2.5vw, 2.5rem);
    height: 100%;
  }
`

export const ClearButton = styled.button`
  position: absolute;
  left: 0.5rem;
  width: 1.5rem;
  height: 1.5rem;
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

  @media (max-width: 768px) {
    left: 0.4rem;
    width: 1.25rem;
    height: 1.25rem;
  }

  @media (max-width: 480px) {
    left: 0.3rem;
    width: 1.1rem;
    height: 1.1rem;
  }
`

export const ClearIcon = styled.span`
  position: relative;
  width: 0.75rem;
  height: 0.75rem;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0.1rem;
    height: 0.75rem;
    background: ${colors.white};
    border-radius: 2px;
  }

  &::before {
    transform: translate(-50%, -50%) rotate(45deg);
  }

  &::after {
    transform: translate(-50%, -50%) rotate(-45deg);
  }

  @media (max-width: 768px) {
    width: 0.65rem;
    height: 0.65rem;

    &::before,
    &::after {
      height: 0.65rem;
    }
  }

  @media (max-width: 480px) {
    width: 0.6rem;
    height: 0.6rem;

    &::before,
    &::after {
      height: 0.6rem;
    }
  }
`

export const SearchInput = styled.input<{ $hasClearButton: boolean }>`
  width: 100%;
  padding: ${dimensions.search.padding};
  padding-right: 4.5rem;
  padding-left: ${({ $hasClearButton }) =>
    $hasClearButton ? '2.75rem' : dimensions.search.padding};
  border: 1px solid ${colors.gray.medium};
  border-radius: ${dimensions.search.borderRadius};
  font-size: clamp(0.875rem, 0.8rem + 0.4vw, 1rem);
  font-family: ${typography.fontFamily};
  background: ${colors.gray.light};
  color: ${colors.white};
  transition: all ${transitions.default};

  &:focus {
    outline: none;
    border-color: ${colors.gray.dark};
    background: ${colors.surfaceLight};
    box-shadow: 0 0 0 2px ${colors.focus.light};
  }

  &::placeholder {
    color: ${colors.gray.textDark};
    font-size: clamp(0.875rem, 0.8rem + 0.4vw, 1rem);
  }

  @media (max-width: 768px) {
    font-size: clamp(0.8rem, 0.75rem + 0.3vw, 0.9rem);
    padding: 0.5rem;
    padding-right: 3.5rem;
    padding-left: ${({ $hasClearButton }) => ($hasClearButton ? '2.25rem' : '0.5rem')};

    &::placeholder {
      font-size: clamp(0.8rem, 0.75rem + 0.3vw, 0.9rem);
    }
  }

  @media (max-width: 480px) {
    font-size: clamp(0.75rem, 0.7rem + 0.25vw, 0.85rem);
    padding: 0.4rem;
    padding-right: 3rem;
    padding-left: ${({ $hasClearButton }) => ($hasClearButton ? '2rem' : '0.4rem')};

    &::placeholder {
      font-size: clamp(0.75rem, 0.7rem + 0.25vw, 0.85rem);
    }
  }
`

export const CharacterCount = styled.span<{ $warning: boolean }>`
  position: absolute;
  right: 0.75rem;
  font-size: clamp(0.7rem, 0.65rem + 0.2vw, 0.875rem);
  color: ${({ $warning }) => ($warning ? colors.error : colors.gray.textDark)};
  pointer-events: none;
  font-weight: ${({ $warning }) =>
    $warning ? typography.weights.bold : typography.weights.normal};
  transition: color ${transitions.default};

  @media (max-width: 768px) {
    right: 0.5rem;
    font-size: clamp(0.65rem, 0.6rem + 0.15vw, 0.75rem);
  }

  @media (max-width: 480px) {
    right: 0.4rem;
    font-size: clamp(0.6rem, 0.55rem + 0.1vw, 0.7rem);
  }
`

export const Navigation = styled.nav`
  display: flex;
  gap: ${spacing.sm};
  align-items: center;
  justify-content: flex-end;
  flex-wrap: nowrap;

  @media (max-width: 1024px) {
    gap: ${spacing.xs};
  }

  @media (max-width: 768px) {
    display: none;
  }
`

export const NavLink = styled(Link)`
  text-decoration: none;
  color: ${colors.gray.text};
  font-size: ${typography.sizes.sm};
  font-family: ${typography.fontFamily};
  cursor: pointer;
  transition: color ${transitions.default};
  white-space: nowrap;
  padding: ${spacing.xs} ${spacing.sm};
  border-radius: 4px;

  &:hover {
    color: ${colors.white};
    background: ${colors.gray.medium};
  }

  @media (max-width: 768px) {
    display: block;
    padding: ${spacing.sm};
    border-bottom: 1px solid ${colors.gray.medium};
    width: 100%;
    text-align: left;

    &:last-child {
      border-bottom: none;
    }
  }
`

export const MobileMenuButton = styled.button<{ $isOpen: boolean }>`
  display: none;
  flex-direction: column;
  justify-content: space-around;
  width: 2rem;
  height: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 1001;

  span {
    width: 2rem;
    height: 0.25rem;
    background: ${colors.white};
    border-radius: 10px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;

    &:first-child {
      transform: ${({ $isOpen }) => ($isOpen ? 'rotate(45deg)' : 'rotate(0)')};
    }

    &:nth-child(2) {
      opacity: ${({ $isOpen }) => ($isOpen ? '0' : '1')};
      transform: ${({ $isOpen }) => ($isOpen ? 'translateX(20px)' : 'translateX(0)')};
    }

    &:nth-child(3) {
      transform: ${({ $isOpen }) => ($isOpen ? 'rotate(-45deg)' : 'rotate(0)')};
    }
  }

  @media (max-width: 768px) {
    display: flex;
  }
`

export const MobileMenu = styled.nav<{ $isOpen: boolean }>`
  display: none;
  position: fixed;
  top: ${dimensions.header.height};
  right: 0;
  width: clamp(200px, 50vw, 280px);
  max-width: 85vw;
  min-height: fit-content;
  max-height: calc(100vh - ${dimensions.header.height});
  background: ${colors.surface};
  border-left: 1px solid ${colors.gray.medium};
  border-bottom: 1px solid ${colors.gray.medium};
  border-bottom-left-radius: ${dimensions.card.borderRadius};
  padding: clamp(${spacing.xs}, 1.5vw, ${spacing.sm});
  transform: ${({ $isOpen }) => ($isOpen ? 'translateX(0)' : 'translateX(100%)')};
  transition: transform 0.3s ease-in-out;
  z-index: 1000;
  box-shadow: -4px 4px 20px ${colors.shadow.dark};
  overflow-y: auto;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: clamp(0.25rem, 0.5vw, ${spacing.xs});
    padding: clamp(${spacing.xs}, 1.5vw, ${spacing.sm});
  }

  @media (max-width: 480px) {
    width: clamp(180px, 45vw, 240px);
    max-width: 80vw;
    top: clamp(60px, 8vw, 80px);
    max-height: calc(100vh - clamp(60px, 8vw, 80px));
  }
`
