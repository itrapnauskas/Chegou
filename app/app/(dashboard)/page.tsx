'use client'

import { useState } from 'react'
import { useCorrespondencias } from '@/lib/hooks/use-correspondencias'
import { CorrespondenciaCard } from '@/components/correspondencia/CorrespondenciaCard'
import { ModalFoto } from '@/components/correspondencia/ModalFoto'
import type { Correspondencia, StatusCorrespondencia } from '@/types'
import { Package, Loader2, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function HomePage() {
  const [statusFilter, setStatusFilter] = useState<StatusCorrespondencia | 'TODOS'>('TODOS')
  const [selectedCorresp, setSelectedCorresp] = useState<Correspondencia | null>(null)

  const { data: correspondencias = [], isLoading } = useCorrespondencias(
    statusFilter === 'TODOS' ? undefined : statusFilter
  )

  const stats = {
    total: correspondencias.length,
    pendentes: correspondencias.filter((c) => c.status === 'PENDENTE').length,
    retiradas: correspondencias.filter((c) => c.status === 'RETIRADO').length,
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Correspondências</h1>
        <p className="text-gray-600 mt-1">
          Gerencie as correspondências do seu condomínio
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats.total}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Package className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pendentes</p>
              <p className="text-2xl font-bold text-yellow-600 mt-1">{stats.pendentes}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Package className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Retiradas</p>
              <p className="text-2xl font-bold text-green-600 mt-1">{stats.retiradas}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Package className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center gap-2 mb-3">
          <Filter className="h-4 w-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">Filtrar por status:</span>
        </div>
        <div className="flex gap-2 flex-wrap">
          {(['TODOS', 'PENDENTE', 'RETIRADO'] as const).map((status) => (
            <Button
              key={status}
              variant={statusFilter === status ? 'default' : 'outline'}
              size="sm"
              onClick={() => setStatusFilter(status)}
            >
              {status === 'TODOS' ? 'Todos' : status === 'PENDENTE' ? 'Pendentes' : 'Retirados'}
            </Button>
          ))}
        </div>
      </div>

      {/* Correspondencias List */}
      <div>
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 text-gray-400 animate-spin" />
          </div>
        ) : correspondencias.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <Package className="h-12 w-12 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-600 font-medium">
              {statusFilter === 'TODOS'
                ? 'Nenhuma correspondência cadastrada'
                : `Nenhuma correspondência ${statusFilter.toLowerCase()}`}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              As correspondências aparecerão aqui
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {correspondencias.map((corresp) => (
              <CorrespondenciaCard
                key={corresp.id}
                correspondencia={corresp}
                onView={() => setSelectedCorresp(corresp)}
                onRetirar={() => setSelectedCorresp(corresp)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedCorresp && (
        <ModalFoto
          correspondencia={selectedCorresp}
          onClose={() => setSelectedCorresp(null)}
        />
      )}
    </div>
  )
}
