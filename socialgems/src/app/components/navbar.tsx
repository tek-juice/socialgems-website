import Link from "next/link";
import Image from "next/image";
const Navbar = () => {
    return (
      <nav className="w-full py-4 px-4 bg-white shadow-md flex justify-between items-center rounded-md">
        <Image src="/social-gems-fn-200.png" width={100} height={100} alt="social gems" className="object-contain" />
        <div className="flex items-center gap-6 rounded-md">
          {/* Left section: Logo and Navigation Links */}
          <ul className="flex gap-4">
            <li><Link href="/" className="px-2 py-2 rounded-md text-black hover:bg-gold hover:text-black transition-colors">Home</ Link></li>
            <li><Link href="/influencers" className="px-2 py-2 rounded-md text-black hover:bg-gold hover:text-black transition-colors">Influencers</ Link></li>
            <li><Link href="/signup" className="px-2 py-2 rounded-md text-black hover:bg-gold hover:text-black transition-colors">Brands</ Link></li>
            <li><Link href="/about" className="px-2 py-2 rounded-md text-black hover:bg-gold hover:text-black transition-colors">About</ Link></li>
            <li><Link href="/contact" className="px-2 py-2 rounded-md text-black hover:bg-gold hover:text-black transition-colors">Contact</ Link></li>
            <li><Link href="/services" className="px-2 py-2 rounded-md text-black hover:bg-gold hover:text-black transition-colors">Services</ Link></li>
            <li><Link hidden href="blogpost" className="px-2 py-2 rounded-md text-black hover:bg-gold hover:text-black transition-colors">Blog Posts</ Link></li>
          </ul>
        </div>
        <div className="flex">
          {/* Right section: Signup and Login */}
          <Link hidden href="/login" className=" px-2 py-2 bg-white text-black border border-black rounded-md hover:bg-black hover:text-white hover:border hover:border-black">Login</ Link>
        </div>
      </nav>
    );
  };
  
  export default Navbar;
  