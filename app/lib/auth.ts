import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { prisma } from './prisma'

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-change-in-production'
const SALT_ROUNDS = 10

export interface JWTPayload {
  userId: string
  condominioId: string
  email: string
  role: string
}

/**
 * Hash password using bcrypt
 */
export async function hashPassword(senha: string): Promise<string> {
  return bcrypt.hash(senha, SALT_ROUNDS)
}

/**
 * Compare password with hash
 */
export async function comparePassword(senha: string, hash: string): Promise<boolean> {
  return bcrypt.compare(senha, hash)
}

/**
 * Generate JWT token
 */
export function generateToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: '7d', // 7 days
  })
}

/**
 * Verify JWT token
 */
export function verifyToken(token: string): JWTPayload {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload
  } catch (error) {
    throw new Error('Token inválido ou expirado')
  }
}

/**
 * Authenticate user
 */
export async function authenticate(email: string, senha: string) {
  // Find user
  const usuario = await prisma.usuario.findUnique({
    where: { email },
    include: { condominio: true },
  })

  if (!usuario) {
    throw new Error('Credenciais inválidas')
  }

  if (!usuario.ativo) {
    throw new Error('Usuário inativo')
  }

  // Verify password
  const isValid = await comparePassword(senha, usuario.senha)

  if (!isValid) {
    throw new Error('Credenciais inválidas')
  }

  // Update last login
  await prisma.usuario.update({
    where: { id: usuario.id },
    data: { ultimoLoginEm: new Date() },
  })

  // Generate token
  const token = generateToken({
    userId: usuario.id,
    condominioId: usuario.condominioId,
    email: usuario.email,
    role: usuario.role,
  })

  return {
    token,
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
  }
}

/**
 * Get user from token (for middleware)
 */
export function getUserFromToken(token: string): JWTPayload {
  return verifyToken(token)
}
