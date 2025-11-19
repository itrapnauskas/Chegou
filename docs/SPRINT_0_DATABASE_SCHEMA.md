# 🗄️ Database Schema - CHEGOU MVP
**Agente**: Alex Nguyen (Backend Developer)
**Sprint**: 0 - Planejamento
**Data**: 2025-11-19

---

## 🎯 Decisões de Arquitetura

### Stack Escolhida
- **ORM**: Prisma (type-safe, migrations automáticas)
- **Database**: PostgreSQL 15 (via Supabase)
- **Storage**: Supabase Storage (fotos)
- **Auth**: Supabase Auth + JWT

### Justificativa
- **Prisma**: Melhor DX (Developer Experience), migrations fáceis, type-safety
- **Supabase**: FREE tier generoso (500MB storage, 50k users), Postgres robusto
- **Row Level Security (RLS)**: Multi-tenant nativo do Postgres

---

## 📊 Schema Prisma (schema.prisma)

```prisma
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ============================================
// MODELOS PRINCIPAIS
// ============================================

/// Condomínio (Multi-tenant)
model Condominio {
  id        String   @id @default(cuid())
  nome      String
  endereco  String?
  ativo     Boolean  @default(true)

  // Configurações
  config    Json?    @default("{}") // { whatsappNumero, mensagemTemplate, etc }

  // Timestamps
  criadoEm  DateTime @default(now())
  atualizadoEm DateTime @updatedAt

  // Relações
  usuarios  Usuario[]
  moradores Morador[]
  correspondencias Correspondencia[]

  @@map("condominios")
}

/// Usuários (Zelador, Síndico, Admin)
model Usuario {
  id       String   @id @default(cuid())
  email    String   @unique
  senha    String   // bcrypt hash
  nome     String
  role     Role     @default(ZELADOR)
  ativo    Boolean  @default(true)

  // Multi-tenant
  condominioId String
  condominio   Condominio @relation(fields: [condominioId], references: [id], onDelete: Cascade)

  // Timestamps
  criadoEm  DateTime @default(now())
  atualizadoEm DateTime @updatedAt
  ultimoLoginEm DateTime?

  // Relações
  correspondenciasRegistradas Correspondencia[] @relation("RegistradoPor")

  @@index([condominioId])
  @@index([email])
  @@map("usuarios")
}

enum Role {
  ADMIN          // Administradora (acesso todos condomínios)
  SINDICO        // Síndico (acesso seu condomínio, manage users)
  ZELADOR        // Zelador (acesso seu condomínio, registrar corresp)
}

/// Moradores
model Morador {
  id          String   @id @default(cuid())
  nome        String
  apartamento String   // Ex: "301", "Bloco A - 405"
  telefone    String   // +5511999999999 (WhatsApp)
  telefone2   String?  // Telefone alternativo (opcional)
  email       String?  // Email opcional
  ativo       Boolean  @default(true)

  // Multi-tenant
  condominioId String
  condominio   Condominio @relation(fields: [condominioId], references: [id], onDelete: Cascade)

  // Timestamps
  criadoEm  DateTime @default(now())
  atualizadoEm DateTime @updatedAt

  // Relações
  correspondencias Correspondencia[]

  @@unique([condominioId, apartamento]) // Apartamento único por condomínio
  @@index([condominioId])
  @@index([telefone])
  @@index([apartamento])
  @@map("moradores")
}

/// Correspondências
model Correspondencia {
  id        String   @id @default(cuid())

  // Foto
  fotoUrl   String   // URL Supabase Storage
  fotoHash  String   @unique // Hash para link público

  // Status
  status    StatusCorrespondencia @default(PENDENTE)

  // Morador
  moradorId String
  morador   Morador  @relation(fields: [moradorId], references: [id], onDelete: Cascade)

  // Multi-tenant
  condominioId String
  condominio   Condominio @relation(fields: [condominioId], references: [id], onDelete: Cascade)

  // Registrado por (zelador)
  registradoPorId String
  registradoPor   Usuario @relation("RegistradoPor", fields: [registradoPorId], references: [id])

  // Notificação
  notificadoEm DateTime?
  notificacaoStatus NotificacaoStatus @default(PENDENTE)
  notificacaoErro String? // Mensagem de erro se falhou

  // Retirada
  retiradoEm DateTime?

  // Timestamps
  criadoEm  DateTime @default(now())
  atualizadoEm DateTime @updatedAt

  @@index([condominioId])
  @@index([moradorId])
  @@index([status])
  @@index([criadoEm])
  @@index([fotoHash])
  @@map("correspondencias")
}

enum StatusCorrespondencia {
  PENDENTE   // Aguardando retirada
  RETIRADA   // Já foi retirada
}

enum NotificacaoStatus {
  PENDENTE   // Ainda não enviou
  ENVIADA    // WhatsApp enviado com sucesso
  FALHOU     // Erro ao enviar
  RETRY      // Tentando reenviar
}

/// Log de Notificações (auditoria)
model LogNotificacao {
  id        String   @id @default(cuid())

  correspondenciaId String
  telefone  String
  mensagem  String   @db.Text
  status    NotificacaoStatus
  erro      String?  @db.Text
  tentativas Int     @default(1)

  criadoEm  DateTime @default(now())

  @@index([correspondenciaId])
  @@index([criadoEm])
  @@map("logs_notificacoes")
}

/// Importação CSV (para importação em massa)
model ImportacaoCSV {
  id        String   @id @default(cuid())

  condominioId String
  usuarioId String

  arquivo   String   // Nome arquivo original
  total     Int      // Total de linhas
  sucesso   Int      // Linhas importadas com sucesso
  erro      Int      // Linhas com erro
  erros     Json?    // Array de erros: [{ linha, erro }]

  status    StatusImportacao @default(PROCESSANDO)

  criadoEm  DateTime @default(now())
  finalizadoEm DateTime?

  @@index([condominioId])
  @@map("importacoes_csv")
}

enum StatusImportacao {
  PROCESSANDO
  CONCLUIDO
  FALHOU
}
```

