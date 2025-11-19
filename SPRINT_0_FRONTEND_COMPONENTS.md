# ⚛️ Frontend Architecture & Components
**Agente**: Júlia Santos (Frontend Developer)
**Sprint**: 0 - Planejamento
**Data**: 2025-11-19

---

## 🎯 Stack Frontend

```typescript
// Core
- Next.js 14 (App Router)
- React 18
- TypeScript 5
- Tailwind CSS 3

// UI Components
- shadcn/ui (Radix UI primitives)
- Lucide React (icons)

// State Management
- Zustand (global state)
- React Query (server state)

// Forms
- React Hook Form
- Zod (validation)

// Camera
- getUserMedia API (nativo)
- react-webcam (wrapper)

// Utils
- date-fns (datas)
- clsx (class names)
- react-hot-toast (notifications)
```

---

## 📁 Estrutura de Pastas

```
app/
├── (auth)/
│   ├── login/
│   │   └── page.tsx
│   └── layout.tsx
├── (dashboard)/
│   ├── page.tsx                 # Home (Lista correspondências)
│   ├── nova/
│   │   └── page.tsx             # Nova correspondência
│   ├── moradores/
│   │   ├── page.tsx             # Lista moradores
│   │   ├── novo/page.tsx        # Novo morador
│   │   └── [id]/page.tsx        # Editar morador
│   ├── dashboard/
│   │   └── page.tsx             # Métricas
│   └── layout.tsx
├── foto/
│   └── [hash]/page.tsx          # Ver foto (público)
├── api/
│   ├── auth/
│   ├── moradores/
│   ├── correspondencias/
│   └── upload/
├── layout.tsx
└── globals.css

components/
├── ui/                          # shadcn/ui components
│   ├── button.tsx
│   ├── input.tsx
│   ├── card.tsx
│   ├── dialog.tsx
│   ├── toast.tsx
│   └── ...
├── camera/
│   └── Camera.tsx              # Componente câmera
├── correspondencia/
│   ├── CorrespondenciaCard.tsx
│   ├── CorrespondenciaList.tsx
│   └── ModalFoto.tsx
├── morador/
│   ├── MoradorForm.tsx
│   ├── MoradorSearch.tsx
│   └── MoradorCard.tsx
├── layout/
│   ├── Header.tsx
│   ├── Sidebar.tsx
│   └── MobileNav.tsx
└── shared/
    ├── LoadingSpinner.tsx
    ├── EmptyState.tsx
    └── ErrorBoundary.tsx

lib/
├── api/
│   ├── auth.ts
│   ├── moradores.ts
│   ├── correspondencias.ts
│   └── upload.ts
├── hooks/
│   ├── useAuth.ts
│   ├── useCamera.ts
│   ├── useMoradores.ts
│   └── useCorrespondencias.ts
├── stores/
│   ├── authStore.ts
│   └── uiStore.ts
├── utils/
│   ├── cn.ts                    # className utils
│   ├── format.ts                # formatters
│   └── validators.ts            # schemas Zod
└── prisma.ts

types/
├── index.ts
├── database.ts
└── api.ts
```

---

## 🧩 Componentes Principais

### 1. Camera Component

```typescript
// components/camera/Camera.tsx
'use client'

import { useRef, useState } from 'react'
import Webcam from 'react-webcam'
import { Button } from '@/components/ui/button'
import { Camera as CameraIcon, X, Check } from 'lucide-react'

interface CameraProps {
  onCapture: (imageSrc: string) => void
  onCancel: () => void
}

export function Camera({ onCapture, onCancel }: CameraProps) {
  const webcamRef = useRef<Webcam>(null)
  const [imageSrc, setImageSrc] = useState<string | null>(null)

  const capture = () => {
    const src = webcamRef.current?.getScreenshot()
    if (src) setImageSrc(src)
  }

  const confirm = () => {
    if (imageSrc) onCapture(imageSrc)
  }

  const retake = () => setImageSrc(null)

  if (imageSrc) {
    return (
      <div className="space-y-4">
        <img
          src={imageSrc}
          alt="Foto capturada"
          className="w-full rounded-lg"
        />
        <div className="flex gap-2">
          <Button
            onClick={retake}
            variant="outline"
            className="flex-1"
          >
            <CameraIcon className="mr-2 h-4 w-4" />
            Tirar Outra
          </Button>
          <Button
            onClick={confirm}
            className="flex-1"
          >
            <Check className="mr-2 h-4 w-4" />
            Continuar
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <Webcam
        ref={webcamRef}
        audio={false}
        screenshotFormat="image/jpeg"
        className="w-full rounded-lg"
        videoConstraints={{
          facingMode: 'environment' // Câmera traseira no mobile
        }}
      />

      <div className="flex gap-2">
        <Button
          onClick={onCancel}
          variant="ghost"
        >
          <X className="mr-2 h-4 w-4" />
          Cancelar
        </Button>
        <Button
          onClick={capture}
          className="flex-1"
        >
          <CameraIcon className="mr-2 h-4 w-4" />
          Tirar Foto
        </Button>
      </div>
    </div>
  )
}
```

