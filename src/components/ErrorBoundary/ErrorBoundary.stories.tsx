import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import ErrorBoundary from './ErrorBoundary'

const ThrowError = ({ shouldThrow = false }: { shouldThrow?: boolean }) => {
  if (shouldThrow) {
    throw new Error('This is a test error for Storybook')
  }
  return (
    <div style={{ padding: '20px', color: 'white' }}>
      No error - component rendered successfully
    </div>
  )
}

const meta = {
  title: 'Components/ErrorBoundary',
  component: ErrorBoundary,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    onError: {
      action: 'error occurred',
    },
  },
} satisfies Meta<typeof ErrorBoundary>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: <div style={{ padding: '20px', color: 'white' }}>Normal content without errors</div>,
  },
}

export const WithError: Story = {
  args: {
    children: <ThrowError shouldThrow={true} />,
    onError: fn(),
  },
}

export const WithCustomFallback: Story = {
  args: {
    children: <ThrowError shouldThrow={true} />,
    fallback: (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          padding: '20px',
          color: 'white',
          gap: '20px',
        }}
      >
        <h1 style={{ color: '#d32f2f' }}>Custom Error Fallback</h1>
        <p>This is a custom error message</p>
        <button
          onClick={() => window.location.reload()}
          style={{
            padding: '10px 20px',
            backgroundColor: '#2196F3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Reload Page
        </button>
      </div>
    ),
    onError: fn(),
  },
}

export const WithoutError: Story = {
  args: {
    children: <ThrowError shouldThrow={false} />,
  },
}
