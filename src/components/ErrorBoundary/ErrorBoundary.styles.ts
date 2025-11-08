import styled from 'styled-components'
import { colors, spacing, typography } from '../../styles/constants'

export const ErrorBoundaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: clamp(${spacing.lg}, 3vw, ${spacing.xl});
  min-height: 100vh;
  text-align: center;
  gap: clamp(${spacing.md}, 2vw, ${spacing.lg});
  width: 100%;
  background-color: ${colors.background};
`

export const ErrorTitle = styled.div`
  margin-bottom: ${spacing.sm};
`

export const ErrorDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${spacing.xs};
  max-width: 90%;
  margin: ${spacing.md} 0;
  padding: ${spacing.md};
  background-color: ${colors.surface};
  border-radius: 8px;
  border: 1px solid ${colors.error};
  overflow-x: auto;
`

export const ErrorCode = styled.pre`
  font-family: 'Courier New', monospace;
  font-size: ${typography.sizes.xs};
  line-height: 1.5;
  white-space: pre-wrap;
  word-wrap: break-word;
  text-align: left;
  margin: 0;
  color: ${colors.gray.textDark};
  width: 100%;
`
