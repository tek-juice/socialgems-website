'use client'
import { useEffect, useState } from 'react';

import Image from "next/image";
//import { useMediaQuery } from "react-responsive";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function About() {
  const [ isMobile, setIsMobile ] = useState(false);

  useEffect(() => {
    //this will only run on client side
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 767);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />
      {/*Hero section*/}
      <section className="relative h-screen flex flex-col items-center justify-center text-center py-20 px-4 md:px-8">
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
              src="/SG-web-banner-about.jpg"
              alt="Hero Image"
              layout="fill"
              objectFit="cover"
              className="z-0 rounded-md"
              priority
            />
          )}
          
        </div>
        {/* Overlay Text and Call to Action */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-gold bg-black/30 z-10">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Engage with customers through creators they trust
          </h1>
          <p className="text-lg font-bold sm:text-xl">
            Discover the story behind Social Gems and our mission to connect brands with influencers.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="flex-1 py-12 px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          {/* Mission Section */}
          <div className="bg-white p-8 rounded-2xl shadow-lg mb-8">
            <h2 className="text-3xl font-bold text-brown mb-4">Our Story</h2>
            <p className="text-black text-lg">
              Social Gems was founded on the insight 
              that everyday social media users hold 
              untapped value. While many have engaged 
              followers, their influence is not fully tapped, 
              and businesses struggle to connect with the right 
              audience. Social Gems bridges this gap, transforming 
              organic social sharing into a powerful tool that connects
              businesses with authentic influence. We're redefining 
              influence and making marketing more human, trusted, 
              and effective.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-lg mb-8">
            <h2 className="text-3xl font-bold text-brown mb-4">Our Mission</h2>
            <p className="text-black text-lg">
              At Social Gems, we aim to bridge the gap between brands and influencers by providing a platform that fosters authentic collaborations. Our mission is to empower creators and businesses to achieve their goals through meaningful partnerships.
            </p>
          </div>

          {/* Team Section */}
          <div className="bg-white p-8 rounded-2xl shadow-lg mb-8">
            <h2 className="text-3xl font-bold text-brown mb-8 text-center">Our Team</h2>

            {/* Two Column Layout */}
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Uganda Team - Left Column */}
              <div className="flex-1">
                {/* Uganda Team Header */}
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center bg-gradient-to-r from-gold to-yellow-400 text-brown px-6 py-3 rounded-full shadow-lg">
                    <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                    <h3 className="text-xl font-bold">Uganda Team</h3>
                  </div>
                </div>

                {/* Uganda Team Members */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Team Member 1 - Evelyn */}
                  <div className="group relative h-80 w-full perspective-1000">
                    <div className="relative w-full h-full transition-transform duration-700 transform-style-preserve-3d group-hover:rotate-y-180">
                      {/* Front Side */}
                      <div className="absolute inset-0 w-full h-full backface-hidden">
                        <div className="relative w-full h-full">
                          <Image
                            src="/social-gems-web-eve.jpg"
                            alt="Evelyn Luganda"
                            fill
                            className="object-cover rounded-lg"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent rounded-lg">
                            <div className="absolute bottom-4 left-4 right-4 text-white">
                              <h3 className="text-xl font-bold mb-1">Evelyn Luganda</h3>
                              <p className="text-gold font-medium">Project Manager, Uganda</p>
                              <div className="flex items-center mt-2 text-white/80">
                                <span className="text-sm">View Profile</span>
                                <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Back Side */}
                      <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-black font-bold rounded-lg p-6 flex flex-col justify-center">
                        <h3 className="text-xl font-bold text-white mb-2">Evelyn Luganda</h3>
                        <p className="text-white/90 text-sm mb-3">Project Manager, Uganda</p>
                        <p className="text-white/80 text-xs leading-relaxed">
                          Evelyn is the driving force behind Social Gems. As Project Manager and one of the original minds behind the platform's vision, she has overseen the company's growth from concept to reality. Known for her bold leadership and clear vision, Evelyn brings creativity and unstoppable energy to the team.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Team Member 2 - Christine */}
                  <div className="group relative h-80 w-full perspective-1000">
                    <div className="relative w-full h-full transition-transform duration-700 transform-style-preserve-3d group-hover:rotate-y-180">
                      {/* Front Side */}
                      <div className="absolute inset-0 w-full h-full backface-hidden">
                        <div className="relative w-full h-full">
                          <Image
                            src="/social-gems-web-christine.jpg"
                            alt="Nampeera Christine"
                            fill
                            className="object-cover rounded-lg"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent rounded-lg">
                            <div className="absolute bottom-4 left-4 right-4 text-white">
                              <h3 className="text-xl font-bold mb-1">Nampeera Christine</h3>
                              <p className="text-gold font-medium">Brand Ambassador, Uganda</p>
                              <div className="flex items-center mt-2 text-white/80">
                                <span className="text-sm">View Profile</span>
                                <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Back Side */}
                      <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-black font-bold rounded-lg p-6 flex flex-col justify-center">
                        <h3 className="text-xl font-bold text-white mb-2">Nampeera Christine</h3>
                        <p className="text-white/90 text-sm mb-3">Brand Ambassador, Uganda</p>
                        <p className="text-white/80 text-xs leading-relaxed">
                          As the face of Social Gems on social media, Christine represents the brand with authenticity, style, and purpose. With her background as an influencer, Christine brings a natural energy to her role connecting with audiences and building a strong online presence for the brand.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Team Member 3 - Martha */}
                  <div className="group relative h-80 w-full perspective-1000">
                    <div className="relative w-full h-full transition-transform duration-700 transform-style-preserve-3d group-hover:rotate-y-180">
                      {/* Front Side */}
                      <div className="absolute inset-0 w-full h-full backface-hidden">
                        <div className="relative w-full h-full">
                          <Image
                            src="/social-gems-web-martha.jpg"
                            alt="Martha Twesime"
                            fill
                            className="object-cover rounded-lg"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent rounded-lg">
                            <div className="absolute bottom-4 left-4 right-4 text-white">
                              <h3 className="text-xl font-bold mb-1">Martha Twesime</h3>
                              <p className="text-gold font-medium">Administration & Operations Support, Uganda</p>
                              <div className="flex items-center mt-2 text-white/80">
                                <span className="text-sm">View Profile</span>
                                <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Back Side */}
                      <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-black font-bold rounded-lg p-6 flex flex-col justify-center">
                        <h3 className="text-xl font-bold text-white mb-2">Martha Twesime</h3>
                        <p className="text-white/90 text-sm mb-3">Administration & Operations Support, Uganda</p>
                        <p className="text-white/80 text-xs leading-relaxed">
                          Martha acts as the vital link between the development team and the wider Social Gems team, ensuring smooth and clear communication across departments. She also oversees customer care, helping users get the best experience possible.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Team Member 4 - Susan Haley */}
                  <div className="group relative h-80 w-full perspective-1000">
                    <div className="relative w-full h-full transition-transform duration-700 transform-style-preserve-3d group-hover:rotate-y-180">
                      {/* Front Side */}
                      <div className="absolute inset-0 w-full h-full backface-hidden">
                        <div className="relative w-full h-full">
                          <Image
                            src="/Tushabe.jpg"
                            alt="Susan Haley Tushabe"
                            fill
                            className="object-cover rounded-lg"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent rounded-lg">
                            <div className="absolute bottom-4 left-4 right-4 text-white">
                              <h3 className="text-xl font-bold mb-1">Susan Haley Tushabe</h3>
                              <p className="text-gold font-medium">Marketing Manager, Uganda</p>
                              <div className="flex items-center mt-2 text-white/80">
                                <span className="text-sm">View Profile</span>
                                <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Back Side */}
                      <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-black font-bold rounded-lg p-6 flex flex-col justify-center">
                        <h3 className="text-xl font-bold text-white mb-2">Susan Haley Tushabe</h3>
                        <p className="text-white/90 text-sm mb-3">Marketing Manager, Uganda</p>
                        <p className="text-white/80 text-xs leading-relaxed">
                          As Marketing Executive, Haley leads the overall marketing strategy and direction for Social Gems. With her years of experience in the field, Haley brings both strategic insight and creative leadership to the team.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Team Member 5 - Jean */}
                  <div className="group relative h-80 w-full perspective-1000">
                    <div className="relative w-full h-full transition-transform duration-700 transform-style-preserve-3d group-hover:rotate-y-180">
                      {/* Front Side */}
                      <div className="absolute inset-0 w-full h-full backface-hidden">
                        <div className="relative w-full h-full">
                          <Image
                            src="/Jean.jpg"
                            alt="Jean Biryahwaho"
                            fill
                            className="object-cover rounded-lg"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent rounded-lg">
                            <div className="absolute bottom-4 left-4 right-4 text-white">
                              <h3 className="text-xl font-bold mb-1">Jean Biryahwaho</h3>
                              <p className="text-gold font-medium">Sales Associate, Uganda</p>
                              <div className="flex items-center mt-2 text-white/80">
                                <span className="text-sm">View Profile</span>
                                <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Back Side */}
                      <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-black font-bold rounded-lg p-6 flex flex-col justify-center">
                        <h3 className="text-xl font-bold text-white mb-2">Jean Biryahwaho</h3>
                        <p className="text-white/90 text-sm mb-3">Sales Associate, Uganda</p>
                        <p className="text-white/80 text-xs leading-relaxed">
                          Jean is the bridge between Social Gems and the brands we serve. As a Sales Associate, she connects directly with businesses from field visits to in-person pitches, helping them understand how Social Gems can elevate their visibility.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Team Member 6 - Bernard */}
                  <div className="group relative h-80 w-full perspective-1000">
                    <div className="relative w-full h-full transition-transform duration-700 transform-style-preserve-3d group-hover:rotate-y-180">
                      {/* Front Side */}
                      <div className="absolute inset-0 w-full h-full backface-hidden">
                        <div className="relative w-full h-full">
                          <Image
                            src="/Beewol.jpg"
                            alt="Bernard E. Olupot"
                            fill
                            className="object-cover rounded-lg"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent rounded-lg">
                            <div className="absolute bottom-4 left-4 right-4 text-white">
                              <h3 className="text-xl font-bold mb-1">Bernard E. Olupot</h3>
                              <p className="text-gold font-medium">Head Of Influencers, Uganda</p>
                              <div className="flex items-center mt-2 text-white/80">
                                <span className="text-sm">View Profile</span>
                                <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Back Side */}
                      <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-black font-bold rounded-lg p-6 flex flex-col justify-center">
                        <h3 className="text-xl font-bold text-white mb-2">Bernard E. Olupot</h3>
                        <p className="text-white/90 text-sm mb-3">Head Of Influencers, Uganda</p>
                        <p className="text-white/80 text-xs leading-relaxed">
                          As Head of Influencers for Africa, Bernard leads the growth and coordination of Social Gems' influencer network across the continent. With a strong background as an influencer himself, he brings firsthand knowledge and credibility to the role.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Beautiful Divider */}
              <div className="hidden lg:flex flex-col items-center justify-center px-4">
                <div className="w-px h-full bg-gradient-to-b from-transparent via-gold to-transparent"></div>
                <div className="absolute bg-white rounded-full p-4 shadow-lg">
                  <svg className="w-8 h-8 text-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>

              {/* UK Team - Right Column */}
              <div className="flex-1">
                {/* UK Team Header */}
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center bg-gradient-to-r from-brown to-red-600 text-white px-6 py-3 rounded-full shadow-lg">
                    <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                    <h3 className="text-xl font-bold">UK Team</h3>
                  </div>
                </div>

                {/* UK Team Members */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Team Member 7 - Atif */}
                  <div className="group relative h-80 w-full perspective-1000">
                    <div className="relative w-full h-full transition-transform duration-700 transform-style-preserve-3d group-hover:rotate-y-180">
                      {/* Front Side */}
                      <div className="absolute inset-0 w-full h-full backface-hidden">
                        <div className="relative w-full h-full">
                          <Image
                            src="/atif.jpg"
                            alt="Atif Muhammad"
                            fill
                            className="object-cover rounded-lg"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent rounded-lg">
                            <div className="absolute bottom-4 left-4 right-4 text-white">
                              <h3 className="text-xl font-bold mb-1">Atif Muhammad</h3>
                              <p className="text-gold font-medium">Marketing Executive, UK</p>
                              <div className="flex items-center mt-2 text-white/80">
                                <span className="text-sm">View Profile</span>
                                <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Back Side */}
                      <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-black font-bold rounded-lg p-6 flex flex-col justify-center">
                        <h3 className="text-xl font-bold text-white mb-2">Atif Muhammad</h3>
                        <p className="text-white/90 text-sm mb-3">Marketing Executive, UK</p>
                        <p className="text-white/80 text-xs leading-relaxed">
                          As Marketing Executive, Atif brings a wealth of experience and expertise to Social Gems. With a strong background in digital marketing and a passion for creating impactful campaigns, he leads the overall marketing strategy and direction for the company.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Team Member 8 - Great */}
                  <div className="group relative h-80 w-full perspective-1000">
                    <div className="relative w-full h-full transition-transform duration-700 transform-style-preserve-3d group-hover:rotate-y-180">
                      {/* Front Side */}
                      <div className="absolute inset-0 w-full h-full backface-hidden">
                        <div className="relative w-full h-full">
                          <Image
                            src="/great.jpg"
                            alt="Great Ajieh"
                            fill
                            className="object-cover rounded-lg"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent rounded-lg">
                            <div className="absolute bottom-4 left-4 right-4 text-white">
                              <h3 className="text-xl font-bold mb-1">Great Ajieh</h3>
                              <p className="text-gold font-medium">Business Development Manager, UK</p>
                              <div className="flex items-center mt-2 text-white/80">
                                <span className="text-sm">View Profile</span>
                                <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Back Side */}
                      <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-black font-bold rounded-lg p-6 flex flex-col justify-center">
                        <h3 className="text-xl font-bold text-white mb-2">Great Ajieh</h3>
                        <p className="text-white/90 text-sm mb-3">Business Development Manager, UK</p>
                        <p className="text-white/80 text-xs leading-relaxed">
                          As Business Development Manager, Great brings a unique blend of creativity and business acumen to Social Gems. With a background in marketing and a passion for building strong connections, he leads the overall business development strategy and direction for the company.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Values Section */}
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-brown mb-4">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Value 1 */}
              <div className="text-center">
                <div className="bg-gold p-6 rounded-2xl">
                  <h3 className="text-xl font-bold text-black mb-2">Authenticity</h3>
                  <p className="text-black">
                    We believe in genuine connections that drive real results.
                  </p>
                </div>
              </div>

              {/* Value 2 */}
              <div className="text-center">
                <div className="bg-gold p-6 rounded-2xl">
                  <h3 className="text-xl font-bold text-black mb-2">Innovation</h3>
                  <p className="text-black">
                    We constantly innovate to provide the best solutions for our users.
                  </p>
                </div>
              </div>

              {/* Value 3 */}
              <div className="text-center">
                <div className="bg-gold p-6 rounded-2xl">
                  <h3 className="text-xl font-bold text-black mb-2">Empowerment</h3>
                  <p className="text-black">
                    We empower creators and brands to achieve their full potential.
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