# ☁️ CHEGOU - Deploy em Produção (Cloud)

Guia completo para migrar do ambiente local para produção na nuvem usando **Vercel + Supabase**.

> **Pré-requisito**: Ter o projeto rodando 100% localmente. Ver: [SETUP_LOCAL.md](SETUP_LOCAL.md)

---

## 🎯 Visão Geral

### Stack de Produção

- **Frontend + API**: Vercel (Serverless)
- **Database**: Supabase PostgreSQL
- **Storage**: Supabase Storage
- **WhatsApp**: Baileys (self-hosted ou cloud function)
- **Custo estimado**: R$ 0-50/mês

### Diferenças Local vs Cloud

| Componente | Local | Cloud (Produção) |
|------------|-------|------------------|
| PostgreSQL | Docker | Supabase |
| Storage | Filesystem (`public/uploads/`) | Supabase Storage (S3) |
| WhatsApp | Mock (console.log) | Baileys real |
| Deploy | `npm run dev` | Vercel auto-deploy |
| URL | localhost:3000 | seu-app.vercel.app |

---

## 📋 Checklist Pré-Deploy

Antes de começar, verifique:

- [ ] Projeto roda 100% local sem erros
- [ ] Todas as features testadas localmente
- [ ] Git commit e push de todas as mudanças
- [ ] Código no GitHub (branch main ou develop)
- [ ] Conta GitHub ativa

---

## 🚀 Parte 1: Setup Supabase (Database + Storage)

### 1.1 Criar Conta e Projeto

1. Acesse https://supabase.com
2. Clique em **"Start your project"**
3. Faça login com GitHub
4. Clique em **"New Project"**

### 1.2 Configurar Projeto

Preencha:
- **Name**: `CHEGOU-Production` (ou o que preferir)
- **Database Password**: Gere uma senha forte e **salve em local seguro!**
- **Region**: `South America (São Paulo)` - menor latência
- **Pricing Plan**: **Free** (500MB storage, 2GB transferência)

Clique em **"Create new project"**

⏳ Aguarde ~2 minutos para provisionar

### 1.3 Obter Credenciais do Banco

1. Vá em **Settings** > **Database**
2. Em "Connection String", copie a **URI**:
   ```
   postgresql://postgres:[SUA-SENHA]@db.[SEU-PROJETO].supabase.co:5432/postgres
   ```
3. **Salve esta URL** - vai usar no Vercel!

### 1.4 Obter API Keys

1. Vá em **Settings** > **API**
2. Copie e salve:
   - **Project URL**: `https://[projeto].supabase.co`
   - **`service_role` key** (secret) - **NÃO exponha!**

### 1.5 Criar Storage Bucket

1. Vá em **Storage** no menu lateral
2. Clique em **"Create a new bucket"**
3. Configurações:
   ```
   Name: correspondencias
   Public: OFF (privado)
   File size limit: 5 MB
   Allowed MIME types: image/jpeg, image/png, image/heic
   ```
4. Clique em **"Create bucket"**

### 1.6 Configurar Políticas de Acesso (RLS)

Vá em **SQL Editor** e execute:

```sql
-- Política: Service Role pode fazer upload
CREATE POLICY "Service role can upload"
ON storage.objects
FOR INSERT
TO service_role
WITH CHECK (bucket_id = 'correspondencias');

-- Política: Service Role pode ler
CREATE POLICY "Service role can read"
ON storage.objects
FOR SELECT
TO service_role
USING (bucket_id = 'correspondencias');

-- Política: Usuários autenticados podem ler suas próprias fotos
CREATE POLICY "Authenticated users can read own files"
ON storage.objects
FOR SELECT
TO authenticated
USING (bucket_id = 'correspondencias');
```

### 1.7 Executar Migrations do Prisma

**No seu computador local**, crie `.env.production`:

```env
DATABASE_URL="postgresql://postgres:[SENHA]@db.[PROJETO].supabase.co:5432/postgres"
```

