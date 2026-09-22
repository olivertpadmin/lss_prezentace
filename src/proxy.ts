import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/** Celá prezentace je chráněná jedním heslem (viz src/app/api/lss-auth/route.ts). */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname.startsWith('/lss/login') || pathname.startsWith('/api/lss-auth')) {
    return NextResponse.next()
  }

  const auth = request.cookies.get('plg_lss')
  if (auth?.value === '1') return NextResponse.next()

  return NextResponse.redirect(new URL('/lss/login', request.url))
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|fonts|.*\\.svg|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.webp|.*\\.gif|.*\\.ico|.*\\.otf|.*\\.ttf|.*\\.woff|.*\\.woff2).*)',
  ],
}
