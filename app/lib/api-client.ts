// API client with auth
const API_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

export class ApiClient {
  private getHeaders(includeAuth: boolean = true): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    }

    if (includeAuth && typeof window !== 'undefined') {
      const token = localStorage.getItem('token')
      if (token) {
        headers['Authorization'] = `Bearer ${token}`
      }
    }

    return headers
  }

  async get<T = any>(endpoint: string): Promise<T> {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'GET',
      headers: this.getHeaders(),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Erro na requisição')
    }

    return response.json()
  }

  async post<T = any>(endpoint: string, data?: any, includeAuth: boolean = true): Promise<T> {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers: this.getHeaders(includeAuth),
      body: data ? JSON.stringify(data) : undefined,
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Erro na requisição')
    }

    return response.json()
  }

  async patch<T = any>(endpoint: string, data?: any): Promise<T> {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'PATCH',
      headers: this.getHeaders(),
      body: data ? JSON.stringify(data) : undefined,
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Erro na requisição')
    }

    return response.json()
  }

  async uploadFile(file: File): Promise<{ success: boolean; url: string }> {
    const formData = new FormData()
    formData.append('file', file)

    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null

    const response = await fetch(`${API_URL}/api/upload`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Erro no upload')
    }

    return response.json()
  }
}

export const apiClient = new ApiClient()
