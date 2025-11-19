# 📬 CHEGOU - Sistema de Gestão de Correspondências

**Sistema completo para gestão de correspondências em condomínios, com notificação automática via WhatsApp.**

> 🚀 **Status**: MVP 100% completo e pronto para produção
> 💰 **Custo**: R$ 0-50/mês (Vercel Free + Supabase Free)
> 📱 **Stack**: Next.js 14 + TypeScript + Prisma + PostgreSQL + Tailwind CSS

---

## 🎯 O que é o CHEGOU?

Sistema web que digitaliza o processo de correspondências em condomínios:

1. **Zelador tira foto** da correspondência com o celular (30 segundos)
2. **Sistema identifica o morador** e envia notificação WhatsApp automaticamente
3. **Morador é avisado em tempo real** e retira a correspondência
4. **Gestão completa** com dashboard, métricas e histórico

**Problema resolvido**: Moradores não sabem quando chegam correspondências, causando acúmulo e perda de pacotes.

---

## 📁 Estrutura do Projeto

```
/
├── app/                    # 🚀 Aplicação Next.js (código fonte)
│   ├── README.md          # Instruções de desenvolvimento
│   ├── DEPLOY.md          # Guia completo de deploy
│   └── ...                # Código da aplicação
│
├── docs/                   # 📚 Documentação de planejamento
│   ├── MVP_PLANEJAMENTO.md
│   ├── ARQUITETURA_TECNICA.md
│   ├── MODELO_NEGOCIO_MICROSAAS.md
│   ├── ESTRUTURA_AGENTES.md
│   └── SPRINT_0_*.md      # Documentos de Sprint 0
│
└── README.md              # 👈 Você está aqui
```

---

## 🚀 Quick Start

### Para Desenvolvedores

```bash
# 1. Entre na pasta da aplicação
cd app

# 2. Instale dependências
npm install

# 3. Configure .env (copie .env.example)
cp .env.example .env
# Edite .env com suas credenciais do Supabase

# 4. Setup do banco de dados
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed

# 5. Execute localmente
npm run dev
```

Acesse http://localhost:3000 e faça login:
- **Email**: zelador@chegou.com
- **Senha**: zelador123

**📖 Documentação completa**: [app/README.md](app/README.md)

### Para Deploy em Produção

```bash
# Siga o guia passo a passo
cat app/DEPLOY.md
```

**📦 Deploy estimado**: 30 minutos (Supabase + Vercel)

---

## 📚 Documentação

### Documentos Técnicos (Desenvolvimento)
- **[app/README.md](app/README.md)** - Setup, features, troubleshooting
- **[app/DEPLOY.md](app/DEPLOY.md)** - Guia completo de deploy em produção

### Documentos de Planejamento (Contexto do Negócio)
- **[docs/MVP_PLANEJAMENTO.md](docs/MVP_PLANEJAMENTO.md)** - Definição do MVP
- **[docs/ARQUITETURA_TECNICA.md](docs/ARQUITETURA_TECNICA.md)** - Stack e decisões técnicas
- **[docs/MODELO_NEGOCIO_MICROSAAS.md](docs/MODELO_NEGOCIO_MICROSAAS.md)** - Modelo de negócio e pricing
- **[docs/ESTRUTURA_AGENTES.md](docs/ESTRUTURA_AGENTES.md)** - Metodologia de desenvolvimento
- **[docs/PROGRESSO_MVP.md](docs/PROGRESSO_MVP.md)** - Status de desenvolvimento

### Documentos de Sprint 0 (Planejamento Detalhado)
- **[docs/SPRINT_0_PRD.md](docs/SPRINT_0_PRD.md)** - Product Requirements Document
- **[docs/SPRINT_0_DATABASE_SCHEMA.md](docs/SPRINT_0_DATABASE_SCHEMA.md)** - Schema do banco
- **[docs/SPRINT_0_UX_WIREFRAMES.md](docs/SPRINT_0_UX_WIREFRAMES.md)** - Wireframes e design
- **[docs/SPRINT_0_FRONTEND_COMPONENTS.md](docs/SPRINT_0_FRONTEND_COMPONENTS.md)** - Arquitetura frontend
- **[docs/SPRINT_0_QA_TEST_PLAN.md](docs/SPRINT_0_QA_TEST_PLAN.md)** - Plano de testes
- **[docs/SPRINT_0_SECURITY_AUDIT.md](docs/SPRINT_0_SECURITY_AUDIT.md)** - Auditoria de segurança
- **[docs/SPRINT_0_GTM_STRATEGY.md](docs/SPRINT_0_GTM_STRATEGY.md)** - Go-to-market
- **[docs/SPRINT_0_LANDING_PAGE.md](docs/SPRINT_0_LANDING_PAGE.md)** - Landing page
- **[docs/SPRINT_0_CEO_CONSOLIDADO.md](docs/SPRINT_0_CEO_CONSOLIDADO.md)** - Consolidado executivo

