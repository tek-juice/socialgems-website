'use client';

import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [ loading, setLoading ] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);
    setError('');

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
      if (data.success && data.token) {
        // Save the token (you could also store it in a cookie)
        sessionStorage.setItem('adminToken', data.token);

        // Redirect to the admin dashboard
        router.push('/admin/dashboard');
        router.refresh(); //prevents blank screen
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred during login');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    sessionStorage.removeItem('adminToken');
  },[]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <div className="flex-grow flex items-center justify-center p-4 sm:p-6">
        <div className="bg-white p-6 sm:p-8 rounded-lg shadow-[0_0_20px_rgba(0,0,0,0.3)] w-full max-w-md">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800 text-center mb-6">
            Admin Login
          </h1>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border border-gray-500 rounded placeholder-gray-400 text-black text-sm"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border border-gray-500 rounded placeholder-gray-400 text-black text-sm"
                placeholder="Enter your password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gold text-black py-2 rounded hover:bg-brown text-sm sm:text-base flext items-center justify-center min-h-[42px] relative"
              disabled={loading}
            >
              {loading ? (
                <span className="inline-flex items-center translate-x-[-8px] space-x-2">
                  <svg 
                    className="animate-spin ml-3 mr-2 h-5 w-5 text-black" 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24"
                  >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Logging in...</span>
                </span>
              ) : (
                "Login"
              )}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}