import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function Contact() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center text-center">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-gold to-brown rounded-b-3xl z-0"></div>

        {/* Hero Content */}
        <div className="relative z-10 text-white">
          <h1 className="text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl max-w-2xl mx-auto">
            We'd love to hear from you! Reach out to us for any inquiries or collaborations.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="flex-1 py-12 px-8">
        <div className="max-w-4xl mx-auto">
          {/* Contact Form */}
          <div className="bg-white p-8 rounded-2xl shadow-lg mb-8">
            <h2 className="text-3xl font-bold text-brown mb-6">Get in Touch</h2>
            <form action="98b478297190bfcb2ae3b91c3b5bda48" method="POST" className="space-y-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-black text-lg mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Your Name"
                  className="w-full px-4 py-2 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
                  required
                />
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-black text-lg mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Your Email"
                  className="w-full text-black px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
                  required
                />
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-black text-lg mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Your Message"
                  rows={5}
                  className="w-full px-4 py-2 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
                  required
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full px-6 py-2 bg-brown text-white rounded-lg hover:bg-gold hover:text-black transition-colors"
              >
                Send Message
              </button>
              <input type="hidden" name="_next" value="https://yourdomain.co/thanks.html"></input>
            </form>
          </div>

          {/* Contact Information */}
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-brown mb-6">Contact Information</h2>
            <div className="flex flex-col md:flex-row justify-between gap-6">
              {/* Email - Left Side */}
              <div className="w-full md:w-1/2 text-center">
                <div className="bg-gold p-6 rounded-2xl">
                  <h3 className="text-xl font-bold text-black mb-2">Email</h3>
                  <p className="text-black">info@socialgems.me</p>
                </div>
              </div>

              {/* Address - Right Side */}
              <div className="w-full md:w-1/2 text-center">
                <div className="bg-gold p-6 rounded-2xl">
                  <h3 className="text-xl font-bold text-black mb-2">Address</h3>
                  <p className="text-black">19 Binayomba Road, Bugolobi, Kampala</p>
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