import { forwardRef } from 'react'
import { TextStyled } from './Text.styles'

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  as?: 'p' | 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'strong' | 'em'
  size?: 'xs' | 'sm' | 'md' | 'lg'
  weight?: 'normal' | 'semibold' | 'bold'
  color?: 'white' | 'text' | 'textLight' | 'textDark' | 'error'
  align?: 'left' | 'center' | 'right' | 'justify'
  lineHeight?: number
}

const Text = forwardRef<HTMLElement, TextProps>(
  (
    {
      as = 'p',
      size = 'sm',
      weight = 'normal',
      color = 'text',
      align = 'left',
      lineHeight,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <TextStyled
        ref={ref as React.Ref<HTMLDivElement>}
        as={as}
        $size={size}
        $weight={weight}
        $color={color}
        $align={align}
        $lineHeight={lineHeight}
        {...props}
      >
        {children}
      </TextStyled>
    )
  }
)

Text.displayName = 'Text'

export default Text
