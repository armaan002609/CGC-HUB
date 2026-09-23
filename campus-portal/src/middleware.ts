import { NextResponse, type NextRequest } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'

export async function middleware(request: NextRequest) {
  // Update the session token
  const response = await updateSession(request)

  // Example basic protection for admin and profile routes
  const path = request.nextUrl.pathname
  const isProtectedPath = path.startsWith('/admin') || path.startsWith('/profile')

  if (isProtectedPath) {
    // You'd want to check if the user is actually authenticated
    // In a real app, you might decode the token or call supabase.auth.getUser()
    // The updateSession method refreshes it, but doesn't block by default.
    // For simplicity, we just rely on page-level checks or enhance this later.
  }

  return response
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
