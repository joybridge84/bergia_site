import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // 一時的にすべての処理をバイパスして、レンダリングエラーの原因を切り分けます
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
