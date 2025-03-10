// src/api/admin/verify-token.ts Hnadles token validation and logins admin

import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(req: NextRequest) {
  const token = req.headers.get('authorization')?.split(' ')[1]; // Extract token
  //console.log('Received token:', token);

  if (!token) {
    return NextResponse.json({ success: false, error: 'No token provided' }, { status: 400 });
  }

  try {
    //verify token using JWT_SECRET
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error('JWT_SECRET is not defined in the environment variables');
    }
    const decoded = jwt.verify(token, secret) as { id: string; email: string; role: string };
    //console.log('Decoded token:', decoded);

    return NextResponse.json({ success: true, admin: decoded });
  } catch (error) {
    //console.log('Error decoding token:', error);
    return NextResponse.json({ success: false, error: 'Invalid token' }, { status: 401 });
  }
}


/*import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
*/

/*
export async function POST(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const token = req.headers['authorization']?.split(' ')[1]; // Extract token from 'Bearer <token>'
    
    if (!token) {
      return res.status(400).json({ success: false, error: 'No token provided' });
    }

    try {
      // Verify the token using JWT_SECRET
      const secret = process.env.JWT_SECRET;
      if (!secret){
        throw new Error('JWT_SECRET is not defined in the environment variables');
    }
      const decoded = jwt.verify(token, secret);

      // Return decoded user information
      return res.status(200).json({ success: true, admin: decoded });
    } catch (error) {
      return res.status(401).json({ success: false, error: 'Invalid token' });
    }
  } else {
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }
}
*/