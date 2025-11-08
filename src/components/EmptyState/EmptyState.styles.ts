import styled from 'styled-components'
import { spacing } from '../../styles/constants'

export const EmptyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: clamp(${spacing.lg}, 3vw, ${spacing.xl});
  text-align: center;
  min-height: clamp(300px, 40vh, 500px);
  width: 100%;
  gap: clamp(${spacing.sm}, 2vw, ${spacing.md});
`
