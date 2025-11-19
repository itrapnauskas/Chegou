# CHEGOU - Development Setup

## 🚀 Sprint 1: Setup + Autenticação

### Stack
- **Frontend**: Next.js 14 (App Router) + TypeScript + Tailwind CSS
- **Backend**: Next.js API Routes + Prisma ORM
- **Database**: PostgreSQL (Supabase)
- **Auth**: JWT + bcrypt

---

## 📦 Setup Local

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Environment Variables
```bash
cp .env.example .env
```

Edit `.env` with your Supabase credentials:
```env
DATABASE_URL="postgresql://user:password@db.xxx.supabase.co:5432/postgres"
NEXT_PUBLIC_SUPABASE_URL="https://xxx.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"
JWT_SECRET="your-random-32-char-secret"
```

### 3. Setup Database
```bash
# Generate Prisma Client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# (Optional) Seed database with test data
npm run prisma:seed
```

### 4. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 🗄️ Database Schema

### Models
- `Condominio` - Multi-tenant isolation
- `Usuario` - Zelador, Síndico, Admin
- `Morador` - Residents
- `Correspondencia` - Mail records
- `LogNotificacao` - WhatsApp notification logs

### Key Features
- Multi-tenant (condominioId filtering)
- JWT authentication (7 days expiration)
- Bcrypt password hashing (10 salt rounds)
- Row-level security ready

---

## 🔐 Authentication Flow

### Login
```typescript
POST /api/auth/login
Body: { email, senha }
Response: { token, usuario }
```

### Get Current User
```typescript
GET /api/auth/me
Headers: { Authorization: "Bearer <token>" }
Response: { usuario }
```

---

## 📁 Project Structure

```
app/
├── app/
│   ├── api/
│   │   └── auth/
│   │       ├── login/route.ts
│   │       └── me/route.ts
│   ├── (auth)/
│   │   └── login/page.tsx (TODO)
│   └── (dashboard)/
│       └── page.tsx (TODO)
├── lib/
│   ├── prisma.ts
│   ├── auth.ts
│   └── utils.ts
├── prisma/
│   └── schema.prisma
├── .env.example
└── package.json
```

---

## ✅ Sprint 1 Progress

- [x] Prisma schema defined
- [x] Auth utilities (JWT + bcrypt)
- [x] Login API endpoint
- [x] Get user API endpoint
- [x] Environment setup
- [x] Dependencies installed
- [ ] Login page UI (Next)
- [ ] Middleware protection (Next)
- [ ] Seed script (Next)

---

## 🔜 Next Steps (Sprint 2)

- Registro Correspondência (foto + upload)
- CRUD Moradores
- Busca autocomplete
- Lista correspondências

---

## 🛠️ Useful Commands

```bash
# Prisma
npm run prisma:generate     # Generate client
npm run prisma:migrate      # Run migrations
npm run prisma:studio       # Open Prisma Studio
npm run prisma:seed         # Seed database

# Development
npm run dev                 # Start dev server
npm run build               # Build for production
npm run start               # Start production server
npm run lint                # Run ESLint
```

---

**Status**: Sprint 1 in progress 🏗️
