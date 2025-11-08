export const colors = {
  white: '#ffffff',
  black: '#000000',
  gray: {
    light: '#1a1a1a',
    medium: '#2d2d2d',
    dark: '#4a4a4a',
    darker: '#6b6b6b',
    text: '#e0e0e0',
    textLight: '#b0b0b0',
    textDark: '#808080',
    icon: '#666666',
  },
  background: '#0a0a0a',
  surface: '#121212',
  surfaceLight: '#1e1e1e',
  error: '#d32f2f',
  errorDark: '#b71c1c',
  success: '#4caf50',
  info: '#2196F3',
  favorite: {
    default: '#ff6b6b',
    hover: '#ff5252',
  },
  star: '#FFD700',
  highlight: {
    background: '#ffffff',
    text: '#000000',
  },
  overlay: {
    light: 'rgba(0, 0, 0, 0.5)',
    medium: 'rgba(0, 0, 0, 0.7)',
    dark: 'rgba(0, 0, 0, 0.8)',
    subtle: 'rgba(0, 0, 0, 0.1)',
  },
  shadow: {
    light: 'rgba(0, 0, 0, 0.1)',
    medium: 'rgba(0, 0, 0, 0.2)',
    dark: 'rgba(0, 0, 0, 0.3)',
    darker: 'rgba(0, 0, 0, 0.5)',
  },
  focus: {
    light: 'rgba(255, 255, 255, 0.1)',
    medium: 'rgba(255, 255, 255, 0.2)',
  },
  delete: {
    default: 'rgba(211, 47, 47, 0.8)',
    hover: 'rgba(211, 47, 47, 1)',
  },
}

export const breakpoints = {
  mobile: '320px',
  mobileLarge: '480px',
  tablet: '768px',
  tabletLarge: '1024px',
  desktop: '1280px',
  desktopLarge: '1400px',
}

export const spacing = {
  xs: 'clamp(0.25rem, 0.5vw, 0.5rem)',
  sm: 'clamp(0.5rem, 1vw, 1rem)',
  md: 'clamp(0.75rem, 1.5vw, 1.5rem)',
  lg: 'clamp(1rem, 2vw, 2rem)',
  xl: 'clamp(1.5rem, 3vw, 3rem)',
}

export const dimensions = {
  header: {
    height: 'clamp(60px, 8vw, 80px)',
    padding: spacing.sm,
    paddingHorizontal: spacing.md,
    zIndex: 1000,
  },
  search: {
    maxWidth: 'clamp(200px, 50vw, 500px)',
    borderRadius: 'clamp(16px, 2vw, 24px)',
    padding: 'clamp(0.5rem, 1vw, 0.75rem)',
  },
  card: {
    minWidth: 'clamp(140px, 20vw, 180px)',
    borderRadius: 'clamp(6px, 0.8vw, 8px)',
    posterAspectRatio: '150%',
  },
  grid: {
    maxWidth: 'clamp(100%, 95vw, 1400px)',
    gap: spacing.md,
  },
}

export const typography = {
  fontFamily: 'Arial',
  sizes: {
    xs: 'clamp(0.75rem, 0.8rem + 0.2vw, 0.875rem)',
    sm: 'clamp(0.875rem, 0.9rem + 0.3vw, 1rem)',
    md: 'clamp(1.125rem, 1.25rem + 0.5vw, 1.5rem)',
    lg: 'clamp(1.5rem, 1.75rem + 0.75vw, 2rem)',
  },
  weights: {
    normal: 400,
    semibold: 600,
    bold: 700,
  },
}

export const transitions = {
  default: '0.2s',
}

export const transforms = {
  cardHover: 'translateY(-4px)',
}
