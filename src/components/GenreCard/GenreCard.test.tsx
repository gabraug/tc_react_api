import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import GenreCard from './GenreCard'

describe('GenreCard Component', () => {
  describe('Rendering', () => {
    it('should render the genre name correctly', () => {
      render(<GenreCard name="Ação" />)
      expect(screen.getByText('Ação')).toBeInTheDocument()
    })

    it('should render different genre names correctly', () => {
      const { rerender } = render(<GenreCard name="Comédia" />)
      expect(screen.getByText('Comédia')).toBeInTheDocument()

      rerender(<GenreCard name="Drama" />)
      expect(screen.getByText('Drama')).toBeInTheDocument()

      rerender(<GenreCard name="Terror" />)
      expect(screen.getByText('Terror')).toBeInTheDocument()
    })
  })
})

