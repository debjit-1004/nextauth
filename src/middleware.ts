import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 

// Middleware to check if user is authenticated
//this fn can be marked async if used with await 
export function middleware(request: NextRequest) {
    // Get the path of the request
    //in nextjs only next url is available
  const path = request.nextUrl.pathname

  const isPublicPath = path === '/login' || path === '/signup' || path === '/verifyemail'

  //geting the bearer token from the cookie
  const token = request.cookies.get('token')?.value || ''

  if(isPublicPath && token) {
    return NextResponse.redirect(new URL('/', request.nextUrl))
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.nextUrl))
  }
    
}

 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/profile',
    '/login',
    '/signup',
    '/verifyemail'
  ]
}