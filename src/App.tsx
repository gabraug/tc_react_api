import { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes'
import Navigation from './components/Navigation'
import api from './services/api'

function App() {
  useEffect(() => {
    const callApi = async () => {
      try {
        const response = await api.get('/authentication')
        console.log('API Response:', response.data)
      } catch (error) {
        console.error('API Error:', error)
      }
    }

    callApi()
  }, [])

  return (
    <BrowserRouter>
      <Navigation />
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App