---

## 🔑 Índices e Performance

### Índices Críticos (já no schema)
```sql
-- Moradores
CREATE INDEX idx_moradores_condominio ON moradores(condominioId);
CREATE INDEX idx_moradores_telefone ON moradores(telefone);
CREATE INDEX idx_moradores_apartamento ON moradores(apartamento);

-- Correspondências
CREATE INDEX idx_correspondencias_condominio ON correspondencias(condominioId);
CREATE INDEX idx_correspondencias_morador ON correspondencias(moradorId);
CREATE INDEX idx_correspondencias_status ON correspondencias(status);
CREATE INDEX idx_correspondencias_data ON correspondencias(criadoEm DESC);
CREATE INDEX idx_correspondencias_hash ON correspondencias(fotoHash);

-- Usuários
CREATE INDEX idx_usuarios_email ON usuarios(email);
CREATE INDEX idx_usuarios_condominio ON usuarios(condominioId);
```

### Queries Otimizadas

#### Query 1: Buscar Morador (Autocomplete)
```typescript
// Busca por apartamento ou nome (< 100ms)
const moradores = await prisma.morador.findMany({
  where: {
    condominioId: user.condominioId,
    ativo: true,
    OR: [
      { apartamento: { contains: searchTerm, mode: 'insensitive' } },
      { nome: { contains: searchTerm, mode: 'insensitive' } }
    ]
  },
  take: 5,
  orderBy: { apartamento: 'asc' }
})
```

#### Query 2: Listar Correspondências Pendentes
```typescript
// Com paginação e foto do morador
const pendentes = await prisma.correspondencia.findMany({
  where: {
    condominioId: user.condominioId,
    status: 'PENDENTE'
  },
  include: {
    morador: {
      select: { nome: true, apartamento: true }
    }
  },
  orderBy: { criadoEm: 'desc' },
  take: 20,
  skip: page * 20
})
```

