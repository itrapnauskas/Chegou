import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyToken } from '@/lib/auth'
import { z } from 'zod'

const moradorSchema = z.object({
  nome: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  apartamento: z.string().min(1, 'Apartamento é obrigatório'),
  telefone: z.string().regex(/^\+55\d{10,11}$/, 'Telefone inválido (formato: +5511999999999)'),
  telefone2: z.string().regex(/^\+55\d{10,11}$/).optional(),
  email: z.string().email().optional(),
})

// GET /api/moradores - List all moradores
export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    if (!authHeader) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
    }

    const token = authHeader.substring(7)
    const user = verifyToken(token)

    const moradores = await prisma.morador.findMany({
      where: {
        condominioId: user.condominioId,
        ativo: true,
      },
      orderBy: { apartamento: 'asc' },
    })

    return NextResponse.json({ success: true, moradores })
  } catch (error) {
    console.error('Error fetching moradores:', error)
    return NextResponse.json({ error: 'Erro ao buscar moradores' }, { status: 500 })
  }
}

// POST /api/moradores - Create new morador
export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    if (!authHeader) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
    }

    const token = authHeader.substring(7)
    const user = verifyToken(token)

    const body = await request.json()
    const validated = moradorSchema.parse(body)

    // Check if apartamento already exists
    const existing = await prisma.morador.findFirst({
      where: {
        condominioId: user.condominioId,
        apartamento: validated.apartamento,
      },
    })

    if (existing) {
      return NextResponse.json(
        { error: 'Apartamento já cadastrado' },
        { status: 400 }
      )
    }

    const morador = await prisma.morador.create({
      data: {
        ...validated,
        condominioId: user.condominioId,
      },
    })

    return NextResponse.json({ success: true, morador }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 })
    }
    console.error('Error creating morador:', error)
    return NextResponse.json({ error: 'Erro ao criar morador' }, { status: 500 })
  }
}
