'use client'

import { useDashboard } from '@/lib/hooks/use-dashboard'
import { Card } from '@/components/ui/card'
import { Package, TrendingUp, Clock, CheckCircle, Loader2 } from 'lucide-react'

export default function DashboardPage() {
  const { data: metrics, isLoading } = useDashboard()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 text-gray-400 animate-spin" />
      </div>
    )
  }

  if (!metrics) {
    return null
  }

  const cards = [
    {
      title: 'Total do Mês',
      value: metrics.totalMes,
      icon: Package,
      color: 'blue',
      description: 'Correspondências registradas',
    },
    {
      title: 'Média por Dia',
      value: metrics.mediaPorDia.toFixed(1),
      icon: TrendingUp,
      color: 'green',
      description: 'Correspondências/dia este mês',
    },
    {
      title: 'Pendentes',
      value: metrics.pendentes,
      icon: Clock,
      color: 'yellow',
      description: 'Aguardando retirada',
    },
    {
      title: 'Retiradas no Mês',
      value: metrics.retiradasMes,
      icon: CheckCircle,
      color: 'green',
      description: 'Correspondências retiradas',
    },
  ]

  const colorClasses = {
    blue: {
      bg: 'bg-blue-100',
      text: 'text-blue-600',
      value: 'text-blue-900',
    },
    green: {
      bg: 'bg-green-100',
      text: 'text-green-600',
      value: 'text-green-900',
    },
    yellow: {
      bg: 'bg-yellow-100',
      text: 'text-yellow-600',
      value: 'text-yellow-900',
    },
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Visualize as métricas do seu condomínio
        </p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => {
          const Icon = card.icon
          const colors = colorClasses[card.color as keyof typeof colorClasses]

          return (
            <Card key={card.title} className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${colors.bg} rounded-lg flex items-center justify-center`}>
                  <Icon className={`h-6 w-6 ${colors.text}`} />
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-1">{card.title}</p>
              <p className={`text-3xl font-bold ${colors.value} mb-1`}>
                {card.value}
              </p>
              <p className="text-xs text-gray-500">{card.description}</p>
            </Card>
          )
        })}
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tempo Médio de Retirada */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Tempo Médio de Retirada
          </h3>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-gray-900">
              {metrics.tempoMedioHoras.toFixed(1)}
            </span>
            <span className="text-xl text-gray-600">horas</span>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Tempo médio entre registro e retirada
          </p>

          {/* Visual indicator */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span>Performance</span>
              <span>
                {metrics.tempoMedioHoras < 24
                  ? 'Excelente'
                  : metrics.tempoMedioHoras < 48
                  ? 'Bom'
                  : 'Atenção'}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${
                  metrics.tempoMedioHoras < 24
                    ? 'bg-green-500'
                    : metrics.tempoMedioHoras < 48
                    ? 'bg-yellow-500'
                    : 'bg-red-500'
                }`}
                style={{
                  width: `${Math.min((48 - metrics.tempoMedioHoras) / 48 * 100, 100)}%`,
                }}
              />
            </div>
          </div>
        </Card>

        {/* Taxa de Retirada */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Taxa de Retirada
          </h3>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-gray-900">
              {metrics.taxaRetirada.toFixed(0)}
            </span>
            <span className="text-xl text-gray-600">%</span>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Correspondências retiradas este mês
          </p>

          {/* Circular Progress */}
          <div className="mt-4 flex items-center gap-4">
            <div className="relative w-20 h-20">
              <svg className="w-20 h-20 transform -rotate-90">
                <circle
                  cx="40"
                  cy="40"
                  r="36"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  className="text-gray-200"
                />
                <circle
                  cx="40"
                  cy="40"
                  r="36"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray={`${2 * Math.PI * 36}`}
                  strokeDashoffset={`${
                    2 * Math.PI * 36 * (1 - metrics.taxaRetirada / 100)
                  }`}
                  className="text-green-500"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm font-bold text-gray-900">
                  {metrics.taxaRetirada.toFixed(0)}%
                </span>
              </div>
            </div>

            <div className="flex-1">
              <p className="text-sm text-gray-600">
                {metrics.retiradasMes} de {metrics.totalMes} correspondências
                foram retiradas este mês
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card className="p-6 bg-green-50 border-green-200">
          <h4 className="font-semibold text-green-900 mb-2">
            🎯 Meta de Atendimento
          </h4>
          <p className="text-sm text-green-700">
            {metrics.tempoMedioHoras < 24
              ? '✅ Parabéns! Você está atingindo a meta de retirada em menos de 24h'
              : '⚠️ Incentive os moradores a retirarem as correspondências mais rapidamente'}
          </p>
        </Card>

        <Card className="p-6 bg-blue-50 border-blue-200">
          <h4 className="font-semibold text-blue-900 mb-2">
            📊 Insights
          </h4>
          <p className="text-sm text-blue-700">
            {metrics.mediaPorDia < 5
              ? 'Volume baixo de correspondências. Tudo sob controle!'
              : metrics.mediaPorDia < 10
              ? 'Volume moderado de correspondências.'
              : 'Volume alto de correspondências. Considere ampliar a equipe.'}
          </p>
        </Card>
      </div>
    </div>
  )
}
