import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function Services() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center text-center bg-white">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-gold to-brown rounded-b-3xl z-0"></div>

        {/* Hero Content */}
        <div className="relative z-10 text-white">
          <h1 className="text-5xl font-bold mb-4">Our Services</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Empowering brands and influencers with smart solutions for authentic collaborations and real growth.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="flex-1 py-12 px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          {/* Why Social Gems Section */}
          <div className="bg-white p-8 rounded-2xl shadow-lg mb-8">
            <h2 className="text-3xl font-bold text-brown mb-4">Why Social Gems?</h2>
            <p className="text-black text-lg mb-6">
              Not Just a Marketplace—A Movement
            </p>
            <div className="space-y-6">
              {/* Point 1 */}
              <div className="flex items-start">
                <div className="bg-gold p-3 rounded-full mr-4">
                  <span className="text-white text-xl font-bold">1</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-black mb-2">Africa’s Home for Influencer Marketing</h3>
                  <p className="text-black">
                    We’re putting Africa’s vibrant talent on the global stage, giving brands access to authentic voices that connect with audiences in a real way.
                  </p>
                </div>
              </div>

              {/* Point 2 */}
              <div className="flex items-start">
                <div className="bg-gold p-3 rounded-full mr-4">
                  <span className="text-white text-xl font-bold">2</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-black mb-2">Smart Matchmaking, Real Impact</h3>
                  <p className="text-black">
                    No more endless scrolling. Our data-driven technology ensures brands find influencers who actually align with their vision and audience.
                  </p>
                </div>
              </div>

              {/* Point 3 */}
              <div className="flex items-start">
                <div className="bg-gold p-3 rounded-full mr-4">
                  <span className="text-white text-xl font-bold">3</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-black mb-2">More Than Just Deals, Real Growth</h3>
                  <p className="text-black">
                    We don’t just facilitate gigs—we empower influencers with tools, training, and opportunities to turn influence into a sustainable career.
                  </p>
                </div>
              </div>

              {/* Point 4 */}
              <div className="flex items-start">
                <div className="bg-gold p-3 rounded-full mr-4">
                  <span className="text-white text-xl font-bold">4</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-black mb-2">Trust First, Always</h3>
                  <p className="text-black">
                    Transparency is at our core. We ensure clear communication, fair collaborations, and a system that values both brands and influencers.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Our Services Section */}
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-brown mb-4">Our Services</h2>
            <div className="space-y-8">
              {/* Service 1 */}
              <div className="flex items-start">
                <div className="bg-gold p-3 rounded-full mr-4">
                  <Image
                    src="/icons/globe.svg" // Replace with your icon path
                    alt="Global Influencer Marketplace"
                    width={24}
                    height={24}
                    className="text-white"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-black mb-2">Global Influencer Marketplace & Opportunities</h3>
                  <p className="text-black">
                    Connect with influencers worldwide, with a special focus on emerging African talent. Brands can directly engage influencers for collaborations that make an impact.
                  </p>
                </div>
              </div>

              {/* Service 2 */}
              <div className="flex items-start">
                <div className="bg-gold p-3 rounded-full mr-4">
                  <Image
                    src="/icons/strategy.svg" // Replace with your icon path
                    alt="Bespoke Campaign Strategies"
                    width={24}
                    height={24}
                    className="text-white"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-black mb-2">Bespoke Campaign Strategies & Streamlined Management</h3>
                  <p className="text-black">
                    No more chaotic influencer campaigns. We create tailored marketing strategies and handle the entire process - from discovery to content approval - ensuring smooth, results-driven collaborations.
                  </p>
                </div>
              </div>

              {/* Service 3 */}
              <div className="flex items-start">
                <div className="bg-gold p-3 rounded-full mr-4">
                  <Image
                    src="/icons/analytics.svg" // Replace with your icon path
                    alt="Authentic Content Creation"
                    width={24}
                    height={24}
                    className="text-white"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-black mb-2">Authentic Content Creation & Real-Time Analytics</h3>
                  <p className="text-black">
                    Empowering influencers to create content that resonates while giving brands access to real-time campaign data to measure reach, engagement, and ROI.
                  </p>
                </div>
              </div>

              {/* Service 4 */}
              <div className="flex items-start">
                <div className="bg-gold p-3 rounded-full mr-4">
                  <Image
                    src="/icons/community.svg" // Replace with your icon path
                    alt="Training & Community"
                    width={24}
                    height={24}
                    className="text-white"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-black mb-2">Training, Support & Community for Growth</h3>
                  <p className="text-black">
                    We go beyond deals - Social Gems is a space for learning. We provide training, resources, and a supportive community to help influencers and brands succeed long-term.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}