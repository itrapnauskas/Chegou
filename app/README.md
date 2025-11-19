# 📬 CHEGOU - Sistema de Gestão de Correspondências

Sistema completo para gestão de correspondências em condomínios, com notificação automática via WhatsApp.

## 🚀 Features

- 📸 **Captura de fotos** via webcam (mobile e desktop)
- 👥 **Gestão de moradores** com busca inteligente
- 📦 **Registro de correspondências** com foto e notificação automática
- 📊 **Dashboard com métricas** em tempo real
- 💬 **Notificações WhatsApp** automáticas (integração com Baileys)
- 🔐 **Autenticação JWT** com bcrypt
- 🎨 **UI moderna** com Tailwind CSS
- 📱 **Responsivo** e mobile-first
- 🔒 **Multi-tenant** com isolamento de dados por condomínio

## 🛠️ Stack Tecnológica

### Frontend
- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS v4**
- **React Query** (@tanstack/react-query)
- **Zustand** (state management)
- **react-webcam** (captura de fotos)
- **react-hot-toast** (notificações)

### Backend
- **Next.js API Routes**
- **Prisma ORM**
- **PostgreSQL** (via Supabase)
- **JWT** (autenticação)
- **bcrypt** (hash de senhas)
- **Baileys** (WhatsApp integration)

### Infraestrutura
- **Vercel** (deploy frontend)
- **Supabase** (database + storage)
- **Custo**: R$ 0-50/mês

## 📋 Pré-requisitos

- Node.js 18+
- npm ou yarn
- Conta no Supabase (gratuita)
- Conta no Vercel (gratuita)

## 🔧 Instalação e Setup Local

### 1. Clone o repositório

```bash
git clone <seu-repositorio>
cd app
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Copie o arquivo `.env.example` para `.env`:

```bash
cp .env.example .env
```

Edite o `.env` com suas credenciais:

```env
# Database (Supabase PostgreSQL)
DATABASE_URL="postgresql://user:password@host:5432/database"

# JWT Secret (gere uma chave aleatória forte)
JWT_SECRET="sua-chave-secreta-super-forte-aqui"

# Supabase Storage
NEXT_PUBLIC_SUPABASE_URL="https://seu-projeto.supabase.co"
SUPABASE_SERVICE_ROLE_KEY="sua-service-role-key"

# App URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# WhatsApp (opcional - deixe em branco para modo dev)
WHATSAPP_SESSION_PATH="./whatsapp-session"
```

### 4. Setup do Banco de Dados

```bash
# Gerar Prisma Client
npm run prisma:generate

# Executar migrations
npm run prisma:migrate

# Popular banco com dados de teste
npm run prisma:seed
```

### 5. Execute o projeto

```bash
npm run dev
```

Acesse: http://localhost:3000

### 6. Credenciais de Teste

Após executar o seed, você pode fazer login com:

- **Email**: zelador@chegou.com
- **Senha**: zelador123

## 🗄️ Estrutura do Banco de Dados

### Models Principais

```prisma
Condominio
├── Usuario (zeladores)
├── Morador (apartamentos)
└── Correspondencia (fotos + status)
    └── LogNotificacao (histórico WhatsApp)
