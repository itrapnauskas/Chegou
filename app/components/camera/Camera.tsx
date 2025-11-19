'use client'

import { useRef, useState, useCallback } from 'react'
import Webcam from 'react-webcam'
import { Button } from '@/components/ui/button'
import { Camera as CameraIcon, X, Check, RotateCcw } from 'lucide-react'

interface CameraProps {
  onCapture: (imageSrc: string) => void
  onCancel: () => void
}

export function Camera({ onCapture, onCancel }: CameraProps) {
  const webcamRef = useRef<Webcam>(null)
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment')

  const capture = useCallback(() => {
    const src = webcamRef.current?.getScreenshot()
    if (src) {
      setImageSrc(src)
    }
  }, [webcamRef])

  const retake = () => {
    setImageSrc(null)
  }

  const confirm = () => {
    if (imageSrc) {
      onCapture(imageSrc)
    }
  }

  const switchCamera = () => {
    setFacingMode(prev => prev === 'user' ? 'environment' : 'user')
  }

  if (imageSrc) {
    return (
      <div className="space-y-4">
        <div className="relative rounded-lg overflow-hidden bg-black">
          <img
            src={imageSrc}
            alt="Foto capturada"
            className="w-full h-auto"
          />
        </div>

        <div className="flex gap-3">
          <Button
            onClick={retake}
            variant="outline"
            className="flex-1"
            size="lg"
          >
            <RotateCcw className="mr-2 h-5 w-5" />
            Tirar Outra
          </Button>
          <Button
            onClick={confirm}
            className="flex-1"
            size="lg"
          >
            <Check className="mr-2 h-5 w-5" />
            Continuar
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="relative rounded-lg overflow-hidden bg-black aspect-[4/3]">
        <Webcam
          ref={webcamRef}
          audio={false}
          screenshotFormat="image/jpeg"
          screenshotQuality={0.92}
          className="w-full h-full object-cover"
          videoConstraints={{
            facingMode,
            width: { ideal: 1920 },
            height: { ideal: 1080 },
          }}
        />

        {/* Switch camera button (mobile) */}
        <button
          onClick={switchCamera}
          className="absolute top-4 right-4 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition"
          aria-label="Trocar câmera"
        >
          <RotateCcw className="h-5 w-5" />
        </button>
      </div>

      <div className="flex gap-3">
        <Button
          onClick={onCancel}
          variant="ghost"
          size="lg"
        >
          <X className="mr-2 h-5 w-5" />
          Cancelar
        </Button>
        <Button
          onClick={capture}
          className="flex-1"
          size="lg"
        >
          <CameraIcon className="mr-2 h-5 w-5" />
          Tirar Foto
        </Button>
      </div>

      <p className="text-sm text-gray-500 text-center">
        Posicione a câmera sobre a etiqueta da correspondência
      </p>
    </div>
  )
}
