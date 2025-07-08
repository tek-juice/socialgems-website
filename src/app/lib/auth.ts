import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function getSession(request?: NextRequest) {
  // Try to get the token from the Authorization header
  let token: string | undefined;

  if (request) {
    const authHeader = request.headers.get('authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.replace('Bearer ', '');
    }
  }

  // Optionally, fallback to cookies if you want to support that as well
  // (not used in your current flow, but can be added if needed)

  if (!token) return null;

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { email: string };
    return { user: decoded };
  } catch (err) {
    return null;
  }
}