//this is the FAQ page.

'use client';

import { useState } from 'react';
import Link from 'next/link';
import React from 'react';
import { FiPlus, FiMinus } from 'react-icons/fi';
import Head from 'next/head';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import Image from 'next/image';
            
const FAQPage = () => {
  const [activeTab, setActiveTab] = useState('brands');
  const [openQuestion, setOpenQuestion] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleQuestion = (id: any) => {
    setOpenQuestion(openQuestion === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-white w-full">
      <div className="w-full fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>
      <div className="pt-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Frequently Asked Questions
            </h1>
            <p className="mt-3 text-xl text-gray-500">
              Find answers to common questions about Social Gems
            </p>
          </div>

          <div className="flex justify-center mb-8">
            <div className="inline-flex rounded-md shadow-sm">
              <button
                onClick={() => setActiveTab('brands')}
                className={`px-6 py-3 text-sm font-medium rounded-l-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold ${
                  activeTab === 'brands'
                    ? 'bg-gold text-brown font-bold shadow'
                    : 'bg-white text-brown hover:bg-gold/30'
                }`}
              >
                For Brands
              </button>
              <button
                onClick={() => setActiveTab('influencers')}
                className={`px-6 py-3 text-sm font-medium rounded-r-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold ${
                  activeTab === 'influencers'
                    ? 'bg-gold text-brown font-bold shadow'
                    : 'bg-white text-brown hover:bg-gold/30'
                }`}
              >
                For Influencers
              </button>
            </div>
          </div>

          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            {activeTab === 'brands' ? (
              <div className="divide-y divide-gray-200">
                {/* Brand FAQs */}
                <div className="px-4 py-5 sm:px-6">
                  <h2 className="text-lg font-bold text-brown underline">For Brands</h2>
                </div>

                {/* Question 1 */}
                <div className="px-4 py-5 sm:p-6">
                  <button
                    onClick={() => toggleQuestion('brand1')}
                    className="flex justify-between w-full text-left text-lg font-medium text-brown hover:text-gold focus:outline-none"
                  >
                    <span>What is Social Gems?</span>
                    <span className="ml-6 h-7 flex items-center">
                      {openQuestion === 'brand1' ? (
                        <FiMinus size={24} className="text-gold" />
                      ) : (
                        <FiPlus size={24} className="text-gold" />
                      )}
                    </span>
                  </button>
                  {openQuestion === 'brand1' && (
                    <div className="mt-2 text-gray-600">
                      <p>
                        Social Gems is an emerging influencer marketing platform designed to streamline collaborations between influencers and brands, offering a structured environment for creating and managing marketing campaigns.
                      </p>
                    </div>
                  )}
                </div>

                {/* Question 2 */}
                <div className="px-4 py-5 sm:p-6">
                  <button
                    onClick={() => toggleQuestion('brand2')}
                    className="flex justify-between w-full text-left text-lg font-medium text-brown hover:text-gold focus:outline-none"
                  >
                    <span>How does it work?</span>
                    <span className="ml-6 h-7 flex items-center">
                      {openQuestion === 'brand2' ? (
                        <FiMinus size={24} className="text-gold" />
                      ) : (
                        <FiPlus size={24} className="text-gold" />
                      )}
                    </span>
                  </button>
                  {openQuestion === 'brand2' && (
                    <div className="mt-2 text-gray-600 space-y-4">
                      <p>
                        Social Gems serves as a bridge between digital content creators and businesses. Influencers can discover and join brand campaigns, while brands can identify and engage with suitable influencers to promote their products or services. This mutual connection facilitates authentic and effective marketing collaborations.
                      </p>
                      <p>
                        The platform provides tools for brands to create, manage, and monitor marketing campaigns. Influencers can participate in these campaigns, track their performance metrics, and receive feedback, ensuring transparency and efficiency in the collaboration process. Beyond campaign management, Social Gems fosters a community where influencers can share content, engage with peers, and build their personal brands.
                      </p>
                      <p>
                        Social Gems emphasizes the use of data analytics to inform campaign strategies. By analysing engagement metrics and audience responses, both influencers and brands can optimize their approaches for better results.
                      </p>
                    </div>
                  )}
                </div>

                {/* Question 3 */}
                <div className="px-4 py-5 sm:p-6">
                  <button
                    onClick={() => toggleQuestion('brand3')}
                    className="flex justify-between w-full text-left text-lg font-medium text-brown hover:text-gold focus:outline-none"
                  >
                    <span>What's the subscription fee to join the app?</span>
                    <span className="ml-6 h-7 flex items-center">
                      {openQuestion === 'brand3' ? (
                        <FiMinus size={24} className="text-gold" />
                      ) : (
                        <FiPlus size={24} className="text-gold" />
                      )}
                    </span>
                  </button>
                  {openQuestion === 'brand3' && (
                    <div className="mt-2 text-gray-600">
                      <p>
                        There is currently NO subscription fee paid to join the app. However, after a brand downloads the app and sets up their profile then goes ahead to create a campaign, they will be charged 12% of their proposed budget for the entirety of the campaign.
                      </p>
                    </div>
                  )}
                </div>

                {/* Question 4 */}
                <div className="px-4 py-5 sm:p-6">
                  <button
                    onClick={() => toggleQuestion('brand4')}
                    className="flex justify-between w-full text-left text-lg font-medium text-brown hover:text-gold focus:outline-none"
                  >
                    <span>As a brand, why should I choose to download the app over hiring an agency?</span>
                    <span className="ml-6 h-7 flex items-center">
                      {openQuestion === 'brand4' ? (
                        <FiMinus size={24} className="text-gold" />
                      ) : (
                        <FiPlus size={24} className="text-gold" />
                      )}
                    </span>
                  </button>
                  {openQuestion === 'brand4' && (
                    <div className="mt-2 text-gray-600 space-y-4">
                      <h3 className="font-medium">Cost Efficiency</h3>
                      <ul className="list-disc pl-5 space-y-2">
                        <li><strong>Lower overhead:</strong> Using an app platform typically avoids agency fees, retainers, and long-term contracts.</li>
                        <li><strong>Pay-per-campaign:</strong> You may only pay for campaigns you run, rather than full-service fees.</li>
                      </ul>

                      <h3 className="font-medium">Direct Access to Influencers</h3>
                      <ul className="list-disc pl-5 space-y-2">
                        <li><strong>Cut out the middleman:</strong> You can browse and connect with influencers directly, saving time and avoiding miscommunication.</li>
                        <li><strong>Verified talent pool:</strong> Social Gems curates a community of influencers, making it easier to find reputable collaborators.</li>
                      </ul>

                      <h3 className="font-medium">Transparent Campaign Management</h3>
                      <ul className="list-disc pl-5 space-y-2">
                        <li><strong>Track performance:</strong> Real-time insights, analytics, and dashboards let you monitor engagement, reach, and ROI(Return On Investment).</li>
                        <li><strong>Control and flexibility:</strong> You define your budget, terms, and deliverables directly within the app.</li>
                      </ul>

                      <h3 className="font-medium">Faster Turnaround</h3>
                      <ul className="list-disc pl-5 space-y-2">
                        <li><strong>Quick deployment:</strong> Launch campaigns and activate influencers faster than going through agency pitching and planning cycles.</li>
                        <li><strong>Automated tools:</strong> Built-in features help streamline negotiation, briefing, and reporting.</li>
                      </ul>

                      <h3 className="font-medium">Scalable and Localized Reach</h3>
                      <ul className="list-disc pl-5 space-y-2">
                        <li><strong>Access regional creators:</strong> Especially useful in markets like Uganda where the app is gaining traction with local influencers.</li>
                        <li><strong>Scale up or down easily:</strong> Run small experiments or larger campaigns based on your needs.</li>
                      </ul>
                    </div>
                  )}
                </div>

                {/* Question 5 */}
                <div className="px-4 py-5 sm:p-6">
                  <button
                    onClick={() => toggleQuestion('brand5')}
                    className="flex justify-between w-full text-left text-lg font-medium text-brown hover:text-gold focus:outline-none"
                  >
                    <span>How do I benefit?</span>
                    <span className="ml-6 h-7 flex items-center">
                      {openQuestion === 'brand5' ? (
                        <FiMinus size={24} className="text-gold" />
                      ) : (
                        <FiPlus size={24} className="text-gold" />
                      )}
                    </span>
                  </button>
                  {openQuestion === 'brand5' && (
                    <div className="mt-2 text-gray-600 space-y-4">
                      <h3 className="font-medium">Targeted Exposure.</h3>
                      <p>You can connect with influencers who align with your niche and audience. This increases the likelihood of reaching potential customers who genuinely care about your product or service.</p>

                      <h3 className="font-medium">Affordable, Performance-Based Marketing.</h3>
                      <p>You set your own budget per campaign, and you're not tied into costly agency retainers. This is especially helpful for small to medium brands or startups looking to scale gradually.</p>

                      <h3 className="font-medium">Control Over Your Brand Message.</h3>
                      <p>You define the campaign goals, content guidelines, and deliverables. This ensures influencer content stays on-brand and meets your standards.</p>

                      <h3 className="font-medium">Real-Time Results & Analytics.</h3>
                      <p>Social Gems provides performance data (engagement, reach, etc.) so you can measure ROI clearly and adjust strategies as needed. This is something not always as transparent with agencies.</p>

                      <h3 className="font-medium">Faster Time to Market.</h3>
                      <p>You can launch campaigns quickly (often within hours or days) without waiting for a full strategy plan, proposal, or agency turnaround.</p>

                      <h3 className="font-medium">Access to Local Influencer Communities.</h3>
                      <p>Especially valuable in regions like Uganda and East Africa, Social Gems gives you direct access to creators who resonate with local markets, making campaigns feel authentic and culturally relevant.</p>

                      <h3 className="font-medium">Simplified Workflow.</h3>
                      <p>From influencer discovery to campaign tracking and payments, everything happens in one place. There is no juggling emails, contracts, and spreadsheets.</p>
                    </div>
                  )}
                </div>

                {/* Question 6 */}
                <div className="px-4 py-5 sm:p-6">
                  <button
                    onClick={() => toggleQuestion('brand6')}
                    className="flex justify-between w-full text-left text-lg font-medium text-brown hover:text-gold focus:outline-none"
                  >
                    <span>How safe are the money transfers from my bank to the Social Gems wallet?</span>
                    <span className="ml-6 h-7 flex items-center">
                      {openQuestion === 'brand6' ? (
                        <FiMinus size={24} className="text-gold" />
                      ) : (
                        <FiPlus size={24} className="text-gold" />
                      )}
                    </span>
                  </button>
                  {openQuestion === 'brand6' && (
                    <div className="mt-2 text-gray-600 space-y-4">
                      <p>Transferring funds from your bank to the Social Gems wallet is designed with security in mind, incorporating several measures to protect your transactions and personal data.</p>

                      <h3 className="font-medium">Data Encryption:</h3>
                      <p>Social Gems employs encryption protocols to safeguard your personal and transactional data during both storage and transmission. This ensures that sensitive information remains confidential and protected from unauthorized access.</p>

                      <h3 className="font-medium">Compliance with Data Protection Regulations:</h3>
                      <p>The platform adheres to data protection laws applicable in the UK and Uganda, implementing appropriate technical and organizational measures to maintain the security of the app and its services.</p>

                      <h3 className="font-medium">Monitoring and Fraud Prevention:</h3>
                      <p>Social Gems actively monitors the use of the app to deploy security measures aimed at preventing fraudulent activities and misuse, thereby maintaining a secure environment for financial transactions.</p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {/* Influencer FAQs */}
                <div className="px-4 py-5 sm:px-6">
                  <h2 className="text-lg font-bold text-brown underline">For Influencers</h2>
                </div>

                {/* Question 1 */}
                <div className="px-4 py-5 sm:p-6">
                  <button
                    onClick={() => toggleQuestion('influencer1')}
                    className="flex justify-between w-full text-left text-lg font-medium text-brown hover:text-gold focus:outline-none"
                  >
                    <span>How do I join Social Gems / What qualifications are needed to join?</span>
                    <span className="ml-6 h-7 flex items-center">
                      {openQuestion === 'influencer1' ? (
                        <FiMinus size={24} className="text-gold" />
                      ) : (
                        <FiPlus size={24} className="text-gold" />
                      )}
                    </span>
                  </button>
                  {openQuestion === 'influencer1' && (
                    <div className="mt-2 text-gray-600 space-y-4">
                      <p>Joining Social Gems as an influencer is a straightforward process designed to accommodate creators at all levels, regardless of follower count. The platform emphasizes inclusivity, welcoming both emerging and established influencers across various niches such as beauty, sports, gaming, food, etc.</p>
                      
                      <h3 className="font-medium">Complete the Influencer Registration on the app</h3>
                      <p>Visit the <span
                        className="text-brown hover:text-gold underline cursor-pointer"
                        onClick={() => setIsModalOpen(true)}
                      >
                        Social Gems Influencer Registration
                      </span> and provide the following information:</p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Full Name</li>
                        <li>Email Address</li>
                        <li>Contact Number</li>
                        <li>Preferred Social Media Platforms (e.g., Instagram, TikTok, YouTube)</li>
                        <li>Field of Influence (your content niche)</li>
                        <li>A brief message or introduction.</li>
                      </ul>

                      <h3 className="font-medium">Download the Social Gems App</h3>
                      <p>After submitting your application, download the Social Gems app to create your profile and start engaging with potential brand collaborations.</p>

                      <p>The platform values authentic engagement and quality content over sheer numbers. Whether you're a budding creator or an experienced influencer, Social Gems offers opportunities to connect with brands and monetize your influence.</p>
                    </div>
                  )}
                </div>

                {/* Question 2 */}
                <div className="px-4 py-5 sm:p-6">
                  <button
                    onClick={() => toggleQuestion('influencer2')}
                    className="flex justify-between w-full text-left text-lg font-medium text-brown hover:text-gold focus:outline-none"
                  >
                    <span>How often are campaigns created?</span>
                    <span className="ml-6 h-7 flex items-center">
                      {openQuestion === 'influencer2' ? (
                        <FiMinus size={24} className="text-gold" />
                      ) : (
                        <FiPlus size={24} className="text-gold" />
                      )}
                    </span>
                  </button>
                  {openQuestion === 'influencer2' && (
                    <div className="mt-2 text-gray-600 space-y-4">
                      <p>The frequency of campaign creation on Social Gems can vary based on several factors, including brand demand, seasonal trends, and the platform's growth trajectory.</p>
                      
                      <p>To maximize your participation in upcoming campaigns on Social Gems:</p>
                      <ul className="list-disc pl-5 space-y-2">
                        <li><strong>Enable Notifications:</strong> Turn on app and social media notifications to receive real-time updates about new campaign opportunities.</li>
                        <li><strong>Regularly Check the App:</strong> Frequent logins can help you stay ahead of new listings and apply promptly.</li>
                        <li><strong>Engage with the Community:</strong> Active participation can increase your visibility to brands seeking influencers.</li>
                      </ul>

                      <p>By staying proactive and engaged on the platform, you can take full advantage of the campaign opportunities as they arise.</p>
                    </div>
                  )}
                </div>

                {/* Question 3 */}
                <div className="px-4 py-5 sm:p-6">
                  <button
                    onClick={() => toggleQuestion('influencer3')}
                    className="flex justify-between w-full text-left text-lg font-medium text-brown hover:text-gold focus:outline-none"
                  >
                    <span>How many campaigns can each influencer work on at the same time?</span>
                    <span className="ml-6 h-7 flex items-center">
                      {openQuestion === 'influencer3' ? (
                        <FiMinus size={24} className="text-gold" />
                      ) : (
                        <FiPlus size={24} className="text-gold" />
                      )}
                    </span>
                  </button>
                  {openQuestion === 'influencer3' && (
                    <div className="mt-2 text-gray-600">
                      <p>Social Gems does not publicly specify a strict limit on the number of campaigns an influencer can participate in simultaneously. The platform is designed to be flexible, allowing influencers to engage in multiple campaigns concurrently, provided they can manage their commitments effectively.</p>
                    </div>
                  )}
                </div>

                {/* Question 4 */}
                <div className="px-4 py-5 sm:p-6">
                  <button
                    onClick={() => toggleQuestion('influencer4')}
                    className="flex justify-between w-full text-left text-lg font-medium text-brown hover:text-gold focus:outline-none"
                  >
                    <span>Does one still get paid for only posting and zero engagements?</span>
                    <span className="ml-6 h-7 flex items-center">
                      {openQuestion === 'influencer4' ? (
                        <FiMinus size={24} className="text-gold" />
                      ) : (
                        <FiPlus size={24} className="text-gold" />
                      )}
                    </span>
                  </button>
                  {openQuestion === 'influencer4' && (
                    <div className="mt-2 text-gray-600 space-y-4">
                      <p>On Social Gems, influencer compensation is primarily tied to engagement metrics rather than merely posting content. This means that simply publishing a post without generating any likes, comments, shares, or other forms of interaction may not qualify for payment.</p>
                      
                      <p>Social Gems operates on a performance-based model where influencers earn "Gem Points" that can be converted into real rewards and discounts. These points are awarded based on the engagement your content receives during brand campaigns. The platform emphasizes boosting engagement and building lasting relationships with brands, indicating that active audience interaction is crucial for earning.</p>
                    </div>
                  )}
                </div>

                {/* Question 5 */}
                <div className="px-4 py-5 sm:p-6">
                  <button
                    onClick={() => toggleQuestion('influencer5')}
                    className="flex justify-between w-full text-left text-lg font-medium text-brown hover:text-gold focus:outline-none"
                  >
                    <span>When do (we)influencers start working?</span>
                    <span className="ml-6 h-7 flex items-center">
                      {openQuestion === 'influencer5' ? (
                        <FiMinus size={24} className="text-gold" />
                      ) : (
                        <FiPlus size={24} className="text-gold" />
                      )}
                    </span>
                  </button>
                  {openQuestion === 'influencer5' && (
                    <div className="mt-2 text-gray-600 space-y-4">
                      <p>As an influencer on Social Gems, you can start working as soon as you're accepted onto the platform and matched with a live campaign that fits your profile. Here's how the typical process works:</p>
                      
                      <ol className="list-decimal pl-5 space-y-4">
                        <li>
                          <strong>Submit Your Application</strong>
                          <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li>Dowload the app and register as Influencer <span
                              className="text-brown hover:text-gold underline cursor-pointer"
                              onClick={() => setIsModalOpen(true)}
                            >
                              Social Gems Influencer Registration
                            </span>.</li>
                            <li>Wait for approval (this can take anywhere from a few hours to a few days depending on volume).</li>
                          </ul>
                        </li>
                        <li>
                          <strong>Create & Set Up Your Profile</strong>
                          <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li>Once approved, log into the app, set up your influencer profile, and link your social media accounts.</li>
                          </ul>
                        </li>
                        <li>
                          <strong>Apply for Campaigns</strong>
                          <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li>Browse available brand campaigns.</li>
                            <li>Apply or express interest in the ones that match your niche or audience.</li>
                          </ul>
                        </li>
                        <li>
                          <strong>Get Accepted to a Campaign</strong>
                          <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li>A brand reviews your profile and approves you for their campaign.</li>
                            <li>Once accepted, you'll receive campaign guidelines and a timeline.</li>
                          </ul>
                        </li>
                        <li>
                          <strong>Start Creating & Posting Content</strong>
                          <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li>You begin working as soon as you agree to a campaign's terms and start producing or publishing content.</li>
                          </ul>
                        </li>
                      </ol>

                      <h3 className="font-medium">How Soon Can You Get Started?</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        <li><strong>Earliest:</strong> Within a day or two after approval if there's a suitable active campaign.</li>
                        <li><strong>Typical Wait Time:</strong> May vary depending on how often brands post campaigns and how well your profile aligns with current opportunities.</li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Modal for App Download */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-8 shadow-lg max-w-md w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
              onClick={() => setIsModalOpen(false)}
            >
              &times;
            </button>
            <h3 className="text-xl font-bold text-center mb-6 text-brown">Download Social Gems App</h3>
            <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
              <a href="https://play.google.com/store/apps/details?id=com.tekjuice.social_gems" target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
                <Image
                  src="/Google-play-store.svg"
                  alt="Download on Google Play"
                  width={150}
                  height={50}
                  className="hover:opacity-80 rounded-md"
                />
              </a>
              <a href="https://apps.apple.com/ug/app/social-gems/id6736918664" target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
                <Image
                  src="/App-store.svg"
                  alt="Download on the App Store"
                  width={150}
                  height={50}
                  className="hover:opacity-80 transition-opacity rounded-md"
                />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FAQPage;