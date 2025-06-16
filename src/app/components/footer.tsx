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
                <li><Link href="/privacypolicy" className="text-gray-400 hover:text-white">Privacy Policy</ Link></li>
                <li><Link href="/privacypolicy" className="text-gray-400 hover:text-white">Safety</ Link></li>
                <li><Link href="/about" className="text-gray-400 hover:text-white">About Us</ Link></li>
                <li><Link href="/services" className="text-gray-400 hover:text-white">Our Services</ Link></li>
              </ul>
            </div>
  
            {/* Connect with Us */}
            <div className="flex flex-col items-center sm:items-start">
              <h3 className="text-lg font-semibold mb-2">Connect with Us</h3>
              <ul className="space-y-2">
                <li><Link href="https://www.facebook.com/share/1DRXjrUcan/?mibextid=LQQJ4d" className="text-gray-400 hover:text-white">Facebook</ Link></li>
                <li><Link href="https://x.com/socialgems_ug?s=21&t=e3hDCBTz5hi2lkSy-3BO9A" className="text-gray-400 hover:text-white">Twitter</ Link></li>
                <li><Link href="https://www.instagram.com/socialgems.ug?igsh=YXJoYzl5bTBvMTRn" className="text-gray-400 hover:text-white">Instagram</ Link></li>
                <li><Link href="https://www.tiktok.com/@social_gems_?_t=ZM-8uQSMzJIl7O&_r=1" className="text-gray-400 hover:text-white">TikTok</Link></li>
                <li><Link href="https://www.linkedin.com/company/social-gems-africa/" className="text-gray-400 hover:text-white">LinkedIn</ Link></li>
                <li><Link href="https://youtube.com/@socialgems.africa?si=D1fE5QGW43k3cxS_" className="text-gray-400 hover:text-white">YouTube</Link></li>
              </ul>
            </div>
  
            {/* Legal */}
            <div className="flex flex-col items-center sm:items-start">
              <h3 className="text-lg font-semibold mb-2">Legal</h3>
              <ul className="space-y-2">
                <li><Link href="/terms-of-use" className="text-gray-400 hover:text-white">Terms of Use</ Link></li>
                <li><Link href="/privacypolicy" className="text-gray-400 hover:text-white">Cookie Policy</ Link></li>
                <li><Link href="/privacypolicy" className="text-gray-400 hover:text-white">Disclaimers</ Link></li>
              </ul>
            </div>
  
            {/* Contact Us */}
            <div className="flex flex-col items-center sm:items-start">
              <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
              <ul className="space-y-2">
                <li><Link href="/contact" className="text-gray-400 hover:text-white">Email Us</ Link></li>
                
              </ul>
            </div>
            <div>
              <span>Call us on +256767458425</span>
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
  