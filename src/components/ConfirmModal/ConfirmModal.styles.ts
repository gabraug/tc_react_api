import styled from 'styled-components'
import { colors, spacing, dimensions, typography } from '../../styles/constants'

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: ${spacing.md};
`

export const ModalContent = styled.div`
  background: ${colors.surface};
  border-radius: ${dimensions.card.borderRadius};
  max-width: 450px;
  width: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  border: 1px solid ${colors.gray.medium};
`

export const ModalHeader = styled.div`
  padding: ${spacing.md};
  border-bottom: 1px solid ${colors.gray.medium};
`

export const ModalTitle = styled.h2`
  font-size: ${typography.sizes.md};
  font-weight: ${typography.weights.bold};
  margin: 0;
  color: ${colors.white};
`

export const ModalBody = styled.div`
  padding: ${spacing.md};
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm};
`

export const ModalMessage = styled.p`
  font-size: ${typography.sizes.sm};
  color: ${colors.gray.text};
  margin: 0;
  line-height: 1.5;
`

export const ModalActions = styled.div`
  padding: ${spacing.md};
  border-top: 1px solid ${colors.gray.medium};
  display: flex;
  gap: ${spacing.sm};
  justify-content: flex-end;
`
