import type { Meta, StoryObj } from '@storybook/react-vite'
import GenreCard from './GenreCard'

const meta = {
  title: 'Components/GenreCard',
  component: GenreCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof GenreCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    name: 'Action',
  },
}

export const Drama: Story = {
  args: {
    name: 'Drama',
  },
}

export const Comedy: Story = {
  args: {
    name: 'Comedy',
  },
}

export const Horror: Story = {
  args: {
    name: 'Horror',
  },
}

export const LongName: Story = {
  args: {
    name: 'Science Fiction',
  },
}

