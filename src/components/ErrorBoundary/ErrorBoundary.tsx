import { Component, type ReactNode, type ErrorInfo } from 'react'
import Button from '../Button/Button'
import Text from '../Text/Text'
import { ErrorBoundaryContainer, ErrorTitle, ErrorDetails, ErrorCode } from './ErrorBoundary.styles'
import { texts } from '../../constants/texts'

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: ErrorInfo) => void
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    }
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error,
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      errorInfo,
    })

    if (this.props.onError) {
      this.props.onError(error, errorInfo)
    }

    if (import.meta.env.DEV) {
      console.error('ErrorBoundary caught an error:', error, errorInfo)
    }
  }

  handleReset = () => {
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }
      return (
        <ErrorBoundaryContainer>
          <ErrorTitle>
            <Text size="lg" color="error" weight="bold">
              {texts.errors.boundary.title}
            </Text>
          </ErrorTitle>
          <Text size="md" color="text" align="center">
            {texts.errors.boundary.message}
          </Text>
          {import.meta.env.DEV && this.state.error && (
            <ErrorDetails>
              <Text size="sm" color="textDark" weight="semibold">
                {texts.errors.boundary.details}
              </Text>
              <ErrorCode>
                {this.state.error.toString()}
                {this.state.errorInfo?.componentStack && (
                  <>
                    {'\n\n'}
                    {this.state.errorInfo.componentStack}
                  </>
                )}
              </ErrorCode>
            </ErrorDetails>
          )}
          <Button variant="primary" size="md" onClick={this.handleReset}>
            {texts.errors.boundary.reset}
          </Button>
        </ErrorBoundaryContainer>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
