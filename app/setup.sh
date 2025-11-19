#!/bin/bash

# =====================================
# CHEGOU - Setup Local Completo
# =====================================
# Este script configura o ambiente local de desenvolvimento do zero

set -e  # Exit on error

echo "🚀 CHEGOU - Configuração Local Automática"
echo "=========================================="
echo ""

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker não encontrado!"
    echo "Instale Docker Desktop: https://www.docker.com/products/docker-desktop"
    exit 1
fi

echo "✅ Docker encontrado"

# Check if Docker Compose is available
if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null; then
    echo "❌ Docker Compose não encontrado!"
    exit 1
fi

echo "✅ Docker Compose encontrado"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não encontrado!"
    echo "Instale Node.js 18+: https://nodejs.org"
    exit 1
fi

echo "✅ Node.js $(node -v) encontrado"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm não encontrado!"
    exit 1
fi

echo "✅ npm $(npm -v) encontrado"
echo ""

# =====================================
# STEP 1: Setup Environment
# =====================================
echo "📝 PASSO 1: Configurando variáveis de ambiente..."

if [ ! -f .env.local ]; then
    if [ -f .env.local.example ]; then
        cp .env.local.example .env.local
        echo "   ✅ Arquivo .env.local criado a partir do exemplo"
    else
        echo "   ❌ Arquivo .env.local.example não encontrado!"
        exit 1
    fi
else
    echo "   ℹ️  .env.local já existe, mantendo configuração atual"
fi

# =====================================
# STEP 2: Install Dependencies
# =====================================
echo ""
echo "📦 PASSO 2: Instalando dependências..."

if [ ! -d "node_modules" ]; then
    npm install
    echo "   ✅ Dependências instaladas"
else
    echo "   ℹ️  node_modules já existe"
    read -p "   Reinstalar dependências? (s/N): " reinstall
    if [[ $reinstall =~ ^[Ss]$ ]]; then
        npm install
        echo "   ✅ Dependências reinstaladas"
    fi
fi

# =====================================
# STEP 3: Start Docker Containers
# =====================================
echo ""
echo "🐳 PASSO 3: Iniciando banco de dados PostgreSQL..."

# Stop existing containers if any
docker-compose down 2>/dev/null || true

# Start PostgreSQL
docker-compose up -d postgres

echo "   ⏳ Aguardando PostgreSQL ficar pronto..."
sleep 5

# Wait for PostgreSQL to be healthy
timeout=30
counter=0
until docker-compose exec -T postgres pg_isready -U chegou &>/dev/null || [ $counter -eq $timeout ]; do
    sleep 1
    counter=$((counter + 1))
    echo -n "."
done

echo ""

if [ $counter -eq $timeout ]; then
    echo "   ❌ PostgreSQL não ficou pronto a tempo"
    echo "   Logs do container:"
    docker-compose logs postgres
    exit 1
fi

echo "   ✅ PostgreSQL pronto!"

# =====================================
# STEP 4: Setup Database
# =====================================
echo ""
echo "🗄️  PASSO 4: Configurando banco de dados..."

# Generate Prisma Client
echo "   → Gerando Prisma Client..."
npx prisma generate

# Run migrations
echo "   → Executando migrations..."
npx prisma migrate deploy || npx prisma migrate dev --name init

echo "   ✅ Banco de dados configurado"

# =====================================
# STEP 5: Seed Database
# =====================================
echo ""
read -p "🌱 PASSO 5: Popular banco com dados de teste? (S/n): " seed_db

if [[ ! $seed_db =~ ^[Nn]$ ]]; then
    npm run prisma:seed
    echo "   ✅ Dados de teste inseridos"
    echo ""
    echo "   📋 Credenciais de login:"
    echo "      Email: zelador@chegou.com"
    echo "      Senha: zelador123"
else
    echo "   ⏭️  Pulando seed"
fi

# =====================================
# STEP 6: Create Upload Directory
# =====================================
echo ""
echo "📁 PASSO 6: Criando diretórios de upload..."

mkdir -p public/uploads/condominios
chmod -R 755 public/uploads

echo "   ✅ Diretórios criados"

# =====================================
# SUCCESS!
# =====================================
echo ""
echo "✅ =========================================="
echo "✅  CONFIGURAÇÃO COMPLETA!"
echo "✅ =========================================="
echo ""
echo "🚀 Para iniciar o servidor de desenvolvimento:"
echo "   npm run dev"
echo ""
echo "🌐 Acesse a aplicação em:"
echo "   http://localhost:3000"
echo ""
echo "📊 Ferramentas disponíveis:"
echo "   • Prisma Studio (GUI do banco): npm run prisma:studio"
echo "   • pgAdmin (GUI PostgreSQL): docker-compose --profile tools up -d pgadmin"
echo "     Acesse em: http://localhost:5050"
echo "     Login: admin@chegou.local / admin123"
echo ""
echo "📚 Documentação:"
echo "   • Setup Local: docs/SETUP_LOCAL.md"
echo "   • Deploy Cloud: docs/DEPLOY_CLOUD.md"
echo ""
