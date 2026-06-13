//middleware to protect pages from unauthorised access.
import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

function isBusinessPortal(pathname: string) {
  return pathname.startsWith('/business/');
}

function isCreatorPortal(pathname: string) {
  return pathname.startsWith('/creator/');
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const isPortalRoute =
    isBusinessPortal(pathname) || isCreatorPortal(pathname);

  const isProtectedRoute = pathname.startsWith('/create-story') || isPortalRoute;

  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  if (isPortalRoute) {
    const token = request.cookies.get('sg_access_token')?.value;

    if (!token) {
      const loginPath = isBusinessPortal(pathname) ? '/business/login' : '/creator/login';
      return NextResponse.redirect(new URL(loginPath, request.url));
    }

    // Verify the JWT and read the role directly from the token payload —
    // avoids relying on the sg_user_type cookie which can be stale after account switching.
    try {
      const secret = new TextEncoder().encode(JWT_SECRET);
      const { payload } = await jwtVerify(token, secret);
      const role = ((payload.role as string) || '').toLowerCase();
      const isBusiness = role === 'brand' || role === 'agent';
      const isCreator = role === 'influencer' || role === 'creator';

      if (isBusinessPortal(pathname) && isCreator) {
        return NextResponse.redirect(new URL('/creator/dashboard', request.url));
      }
      if (isCreatorPortal(pathname) && isBusiness) {
        return NextResponse.redirect(new URL('/business/dashboard', request.url));
      }
    } catch {
      // Invalid or expired token — clear cookies and send to login.
      const loginPath = isBusinessPortal(pathname) ? '/business/login' : '/creator/login';
      const response = NextResponse.redirect(new URL(loginPath, request.url));
      response.cookies.set('sg_access_token', '', { path: '/', maxAge: 0 });
      response.cookies.set('sg_user_type', '', { path: '/', maxAge: 0 });
      return response;
    }

    return NextResponse.next();
  }

  // ── Legacy create-story protection ──────────────────────────────────────────
  const token =
    request.cookies.get('token')?.value ||
    request.cookies.get('userToken')?.value;

  if (!token) {
    const signInUrl = new URL('/sign-in', request.url);
    signInUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(signInUrl);
  }

  try {
    const secret = new TextEncoder().encode(JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    const currentTime = Date.now() / 1000;
    if (payload.exp && payload.exp < currentTime) {
      const signInUrl = new URL('/sign-in', request.url);
      signInUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(signInUrl);
    }
    return NextResponse.next();
  } catch {
    const signInUrl = new URL('/sign-in', request.url);
    signInUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(signInUrl);
  }
}

export const config = {
  matcher: [
    '/create-story',
    '/create-story/:path*',
    // Business portal
    '/business/dashboard/:path*',
    '/business/creators/:path*',
    '/business/campaigns/:path*',
    '/business/jobs/:path*',
    '/business/affiliate-programs/:path*',
    '/business/opportunities/:path*',
    '/business/applicants/:path*',
    '/business/wallet/:path*',
    '/business/settings/:path*',
    // Creator portal
    '/creator/dashboard/:path*',
    '/creator/campaigns/:path*',
    '/creator/jobs/:path*',
    '/creator/affiliate-programs/:path*',
    '/creator/opportunities/:path*',
    '/creator/memberships/:path*',
    '/creator/applications/:path*',
    '/creator/wallet/:path*',
    '/creator/social-connect/:path*',
    '/creator/profile/:path*',
    '/creator/settings/:path*',
  ],
}
