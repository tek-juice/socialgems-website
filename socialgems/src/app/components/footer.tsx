import Link from "next/link";

const Footer = () => {
    return (
      <footer className="bg-black text-white py-8">
        <div className="max-w-screen-xl mx-auto px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center sm:text-left">
            {/* Explore More */}
            <div className="flex flex-col items-center sm:items-start">
              <h3 className="text-lg font-semibold mb-2">Explore More</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-400 hover:text-white">Privacy Policy</ Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white">Safety</ Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white">About Us</ Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white">Our Services</ Link></li>
              </ul>
            </div>
  
            {/* Connect with Us */}
            <div className="flex flex-col items-center sm:items-start">
              <h3 className="text-lg font-semibold mb-2">Connect with Us</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-400 hover:text-white">Facebook</ Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white">Twitter</ Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white">Instagram</ Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white">LinkedIn</ Link></li>
              </ul>
            </div>
  
            {/* Legal */}
            <div className="flex flex-col items-center sm:items-start">
              <h3 className="text-lg font-semibold mb-2">Legal</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-400 hover:text-white">Terms of Service</ Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white">Cookie Policy</ Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white">Disclaimers</ Link></li>
              </ul>
            </div>
  
            {/* Follow Us */}
            <div className="flex flex-col items-center sm:items-start">
              <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-400 hover:text-white">Facebook</ Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white">Twitter</ Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white">Instagram</ Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white">LinkedIn</ Link></li>
              </ul>
            </div>
  
            {/* Contact Us */}
            <div className="flex flex-col items-center sm:items-start">
              <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-400 hover:text-white">Email Us</ Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white">Support</ Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white">Help Center</ Link></li>
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
  