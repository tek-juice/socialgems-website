'use client';

import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      // Send the login credentials to the API
      const response = await fetch('/api/admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      // Check if the login was successful
      if (data.success) {
        // Save the token (you could also store it in a cookie)
        localStorage.setItem('adminToken', data.token);

        // Redirect to the admin dashboard
        router.push('/admin/dashboard');
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred during login');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white-100">
      <Navbar />
      <div className="flex-grow flex items-center justify-center p-10">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md mt-10">
          <h1 className="text-2xl font-bold text-gray-800 text-center mb-10">Admin Login</h1>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          <form className="bg-white p-10 rounded shadow-md w-96" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border border-gray-500 rounded mt-1 placeholder-gray-400 text-black"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border border-gray-500 rounded mt-1 placeholder-gray-400 text-black"
                placeholder="Enter your password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded hover:bg-gray-800">
              Login
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
