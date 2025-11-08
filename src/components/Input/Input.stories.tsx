import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { useState } from 'react'
import Input from './Input'

const meta = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    showClearButton: {
      control: 'boolean',
    },
    showCharacterCount: {
      control: 'boolean',
    },
    maxLength: {
      control: 'number',
    },
    hasSearchButton: {
      control: 'boolean',
    },
  },
  args: {
    onChange: fn(),
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
}

export const WithValue: Story = {
  args: {
    placeholder: 'Enter text...',
    value: 'Sample text',
  },
}

export const WithClearButton: Story = {
  render: (args) => {
    const [value, setValue] = useState('Sample text')
    return (
      <Input
        {...args}
        value={value}
        onChange={(e) => {
          setValue(e.target.value)
          args.onChange?.(e)
        }}
        onClear={() => {
          setValue('')
        }}
        showClearButton
      />
    )
  },
  args: {
    placeholder: 'Enter text...',
  },
}

export const WithCharacterCount: Story = {
  render: (args) => {
    const [value, setValue] = useState('')
    return (
      <Input
        {...args}
        value={value}
        onChange={(e) => {
          setValue(e.target.value)
          args.onChange?.(e)
        }}
        maxLength={30}
        showCharacterCount
      />
    )
  },
  args: {
    placeholder: 'Enter text...',
  },
}

export const WithSearchButton: Story = {
  args: {
    placeholder: 'Search...',
    hasSearchButton: true,
  },
}

export const FullFeatured: Story = {
  render: (args) => {
    const [value, setValue] = useState('')
    return (
      <Input
        {...args}
        value={value}
        onChange={(e) => {
          setValue(e.target.value)
          args.onChange?.(e)
        }}
        onClear={() => {
          setValue('')
        }}
        maxLength={30}
        showClearButton
        showCharacterCount
        hasSearchButton
      />
    )
  },
  args: {
    placeholder: 'Search movies...',
  },
}

export const Disabled: Story = {
  args: {
    placeholder: 'Disabled input',
    disabled: true,
  },
}

