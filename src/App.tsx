import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes'
import Header from './components/Header/Header'
import { FavoritesProvider } from './contexts/Favorites/FavoritesContext'
import { ToastProvider } from './contexts/Toast/ToastContext'
import Toast from './components/Toast/Toast'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'
import { GlobalStyles } from './styles/GlobalStyles'

function App() {
  return (
    <>
      <GlobalStyles />
      <ErrorBoundary>
        <BrowserRouter>
          <ToastProvider>
            <FavoritesProvider>
              <Header />
              <AppRoutes />
              <Toast />
            </FavoritesProvider>
          </ToastProvider>
        </BrowserRouter>
      </ErrorBoundary>
    </>
  )
}

export default App