#### Query 3: Dashboard Métricas
```typescript
// Agregação do mês (< 500ms para 1000 correspondências)
const [total, pendentes, retiradas, tempoMedio] = await Promise.all([
  // Total mês
  prisma.correspondencia.count({
    where: {
      condominioId: user.condominioId,
      criadoEm: { gte: startOfMonth }
    }
  }),

  // Pendentes
  prisma.correspondencia.count({
    where: {
      condominioId: user.condominioId,
      status: 'PENDENTE'
    }
  }),

  // Retiradas mês
  prisma.correspondencia.count({
    where: {
      condominioId: user.condominioId,
      status: 'RETIRADA',
      retiradoEm: { gte: startOfMonth }
    }
  }),

  // Tempo médio (horas)
  prisma.$queryRaw`
    SELECT AVG(EXTRACT(EPOCH FROM (retiradoEm - criadoEm)) / 3600) as media_horas
    FROM correspondencias
    WHERE condominioId = ${user.condominioId}
      AND status = 'RETIRADA'
      AND retiradoEm >= ${startOfMonth}
  `
])
```

---

## 🔐 Row Level Security (RLS) - Supabase

### Políticas de Segurança

```sql
-- Moradores: usuário só vê moradores do seu condomínio
CREATE POLICY morador_select_policy ON moradores
  FOR SELECT
  USING (condominioId IN (
    SELECT condominioId FROM usuarios WHERE id = auth.uid()
  ));

-- Correspondências: usuário só vê correspondências do seu condomínio
CREATE POLICY correspondencia_select_policy ON correspondencias
  FOR SELECT
  USING (condominioId IN (
    SELECT condominioId FROM usuarios WHERE id = auth.uid()
  ));

-- Insert: só usuários ativos podem inserir
CREATE POLICY correspondencia_insert_policy ON correspondencias
  FOR INSERT
  WITH CHECK (
    condominioId IN (
      SELECT condominioId FROM usuarios
      WHERE id = auth.uid() AND ativo = true
    )
  );
```

---

## 📁 Storage (Supabase Storage)

### Estrutura de Pastas
```
chegou-storage/
├── condominios/
│   ├── {condominioId}/
│   │   ├── correspondencias/
│   │   │   ├── {ano}/
│   │   │   │   ├── {mes}/
│   │   │   │   │   ├── {hash}.jpg
│   │   │   │   │   ├── {hash}.png
```

### Exemplo Path
```
condominios/clj123abc/correspondencias/2025/11/a3f7b9c1e2d4.jpg
```

### Configuração Storage
```typescript
// Tamanho máximo: 5MB
// Tipos aceitos: image/jpeg, image/png, image/heic
// Retenção: 2 anos (depois move para cold storage)

const STORAGE_CONFIG = {
  bucket: 'correspondencias',
  maxSize: 5 * 1024 * 1024, // 5MB
  allowedTypes: ['image/jpeg', 'image/png', 'image/heic'],
  publicAccess: false, // Apenas via hash único
}
```

### Upload Flow
```typescript
async function uploadFoto(
  file: File,
  condominioId: string
): Promise<string> {
  // 1. Gerar hash único
  const hash = crypto.randomBytes(16).toString('hex')

  // 2. Caminho
  const now = new Date()
  const ano = now.getFullYear()
  const mes = String(now.getMonth() + 1).padStart(2, '0')
  const ext = file.name.split('.').pop()

  const path = `condominios/${condominioId}/correspondencias/${ano}/${mes}/${hash}.${ext}`

  // 3. Upload Supabase
  const { data, error } = await supabase.storage
    .from('correspondencias')
    .upload(path, file, {
      cacheControl: '31536000', // 1 ano
      upsert: false
    })

  if (error) throw error

  // 4. Retornar URL pública
  const { data: { publicUrl } } = supabase.storage
    .from('correspondencias')
    .getPublicUrl(path)

  return publicUrl
}
```

---

## 🔗 API Endpoints (Next.js API Routes)

