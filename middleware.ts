import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // if (request.nextUrl.pathname.startsWith('/photos')) {
  //     return NextResponse.redirect(new URL('/', request.url))
  // }
}
