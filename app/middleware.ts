import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyToken } from '@/lib/auth'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Public routes that don't require authentication
  const publicRoutes = ['/login']
  const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route))

  // Get token from cookie or Authorization header
  const token =
    request.cookies.get('auth-token')?.value ||
    request.headers.get('authorization')?.replace('Bearer ', '')

  // If trying to access protected route without token
  if (!isPublicRoute && !token) {
    const loginUrl = new URL('/login', request.url)
    return NextResponse.redirect(loginUrl)
  }

  // Verify token validity
  if (token && !isPublicRoute) {
    try {
      verifyToken(token)
    } catch (error) {
      // Invalid token, redirect to login
      const loginUrl = new URL('/login', request.url)
      return NextResponse.redirect(loginUrl)
    }
  }

  // If authenticated user tries to access login page, redirect to home
  if (isPublicRoute && token) {
    try {
      verifyToken(token)
      const homeUrl = new URL('/', request.url)
      return NextResponse.redirect(homeUrl)
    } catch (error) {
      // Invalid token, allow access to login
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
