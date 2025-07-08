//this is a sign in page for influencers/brands
'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FaUser, FaLock } from 'react-icons/fa';
import { FiLogIn } from 'react-icons/fi';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import ResetPasswordForm from '../components/ResetPasswordForm/page';
//import { db } from '@vercel/postgres';

interface SignInForm {
    email: string;
    password: string;
}

export default function SignInPage() {
    const [formData, setFormData] = useState<SignInForm>({
        email: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState<'success' | 'error' | null>(null);
    const [showMessage, setShowMessage] = useState(false);
    const [user, setUser] = useState<any>(null);
    const [profile, setProfile] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showReset, setShowReset] = useState(false);

    // Get redirect URL from query parameters
    const redirectUrl = searchParams.get('redirect') || '/create-story';

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Add sign-in logic here
        setIsLoading(true);
        const response = await fetch('/api/sign-in',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify(formData)
        });

        if (response.ok){
            const data = await response.json();
            // Store token in sessionStorage for better persistence
            sessionStorage.setItem('userToken', data.token);
            localStorage.setItem('token', data.token);
            //store user data in state
            setUser(data.user);
            setProfile(data.user);

            setMessage('Sign in successful!');
            setMessageType('success');
            setShowMessage(true);
            setTimeout(() => setShowMessage(false), 4000);
            setTimeout(() => router.push(redirectUrl), 1200); // redirect to original page
        } else {
            const errorData = await response.json();
            setMessage(errorData.error || 'Sign in failed');
            setMessageType('error');
            setShowMessage(true);
            setTimeout(() => setShowMessage(false), 4000);
        }
        setIsLoading(false);
    }

    useEffect(() => {
        if (!showMessage) {
            setTimeout(() => {
                setMessage('');
                setMessageType(null);
            }, 500);
        }
    }, [showMessage]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />
            <div className="flex-1 flex items-center justify-center">
                <div className="bg-white p-8 mt-5 mb-5 rounded-lg shadow-md w-96 min-h-[420px] flex flex-col justify-center">
                    <h2 className="text-2xl text-black font-bold text-center mb-6">Sign In</h2>
                    {showMessage && (
                        <p className={`text-center mb-4 transition-opacity duration-500 ${messageType === 'success' ? 'text-green-500' : 'text-red-500'} ${showMessage ? 'opacity-100' : 'opacity-0'}`}>{message}</p>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <div className="relative mt-1">
                                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gold text-black"
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <div className="relative mt-1">
                                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-10 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gold text-black"
                                    placeholder="Enter your password"
                                    required
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gold focus:outline-none"
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    tabIndex={-1}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </div>
                        <div className="mb-3 text-right">
                            <button
                                type="button"
                                className="text-sm text-brown underline hover:text-gold"
                                onClick={() => setShowReset(true)}
                            >
                                Forgot password?
                            </button>
                        </div>
                        <button
                            type="submit"
                            className="w-full flex items-center justify-center gap-2 bg-gold text-brown font-bold py-2 px-4 rounded-lg hover:bg-yellow-300 transition-colors"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-brown"></div>
                            ) : (
                                <FiLogIn />
                            )}
                            {isLoading ? 'Signing In...' : 'Sign In'}
                        </button>
                    </form>
                    <div className="mt-4 text-center">
                        <span className="text-gray-600"> Don't have an account? </span>
                        <a href="/create-profile" className="text-gold font-semibold hover:underline">Create Profile</a>
                    </div>
                </div>
            </div>
            <Footer />
            {showReset && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 relative">
                        <button
                            className="absolute top-2 right-2 text-gray-500 hover:text-brown text-2xl"
                            onClick={() => setShowReset(false)}
                        >
                            &times;
                        </button>
                        <ResetPasswordForm />
                    </div>
                </div>
            )}
        </div>
    );
}

