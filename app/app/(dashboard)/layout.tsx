'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/lib/stores/auth-store'
import { Button } from '@/components/ui/button'
import { Package, Home, Users, BarChart3, LogOut, Plus } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const { isAuthenticated, user, logout } = useAuthStore()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, router])

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  if (!isAuthenticated) {
    return null
  }

  const navigation = [
    { name: 'Início', href: '/', icon: Home },
    { name: 'Moradores', href: '/moradores', icon: Users },
    { name: 'Dashboard', href: '/dashboard', icon: BarChart3 },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-green-600 rounded-lg">
                <Package className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">CHEGOU</h1>
                <p className="text-xs text-gray-500">{user?.condominio?.nome}</p>
              </div>
            </div>

            {/* User menu */}
            <div className="flex items-center gap-4">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium text-gray-900">{user?.nome}</p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4" />
                <span className="ml-2 hidden sm:inline">Sair</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Mobile Navigation */}
        <nav className="sm:hidden mb-6">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition',
                    isActive
                      ? 'bg-green-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.name}
                </Link>
              )
            })}
          </div>
        </nav>

        <div className="flex gap-6">
          {/* Desktop Sidebar */}
          <aside className="hidden sm:block w-64 flex-shrink-0">
            <div className="bg-white rounded-lg border border-gray-200 p-4 sticky top-24">
              <nav className="space-y-1">
                {navigation.map((item) => {
                  const isActive = pathname === item.href
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition',
                        isActive
                          ? 'bg-green-50 text-green-700 border border-green-200'
                          : 'text-gray-700 hover:bg-gray-50'
                      )}
                    >
                      <Icon className="h-5 w-5" />
                      {item.name}
                    </Link>
                  )
                })}
              </nav>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <Link href="/nova">
                  <Button className="w-full" size="lg">
                    <Plus className="mr-2 h-5 w-5" />
                    Nova Correspondência
                  </Button>
                </Link>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {children}
          </main>
        </div>
      </div>

      {/* Mobile FAB */}
      <Link
        href="/nova"
        className="sm:hidden fixed bottom-6 right-6 w-14 h-14 bg-green-600 rounded-full shadow-lg flex items-center justify-center hover:bg-green-700 transition z-50"
      >
        <Plus className="h-6 w-6 text-white" />
      </Link>
    </div>
  )
}
