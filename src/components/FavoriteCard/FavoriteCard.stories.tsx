import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import FavoriteCard from './FavoriteCard'
import type { MovieDetails } from '../../types/movie'

const mockMovie: MovieDetails = {
  id: 1,
  title: 'The Matrix',
  backdrop_path: '/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg',
  vote_average: 8.7,
  overview: 'A computer hacker learns about the true nature of reality.',
  release_date: '1999-03-31',
  genres: [],
}

const mockMovieNoBackdrop: MovieDetails = {
  id: 2,
  title: 'Inception',
  backdrop_path: null,
  vote_average: 8.8,
  overview: 'A thief who steals corporate secrets through dream-sharing technology.',
  release_date: '2010-07-16',
  genres: [],
}

const meta = {
  title: 'Components/FavoriteCard',
  component: FavoriteCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onDelete: {
      action: 'delete clicked',
    },
  },
} satisfies Meta<typeof FavoriteCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    movie: mockMovie,
    onDelete: fn(),
  },
}

export const WithoutBackdrop: Story = {
  args: {
    movie: mockMovieNoBackdrop,
    onDelete: fn(),
  },
}

export const LongTitle: Story = {
  args: {
    movie: {
      ...mockMovie,
      title: 'The Lord of the Rings: The Fellowship of the Ring',
    },
    onDelete: fn(),
  },
}

