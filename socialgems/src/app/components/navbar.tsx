import Link from "next/link";
const Navbar = () => {
    return (
      <nav className="w-full py-4 px-8 bg-white shadow-md flex justify-between items-center">
        <div className="flex items-center gap-8">
          {/* Left section: Logo and Navigation Links */}
          <h1 className="text-xl font-bold text-black">Social Gems</h1>
          <ul className="flex gap-6">
            <li><Link href="/" className="px-2 py-2 rounded-md text-black bg-yellow-400 hover:bg-amber-500 hover:text-black">Home Page</ Link></li>
            <li><Link href="#" className="px-2 py-2 rounded-md text-black bg-yellow-400 hover:bg-amber-500 hover:text-black">About Us</ Link></li>
            <li><Link href="#" className="px-2 py-2 rounded-md text-black bg-yellow-400 hover:bg-amber-500 hover:text-black">Our Services</ Link></li>
            <li><Link href="#" className="px-2 py-2 rounded-md text-black bg-yellow-400 hover:bg-amber-500 hover:text-black">Blog Posts</ Link></li>
          </ul>
        </div>
        <div className="flex">
          {/* Right section: Signup and Login */}
          <Link href="/signup" className="px-2 py-2 bg-white text-black border border-black rounded-md hover:bg-black hover:text-white hover:border hover:border-black mr-4">Sign Up</ Link>
          <Link href="/login" className=" px-2 py-2 bg-white text-black border border-black rounded-md hover:bg-black hover:text-white hover:border hover:border-black">Login</ Link>
        </div>
      </nav>
    );
  };
  
  export default Navbar;
  