import styled from 'styled-components'
import { colors, typography } from '../../styles/constants'

export const TextStyled = styled.div<{
  $size: 'xs' | 'sm' | 'md' | 'lg'
  $weight: 'normal' | 'semibold' | 'bold'
  $color: 'white' | 'text' | 'textLight' | 'textDark' | 'error'
  $align: 'left' | 'center' | 'right' | 'justify'
  $lineHeight?: number
}>`
  font-family: ${typography.fontFamily};
  font-size: ${({ $size }) => typography.sizes[$size]};
  font-weight: ${({ $weight }) => typography.weights[$weight]};
  color: ${({ $color }) => {
    switch ($color) {
      case 'white':
        return colors.white
      case 'text':
        return colors.gray.text
      case 'textLight':
        return colors.gray.textLight
      case 'textDark':
        return colors.gray.textDark
      case 'error':
        return colors.error
      default:
        return colors.gray.text
    }
  }};
  text-align: ${({ $align }) => $align};
  line-height: ${({ $lineHeight }) => ($lineHeight ? `${$lineHeight}` : '1.5')};
  margin: 0;
`