---

### 2. Morador Search (Autocomplete)

```typescript
// components/morador/MoradorSearch.tsx
'use client'

import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { useDebouncedValue } from '@/lib/hooks/useDebouncedValue'
import { api } from '@/lib/api/moradores'
import type { Morador } from '@/types'

interface MoradorSearchProps {
  onSelect: (morador: Morador) => void
  selected?: Morador
}

export function MoradorSearch({ onSelect, selected }: MoradorSearchProps) {
  const [search, setSearch] = useState('')
  const [results, setResults] = useState<Morador[]>([])
  const [loading, setLoading] = useState(false)

  const debouncedSearch = useDebouncedValue(search, 300)

  useEffect(() => {
    if (debouncedSearch.length < 2) {
      setResults([])
      return
    }

    setLoading(true)
    api.buscar(debouncedSearch)
      .then(setResults)
      .finally(() => setLoading(false))
  }, [debouncedSearch])

  return (
    <div className="space-y-2">
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input
          type="text"
          placeholder="Digite apartamento ou nome..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      {loading && (
        <div className="text-sm text-gray-500">Buscando...</div>
      )}

      {results.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium">Resultados:</p>
          {results.map((morador) => (
            <button
              key={morador.id}
              onClick={() => onSelect(morador)}
              className={`
                w-full text-left p-3 rounded-lg border
                hover:bg-gray-50 transition-colors
                ${selected?.id === morador.id ? 'border-primary-500 bg-primary-50' : 'border-gray-200'}
              `}
            >
              <div className="font-medium">
                Apt {morador.apartamento} - {morador.nome}
              </div>
              <div className="text-sm text-gray-500">
                {morador.telefone}
              </div>
            </button>
          ))}
        </div>
      )}

      {search.length >= 2 && results.length === 0 && !loading && (
        <div className="text-sm text-gray-500">
          Nenhum morador encontrado
        </div>
      )}
    </div>
  )
}
```

---

### 3. Correspondencia Card

```typescript
// components/correspondencia/CorrespondenciaCard.tsx
'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Eye, Check } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import type { Correspondencia } from '@/types'

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
    <Card className={`p-4 ${isPendente ? '' : 'opacity-60 bg-gray-50'}`}>
      <div className="flex gap-3">
        {/* Foto Miniatura */}
        <img
          src={correspondencia.fotoUrl}
          alt={`Correspondência ${correspondencia.morador.apartamento}`}
          className="w-20 h-20 rounded object-cover cursor-pointer"
          onClick={onView}
        />

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="font-semibold truncate">
                Apt {correspondencia.morador.apartamento} - {correspondencia.morador.nome}
              </p>
              <p className="text-sm text-gray-500">
                {tempoAtras}
              </p>
            </div>
            {isPendente ? (
              <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">
                Pendente
              </span>
            ) : (
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                Retirado
              </span>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-2 mt-3">
            <Button
              size="sm"
              variant="outline"
              onClick={onView}
              className="flex-1"
            >
              <Eye className="mr-1 h-3 w-3" />
              Ver
            </Button>

            {isPendente && onRetirar && (
              <Button
                size="sm"
                onClick={onRetirar}
                className="flex-1"
              >
                <Check className="mr-1 h-3 w-3" />
                Retirar
              </Button>
            )}
          </div>
        </div>
      </div>
    </Card>
  )
}
```

---

### 4. Modal Foto

