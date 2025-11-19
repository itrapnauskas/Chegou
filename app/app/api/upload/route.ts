import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '@/lib/auth'
import { createClient } from '@supabase/supabase-js'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'
import crypto from 'crypto'

// Storage configuration
const STORAGE_TYPE = process.env.STORAGE_TYPE || 'local'

// Supabase client (only used if STORAGE_TYPE is 'cloud')
const supabase = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY
  ? createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )
  : null

// POST /api/upload - Upload foto
export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    if (!authHeader) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
    }

    const token = authHeader.substring(7)
    const user = verifyToken(token)

    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'Nenhum arquivo enviado' }, { status: 400 })
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/heic', 'image/jpg']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Tipo de arquivo inválido. Apenas JPG, PNG, HEIC.' },
        { status: 400 }
      )
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'Arquivo muito grande. Máximo 5MB.' },
        { status: 400 }
      )
    }

    // Generate unique filename
    const timestamp = Date.now()
    const random = crypto.randomBytes(8).toString('hex')
    const ext = file.name.split('.').pop() || 'jpg'
    const filename = `${timestamp}-${random}.${ext}`

    // Upload path: condominios/{condominioId}/correspondencias/YYYY/MM/filename
    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const relativePath = `condominios/${user.condominioId}/correspondencias/${year}/${month}`
    const fullPath = `${relativePath}/${filename}`

    // Convert File to Buffer
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // ====================
    // LOCAL STORAGE
    // ====================
    if (STORAGE_TYPE === 'local') {
      const uploadDir = path.join(process.cwd(), 'public', 'uploads', relativePath)
      const filePath = path.join(uploadDir, filename)

      // Create directory if doesn't exist
      await mkdir(uploadDir, { recursive: true })

      // Write file
      await writeFile(filePath, buffer)

      // Generate public URL
      const publicUrl = `/uploads/${fullPath}`

      return NextResponse.json({
        success: true,
        fotoUrl: publicUrl,
        path: fullPath,
      })
    }

    // ====================
    // SUPABASE STORAGE (Cloud)
    // ====================
    if (STORAGE_TYPE === 'cloud' && supabase) {
      const { data, error } = await supabase.storage
        .from('correspondencias')
        .upload(fullPath, buffer, {
          contentType: file.type,
          cacheControl: '31536000', // 1 year
          upsert: false,
        })

      if (error) {
        console.error('Supabase upload error:', error)
        return NextResponse.json({ error: 'Erro ao fazer upload' }, { status: 500 })
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('correspondencias')
        .getPublicUrl(fullPath)

      return NextResponse.json({
        success: true,
        fotoUrl: publicUrl,
        path: data.path,
      })
    }

    // No valid storage configured
    return NextResponse.json(
      { error: 'Storage não configurado corretamente' },
      { status: 500 }
    )

  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: 'Erro ao fazer upload' }, { status: 500 })
  }
}
