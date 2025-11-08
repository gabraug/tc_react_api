import styled from 'styled-components'
import { colors, spacing, dimensions, typography, transitions } from '../../styles/constants'

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: ${spacing.md};

  @media (max-width: 768px) {
    padding: ${spacing.sm};
  }
`

export const ModalContent = styled.div`
  background: ${colors.gray.light};
  border-radius: ${dimensions.card.borderRadius};
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);

  @media (max-width: 768px) {
    max-width: 100%;
  }
`

export const ModalHeader = styled.div`
  padding: ${spacing.lg};
  border-bottom: 1px solid ${colors.gray.medium};

  @media (max-width: 768px) {
    padding: ${spacing.md};
  }
`

export const ModalTitle = styled.h2`
  font-size: ${typography.sizes.md};
  font-weight: ${typography.weights.bold};
  color: ${colors.white};
  margin: 0;
  line-height: 1.4;

  @media (max-width: 768px) {
    font-size: ${typography.sizes.sm};
  }
`

export const ModalBody = styled.div`
  padding: ${spacing.lg};

  @media (max-width: 768px) {
    padding: ${spacing.md};
  }
`

export const Option = styled.div`
  margin-bottom: ${spacing.xs};
`

export const OptionButton = styled.button<{ $selected: boolean }>`
  width: 100%;
  padding: ${spacing.sm} ${spacing.md};
  background: ${({ $selected }) => ($selected ? colors.gray.dark : colors.gray.medium)};
  color: ${colors.white};
  border: 1px solid ${({ $selected }) => ($selected ? colors.gray.dark : colors.gray.medium)};
  border-radius: ${dimensions.search.borderRadius};
  font-size: ${typography.sizes.sm};
  font-family: ${typography.fontFamily};
  cursor: pointer;
  transition: all ${transitions.default};
  text-align: left;

  &:hover {
    background: ${colors.gray.dark};
    border-color: ${colors.gray.dark};
  }

  @media (max-width: 768px) {
    padding: ${spacing.xs} ${spacing.sm};
    font-size: ${typography.sizes.xs};
  }
`

export const Actions = styled.div`
  padding: ${spacing.lg};
  border-top: 1px solid ${colors.gray.medium};
  display: flex;
  gap: ${spacing.sm};
  justify-content: flex-end;

  @media (max-width: 768px) {
    padding: ${spacing.md};
    flex-direction: column-reverse;

    button {
      width: 100%;
    }
  }
`
