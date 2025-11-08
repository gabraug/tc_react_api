import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import MovieCardSkeleton from './MovieCardSkeleton'

describe('MovieCardSkeleton', () => {
  it('should render a single skeleton by default', () => {
    const { container } = render(<MovieCardSkeleton />)
    const skeletons = container.querySelectorAll('[data-testid="skeleton-card"]')
    expect(skeletons).toHaveLength(1)
  })

  it('should render multiple skeletons when count is provided', () => {
    const { container } = render(<MovieCardSkeleton count={5} />)
    const skeletons = container.querySelectorAll('[data-testid="skeleton-card"]')
    expect(skeletons).toHaveLength(5)
  })
})
