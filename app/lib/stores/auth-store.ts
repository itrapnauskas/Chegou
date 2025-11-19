import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Usuario, LoginResponse } from '@/types'
import { apiClient } from '@/lib/api-client'

interface AuthState {
  user: Usuario | null
  token: string | null
  isAuthenticated: boolean
  login: (email: string, senha: string) => Promise<void>
  logout: () => void
  checkAuth: () => Promise<void>
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: async (email: string, senha: string) => {
        const response = await apiClient.post<LoginResponse>('/api/auth/login', {
          email,
          senha,
        }, false)

        if (response.success && response.token) {
          // Store token
          if (typeof window !== 'undefined') {
            localStorage.setItem('token', response.token)
          }

          set({
            user: response.usuario as unknown as Usuario,
            token: response.token,
            isAuthenticated: true,
          })
        } else {
          throw new Error('Login falhou')
        }
      },

      logout: () => {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('token')
        }

        set({
          user: null,
          token: null,
          isAuthenticated: false,
        })
      },

      checkAuth: async () => {
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null

        if (!token) {
          set({ user: null, token: null, isAuthenticated: false })
          return
        }

        try {
          const response = await apiClient.get<{ success: boolean; usuario: Usuario }>('/api/auth/me')

          if (response.success) {
            set({
              user: response.usuario,
              token,
              isAuthenticated: true,
            })
          } else {
            set({ user: null, token: null, isAuthenticated: false })
          }
        } catch (error) {
          set({ user: null, token: null, isAuthenticated: false })
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)
