import { NextResponse, type NextRequest } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'

export async function middleware(request: NextRequest) {
  try {
    // Update the session token
    const response = await updateSession(request)

    // Example basic protection for admin and profile routes
    const path = request.nextUrl.pathname
    const isProtectedPath = path.startsWith('/admin') || path.startsWith('/profile')

    if (isProtectedPath) {
      // You'd want to check if the user is actually authenticated
    }

    return response
  } catch (error: any) {
    return new NextResponse(
      `MIDDLEWARE CRASH: ${error.message}\nStack: ${error.stack}`,
      { status: 500 }
    )
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
