import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SortPanel from './SortPanel'

const mockOptions = [
  { value: 'title-asc', label: 'A-Z' },
  { value: 'title-desc', label: 'Z-A' },
  { value: 'rating-desc', label: 'Nota: Maior' },
]

describe('SortPanel Component', () => {
  describe('Rendering', () => {
    it('should render the panel title correctly', () => {
      render(
        <SortPanel
          title="Ordenar por"
          options={mockOptions}
          activeValue="title-asc"
          onSelect={vi.fn()}
        />
      )
      expect(screen.getByText('Ordenar por')).toBeInTheDocument()
    })

    it('should render all available sorting options', () => {
      render(
        <SortPanel
          title="Ordenar por"
          options={mockOptions}
          activeValue="title-asc"
          onSelect={vi.fn()}
        />
      )
      expect(screen.getByText('A-Z')).toBeInTheDocument()
      expect(screen.getByText('Z-A')).toBeInTheDocument()
      expect(screen.getByText('Nota: Maior')).toBeInTheDocument()
    })
  })

  describe('Behavior', () => {
    it('should execute onSelect function when a sorting option is clicked', async () => {
      const handleSelect = vi.fn()
      const user = userEvent.setup()

      render(
        <SortPanel
          title="Ordenar por"
          options={mockOptions}
          activeValue="title-asc"
          onSelect={handleSelect}
        />
      )

      const option = screen.getByText('Z-A')
      await user.click(option)

      expect(handleSelect).toHaveBeenCalledWith('title-desc')
    })

    it('should expand and collapse panel when toggle button is clicked', async () => {
      const user = userEvent.setup()

      render(
        <SortPanel
          title="Ordenar por"
          options={mockOptions}
          activeValue="title-asc"
          onSelect={vi.fn()}
        />
      )

      const toggleButton = screen.getByLabelText(/minimizar/i)
      await user.click(toggleButton)

      expect(screen.queryByText('A-Z')).not.toBeInTheDocument()

      const expandButton = screen.getByLabelText(/maximizar/i)
      await user.click(expandButton)

      expect(screen.getByText('A-Z')).toBeInTheDocument()
    })
  })
})

