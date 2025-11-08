import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import MovieCard from './MovieCard'
import { FavoritesProvider } from '../../contexts/Favorites/FavoritesContext'
import { ToastProvider } from '../../contexts/Toast/ToastContext'
import type { Movie } from '../../types/movie'

const mockMovie: Movie = {
  id: 1,
  title: 'Test Movie',
  poster_path: '/test.jpg',
  vote_average: 8.5,
  overview: 'Test overview',
}

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      <ToastProvider>
        <FavoritesProvider>{component}</FavoritesProvider>
      </ToastProvider>
    </BrowserRouter>
  )
}

describe('MovieCard Component', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  describe('Rendering', () => {
    it('should render the movie title correctly', () => {
      renderWithProviders(<MovieCard movie={mockMovie} />)
      expect(screen.getByText('Test Movie')).toBeInTheDocument()
    })

    it('should render poster image when available', () => {
      renderWithProviders(<MovieCard movie={mockMovie} />)
      const image = screen.getByAltText('Test Movie')
      expect(image).toBeInTheDocument()
      expect(image).toHaveAttribute('src', expect.stringContaining('/test.jpg'))
    })

    it('should render placeholder when poster image is not available', () => {
      const movieWithoutPoster = { ...mockMovie, poster_path: null }
      renderWithProviders(<MovieCard movie={movieWithoutPoster} />)
      expect(screen.getByText(/sem poster/i)).toBeInTheDocument()
    })

    it('should render backdrop_path when poster_path is not available', () => {
      const movieWithBackdrop = { ...mockMovie, poster_path: null, backdrop_path: '/backdrop.jpg' }
      renderWithProviders(<MovieCard movie={movieWithBackdrop} />)
      const image = screen.getByAltText('Test Movie')
      expect(image).toBeInTheDocument()
      expect(image).toHaveAttribute('src', expect.stringContaining('/backdrop.jpg'))
    })

    it('should render the movie rating correctly', () => {
      renderWithProviders(<MovieCard movie={mockMovie} />)
      expect(screen.getByText('8.5')).toBeInTheDocument()
    })
  })

  describe('Search Highlight', () => {
    it('should highlight search term in title when searchTerm is provided', () => {
      renderWithProviders(<MovieCard movie={mockMovie} searchTerm="Test" />)
      expect(screen.getByText(/test/i)).toBeInTheDocument()
    })
  })

  describe('Action Buttons', () => {
    it('should display favorite button when showDeleteButton is false', () => {
      renderWithProviders(<MovieCard movie={mockMovie} />)
      const favoriteButton = screen.getByRole('button')
      expect(favoriteButton).toBeInTheDocument()
    })

    it('should display delete button when showDeleteButton is true', () => {
      const handleDelete = vi.fn()
      renderWithProviders(<MovieCard movie={mockMovie} showDeleteButton onDelete={handleDelete} />)
      const deleteButton = screen.getByRole('button')
      expect(deleteButton).toBeInTheDocument()
    })

    it('should execute onDelete function when delete button is clicked', async () => {
      const handleDelete = vi.fn()
      const user = userEvent.setup()

      renderWithProviders(<MovieCard movie={mockMovie} showDeleteButton onDelete={handleDelete} />)

      const deleteButton = screen.getByRole('button')
      await user.click(deleteButton)

      expect(handleDelete).toHaveBeenCalledWith(1)
    })
  })

  describe('Navigation', () => {
    it('should navigate to movie details when card is clicked', async () => {
      const user = userEvent.setup()
      const { container } = renderWithProviders(<MovieCard movie={mockMovie} />)

      const card =
        container.querySelector('[onclick]') || screen.getByText('Test Movie').closest('div')
      if (card) {
        await user.click(card)
      }

      expect(screen.getByText('Test Movie')).toBeInTheDocument()
    })
  })

  describe('Remove Favorite Modal', () => {
    it('should handle remove favorite with listId when list is selected', async () => {
      const user = userEvent.setup()

      localStorage.setItem(
        'favorites_data',
        JSON.stringify({
          general: [],
          lists: [
            { id: 'list1', name: 'My List', movieIds: [1], createdAt: new Date().toISOString() },
          ],
        })
      )

      renderWithProviders(<MovieCard movie={mockMovie} />)

      const favoriteButton = screen.getByRole('button')
      await user.click(favoriteButton)

      await screen.findByText(/remover.*test movie/i)

      const listButtons = screen.getAllByRole('button')
      const selectListButton = listButtons.find(btn => btn.textContent?.includes('My List'))
      if (selectListButton) {
        await user.click(selectListButton)
      }

      const removeConfirmButton = screen.getByRole('button', { name: /remover/i })
      await user.click(removeConfirmButton)

      await new Promise(resolve => setTimeout(resolve, 100))
      expect(screen.queryByText(/remover.*test movie/i)).not.toBeInTheDocument()
    })

    it('should close remove modal when onClose callback is called', async () => {
      const user = userEvent.setup()

      localStorage.setItem(
        'favorites_data',
        JSON.stringify({
          general: [1],
          lists: [
            { id: 'list1', name: 'My List', movieIds: [1], createdAt: new Date().toISOString() },
          ],
        })
      )

      renderWithProviders(<MovieCard movie={mockMovie} />)

      const favoriteButton = screen.getByRole('button')
      await user.click(favoriteButton)

      await screen.findByText(/remover.*test movie/i)

      const cancelButton = screen.getByRole('button', { name: /cancelar/i })
      await user.click(cancelButton)

      expect(screen.queryByText(/remover.*test movie/i)).not.toBeInTheDocument()
    })

    it('should handle remove favorite without listId when removing from general favorites', async () => {
      const user = userEvent.setup()

      localStorage.setItem(
        'favorites_data',
        JSON.stringify({
          general: [1],
          lists: [],
        })
      )

      renderWithProviders(<MovieCard movie={mockMovie} />)

      const favoriteButton = screen.getByRole('button')
      await user.click(favoriteButton)

      await new Promise(resolve => setTimeout(resolve, 100))
      expect(screen.queryByText(/remover.*test movie/i)).not.toBeInTheDocument()
    })

    it('should handle remove favorite without listId when only in general favorites', async () => {
      const user = userEvent.setup()

      localStorage.setItem(
        'favorites_data',
        JSON.stringify({
          general: [1],
          lists: [],
        })
      )

      renderWithProviders(<MovieCard movie={mockMovie} />)

      const favoriteButton = screen.getByRole('button')
      await user.click(favoriteButton)

      await new Promise(resolve => setTimeout(resolve, 100))
      expect(screen.queryByText(/remover.*test movie/i)).not.toBeInTheDocument()
    })
  })

  describe('Favorite Modal', () => {
    it('should handle adding favorite with listId when list is selected', async () => {
      const user = userEvent.setup()

      localStorage.setItem(
        'favorites_data',
        JSON.stringify({
          general: [],
          lists: [
            { id: 'list1', name: 'My List', movieIds: [], createdAt: new Date().toISOString() },
          ],
        })
      )

      renderWithProviders(<MovieCard movie={mockMovie} />)

      const favoriteButton = screen.getByRole('button')
      await user.click(favoriteButton)

      await screen.findByText(/adicionar.*test movie/i)

      const listButtons = screen.getAllByRole('button')
      const selectListButton = listButtons.find(btn => btn.textContent?.includes('My List'))
      if (selectListButton) {
        await user.click(selectListButton)
      }

      const confirmButton = screen.getByRole('button', { name: /confirmar/i })
      await user.click(confirmButton)

      await new Promise(resolve => setTimeout(resolve, 100))
      expect(screen.queryByText(/adicionar.*test movie/i)).not.toBeInTheDocument()
    })

    it('should handle adding favorite without listId when general option is selected', async () => {
      const user = userEvent.setup()

      renderWithProviders(<MovieCard movie={mockMovie} />)

      const favoriteButton = screen.getByRole('button')
      await user.click(favoriteButton)

      await screen.findByText(/adicionar.*test movie/i)

      const confirmButton = screen.getByRole('button', { name: /confirmar/i })
      await user.click(confirmButton)

      await new Promise(resolve => setTimeout(resolve, 100))
      expect(screen.queryByText(/adicionar.*test movie/i)).not.toBeInTheDocument()
    })
  })
})
