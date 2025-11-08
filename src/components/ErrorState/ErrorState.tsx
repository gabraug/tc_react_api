import { memo } from 'react'
import Button from '../Button/Button'
import Text from '../Text/Text'
import { ErrorContainer } from './ErrorState.styles'
import { texts } from '../../constants/texts'

interface ErrorStateProps {
  message: string
  onRetry?: () => void
  retryText?: string
}

const ErrorState = memo(function ErrorState({
  message,
  onRetry,
  retryText = texts.buttons.retry,
}: ErrorStateProps) {
  return (
    <ErrorContainer>
      <Text size="md" color="error">
        {message}
      </Text>
      {onRetry && (
        <Button variant="primary" size="md" onClick={onRetry}>
          {retryText}
        </Button>
      )}
    </ErrorContainer>
  )
})

export default ErrorState
