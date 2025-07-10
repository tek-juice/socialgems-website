//middleware to protect pages from unauthorised access. Protect pages like create-story.
import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function middleware(request: NextRequest) {
  // Check if the request is for a protected route
  const isProtectedRoute = request.nextUrl.pathname.startsWith('/create-story');
  
  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  // Try to get token from cookies only (no localStorage in middleware)
  let token: string | undefined;

  // Check for token cookie
  const tokenCookie = request.cookies.get('token');
  if (tokenCookie) {
    token = tokenCookie.value;
  }

  // Check for userToken cookie as fallback
  if (!token) {
    const userTokenCookie = request.cookies.get('userToken');
    if (userTokenCookie) {
      token = userTokenCookie.value;
    }
  }

  // If no token found, redirect to sign-in
  if (!token) {
    const signInUrl = new URL('/sign-in', request.url);
    // Preserve the original URL as redirect parameter
    signInUrl.searchParams.set('redirect', request.nextUrl.pathname);
    return NextResponse.redirect(signInUrl);
  }

  // Verify the token using jose (Edge Runtime compatible)
  try {
    const secret = new TextEncoder().encode(JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    
    // Check if token is expired
    const currentTime = Date.now() / 1000;
    if (payload.exp && payload.exp < currentTime) {
      // Token expired, redirect to sign-in
      const signInUrl = new URL('/sign-in', request.url);
      signInUrl.searchParams.set('redirect', request.nextUrl.pathname);
      return NextResponse.redirect(signInUrl);
    }

    // Token is valid, allow the request to proceed
    return NextResponse.next();
  } catch (error) {
    // Invalid token, redirect to sign-in
    const signInUrl = new URL('/sign-in', request.url);
    signInUrl.searchParams.set('redirect', request.nextUrl.pathname);
    return NextResponse.redirect(signInUrl);
  }
}

export const config = {
  matcher: [
    '/create-story',
    '/create-story/:path*'
  ],
} 