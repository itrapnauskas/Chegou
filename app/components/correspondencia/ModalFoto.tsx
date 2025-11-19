'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import type { Correspondencia } from '@/types'
import { X } from 'lucide-react'

interface ModalFotoProps {
  correspondencia: Correspondencia | null
  open: boolean
  onClose: () => void
  onRetirar?: () => void
}

export function ModalFoto({
  correspondencia,
  open,
  onClose,
  onRetirar
}: ModalFotoProps) {
  if (!correspondencia) return null

  const isPendente = correspondencia.status === 'PENDENTE'

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <DialogTitle className="text-xl">
              Correspondência - Apt {correspondencia.morador?.apartamento}
            </DialogTitle>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded transition"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Foto */}
          <div className="rounded-lg overflow-hidden bg-gray-50">
            <img
              src={correspondencia.fotoUrl}
              alt="Correspondência"
              className="w-full h-auto"
            />
          </div>

          {/* Info */}
          <div className="space-y-3 text-sm">
            <div>
              <span className="font-semibold text-gray-700">Morador:</span>{' '}
              <span className="text-gray-900">{correspondencia.morador?.nome}</span>
            </div>

            <div>
              <span className="font-semibold text-gray-700">Apartamento:</span>{' '}
              <span className="text-gray-900">{correspondencia.morador?.apartamento}</span>
            </div>

            <div>
              <span className="font-semibold text-gray-700">Telefone:</span>{' '}
              <span className="text-gray-900">{correspondencia.morador?.telefone}</span>
            </div>

            <div>
              <span className="font-semibold text-gray-700">Registrado:</span>{' '}
              <span className="text-gray-900">
                {format(new Date(correspondencia.criadoEm), "dd/MM/yyyy 'às' HH:mm", {
                  locale: ptBR
                })}
              </span>
            </div>

            {correspondencia.notificadoEm && (
              <div>
                <span className="font-semibold text-gray-700">Notificado:</span>{' '}
                <span className="text-gray-900">
                  {format(new Date(correspondencia.notificadoEm), "dd/MM/yyyy 'às' HH:mm", {
                    locale: ptBR
                  })}
                </span>
              </div>
            )}

            {correspondencia.retiradoEm && (
              <div>
                <span className="font-semibold text-gray-700">Retirado:</span>{' '}
                <span className="text-gray-900">
                  {format(new Date(correspondencia.retiradoEm), "dd/MM/yyyy 'às' HH:mm", {
                    locale: ptBR
                  })}
                </span>
              </div>
            )}

            <div>
              <span className="font-semibold text-gray-700">Status:</span>{' '}
              {isPendente ? (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
                  Pendente
                </span>
              ) : (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                  Retirado
                </span>
              )}
            </div>
          </div>

          {/* Actions */}
          {isPendente && onRetirar && (
            <Button
              onClick={() => {
                onRetirar()
                onClose()
              }}
              className="w-full"
              size="lg"
            >
              Marcar como Retirada
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
