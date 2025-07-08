'use client'

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from 'react';
import { usePathname } from "next/navigation";
import { FaSearch, FaUserCircle } from 'react-icons/fa';
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

  // Check for JWT in sessionStorage/localStorage and decode
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = sessionStorage.getItem('userToken') || localStorage.getItem('token');
      if (token) {
        try {
          const decoded: any = jwtDecode(token);
          setUser(decoded);
          //set profile data from token directly
          setProfile({
            email: decoded.email,
            image: decoded.image || null
          });
          // Ensure token is in sessionStorage for consistency
          sessionStorage.setItem('userToken', token);
        } catch (e) {
          console.error('Token decode error;', e);
          setUser(null);
          setProfile(null);
          // Clear invalid tokens
          sessionStorage.removeItem('userToken');
          localStorage.removeItem('token');
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
  const handleSignOut = () => {
    sessionStorage.removeItem('userToken');
    localStorage.removeItem('token');
    setUser(null);
    setProfile(null);
    setIsProfileOpen(false);
    window.location.href = '/';
  };

  // Handle Share Your Story click: always open dropdown
  const handleShareClick = () => {
    setIsShareOpen(!isShareOpen);
  };

  // Handle Share option click
  const handleShareOptionClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
    if (!user) {
      e.preventDefault();
      window.location.href = `/sign-in?redirect=${encodeURIComponent(href)}`;
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
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [showResults]);

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
        <div className="relative ml-4">
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
        {/* Profile Dropdown */}
        <div className="relative ml-4">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center focus:outline-none"
          >
            {profile?.image ? (
              <Image src={profile.image} width={40} height={40} alt="Profile" className="rounded-full object-cover border-2 border-brown" />
            ) : (
              <FaUserCircle className="text-3xl text-brown hover:text-gold transition-colors" />
            )}
          </button>
          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-60 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-4 flex flex-col items-center">
              {profile?.image ? (
                <Image src={profile.image} width={60} height={60} alt="Profile" className="rounded-full object-cover mb-2 border-2 border-brown" />
              ) : (
                <FaUserCircle className="text-5xl text-brown mb-2" />
              )}
              <div className="text-black font-bold mb-1">{profile?.email || user?.email || 'Not signed in'}</div>
              {/* Hide Sign In if signed in */}
              {!user && (
                <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gold hover:text-brown" onClick={() => { setIsProfileOpen(false); window.location.href = '/sign-in'; }}>Sign In</button>
              )}
              {/* Change Password option if logged in */}
              {user && (
                <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gold hover:text-brown" onClick={() => { setShowReset(true); setIsProfileOpen(false); }}>Change Password</button>
              )}
              <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gold hover:text-brown" onClick={() => { window.location.href = '/login';}}>Go to Admin Dashboard</button>
              {user && (
                <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-red-100 hover:text-red-700 font-bold" onClick={handleSignOut}>Logout</button>
              )}
            </div>
          )}
        </div>
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
        {/* Right section: Signup and Login */}
        {/* <Link 
          href="/login" 
          className="w-32 h-10 flex justify-center items-center 
          bg-gold text-black px-6 py-2 rounded-lg hover:text-black 
          hover:bg-white hover:border-2 hover:border-[#FFD700] 
          hover:bg-opacity-90 transition duration-300"
          >
            Login
        </ Link>*/}
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
          <div className="relative my-2 px-4">
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
          {/* Mobile Profile Dropdown */}
          <div className="relative my-2 px-4">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="w-full flex items-center justify-center focus:outline-none"
            >
              {profile?.image ? (
                <Image src={profile.image} width={40} height={40} alt="Profile" className="rounded-full object-cover border-2 border-brown" />
              ) : (
                <FaUserCircle className="text-3xl text-brown hover:text-gold transition-colors" />
              )}
            </button>
            {isProfileOpen && (
              <div className="mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-4 flex flex-col items-center">
                {profile?.image ? (
                  <Image src={profile.image} width={60} height={60} alt="Profile" className="rounded-full object-cover mb-2 border-2 border-brown" />
                ) : (
                  <FaUserCircle className="text-5xl text-brown mb-2" />
                )}
                <div className="text-black font-bold mb-1">{profile?.email || user?.email || 'Not signed in'}</div>
                {!user && (
                  <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gold hover:text-brown" onClick={() => { setIsProfileOpen(false); window.location.href = '/sign-in'; }}>Sign In</button>
                )}
                {user && (
                  <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gold hover:text-brown" onClick={() => { setShowReset(true); setIsProfileOpen(false); }}>Change Password</button>
                )}
                <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gold hover:text-brown" onClick={() => { window.location.href = '/login';}}>Go to Admin Dashboard</button>
                {user && (
                  <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-red-100 hover:text-red-700 font-bold" onClick={handleSignOut}>Logout</button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
  