// this route handles reset password requests, via otp sent to email.
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/app/lib/db';
import emailjs from '@emailjs/nodejs';


// --- API: Request OTP ---
export async function POST(request: NextRequest) {
    const { action, email, otp, newPassword } = await request.json();
    const client = await db.connect();
    try {
        // Ensure table exists
        //await client.sql;

        if (action === 'request-otp') {
            // Check if email exists
            const userRes = await client.query('SELECT * FROM profile WHERE email = $1', [email]);
            if (userRes.rows.length === 0) {
                return NextResponse.json({ error: 'Email not found' }, { status: 404 });
            }
            // Generate OTP
            const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
            // Store OTP
            await client.query('INSERT INTO password_resets (email, otp) VALUES ($1, $2)', [email, generatedOtp]);

            // Calculate expiry time for display
            const now = new Date();
            const expiryTime = new Date(now.getTime() + 15 * 60000); // 15 minutes from now
            
            // Format for email display (e.g., "3:45 PM, 10 July 2025")
            const formattedExpiry = expiryTime.toLocaleString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                month: 'long',
                day: 'numeric',
                year: 'numeric',
                timeZone: 'Africa/Kampala' // Adjust to your preferred timezone
            });

            // Send OTP via EmailJS REST API, the dynamic will insert into the template automatically.
          
            try {
                await emailjs.send(
                    process.env.EMAILJS_SERVICE_ID!,
                    process.env.EMAILJS_TEMPLATE_ID!,
                    {
                        name: userRes.rows[0].name || 'User',
                        email: email,
                        otp: generatedOtp,
                        expiry_time: formattedExpiry
                    },
                    {
                        publicKey: process.env.EMAILJS_PUBLIC_KEY!,
                        privateKey: process.env.EMAILJS_PRIVATE_KEY! // Required for Node.js
                    }
                );
            } catch (emailError) {
                console.error('EmailJS error:', emailError);
                return NextResponse.json(
                    { error: 'Failed to send OTP email' },
                    { status: 500 }
                );
            }

            return NextResponse.json(
                { message: 'OTP sent to email' },
                { status: 200 }
            );
        }
            
        if (action === 'verify-otp') {
            // Check OTP and expiry (15 min)
            const otpRes = await client.query('SELECT * FROM password_resets WHERE email = $1 AND otp = $2 AND created_at > NOW() - INTERVAL \'15 minutes\'', [email, otp]);
            if (otpRes.rows.length === 0) {
                return NextResponse.json({ error: 'Invalid or expired OTP' }, { status: 400 });
            }
            return NextResponse.json({ message: 'OTP valid' }, { status: 200 });
        }
        if (action === 'reset-password') {
            // Check OTP again
            const otpRes = await client.query('SELECT * FROM password_resets WHERE email = $1 AND otp = $2 AND created_at > NOW() - INTERVAL \'15 minutes\'', [email, otp]);
            if (otpRes.rows.length === 0) {
                return NextResponse.json({ error: 'Invalid or expired OTP' }, { status: 400 });
            }
            // Update password
            const bcrypt = require('bcryptjs');
            const hashed = await bcrypt.hash(newPassword, 10);
            await client.query('UPDATE profile SET password = $1 WHERE email = $2', [hashed, email]);
            // Delete OTP
            await client.query('DELETE FROM password_resets WHERE created_at < NOW() - INTERVAL \'15 minutes\'');
            return NextResponse.json({ message: 'Password updated' }, { status: 200 });
        }
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    } finally {
        await client.release();
    }
}
