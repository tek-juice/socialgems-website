'use client';
import Image from "next/image";
import Link from "next/link";
import ComingSoonModal from "./components/comingSoonModal"; // Import the modal
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import { useState, useEffect } from 'react';
import Router from "next/router";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useMediaQuery } from "react-responsive";
import { warnOptionHasBeenMovedOutOfExperimental } from "next/dist/server/config";

export default function Home() {
  const isMobile = useMediaQuery({ maxWidth: 600 }); 
  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 1000,
      once: false,
    });

    // Refresh AOS on route changes
    const handleRouteChange = () => {
      AOS.refresh();
    };

    Router.events.on('routeChangeComplete', handleRouteChange);

    // Cleanup
    return () => {
      Router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <div className="min-h-screen flex flex-col relative bg-white overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center py-20 px-4 md:px-8 overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          {isMobile ? (
            <Image
              src="/connect-image.jpg" 
              alt="Hero Image" 
              layout="fill" 
              objectFit="cover"
              className="z-0 rounded-md"
              priority
            />
          ) : (
            <Image 
              src="/SG-web-banner.jpg"
              alt="Hero Image"
              layout="fill"
              objectFit="cover"
              className="z-0 rounded-md"
              priority
            />
          )}
          
        </div> 
        {/* Overlay Text and Call to Action */}
        <div className="absolute inset-0 flex flex-col items-start justify-center text-left text-white bg-black/40 z-10 px-4 md:pl-16">
          <h1 className="text-4xl md:text-5xl font-bold mt-8 text-gold" data-aos="fade-up">
            #WeAreSocialGems
          </h1>
          <div>
            <p className="text-lg text-white text-pretty md:text-balance mb-8 max-w-2xl" data-aos="fade-up">
              The Largest influencer marketplace. <br />Where businesses and influencers connect. 
            </p>
          </div>
          
          {/* Call to Action Buttons */}
          <div className="flex flex-col items-start" data-aos="fade-up">
            {/* Paragraph */}
            <p className="text-lg text-white font-bold md:text-lg mb-4 max-w-2xl">
              Download our app now to get started!
            </p>

            {/* Buttons Container */}
            <div className="flex flex-col md:flex-row gap-4">
              <Link href="https://play.google.com/store/apps/details?id=com.tekjuice.social_gems"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80"
              >
                <Image
                  src="/Google-play-store.svg"
                  alt="Download on Google Play"
                  width={150}
                  height={50}
                  className="hover:opacity-80 rounded-md"
                />
              </Link>

              <Link href=" https://apps.apple.com/ug/app/social-gems/id6736918664"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80"
              >
                <Image
                  src="/App-store.svg" 
                  alt="Download on the App Store"
                  width={150}
                  height={50}
                  className="hover:opacity-80 transition-opacity rounded-md"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Rest of the Sections */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          {/* First Section: Connect, Inspire, Glow */}
          <div className="mb-12">
            {/* Connect, Inspire, Glow Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              {/* Connect Section */}
              <div className="flex flex-col items-center text-center" data-aos="fade-up">
                <div className="w-full mb-4">
                  <Image
                    src="/connect-image.jpg" // Replace with your image path
                    alt="Connect Image"
                    width={400}
                    height={400}
                    className="rounded-md w-full h-auto"
                  />
                </div>
                <div className="flex items-center justify-center w-12 h-12 bg-gold rounded-full mb-4">
                  <Image
                    src="/connect.webp" // Replace with your icon path
                    alt="Connect Icon"
                    width={24}
                    height={24}
                    className="text-white"
                  />
                </div>
                <h4 className="text-black text-xl font-bold mb-4">CONNECT</h4>
                <p className="text-black">
                  We bridge the gap between businesses and diverse talented influencers. No endless searching; just the perfect match.
                </p>
              </div>

              {/* Inspire Section */}
              <div className="flex flex-col items-center text-center" data-aos="fade-up" data-aos-delay="200">
                <div className="w-full mb-4">
                  <Image
                    src="/inspire-image.jpg" // Replace with your image path
                    alt="Inspire Image"
                    width={400}
                    height={400}
                    className="rounded-md w-full h-auto"
                  />
                </div>
                <div className="flex items-center justify-center w-12 h-12 bg-amber-600 rounded-full mb-4">
                  <Image
                    src="/inspire.webp" // Replace with your icon path
                    alt="Inspire Icon"
                    width={24}
                    height={24}
                    className="text-white"
                  />
                </div>
                <h4 className="text-black text-xl font-bold mb-4">INSPIRE</h4>
                <p className="text-black">
                  We empower creators to build thriving careers and reach their full potential.
                </p>
              </div>

              {/* Glow Section */}
              <div className="flex flex-col items-center text-center" data-aos="fade-up" data-aos-delay="400">
                <div className="w-full mb-4">
                  <Image
                    src="/glow-image.jpg" // Replace with your image path
                    alt="Glow Image"
                    width={400}
                    height={400}
                    className="rounded-md w-full h-auto"
                  />
                </div>
                <div className="flex items-center justify-center w-12 h-12 bg-brown rounded-full mb-4">
                  <Image
                    src="/glow.webp" // Replace with your icon path
                    alt="Glow Icon"
                    width={24}
                    height={24}
                    className="text-white"
                  />
                </div>
                <h4 className="text-black text-xl font-bold mb-4">GLOW</h4>
                <p className="text-black">
                  With cutting-edge technology and smart insights, we help both businesses and influencers shine.
                </p>
              </div>
            </div>

            {/* Video Section */}
            <div className="flex justify-center mt-8" data-aos="fade-up">
              <div className="w-full max-w-4xl">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full rounded-md"
                  style={{ objectFit: "cover" }}
                >
                  <source src="/web-video.mp4" type="video/mp4" /> {/* Replace with your video path */}
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>

          {/* Second Section: Influencer and Brand */}
          <div className="mb-12">
            <h3 className="text-black text-3xl font-bold mb-8 text-center" data-aos="fade-up">
              WHERE INFLUENCE MEETS OPPORTUNITY
            </h3>
            <div className="flex flex-col md:flex-row gap-8">
              {/* Influencer Div */}
              <div className="flex-1 bg-white p-6 rounded-2xl" data-aos="fade-up">
                <h4 className="text-black text-xl font-bold mb-4">FOR INFLUENCERS</h4>
                <p className="text-black mb-4">
                  We empower creators to build thriving careers and reach 
                  their full potential. By joining Social Gems, 
                  you can earn <strong>Gem Points</strong> for your influence 
                  and engagement. These points can be exchanged for real 
                  currency, giving you more opportunities to benefit 
                  from your hard work.
                </p>
                <div className="mb-4">
                  <Image
                    src="/influencer-pic.png" //path to Social Gems app image
                    alt="Social Gems App"
                    width={400}
                    height={400}
                    className="rounded-md"
                  />
                </div>
                <p className="text-black mb-4">
                  Ready to take your influence to the next level? 
                  Join our influencers list and start earning today!
                </p>
                <Link
                  href="/influencers" //link to join influencers
                  className="inline-block bg-gold text-white px-6 py-2 rounded-full font-bold  hover:text-black hover:bg-white hover:border-2 hover:border-[#FFD700] hover:bg-opacity-90 transition duration-300 transition-colors transition-colors"
                >
                  Join Influencers List
                </Link>
                <p className="text-black mt-4">
                  Download the Social Gems app now and start earning Gem Points:
                </p>
                <Link
                  href="#" // Replace with the actual app download link
                  className="inline-block bg-brown text-white px-6 py-2 rounded-full font-bold  hover:text-black hover:bg-white hover:border-2 hover:border-[#FFD700] hover:bg-opacity-90 transition duration-300 transition-colors transition-colors mt-2"
                >
                  Download the App
                </Link>
              </div>

              {/* Brand Div */}
              <div className="flex-1 bg-white p-6 rounded-2xl" data-aos="fade-up" data-aos-delay="200">
                <h4 className="text-black text-xl font-bold mb-4">FOR BRANDS</h4>
                <p className="text-black mb-4">
                  At Social Gems, we use cutting-edge technology to match 
                  your business with the perfect influencers who can 
                  drive real results. Our smart algorithms analyze 
                  influencer performance, audience demographics, 
                  and engagement rates to ensure you connect with 
                  the right creators for your brand.
                </p>
                
                <div className="mb-4">
                  <Image
                    src="/brands-pic.png" //path to Social Gems app image
                    alt="Social Gems App"
                    width={400}
                    height={400}
                    className="rounded-md"
                  />
                </div>
                <p className="text-black mb-4">
                  Join our brands list today and take advantage 
                  of our platform to elevate your marketing campaigns. 
                  With Social Gems, you can:
                </p>
                <ul className="text-black list-disc list-inside mb-4">
                  <li>Find influencers tailored to your brand’s niche.</li>
                  <li>Track campaign performance in real-time.</li>
                  <li>Maximize ROI with data-driven insights.</li>
                </ul>
                <Link
                  href="/signup" // Replace with the actual link to join brands
                  className="inline-block bg-gold text-white px-6 py-2 rounded-full font-bold hover:text-black hover:bg-white hover:border-2 hover:border-[#FFD700] hover:bg-opacity-90 transition duration-300 transition-colors"
                >
                  Join Brands List
                </Link>
                <p className="text-black mt-4">
                  Download the Social Gems app to manage your campaigns 
                  and connect with influencers on the go:
                </p>
                <Link
                  href="#" // Replace with the actual app download link
                  className="inline-block bg-brown text-white px-6 py-2 rounded-full font-bold  hover:text-black hover:bg-white hover:border-2 hover:border-[#FFD700] hover:bg-opacity-90 transition duration-300 transition-colors transition-colors mt-2"
                >
                  Download the App
                </Link>
              </div>
            </div>
          </div>

          {/* Fourth Section: Image from Right to Left, Text from Left to Right */}
          <div className="flex flex-col md:flex-row items-center gap-8 mb-12" data-aos="fade-up">
            {/* Text on Left */}
            <div className="flex-1" data-aos="fade-right">
              <h2 className="text-black text-3xl font-bold mb-4">OUR APPROACH</h2>
              <p className="text-black text-lg">
                Social Gems streamlines influencer marketing, 
                harnessing cutting-edge tech and real-time 
                data to connect brands and creators with precision. 
                Our marketplace opens doors for businesses and 
                influencers of all sizes, fostering seamless, 
                transparent collaborations that drive meaningful 
                results.
              </p>
            </div>
            {/* Image on Right */}
            <div className="flex-1" data-aos="fade-left" data-aos-delay="200">
              <Image
                src="/approach-pic.webp" // Replace with your image path
                alt="Mission Image"
                width={500}
                height={300}
                className="rounded-md w-full h-auto"
              />
            </div>
          </div>

        </div>
      </section>

      {/* CTA Section */}
      <section className="flex justify-center py-12 px-4 sm:px-8 bg-gradient-to-r from-gold to-brown rounded-2xl shadow-lg mb-10 mx-4 sm:mx-10 ml-20 mr-10">
        <div className="text-center max-w-2xl w-full">
          {/* Title with Emoji */}
          <h3 className="text-xl sm:text-3xl font-bold text-black mb-4">
            Let's explore the Influencer marketplace together
          </h3>

          {/* Description */}
          <p className="text-black text-base sm:text-lg mb-6">
            Let's Talk
          </p>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/signup"
                className="px-4 sm:px-6 py-2 bg-white text-black rounded-full hover:bg-black hover:text-white transition-colors text-sm sm:text-base"
              >
                FOR BRANDS
              </Link>
              <Link
                href="/influencers"
                className="px-4 sm:px-6 py-2 bg-black text-white rounded-full border border-white hover:bg-brown hover:text-white transition-colors text-sm sm:text-base"
              >
                FOR INFLUENCERS
              </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}