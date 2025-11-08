import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import FavoriteCard from './FavoriteCard'
import type { MovieDetails } from '../../types/movie'

const mockMovie: MovieDetails = {
  id: 1,
  title: 'Test Movie',
  backdrop_path: '/test.jpg',
  vote_average: 8.5,
  overview: 'Test overview',
  release_date: '2024-01-01',
  genres: [],
}

describe('FavoriteCard Component', () => {
  const renderWithRouter = (component: React.ReactElement) => {
    return render(<BrowserRouter>{component}</BrowserRouter>)
  }

  describe('Rendering', () => {
    it('should render the favorite movie title correctly', () => {
      const handleDelete = vi.fn()
      renderWithRouter(<FavoriteCard movie={mockMovie} onDelete={handleDelete} />)
      expect(screen.getByText('Test Movie')).toBeInTheDocument()
    })

    it('should render poster image when available', () => {
      const handleDelete = vi.fn()
      renderWithRouter(<FavoriteCard movie={mockMovie} onDelete={handleDelete} />)
      const image = screen.getByAltText('Test Movie')
      expect(image).toBeInTheDocument()
      expect(image).toHaveAttribute('src', expect.stringContaining('/test.jpg'))
    })

    it('should render placeholder when poster image is not available', () => {
      const movieWithoutPoster = { ...mockMovie, backdrop_path: null }
      const handleDelete = vi.fn()
      renderWithRouter(<FavoriteCard movie={movieWithoutPoster} onDelete={handleDelete} />)
      expect(screen.getByText(/sem imagem/i)).toBeInTheDocument()
    })
  })

  describe('Behavior', () => {
    it('should execute onDelete function when delete button is clicked', async () => {
      const handleDelete = vi.fn()
      const user = userEvent.setup()

      renderWithRouter(<FavoriteCard movie={mockMovie} onDelete={handleDelete} />)
      const deleteButton = screen.getByRole('button')

      await user.click(deleteButton)
      expect(handleDelete).toHaveBeenCalledWith(1)
    })

    it('should not trigger navigation when delete button is clicked', async () => {
      const handleDelete = vi.fn()
      const user = userEvent.setup()

      renderWithRouter(<FavoriteCard movie={mockMovie} onDelete={handleDelete} />)
      const deleteButton = screen.getByRole('button')

      await user.click(deleteButton)
      expect(handleDelete).toHaveBeenCalled()
    })
  })
})

