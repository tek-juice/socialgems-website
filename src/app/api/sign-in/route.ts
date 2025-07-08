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
        // Generate JWT token with 24 hour expiry for better user experience
        const token = jwt.sign(
            { email: user.email,
             image: user.image || null
            },
            secret,
            { expiresIn: '2h' }
        );
        return NextResponse.json({ 
            message: 'Sign in successful', 
            token, 
            email: user.email, 
            image: user.image || null
         }, { status: 200});
    } catch (error) {
        console.error('Error signing in:', error);
        return NextResponse.json({ error: 'Internal server error'}, { status: 500});
    } finally {
        await client.release();
    }
}
