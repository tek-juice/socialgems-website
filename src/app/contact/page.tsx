'use client'
import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';

export default function Contact() {
  interface FormData {
    name: string;
    email: string;
    message: string;
  }
  const { register, handleSubmit } = useForm<FormData>();
  const router = useRouter();
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const response = await fetch('https://formsubmit.co/98b478297190bfcb2ae3b91c3b5bda48', {
      method: 'POST',
      headers: {
        'content-Type':'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      router.push('/thanks'); //Redirect to thank you page.
    }
  }
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section at the top*/}
      <div className="relative h-[400px] flex items-center justify-center text-center text-black shadow-lg">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/Frame-3882.svg" // image path
            alt="Hero Background"
            fill
            className="object-cover"
          />
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 z-10"></div>

        {/* Hero Content */}
        <div className="relative z-20">
          <h1 className="text-5xl text-brown font-bold mb-4 text-shadow">Contact Us</h1>
          <p className="text-xl text-brown font-bold max-w-2xl mx-auto">
            We'd love to hear from you! Reach out to us for any inquiries or collaborations.
          </p>
        </div>
      </div>
  
      {/* Main Content (Form and Image) */}
      <section className="flex-1 py-12 px-8">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row gap-8 items-stretch">
            {/* Form Section (Left) */}
            <div className="bg-white p-8 rounded-2xl shadow-[0_0_20px_rgba(0,0,0,0.3)] w-full lg:w-1/2">
              <h2 className="text-3xl font-bold text-brown mb-6">Get in Touch</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-black text-lg mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Your Name"
                    className="w-full px-4 py-2 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
                    {...register('name', { required: 'Name is Required' })}
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
                  className="w-full bg-gold text-black px-6 py-2 rounded-lg hover:text-black hover:bg-white hover:border-2 hover:border-[#FFD700] hover:bg-opacity-90 transition duration-300"
                >
                  Send Message
                </button>
              </form>
            </div>
  
            {/* Image Section (Right) */}
            <div className="w-full lg:w-1/2">
              <div className="relative h-full rounded-2xl overflow-hidden">
                <Image
                  src="/contact.jpg" // Replace with your image path
                  alt="Contact Image"
                  fill
                  className="object-cover"
                />
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