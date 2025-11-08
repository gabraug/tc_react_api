import { Suspense, useCallback } from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes'
import Header from './components/Header/Header'
import { FavoritesProvider } from './contexts/Favorites/FavoritesContext'
import { ToastProvider, useToast } from './contexts/Toast/ToastContext'
import Toast from './components/Toast/Toast'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner'
import { GlobalStyles } from './styles/GlobalStyles'
import type { StorageError } from './utils/storage'
import { texts } from './constants/texts'

function AppContent() {
  const { showToast } = useToast()

  const handleStorageError = useCallback(
    (error: StorageError) => {
      let message: string = texts.errors.storage.unknown
      let type: 'error' | 'info' = 'error'

      switch (error.type) {
        case 'quota_exceeded':
          if (error.message.includes('recovery')) {
            message = texts.errors.storage.quotaExceeded
            type = 'info'
          } else {
            message = texts.errors.storage.quotaExceededCritical
            type = 'error'
          }
          break
        case 'read_only':
          message = texts.errors.storage.readOnly
          break
        case 'unknown':
          message = texts.errors.storage.unknown
          break
      }

      showToast(message, type)
    },
    [showToast]
  )

  return (
    <FavoritesProvider onStorageError={handleStorageError}>
      <Header />
      <Suspense fallback={<LoadingSpinner />}>
        <AppRoutes />
      </Suspense>
      <Toast />
    </FavoritesProvider>
  )
}

function App() {
  return (
    <>
      <GlobalStyles />
      <ErrorBoundary>
        <BrowserRouter>
          <ToastProvider>
            <AppContent />
          </ToastProvider>
        </BrowserRouter>
      </ErrorBoundary>
    </>
  )
}

export default App
