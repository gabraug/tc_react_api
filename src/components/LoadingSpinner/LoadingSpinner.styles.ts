import styled from 'styled-components'
import { colors, spacing } from '../../styles/constants'

export const SpinnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: clamp(${spacing.lg}, 3vw, ${spacing.xl});
  min-height: clamp(300px, 40vh, 500px);
  gap: clamp(${spacing.sm}, 2vw, ${spacing.md});
  width: 100%;
`

const spinnerSizes = {
  sm: {
    width: 'clamp(30px, 4vw, 40px)',
    height: 'clamp(30px, 4vw, 40px)',
    border: 'clamp(2px, 0.3vw, 3px)',
  },
  md: {
    width: 'clamp(40px, 5vw, 60px)',
    height: 'clamp(40px, 5vw, 60px)',
    border: 'clamp(3px, 0.4vw, 5px)',
  },
  lg: {
    width: 'clamp(50px, 6vw, 70px)',
    height: 'clamp(50px, 6vw, 70px)',
    border: 'clamp(4px, 0.5vw, 6px)',
  },
}

export const Spinner = styled.div<{ $size: 'sm' | 'md' | 'lg' }>`
  width: ${({ $size }) => spinnerSizes[$size].width};
  height: ${({ $size }) => spinnerSizes[$size].height};
  border: ${({ $size }) => spinnerSizes[$size].border} solid ${colors.gray.medium};
  border-top: ${({ $size }) => spinnerSizes[$size].border} solid ${colors.white};
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`