Execute:

```bash
# Carregar env de produção
export $(cat .env.production | xargs)

# Executar migrations
npx prisma migrate deploy

# (Opcional) Popular com dados iniciais
npm run prisma:seed
```

⚠️ **Importante**: Anote credenciais de login criadas pelo seed!

---

## 🌐 Parte 2: Deploy no Vercel

### 2.1 Criar Conta Vercel

1. Acesse https://vercel.com
2. Clique em **"Sign Up"**
3. Conecte com GitHub
4. Autorize Vercel a acessar seus repositórios

### 2.2 Importar Projeto

1. No dashboard Vercel, clique em **"Add New Project"**
2. Clique em **"Import Git Repository"**
3. Selecione seu repositório **Chegou**
4. Autorize se necessário

### 2.3 Configurar Build Settings

**Framework Preset**: Next.js (detectado automaticamente)

**Root Directory**: `app` (se seu Next.js está dentro da pasta app)

**Build Command**:
```bash
npm run prisma:generate && next build
```

**Install Command**:
```bash
npm install
```

**Output Directory**: `.next` (padrão)

### 2.4 Configurar Environment Variables

Clique em **"Environment Variables"** e adicione:

```bash
# Database
DATABASE_URL=postgresql://postgres:[SENHA]@db.[PROJETO].supabase.co:5432/postgres

# JWT Secret - GERE UMA NOVA PARA PRODUÇÃO!
JWT_SECRET=[gere uma key forte - ver abaixo]

# Storage
STORAGE_TYPE=cloud
NEXT_PUBLIC_SUPABASE_URL=https://[SEU-PROJETO].supabase.co
SUPABASE_SERVICE_ROLE_KEY=[sua-service-role-key]

# App URL - deixe vazio por enquanto
NEXT_PUBLIC_APP_URL=

# Node
NODE_ENV=production
```

**Gerar JWT_SECRET seguro**:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 2.5 Deploy!

1. Clique em **"Deploy"**
2. Aguarde ~3-5 minutos
3. ✅ Se tudo correr bem, você verá **"Congratulations!"**

### 2.6 Configurar URL do App

1. Copie a URL do deploy (ex: `https://chegou-abc123.vercel.app`)
2. Volte em **Settings** > **Environment Variables**
3. Edite `NEXT_PUBLIC_APP_URL` e cole a URL
4. Clique em **Save**
5. Vá em **Deployments** > clique nos 3 pontinhos na última build > **"Redeploy"**

---

## ✅ Parte 3: Validação e Testes

### 3.1 Testar Funcionalidades Críticas

**URL**: `https://seu-app.vercel.app`

#### 1. Autenticação
```
URL: /login
Email: zelador@chegou.com
Senha: zelador123
```

- [ ] Login funciona
- [ ] Redirecionamento para home
- [ ] Logout funciona

#### 2. Correspondências
- [ ] Página home carrega lista
- [ ] Modal de foto abre
- [ ] Filtros funcionam (Todos/Pendente/Retirado)

#### 3. Nova Correspondência
- [ ] Câmera abre e captura foto
- [ ] Busca de morador funciona
- [ ] **Upload de foto para Supabase funciona** ⚠️ CRÍTICO
- [ ] Correspondência é criada no banco
- [ ] Foto é acessível via URL

#### 4. Moradores
- [ ] Lista carrega
- [ ] Busca funciona
- [ ] Cadastro funciona

#### 5. Dashboard
- [ ] Métricas carregam
- [ ] Cálculos estão corretos

### 3.2 Verificar Logs

**No Vercel**:
1. Vá em **Deployments** > clique na última > **"Function Logs"**
2. Procure por erros (linhas em vermelho)
3. Erros comuns:
   - Conexão com database
   - Upload para Supabase
   - Variáveis de ambiente faltando

