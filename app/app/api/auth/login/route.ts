import { NextRequest, NextResponse } from 'next/server'
import { authenticate } from '@/lib/auth'
import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  senha: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate input
    const validated = loginSchema.parse(body)

    // Authenticate
    const { token, usuario } = await authenticate(validated.email, validated.senha)

    return NextResponse.json({
      success: true,
      token,
      usuario,
    })
  } catch (error) {
    console.error('Login error:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: error.errors[0].message },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Erro ao fazer login' },
      { status: 401 }
    )
  }
}
