'use client'

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from 'react';
import { usePathname } from "next/navigation";
import { FaSearch, FaUserCircle, FaSignOutAlt, FaKey } from 'react-icons/fa';
import { jwtDecode } from 'jwt-decode';
import ResetPasswordForm from './ResetPasswordForm/page';

const SEARCHABLE_PAGES = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Influencers", path: "/influencers" },
  { name: "Brands", path: "/signup" },
  { name: "Blog", path: "/blogpost" },
  { name: "Contact", path: "/contact" },
  { name: "FAQ", path: "/faq" },
  // Add more public topics/content as needed
];

const Navbar = () => {
  const pathname = usePathname(); //gets the current route
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [showReset, setShowReset] = useState(false);

  // Check for JWT in sessionStorage and decode
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = sessionStorage.getItem('userToken');
      if (token) {
        try {
          const decoded: any = jwtDecode(token);
          setUser(decoded);
          //set profile data from token directly
          setProfile({
            email: decoded.email,
            image: decoded.image || null
          });
        } catch (e) {
          console.error('Token decode error;', e);
          setUser(null);
          setProfile(null);
          // Clear invalid tokens
          sessionStorage.removeItem('userToken');
        }
      } else {
        setUser(null);
      }
    }
  }, []);

  // Fetch profile info if user is set
  useEffect(() => {
    const fetchProfile = async () => {
      if (user?.email) {
        try {
          const res = await fetch(`/api/create-profile?email=${encodeURIComponent(user.email)}`);
          if (res.ok) {
            const data = await res.json();
            setProfile(data.profile);
          }
        } catch (e) {
          setProfile(null);
        }
      }
    };
    fetchProfile();
  }, [user]);

  // Handle sign out
  const handleSignOut = async () => {
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
      
      // Clear sessionStorage
      sessionStorage.removeItem('userToken');
      
      // Also clear cookies client-side as backup
      document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie = 'userToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      
      setUser(null);
      setProfile(null);
      setIsProfileOpen(false);
      
      // Force a page reload to ensure middleware picks up the cleared cookies
      window.location.href = '/';
    }
  };

  // Handle Share Your Story click: always open dropdown
  const handleShareClick = () => {
    setIsShareOpen(!isShareOpen);
  };

  // Handle Share option click
  const handleShareOptionClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
    if (!user) {
      e.preventDefault();
      if (typeof window !== 'undefined') {
        window.location.href = `/sign-in?redirect=${encodeURIComponent(href)}`;
      }
    }
    // else, allow normal navigation
  };

  //search site
  const handleSearch = () => {
    const query = searchValue.trim().toLowerCase();
    if (!query) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }
    const pageMatches = SEARCHABLE_PAGES.filter(page =>
      page.name.toLowerCase().includes(query)
    );
    setSearchResults(pageMatches);
    setShowResults(true);
  };

  // Hide results when clicking outside
  useEffect(() => {
    if (!showResults) return;
    const handleClick = (e: MouseEvent) => {
      setShowResults(false);
    };
    if (typeof document !== 'undefined') {
      document.addEventListener('click', handleClick);
      return () => document.removeEventListener('click', handleClick);
    }
  }, [showResults]);

  // Close share dropdown when clicking outside
  useEffect(() => {
    if (!isShareOpen) return;
    const handleClick = (e: MouseEvent) => {
      const target = e.target as Element;
      if (!target.closest('.share-dropdown')) {
        setIsShareOpen(false);
      }
    };
    if (typeof document !== 'undefined') {
      document.addEventListener('click', handleClick);
      return () => document.removeEventListener('click', handleClick);
    }
  }, [isShareOpen]);

  return (
    <nav className="w-full py-4 px-4 bg-white shadow-[0_0_20px_rgba(0,0,0,0.3)] flex md:flex-row justify-between items-center rounded-md">
      <div className="flex-shrink-0">
        <Image 
          src="/social-gems-fn-200.png" 
          width={100} 
          height={100} 
          alt="social gems" 
          className="object-contain"
        />
      </div>

      {/* Hamburger Menu Button (Mobile) */}
      <button 
        className="md:hidden p-2 rounded-full hover:bg-gray-100"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <svg className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
          
      <div className="hidden md:flex items-center gap-4 rounded-md mr-20">
        {/* Left section: Logo and Navigation Links */}
        <ul className="flex gap-4">
          {[
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
            { name: "Influencers", path: "/influencers" },
            { name: "Brands", path: "/signup" },
            { name: "Blog", path: "/blogpost" },
            { name: "Contact", path: "/contact" },
            {name: "FAQ", path:"/faq"}
          ].map(({ name, path }) => (
            <li key={path}>
              <Link 
                href={path} 
                className={`px-2 py-2 rounded-md text-black hover:bg-gold hover:text-black transition-colors ${
                  pathname === path ? "border-b-4 font-bold border-gold" : ""
                }`}
              >
                {name}
              </Link>
            </li>
          ))}
        </ul>
        {/* Search Bar */}
        <div className="relative flex items-center ml-4">
          <FaSearch className="absolute left-3 text-gray-400" />
          <input
            type="text"
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') handleSearch(); }}
            placeholder="Search..."
            className="pl-10 pr-3 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gold text-black w-48"
            onClick={e => e.stopPropagation()}
          />
          <button onClick={e => { e.stopPropagation(); handleSearch(); }} className="ml-2 text-brown hover:bg-gold/20 font-bold">Go</button>
          {showResults && (
            <div className="absolute top-12 left-0 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
              {searchResults.length > 0 ? (
                <ul>
                  {searchResults.map((result, idx) => (
                    <li key={idx}>
                      <Link href={result.path} legacyBehavior>
                        <a className="block px-4 py-2 hover:bg-gold/20 text-brown" onClick={() => setShowResults(false)}>{result.name}</a>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="px-4 py-2 text-gray-500">No results found.</div>
              )}
            </div>
          )}
        </div>
        {/* Share Your Story */}
        <div className="relative ml-4 share-dropdown">
          <button
            onClick={handleShareClick}
            className="flex items-center gap-2 px-4 py-2 bg-gold text-brown font-bold rounded-full shadow hover:bg-yellow-300 transition-colors"
          >
            Share Your Story
          </button>
          {isShareOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-2">
              <ul className="space-y-2">
                <li><a href="/create-story" onClick={e => handleShareOptionClick(e, '/create-story')} className="block px-4 py-2 rounded hover:bg-gold/20 text-brown">Story</a></li>
                <li><a href="/create-story" onClick={e => handleShareOptionClick(e, '/create-story')} className="block px-4 py-2 rounded hover:bg-gold/20 text-brown">Picture/Comic Story</a></li>
                <li><a href="/create-story" onClick={e => handleShareOptionClick(e, '/create-story')} className="block px-4 py-2 rounded hover:bg-gold/20 text-brown">Audio Story</a></li>
                <li><a href="/create-story" onClick={e => handleShareOptionClick(e, '/create-story')} className="block px-4 py-2 rounded hover:bg-gold/20 text-brown">Poll</a></li>
                <li><a href="/create-story" onClick={e => handleShareOptionClick(e, '/create-story')} className="block px-4 py-2 rounded hover:bg-gold/20 text-brown">Trivia Quiz</a></li>
              </ul>
            </div>
          )}
        </div>
        {/* User Actions - Only show for signed-in users */}
        {user && (
          <div className="flex items-center gap-3 ml-4">
            {/* Change Password Icon */}
            <div className="relative group">
              <button
                onClick={() => setShowReset(true)}
                className="p-2 rounded-full hover:bg-gold/20 transition-colors text-brown hover:text-gold"
                title="Change Password"
              >
                <FaKey className="text-xl" />
              </button>
              {/* Tooltip */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-1 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
                Change Password
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-800"></div>
              </div>
            </div>
            
            {/* Logout Icon */}
            <div className="relative group">
              <button
                onClick={handleSignOut}
                className="p-2 rounded-full hover:bg-red-100 transition-colors text-brown hover:text-red-600"
                title="Logout"
              >
                <FaSignOutAlt className="text-xl" />
              </button>
              {/* Tooltip */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-1 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
                Logout
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-800"></div>
              </div>
            </div>
          </div>
        )}
        
        {/* Show ResetPasswordForm as modal */}
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

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 right-0 bg-white shadow-lg py-2 z-50 mx-4 rounded-md">
          {/* Mobile Nav Links */}
          {[
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
            { name: "Influencers", path: "/influencers" },
            { name: "Brands", path: "/signup" },
            { name: "Blog", path: "/blogpost" },
            { name: "Contact", path: "/contact" },
            { name: "FAQ", path:"/faq" }
          ].map(({ name, path }) => (
            <Link 
              key={path}
              href={path} 
              className="block px-4 py-3 text-black hover:bg-gold hover:text-black transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {name}
            </Link>
          ))}
          {/* Mobile Search Bar */}
          <div className="relative flex items-center my-2 px-4">
            <FaSearch className="absolute left-3 text-gray-400" />
            <input
              type="text"
              value={searchValue}
              onChange={e => setSearchValue(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') handleSearch(); }}
              placeholder="Search..."
              className="pl-10 pr-3 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gold text-black w-full"
              onClick={e => e.stopPropagation()}
            />
            <button onClick={e => { e.stopPropagation(); handleSearch(); }} className="ml-2 text-gold font-bold">Go</button>
            {showResults && (
              <div className="mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                {searchResults.length > 0 ? (
                  <ul>
                    {searchResults.map((result, idx) => (
                      <li key={idx}>
                        <Link href={result.path} legacyBehavior>
                          <a className="block px-4 py-2 hover:bg-gold/20 text-brown" onClick={() => setShowResults(false)}>{result.name}</a>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="px-4 py-2 text-gray-500">No results found.</div>
                )}
              </div>
            )}
          </div>
          {/* Mobile Share Your Story */}
          <div className="relative my-2 px-4 share-dropdown">
            <button
              onClick={handleShareClick}
              className="w-full flex items-center gap-2 px-4 py-2 bg-gold text-brown font-bold rounded-full shadow hover:bg-yellow-300 transition-colors"
            >
              Share Your Story
            </button>
            {isShareOpen && (
              <div className="mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-2">
                <ul className="space-y-2">
                  <li><a href="/create-story" onClick={e => handleShareOptionClick(e, '/create-story')} className="block px-4 py-2 rounded hover:bg-gold/20 text-brown">Story</a></li>
                  <li><a href="/create-story" onClick={e => handleShareOptionClick(e, '/create-story')} className="block px-4 py-2 rounded hover:bg-gold/20 text-brown">Picture/Comic Story</a></li>
                  <li><a href="/create-story" onClick={e => handleShareOptionClick(e, '/create-story')} className="block px-4 py-2 rounded hover:bg-gold/20 text-brown">Audio Story</a></li>
                  <li><a href="/create-story" onClick={e => handleShareOptionClick(e, '/create-story')} className="block px-4 py-2 rounded hover:bg-gold/20 text-brown">Poll</a></li>
                  <li><a href="/create-story" onClick={e => handleShareOptionClick(e, '/create-story')} className="block px-4 py-2 rounded hover:bg-gold/20 text-brown">Trivia Quiz</a></li>
                </ul>
              </div>
            )}
          </div>
          
          {/* Mobile User Actions - Only show for signed-in users */}
          {user && (
            <div className="border-t border-gray-200 pt-2 mt-2">
              <div className="flex items-center justify-center gap-4 px-4">
                {/* Change Password Button */}
                <button
                  onClick={() => { setShowReset(true); setIsMobileMenuOpen(false); }}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                >
                  <FaKey className="text-lg" />
                  <span>Change Password</span>
                </button>
                
                {/* Logout Button */}
                <button
                  onClick={() => { handleSignOut(); setIsMobileMenuOpen(false); }}
                  className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                >
                  <FaSignOutAlt className="text-lg" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
  