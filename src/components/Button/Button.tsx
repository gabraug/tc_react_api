import { forwardRef } from 'react'
import { ButtonStyled } from './Button.styles'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'link'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', fullWidth = false, children, ...props }, ref) => {
    return (
      <ButtonStyled ref={ref} $variant={variant} $size={size} $fullWidth={fullWidth} {...props}>
        {children}
      </ButtonStyled>
    )
  }
)

Button.displayName = 'Button'

export default Button
