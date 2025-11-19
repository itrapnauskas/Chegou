import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyToken } from '@/lib/auth'
import { subMonths } from 'date-fns'

// GET /api/dashboard - Get dashboard metrics
export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    if (!authHeader) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
    }

    const token = authHeader.substring(7)
    const user = verifyToken(token)

    const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1)

    // Parallel queries for better performance
    const [totalMes, pendentes, retiradasMes, all] = await Promise.all([
      // Total correspondências do mês
      prisma.correspondencia.count({
        where: {
          condominioId: user.condominioId,
          criadoEm: { gte: startOfMonth },
        },
      }),

      // Pendentes (todas, não só do mês)
      prisma.correspondencia.count({
        where: {
          condominioId: user.condominioId,
          status: 'PENDENTE',
        },
      }),

      // Retiradas do mês
      prisma.correspondencia.count({
        where: {
          condominioId: user.condominioId,
          status: 'RETIRADA',
          retiradoEm: { gte: startOfMonth },
        },
      }),

      // All retiradas (for average calculation)
      prisma.correspondencia.findMany({
        where: {
          condominioId: user.condominioId,
          status: 'RETIRADA',
          retiradoEm: { gte: startOfMonth },
          criadoEm: { gte: startOfMonth },
        },
        select: {
          criadoEm: true,
          retiradoEm: true,
        },
      }),
    ])

    // Calculate average time to retirada (in hours)
    let tempoMedioHoras = 0
    if (all.length > 0) {
      const totalHoras = all.reduce((sum, corresp) => {
        if (corresp.retiradoEm) {
          const diff = corresp.retiradoEm.getTime() - corresp.criadoEm.getTime()
          return sum + diff / (1000 * 60 * 60) // Convert to hours
        }
        return sum
      }, 0)
      tempoMedioHoras = Math.round(totalHoras / all.length)
    }

    // Calculate daily average
    const daysInMonth = new Date().getDate()
    const mediaPorDia = daysInMonth > 0 ? (totalMes / daysInMonth).toFixed(1) : '0'

    // Taxa de retirada
    const taxaRetirada = totalMes > 0
      ? Math.round((retiradasMes / totalMes) * 100)
      : 0

    return NextResponse.json({
      success: true,
      metrics: {
        totalMes,
        mediaPorDia: parseFloat(mediaPorDia),
        pendentes,
        retiradasMes,
        tempoMedioHoras,
        taxaRetirada,
      },
    })
  } catch (error) {
    console.error('Error fetching dashboard metrics:', error)
    return NextResponse.json({ error: 'Erro ao buscar métricas' }, { status: 500 })
  }
}
