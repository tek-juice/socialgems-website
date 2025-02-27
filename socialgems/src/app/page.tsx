import Image from "next/image";
import Link from "next/link";
import Navbar from "./components/navbar"
import Footer from "./components/footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">

      <Navbar />
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-20 px-8 bg-gray-50">
        <Image src="/hero-image.webp" alt="Hero Image" width={1920} height={1280} className="w-full h-[]60vh object-cover" />
      </section>

      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          {/* First Section */}
          <div className="mb-12 flex items items-start gap-8">
            <h3 className="text-black text-3xl font-bold mb-4 flex-1">
              Unlock Your Influence with Social Gems
            </h3>
            <div className="flex-1 gap-4">
              <p className="text-black text-lg max-w-2xl mx-auto mb-6">
                At Social Gems, we connect brands with diverse 
                influencers to create meaningful partnerships. 
                Join us to inspire and empower your brand’s 
                growth through authentic collaborations.
              </p>
              <Link href="/services" className="px-6 py-2 bg-black text-white hover:bg-white hover:text-black hover:border hover:border-black">
                Learn More
              </Link>
              <Link href="/signup" className="px-6 py-2 ml-4 bg-white text-black border border-black hover:bg-black hover:text-white">
                Sign Up
              </Link>
            </div>
          </div>

          {/* Second Section */}
          <div className="mb-12 flex items items-start gap 8">
            <h3 className="text-black text-3xl font-bold mb-4 flex-1">
              Seamlessly Connecting Brands and Influencers
            </h3>
            <p className="text-black text-lg flex-1 mb-6">
              At Social Gems, we simplify the influencer marketing process. 
              Our platform allows brands to effortlessly discover and engage
              with the right influencers tailored to their needs. With our 
              innovative matchmaking technology, finding the perfect 
              collaboration has never been easier.
            </p>
          </div>

          {/* Third Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <h4 className="text-black text-xl font-bold mb-4">
                Discovering Influencers Made Easy
              </h4>
              <p className="text-black">
                Our intuitive search tools streamline your search.
              </p>
            </div>
            <div className="text-center">
              <h4 className="text-black text-xl font-bold mb-4">
                Engaging with Influencers for Impact
              </h4>
              <p className="text-black">
                Connect directly with influencers for meaningful partnerships.
              </p>
            </div>
            <div className="text-center">
              <h4 className="text-black text-xl font-bold mb-4">
                Your Unique Value Proposition
              </h4>
              <p className="text-black">
                Experience a marketplace that prioritizes real connections.
              </p>
            </div>
          </div>

          {/* Final CTA Section */}
          <div className="text-center">
            <div className="flex gap-4">
              <Link href="/services" className="px-6 py-2 text-black border border-black hover:bg-black hover:text-white">
                Learn More
              </Link>
              <Link href="/signup" className="px-6 py-2 text-black hover:bg-black hover:text-white">
                Sign Up <span className="ml-2">&gt;</span>
              </Link>
            </div>
          </div>

          {/* Fouth Section */}
          <div className="mb-12 mt-10 flex items items-start gap 8">
            <div className="flex-1">
              <h2 className="text-black text-3xl font-bold mt-20 gap-20">
                Discover Your Perfect Influencer Match Today
              </h2>
              <p className="text-black text-lg gpa-20 mt-10">
                Our Smart Matchmaking technology uses data-driven 
                insights to connect brands with influencers who 
                truly reasonate with their audience. 
                Say goodbye to endless searching and help to 
                meaningful collaborations that drive results.
              </p>
            </div>
            <div className="flex-1 mb-6 ml-20">
              <Image src="/match.webp" alt="Match Making" width={450} height={450} />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-8 bg-black mb-5">
        <h3 className="text-2xl font-bold text-white">Start Your Journey With Us</h3>
        <p className="text-white mt-2">Join Social Gems today and unlock endless opportunities for impactful influencer collaborations.</p>
        <div className="mt-4">
          <Link href="/signup" className="px-6 py-2 bg-white text-black hover:bg-yellow-400 hover:text-black">Sign Up</ Link>
          <Link href="/services" className="ml-4 px-6 py-2 bg-black text-white border border-white hover:bg-yellow-400 hover:text-black">Learn More</ Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
