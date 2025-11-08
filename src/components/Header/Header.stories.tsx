import type { Meta, StoryObj } from '@storybook/react-vite'
import Header from './Header'

const meta = {
  title: 'Components/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const OnHomePage: Story = {
  parameters: {
    nextjs: {
      router: {
        pathname: '/',
      },
    },
  },
}

export const OnFavoritesPage: Story = {
  parameters: {
    nextjs: {
      router: {
        pathname: '/favorites',
      },
    },
  },
}

