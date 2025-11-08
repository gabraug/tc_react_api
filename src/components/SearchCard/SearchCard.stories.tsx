import type { Meta, StoryObj } from '@storybook/react-vite'
import SearchCard from './SearchCard'
import type { Movie } from '../../types/movie'

const mockMovie: Movie = {
  id: 1,
  title: 'The Matrix',
  poster_path: '/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg',
  vote_average: 8.7,
  overview: 'A computer hacker learns about the true nature of reality.',
}

const mockMovieNoPoster: Movie = {
  id: 2,
  title: 'Inception',
  poster_path: null,
  vote_average: 8.8,
  overview: 'A thief who steals corporate secrets through dream-sharing technology.',
}

const meta = {
  title: 'Components/SearchCard',
  component: SearchCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SearchCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    movie: mockMovie,
    searchTerm: '',
  },
}

export const WithSearchTerm: Story = {
  args: {
    movie: mockMovie,
    searchTerm: 'Matrix',
  },
}

export const WithoutPoster: Story = {
  args: {
    movie: mockMovieNoPoster,
    searchTerm: '',
  },
}

export const PartialMatch: Story = {
  args: {
    movie: mockMovie,
    searchTerm: 'The',
  },
}
