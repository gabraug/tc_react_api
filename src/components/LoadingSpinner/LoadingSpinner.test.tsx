import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import LoadingSpinner from './LoadingSpinner'

describe('LoadingSpinner Component', () => {
  describe('Rendering', () => {
    it('should render the loading indicator correctly', () => {
      const { container } = render(<LoadingSpinner />)
      expect(container.firstChild).toBeInTheDocument()
    })

    it('should render with default loading message', () => {
      render(<LoadingSpinner />)
      expect(screen.getByText(/carregando/i)).toBeInTheDocument()
    })

    it('should render with custom message when provided', () => {
      render(<LoadingSpinner message="Carregando dados..." />)
      expect(screen.getByText('Carregando dados...')).toBeInTheDocument()
    })
  })

  describe('Sizes', () => {
    it('should render with all available sizes', () => {
      const { rerender, container } = render(<LoadingSpinner size="sm" />)
      expect(container.firstChild).toBeInTheDocument()

      rerender(<LoadingSpinner size="md" />)
      expect(container.firstChild).toBeInTheDocument()

      rerender(<LoadingSpinner size="lg" />)
      expect(container.firstChild).toBeInTheDocument()
    })
  })
})

