// src/api/auth/change-password/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../lib/db";
import { validatePassword } from '../../../lib/validators';
import { checkRateLimit } from "../../../lib/rate-limiter";
import { hash, compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';

const SALT_ROUNDS = 12;

export async function POST(req: NextRequest) {
    const client = await db.connect();
    const ip = req.headers.get('x-real-ip') ?? req.headers.get('x-forwarded-for') ?? '127.0.0.1';

    if (!checkRateLimit(ip)) {
        return NextResponse.json(
          { message: 'Too many requests' },
          { status: 429 }
        );
      }
    
    try {
        // Check method
        if (req.method !== 'POST') {
            return NextResponse.json(
                { message: 'Method not allowed' },
                { status: 405 }
            );
        }

        // Get token from headers
        const token = req.headers.get('authorization')?.split(' ')[1];
        if (!token) {
            return NextResponse.json(
                { message: 'Authorization token missing' },
                { status: 401 }
            );
        }

        // Verify token
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error('JWT_SECRET is not defined');
        }

        const decoded = jwt.verify(token, secret) as { 
            id: string; 
            email: string; 
            role: string 
        };

        // Get request body
        const { currentPassword, newPassword } = await req.json();

        // Validate inputs
        if (!currentPassword || !newPassword) {
            return NextResponse.json(
                { message: 'Current and new password are required' },
                { status: 400 }
            );
        }

        // Validate password complexity
        const passwordValidation = validatePassword(newPassword);
        if (!passwordValidation.valid) {
            return NextResponse.json(
                { message: passwordValidation.message }, 
                { status: 400 }
            );
        }

        // Find user in database
        const userQuery = await client.query(
            'SELECT * FROM admins WHERE email = $1',
            [decoded.email]
        );
        const user = userQuery.rows[0];

        if (!user) {
            return NextResponse.json(
                { message: 'User not found' },
                { status: 404 }
            );
        }

        // Verify current password
        const isPasswordValid = await compare(currentPassword, user.password);
        if (!isPasswordValid) {
            return NextResponse.json(
                { message: 'Current password is incorrect' },
                { status: 401 }
            );
        }

        // Hash new password
        const hashedPassword = await hash(newPassword, SALT_ROUNDS);

        // Update password in database
        await client.query(
            'UPDATE admins SET password = $1 WHERE id = $2',
            [hashedPassword, user.id]
        );

        return NextResponse.json(
            { 
                message: 'Password changed successfully', 
                clearToken: true //flag to indicate token should be cleared.
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Password change error:', error);
        
        if (error instanceof jwt.JsonWebTokenError) {
            return NextResponse.json(
                { message: 'Invalid or expired token' },
                { status: 401 }
            );
        }

        return NextResponse.json(
            { 
                message: error instanceof Error ? error.message : 'An unknown error occurred' 
            },
            { status: 500 }
        );
    } finally {
        client.release();
    }
}