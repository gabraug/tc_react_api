import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-docs',
    '@storybook/addon-onboarding',
    '@storybook/addon-a11y',
    '@storybook/addon-vitest',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  viteFinal: async config => {
    if (config.build) {
      config.build.chunkSizeWarningLimit = 2500
      config.build.rollupOptions = {
        ...config.build.rollupOptions,
        output: {
          ...config.build.rollupOptions?.output,
          manualChunks: id => {
            if (
              id.includes('node_modules/react') ||
              id.includes('node_modules/react-dom') ||
              id.includes('node_modules/react-router')
            ) {
              return 'react-vendor'
            }
            if (
              id.includes('node_modules/@storybook/react-vite') ||
              id.includes('node_modules/@storybook/core')
            ) {
              return 'storybook-core'
            }
            if (id.includes('node_modules/@storybook/addon')) {
              if (id.includes('addon-docs')) {
                return 'storybook-addon-docs'
              }
              if (id.includes('addon-a11y')) {
                return 'storybook-addon-a11y'
              }
              return 'storybook-addons'
            }
            if (id.includes('node_modules')) {
              return 'vendor'
            }
          },
        },
      }
    }
    return config
  },
}
export default config
