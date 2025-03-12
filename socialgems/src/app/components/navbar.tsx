'use client'

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
const Navbar = () => {
  const pathname = usePathname(); //gets the current route

    return (
      <nav className="w-full py-4 px-4 bg-white shadow-[0_0_20px_rgba(0,0,0,0.3)] flex flex-col md:flex-row justify-between items-center rounded-md">
        <div className="flex-shrink-0">
          <Image 
            src="/social-gems-fn-200.png" 
            width={100} 
            height={100} 
            alt="social gems" 
            className="object-contain"
            />
        </div>
          
        <div className="flex flex-col md:flex-row items-center gap-4 mt-4 md:mt-0 rounded-md">
          {/* Left section: Logo and Navigation Links */}
          <ul className="flex flex-wrap justify-center gap-2 md:gap-4">

            {[
              { name: "Home", path: "/" },
              { name: "About", path: "/about" },
              { name: "Influencers", path: "/influencers" },
              { name: "Brands", path: "/signup" },
              { name: "Services", path: "/services" },
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
        </div>
        <div className="flex">
          {/* Right section: Signup and Login */}
          <Link href="/login" className="w-32 h-10 flex justify-center items-center bg-gold text-black px-6 py-2 rounded-lg hover:text-black hover:bg-white hover:border-2 hover:border-[#FFD700] hover:bg-opacity-90 transition duration-300">Login</ Link>
        </div>
      </nav>
    );
  };
  
  export default Navbar;
  