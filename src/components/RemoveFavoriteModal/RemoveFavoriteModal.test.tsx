import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import RemoveFavoriteModal from './RemoveFavoriteModal'
import { FavoritesProvider } from '../../contexts/Favorites/FavoritesContext'

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      <FavoritesProvider>{component}</FavoritesProvider>
    </BrowserRouter>
  )
}

describe('RemoveFavoriteModal Component', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  describe('Visibility', () => {
    it('should not render when isOpen property is false', () => {
      renderWithProviders(
        <RemoveFavoriteModal
          movieId={1}
          movieTitle="Test Movie"
          isOpen={false}
          onClose={vi.fn()}
          onConfirm={vi.fn()}
        />
      )
      expect(screen.queryByText(/remover/i)).not.toBeInTheDocument()
    })

    it('should render when isOpen property is true', () => {
      renderWithProviders(
        <RemoveFavoriteModal
          movieId={1}
          movieTitle="Test Movie"
          isOpen={true}
          onClose={vi.fn()}
          onConfirm={vi.fn()}
        />
      )
      expect(screen.getByText(/remover.*test movie/i)).toBeInTheDocument()
    })
  })

  describe('Rendering', () => {
    it('should render remove button correctly', () => {
      renderWithProviders(
        <RemoveFavoriteModal
          movieId={1}
          movieTitle="Test Movie"
          isOpen={true}
          onClose={vi.fn()}
          onConfirm={vi.fn()}
        />
      )

      const removeButton = screen.getByRole('button', { name: /remover/i })
      expect(removeButton).toBeInTheDocument()
    })
  })

  describe('Behavior', () => {
    it('should execute onClose function when cancel button is clicked', async () => {
      const handleClose = vi.fn()
      const user = userEvent.setup()

      renderWithProviders(
        <RemoveFavoriteModal
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

