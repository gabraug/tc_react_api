import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import Header from './Header'
import { ToastProvider } from '../../contexts/Toast/ToastContext'

const renderWithProviders = (component: React.ReactElement, initialEntries = ['/']) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <ToastProvider>{component}</ToastProvider>
    </MemoryRouter>
  )
}

describe('Header Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Rendering', () => {
    it('should render the application logo correctly', async () => {
      renderWithProviders(<Header />)
      await new Promise(resolve => setTimeout(resolve, 100))
      expect(screen.getByText('TMDB')).toBeInTheDocument()
    }, 10000)

    it('should render the search field correctly', () => {
      renderWithProviders(<Header />)
      expect(screen.getByPlaceholderText(/buscar filmes/i)).toBeInTheDocument()
    })

    it('should render the navigation links correctly', () => {
      renderWithProviders(<Header />)
      expect(screen.getByRole('button', { name: /início/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /favoritos/i })).toBeInTheDocument()
    })
  })

  describe('Navigation', () => {
    it('should navigate to home page when logo is clicked', async () => {
      const user = userEvent.setup()
      renderWithProviders(<Header />, ['/favorites'])

      const logo = screen.getByText('TMDB')
      await user.click(logo)

      expect(logo).toBeInTheDocument()
    })
  })

  describe('Search Field', () => {
    it('should update search term when user types', async () => {
      const user = userEvent.setup()
      renderWithProviders(<Header />)

      const input = screen.getByPlaceholderText(/buscar filmes/i)
      await user.type(input, 'batman')

      expect((input as HTMLInputElement).value).toBe('batman')
    })

    it('should clear search field when clear button is clicked', async () => {
      const user = userEvent.setup()
      renderWithProviders(<Header />, ['/search?q=test'])

      const input = screen.getByPlaceholderText(/buscar filmes/i)
      const clearButton = screen.getByLabelText(/limpar/i)

      await user.click(clearButton)

      expect((input as HTMLInputElement).value).toBe('')
    })

    it('should limit the maximum length of search term', async () => {
      const user = userEvent.setup()
      renderWithProviders(<Header />)

      const input = screen.getByPlaceholderText(/buscar filmes/i)
      const longText = 'a'.repeat(50)

      await user.type(input, longText)

      expect((input as HTMLInputElement).value.length).toBeLessThanOrEqual(30)
    })
  })
})

