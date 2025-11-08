import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Text from './Text'

describe('Text Component', () => {
  describe('Rendering', () => {
    it('should render text content correctly', () => {
      render(<Text>Texto de exemplo</Text>)
      expect(screen.getByText('Texto de exemplo')).toBeInTheDocument()
    })

    it('should render as paragraph element by default', () => {
      const { container } = render(<Text>Parágrafo</Text>)
      expect(container.querySelector('p')).toBeInTheDocument()
    })
  })

  describe('HTML Elements', () => {
    it('should render with different HTML elements through as property', () => {
      const { rerender, container } = render(<Text as="h1">Título</Text>)
      expect(container.querySelector('h1')).toBeInTheDocument()

      rerender(<Text as="span">Span</Text>)
      expect(container.querySelector('span')).toBeInTheDocument()

      rerender(<Text as="div">Div</Text>)
      expect(container.querySelector('div')).toBeInTheDocument()
    })
  })

  describe('Styling', () => {
    it('should render with all available sizes', () => {
      const { rerender } = render(<Text size="xs">Extra Small</Text>)
      expect(screen.getByText('Extra Small')).toBeInTheDocument()

      rerender(<Text size="sm">Small</Text>)
      expect(screen.getByText('Small')).toBeInTheDocument()

      rerender(<Text size="md">Medium</Text>)
      expect(screen.getByText('Medium')).toBeInTheDocument()

      rerender(<Text size="lg">Large</Text>)
      expect(screen.getByText('Large')).toBeInTheDocument()
    })

    it('should render with all available font weights', () => {
      const { rerender } = render(<Text weight="normal">Normal</Text>)
      expect(screen.getByText('Normal')).toBeInTheDocument()

      rerender(<Text weight="semibold">Semibold</Text>)
      expect(screen.getByText('Semibold')).toBeInTheDocument()

      rerender(<Text weight="bold">Bold</Text>)
      expect(screen.getByText('Bold')).toBeInTheDocument()
    })

    it('should render with all available colors', () => {
      const { rerender } = render(<Text color="text">Texto padrão</Text>)
      expect(screen.getByText('Texto padrão')).toBeInTheDocument()

      rerender(<Text color="error">Erro</Text>)
      expect(screen.getByText('Erro')).toBeInTheDocument()
    })

    it('should render with all available alignments', () => {
      const { rerender } = render(<Text align="left">Esquerda</Text>)
      expect(screen.getByText('Esquerda')).toBeInTheDocument()

      rerender(<Text align="center">Centro</Text>)
      expect(screen.getByText('Centro')).toBeInTheDocument()

      rerender(<Text align="right">Direita</Text>)
      expect(screen.getByText('Direita')).toBeInTheDocument()
    })
  })

  describe('HTML Properties', () => {
    it('should accept and apply additional HTML properties', () => {
      render(
        <Text data-testid="custom-text" className="custom-class">
          Texto customizado
        </Text>
      )
      expect(screen.getByTestId('custom-text')).toBeInTheDocument()
      expect(screen.getByText('Texto customizado')).toHaveClass('custom-class')
    })
  })
})

