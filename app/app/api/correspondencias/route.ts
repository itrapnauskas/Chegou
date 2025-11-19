import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyToken } from '@/lib/auth'
import { z } from 'zod'
import crypto from 'crypto'

const correspondenciaSchema = z.object({
  moradorId: z.string().cuid(),
  fotoUrl: z.string().url(),
})

// GET /api/correspondencias?status=PENDENTE
export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    if (!authHeader) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
    }

    const token = authHeader.substring(7)
    const user = verifyToken(token)

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status') as 'PENDENTE' | 'RETIRADA' | null

    const where: any = {
      condominioId: user.condominioId,
    }

    if (status) {
      where.status = status
    }

    const correspondencias = await prisma.correspondencia.findMany({
      where,
      include: {
        morador: {
          select: {
            id: true,
            nome: true,
            apartamento: true,
          },
        },
      },
      orderBy: { criadoEm: 'desc' },
      take: 50,
    })

    return NextResponse.json({ success: true, correspondencias })
  } catch (error) {
    console.error('Error fetching correspondencias:', error)
    return NextResponse.json({ error: 'Erro ao buscar correspondências' }, { status: 500 })
  }
}

// POST /api/correspondencias - Create new correspondencia
export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    if (!authHeader) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
    }

    const token = authHeader.substring(7)
    const user = verifyToken(token)

    const body = await request.json()
    const validated = correspondenciaSchema.parse(body)

    // Verify morador exists and belongs to same condominio
    const morador = await prisma.morador.findFirst({
      where: {
        id: validated.moradorId,
        condominioId: user.condominioId,
        ativo: true,
      },
    })

    if (!morador) {
      return NextResponse.json({ error: 'Morador não encontrado' }, { status: 404 })
    }

    // Generate unique hash for public photo link
    const fotoHash = crypto.randomBytes(32).toString('hex')

    const correspondencia = await prisma.correspondencia.create({
      data: {
        fotoUrl: validated.fotoUrl,
        fotoHash,
        moradorId: validated.moradorId,
        condominioId: user.condominioId,
        registradoPorId: user.userId,
        status: 'PENDENTE',
        notificacaoStatus: 'PENDENTE',
      },
      include: {
        morador: true,
      },
    })

    // TODO: Trigger WhatsApp notification (Sprint 3)
    // await enviarWhatsApp(correspondencia.id)

    return NextResponse.json({ success: true, correspondencia }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 })
    }
    console.error('Error creating correspondencia:', error)
    return NextResponse.json({ error: 'Erro ao criar correspondência' }, { status: 500 })
  }
}
