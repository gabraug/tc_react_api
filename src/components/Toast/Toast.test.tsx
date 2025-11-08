import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Toast from './Toast'
import { ToastProvider } from '../../contexts/Toast/ToastContext'

describe('Toast Component', () => {
  describe('Rendering', () => {
    it('should not render when there are no notifications available', () => {
      render(
        <ToastProvider>
          <Toast />
        </ToastProvider>
      )
      expect(screen.queryByText(/test/i)).not.toBeInTheDocument()
    })

    it('should return null when there are no toasts to display', () => {
      const { container } = render(
        <ToastProvider>
          <Toast />
        </ToastProvider>
      )
      expect(container.firstChild).toBeNull()
    })
  })
})

