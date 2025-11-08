import { useToast } from '../../contexts/Toast/ToastContext'
import Text from '../Text/Text'
import { ToastContainer, ToastItem, CloseButton } from './Toast.styles'

function Toast() {
  const { toasts, removeToast } = useToast()

  if (toasts.length === 0) return null

  return (
    <ToastContainer>
      {toasts.map(toast => (
        <ToastItem key={toast.id} $type={toast.type}>
          <Text as="span" size="sm" color="white">
            {toast.message}
          </Text>
          <CloseButton $type={toast.type} onClick={() => removeToast(toast.id)}>
            ×
          </CloseButton>
        </ToastItem>
      ))}
    </ToastContainer>
  )
}

export default Toast
