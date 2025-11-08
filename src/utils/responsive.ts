import { breakpoints } from '../styles/constants'

type BreakpointKey = keyof typeof breakpoints

export const media = {
  mobile: `@media (max-width: ${breakpoints.mobileLarge})`,
  mobileLarge: `@media (max-width: ${breakpoints.tablet})`,
  tablet: `@media (max-width: ${breakpoints.tabletLarge})`,
  tabletLarge: `@media (max-width: ${breakpoints.desktop})`,
  desktop: `@media (min-width: ${breakpoints.desktop})`,
  desktopLarge: `@media (min-width: ${breakpoints.desktopLarge})`,
}

export const mediaMin = (breakpoint: BreakpointKey) =>
  `@media (min-width: ${breakpoints[breakpoint]})`

export const mediaMax = (breakpoint: BreakpointKey) =>
  `@media (max-width: ${breakpoints[breakpoint]})`

export const mediaBetween = (min: BreakpointKey, max: BreakpointKey) =>
  `@media (min-width: ${breakpoints[min]}) and (max-width: ${breakpoints[max]})`
