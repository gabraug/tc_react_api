import styled from 'styled-components'
import { colors, spacing, dimensions, typography, transitions } from '../../styles/constants'

export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
`

export const InputField = styled.input<{
  $hasClearButton: boolean
  $hasCharacterCount: boolean
  $hasSearchButton?: boolean
}>`
  width: 100%;
  padding-top: clamp(0.875rem, 1.3vw, 1rem);
  padding-bottom: clamp(0.875rem, 1.3vw, 1rem);
  padding-right: ${({ $hasCharacterCount, $hasSearchButton }) => {
    if ($hasSearchButton && $hasCharacterCount) return '7rem'
    if ($hasSearchButton) return '3.75rem'
    if ($hasCharacterCount) return '4.25rem'
    return spacing.sm
  }};
  padding-left: ${({ $hasClearButton }) => ($hasClearButton ? '3rem' : '1.125rem')};
  border: 1px solid ${colors.gray.medium};
  border-right: ${({ $hasSearchButton }) =>
    $hasSearchButton ? 'none' : `1px solid ${colors.gray.medium}`};
  border-radius: ${({ $hasSearchButton }) =>
    $hasSearchButton
      ? `${dimensions.search.borderRadius} 0 0 ${dimensions.search.borderRadius}`
      : dimensions.search.borderRadius};
  font-size: clamp(0.875rem, 0.9rem + 0.3vw, 1rem);
  font-family: ${typography.fontFamily};
  background: ${colors.gray.light};
  color: ${colors.white};
  transition: all ${transitions.default};
  line-height: 1.5;

  &:focus {
    outline: none;
    border-color: ${colors.gray.dark};
    border-right: ${({ $hasSearchButton }) =>
      $hasSearchButton ? 'none' : `1px solid ${colors.gray.dark}`};
    background: ${colors.surfaceLight};
    box-shadow: ${({ $hasSearchButton }) =>
      $hasSearchButton ? 'none' : `0 0 0 2px ${colors.focus.light}`};
  }

  &::placeholder {
    color: ${colors.gray.textDark};
    text-indent: ${({ $hasClearButton }) => ($hasClearButton ? '0' : '0.25rem')};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    font-size: clamp(0.8rem, 0.85rem + 0.25vw, 0.9rem);
    padding-top: clamp(0.7rem, 1.1vw, 0.85rem);
    padding-bottom: clamp(0.7rem, 1.1vw, 0.85rem);
    padding-right: ${({ $hasCharacterCount, $hasSearchButton }) => {
      if ($hasSearchButton && $hasCharacterCount) return '6.5rem'
      if ($hasSearchButton) return '3.25rem'
      if ($hasCharacterCount) return '3.75rem'
      return '0.75rem'
    }};
    padding-left: ${({ $hasClearButton }) => ($hasClearButton ? '2.75rem' : '1rem')};
    border-radius: ${({ $hasSearchButton }) =>
      $hasSearchButton
        ? `${dimensions.search.borderRadius} 0 0 ${dimensions.search.borderRadius}`
        : dimensions.search.borderRadius};

    &::placeholder {
      text-indent: ${({ $hasClearButton }) => ($hasClearButton ? '0' : '0.2rem')};
    }

    &:focus {
      box-shadow: ${({ $hasSearchButton }) =>
        $hasSearchButton ? 'none' : `0 0 0 2px ${colors.focus.light}`};
    }
  }

  @media (max-width: 480px) {
    font-size: clamp(0.75rem, 0.8rem + 0.2vw, 0.85rem);
    padding-top: clamp(0.65rem, 1vw, 0.8rem);
    padding-bottom: clamp(0.65rem, 1vw, 0.8rem);
    padding-right: ${({ $hasCharacterCount, $hasSearchButton }) => {
      if ($hasSearchButton && $hasCharacterCount) return '6rem'
      if ($hasSearchButton) return '3rem'
      if ($hasCharacterCount) return '3.5rem'
      return '0.7rem'
    }};
    padding-left: ${({ $hasClearButton }) => ($hasClearButton ? '2.5rem' : '0.9rem')};
    border-radius: ${({ $hasSearchButton }) =>
      $hasSearchButton
        ? `${dimensions.search.borderRadius} 0 0 ${dimensions.search.borderRadius}`
        : dimensions.search.borderRadius};

    &::placeholder {
      text-indent: ${({ $hasClearButton }) => ($hasClearButton ? '0' : '0.15rem')};
    }

    &:focus {
      box-shadow: ${({ $hasSearchButton }) =>
        $hasSearchButton ? 'none' : `0 0 0 2px ${colors.focus.light}`};
    }
  }
`

export const ClearButton = styled.button`
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

  @media (max-width: 768px) {
    left: 0.4rem;
    width: 1.1rem;
    height: 1.1rem;
  }

  @media (max-width: 480px) {
    left: 0.3rem;
    width: 1rem;
    height: 1rem;
  }
`

export const ClearIcon = styled.span`
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

  @media (max-width: 768px) {
    width: 0.55rem;
    height: 0.55rem;

    &::before,
    &::after {
      height: 0.55rem;
    }
  }

  @media (max-width: 480px) {
    width: 0.5rem;
    height: 0.5rem;

    &::before,
    &::after {
      height: 0.5rem;
    }
  }
`

export const CharacterCount = styled.span<{ $hasSearchButton?: boolean }>`
  position: absolute;
  right: ${({ $hasSearchButton }) =>
    $hasSearchButton ? 'clamp(3.75rem, 4.5vw, 4rem)' : '0.75rem'};
  top: 50%;
  transform: translateY(-50%);
  font-size: clamp(0.65rem, 0.7rem + 0.15vw, 0.75rem);
  color: ${colors.gray.textLight};
  pointer-events: none;
  font-weight: ${typography.weights.normal};
  transition: color ${transitions.default};
  z-index: 1;

  @media (max-width: 768px) {
    right: ${({ $hasSearchButton }) =>
      $hasSearchButton ? 'clamp(3.25rem, 3.5vw, 3.5rem)' : '0.6rem'};
    font-size: clamp(0.6rem, 0.65rem + 0.1vw, 0.7rem);
  }

  @media (max-width: 480px) {
    right: ${({ $hasSearchButton }) =>
      $hasSearchButton ? 'clamp(3rem, 3.25vw, 3.25rem)' : '0.5rem'};
    font-size: clamp(0.55rem, 0.6rem + 0.1vw, 0.65rem);
  }
`
