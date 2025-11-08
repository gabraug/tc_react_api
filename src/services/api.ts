import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_TMDB_BASE_URL
const API_TOKEN = import.meta.env.VITE_TMDB_TOKEN

if (!API_BASE_URL) {
  throw new Error(
    'Missing required environment variable: VITE_TMDB_BASE_URL. Please configure it in your .env file.'
  )
}

if (!API_TOKEN) {
  throw new Error(
    'Missing required environment variable: VITE_TMDB_TOKEN. Please configure it in your .env file.'
  )
}

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
    accept: 'application/json',
  },
})

export default api
