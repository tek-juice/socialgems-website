import Link from "next/link";
const Navbar = () => {
    return (
      <nav className="w-full py-4 px-8 bg-white shadow-md flex justify-between items-center">
        <div className="flex items-center gap-8">
          {/* Left section: Logo and Navigation Links */}
          <h1 className="text-xl font-bold text-gray-800">Social Gems</h1>
          <ul className="flex gap-6">
            <li><Link href="/" className="text-black hover:text-gray-800">Home Page</ Link></li>
            <li><Link href="#" className="text-black hover:text-gray-800">About Us</ Link></li>
            <li><Link href="#" className="text-black hover:text-gray-800">Our Services</ Link></li>
            <li><Link href="#" className="text-black hover:text-gray-800">Blog Posts</ Link></li>
          </ul>
        </div>
        <div className="flex">
          {/* Right section: Signup and Login */}
          <Link href="/signup" className="px-4 py-2 bg-black text-white rounded-md hover:bg-blue-700 mr-4">Sign Up</ Link>
          <Link href="#" className="text-black hover:text-gray-800">Login</ Link>
        </div>
      </nav>
    );
  };
  
  export default Navbar;
  