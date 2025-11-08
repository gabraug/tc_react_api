import { memo, type ReactNode } from 'react'
import Button from '../Button/Button'
import Text from '../Text/Text'
import { EmptyContainer } from './EmptyState.styles'

interface EmptyStateProps {
  title: string
  description?: string
  actionLabel?: string
  onAction?: () => void
  icon?: ReactNode
}

const EmptyState = memo(function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
  icon,
}: EmptyStateProps) {
  return (
    <EmptyContainer>
      {icon}
      <Text size="md" color="text" align="center">
        {title}
      </Text>
      {description && (
        <Text size="sm" color="textLight" align="center">
          {description}
        </Text>
      )}
      {actionLabel && onAction && (
        <Button variant="primary" size="md" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </EmptyContainer>
  )
})

export default EmptyState
