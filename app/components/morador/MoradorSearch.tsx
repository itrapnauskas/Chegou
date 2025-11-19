'use client'

import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Search, Loader2 } from 'lucide-react'
import { useBuscarMoradores } from '@/lib/hooks/use-moradores'
import type { Morador } from '@/types'
import { cn } from '@/lib/utils'

interface MoradorSearchProps {
  onSelect: (morador: Morador) => void
  selected?: Morador | null
  placeholder?: string
}

export function MoradorSearch({ onSelect, selected, placeholder = 'Digite apartamento ou nome...' }: MoradorSearchProps) {
  const [search, setSearch] = useState('')
  const { data: moradores = [], isLoading } = useBuscarMoradores(search)

  return (
    <div className="space-y-3">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <Input
          type="text"
          placeholder={placeholder}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-12"
        />
        {isLoading && (
          <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 animate-spin" />
        )}
      </div>

      {/* Results */}
      {search.length >= 2 && (
        <div className="space-y-2">
          {moradores.length > 0 ? (
            <>
              <p className="text-sm font-medium text-gray-700">Resultados:</p>
              <div className="space-y-2">
                {moradores.map((morador) => (
                  <button
                    key={morador.id}
                    onClick={() => onSelect(morador)}
                    className={cn(
                      'w-full text-left p-4 rounded-lg border transition-all',
                      'hover:bg-gray-50 active:scale-[0.98]',
                      selected?.id === morador.id
                        ? 'border-primary-500 bg-primary-50 ring-2 ring-primary-500'
                        : 'border-gray-200'
                    )}
                  >
                    <div className="flex items-center gap-3">
                      {/* Radio indicator */}
                      <div
                        className={cn(
                          'w-5 h-5 rounded-full border-2 flex items-center justify-center transition',
                          selected?.id === morador.id
                            ? 'border-primary-500'
                            : 'border-gray-300'
                        )}
                      >
                        {selected?.id === morador.id && (
                          <div className="w-3 h-3 rounded-full bg-primary-500" />
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900">
                          Apt {morador.apartamento} - {morador.nome}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          {morador.telefone}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </>
          ) : !isLoading && (
            <div className="text-center py-8 text-gray-500">
              <Search className="h-12 w-12 mx-auto mb-2 text-gray-300" />
              <p className="text-sm">Nenhum morador encontrado</p>
              <p className="text-xs text-gray-400 mt-1">
                Tente buscar por apartamento ou nome
              </p>
            </div>
          )}
        </div>
      )}

      {search.length > 0 && search.length < 2 && (
        <p className="text-sm text-gray-500">
          Digite pelo menos 2 caracteres para buscar
        </p>
      )}
    </div>
  )
}