### Estrutura
```
app/api/
├── auth/
│   ├── login/route.ts          # POST /api/auth/login
│   ├── logout/route.ts         # POST /api/auth/logout
│   └── me/route.ts             # GET /api/auth/me
├── moradores/
│   ├── route.ts                # GET /api/moradores, POST /api/moradores
│   ├── [id]/route.ts           # GET, PATCH, DELETE /api/moradores/:id
│   ├── busca/route.ts          # GET /api/moradores/busca?q=301
│   └── importar/route.ts       # POST /api/moradores/importar (CSV)
├── correspondencias/
│   ├── route.ts                # GET, POST /api/correspondencias
│   ├── [id]/route.ts           # GET /api/correspondencias/:id
│   ├── [id]/retirar/route.ts  # PATCH /api/correspondencias/:id/retirar
│   └── foto/[hash]/route.ts   # GET /api/correspondencias/foto/:hash (público)
├── upload/
│   └── route.ts                # POST /api/upload (multipart)
├── dashboard/
│   └── route.ts                # GET /api/dashboard (métricas)
└── webhooks/
    └── whatsapp/route.ts       # POST /api/webhooks/whatsapp (Baileys)
```

### Middleware de Autenticação
```typescript
// lib/auth.ts
import { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'

export async function authenticate(req: NextRequest) {
  const token = req.headers.get('authorization')?.replace('Bearer ', '')

  if (!token) {
    throw new Error('Não autenticado')
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string
      condominioId: string
      role: string
    }

    return decoded
  } catch (error) {
    throw new Error('Token inválido')
  }
}
```

### Exemplo Endpoint: Criar Correspondência
```typescript
// app/api/correspondencias/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { authenticate } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { enviarWhatsApp } from '@/lib/whatsapp'

export async function POST(req: NextRequest) {
  try {
    // 1. Autenticar
    const user = await authenticate(req)

    // 2. Validar input
    const body = await req.json()
    const { moradorId, fotoUrl } = body

    if (!moradorId || !fotoUrl) {
      return NextResponse.json(
        { error: 'moradorId e fotoUrl são obrigatórios' },
        { status: 400 }
      )
    }

    // 3. Buscar morador (validar se pertence ao condomínio)
    const morador = await prisma.morador.findFirst({
      where: {
        id: moradorId,
        condominioId: user.condominioId,
        ativo: true
      }
    })

    if (!morador) {
      return NextResponse.json(
        { error: 'Morador não encontrado' },
        { status: 404 }
      )
    }

    // 4. Gerar hash para link público
    const fotoHash = crypto.randomBytes(16).toString('hex')

    // 5. Criar correspondência
    const correspondencia = await prisma.correspondencia.create({
      data: {
        fotoUrl,
        fotoHash,
        moradorId,
        condominioId: user.condominioId,
        registradoPorId: user.userId,
        status: 'PENDENTE',
        notificacaoStatus: 'PENDENTE'
      },
      include: {
        morador: true
      }
    })

    // 6. Enviar WhatsApp (async, não bloquear response)
    enviarWhatsApp(correspondencia.id).catch(console.error)

    // 7. Retornar
    return NextResponse.json({
      success: true,
      correspondencia
    })

  } catch (error) {
    console.error('Erro ao criar correspondência:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
```

---

## 🔔 Integração WhatsApp (Baileys)

### Setup Baileys
```typescript
// lib/whatsapp.ts
import makeWASocket, { DisconnectReason, useMultiFileAuthState } from '@whiskeysockets/baileys'
import { Boom } from '@hapi/boom'

let sock: any = null

export async function connectWhatsApp() {
  const { state, saveCreds } = await useMultiFileAuthState('auth_info_baileys')

  sock = makeWASocket({
    auth: state,
    printQRInTerminal: true // Primeira vez: escanear QR
  })

  sock.ev.on('creds.update', saveCreds)

  sock.ev.on('connection.update', (update: any) => {
    const { connection, lastDisconnect } = update

    if (connection === 'close') {
      const shouldReconnect = (lastDisconnect?.error as Boom)?.output?.statusCode !== DisconnectReason.loggedOut

      if (shouldReconnect) {
        connectWhatsApp() // Reconectar
      }
    } else if (connection === 'open') {
      console.log('✅ WhatsApp conectado!')
    }
  })

  return sock
}

export async function enviarWhatsApp(correspondenciaId: string) {
  try {
    // 1. Buscar correspondência + morador
    const corresp = await prisma.correspondencia.findUnique({
      where: { id: correspondenciaId },
      include: { morador: true, condominio: true }
    })

    if (!corresp) throw new Error('Correspondência não encontrada')

    // 2. Montar mensagem
    const linkFoto = `${process.env.NEXT_PUBLIC_APP_URL}/foto/${corresp.fotoHash}`

    const mensagem = `📬 *CHEGOU Correspondência!*