```typescript
// components/correspondencia/ModalFoto.tsx
'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import type { Correspondencia } from '@/types'

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
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            Correspondência - Apt {correspondencia.morador.apartamento}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Foto */}
          <img
            src={correspondencia.fotoUrl}
            alt="Correspondência"
            className="w-full rounded-lg"
          />

          {/* Info */}
          <div className="space-y-2 text-sm">
            <p>
              <strong>Morador:</strong> {correspondencia.morador.nome}
            </p>
            <p>
              <strong>Apartamento:</strong> {correspondencia.morador.apartamento}
            </p>
            <p>
              <strong>Registrado:</strong>{' '}
              {format(new Date(correspondencia.criadoEm), "dd/MM/yyyy 'às' HH:mm", {
                locale: ptBR
              })}
            </p>
            {correspondencia.retiradoEm && (
              <p>
                <strong>Retirado:</strong>{' '}
                {format(new Date(correspondencia.retiradoEm), "dd/MM/yyyy 'às' HH:mm", {
                  locale: ptBR
                })}
              </p>
            )}
          </div>

          {/* Actions */}
          {isPendente && onRetirar && (
            <Button
              onClick={() => {
                onRetirar()
                onClose()
              }}
              className="w-full"
            >
              Marcar como Retirada
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
```

---

## 🪝 Custom Hooks

### useAuth Hook

```typescript
// lib/hooks/useAuth.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { api } from '@/lib/api/auth'
import type { User } from '@/types'

interface AuthStore {
  user: User | null
  token: string | null
  login: (email: string, senha: string) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
}

export const useAuth = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: async (email, senha) => {
        const { user, token } = await api.login(email, senha)
        set({ user, token, isAuthenticated: true })
      },

      logout: () => {
        set({ user: null, token: null, isAuthenticated: false })
      }
    }),
    {
      name: 'auth-storage'
    }
  )
)
```

### useCorrespondencias Hook (React Query)

```typescript
// lib/hooks/useCorrespondencias.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/api/correspondencias'
import { toast } from 'react-hot-toast'
import type { StatusCorrespondencia } from '@/types'

export function useCorrespondencias(status?: StatusCorrespondencia) {
  return useQuery({
    queryKey: ['correspondencias', status],
    queryFn: () => api.listar(status)
  })
}

export function useRegistrarCorrespondencia() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: api.registrar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['correspondencias'] })
      toast.success('Correspondência registrada e morador notificado!')
    },
    onError: () => {
      toast.error('Erro ao registrar correspondência')
    }
  })
}

export function useRetirarCorrespondencia() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: api.retirar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['correspondencias'] })
      toast.success('Marcada como retirada!')
    },
    onError: () => {
      toast.error('Erro ao marcar como retirada')
    }
  })
}
```

---

## 📄 Páginas Principais

### Home (Lista de Correspondências)

```typescript
// app/(dashboard)/page.tsx
'use client'

import { useState } from 'react'
import { useCorrespondencias, useRetirarCorrespondencia } from '@/lib/hooks/useCorrespondencias'
import { CorrespondenciaCard } from '@/components/correspondencia/CorrespondenciaCard'
import { ModalFoto } from '@/components/correspondencia/ModalFoto'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import type { Correspondencia } from '@/types'

export default function HomePage() {
  const router = useRouter()
  const { data: pendentes, isLoading: loadingPendentes } = useCorrespondencias('PENDENTE')
  const { data: retiradas, isLoading: loadingRetiradas } = useCorrespondencias('RETIRADA')
  const retirar = useRetirarCorrespondencia()

  const [fotoModal, setFotoModal] = useState<Correspondencia | null>(null)

  return (
    <div className="space-y-6">
      {/* CTA Principal */}
      <Button
        onClick={() => router.push('/nova')}
        size="lg"
        className="w-full"
      >
        <Plus className="mr-2 h-5 w-5" />
        NOVA CORRESPONDÊNCIA
      </Button>

      {/* Pendentes */}
      <section>
        <h2 className="text-lg font-semibold mb-3">
          Pendentes ({pendentes?.length || 0})
        </h2>

        {loadingPendentes && <div>Carregando...</div>}

        {pendentes?.length === 0 && (
          <p className="text-gray-500 text-center py-8">
            Nenhuma correspondência pendente
          </p>
        )}

        <div className="space-y-3">
          {pendentes?.map((corresp) => (
            <CorrespondenciaCard
              key={corresp.id}
              correspondencia={corresp}
              onView={() => setFotoModal(corresp)}
              onRetirar={() => retirar.mutate(corresp.id)}
            />
          ))}
        </div>
      </section>

      {/* Retiradas */}
      <section>
        <h2 className="text-lg font-semibold mb-3">
          Retiradas Hoje ({retiradas?.length || 0})
        </h2>

        <div className="space-y-3">
          {retiradas?.slice(0, 10).map((corresp) => (
            <CorrespondenciaCard
              key={corresp.id}
              correspondencia={corresp}
              onView={() => setFotoModal(corresp)}
            />
          ))}
        </div>
      </section>

      {/* Modal Foto */}
      <ModalFoto
        correspondencia={fotoModal}
        open={!!fotoModal}
        onClose={() => setFotoModal(null)}
        onRetirar={fotoModal ? () => retirar.mutate(fotoModal.id) : undefined}
      />
    </div>
  )
}
```

