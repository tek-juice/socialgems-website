'use client'

import Link from "next/link";
import Image from "next/image";
import { useState } from 'react';
import { usePathname } from "next/navigation";
const Navbar = () => {
  const pathname = usePathname(); //gets the current route
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
              //{ name: "Blog", path: "/blogpost" },
              { name: "Contact", path: "/contact" }
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
          {/* Right section: Signup and Login */}
          <Link 
            href="/login" 
            className="w-32 h-10 flex justify-center items-center 
            bg-gold text-black px-6 py-2 rounded-lg hover:text-black 
            hover:bg-white hover:border-2 hover:border-[#FFD700] 
            hover:bg-opacity-90 transition duration-300"
            >
              Login
          </ Link>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 right-0 bg-white shadow-lg py-2 z-50 mx-4 rounded-md">
            {[
              { name: "Home", path: "/" },
              { name: "About", path: "/about" },
              { name: "Influencers", path: "/influencers" },
              { name: "Brands", path: "/signup" },
              //{ name: "Blog", path: "/blogpost" },
              { name: "Contact", path: "/contact" }
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
            <Link 
              href="/login" 
              className="block px-4 py-3 bg-gold text-black hover:bg-opacity-80 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Login
            </Link>
          </div>
        )}
      </nav>
    );
  };
  
  export default Navbar;
  