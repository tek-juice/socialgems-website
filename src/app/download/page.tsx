// Download page with styled modal
'use client'
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

export default function DownloadPage() {
  const [ isClient, setIsClient ] = useState(false);
  const router = useRouter();

  // Auto-show modal on page load
  useEffect(() => {
    setIsClient(true);
    const modal = document.getElementById('downloadModal');
    if (modal) modal.style.display = 'flex';
  }, []);

  // Close modal handler
  const closeModal = () => {
    const modal = document.getElementById('downloadModal');
    if (modal) modal.style.display = 'none';
  };

  // Device detection (optional)
  const isAndroid = isClient ? /android/i.test(navigator.userAgent) : false;
  const isIOS = isClient ? /iphone|ipad|ipod/i.test(navigator.userAgent) : false;

  if (!isClient) return null; //or a loading state.

  return (
    <>
    <Navbar />

      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        {/* Fallback content */}
        <div id="fallback" className="text-center max-w-md">
          <h1 className="text-3xl font-bold mb-4 text-black">Download Social Gems</h1>
          <p className="mb-6 text-black">Choose your platform to download the app:</p>
          <div className="space-y-4">
            <a
              href="https://play.google.com/store/apps/details?id=com.tekjuice.social_gems"
              className="block bg-[#3ddc84] text-white py-3 px-6 rounded-lg font-medium hover:bg-[#2fc272] transition-colors"
            >
              Download for Android
            </a>
            <a
              href="https://apps.apple.com/ug/app/social-gems/id6736918664"
              className="block bg-black text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-800 transition-colors"
            >
              Download for iOS
            </a>
          </div>
        </div>

        {/* Modal */}
        <div
          id="downloadModal"
          className="hidden fixed inset-0 bg-black bg-opacity-70 z-50 items-center justify-center p-4"
          onClick={(e) => e.target === e.currentTarget && closeModal()}
        >
          <div className="bg-white rounded-xl p-8 max-w-sm w-full relative">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            
            <div className="text-center">
              <Image
                src="/social-gems-fn.webp" // Your logo path
                alt="Social Gems Logo"
                width={120}
                height={120}
                className="mx-auto mb-6"
              />
              <h2 className="text-2xl font-bold mb-4 text-black">Download Social Gems</h2>
              <p className="mb-6 text-black">Get the app for your device:</p>
              
              <div className="space-y-4">
                <a
                  href="https://play.google.com/store/apps/details?id=com.tekjuice.social_gems"
                  className={`block bg-[#3ddc84] text-white py-3 px-6 rounded-lg font-medium hover:bg-[#2fc272] transition-colors ${
                    isAndroid ? 'ring-4 ring-[#3ddc84]/50' : ''
                  }`}
                >
                  Google Play Store
                </a>
                <a
                  href="https://apps.apple.com/ug/app/social-gems/id6736918664"
                  className={`block bg-black text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-800 transition-colors ${
                    isIOS ? 'ring-4 ring-gray-400' : ''
                  }`}
                >
                  Apple App Store
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}