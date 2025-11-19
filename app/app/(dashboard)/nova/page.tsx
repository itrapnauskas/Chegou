'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Camera } from '@/components/camera/Camera'
import { MoradorSearch } from '@/components/morador/MoradorSearch'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useCriarCorrespondencia, useUploadFoto } from '@/lib/hooks/use-correspondencias'
import type { Morador } from '@/types'
import { ArrowLeft, CheckCircle2, Loader2 } from 'lucide-react'
import Link from 'next/link'
import toast from 'react-hot-toast'

type Step = 'camera' | 'morador' | 'confirmacao'

export default function NovaCorrespondenciaPage() {
  const router = useRouter()
  const [step, setStep] = useState<Step>('camera')
  const [foto, setFoto] = useState<string | null>(null)
  const [morador, setMorador] = useState<Morador | null>(null)

  const uploadFoto = useUploadFoto()
  const criarCorrespondencia = useCriarCorrespondencia()

  const handleCapturePhoto = (imageSrc: string) => {
    setFoto(imageSrc)
    setStep('morador')
  }

  const handleSelectMorador = (selectedMorador: Morador) => {
    setMorador(selectedMorador)
  }

  const handleSubmit = async () => {
    if (!foto || !morador) {
      toast.error('Selecione uma foto e um morador')
      return
    }

    try {
      // 1. Convert base64 to File
      const response = await fetch(foto)
      const blob = await response.blob()
      const file = new File([blob], `correspondencia-${Date.now()}.jpg`, {
        type: 'image/jpeg',
      })

      // 2. Upload photo
      const uploadResult = await uploadFoto.mutateAsync(file)

      // 3. Create correspondence
      await criarCorrespondencia.mutateAsync({
        fotoUrl: uploadResult.fotoUrl,
        moradorId: morador.id,
      })

      toast.success('Correspondência registrada com sucesso!')
      router.push('/')
    } catch (error: any) {
      console.error('Erro ao criar correspondência:', error)
      toast.error(error.message || 'Erro ao criar correspondência')
    }
  }

  const isLoading = uploadFoto.isPending || criarCorrespondencia.isPending

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Nova Correspondência</h1>
          <p className="text-gray-600 mt-1">
            Registre uma nova correspondência em 2 passos
          </p>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-center gap-2">
        <div
          className={`flex items-center gap-2 ${
            step === 'camera' ? 'text-green-600' : 'text-gray-400'
          }`}
        >
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center font-medium ${
              step === 'camera' || foto
                ? 'bg-green-600 text-white'
                : 'bg-gray-200 text-gray-600'
            }`}
          >
            {foto ? <CheckCircle2 className="h-5 w-5" /> : '1'}
          </div>
          <span className="text-sm font-medium hidden sm:inline">Foto</span>
        </div>

        <div className="w-12 h-0.5 bg-gray-200" />

        <div
          className={`flex items-center gap-2 ${
            step === 'morador' ? 'text-green-600' : 'text-gray-400'
          }`}
        >
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center font-medium ${
              step === 'morador' || morador
                ? 'bg-green-600 text-white'
                : 'bg-gray-200 text-gray-600'
            }`}
          >
            {morador ? <CheckCircle2 className="h-5 w-5" /> : '2'}
          </div>
          <span className="text-sm font-medium hidden sm:inline">Morador</span>
        </div>
      </div>

      {/* Content */}
      <Card className="p-6">
        {step === 'camera' && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              1. Tire a foto da correspondência
            </h2>
            <Camera
              onCapture={handleCapturePhoto}
              onCancel={() => router.push('/')}
            />
          </div>
        )}

        {step === 'morador' && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              2. Selecione o morador
            </h2>

            {/* Photo Preview */}
            {foto && (
              <div className="mb-6">
                <p className="text-sm text-gray-600 mb-2">Foto capturada:</p>
                <div className="relative w-full max-w-xs rounded-lg overflow-hidden bg-gray-100">
                  <img
                    src={foto}
                    alt="Foto da correspondência"
                    className="w-full h-auto"
                  />
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setFoto(null)
                    setStep('camera')
                  }}
                  className="mt-2"
                >
                  Tirar outra foto
                </Button>
              </div>
            )}

            {/* Morador Search */}
            <MoradorSearch onSelect={handleSelectMorador} selected={morador} />

            {/* Actions */}
            {morador && (
              <div className="mt-6 flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setStep('camera')}
                  disabled={isLoading}
                  className="flex-1"
                >
                  Voltar
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="flex-1"
                  size="lg"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Salvando...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="mr-2 h-5 w-5" />
                      Registrar Correspondência
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>
        )}
      </Card>
    </div>
  )
}
