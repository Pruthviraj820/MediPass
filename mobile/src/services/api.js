import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

const api = axios.create({
  baseURL: 'https://api.medipass.com/api', // Replace with your actual API URL
  timeout: 10000
})

api.interceptors.request.use(async (config) => {
  try {
    const authData = await AsyncStorage.getItem('medipass-auth')
    if (authData) {
      const { token } = JSON.parse(authData)
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }
  } catch (error) {
    console.error('Error getting auth token:', error)
  }
  return config
})

export default api