```

## 📱 Funcionalidades por Página

### `/login` - Autenticação
- Login com email/senha
- Validação com JWT
- Redirecionamento automático

### `/` - Home (Lista de Correspondências)
- Visualização de todas as correspondências
- Filtros por status (Pendente/Retirado)
- Cards com foto miniatura
- Ações: Ver detalhes, Marcar como retirado
- Estatísticas rápidas

### `/nova` - Nova Correspondência
- Passo 1: Captura de foto (webcam)
- Passo 2: Seleção de morador (busca)
- Upload automático para Supabase
- Notificação WhatsApp automática

### `/moradores` - Gestão de Moradores
- Lista completa de moradores
- Busca por apartamento/nome/telefone
- Cadastro de novos moradores
- Status ativo/inativo

### `/dashboard` - Métricas e Análises
- Total de correspondências no mês
- Média por dia
- Correspondências pendentes
- Taxa de retirada (%)
- Tempo médio de retirada (horas)
- Insights automáticos

## 🔐 Segurança

### Implementado
- ✅ JWT para autenticação
- ✅ bcrypt para hash de senhas
- ✅ Middleware de autenticação em rotas
- ✅ Validação de inputs com Zod
- ✅ HTTPS obrigatório em produção
- ✅ Multi-tenant com isolamento de dados
- ✅ Upload de arquivos com validação de tipo/tamanho
- ✅ Hash de fotos para prevenir duplicatas

### LGPD
- ✅ Dados pessoais criptografados
- ✅ Logs de acesso
- ✅ Consentimento via cadastro
- ⚠️ **TODO**: Implementar exclusão de dados (direito ao esquecimento)

## 📦 Deploy em Produção

Para instruções completas de deploy, consulte **[DEPLOY.md](./DEPLOY.md)**

Resumo:
1. Configure Supabase (database + storage)
2. Execute migrations do Prisma
3. Deploy no Vercel
4. Configure variáveis de ambiente
5. Teste em produção

## 🧪 Testing

### Testes Manuais

1. **Autenticação**
   - [ ] Login com credenciais corretas
   - [ ] Login com credenciais incorretas
   - [ ] Logout e redirecionamento
   - [ ] Acesso a rotas protegidas sem login

2. **Correspondências**
   - [ ] Capturar foto (mobile e desktop)
   - [ ] Selecionar morador
   - [ ] Registrar correspondência
   - [ ] Visualizar detalhes
   - [ ] Marcar como retirado
   - [ ] Filtrar por status

3. **Moradores**
   - [ ] Listar moradores
   - [ ] Buscar morador
   - [ ] Cadastrar novo morador
   - [ ] Validação de campos

4. **Dashboard**
   - [ ] Visualizar métricas
   - [ ] Cálculo correto de estatísticas

### Scripts de Teste

```bash
# Executar linter
npm run lint

# Verificar tipos TypeScript
npx tsc --noEmit

# Prisma Studio (visualizar dados)
npm run prisma:studio
```

## 🐛 Troubleshooting

### Erro: "Prisma Client not generated"
```bash
npm run prisma:generate
```

### Erro: "Cannot find module '@prisma/client'"
```bash
rm -rf node_modules
npm install
npm run prisma:generate
```

### Erro: "Invalid token" no login
- Verifique se `JWT_SECRET` está configurado
- Limpe o localStorage do navegador

### Erro: Upload de foto falha
- Verifique credenciais do Supabase
- Verifique se o bucket `correspondencias` existe
- Verifique permissões do bucket

### WhatsApp não envia notificações
- Em desenvolvimento, o WhatsApp está em modo mock (console.log)
- Para ativar em produção, descomente código em `lib/whatsapp.ts`

## 📚 Documentação Adicional

- [Prisma Docs](https://www.prisma.io/docs)
- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Baileys WhatsApp](https://github.com/WhiskeySockets/Baileys)

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT.

## 🎯 Roadmap

### MVP (Concluído) ✅
- [x] Autenticação JWT
- [x] CRUD de moradores
- [x] Registro de correspondências com foto
- [x] Notificações WhatsApp (estrutura)
- [x] Dashboard com métricas
- [x] Interface responsiva

### Próximas Features 🚀
- [ ] Notificações push (web push)
- [ ] Exportação de relatórios (PDF/Excel)
- [ ] Multi-idioma (i18n)
- [ ] Modo escuro
- [ ] App mobile nativo (React Native)
- [ ] Reconhecimento de texto em fotos (OCR)
- [ ] Histórico de atividades
- [ ] Sistema de permissões (roles)
- [ ] Integração com câmeras IP
- [ ] API pública para integrações

## 👥 Suporte

Para questões e suporte:
- **Issues**: [GitHub Issues](seu-repo/issues)
- **Email**: suporte@chegou.com
- **WhatsApp**: (11) 99999-9999

---

**CHEGOU** - Correspondências que chegam, moradores que sabem 📬✨
