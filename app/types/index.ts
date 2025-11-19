// Database types
export type Role = 'ADMIN' | 'SINDICO' | 'ZELADOR'
export type StatusCorrespondencia = 'PENDENTE' | 'RETIRADA'
export type NotificacaoStatus = 'PENDENTE' | 'ENVIADA' | 'FALHOU' | 'RETRY'

export interface Condominio {
  id: string
  nome: string
  endereco: string | null
  ativo: boolean
  criadoEm: Date
  atualizadoEm: Date
}

export interface Usuario {
  id: string
  email: string
  nome: string
  role: Role
  ativo: boolean
  condominioId: string
  condominio?: Condominio
  criadoEm: Date
  atualizadoEm: Date
  ultimoLoginEm: Date | null
}

export interface Morador {
  id: string
  nome: string
  apartamento: string
  telefone: string
  telefone2: string | null
  email: string | null
  ativo: boolean
  condominioId: string
  criadoEm: Date
  atualizadoEm: Date
}

export interface Correspondencia {
  id: string
  fotoUrl: string
  fotoHash: string
  status: StatusCorrespondencia
  moradorId: string
  morador?: Morador
  condominioId: string
  registradoPorId: string
  notificadoEm: Date | null
  notificacaoStatus: NotificacaoStatus
  notificacaoErro: string | null
  retiradoEm: Date | null
  criadoEm: Date
  atualizadoEm: Date
}

// API response types
export interface ApiResponse<T = any> {
  success: boolean
  error?: string
  [key: string]: any
}

export interface LoginResponse {
  success: boolean
  token: string
  usuario: {
    id: string
    nome: string
    email: string
    role: Role
    condominio: {
      id: string
      nome: string
    }
  }
}

export interface DashboardMetrics {
  totalMes: number
  mediaPorDia: number
  pendentes: number
  retiradasMes: number
  tempoMedioHoras: number
  taxaRetirada: number
}
