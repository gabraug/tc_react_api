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
      renderWithProviders(
        <MovieCard movie={mockMovie} showDeleteButton onDelete={handleDelete} />
      )
      const deleteButton = screen.getByRole('button')
      expect(deleteButton).toBeInTheDocument()
    })

    it('should execute onDelete function when delete button is clicked', async () => {
      const handleDelete = vi.fn()
      const user = userEvent.setup()

      renderWithProviders(
        <MovieCard movie={mockMovie} showDeleteButton onDelete={handleDelete} />
      )

      const deleteButton = screen.getByRole('button')
      await user.click(deleteButton)

      expect(handleDelete).toHaveBeenCalledWith(1)
    })
  })
})

