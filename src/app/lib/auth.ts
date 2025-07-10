import { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function getSession(request?: NextRequest) {
  // Try to get the token from the Authorization header
  let token: string | undefined;

  if (request) {
    const authHeader = request.headers.get('authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.replace('Bearer ', '');
    }

    // If no token in Authorization header, check cookies
    if (!token) {
      const tokenCookie = request.cookies.get('token');
      if (tokenCookie) {
        token = tokenCookie.value;
      }
    }

    // Check for userToken cookie as fallback
    if (!token) {
      const userTokenCookie = request.cookies.get('userToken');
      if (userTokenCookie) {
        token = userTokenCookie.value;
      }
    }
  }

  if (!token) return null;

  try {
    // Use jose library for JWT verification (Edge Runtime compatible)
    const secret = new TextEncoder().encode(JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    
    // Check if token is expired
    const currentTime = Date.now() / 1000;
    if (payload.exp && payload.exp < currentTime) {
      return null;
    }

    return { user: payload };
  } catch (err) {
    return null;
  }
}