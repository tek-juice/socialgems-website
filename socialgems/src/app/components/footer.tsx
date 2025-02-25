const Footer = () => {
    return (
      <footer className="bg-black text-white py-8">
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
      </footer>
    );
  };
  
  export default Footer;
  