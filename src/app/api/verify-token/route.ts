// Route to verify user token
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(request: NextRequest) {
    try {
        const authHeader = request.headers.get('authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return NextResponse.json({ success: false, error: 'No token provided' }, { status: 401 });
        }

        const token = authHeader.substring(7);
        const secret = process.env.JWT_SECRET;
        
        if (!secret) {
            return NextResponse.json({ success: false, error: 'Server configuration error' }, { status: 500 });
        }

        const decoded = jwt.verify(token, secret) as any;
        
        return NextResponse.json({ 
            success: true, 
            email: decoded.email,
            image: decoded.image
        }, { status: 200 });
        
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Invalid token' }, { status: 401 });
    }
} 