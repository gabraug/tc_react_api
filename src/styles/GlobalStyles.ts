import { createGlobalStyle } from 'styled-components'
import { colors, typography } from './constants'

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: ${typography.fontFamily};
    line-height: 1.5;
    background-color: ${colors.background};
    color: ${colors.gray.text};
  }

  #root {
    min-height: 100vh;
    background-color: ${colors.background};
  }
`
