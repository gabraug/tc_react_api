import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import FavoriteModal from './FavoriteModal'
import { FavoritesProvider } from '../../contexts/Favorites/FavoritesContext'
import { ToastProvider } from '../../contexts/Toast/ToastContext'

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      <ToastProvider>
        <FavoritesProvider>{component}</FavoritesProvider>
      </ToastProvider>
    </BrowserRouter>
  )
}

describe('FavoriteModal Component', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  describe('Visibility', () => {
    it('should not render when isOpen property is false', () => {
      renderWithProviders(
        <FavoriteModal
          movieId={1}
          movieTitle="Test Movie"
          isOpen={false}
          onClose={vi.fn()}
          onConfirm={vi.fn()}
        />
      )
      expect(screen.queryByText(/adicionar/i)).not.toBeInTheDocument()
    })

    it('should render when isOpen property is true', () => {
      renderWithProviders(
        <FavoriteModal
          movieId={1}
          movieTitle="Test Movie"
          isOpen={true}
          onClose={vi.fn()}
          onConfirm={vi.fn()}
        />
      )
      expect(screen.getByText(/adicionar.*test movie/i)).toBeInTheDocument()
    })
  })

  describe('List Options', () => {
    it('should display general favorites option', () => {
      renderWithProviders(
        <FavoriteModal
          movieId={1}
          movieTitle="Test Movie"
          isOpen={true}
          onClose={vi.fn()}
          onConfirm={vi.fn()}
        />
      )
      const favoritesOptions = screen.getAllByText(/favoritos/i)
      expect(favoritesOptions.length).toBeGreaterThan(0)
    })

    it('should display option to create new list', () => {
      renderWithProviders(
        <FavoriteModal
          movieId={1}
          movieTitle="Test Movie"
          isOpen={true}
          onClose={vi.fn()}
          onConfirm={vi.fn()}
        />
      )
      expect(screen.getByText(/criar nova lista/i)).toBeInTheDocument()
    })
  })

  describe('Behavior', () => {
    it('should execute onConfirm function when confirm button is clicked', async () => {
      const handleConfirm = vi.fn()
      const user = userEvent.setup()

      renderWithProviders(
        <FavoriteModal
          movieId={1}
          movieTitle="Test Movie"
          isOpen={true}
          onClose={vi.fn()}
          onConfirm={handleConfirm}
        />
      )

      const confirmButton = screen.getByRole('button', { name: /confirmar/i })
      await user.click(confirmButton)

      expect(handleConfirm).toHaveBeenCalled()
    })

    it('should execute onClose function when cancel button is clicked', async () => {
      const handleClose = vi.fn()
      const user = userEvent.setup()

      renderWithProviders(
        <FavoriteModal
          movieId={1}
          movieTitle="Test Movie"
          isOpen={true}
          onClose={handleClose}
          onConfirm={vi.fn()}
        />
      )

      const cancelButton = screen.getByRole('button', { name: /cancelar/i })
      await user.click(cancelButton)

      expect(handleClose).toHaveBeenCalled()
    })
  })
})

