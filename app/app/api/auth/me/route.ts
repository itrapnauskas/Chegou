import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ success: false, error: 'Não autenticado' }, { status: 401 })
    }

    const token = authHeader.substring(7)
    const payload = verifyToken(token)

    // Get fresh user data
    const usuario = await prisma.usuario.findUnique({
      where: { id: payload.userId },
      include: { condominio: true },
    })

    if (!usuario) {
      return NextResponse.json({ success: false, error: 'Usuário não encontrado' }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        role: usuario.role,
        condominio: {
          id: usuario.condominio.id,
          nome: usuario.condominio.nome,
        },
      },
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Token inválido' },
      { status: 401 }
    )
  }
}
