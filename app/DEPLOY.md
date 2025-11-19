# 🚀 Guia Completo de Deploy - CHEGOU

Este guia detalha o processo completo de deploy do sistema CHEGOU em produção usando Vercel + Supabase.

## 📋 Checklist Pré-Deploy

Antes de fazer o deploy, verifique:

- [ ] Código está no GitHub
- [ ] Variáveis de ambiente documentadas
- [ ] Migrations do Prisma testadas
- [ ] Build local funciona (`npm run build`)
- [ ] Todas as features testadas localmente
- [ ] README.md atualizado
- [ ] .env.example atualizado

## 🗄️ Parte 1: Setup do Banco de Dados (Supabase)

### 1.1 Criar Projeto no Supabase

1. Acesse https://supabase.com
2. Clique em "New Project"
3. Preencha:
   - **Name**: CHEGOU-Production
   - **Database Password**: Gere uma senha forte (salve em local seguro!)
   - **Region**: South America (São Paulo) - para menor latência
   - **Pricing Plan**: Free tier (até 500MB, 2GB transferência)
4. Aguarde ~2 minutos para provisionar

### 1.2 Obter Credenciais do Banco

1. Vá em **Settings** > **Database**
2. Em "Connection String", copie a **URI** (Connection String)
3. Formato: `postgresql://postgres:[SUA-SENHA]@db.[SEU-PROJETO].supabase.co:5432/postgres`
4. **Salve esta URL** - você vai precisar!

### 1.3 Obter API Keys

