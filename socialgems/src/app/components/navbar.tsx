const Navbar = () => {
    return (
      <nav className="w-full py-4 px-8 bg-white shadow-md flex justify-between items-center">
        <div className="flex items-center gap-8">
          {/* Left section: Logo and Navigation Links */}
          <h1 className="text-xl font-bold text-gray-800">Social Gems</h1>
          <ul className="flex gap-6">
            <li><a href="/" className="text-black hover:text-gray-800">Home Page</a></li>
            <li><a href="#" className="text-black hover:text-gray-800">About Us</a></li>
            <li><a href="#" className="text-black hover:text-gray-800">Our Services</a></li>
            <li><a href="#" className="text-black hover:text-gray-800">Blog Posts</a></li>
          </ul>
        </div>
        <div className="flex">
          {/* Right section: Signup and Login */}
          <a href="/signup" className="px-4 py-2 bg-black text-white rounded-md hover:bg-blue-700 mr-4">Sign Up</a>
          <a href="#" className="text-black hover:text-gray-800">Login</a>
        </div>
      </nav>
    );
  };
  
  export default Navbar;
  