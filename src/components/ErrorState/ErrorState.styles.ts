import styled from 'styled-components'
import { spacing } from '../../styles/constants'

export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: clamp(${spacing.lg}, 3vw, ${spacing.xl});
  min-height: clamp(300px, 40vh, 500px);
  text-align: center;
  gap: clamp(${spacing.sm}, 2vw, ${spacing.md});
  width: 100%;
`
