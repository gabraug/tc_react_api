import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import EmptyState from './EmptyState'
import Film from '../../icons/Film'
import { colors } from '../../styles/constants'

const meta = {
  title: 'Components/EmptyState',
  component: EmptyState,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onAction: {
      action: 'clicked',
    },
  },
} satisfies Meta<typeof EmptyState>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'No items found',
  },
}

export const WithDescription: Story = {
  args: {
    title: 'No favorites yet',
    description: 'Start adding movies to your favorites list!',
  },
}

export const WithAction: Story = {
  args: {
    title: 'No favorites yet',
    description: 'Start adding movies to your favorites list!',
    actionLabel: 'Explore Movies',
    onAction: fn(),
  },
}

export const WithIcon: Story = {
  args: {
    title: 'No movies found',
    description: 'Try searching for a different term',
    actionLabel: 'Search Again',
    onAction: fn(),
    icon: <Film size={64} color={colors.gray.icon} />,
  },
}

