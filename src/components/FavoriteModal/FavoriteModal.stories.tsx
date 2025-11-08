import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { useState } from 'react'
import FavoriteModal from './FavoriteModal'

const meta = {
  title: 'Components/FavoriteModal',
  component: FavoriteModal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: false,
    },
  },
} satisfies Meta<typeof FavoriteModal>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(true)
    return (
      <>
        <button onClick={() => setIsOpen(true)}>Open Modal</button>
        <FavoriteModal
          {...args}
          isOpen={isOpen}
          onClose={() => {
            args.onClose?.()
            setIsOpen(false)
          }}
          onConfirm={(listId) => {
            args.onConfirm?.(listId)
            setIsOpen(false)
          }}
        />
      </>
    )
  },
  args: {
    isOpen: true,
    movieId: 1,
    movieTitle: 'The Matrix',
    onClose: fn(),
    onConfirm: fn(),
  },
}

export const WithExistingLists: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(true)
    return (
      <>
        <button onClick={() => setIsOpen(true)}>Open Modal</button>
        <FavoriteModal
          {...args}
          isOpen={isOpen}
          onClose={() => {
            args.onClose?.()
            setIsOpen(false)
          }}
          onConfirm={(listId) => {
            args.onConfirm?.(listId)
            setIsOpen(false)
          }}
        />
      </>
    )
  },
  args: {
    isOpen: true,
    movieId: 1,
    movieTitle: 'Inception',
    onClose: fn(),
    onConfirm: fn(),
  },
}

