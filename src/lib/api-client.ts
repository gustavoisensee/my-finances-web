import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://my-finances-api-v4.onrender.com'

class ApiClient {
  private client: AxiosInstance

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    // Request interceptor to add auth token
    this.client.interceptors.request.use(
      async (config) => {
        // Get Clerk session token
        if (typeof window !== 'undefined') {
          const { getToken } = await import('@clerk/clerk-react')
          try {
            // This will be called through useAuth hook in components
            // For now, we'll handle it in the service layer
            const token = sessionStorage.getItem('clerk_token')
            if (token) {
              config.headers.Authorization = `Bearer ${token}`
            }
          } catch (error) {
            console.error('Error getting auth token:', error)
          }
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    // Response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // Handle unauthorized - redirect to login
          if (typeof window !== 'undefined') {
            window.location.href = '/login'
          }
        }
        return Promise.reject(error)
      }
    )
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.get<T>(url, config)
    return response.data
  }

  async post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.post<T>(url, data, config)
    return response.data
  }

  async put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.put<T>(url, data, config)
    return response.data
  }

  async patch<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.patch<T>(url, data, config)
    return response.data
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.delete<T>(url, config)
    return response.data
  }

  setAuthToken(token: string | null) {
    if (token) {
      sessionStorage.setItem('clerk_token', token)
      this.client.defaults.headers.common['Authorization'] = `Bearer ${token}`
    } else {
      sessionStorage.removeItem('clerk_token')
      delete this.client.defaults.headers.common['Authorization']
    }
  }
}

export const apiClient = new ApiClient()