Olá ${corresp.morador.nome},

Você tem uma correspondência aguardando na portaria.

📅 Chegou em: ${new Date(corresp.criadoEm).toLocaleString('pt-BR')}
📷 Ver foto: ${linkFoto}

Retire na portaria em horário comercial.

---
${corresp.condominio.nome}`

    // 3. Enviar
    const telefone = corresp.morador.telefone.replace(/\D/g, '') + '@s.whatsapp.net'

    await sock.sendMessage(telefone, { text: mensagem })

    // 4. Atualizar status
    await prisma.correspondencia.update({
      where: { id: correspondenciaId },
      data: {
        notificadoEm: new Date(),
        notificacaoStatus: 'ENVIADA'
      }
    })

    // 5. Log
    await prisma.logNotificacao.create({
      data: {
        correspondenciaId,
        telefone: corresp.morador.telefone,
        mensagem,
        status: 'ENVIADA',
        tentativas: 1
      }
    })

    console.log(`✅ WhatsApp enviado para ${corresp.morador.nome}`)

  } catch (error) {
    console.error('❌ Erro ao enviar WhatsApp:', error)

    // Marcar como falhou
    await prisma.correspondencia.update({
      where: { id: correspondenciaId },
      data: {
        notificacaoStatus: 'FALHOU',
        notificacaoErro: String(error)
      }
    })

    // Log erro
    await prisma.logNotificacao.create({
      data: {
        correspondenciaId,
        telefone: '',
        mensagem: '',
        status: 'FALHOU',
        erro: String(error),
        tentativas: 1
      }
    })
  }
}
```

---

## 📦 Migrations

### Criar Migration Inicial
```bash
# 1. Instalar Prisma
npm install -D prisma
npm install @prisma/client

# 2. Inicializar Prisma
npx prisma init

# 3. Configurar .env
DATABASE_URL="postgresql://user:password@db.supabase.co:5432/postgres"

# 4. Criar migration
npx prisma migrate dev --name init

# 5. Gerar Prisma Client
npx prisma generate
```

### Seeds (Dados iniciais)
```typescript
// prisma/seed.ts
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  // 1. Criar condomínio de teste
  const condominio = await prisma.condominio.create({
    data: {
      nome: 'Condomínio Teste',
      endereco: 'Rua Teste, 123 - São Paulo/SP'
    }
  })

  // 2. Criar usuário admin
  const senhaHash = await bcrypt.hash('admin123', 10)

  await prisma.usuario.create({
    data: {
      email: 'admin@chegou.com',
      senha: senhaHash,
      nome: 'Administrador',
      role: 'ADMIN',
      condominioId: condominio.id
    }
  })

  // 3. Criar moradores de exemplo
  await prisma.morador.createMany({
    data: [
      {
        nome: 'João Silva',
        apartamento: '301',
        telefone: '+5511999999999',
        condominioId: condominio.id
      },
      {
        nome: 'Maria Santos',
        apartamento: '302',
        telefone: '+5511988888888',
        condominioId: condominio.id
      }
    ]
  })

  console.log('✅ Seed concluído!')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
```

---

## 🔧 Environment Variables

```bash
# .env
# Database
DATABASE_URL="postgresql://user:password@db.supabase.co:5432/postgres"

# Supabase
NEXT_PUBLIC_SUPABASE_URL="https://xxx.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="xxx"
SUPABASE_SERVICE_ROLE_KEY="xxx"

# Auth
JWT_SECRET="super-secret-key-change-in-production"

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# WhatsApp (Baileys)
WHATSAPP_SESSION_PATH="./auth_info_baileys"
```

---

**Assinado**: Alex Nguyen (Backend Developer)
**Revisado**: CEO Claude
**Status**: ✅ APROVADO para implementação
