//route to handle sign in to create-story page
import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../lib/db';
import { checkLoginAttempts } from '../../lib/rate-limiter';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'; 

export async function POST(request: NextRequest) {
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    if (!checkLoginAttempts(ip, 5, 180000)) {
        return NextResponse.json({ error: 'Too many login attempts, try again in 3 minutes'}, { status: 429});
    }
    const client = await db.connect();
    try {
        const { email, password } = await request.json();
        const { rows } = await client.sql`
        SELECT * FROM profile WHERE email = ${email}`;
        if (rows.length === 0) {
            return NextResponse.json({ error: 'Invalid email'}, { status: 401});
        }
        // Create a JWT token
        const secret = process.env.JWT_SECRET;
        if (!secret) {
        throw new Error('JWT_SECRET is not defined.');
        }
        const user = rows[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid || rows.length ===0 ) {
            return NextResponse.json({ error: 'Invalid email or password'}, { status: 401});
        }
        // Generate JWT token with 2 hour expiry for better user experience
        const token = jwt.sign(
            { email: user.email,
             image: user.image || null
            },
            secret,
            { expiresIn: '2h' }
        );

        // Create response with JSON data
        const response = NextResponse.json({ 
            message: 'Sign in successful', 
            token, 
            email: user.email, 
            image: user.image || null
         }, { status: 200});

        // Set cookies for middleware access
        response.cookies.set('token', token, {
            httpOnly: false, // Allow client-side access
            secure: process.env.NODE_ENV === 'production', // Secure in production
            sameSite: 'lax',
            maxAge: 2 * 60 * 60, // 2 hours in seconds
            path: '/'
        });

        response.cookies.set('userToken', token, {
            httpOnly: false, // Allow client-side access
            secure: process.env.NODE_ENV === 'production', // Secure in production
            sameSite: 'lax',
            maxAge: 2 * 60 * 60, // 2 hours in seconds
            path: '/'
        });

        return response;
    } catch (error) {
        console.error('Error signing in:', error);
        return NextResponse.json({ error: 'Internal server error'}, { status: 500});
    } finally {
        await client.release();
    }
}