1. Vá em **Settings** > **API**
2. Copie:
   - **Project URL** (exemplo: https://abcdefgh.supabase.co)
   - **service_role key** (secret - não exponha!)
3. **Salve estas chaves**

### 1.4 Configurar Storage

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

5. Configure políticas de acesso (RLS):

```sql
-- Vá em SQL Editor e execute:

-- Política: Service Role pode fazer upload
CREATE POLICY "Service role can upload"
ON storage.objects
FOR INSERT
TO service_role
WITH CHECK (bucket_id = 'correspondencias');

-- Política: Service role pode ler
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

### 1.5 Executar Migrations do Prisma

**No seu computador local:**

1. Crie um arquivo `.env.production`:

```bash
DATABASE_URL="postgresql://postgres:[SENHA]@db.[PROJETO].supabase.co:5432/postgres"
```

2. Execute as migrations:

```bash
# Carregar env de produção
export $(cat .env.production | xargs)

# Executar migrations
npx prisma migrate deploy

# Verificar
npx prisma studio
```

3. **(Opcional)** Popular com dados de exemplo:

```bash
npm run prisma:seed
```

⚠️ **Importante**: Anote as credenciais de login criadas pelo seed!

## 🌐 Parte 2: Deploy do Frontend (Vercel)

### 2.1 Preparar Repositório GitHub

1. Se ainda não fez, faça push do código para o GitHub:

```bash
git add .
git commit -m "feat: MVP completo - pronto para deploy"
git push origin main
```

### 2.2 Criar Projeto no Vercel

1. Acesse https://vercel.com
2. Clique em **"Add New Project"**
3. Clique em **"Import Git Repository"**
4. Selecione seu repositório do GitHub
5. Autorize o Vercel a acessar o repositório

### 2.3 Configurar Build Settings

1. **Framework Preset**: Next.js (detectado automaticamente)
2. **Root Directory**: `app` (se seu Next.js está dentro da pasta app)
3. **Build Command**:
   ```bash
   npm run prisma:generate && next build
   ```
4. **Install Command**:
   ```bash
   npm install
   ```
5. **Output Directory**: `.next` (padrão)

### 2.4 Configurar Variáveis de Ambiente

Clique em **Environment Variables** e adicione:

```bash
# Database
DATABASE_URL=postgresql://postgres:[SENHA]@db.[PROJETO].supabase.co:5432/postgres

# JWT Secret - GERE UMA NOVA PARA PRODUÇÃO!
JWT_SECRET=sua-chave-super-secreta-de-producao-256-bits

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://[SEU-PROJETO].supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...sua-service-role-key

# App URL - deixe vazio por enquanto, vamos preencher depois do deploy
NEXT_PUBLIC_APP_URL=
```

**⚠️ Dica**: Para gerar JWT_SECRET seguro:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 2.5 Deploy!

1. Clique em **Deploy**
2. Aguarde ~3-5 minutos
3. ✅ Se tudo correr bem, você verá "Congratulations!"

### 2.6 Configurar URL do App

1. Copie a URL do deploy (exemplo: `https://chegou-abc123.vercel.app`)
2. Volte em **Settings** > **Environment Variables**
3. Edite `NEXT_PUBLIC_APP_URL` e cole a URL
4. Clique em **Save**
5. Vá em **Deployments** e clique em **"Redeploy"** na última build

## ✅ Parte 3: Validação e Testes em Produção

### 3.1 Testar Funcionalidades Críticas

1. **Autenticação**
   ```
   URL: https://seu-app.vercel.app/login
   Email: zelador@chegou.com
   Senha: zelador123
   ```
   - [ ] Login funciona
   - [ ] Redirecionamento para home
   - [ ] Logout funciona

2. **Correspondências**
   - [ ] Página home carrega lista
   - [ ] Modal de foto abre
   - [ ] Filtros funcionam

3. **Nova Correspondência**
   - [ ] Câmera abre e captura foto
   - [ ] Busca de morador funciona
   - [ ] Upload de foto para Supabase funciona
   - [ ] Correspondência é criada no banco

4. **Moradores**
   - [ ] Lista carrega
   - [ ] Busca funciona
   - [ ] Cadastro funciona

5. **Dashboard**
   - [ ] Métricas carregam
   - [ ] Cálculos estão corretos

### 3.2 Verificar Logs

1. No Vercel, vá em **Deployments** > clique na última > **"Function Logs"**
2. Procure por erros (linhas em vermelho)
3. Comum: erros de conexão com DB ou Supabase

### 3.3 Monitorar Performance

1. Vá em **Analytics** no Vercel
2. Verifique:
   - Core Web Vitals (deve estar verde)
   - Response Time (< 1s ideal)
   - Error Rate (deve ser 0%)

## 🔒 Parte 4: Segurança em Produção

### 4.1 Checklist de Segurança

- [ ] JWT_SECRET diferente de dev
- [ ] HTTPS habilitado (automático na Vercel)
- [ ] Service Role Key do Supabase não exposta no frontend
- [ ] Database tem firewall (automático no Supabase)
- [ ] Bucket de storage é privado
- [ ] CORS configurado corretamente
- [ ] Rate limiting (considere adicionar no futuro)

### 4.2 Configurar CORS (se necessário)

Se você tiver problemas de CORS, adicione em `next.config.js`:

```javascript
module.exports = {
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: 'https://seu-dominio.com' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,POST,PUT,DELETE,OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Authorization, Content-Type' },
        ],
      },
    ]
  },
}
```

## 📊 Parte 5: Monitoramento e Manutenção

### 5.1 Configurar Alertas

**Vercel:**
1. Vá em **Settings** > **Notifications**
2. Ative notificações para:
   - Deployment failures
   - High error rate

**Supabase:**
1. Vá em **Settings** > **Alerts**
2. Configure alertas para:
   - Database CPU > 80%
   - Storage > 80%

### 5.2 Backup do Banco

O Supabase faz backup automático, mas para garantir:

```bash
# Backup manual (executar semanalmente)
pg_dump $DATABASE_URL > backup-$(date +%Y%m%d).sql

# Ou use a ferramenta do Supabase:
# Settings > Database > Database Backups
```

### 5.3 Atualizar Dependências

```bash
# Mensalmente
npm outdated
npm update
npm run build # testar
git commit -am "chore: update dependencies"
git push # auto-deploy na Vercel
```

## 💬 Parte 6: Ativar WhatsApp (Opcional)

### 6.1 Preparar Número

- Use um número exclusivo (não use pessoal!)
- Compre um chip novo ou use WhatsApp Business API

### 6.2 Ativar Baileys em Produção

1. Edite `lib/whatsapp.ts`:
   - Descomente o código de produção
   - Comente o modo dev (console.log)

2. Adicione variável de ambiente no Vercel:
   ```
   WHATSAPP_SESSION_PATH=/tmp/whatsapp-session
   ```

3. **Primeira conexão** (local, conectado ao DB de produção):
   ```bash
   # Conectar ao DB de produção
   export DATABASE_URL="..."

   # Executar script de conexão
   node scripts/connect-whatsapp.js

   # Vai mostrar QR Code - escaneie com WhatsApp
   ```

4. Deploy:
   ```bash
   git commit -am "feat: ativar WhatsApp em produção"
   git push
   ```

⚠️ **Importante**: A sessão do WhatsApp expira. Configure um cron job para reconectar.

## 🎯 Parte 7: Domínio Personalizado (Opcional)

### 7.1 Comprar Domínio

- Sugestões: Registro.br, GoDaddy, Namecheap
- Exemplo: `chegou.app`, `meuchegou.com.br`

### 7.2 Configurar no Vercel

1. Vá em **Settings** > **Domains**
2. Clique em **"Add Domain"**
3. Digite seu domínio (ex: `chegou.app`)
4. Siga as instruções para configurar DNS:
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

Atualize `NEXT_PUBLIC_APP_URL` para seu domínio:
```
NEXT_PUBLIC_APP_URL=https://chegou.app
```

## 📈 Custos Estimados (Mensais)

| Serviço | Tier | Custo |
|---------|------|-------|
| Vercel | Hobby (Free) | R$ 0 |
| Supabase | Free | R$ 0 |
| Domínio (opcional) | Registro.br | ~R$ 40/ano |
| WhatsApp Business API (opcional) | Twilio/360Dialog | R$ 200-500 |
| **Total MVP** | - | **R$ 0-50/mês** |

**Para escalar:**
- Vercel Pro: $20/mês (~R$ 100)
- Supabase Pro: $25/mês (~R$ 125)

## 🐛 Troubleshooting Comum

### Erro: "Cannot connect to database"
- Verifique `DATABASE_URL` no Vercel
- Teste conexão: `psql $DATABASE_URL`

### Erro: "Prisma Client not found"
- Build command deve incluir `prisma generate`
- Redeploy com comando correto

### Erro: Upload de foto falha (403)
- Verifique `SUPABASE_SERVICE_ROLE_KEY`
- Verifique políticas do bucket

### Deploy demora muito (> 10min)
- Verifique se não está instalando dependências desnecessárias
- Use `npm ci` ao invés de `npm install`

### Função timeout (10s Vercel Free)
- Otimize queries do Prisma
- Considere Vercel Pro (60s timeout)

## ✅ Checklist Final

Antes de considerar o deploy completo:

- [ ] Todas as páginas carregam
- [ ] Autenticação funciona
- [ ] CRUD de moradores funciona
- [ ] Registro de correspondências funciona
- [ ] Upload de fotos funciona
- [ ] Dashboard carrega métricas corretas
- [ ] Mobile responsivo
- [ ] Sem erros no console do navegador
- [ ] Logs do Vercel sem erros
- [ ] SSL certificado válido (cadeado verde)
- [ ] Performance > 80 no Lighthouse
- [ ] Backup do banco configurado
- [ ] Monitoramento ativo

## 🎉 Próximos Passos

Deploy concluído! Agora você pode:

1. **Validar com usuários reais**
   - Convide síndicos/zeladores para testar
   - Colete feedback

2. **Configurar analytics** (opcional)
   - Google Analytics
   - Vercel Analytics (built-in)

3. **Marketing**
   - Criar landing page
   - Configurar Google Ads
   - Criar conteúdo (blog, vídeos)

4. **Evoluir produto**
   - Implementar features do roadmap
   - Coletar métricas de uso
   - Iterar com base em feedback

---

**Parabéns! Seu sistema CHEGOU está no ar! 🚀📬**

Para suporte, acesse: [GitHub Issues](seu-repo/issues)
