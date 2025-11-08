import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Button from './Button'

describe('Button Component', () => {
  describe('Rendering', () => {
    it('should render correctly with text content', () => {
      render(<Button>Clique aqui</Button>)
      expect(screen.getByRole('button', { name: /clique aqui/i })).toBeInTheDocument()
    })

    it('should render with primary variant as default', () => {
      const { container } = render(<Button>Botão</Button>)
      expect(container.firstChild).toBeInTheDocument()
    })

    it('should render all available variants', () => {
      const { rerender } = render(<Button variant="primary">Primary</Button>)
      expect(screen.getByRole('button')).toBeInTheDocument()

      rerender(<Button variant="secondary">Secondary</Button>)
      expect(screen.getByRole('button')).toBeInTheDocument()

      rerender(<Button variant="danger">Danger</Button>)
      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('should render all available sizes', () => {
      const { rerender } = render(<Button size="sm">Small</Button>)
      expect(screen.getByRole('button')).toBeInTheDocument()

      rerender(<Button size="md">Medium</Button>)
      expect(screen.getByRole('button')).toBeInTheDocument()

      rerender(<Button size="lg">Large</Button>)
      expect(screen.getByRole('button')).toBeInTheDocument()
    })
  })

  describe('Behavior', () => {
    it('should execute onClick function when button is clicked', async () => {
      const handleClick = vi.fn()
      const user = userEvent.setup()

      render(<Button onClick={handleClick}>Clique</Button>)
      await user.click(screen.getByRole('button'))

      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('should be disabled when disabled property is true', () => {
      render(<Button disabled>Desabilitado</Button>)
      expect(screen.getByRole('button')).toBeDisabled()
    })
  })

  describe('HTML Properties', () => {
    it('should accept and apply additional HTML properties', () => {
      render(<Button data-testid="custom-button" aria-label="Botão customizado">Teste</Button>)
      expect(screen.getByTestId('custom-button')).toBeInTheDocument()
      expect(screen.getByLabelText('Botão customizado')).toBeInTheDocument()
    })
  })
})

