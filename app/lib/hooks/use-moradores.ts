import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/lib/api-client'
import type { Morador } from '@/types'
import { toast } from 'react-hot-toast'

export function useMoradores() {
  return useQuery({
    queryKey: ['moradores'],
    queryFn: async () => {
      const response = await apiClient.get<{ success: boolean; moradores: Morador[] }>('/api/moradores')
      return response.moradores
    },
  })
}

export function useBuscarMoradores(query: string) {
  return useQuery({
    queryKey: ['moradores', 'busca', query],
    queryFn: async () => {
      if (!query || query.length < 2) return []
      const response = await apiClient.get<{ success: boolean; moradores: Morador[] }>(
        `/api/moradores/busca?q=${encodeURIComponent(query)}`
      )
      return response.moradores
    },
    enabled: query.length >= 2,
  })
}

export function useCriarMorador() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: Omit<Morador, 'id' | 'condominioId' | 'criadoEm' | 'atualizadoEm' | 'ativo'>) => {
      const response = await apiClient.post<{ success: boolean; morador: Morador }>('/api/moradores', data)
      return response.morador
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['moradores'] })
      toast.success('Morador cadastrado com sucesso!')
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Erro ao cadastrar morador')
    },
  })
}
