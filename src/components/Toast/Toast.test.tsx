import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Toast from './Toast'
import { ToastProvider, useToast } from '../../contexts/Toast/ToastContext'

const TestComponent = () => {
  const { showToast } = useToast()
  return (
    <div>
      <button onClick={() => showToast('Test message', 'success')}>Show Toast</button>
      <Toast />
    </div>
  )
}

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

    it('should render toast container when there are toasts', async () => {
      const user = userEvent.setup()
      render(
        <ToastProvider>
          <TestComponent />
        </ToastProvider>
      )

      const showButton = screen.getByRole('button', { name: /show toast/i })
      await user.click(showButton)

      expect(screen.getByText('Test message')).toBeInTheDocument()
    })

    it('should remove toast when close button is clicked', async () => {
      const user = userEvent.setup()
      render(
        <ToastProvider>
          <TestComponent />
        </ToastProvider>
      )

      const showButton = screen.getByRole('button', { name: /show toast/i })
      await user.click(showButton)

      const closeButton = screen.getByText('×')
      await user.click(closeButton)

      expect(screen.queryByText('Test message')).not.toBeInTheDocument()
    })

    it('should render toast with info type', async () => {
      const user = userEvent.setup()
      const TestInfoComponent = () => {
        const { showToast } = useToast()
        return (
          <div>
            <button onClick={() => showToast('Info message', 'info')}>Show Info</button>
            <Toast />
          </div>
        )
      }

      render(
        <ToastProvider>
          <TestInfoComponent />
        </ToastProvider>
      )

      const showButton = screen.getByRole('button', { name: /show info/i })
      await user.click(showButton)

      expect(screen.getByText('Info message')).toBeInTheDocument()
    })

    it('should render toast with neutral type', async () => {
      const user = userEvent.setup()
      const TestNeutralComponent = () => {
        const { showToast } = useToast()
        return (
          <div>
            <button onClick={() => showToast('Neutral message', 'neutral')}>Show Neutral</button>
            <Toast />
          </div>
        )
      }

      render(
        <ToastProvider>
          <TestNeutralComponent />
        </ToastProvider>
      )

      const showButton = screen.getByRole('button', { name: /show neutral/i })
      await user.click(showButton)

      expect(screen.getByText('Neutral message')).toBeInTheDocument()
    })

    it('should render toast with error type', async () => {
      const user = userEvent.setup()
      const TestErrorComponent = () => {
        const { showToast } = useToast()
        return (
          <div>
            <button onClick={() => showToast('Error message', 'error')}>Show Error</button>
            <Toast />
          </div>
        )
      }

      render(
        <ToastProvider>
          <TestErrorComponent />
        </ToastProvider>
      )

      const showButton = screen.getByRole('button', { name: /show error/i })
      await user.click(showButton)

      expect(screen.getByText('Error message')).toBeInTheDocument()
    })
  })
})
