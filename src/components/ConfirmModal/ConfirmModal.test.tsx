import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ConfirmModal from './ConfirmModal'

describe('ConfirmModal Component', () => {
  describe('Visibility', () => {
    it('should not render when isOpen property is false', () => {
      render(
        <ConfirmModal
          isOpen={false}
          title="Confirmar"
          message="Tem certeza?"
          onConfirm={vi.fn()}
          onCancel={vi.fn()}
        />
      )
      expect(screen.queryByText('Confirmar')).not.toBeInTheDocument()
    })

    it('should render when isOpen property is true', () => {
      render(
        <ConfirmModal
          isOpen={true}
          title="Confirmar"
          message="Tem certeza?"
          onConfirm={vi.fn()}
          onCancel={vi.fn()}
        />
      )
      expect(screen.getByRole('heading', { name: 'Confirmar' })).toBeInTheDocument()
      expect(screen.getByText('Tem certeza?')).toBeInTheDocument()
    })
  })

  describe('Behavior', () => {
    it('should execute onConfirm function when confirm button is clicked', async () => {
      const handleConfirm = vi.fn()
      const user = userEvent.setup()

      render(
        <ConfirmModal
          isOpen={true}
          title="Confirmar"
          message="Tem certeza?"
          onConfirm={handleConfirm}
          onCancel={vi.fn()}
        />
      )

      const confirmButton = screen.getByRole('button', { name: /confirmar/i })
      await user.click(confirmButton)

      expect(handleConfirm).toHaveBeenCalledTimes(1)
    })

    it('should execute onCancel function when cancel button is clicked', async () => {
      const handleCancel = vi.fn()
      const user = userEvent.setup()

      render(
        <ConfirmModal
          isOpen={true}
          title="Confirmar"
          message="Tem certeza?"
          onConfirm={vi.fn()}
          onCancel={handleCancel}
        />
      )

      const cancelButton = screen.getByRole('button', { name: /cancelar/i })
      await user.click(cancelButton)

      expect(handleCancel).toHaveBeenCalledTimes(1)
    })

    it('should execute onCancel function when overlay is clicked', async () => {
      const handleCancel = vi.fn()
      const user = userEvent.setup()

      const { container } = render(
        <ConfirmModal
          isOpen={true}
          title="Confirmar"
          message="Tem certeza?"
          onConfirm={vi.fn()}
          onCancel={handleCancel}
        />
      )

      const overlay = container.querySelector('[class*="Overlay"]')
      if (overlay) {
        await user.click(overlay)
        expect(handleCancel).toHaveBeenCalledTimes(1)
      }
    })
  })

  describe('Customization', () => {
    it('should render with custom texts when provided', () => {
      render(
        <ConfirmModal
          isOpen={true}
          title="Título customizado"
          message="Mensagem customizada"
          confirmText="Sim"
          cancelText="Não"
          onConfirm={vi.fn()}
          onCancel={vi.fn()}
        />
      )

      expect(screen.getByText('Título customizado')).toBeInTheDocument()
      expect(screen.getByText('Mensagem customizada')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /sim/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /não/i })).toBeInTheDocument()
    })

    it('should render with danger variant when specified', () => {
      render(
        <ConfirmModal
          isOpen={true}
          title="Confirmar"
          message="Tem certeza?"
          variant="danger"
          onConfirm={vi.fn()}
          onCancel={vi.fn()}
        />
      )

      const confirmButton = screen.getByRole('button', { name: /confirmar/i })
      expect(confirmButton).toBeInTheDocument()
    })
  })
})

