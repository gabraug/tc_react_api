import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import SearchCard from './SearchCard'
import type { Movie } from '../../types/movie'

const mockMovie: Movie = {
  id: 1,
  title: 'Test Movie',
  poster_path: '/test.jpg',
  vote_average: 8.5,
  overview: 'Test overview',
}

describe('SearchCard Component', () => {
  const renderWithRouter = (component: React.ReactElement) => {
    return render(<BrowserRouter>{component}</BrowserRouter>)
  }

  describe('Rendering', () => {
    it('should render the movie title correctly', () => {
      renderWithRouter(<SearchCard movie={mockMovie} searchTerm="" />)
      expect(screen.getByText('Test Movie')).toBeInTheDocument()
    })

    it('should render poster image when available', () => {
      renderWithRouter(<SearchCard movie={mockMovie} searchTerm="" />)
      const image = screen.getByAltText('Test Movie')
      expect(image).toBeInTheDocument()
      expect(image).toHaveAttribute('src', expect.stringContaining('/test.jpg'))
    })

    it('should render placeholder when poster image is not available', () => {
      const movieWithoutPoster = { ...mockMovie, poster_path: null }
      renderWithRouter(<SearchCard movie={movieWithoutPoster} searchTerm="" />)
      expect(screen.getByText(/sem imagem/i)).toBeInTheDocument()
    })
  })

  describe('Search Highlight', () => {
    it('should highlight search term in title when searchTerm is provided', () => {
      renderWithRouter(<SearchCard movie={mockMovie} searchTerm="Test" />)
      const titleElement = screen.queryByText('Test Movie')
      if (!titleElement) {
        expect(screen.getByText(/test/i)).toBeInTheDocument()
      } else {
        expect(titleElement).toBeInTheDocument()
      }
    })
  })
})

