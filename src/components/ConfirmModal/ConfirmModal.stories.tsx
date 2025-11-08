import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { useState } from 'react'
import ConfirmModal from './ConfirmModal'

const meta = {
  title: 'Components/ConfirmModal',
  component: ConfirmModal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'danger'],
    },
    isOpen: {
      control: false,
    },
  },
} satisfies Meta<typeof ConfirmModal>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(true)
    return (
      <>
        <button onClick={() => setIsOpen(true)}>Open Modal</button>
        <ConfirmModal
          {...args}
          isOpen={isOpen}
          onConfirm={() => {
            args.onConfirm?.()
            setIsOpen(false)
          }}
          onCancel={() => {
            args.onCancel?.()
            setIsOpen(false)
          }}
        />
      </>
    )
  },
  args: {
    isOpen: true,
    title: 'Confirm Action',
    message: 'Are you sure you want to proceed?',
    onConfirm: fn(),
    onCancel: fn(),
  },
}

export const Danger: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(true)
    return (
      <>
        <button onClick={() => setIsOpen(true)}>Open Modal</button>
        <ConfirmModal
          {...args}
          isOpen={isOpen}
          onConfirm={() => {
            args.onConfirm?.()
            setIsOpen(false)
          }}
          onCancel={() => {
            args.onCancel?.()
            setIsOpen(false)
          }}
        />
      </>
    )
  },
  args: {
    isOpen: true,
    title: 'Delete Item',
    message: 'This action cannot be undone. Are you sure?',
    variant: 'danger',
    confirmText: 'Delete',
    onConfirm: fn(),
    onCancel: fn(),
  },
}

export const CustomTexts: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(true)
    return (
      <>
        <button onClick={() => setIsOpen(true)}>Open Modal</button>
        <ConfirmModal
          {...args}
          isOpen={isOpen}
          onConfirm={() => {
            args.onConfirm?.()
            setIsOpen(false)
          }}
          onCancel={() => {
            args.onCancel?.()
            setIsOpen(false)
          }}
        />
      </>
    )
  },
  args: {
    isOpen: true,
    title: 'Save Changes',
    message: 'Do you want to save your changes?',
    confirmText: 'Save',
    cancelText: 'Discard',
    onConfirm: fn(),
    onCancel: fn(),
  },
}

