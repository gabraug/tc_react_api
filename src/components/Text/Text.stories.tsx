import type { Meta, StoryObj } from '@storybook/react-vite'
import Text from './Text'

const meta = {
  title: 'Components/Text',
  component: Text,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    as: {
      control: 'select',
      options: ['p', 'span', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'strong', 'em'],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
    },
    weight: {
      control: 'select',
      options: ['normal', 'semibold', 'bold'],
    },
    color: {
      control: 'select',
      options: ['white', 'text', 'textLight', 'textDark', 'error'],
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right', 'justify'],
    },
  },
} satisfies Meta<typeof Text>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'This is a default text',
  },
}

export const Heading1: Story = {
  args: {
    as: 'h1',
    size: 'lg',
    weight: 'bold',
    children: 'Heading 1',
  },
}

export const Heading2: Story = {
  args: {
    as: 'h2',
    size: 'md',
    weight: 'bold',
    children: 'Heading 2',
  },
}

export const Small: Story = {
  args: {
    size: 'xs',
    children: 'Small text',
  },
}

export const Medium: Story = {
  args: {
    size: 'md',
    children: 'Medium text',
  },
}

export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Large text',
  },
}

export const Semibold: Story = {
  args: {
    weight: 'semibold',
    children: 'Semibold text',
  },
}

export const Bold: Story = {
  args: {
    weight: 'bold',
    children: 'Bold text',
  },
}

export const White: Story = {
  args: {
    color: 'white',
    children: 'White text',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
}

export const Error: Story = {
  args: {
    color: 'error',
    children: 'Error text',
  },
}

export const Centered: Story = {
  args: {
    align: 'center',
    children: 'Centered text',
  },
}
