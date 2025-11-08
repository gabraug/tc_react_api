import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes'
import Header from './components/Header/Header'
import { FavoritesProvider } from './contexts/Favorites/FavoritesContext'
import { ToastProvider } from './contexts/Toast/ToastContext'
import Toast from './components/Toast/Toast'
import { GlobalStyles } from './styles/GlobalStyles'

function App() {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <ToastProvider>
          <FavoritesProvider>
            <Header />
            <AppRoutes />
            <Toast />
          </FavoritesProvider>
        </ToastProvider>
      </BrowserRouter>
    </>
  )
}

export default App
