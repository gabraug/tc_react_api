import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_TMDB_BASE_URL
const API_TOKEN = import.meta.env.VITE_TMDB_TOKEN

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
    accept: 'application/json',
  },
})

export default api
