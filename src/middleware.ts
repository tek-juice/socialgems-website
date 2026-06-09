//middleware to protect pages from unauthorised access. Protect pages like create-story.
import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function middleware(request: NextRequest) {
  // Check if the request is for a protected route
  const pathname = request.nextUrl.pathname;
  const isPortalRoute = pathname.startsWith('/business/dashboard') || pathname.startsWith('/business/creators') ||
    pathname.startsWith('/business/campaigns') || pathname.startsWith('/business/jobs') ||
    pathname.startsWith('/business/affiliate-programs') || pathname.startsWith('/business/opportunities') ||
    pathname.startsWith('/business/applicants') || pathname.startsWith('/business/settings') ||
    pathname.startsWith('/creator/dashboard') || pathname.startsWith('/creator/campaigns') ||
    pathname.startsWith('/creator/jobs') || pathname.startsWith('/creator/affiliate-programs') ||
    pathname.startsWith('/creator/opportunities') || pathname.startsWith('/creator/memberships') ||
    pathname.startsWith('/creator/applications') || pathname.startsWith('/creator/profile') ||
    pathname.startsWith('/creator/settings');
  const isProtectedRoute = pathname.startsWith('/create-story') || isPortalRoute;
  
  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  if (isPortalRoute) {
    const token = request.cookies.get('sg_access_token')?.value;
    const userType = request.cookies.get('sg_user_type')?.value;

    if (!token) {
      const loginPath = pathname.startsWith('/business') ? '/business/login' : '/creator/login';
      return NextResponse.redirect(new URL(loginPath, request.url));
    }

    if (pathname.startsWith('/business') && userType && userType !== 'brand' && userType !== 'agent') {
      return NextResponse.redirect(new URL('/creator/dashboard', request.url));
    }

    if (pathname.startsWith('/creator') && userType && userType !== 'influencer' && userType !== 'creator') {
      return NextResponse.redirect(new URL('/business/dashboard', request.url));
    }

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
    '/create-story/:path*',
    '/business/dashboard/:path*',
    '/business/creators/:path*',
    '/business/campaigns/:path*',
    '/business/jobs/:path*',
    '/business/affiliate-programs/:path*',
    '/business/opportunities/:path*',
    '/business/applicants/:path*',
    '/business/settings/:path*',
    '/creator/dashboard/:path*',
    '/creator/campaigns/:path*',
    '/creator/jobs/:path*',
    '/creator/affiliate-programs/:path*',
    '/creator/opportunities/:path*',
    '/creator/memberships/:path*',
    '/creator/applications/:path*',
    '/creator/profile/:path*',
    '/creator/settings/:path*'
  ],
} 
