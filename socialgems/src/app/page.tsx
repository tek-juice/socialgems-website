import Image from "next/image";
import Navbar from "./components/navbar"
import Footer from "./components/footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">

      <Navbar />
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-20 px-8 bg-gray-100">
        <Image src="/hero-image.webp" alt="Hero Image" width={1920} height={1280} className="w-full h-[]60vh object-cover" />
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

      <Footer />
    </div>
  );
}
