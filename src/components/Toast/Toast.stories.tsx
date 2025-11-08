import type { Meta, StoryObj } from '@storybook/react-vite'
import Toast from './Toast'
import { ToastProvider, useToast } from '../../contexts/Toast/ToastContext'
import Button from '../Button/Button'

function ToastDemo() {
  const { showToast } = useToast()

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <Button onClick={() => showToast('Success message', 'success')}>Show Success</Button>
        <Button onClick={() => showToast('Info message', 'info')}>Show Info</Button>
        <Button onClick={() => showToast('Error message', 'error')}>Show Error</Button>
        <Button onClick={() => showToast('Neutral message', 'neutral')}>Show Neutral</Button>
      </div>
      <Toast />
    </div>
  )
}

const meta = {
  title: 'Components/Toast',
  component: Toast,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ToastProvider>
        <Story />
      </ToastProvider>
    ),
  ],
} satisfies Meta<typeof Toast>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <ToastDemo />,
}

