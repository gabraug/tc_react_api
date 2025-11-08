import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import ErrorState from './ErrorState'

const meta = {
  title: 'Components/ErrorState',
  component: ErrorState,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onRetry: {
      action: 'retry clicked',
    },
  },
} satisfies Meta<typeof ErrorState>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    message: 'Something went wrong',
  },
}

export const WithRetry: Story = {
  args: {
    message: 'Failed to load movies. Please try again.',
    onRetry: fn(),
  },
}

export const WithCustomRetryText: Story = {
  args: {
    message: 'Failed to load movies. Please try again.',
    onRetry: fn(),
    retryText: 'Try Again',
  },
}

