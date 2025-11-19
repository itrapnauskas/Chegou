import { PrismaClient } from '@prisma/client'
import { hashPassword } from '../lib/auth'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...')

  // 1. Criar Condomínio
  console.log('📍 Criando condomínio...')
  const condominio = await prisma.condominio.upsert({
    where: { id: 'cond-demo-001' },
    update: {},
    create: {
      id: 'cond-demo-001',
      nome: 'Condomínio Jardim das Flores',
      endereco: 'Rua das Acácias, 123 - São Paulo, SP',
    },
  })
  console.log(`✅ Condomínio criado: ${condominio.nome}`)

  // 2. Criar Usuário (Zelador)
  console.log('👤 Criando usuário zelador...')
  const senhaHash = await hashPassword('zelador123')
  const usuario = await prisma.usuario.upsert({
    where: { email: 'zelador@chegou.com' },
    update: {},
    create: {
      email: 'zelador@chegou.com',
      senha: senhaHash,
      nome: 'João da Silva',
      role: 'ZELADOR',
      condominioId: condominio.id,
    },
  })
  console.log(`✅ Usuário criado: ${usuario.email}`)

  // 3. Criar Moradores
  console.log('🏠 Criando moradores...')
  const moradoresData = [
    {
      apartamento: '101',
      nome: 'Maria Santos',
      telefone: '(11) 98765-4321',
    },
    {
      apartamento: '102',
      nome: 'Carlos Oliveira',
      telefone: '(11) 97654-3210',
    },
    {
      apartamento: '201',
      nome: 'Ana Paula Costa',
      telefone: '(11) 96543-2109',
    },
    {
      apartamento: '202',
      nome: 'Roberto Lima',
      telefone: '(11) 95432-1098',
    },
    {
      apartamento: '301',
      nome: 'Fernanda Rodrigues',
      telefone: '(11) 94321-0987',
    },
    {
      apartamento: '302',
      nome: 'Paulo Mendes',
      telefone: '(11) 93210-9876',
    },
    {
      apartamento: '401',
      nome: 'Juliana Alves',
      telefone: '(11) 92109-8765',
    },
    {
      apartamento: '402',
      nome: 'Ricardo Souza',
      telefone: '(11) 91098-7654',
    },
  ]

  const moradores = []
  for (const moradorData of moradoresData) {
    const morador = await prisma.morador.upsert({
      where: {
        condominioId_apartamento: {
          condominioId: condominio.id,
          apartamento: moradorData.apartamento,
        },
      },
      update: {},
      create: {
        ...moradorData,
        condominioId: condominio.id,
        ativo: true,
      },
    })
    moradores.push(morador)
  }
  console.log(`✅ ${moradores.length} moradores criados`)

  // 4. Criar Correspondências de Exemplo
  console.log('📦 Criando correspondências de exemplo...')
  const correspondenciasData = [
    {
      moradorId: moradores[0].id, // Maria Santos - Apt 101
      status: 'PENDENTE' as const,
      fotoUrl: 'https://placehold.co/800x600/green/white?text=Correspondência+101',
      fotoHash: 'hash-101-pendente',
      criadoEm: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 horas atrás
    },
    {
      moradorId: moradores[1].id, // Carlos - Apt 102
      status: 'RETIRADO' as const,
      fotoUrl: 'https://placehold.co/800x600/blue/white?text=Correspondência+102',
      fotoHash: 'hash-102-retirado',
      criadoEm: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 dia atrás
      retiradoEm: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 horas atrás
      notificadoEm: new Date(Date.now() - 24 * 60 * 60 * 1000),
      notificacaoStatus: 'ENVIADA' as const,
    },
    {
      moradorId: moradores[2].id, // Ana Paula - Apt 201
      status: 'PENDENTE' as const,
      fotoUrl: 'https://placehold.co/800x600/orange/white?text=Correspondência+201',
      fotoHash: 'hash-201-pendente',
      criadoEm: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 horas atrás
      notificadoEm: new Date(Date.now() - 5 * 60 * 60 * 1000),
      notificacaoStatus: 'ENVIADA' as const,
    },
    {
      moradorId: moradores[3].id, // Roberto - Apt 202
      status: 'RETIRADO' as const,
      fotoUrl: 'https://placehold.co/800x600/purple/white?text=Correspondência+202',
      fotoHash: 'hash-202-retirado',
      criadoEm: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 dias atrás
      retiradoEm: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 dias atrás
      notificadoEm: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      notificacaoStatus: 'ENVIADA' as const,
    },
    {
      moradorId: moradores[4].id, // Fernanda - Apt 301
      status: 'PENDENTE' as const,
      fotoUrl: 'https://placehold.co/800x600/red/white?text=Correspondência+301',
      fotoHash: 'hash-301-pendente',
      criadoEm: new Date(Date.now() - 30 * 60 * 1000), // 30 minutos atrás
      notificadoEm: new Date(Date.now() - 30 * 60 * 1000),
      notificacaoStatus: 'ENVIADA' as const,
    },
  ]

  for (const correspData of correspondenciasData) {
    await prisma.correspondencia.upsert({
      where: { fotoHash: correspData.fotoHash },
      update: {},
      create: {
        ...correspData,
        condominioId: condominio.id,
      },
    })
  }
  console.log(`✅ ${correspondenciasData.length} correspondências criadas`)

  console.log('\n✨ Seed concluído com sucesso!\n')
  console.log('📝 Credenciais de acesso:')
  console.log('   Email: zelador@chegou.com')
  console.log('   Senha: zelador123\n')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('❌ Erro durante o seed:', e)
    await prisma.$disconnect()
    process.exit(1)
  })
