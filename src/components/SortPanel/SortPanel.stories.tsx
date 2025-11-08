import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import SortPanel from './SortPanel'

const mockOptions = [
  { value: 'titleAsc', label: 'A-Z' },
  { value: 'titleDesc', label: 'Z-A' },
  { value: 'ratingDesc', label: 'Nota: Maior' },
  { value: 'ratingAsc', label: 'Nota: Menor' },
  { value: 'favoritesFirst', label: 'Favoritos primeiro' },
]

const meta = {
  title: 'Components/SortPanel',
  component: SortPanel,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SortPanel>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'Ordenar por',
    options: mockOptions,
    activeValue: 'titleAsc',
    onSelect: fn(),
  },
}

export const WithDifferentActive: Story = {
  args: {
    title: 'Ordenar por',
    options: mockOptions,
    activeValue: 'ratingDesc',
    onSelect: fn(),
  },
}

export const Collapsed: Story = {
  render: (args) => {
    return <SortPanel {...args} />
  },
  args: {
    title: 'Ordenar por',
    options: mockOptions,
    activeValue: 'titleAsc',
    onSelect: fn(),
  },
}

export const CustomOptions: Story = {
  args: {
    title: 'Filter by',
    options: [
      { value: 'all', label: 'All' },
      { value: 'favorites', label: 'Favorites' },
      { value: 'recent', label: 'Recent' },
    ],
    activeValue: 'all',
    onSelect: fn(),
  },
}

