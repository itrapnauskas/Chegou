import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyToken } from '@/lib/auth'

// PATCH /api/correspondencias/[id]/retirar
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authHeader = request.headers.get('authorization')
    if (!authHeader) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
    }

    const token = authHeader.substring(7)
    const user = verifyToken(token)

    const { id } = await params

    // Verify correspondencia exists and belongs to same condominio
    const correspondencia = await prisma.correspondencia.findFirst({
      where: {
        id,
        condominioId: user.condominioId,
      },
    })

    if (!correspondencia) {
      return NextResponse.json({ error: 'Correspondência não encontrada' }, { status: 404 })
    }

    if (correspondencia.status === 'RETIRADA') {
      return NextResponse.json({ error: 'Correspondência já foi retirada' }, { status: 400 })
    }

    // Mark as retirada
    const updated = await prisma.correspondencia.update({
      where: { id },
      data: {
        status: 'RETIRADA',
        retiradoEm: new Date(),
      },
      include: {
        morador: true,
      },
    })

    return NextResponse.json({ success: true, correspondencia: updated })
  } catch (error) {
    console.error('Error marking correspondencia as retirada:', error)
    return NextResponse.json({ error: 'Erro ao marcar como retirada' }, { status: 500 })
  }
}
