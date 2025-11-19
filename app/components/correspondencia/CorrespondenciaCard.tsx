'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Eye, Check, Clock } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import type { Correspondencia } from '@/types'
import { cn } from '@/lib/utils'

interface CorrespondenciaCardProps {
  correspondencia: Correspondencia
  onView: () => void
  onRetirar?: () => void
}

export function CorrespondenciaCard({
  correspondencia,
  onView,
  onRetirar
}: CorrespondenciaCardProps) {
  const isPendente = correspondencia.status === 'PENDENTE'

  const tempoAtras = formatDistanceToNow(
    new Date(correspondencia.criadoEm),
    { addSuffix: true, locale: ptBR }
  )

  return (
    <Card
      className={cn(
        'p-4 transition-all hover:shadow-md',
        !isPendente && 'opacity-60 bg-gray-50'
      )}
    >
      <div className="flex gap-4">
        {/* Foto Miniatura */}
        <div
          onClick={onView}
          className="flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden bg-gray-100 cursor-pointer hover:opacity-80 transition"
        >
          <img
            src={correspondencia.fotoUrl}
            alt={`Correspondência ${correspondencia.morador?.apartamento}`}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0 flex flex-col">
          {/* Header */}
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 truncate">
                Apt {correspondencia.morador?.apartamento} - {correspondencia.morador?.nome}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <Clock className="h-4 w-4 text-gray-400" />
                <p className="text-sm text-gray-500">
                  {tempoAtras}
                </p>
              </div>
            </div>

            {/* Status Badge */}
            {isPendente ? (
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700 whitespace-nowrap">
                Pendente
              </span>
            ) : (
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 whitespace-nowrap">
                Retirado
              </span>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-2 mt-auto">
            <Button
              size="sm"
              variant="outline"
              onClick={onView}
              className="flex-1"
            >
              <Eye className="mr-1.5 h-4 w-4" />
              Ver
            </Button>

            {isPendente && onRetirar && (
              <Button
                size="sm"
                onClick={onRetirar}
                className="flex-1"
              >
                <Check className="mr-1.5 h-4 w-4" />
                Retirar
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Retirada info (if retirada) */}
      {!isPendente && correspondencia.retiradoEm && (
        <div className="mt-3 pt-3 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Retirado em{' '}
            {new Date(correspondencia.retiradoEm).toLocaleString('pt-BR', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
        </div>
      )}
    </Card>
  )
}
