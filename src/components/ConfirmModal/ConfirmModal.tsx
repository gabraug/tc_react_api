import Button from '../Button/Button'
import Text from '../Text/Text'
import { texts } from '../../constants/texts'
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalActions,
} from './ConfirmModal.styles'

interface ConfirmModalProps {
  isOpen: boolean
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  variant?: 'danger' | 'primary'
  onConfirm: () => void
  onCancel: () => void
}

function ConfirmModal({
  isOpen,
  title,
  message,
  confirmText = texts.buttons.confirm,
  cancelText = texts.buttons.cancel,
  variant = 'primary',
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  if (!isOpen) return null

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onCancel()
    }
  }

  return (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <ModalHeader>
          <Text as="h2" size="md" color="white" weight="bold">
            {title}
          </Text>
        </ModalHeader>
        <ModalBody>
          <Text size="sm" color="text">
            {message}
          </Text>
        </ModalBody>
        <ModalActions>
          <Button variant="secondary" size="sm" onClick={onCancel}>
            {cancelText}
          </Button>
          <Button variant={variant} size="sm" onClick={onConfirm}>
            {confirmText}
          </Button>
        </ModalActions>
      </ModalContent>
    </ModalOverlay>
  )
}

export default ConfirmModal
