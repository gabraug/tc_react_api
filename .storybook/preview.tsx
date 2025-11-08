import React from 'react'
import type { Preview } from '@storybook/react-vite'
import { BrowserRouter } from 'react-router-dom'
import { FavoritesProvider } from '../src/contexts/Favorites/FavoritesContext'
import { ToastProvider } from '../src/contexts/Toast/ToastContext'
import { GlobalStyles } from '../src/styles/GlobalStyles'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      test: 'todo',
    },
  },
  decorators: [
    (Story) => (
      <>
        <GlobalStyles />
        <BrowserRouter>
          <ToastProvider>
            <FavoritesProvider>
              <Story />
            </FavoritesProvider>
          </ToastProvider>
        </BrowserRouter>
      </>
    ),
  ],
}

export default preview