### Nova Correspondência

```typescript
// app/(dashboard)/nova/page.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Camera } from '@/components/camera/Camera'
import { MoradorSearch } from '@/components/morador/MoradorSearch'
import { Button } from '@/components/ui/button'
import { useRegistrarCorrespondencia } from '@/lib/hooks/useCorrespondencias'
import { uploadFoto } from '@/lib/api/upload'
import type { Morador } from '@/types'

export default function NovaCorrespondenciaPage() {
  const router = useRouter()
  const [step, setStep] = useState<'camera' | 'morador'>('camera')
  const [foto, setFoto] = useState<string | null>(null)
  const [morador, setMorador] = useState<Morador | null>(null)
  const [uploading, setUploading] = useState(false)

  const registrar = useRegistrarCorrespondencia()

  const handleCapture = (imageSrc: string) => {
    setFoto(imageSrc)
    setStep('morador')
  }

  const handleSubmit = async () => {
    if (!foto || !morador) return

    setUploading(true)
    try {
      // Upload foto
      const fotoUrl = await uploadFoto(foto)

      // Registrar correspondência
      await registrar.mutateAsync({
        moradorId: morador.id,
        fotoUrl
      })

      router.push('/')
    } catch (error) {
      console.error(error)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Nova Correspondência</h1>

      {step === 'camera' && (
        <Camera
          onCapture={handleCapture}
          onCancel={() => router.back()}
        />
      )}

      {step === 'morador' && (
        <div className="space-y-6">
          {/* Preview Foto */}
          {foto && (
            <div>
              <img
                src={foto}
                alt="Foto capturada"
                className="w-32 h-32 rounded-lg object-cover"
              />
            </div>
          )}

          {/* Buscar Morador */}
          <MoradorSearch
            onSelect={setMorador}
            selected={morador}
          />

          {/* Submit */}
          <Button
            onClick={handleSubmit}
            disabled={!morador || uploading}
            className="w-full"
            size="lg"
          >
            {uploading ? 'Registrando...' : 'REGISTRAR E NOTIFICAR'}
          </Button>
        </div>
      )}
    </div>
  )
}
```

---

## 🔐 API Client

```typescript
// lib/api/client.ts
import { useAuth } from '@/lib/hooks/useAuth'

const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api'

async function fetchAPI(
  endpoint: string,
  options: RequestInit = {}
) {
  const token = useAuth.getState().token

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Erro na requisição')
  }

  return response.json()
}

export const client = {
  get: (endpoint: string) => fetchAPI(endpoint),
  post: (endpoint: string, data: any) =>
    fetchAPI(endpoint, {
      method: 'POST',
      body: JSON.stringify(data)
    }),
  patch: (endpoint: string, data: any) =>
    fetchAPI(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data)
    }),
  delete: (endpoint: string) =>
    fetchAPI(endpoint, { method: 'DELETE' })
}
```

---

## 📱 PWA Configuration

```typescript
// next.config.ts
import type { NextConfig } from 'next'
import withPWA from 'next-pwa'

const config: NextConfig = {
  // ... outras configs
}

export default withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development'
})(config)
```

---

## ✅ Performance Checklist

- [x] Code splitting (Next.js automatic)
- [x] Image optimization (next/image)
- [x] Lazy loading (React.lazy)
- [x] Debounced search (300ms)
- [x] React Query cache
- [x] Optimistic updates
- [x] Skeleton loaders
- [x] Error boundaries
- [x] Bundle analyzer
- [x] Lighthouse CI

---

**Assinado**: Júlia Santos (Frontend Developer)
**Revisado**: CEO Claude
**Status**: ✅ APROVADO - Pronto para implementação
