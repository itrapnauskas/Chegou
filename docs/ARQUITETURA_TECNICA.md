# Arquitetura Técnica - CHEGOU MVP

## Estrutura de Dados Mínima

### Tabela: `moradores`
```sql
id              INT PRIMARY KEY AUTO_INCREMENT
nome            VARCHAR(100)
apartamento     VARCHAR(20)    -- Ex: "301", "Bloco A - 405"
telefone        VARCHAR(20)    -- WhatsApp: +5511999999999
ativo           BOOLEAN DEFAULT TRUE
criado_em       DATETIME
```

### Tabela: `correspondencias`
```sql
id              INT PRIMARY KEY AUTO_INCREMENT
morador_id      INT FOREIGN KEY
foto_url        VARCHAR(255)   -- URL da foto no storage
status          ENUM('pendente', 'retirada')
notificado_em   DATETIME
retirado_em     DATETIME NULL
criado_em       DATETIME
```

### Tabela: `usuarios` (Zeladores)
```sql
id              INT PRIMARY KEY AUTO_INCREMENT
usuario         VARCHAR(50) UNIQUE
senha_hash      VARCHAR(255)
nome            VARCHAR(100)
criado_em       DATETIME
```

---

## API Endpoints Mínimos

### Autenticação
```
POST /api/login
Body: { usuario, senha }
Response: { token, nome }
```

### Moradores
```
GET  /api/moradores
GET  /api/moradores/busca?q=301
POST /api/moradores
Body: { nome, apartamento, telefone }
```

### Correspondências
```
GET  /api/correspondencias?status=pendente
POST /api/correspondencias
Body: { morador_id, foto (base64 ou multipart) }

PATCH /api/correspondencias/:id/retirar
Body: { }
```

### Upload
```
POST /api/upload/foto
Body: multipart/form-data
Response: { url }
```

---

## Fluxo de Notificação WhatsApp

### Opção 1: WhatsApp Business API (Oficial)
- **Prós**: Oficial, confiável, escalável
- **Contras**: Requer aprovação Meta, complexo setup
- **Custo**: ~$0.005-0.02 por mensagem
- **URL**: https://business.whatsapp.com/

### Opção 2: Twilio WhatsApp
- **Prós**: Mais fácil setup, boa documentação
- **Contras**: Requer template aprovado
- **Custo**: ~$0.005 por mensagem
- **URL**: https://www.twilio.com/whatsapp

### Opção 3: Baileys (Não oficial)
- **Prós**: Gratuito, rápido para MVP
- **Contras**: Pode ser bloqueado, não escalável
- **Custo**: Grátis
- **GitHub**: https://github.com/WhiskeySockets/Baileys

**Recomendação MVP**: Começar com Baileys para validar, migrar para Twilio após validação.

### Mensagem Padrão
```
📬 *CHEGOU Correspondência!*

Olá {nome},

Você tem uma correspondência aguardando na portaria.

📅 Chegou em: {data} às {hora}
📷 Ver foto: {link_opcional}

Retire na portaria em horário comercial.

---
CHEGOU - Sistema de Correspondências
```

---

## Telas Principais (Wireframe)

### 1. Login (/login)
```
┌─────────────────────────┐
│                         │
│      📬 CHEGOU          │
│                         │
│  [  Usuário       ]     │
│  [  Senha         ]     │
│                         │
│  [ ENTRAR ]             │
│                         │
└─────────────────────────┘
```

### 2. Home - Lista de Correspondências (/)
```
┌─────────────────────────┐
│ ☰ CHEGOU      [Sair]    │
├─────────────────────────┤
│                         │
│ [➕ NOVA CORRESPONDÊNCIA]│
│                         │
│ ─ Pendentes (5) ────────│
│                         │
│ 📦 Apt 301 - João Silva │
│    Hoje 14:30           │
│    [👁️ Ver] [✅ Retirar]│
│                         │
│ 📦 Apt 205 - Maria Costa│
│    Hoje 12:15           │
│    [👁️ Ver] [✅ Retirar]│
│                         │
│ ─ Retiradas Hoje (12) ──│
│                         │
│ ✅ Apt 102 - Pedro Lima │
│    Retirado 15:45       │
│                         │
└─────────────────────────┘
```

