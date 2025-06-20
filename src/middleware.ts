import { withAuth } from 'next-auth/middleware';
// export { default } from "next-auth/middleware"

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default withAuth({
  // Matches the pages config in `[...nextauth]`
  pages: {
    signIn: '/login',
    // error: "/error",
  },
})

// Exclude specific routes from authentication
export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - static files
     * - api/status
     * - auth endpoints
     */
    '/((?!api/status|api/auth|signin|signup|_next/static|_next/image|favicon.ico).*)',
  ],
};