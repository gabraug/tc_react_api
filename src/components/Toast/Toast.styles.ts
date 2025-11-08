import styled, { keyframes } from 'styled-components'
import { colors, spacing, dimensions, typography, transitions } from '../../styles/constants'
import type { ToastType } from '../../contexts/Toast/ToastContext'

const slideIn = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`

export const ToastContainer = styled.div`
  position: fixed;
  top: calc(${dimensions.header.height} + ${spacing.md});
  right: ${spacing.md};
  z-index: 1001;
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm};
  max-width: 400px;
`

export const ToastItem = styled.div<{ $type: ToastType }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${spacing.sm};
  padding: ${spacing.sm} ${spacing.md};
  background: ${({ $type }) => {
    switch ($type) {
      case 'success':
        return colors.success
      case 'error':
        return colors.error
      case 'info':
        return colors.info
      case 'neutral':
      default:
        return colors.white
    }
  }};
  color: ${({ $type }) => ($type === 'neutral' ? colors.gray.dark : colors.white)};
  border: ${({ $type }) => ($type === 'neutral' ? `1px solid ${colors.gray.medium}` : 'none')};
  border-radius: ${dimensions.search.borderRadius};
  box-shadow: 0 4px 6px ${colors.shadow.light};
  animation: ${slideIn} 0.3s ease-out;
  font-size: ${typography.sizes.sm};
  font-family: ${typography.fontFamily};
  min-width: 250px;
`

export const CloseButton = styled.button<{ $type: ToastType }>`
  background: transparent;
  border: none;
  color: ${({ $type }) => ($type === 'neutral' ? colors.gray.dark : colors.white)};
  font-size: ${typography.sizes.md};
  cursor: pointer;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background ${transitions.default};
  flex-shrink: 0;

  &:hover {
    background: ${({ $type }) =>
      $type === 'neutral' ? colors.overlay.subtle : colors.focus.medium};
  }
`
