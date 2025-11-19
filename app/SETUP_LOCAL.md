# 🏠 CHEGOU - Setup Local Completo

Guia completo para rodar o sistema **100% localmente**, sem depender de serviços externos (Supabase, Vercel, etc).

---

## 📋 Pré-requisitos

### Obrigatórios

- **Node.js 18+** - [Download](https://nodejs.org)
- **Docker Desktop** - [Download](https://www.docker.com/products/docker-desktop)
  - Inclui Docker e Docker Compose
- **Git** - [Download](https://git-scm.com)

### Verificar instalação

```bash
node -v        # v18.0.0 ou superior
npm -v         # 9.0.0 ou superior
docker -v      # Docker version 20.0.0 ou superior
docker-compose -v  # v2.0.0 ou superior
git --version  # git version 2.0.0 ou superior
```

---

## 🚀 Setup Automático (Recomendado)

Use o script de setup automático que configurou TUDO para você:

```bash
# 1. Entre na pasta do projeto
cd app

# 2. Execute o script de setup
chmod +x setup.sh
./setup.sh
```

O script vai:
- ✅ Criar arquivo `.env.local` com configurações locais
- ✅ Instalar dependências npm
- ✅ Iniciar PostgreSQL no Docker
- ✅ Gerar Prisma Client
- ✅ Executar migrations do banco
- ✅ Popular banco com dados de teste
- ✅ Criar diretórios de upload

**Tempo estimado**: 3-5 minutos

Depois do setup:

```bash
# Iniciar servidor de desenvolvimento
npm run dev
```

Acesse: http://localhost:3000

---

## 🔧 Setup Manual (Passo a Passo)

Se preferir fazer manualmente ou se o script automático falhar:

### 1. Configurar Variáveis de Ambiente

```bash
# Copiar exemplo de configuração local
cp .env.local.example .env.local
```

Edite `.env.local` se necessário (valores padrão já funcionam):

```env
DATABASE_URL="postgresql://chegou:chegou123@localhost:5432/chegou_dev"
JWT_SECRET="super-secret-key-change-in-production-min-32-chars"
STORAGE_TYPE="local"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NODE_ENV="development"
```

### 2. Instalar Dependências

```bash
npm install
```

### 3. Iniciar Banco de Dados PostgreSQL

```bash
# Iniciar container Docker
docker-compose up -d postgres

# Verificar se está rodando
docker-compose ps

# Ver logs (opcional)
docker-compose logs -f postgres
```

### 4. Configurar Banco de Dados

```bash
# Gerar Prisma Client
npx prisma generate

# Executar migrations (criar tabelas)
npx prisma migrate dev --name init
```

### 5. Popular Banco com Dados de Teste (Opcional)

```bash
npm run prisma:seed
```

Isso cria:
- 1 condomínio: "Condomínio Jardim das Flores"
- 1 usuário zelador: `zelador@chegou.com` / `zelador123`
- 8 moradores (Apt 101-402)
- 5 correspondências de exemplo

### 6. Criar Diretórios de Upload

```bash
mkdir -p public/uploads/condominios
chmod -R 755 public/uploads
```

### 7. Iniciar Servidor

```bash
npm run dev
```

Acesse: http://localhost:3000

---

## 🎯 Testando o Sistema Local

### 1. Fazer Login

```
URL: http://localhost:3000/login
Email: zelador@chegou.com
Senha: zelador123
```

### 2. Testar Funcionalidades

**Home - Lista de Correspondências**
- ✅ Visualizar correspondências existentes (5 de exemplo)
- ✅ Filtrar por status (Pendente/Retirado)
- ✅ Ver foto em modal
- ✅ Marcar como retirado

**Nova Correspondência**
- ✅ Capturar foto (webcam ou upload)
- ✅ Selecionar morador
- ✅ Salvar (upload local em `public/uploads/`)
- ✅ Notificação WhatsApp (modo mock - console.log)

**Moradores**
- ✅ Listar moradores
- ✅ Buscar morador
- ✅ Cadastrar novo morador

**Dashboard**
- ✅ Ver métricas
- ✅ Taxa de retirada
- ✅ Tempo médio

### 3. Verificar Upload de Fotos

Após registrar uma correspondência, a foto estará salva em:

```
public/uploads/condominios/{condominioId}/correspondencias/YYYY/MM/timestamp-hash.jpg
```

Você pode acessar diretamente no navegador:
```
http://localhost:3000/uploads/condominios/...
```

### 4. Verificar WhatsApp (Mock)

As notificações WhatsApp aparecem no console do servidor:

```bash
# Terminal onde você executou 'npm run dev'
📱 WhatsApp (DEV MODE):
To: (11) 98765-4321
Message: 📬 *CHEGOU Correspondência!*
...
```

---

## 🛠️ Ferramentas de Desenvolvimento

### Prisma Studio (GUI do Banco)

Interface visual para explorar e editar dados:

```bash
npm run prisma:studio
```

Acesse: http://localhost:5555

### pgAdmin (PostgreSQL GUI)

Interface web para gerenciar PostgreSQL:

```bash
# Iniciar pgAdmin
docker-compose --profile tools up -d pgadmin
```

Acesse: http://localhost:5050

**Login:**
- Email: `admin@chegou.local`
- Senha: `admin123`

**Conectar ao PostgreSQL:**
1. Clique em "Add New Server"
2. Name: `CHEGOU Local`
3. Connection:
   - Host: `postgres` (dentro do Docker) ou `localhost` (fora do Docker)
   - Port: `5432`
   - Database: `chegou_dev`
   - Username: `chegou`
   - Password: `chegou123`

---

## 📦 Comandos Úteis

### NPM Scripts

```bash
npm run dev              # Iniciar servidor de desenvolvimento
npm run build            # Build para produção
npm run start            # Iniciar servidor de produção
npm run lint             # Executar linter

npm run prisma:generate  # Gerar Prisma Client
npm run prisma:migrate   # Executar migrations
npm run prisma:seed      # Popular banco com dados de teste
npm run prisma:studio    # Abrir Prisma Studio
```

### Docker Compose

```bash
docker-compose up -d              # Iniciar containers em background
docker-compose down               # Parar e remover containers
docker-compose ps                 # Ver status dos containers
docker-compose logs -f postgres   # Ver logs do PostgreSQL
docker-compose restart postgres   # Reiniciar PostgreSQL

# Limpar tudo (⚠️ APAGA DADOS!)
docker-compose down -v            # Remove containers e volumes
```

---

## 🐛 Troubleshooting

### Erro: "Cannot connect to database"

**Problema**: Aplicação não consegue conectar ao PostgreSQL

**Solução**:
```bash
# 1. Verificar se PostgreSQL está rodando
docker-compose ps

# 2. Ver logs
docker-compose logs postgres

# 3. Reiniciar container
docker-compose restart postgres

# 4. Verificar DATABASE_URL no .env.local
cat .env.local | grep DATABASE_URL
```

### Erro: "Prisma Client not generated"

**Problema**: Prisma Client não foi gerado

**Solução**:
```bash
npx prisma generate
```

### Erro: "Port 5432 already in use"

**Problema**: Você já tem PostgreSQL rodando localmente

**Solução 1 - Parar PostgreSQL local**:
```bash
# macOS/Linux
sudo service postgresql stop

# Windows
# Parar serviço PostgreSQL no Gerenciador de Tarefas
```

**Solução 2 - Mudar porta no docker-compose.yml**:
```yaml
services:
  postgres:
    ports:
      - '5433:5432'  # Mudar de 5432 para 5433
```

E atualizar `.env.local`:
```env
DATABASE_URL="postgresql://chegou:chegou123@localhost:5433/chegou_dev"
```

### Erro: "Permission denied" ao criar uploads

**Problema**: Permissões incorretas na pasta public/uploads

**Solução**:
```bash
sudo chmod -R 755 public/uploads
sudo chown -R $USER:$USER public/uploads
```

### Erro: "Module not found"

**Problema**: Dependências não instaladas ou desatualizadas

**Solução**:
```bash
rm -rf node_modules package-lock.json
npm install
npx prisma generate
```

### Erro: Upload de foto falha

**Problema 1**: Variável `STORAGE_TYPE` não configurada

**Solução**:
```bash
# Verificar .env.local
cat .env.local | grep STORAGE_TYPE

# Deve ter:
STORAGE_TYPE="local"
```

**Problema 2**: Diretório de uploads não existe

**Solução**:
```bash
mkdir -p public/uploads/condominios
chmod -R 755 public/uploads
```

### Erro: Prisma migrate falha

**Problema**: Migrations com erro

**Solução - Reset completo** (⚠️ APAGA DADOS!):
```bash
# Parar containers
docker-compose down -v

# Iniciar novamente
docker-compose up -d postgres

# Aguardar PostgreSQL iniciar
sleep 5

# Executar migrations
npx prisma migrate dev --name init

# Popular novamente
npm run prisma:seed
```

---

## 🔄 Resetar Ambiente Local

Se precisar começar do zero (⚠️ **APAGA TODOS OS DADOS**):

```bash
# 1. Parar e limpar Docker
docker-compose down -v

# 2. Remover uploads
rm -rf public/uploads/*

# 3. Limpar node_modules (opcional)
rm -rf node_modules package-lock.json

# 4. Executar setup novamente
./setup.sh
```

---

## 📊 Estrutura de Dados Local

### Banco de Dados PostgreSQL

**Container**: `chegou-postgres`
**Porta**: `5432`
**Credenciais**:
- User: `chegou`
- Password: `chegou123`
- Database: `chegou_dev`

**Conexão direta**:
```bash
docker-compose exec postgres psql -U chegou -d chegou_dev
```

**Tabelas criadas**:
- `Condominio`
- `Usuario`
- `Morador`
- `Correspondencia`
- `LogNotificacao`

### Armazenamento de Fotos

**Diretório**: `public/uploads/`

**Estrutura**:
```
public/uploads/
└── condominios/
    └── {condominioId}/
        └── correspondencias/
            └── {YYYY}/
                └── {MM}/
                    └── {timestamp}-{hash}.jpg
```

**Exemplo**:
```
public/uploads/condominios/cond-demo-001/correspondencias/2024/11/1700000000000-a1b2c3d4.jpg
```

**URL pública**:
```
http://localhost:3000/uploads/condominios/cond-demo-001/correspondencias/2024/11/1700000000000-a1b2c3d4.jpg
```

---

## ⚙️ Configurações de Desenvolvimento

### Modo de Armazenamento

**Local** (padrão para dev):
```env
STORAGE_TYPE="local"
```

Fotos salvas em: `public/uploads/`

**Cloud** (para produção):
```env
STORAGE_TYPE="cloud"
NEXT_PUBLIC_SUPABASE_URL="https://seu-projeto.supabase.co"
SUPABASE_SERVICE_ROLE_KEY="sua-key"
```

Fotos salvas em: Supabase Storage

### WhatsApp

**Modo Mock** (padrão para dev):
- Mensagens aparecem no console
- Nenhum WhatsApp real é enviado

**Modo Real** (para produção):
- Ver `app/lib/whatsapp.ts`
- Descomentar código Baileys
- Instalar: `npm install @whiskeysockets/baileys`
- Escanear QR Code na primeira vez

---

## 🚀 Próximos Passos

Ambiente local funcionando? Próximos passos:

1. **Testar todas as funcionalidades** localmente
2. **Fazer ajustes** e melhorias
3. **Preparar para deploy** em produção
   - Ver: `DEPLOY_CLOUD.md`

---

## 📚 Documentação Relacionada

- **[README.md](../README.md)** - Overview do projeto
- **[app/README.md](README.md)** - Guia de desenvolvimento
- **[DEPLOY_CLOUD.md](DEPLOY_CLOUD.md)** - Deploy em produção (Vercel + Supabase)

---

## 💡 Dicas

### Performance Local

- Use `npm run dev` (desenvolvimento com hot-reload)
- Build de produção é mais rápido: `npm run build && npm run start`

### Backup de Dados Locais

```bash
# Exportar banco de dados
docker-compose exec postgres pg_dump -U chegou chegou_dev > backup.sql

# Importar banco de dados
docker-compose exec -T postgres psql -U chegou -d chegou_dev < backup.sql
```

### Variáveis de Ambiente

- `.env.local` - Configuração local (não commitada)
- `.env.local.example` - Template (commitado no Git)

**NUNCA** commite `.env.local` com credenciais reais!

---

**Dúvidas?** Consulte a documentação completa ou abra uma issue no GitHub.

**Ambiente pronto?** Bom desenvolvimento! 🚀
