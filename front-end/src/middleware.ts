import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')
  const { pathname } = request.nextUrl

  // Define protected and public routes
  const authPages = ['/login', '/signup', '/verification']
  const protectedPages = ['/profile', '/dashboard','/budget','/transactions','/settings','/investments','addtransactions']
  const isAuthPage = authPages.includes(pathname)
  const isProtectedPage = protectedPages.includes(pathname)

  // User is logged in
  if (token) {
    // Prevent access to auth pages when logged in
    if (isAuthPage) {
      return NextResponse.redirect(new URL('/', request.url))
    }
    // Allow access to all protected pages
    return NextResponse.next()
  }

  // User is not logged in
  if (!token) {
    // Allow access to auth pages
    if (isAuthPage) {
      return NextResponse.next()
    }
    // Redirect to login for protected pages
    if (isProtectedPage) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}