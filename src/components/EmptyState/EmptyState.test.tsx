import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import EmptyState from './EmptyState'

describe('EmptyState Component', () => {
  describe('Rendering', () => {
    it('should render the empty state title correctly', () => {
      render(<EmptyState title="Nenhum item encontrado" />)
      expect(screen.getByText('Nenhum item encontrado')).toBeInTheDocument()
    })

    it('should render description when description property is provided', () => {
      render(<EmptyState title="Título" description="Descrição do estado vazio" />)
      expect(screen.getByText('Descrição do estado vazio')).toBeInTheDocument()
    })

    it('should not render description when description property is not provided', () => {
      render(<EmptyState title="Título" />)
      expect(screen.queryByText(/descrição/i)).not.toBeInTheDocument()
    })

    it('should render icon when icon property is provided', () => {
      const icon = <span data-testid="custom-icon">Icon</span>
      render(<EmptyState title="Título" icon={icon} />)
      expect(screen.getByTestId('custom-icon')).toBeInTheDocument()
    })
  })

  describe('Action Button', () => {
    it('should render action button when actionLabel and onAction are provided', () => {
      const handleAction = vi.fn()
      render(
        <EmptyState title="Título" actionLabel="Adicionar item" onAction={handleAction} />
      )
      expect(screen.getByRole('button', { name: /adicionar item/i })).toBeInTheDocument()
    })

    it('should not render button when actionLabel is not provided', () => {
      render(<EmptyState title="Título" onAction={vi.fn()} />)
      expect(screen.queryByRole('button')).not.toBeInTheDocument()
    })

    it('should execute onAction function when action button is clicked', async () => {
      const handleAction = vi.fn()
      const user = userEvent.setup()

      render(
        <EmptyState title="Título" actionLabel="Adicionar" onAction={handleAction} />
      )
      const button = screen.getByRole('button', { name: /adicionar/i })

      await user.click(button)
      expect(handleAction).toHaveBeenCalledTimes(1)
    })
  })
})

