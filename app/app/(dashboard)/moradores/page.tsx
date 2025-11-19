'use client'

import { useState } from 'react'
import { useMoradores, useCriarMorador } from '@/lib/hooks/use-moradores'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Dialog } from '@/components/ui/dialog'
import { Users, Plus, Search, Loader2, Phone, Home } from 'lucide-react'
import toast from 'react-hot-toast'

export default function MoradoresPage() {
  const { data: moradores = [], isLoading } = useMoradores()
  const criarMorador = useCriarMorador()

  const [searchTerm, setSearchTerm] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    apartamento: '',
    nome: '',
    telefone: '',
  })

  const filteredMoradores = moradores.filter((m) => {
    const search = searchTerm.toLowerCase()
    return (
      m.apartamento.toLowerCase().includes(search) ||
      m.nome.toLowerCase().includes(search) ||
      m.telefone.includes(search)
    )
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.apartamento || !formData.nome || !formData.telefone) {
      toast.error('Preencha todos os campos')
      return
    }

    try {
      await criarMorador.mutateAsync(formData)
      toast.success('Morador cadastrado com sucesso!')
      setIsModalOpen(false)
      setFormData({ apartamento: '', nome: '', telefone: '' })
    } catch (error: any) {
      console.error('Erro ao criar morador:', error)
      toast.error(error.message || 'Erro ao criar morador')
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Moradores</h1>
          <p className="text-gray-600 mt-1">
            Gerencie os moradores do condomínio
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="mr-2 h-5 w-5" />
          Novo Morador
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total de Moradores</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{moradores.length}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Users className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Ativos</p>
              <p className="text-2xl font-bold text-green-600 mt-1">
                {moradores.filter((m) => m.ativo).length}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Users className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <Input
          type="text"
          placeholder="Buscar por apartamento, nome ou telefone..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-12"
        />
      </div>

      {/* Moradores List */}
      <div>
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 text-gray-400 animate-spin" />
          </div>
        ) : filteredMoradores.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <Users className="h-12 w-12 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-600 font-medium">
              {searchTerm
                ? 'Nenhum morador encontrado'
                : 'Nenhum morador cadastrado'}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {searchTerm
                ? 'Tente buscar por outro termo'
                : 'Cadastre o primeiro morador'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredMoradores.map((morador) => (
              <Card key={morador.id} className="p-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Home className="h-6 w-6 text-green-600" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900">
                        Apt {morador.apartamento}
                      </h3>
                      {morador.ativo ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-700">
                          Ativo
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700">
                          Inativo
                        </span>
                      )}
                    </div>

                    <p className="text-gray-900 font-medium">{morador.nome}</p>

                    <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
                      <Phone className="h-4 w-4" />
                      <span>{morador.telefone}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Modal Novo Morador */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Cadastrar Novo Morador
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="apartamento"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Apartamento
              </label>
              <Input
                id="apartamento"
                type="text"
                placeholder="Ex: 101, 201, 301..."
                value={formData.apartamento}
                onChange={(e) =>
                  setFormData({ ...formData, apartamento: e.target.value })
                }
                disabled={criarMorador.isPending}
              />
            </div>

            <div>
              <label
                htmlFor="nome"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Nome Completo
              </label>
              <Input
                id="nome"
                type="text"
                placeholder="Nome do morador"
                value={formData.nome}
                onChange={(e) =>
                  setFormData({ ...formData, nome: e.target.value })
                }
                disabled={criarMorador.isPending}
              />
            </div>

            <div>
              <label
                htmlFor="telefone"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Telefone (WhatsApp)
              </label>
              <Input
                id="telefone"
                type="tel"
                placeholder="(11) 99999-9999"
                value={formData.telefone}
                onChange={(e) =>
                  setFormData({ ...formData, telefone: e.target.value })
                }
                disabled={criarMorador.isPending}
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsModalOpen(false)}
                disabled={criarMorador.isPending}
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={criarMorador.isPending}
                className="flex-1"
              >
                {criarMorador.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Salvando...
                  </>
                ) : (
                  'Cadastrar'
                )}
              </Button>
            </div>
          </form>
        </div>
      </Dialog>
    </div>
  )
}
