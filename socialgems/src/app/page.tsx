import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="w-full py-4 px-8 bg-white shadow-md flex justify-between items-center">
        <div className="flex items-center gap-8"> {/*Left section: logo and Navigation Links */}
          <h1 className="text-xl font-bold text-gray-800">Social Gems</h1>
          <ul className="flex gap-6">
            <li>
              <a href="#" className="text-black hover:text-gray-800">
                Home Page
              </a>
            </li>
            <li>
              <a href="#" className="text-black hover:text-gray-800">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="text-black hover:text-gray-800">
                Our Services
              </a>
            </li>
            <li>
              <a href="#" className="text-black hover:text-gray-800">
                Blog Posts
              </a>
            </li>
          </ul>
        </div>
        <div className="flext">
          {/*Right section: signup and login*/}
          <a href="#" className="px-4 py-2 bg-black text-white rounded-md hover:bg-blue-700 mr-4">
              Sign Up
            </a>

          <a href="#" className="text-black hover:text-gray-800">
            Login
            </a>
        </div>
        
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-20 px-8 bg-gray-100">
        <Image src="/hero-image.jpg" alt="Hero Image" width={1920} height={1280} className="w-full h-[]60vh object-cover" />
        <h2 className="text-3xl font-bold text-gray-800 mt-6">Discover Social Gems</h2>
        <p className="text-gray-600 mt-2 max-w-lg">
          Connecting you to a world of amazing experiences and meaningful connections.
        </p>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-8 text-center">
        <h3 className="text-2xl font-bold text-gray-800">Join the Community</h3>
        <p className="text-gray-600 mt-2">Be part of something special and start exploring today.</p>
        <button className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700">
          Get Started
        </button>
      </section>

      {/* Footer */}
      <div className="max-w-screen-xl mx-auto px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center sm:text-left">
          {/* Explore More */}
          <div className="flex flex-col items-center sm:items-start">
            <h3 className="text-lg font-semibold mb-2">Explore More</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Safety</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Our Services</a></li>
            </ul>
          </div>

          {/* Connect with Us */}
          <div className="flex flex-col items-center sm:items-start">
            <h3 className="text-lg font-semibold mb-2">Connect with Us</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white">Facebook</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Twitter</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Instagram</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">LinkedIn</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="flex flex-col items-center sm:items-start">
            <h3 className="text-lg font-semibold mb-2">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white">Terms of Service</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Cookie Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Disclaimers</a></li>
            </ul>
          </div>

          {/* Follow Us */}
          <div className="flex flex-col items-center sm:items-start">
            <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white">Facebook</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Twitter</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Instagram</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">LinkedIn</a></li>
            </ul>
          </div>

          {/* Contact Us */}
          <div className="flex flex-col items-center sm:items-start">
            <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white">Email Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Support</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Help Center</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p>© 2025 Social Gems. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
