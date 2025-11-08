import axios from 'axios'

const API_BASE_URL = 'https://api.themoviedb.org/3'
const API_TOKEN =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNThhYzQwNDg2ZDRjNDI3NGY4YTMzMDlhZTZiYTIzOSIsIm5iZiI6MTc2MjU1NzQ3Ny41MTUsInN1YiI6IjY5MGU3ZTI1MTJjYTQ3NmQ1YWRkMTQ4MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ohpzg5n2zU6Bysc95t8MerU72bmsfz1OlFMQq6bKyIY'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
    accept: 'application/json',
  },
})

export default api
