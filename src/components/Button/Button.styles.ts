import styled from 'styled-components'
import { colors, spacing, dimensions, typography, transitions } from '../../styles/constants'

const getFontSize = (size: 'sm' | 'md' | 'lg') => {
  switch (size) {
    case 'sm':
      return typography.sizes.xs
    case 'lg':
      return typography.sizes.md
    default:
      return typography.sizes.sm
  }
}

export const ButtonStyled = styled.button<{
  $variant: 'primary' | 'secondary' | 'danger' | 'ghost' | 'link'
  $size: 'sm' | 'md' | 'lg'
  $fullWidth: boolean
}>`
  padding: ${({ $size }) => {
    switch ($size) {
      case 'sm':
        return `${spacing.xs} ${spacing.sm}`
      case 'lg':
        return `${spacing.md} ${spacing.lg}`
      default:
        return `${spacing.sm} ${spacing.md}`
    }
  }};
  border-radius: ${dimensions.search.borderRadius};
  font-size: ${({ $size }) => getFontSize($size)};
  font-family: ${typography.fontFamily};
  font-weight: ${typography.weights.semibold};
  cursor: pointer;
  transition: all ${transitions.default};
  border: none;
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
  white-space: nowrap;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${spacing.xs};

  ${({ $variant }) => {
    switch ($variant) {
      case 'primary':
        return `
          background: ${colors.gray.dark};
          color: ${colors.white};
          
          &:hover:not(:disabled) {
            background: ${colors.gray.darker};
            transform: translateY(-1px);
            box-shadow: 0 2px 4px ${colors.shadow.medium};
          }
        `
      case 'secondary':
        return `
          background: ${colors.gray.medium};
          color: ${colors.white};
          border: 1px solid ${colors.gray.medium};
          
          &:hover:not(:disabled) {
            background: ${colors.gray.dark};
            border-color: ${colors.gray.dark};
          }
        `
      case 'danger':
        return `
          background: ${colors.error};
          color: ${colors.white};
          
          &:hover:not(:disabled) {
            background: ${colors.errorDark};
            transform: translateY(-1px);
            box-shadow: 0 2px 4px ${colors.shadow.dark};
          }
        `
      case 'ghost':
        return `
          background: transparent;
          color: ${colors.gray.text};
          border: 1px dashed ${colors.gray.medium};
          
          &:hover:not(:disabled) {
            background: ${colors.gray.medium};
            border-color: ${colors.gray.dark};
            border-style: solid;
            color: ${colors.white};
          }
        `
      case 'link':
        return `
          background: transparent;
          color: ${colors.gray.text};
          border: none;
          padding: ${spacing.xs} ${spacing.sm};
          
          &:hover:not(:disabled) {
            color: ${colors.white};
            background: ${colors.gray.medium};
          }
        `
      default:
        return ''
    }
  }}

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${colors.focus.medium};
  }
`