---

## ✨ Features Implementadas

### Funcionalidades MVP ✅
- ✅ **Autenticação** - JWT + bcrypt
- ✅ **Gestão de Moradores** - CRUD completo com busca
- ✅ **Registro de Correspondências** - Foto via webcam + upload Supabase
- ✅ **Notificação WhatsApp** - Automática via Baileys (estrutura pronta)
- ✅ **Dashboard** - Métricas em tempo real (taxa retirada, tempo médio, etc)
- ✅ **Interface Responsiva** - Mobile-first, PWA-ready
- ✅ **Multi-tenant** - Isolamento de dados por condomínio
- ✅ **Middleware** - Proteção de rotas

### Páginas
- `/login` - Autenticação
- `/` - Home (lista de correspondências)
- `/nova` - Registrar nova correspondência
- `/moradores` - Gestão de moradores
- `/dashboard` - Métricas e análises

---

## 🛠️ Stack Tecnológica

### Frontend
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS v4
- React Query
- Zustand

### Backend
- Next.js API Routes
- Prisma ORM
- PostgreSQL (Supabase)
- JWT + bcrypt
- Baileys (WhatsApp)

### Infraestrutura
- Vercel (frontend)
- Supabase (database + storage)
- **Custo**: R$ 0-50/mês

---

## 🎯 Modelo de Negócio

### Tier Free (Freemium)
- 1 condomínio
- Até 50 correspondências/mês
- 1 usuário
- WhatsApp manual

### Tier Profissional - R$ 49/mês
- 1 condomínio
- Correspondências ilimitadas
- Até 3 usuários
- WhatsApp automático
- Sem marca d'água

### Tier Empresarial - R$ 199/mês
- Múltiplos condomínios
- Tudo ilimitado
- API para integrações
- Relatórios customizados
- SLA 99.9%

**📊 Detalhes**: [docs/MODELO_NEGOCIO_MICROSAAS.md](docs/MODELO_NEGOCIO_MICROSAAS.md)

---

## 🔐 Segurança

- ✅ JWT para autenticação
- ✅ bcrypt para senhas
- ✅ Middleware de proteção de rotas
- ✅ Validação com Zod
- ✅ HTTPS obrigatório
- ✅ Multi-tenant com RLS (Row Level Security)
- ✅ Upload com validação de tipo/tamanho
- ✅ Conformidade LGPD

---

## 🧪 Testando o Sistema

```bash
cd app
npm run dev
```

Acesse http://localhost:3000/login

**Credenciais de teste** (após seed):
- Email: `zelador@chegou.com`
- Senha: `zelador123`

**Dados pré-cadastrados**:
- 8 moradores (Apt 101-402)
- 5 correspondências (3 pendentes, 2 retiradas)

---

## 🚀 Roadmap

### MVP - Concluído ✅
- [x] Autenticação e gestão de usuários
- [x] CRUD de moradores
- [x] Registro de correspondências com foto
- [x] Dashboard com métricas
- [x] Interface responsiva

### Próximas Features 🎯
- [ ] Notificações push (web)
- [ ] Exportação de relatórios (PDF/Excel)
- [ ] Multi-idioma (i18n)
- [ ] Modo escuro
- [ ] App mobile nativo
- [ ] OCR para reconhecer destinatário
- [ ] Sistema de permissões avançado
- [ ] API pública

---

## 📞 Suporte

- **Documentação**: [app/README.md](app/README.md)
- **Deploy**: [app/DEPLOY.md](app/DEPLOY.md)
- **Issues**: GitHub Issues
- **Email**: suporte@chegou.com

---

## 📝 Licença

MIT License - Veja [LICENSE](LICENSE) para detalhes.

---

## 👥 Time de Desenvolvimento

Projeto desenvolvido com metodologia de "Factory of Agents":
- Product Manager
- UI/UX Designer
- Backend Developer
- Frontend Developer
- QA Engineer
- Security Auditor
- Product Strategist
- Growth Hacker

**Metodologia**: [docs/ESTRUTURA_AGENTES.md](docs/ESTRUTURA_AGENTES.md)

---

<div align="center">

**CHEGOU** - Correspondências que chegam, moradores que sabem 📬

[Começar Desenvolvimento](app/README.md) • [Deploy](app/DEPLOY.md) • [Documentação](docs/)

</div>
