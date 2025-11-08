import styled from 'styled-components'
import { colors, spacing, dimensions, typography, transitions } from '../../styles/constants'

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
  max-width: 500px;
  width: 100%;
  max-height: 80vh;
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
  overflow-y: auto;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm};
`

export const Option = styled.div`
  width: 100%;
`

export const OptionButton = styled.button<{ $selected: boolean }>`
  width: 100%;
  padding: ${spacing.sm};
  border: 1px solid ${({ $selected }) => ($selected ? colors.gray.dark : colors.gray.medium)};
  border-radius: ${dimensions.search.borderRadius};
  background: ${({ $selected }) => ($selected ? colors.gray.dark : colors.gray.medium)};
  color: ${({ $selected }) => ($selected ? colors.white : colors.gray.text)};
  font-size: ${typography.sizes.sm};
  font-family: ${typography.fontFamily};
  cursor: pointer;
  transition: all ${transitions.default};
  text-align: left;

  &:hover {
    background: ${({ $selected }) => ($selected ? colors.gray.darker : colors.gray.dark)};
    border-color: ${({ $selected }) => ($selected ? colors.gray.darker : colors.gray.dark)};
    color: ${colors.white};
  }
`

export const CreateListSection = styled.div`
  margin-top: ${spacing.sm};
  padding-top: ${spacing.sm};
  border-top: 1px solid ${colors.gray.medium};
  display: flex;
  gap: ${spacing.sm};
  align-items: center;
`

export const CreateListInputWrapper = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
`

export const CreateListInput = styled.input<{ $hasClearButton: boolean }>`
  flex: 1;
  padding: ${spacing.sm};
  padding-right: 4rem;
  padding-left: ${({ $hasClearButton }) => ($hasClearButton ? '2.5rem' : spacing.sm)};
  border: 1px solid ${colors.gray.medium};
  border-radius: ${dimensions.search.borderRadius};
  font-size: ${typography.sizes.sm};
  font-family: ${typography.fontFamily};
  background: ${colors.gray.light};
  color: ${colors.white};

  &:focus {
    outline: none;
    border-color: ${colors.gray.dark};
    background: ${colors.surfaceLight};
  }

  &::placeholder {
    color: ${colors.gray.textDark};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

export const ClearInputButton = styled.button`
  position: absolute;
  left: 0.5rem;
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 50%;
  background: ${colors.gray.medium};
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  transition: all ${transitions.default};

  &:hover {
    background: ${colors.gray.dark};
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }
`

export const ClearInputIcon = styled.span`
  position: relative;
  width: 0.6rem;
  height: 0.6rem;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0.1rem;
    height: 0.6rem;
    background: ${colors.white};
    border-radius: 2px;
  }

  &::before {
    transform: translate(-50%, -50%) rotate(45deg);
  }

  &::after {
    transform: translate(-50%, -50%) rotate(-45deg);
  }
`

export const InputCharacterCount = styled.span<{ $warning: boolean }>`
  position: absolute;
  right: 0.5rem;
  font-size: ${typography.sizes.xs};
  color: ${({ $warning }) => ($warning ? colors.error : colors.gray.textDark)};
  pointer-events: none;
  font-weight: ${({ $warning }) =>
    $warning ? typography.weights.bold : typography.weights.normal};
  transition: color ${transitions.default};
`

export const CreateListButton = styled.button`
  padding: ${spacing.sm} ${spacing.md};
  border: 1px solid ${colors.gray.medium};
  border-radius: ${dimensions.search.borderRadius};
  background: ${colors.gray.medium};
  color: ${colors.white};
  font-size: ${typography.sizes.sm};
  font-family: ${typography.fontFamily};
  cursor: pointer;
  transition: all ${transitions.default};
  white-space: nowrap;

  &:hover:not(:disabled) {
    background: ${colors.gray.dark};
    border-color: ${colors.gray.dark};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

export const Actions = styled.div`
  padding: ${spacing.md};
  border-top: 1px solid ${colors.gray.medium};
  display: flex;
  gap: ${spacing.sm};
  justify-content: flex-end;
`

export const CancelButton = styled.button`
  padding: ${spacing.sm} ${spacing.md};
  border: 1px solid ${colors.gray.medium};
  border-radius: ${dimensions.search.borderRadius};
  background: ${colors.gray.medium};
  color: ${colors.white};
  font-size: ${typography.sizes.sm};
  font-family: ${typography.fontFamily};
  cursor: pointer;
  transition: all ${transitions.default};

  &:hover {
    background: ${colors.gray.dark};
    border-color: ${colors.gray.dark};
  }
`

export const ConfirmButton = styled.button`
  padding: ${spacing.sm} ${spacing.md};
  border: none;
  border-radius: ${dimensions.search.borderRadius};
  background: ${colors.gray.dark};
  color: ${colors.white};
  font-size: ${typography.sizes.sm};
  font-family: ${typography.fontFamily};
  cursor: pointer;
  transition: background ${transitions.default};

  &:hover:not(:disabled) {
    background: ${colors.gray.darker};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`
