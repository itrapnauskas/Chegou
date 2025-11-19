import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/lib/api-client'
import type { DashboardMetrics } from '@/types'

export function useDashboard() {
  return useQuery({
    queryKey: ['dashboard'],
    queryFn: async () => {
      const response = await apiClient.get<{ success: boolean; metrics: DashboardMetrics }>('/api/dashboard')
      return response.metrics
    },
    refetchInterval: 60000, // Refetch every minute
  })
}
