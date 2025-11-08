import { memo } from 'react'
import Text from '../Text/Text'
import { SpinnerContainer, Spinner } from './LoadingSpinner.styles'
import { texts } from '../../constants/texts'

interface LoadingSpinnerProps {
  message?: string
  size?: 'sm' | 'md' | 'lg'
}

const LoadingSpinner = memo(function LoadingSpinner({
  message = texts.loading.default,
  size = 'md',
}: LoadingSpinnerProps) {
  return (
    <SpinnerContainer>
      <Spinner $size={size} />
      {message && (
        <Text size="md" color="text">
          {message}
        </Text>
      )}
    </SpinnerContainer>
  )
})

export default LoadingSpinner
