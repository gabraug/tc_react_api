import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ErrorState from './ErrorState'

describe('ErrorState Component', () => {
  describe('Rendering', () => {
    it('should render the error message correctly', () => {
      render(<ErrorState message="Erro ao carregar dados" />)
      expect(screen.getByText('Erro ao carregar dados')).toBeInTheDocument()
    })

    it('should render retry button when onRetry is provided', () => {
      const handleRetry = vi.fn()
      render(<ErrorState message="Erro" onRetry={handleRetry} />)
      expect(screen.getByRole('button', { name: /tentar novamente/i })).toBeInTheDocument()
    })

    it('should not render button when onRetry is not provided', () => {
      render(<ErrorState message="Erro" />)
      expect(screen.queryByRole('button')).not.toBeInTheDocument()
    })

    it('should render with custom text when retryText is provided', () => {
      const handleRetry = vi.fn()
      render(<ErrorState message="Erro" onRetry={handleRetry} retryText="Tentar de novo" />)
      expect(screen.getByRole('button', { name: /tentar de novo/i })).toBeInTheDocument()
    })
  })

  describe('Behavior', () => {
    it('should execute onRetry function when retry button is clicked', async () => {
      const handleRetry = vi.fn()
      const user = userEvent.setup()

      render(<ErrorState message="Erro" onRetry={handleRetry} />)
      const button = screen.getByRole('button', { name: /tentar novamente/i })

      await user.click(button)
      expect(handleRetry).toHaveBeenCalledTimes(1)
    })
  })
})

