// components/ResetPasswordForm.tsx
'use client';
import { useState } from 'react';
import { checkRateLimit } from '@/app/lib/rate-limiter';
import { NextResponse } from 'next/server';
import { FaEye, FaEyeSlash, FaEnvelope, FaLock } from 'react-icons/fa';

export default function ResetPasswordForm() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Password validation
  const validatePassword = (password: string) => {
    const length = password.length >= 8;
    const uppercase = /[A-Z]/.test(password);
    const lowercase = /[a-z]/.test(password);
    const number = /[0-9]/.test(password);
    const special = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    return length && uppercase && lowercase && number && special;
  };

  // Step 1: Request OTP
  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setMessage('');
    
    const isAllowed = await checkRateLimit(email);
    if (!isAllowed) {
      setError('Too many requests. Please try again later.');
      setIsLoading(false);
      return;
    }
    try {
      const res = await fetch('/api/resetPassword', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'request-otp', email })
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Failed to send OTP.');
      } else {
        setMessage('OTP sent to your email.');
        setStep(2);
      }
    } catch (err) {
      setError('Failed to send OTP.');
    } finally {
      setIsLoading(false);
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setMessage('');
    try {
      const res = await fetch('/api/resetPassword', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'verify-otp', email, otp })
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Invalid or expired OTP.');
      } else {
        setMessage('OTP verified. Please enter your new password.');
        setStep(3);
      }
    } catch (err) {
      setError('Failed to verify OTP.');
    } finally {
      setIsLoading(false);
    }
  };

  // Step 3: Reset Password
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setMessage('');
    const passwordValidation = validatePassword(newPassword);
    let isValid = false;
    let validationMsg = '';
    if (typeof passwordValidation === 'boolean') {
      isValid = passwordValidation;
      validationMsg = isValid ? '' : 'Password is not strong enough.';
    } else if (typeof passwordValidation === 'object' && 'valid' in passwordValidation) {
      isValid = (passwordValidation as any).valid;
      validationMsg = (passwordValidation as any).message || 'Password is not strong enough.';
    }
    if (!isValid) {
      setError(validationMsg);
      setIsLoading(false);
      return;
    }
    if (newPassword !== repeatPassword) {
      setError('Passwords do not match.');
      setIsLoading(false);
      return;
    }
    try {
      const res = await fetch('/api/resetPassword', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'reset-password', email, otp, newPassword })
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Failed to reset password.');
      } else {
        setMessage('Password reset successful! You can now sign in.');
        setStep(4);
        // Log out user (remove tokens)
        if (typeof window !== 'undefined') {
          try {
            // Call the logout API to clear cookies server-side
            await fetch('/api/logout', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              }
            });
          } catch (error) {
            console.error('Error during logout:', error);
          }
          
          sessionStorage.removeItem('userToken');
          // Clear cookies by setting them to expire in the past
          document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
          document.cookie = 'userToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        }
      }
    } catch (err) {
      setError('Failed to reset password.');
    } finally {
      setIsLoading(false);
    }
  };

  // Step 1: Enter email
  if (step === 1) {
    return (
      <form onSubmit={handleRequestOtp} className="max-w-sm mx-auto p-6 bg-white rounded shadow">
        <h2 className="text-xl text-black font-bold mb-4">Reset Password</h2>
        <div className="relative">
          <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="w-full pl-10 pr-3 py-2 border rounded text-black bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gold"
          />
        </div>
        <button type="submit" disabled={isLoading} className="w-full bg-gold text-brown font-bold py-2 rounded mt-3">
          {isLoading ? 'Sending...' : 'Send OTP'}
        </button>
        {error && <p className="text-red-600 mt-2 text-sm">{error}</p>}
        {message && <p className="text-green-600 mt-2 text-sm">{message}</p>}
      </form>
    );
  }

  // Step 2: Enter OTP
  if (step === 2) {
    return (
      <form onSubmit={handleVerifyOtp} className="max-w-sm mx-auto p-6 bg-white rounded shadow">
        <h2 className="text-xl text-black font-bold mb-4">Enter OTP</h2>
        <div className="relative">
          <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={otp}
            onChange={e => {
              const value = e.target.value.replace(/\D/g, '').slice(0, 6);
               setOtp(value);
              }}
            placeholder="Enter the 6-digit OTP"
            required
            className="w-full pl-10 pr-3 py-2 border rounded text-black bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gold"
          />
        </div>
        <button type="submit" disabled={isLoading} className="w-full bg-gold text-brown font-bold py-2 rounded mt-3">
          {isLoading ? 'Verifying...' : 'Verify OTP'}
        </button>
        <button type="button" className="w-full mt-2 text-sm underline text-brown" onClick={() => setStep(1)}>
          Back to Email
        </button>
        {error && <p className="text-red-600 mt-2 text-sm">{error}</p>}
        {message && <p className="text-green-600 mt-2 text-sm">{message}</p>}
      </form>
    );
  }

  // Step 3: Enter new password
  if (step === 3) {
    return (
      <form onSubmit={handleResetPassword} className="max-w-sm mx-auto p-6 bg-white rounded shadow">
        <h2 className="text-xl text-black font-bold mb-4">Set New Password</h2>
        
        {/* New Password Field */}
        <div className="relative mb-3">
          <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type={showNewPassword ? 'text' : 'password'}
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            placeholder="New password"
            required
            className="w-full pl-10 pr-10 py-2 border rounded text-black bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gold"
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gold focus:outline-none"
            onClick={() => setShowNewPassword(!showNewPassword)}
            tabIndex={-1}
          >
            {showNewPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        {/* Repeat Password Field */}
        <div className="relative mb-3">
          <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type={showRepeatPassword ? 'text' : 'password'}
            value={repeatPassword}
            onChange={e => setRepeatPassword(e.target.value)}
            placeholder="Repeat new password"
            required
            className="w-full pl-10 pr-10 py-2 border rounded text-black bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gold"
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gold focus:outline-none"
            onClick={() => setShowRepeatPassword(!showRepeatPassword)}
            tabIndex={-1}
          >
            {showRepeatPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <button type="submit" disabled={isLoading} className="w-full bg-gold text-brown font-bold py-2 rounded">
          {isLoading ? 'Resetting...' : 'Reset Password'}
        </button>
        <button type="button" className="w-full mt-2 text-sm underline text-brown" onClick={() => setStep(2)}>
          Back to OTP
        </button>
        {error && <p className="text-red-600 mt-2 text-sm">{error}</p>}
        {message && <p className="text-green-600 mt-2 text-sm">{message}</p>}
      </form>
    );
  }

  // Step 4: Success
  return (
    <div className="max-w-sm mx-auto p-6 bg-white rounded shadow text-center">
      <h2 className="text-xl font-bold mb-4 text-green-700">Password Reset Successful!</h2>
      <p className="mb-4 text-black">You can now <a href="/sign-in" className="text-brown underline font-bold">sign in</a> with your new password.</p>
    </div>
  );
}