### 3. Nova Correspondência (/nova)
```
┌─────────────────────────┐
│ ← Voltar                │
├─────────────────────────┤
│ Nova Correspondência    │
│                         │
│ ┌─────────────────────┐ │
│ │                     │ │
│ │   [📷 TIRAR FOTO]   │ │
│ │                     │ │
│ └─────────────────────┘ │
│                         │
│ Buscar Morador:         │
│ [  Digite apt ou nome ] │
│                         │
│ 🔍 Resultados:          │
│ ○ Apt 301 - João Silva  │
│ ○ Apt 305 - José Santos │
│                         │
│                         │
│ [ REGISTRAR E NOTIFICAR]│
│                         │
└─────────────────────────┘
```

### 4. Foto Preview
```
┌─────────────────────────┐
│ ✕ Fechar               │
├─────────────────────────┤
│                         │
│  ┌───────────────────┐  │
│  │                   │  │
│  │   [FOTO DA        │  │
│  │    CORRESPONDÊNCIA]│  │
│  │                   │  │
│  └───────────────────┘  │
│                         │
│  Apt 301 - João Silva   │
│  Registrado: 19/11 14:30│
│                         │
└─────────────────────────┘
```

---

## Stack Tecnológica Recomendada

### Frontend
```
- Framework: Next.js 14 (React)
- UI: Tailwind CSS + shadcn/ui
- Estado: React Context ou Zustand
- Câmera: react-camera-pro ou getUserMedia API
- Build: Vercel (deploy gratuito)
```

### Backend
```
- Runtime: Node.js 20+
- Framework: Express.js ou Fastify
- ORM: Prisma
- Auth: JWT (jsonwebtoken)
- Validação: Zod
- Upload: Multer
```

### Banco de Dados
```
- Opção 1: PostgreSQL (prod) + SQLite (dev)
- Opção 2: Firebase Firestore (mais rápido MVP)
- Opção 3: Supabase (Postgres + Auth + Storage)
```

### Storage (Fotos)
```
- Opção 1: AWS S3 (escalável)
- Opção 2: Cloudinary (fácil, tem free tier)
- Opção 3: Firebase Storage
- Opção 4: Supabase Storage
```

### Hospedagem
```
- Frontend: Vercel ou Netlify (grátis)
- Backend: Railway, Render, ou Fly.io (grátis/barato)
- Banco: Supabase, PlanetScale, ou Neon (Postgres grátis)
```

---

## Estimativa de Desenvolvimento

### Semana 1: Setup & Autenticação
- [ ] Setup projeto (Next.js + backend)
- [ ] Banco de dados (schema)
- [ ] Login zelador
- [ ] CRUD moradores

### Semana 2: Core Feature
- [ ] Tirar foto (câmera web)
- [ ] Upload foto
- [ ] Busca morador
- [ ] Salvar correspondência

### Semana 3: Notificação & Lista
- [ ] Integração WhatsApp (Baileys)
- [ ] Envio automático mensagem
- [ ] Lista correspondências
- [ ] Marcar como retirada

### Semana 4: Polish & Deploy
- [ ] Ajustes UI/UX
- [ ] Testes com usuário real
- [ ] Deploy produção
- [ ] Documentação uso

**Total: ~1 mês para MVP funcional**

---

## Custos Mensais Estimados (MVP)

```
- Hospedagem Frontend: R$ 0 (Vercel free)
- Hospedagem Backend: R$ 0-30 (Railway/Render free tier)
- Banco de Dados: R$ 0 (Supabase free tier)
- Storage (1GB fotos): R$ 0-10
- WhatsApp (500 msgs/mês): R$ 0-15 (Baileys) ou R$ 15-50 (Twilio)
- Domínio: R$ 40/ano

TOTAL: R$ 0-50/mês
```

---

## Segurança Básica

- [ ] HTTPS obrigatório
- [ ] Senhas com bcrypt (salt rounds: 10)
- [ ] JWT com expiração (24h)
- [ ] Rate limiting (express-rate-limit)
- [ ] Validação input (Zod)
- [ ] CORS configurado
- [ ] Sanitização uploads (file type check)
- [ ] Tamanho máximo foto: 5MB

---

## Melhorias Futuras (Pós-MVP)

### Performance
- Cache com Redis
- CDN para fotos
- Lazy loading lista

### Features
- PWA (instalar como app)
- Notificação push
- Modo offline
- OCR automático (Tesseract.js)
- QR Code para retirada

### Admin
- Dashboard analytics
- Exportar relatórios (CSV)
- Multi-condomínio
- Gestão usuários
