import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/lib/api-client'
import type { Correspondencia, StatusCorrespondencia } from '@/types'
import { toast } from 'react-hot-toast'

export function useCorrespondencias(status?: StatusCorrespondencia) {
  return useQuery({
    queryKey: ['correspondencias', status],
    queryFn: async () => {
      const endpoint = status ? `/api/correspondencias?status=${status}` : '/api/correspondencias'
      const response = await apiClient.get<{ success: boolean; correspondencias: Correspondencia[] }>(endpoint)
      return response.correspondencias
    },
  })
}

export function useCriarCorrespondencia() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: { moradorId: string; fotoUrl: string }) => {
      const response = await apiClient.post<{ success: boolean; correspondencia: Correspondencia }>(
        '/api/correspondencias',
        data
      )
      return response.correspondencia
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['correspondencias'] })
      toast.success('Correspondência registrada e morador notificado!')
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Erro ao registrar correspondência')
    },
  })
}

export function useRetirarCorrespondencia() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await apiClient.patch<{ success: boolean; correspondencia: Correspondencia }>(
        `/api/correspondencias/${id}/retirar`
      )
      return response.correspondencia
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['correspondencias'] })
      toast.success('Marcada como retirada!')
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Erro ao marcar como retirada')
    },
  })
}

export function useUploadFoto() {
  return useMutation({
    mutationFn: async (file: File) => {
      const response = await apiClient.uploadFile(file)
      return response.url
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Erro no upload da foto')
    },
  })
}