**No Supabase**:
1. Vá em **Storage** > `correspondencias`
2. Verifique se as fotos estão sendo salvas

### 3.3 Monitorar Performance

**Vercel Analytics**:
1. Vá em **Analytics**
2. Verifique:
   - Core Web Vitals (deve estar verde)
   - Response Time (< 1s ideal)
   - Error Rate (deve ser 0%)

---

## 🔒 Parte 4: Segurança em Produção

### 4.1 Checklist de Segurança

- [ ] `JWT_SECRET` diferente de dev e com 32+ caracteres
- [ ] HTTPS habilitado (automático na Vercel)
- [ ] `service_role` key do Supabase não exposta no frontend
- [ ] Database tem firewall (automático no Supabase)
- [ ] Bucket de storage é privado
- [ ] Variáveis de ambiente configuradas corretamente
- [ ] `.env.local` NÃO commitado no Git

### 4.2 Configurar CORS (se necessário)

Se tiver problemas de CORS, adicione em `next.config.js`:

```javascript
module.exports = {
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: 'https://seu-dominio.com' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,POST,PUT,DELETE,PATCH,OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Authorization, Content-Type' },
        ],
      },
    ]
  },
}
```

---

## 📊 Parte 5: Monitoramento e Manutenção

### 5.1 Configurar Alertas

**Vercel**:
1. Vá em **Settings** > **Notifications**
2. Ative:
   - Deployment failures
   - High error rate
   - High response time

**Supabase**:
1. Vá em **Settings** > **Alerts**
2. Configure:
   - Database CPU > 80%
   - Storage > 400MB (80% do free tier)

### 5.2 Backup do Banco

Supabase faz backup automático diário, mas para garantir:

```bash
# Backup manual
pg_dump $DATABASE_URL > backup-$(date +%Y%m%d).sql

# Ou use a UI do Supabase:
# Settings > Database > Database Backups
```

Recomendação: Backup semanal manual.

### 5.3 Atualizar Dependências

```bash
# Mensalmente
npm outdated
npm update
npm run build  # Testar localmente
git commit -am "chore: update dependencies"
git push  # Auto-deploy na Vercel
```

---

## 💬 Parte 6: Ativar WhatsApp Real (Opcional)

### 6.1 Preparar Número WhatsApp

- Use número exclusivo (não use pessoal!)
- Opções:
  - Comprar chip novo
  - WhatsApp Business API (pago)
  - Usar número de teste

### 6.2 Instalar Baileys

```bash
npm install @whiskeysockets/baileys
```

### 6.3 Ativar em Produção

1. Edite `lib/whatsapp.ts`:
   - Descomente o código de produção
   - Comente o modo dev (console.log)

2. Adicione variável no Vercel:
   ```
   WHATSAPP_SESSION_PATH=/tmp/whatsapp-session
   ```

3. **Primeira conexão** (local, conectado ao DB de produção):
   ```bash
   # Conectar ao DB de produção
   export DATABASE_URL="..."

   # Criar script de conexão
   node scripts/connect-whatsapp.js

   # Vai mostrar QR Code - escaneie com WhatsApp
   ```

4. Deploy:
   ```bash
   git commit -am "feat: ativar WhatsApp em produção"
   git push
   ```

⚠️ **Importante**: Sessão do WhatsApp expira. Configure cron job para reconectar.

---

## 🎯 Parte 7: Domínio Personalizado (Opcional)

### 7.1 Comprar Domínio

- Registro.br (Brasil): ~R$ 40/ano
- GoDaddy, Namecheap: $10-15/ano
- Sugestões: `chegou.app`, `meuchegou.com.br`

### 7.2 Configurar no Vercel

