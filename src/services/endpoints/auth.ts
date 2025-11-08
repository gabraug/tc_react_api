import api from '../api'

export const checkAuthentication = async () => {
  const response = await api.get('/authentication')
  return response.data
}
