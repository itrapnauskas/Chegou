import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyToken } from '@/lib/auth'

// GET /api/moradores/busca?q=301
export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    if (!authHeader) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
    }

    const token = authHeader.substring(7)
    const user = verifyToken(token)

    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q')

    if (!query || query.length < 2) {
      return NextResponse.json({ moradores: [] })
    }

    const moradores = await prisma.morador.findMany({
      where: {
        condominioId: user.condominioId,
        ativo: true,
        OR: [
          { apartamento: { contains: query, mode: 'insensitive' } },
          { nome: { contains: query, mode: 'insensitive' } },
        ],
      },
      take: 5,
      orderBy: { apartamento: 'asc' },
    })

    return NextResponse.json({ success: true, moradores })
  } catch (error) {
    console.error('Error searching moradores:', error)
    return NextResponse.json({ error: 'Erro na busca' }, { status: 500 })
  }
}
