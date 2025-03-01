import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function BlogPost() {
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
          <h1 className="text-5xl font-bold mb-4">The Power of Influencer Marketing in Africa</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Discover how Social Gems is transforming the influencer marketing landscape across Africa.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="flex-1 py-12 px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          {/* Blog Content */}
          <div className="bg-white p-8 rounded-2xl shadow-lg mb-8">
            {/* Blog Meta */}
            <div className="flex items-center text-brown mb-4">
              <span className="mr-4">By John Doe</span>
              <span>•</span>
              <span className="ml-4">October 10, 2023</span>
            </div>

            {/* Blog Image */}
            <div className="relative h-96 mb-8">
              <Image
                src="/blog-image.webp" // Replace with your blog image path
                alt="Blog Image"
                fill
                className="rounded-2xl object-cover"
              />
            </div>

            {/* Blog Text */}
            <div className="space-y-6 text-black">
              <p>
                Influencer marketing is no longer just a trend—it’s a powerful tool for brands to connect with their audiences. In Africa, where social media usage is skyrocketing, influencers are becoming key players in shaping consumer behavior. At Social Gems, we’re proud to be at the forefront of this movement, connecting brands with authentic voices that resonate with their target audiences.
              </p>

              <h2 className="text-2xl font-bold text-brown">Why Africa?</h2>
              <p>
                Africa is home to some of the fastest-growing economies and youngest populations in the world. With over 500 million internet users, the continent is a goldmine for brands looking to tap into new markets. However, traditional advertising methods often fall short in reaching these audiences. That’s where influencer marketing comes in.
              </p>

              <h2 className="text-2xl font-bold text-brown">The Social Gems Advantage</h2>
              <p>
                At Social Gems, we’ve built a platform that makes it easy for brands to find the right influencers for their campaigns. Our data-driven approach ensures that every collaboration is meaningful and impactful. Here’s how we do it:
              </p>

              <ul className="list-disc list-inside space-y-2">
                <li><strong>Smart Matchmaking:</strong> Our algorithms pair brands with influencers who align with their values and target audience.</li>
                <li><strong>Authentic Content:</strong> We empower influencers to create content that feels genuine and resonates with their followers.</li>
                <li><strong>Real-Time Analytics:</strong> Brands can track the performance of their campaigns in real-time, ensuring maximum ROI.</li>
              </ul>

              <h2 className="text-2xl font-bold text-brown">Success Stories</h2>
              <p>
                One of our recent campaigns involved a global fashion brand looking to expand its presence in East Africa. By partnering with local influencers, we were able to generate a 300% increase in brand awareness within just three months. This is just one example of how Social Gems is helping brands unlock the potential of influencer marketing in Africa.
              </p>

              <h2 className="text-2xl font-bold text-brown">Join the Movement</h2>
              <p>
                Whether you’re a brand looking to connect with influencers or an influencer seeking new opportunities, Social Gems is here to help. Together, we can create meaningful collaborations that drive real results.
              </p>
            </div>
          </div>

          {/* Call-to-Action Section */}
          <div className="bg-gradient-to-r from-gold to-brown p-8 rounded-2xl shadow-lg text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
            <p className="text-white text-lg mb-6">
              Join Social Gems today and discover the power of authentic influencer marketing.
            </p>
            <Link
              href="/signup"
              className="bg-white text-brown px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition duration-300"
            >
              Sign Up Now
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}