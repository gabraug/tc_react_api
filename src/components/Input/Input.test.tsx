import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Input from './Input'

describe('Input Component', () => {
  describe('Rendering', () => {
    it('should render the input field correctly', () => {
      render(<Input />)
      const input = screen.getByRole('textbox')
      expect(input).toBeInTheDocument()
    })

    it('should render with initial value when provided', () => {
      render(<Input value="teste" />)
      const input = screen.getByRole('textbox') as HTMLInputElement
      expect(input.value).toBe('teste')
    })

    it('should be disabled when disabled property is true', () => {
      render(<Input disabled />)
      expect(screen.getByRole('textbox')).toBeDisabled()
    })
  })

  describe('Behavior', () => {
    it('should execute onChange function when value is changed', async () => {
      const handleChange = vi.fn()
      const user = userEvent.setup()

      render(<Input onChange={handleChange} />)
      const input = screen.getByRole('textbox')

      await user.type(input, 'a')
      expect(handleChange).toHaveBeenCalled()
    })

    it('should limit character count when maxLength is defined', async () => {
      const handleChange = vi.fn()
      const user = userEvent.setup()

      render(<Input maxLength={5} onChange={handleChange} />)
      const input = screen.getByRole('textbox')

      await user.type(input, '123456')
      expect((input as HTMLInputElement).value.length).toBeLessThanOrEqual(5)
    })
  })

  describe('Clear Button', () => {
    it('should display clear button when showClearButton is true and there is a value', () => {
      const handleClear = vi.fn()
      render(<Input value="teste" showClearButton onClear={handleClear} />)
      expect(screen.getByLabelText(/limpar/i)).toBeInTheDocument()
    })

    it('should not display clear button when there is no value', () => {
      render(<Input value="" showClearButton onClear={vi.fn()} />)
      expect(screen.queryByLabelText(/limpar/i)).not.toBeInTheDocument()
    })

    it('should execute onClear function when clear button is clicked', async () => {
      const handleClear = vi.fn()
      const user = userEvent.setup()

      render(<Input value="teste" showClearButton onClear={handleClear} />)
      const clearButton = screen.getByLabelText(/limpar/i)

      await user.click(clearButton)
      expect(handleClear).toHaveBeenCalledTimes(1)
    })
  })

  describe('Character Counter', () => {
    it('should display character counter when showCharacterCount is true', () => {
      render(<Input value="test" maxLength={10} showCharacterCount />)
      expect(screen.getByText('4/10')).toBeInTheDocument()
    })
  })

  describe('HTML Properties', () => {
    it('should accept and apply additional HTML properties', () => {
      render(<Input data-testid="custom-input" placeholder="Digite aqui" />)
      expect(screen.getByTestId('custom-input')).toBeInTheDocument()
      expect(screen.getByPlaceholderText('Digite aqui')).toBeInTheDocument()
    })
  })
})

