'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        
        if (!token) {
          setIsAuthenticated(false);
          setIsLoading(false);
          router.push('/sign-in');
          return;
        }

        try {
          const decoded: any = jwtDecode(token);
          // Check if token is expired
          const currentTime = Date.now() / 1000;
          if (decoded.exp && decoded.exp < currentTime) {
            localStorage.removeItem('token');
            setIsAuthenticated(false);
            setIsLoading(false);
            router.push('/sign-in');
            return;
          }
          
          setIsAuthenticated(true);
          setIsLoading(false);
        } catch (e) {
          console.error('Token decode error:', e);
          localStorage.removeItem('token');
          setIsAuthenticated(false);
          setIsLoading(false);
          router.push('/sign-in');
        }
      } else {
        // Server-side rendering - set loading to false
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold mx-auto mb-4"></div>
          <p className="text-brown font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect to sign-in page
  }

  return <>{children}</>;
};

export default ProtectedRoute;