1. Vá em **Settings** > **Domains**
2. Clique em **"Add Domain"**
3. Digite seu domínio (ex: `chegou.app`)
4. Siga instruções para configurar DNS:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21

   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```
5. Aguarde propagação (até 48h, geralmente < 1h)
6. ✅ Certificado SSL automático

### 7.3 Atualizar Variáveis

Atualize `NEXT_PUBLIC_APP_URL`:
```
NEXT_PUBLIC_APP_URL=https://chegou.app
```

Redeploy na Vercel.

---

## 💰 Custos Mensais Estimados

| Serviço | Tier | Custo |
|---------|------|-------|
| Vercel | Hobby (Free) | R$ 0 |
| Supabase | Free (500MB DB, 1GB storage) | R$ 0 |
| Domínio | Registro.br | ~R$ 3,50/mês (R$ 40/ano) |
| WhatsApp Business API | Twilio/360Dialog (opcional) | R$ 200-500/mês |
| **Total MVP (sem WhatsApp Business API)** | | **R$ 0-50/mês** |

**Para escalar**:
- Vercel Pro: $20/mês (~R$ 100)
- Supabase Pro: $25/mês (~R$ 125)
- WhatsApp Business API: R$ 200-500/mês

---

## 🐛 Troubleshooting Cloud

### Erro: "Cannot connect to database"

**Verificar**:
```bash
# Testar conexão local
psql $DATABASE_URL
```

**Solução**:
- Verificar `DATABASE_URL` no Vercel
- Verificar se IP está bloqueado no Supabase
- Verificar senha correta

### Erro: "Prisma Client not found"

**Solução**:
- Build command deve incluir `prisma generate`
- Redeploy no Vercel

### Erro: Upload de foto falha (403)

**Verificar**:
1. `SUPABASE_SERVICE_ROLE_KEY` está correta
2. Políticas RLS do bucket estão configuradas
3. Variável `STORAGE_TYPE=cloud`

**Testar**:
```bash
# No console do navegador (F12)
console.log(process.env.NEXT_PUBLIC_SUPABASE_URL)
```

### Função timeout (10s Vercel Free)

**Problema**: Upload ou processamento demora muito

**Soluções**:
1. Otimizar queries do Prisma
2. Reduzir tamanho máximo de upload
3. Upgrade para Vercel Pro (60s timeout)

---

## ✅ Checklist Final de Deploy

- [ ] Supabase configurado (Database + Storage + RLS)
- [ ] Migrations executadas no banco de produção
- [ ] Vercel configurado com todas env vars
- [ ] Deploy realizado com sucesso
- [ ] Todas as páginas carregam sem erro
- [ ] Autenticação funciona
- [ ] Upload de fotos funciona e salva no Supabase
- [ ] CRUD de moradores funciona
- [ ] Dashboard carrega métricas
- [ ] Mobile responsivo testado
- [ ] Sem erros no console do navegador
- [ ] Logs do Vercel sem erros críticos
- [ ] SSL certificado válido (cadeado verde)
- [ ] Performance > 80 no Lighthouse
- [ ] Backup do banco configurado
- [ ] Monitoramento ativo (alertas)

---

## 🎉 Deploy Completo!

Parabéns! Seu sistema CHEGOU está no ar!

### Próximos Passos

1. **Validar com usuários reais**
   - Convide síndicos/zeladores para testar
   - Colete feedback

2. **Analytics** (opcional)
   - Vercel Analytics (built-in)
   - Google Analytics

3. **Marketing**
   - Criar landing page
   - Google Ads
   - Conteúdo (blog, vídeos)

4. **Evoluir produto**
   - Implementar features do roadmap
   - Coletar métricas de uso
   - Iterar com base em feedback

---

## 📚 Documentação Relacionada

- **[SETUP_LOCAL.md](SETUP_LOCAL.md)** - Setup local completo
- **[README.md](README.md)** - Guia de desenvolvimento
- **[../README.md](../README.md)** - Overview do projeto
- **[../docs/](../docs/)** - Documentação de negócio

---

**Precisa de ajuda?** Abra uma issue no GitHub ou consulte a documentação.

**Seu CHEGOU está no ar! 🚀📬**
