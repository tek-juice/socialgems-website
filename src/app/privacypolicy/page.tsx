'use client'
import { useState } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function PrivacyPolicy() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [ isModalOpenPolicy, setIsModalOpenPolicy ] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const openModalprivacy = () =>setIsModalOpenPolicy(true);
    const closeModalPrivacy = () => setIsModalOpenPolicy(false);
    const closeModal = () => setIsModalOpen(false);

    return(
        <div className="min-h-screen flex flex-col bg-gray-50">
            
            <div className="flex-grow py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
                    <div className="px-8 py-12 sm:px-12 sm:py-16">
                        
                        {/* Header */}
                        <div className="text-center mb-12 pb-8 border-b border-gray-200">
                            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                                Privacy Policy
                            </h1>
                            <p className="text-lg text-gray-600">
                                Social Gems Privacy Policy/Notice
                            </p>
                            <p className="text-sm text-gray-500 mt-2">
                                Last modified: 14 August 2025
                            </p>
                        </div>

                        <div className="prose prose-lg max-w-none space-y-8">
                            
                            {/* Introduction */}
                            <section className="mb-12">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Introduction</h2>
                                
                                <p className="text-gray-700 leading-relaxed mb-6">
                                    This privacy notice describes how we will collect, use, share and otherwise process your personal data in connection with your use of:
                                </p>
                                
                                <ul className="list-disc list-inside space-y-2 mb-6 text-gray-700">
                                    <li>Social Gems mobile application software (App)</li>
                                    <li>Any of our services that is accessible through the App (Services)</li>
                                </ul>
                                
                                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                                    <p className="text-yellow-800">
                                        <strong>Important:</strong> This App is not intended for children and we do not knowingly collect data relating to children.
                                    </p>
                                </div>
                                
                                <p className="text-gray-700 leading-relaxed">
                                    Please read the following carefully to understand our practices regarding your personal data and how we will treat it.
                                </p>
                            </section>

                            {/* Important information and who we are */}
                            <section className="mb-12">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Important Information and Who We Are</h2>
                                
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    TEK JUICE LIMITED is the controller and is responsible for your personal data (we, us or our in this notice).
                                </p>
                                
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    As a member of a group of companies, we will share your personal data with other members of our group as set out below.
                                </p>
                                
                                <p className="text-gray-700 leading-relaxed">
                                    We have appointed a data privacy manager. If you have any questions about this privacy notice, please contact them using the details set out below.
                                </p>
                            </section>

                            {/* Contact details */}
                            <section className="mb-12">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Details</h2>
                                
                                <p className="text-gray-700 leading-relaxed mb-4">Our full details are:</p>
                                
                                <div className="bg-gray-50 p-6 rounded-lg mb-6">
                                    <ul className="space-y-3 text-gray-700">
                                        <li><strong>Full name of legal entity:</strong> TEK JUICE LIMITED</li>
                                        <li><strong>Email address:</strong> <a href="mailto:Wensi@tekjuice.co.uk" className="text-blue-600 hover:text-blue-800">Wensi@tekjuice.co.uk</a></li>
                                        <li><strong>Postal address:</strong> 19 The Office Village, North Road, Loughborough, Leicestershire, England, LE11 1QJ</li>
                                    </ul>
                                </div>
                                
                                <p className="text-gray-700 leading-relaxed">
                                    You have the right to make a complaint at any time to the Information Commissioner's Office (ICO), the UK regulator for data protection issues.
                                </p>
                            </section>

                            {/* Changes to the privacy notice */}
                            <section className="mb-12">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Changes to the Privacy Notice and Your Duty to Inform Us of Changes</h2>
                                
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    We keep our privacy notice under regular review.
                                </p>
                                
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    This version was last updated on the date stated at the beginning of the policy. It may change and, if it does, those changes will be posted on this page and notified to you when you next start the App or log onto your account. You may be required to read and acknowledge the changes to continue your use of the App or the Services.
                                </p>
                                
                                <p className="text-gray-700 leading-relaxed">
                                    It is important that the personal data we hold about you is accurate and current. Please keep us informed if your personal data changes during our relationship with you. Please visit the Profile section to update your details.
                                </p>
                            </section>

                            {/* Third party links and sites */}
                            <section className="mb-12">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Third Party Links and Sites</h2>
                                
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    Our App and Services may, from time to time, contain links to and from the websites of third parties. Please note that these websites (and any services accessible through them) are controlled by those third parties and are not covered by this privacy notice.
                                </p>
                                
                                <p className="text-gray-700 leading-relaxed">
                                    You should review their own privacy notices to understand how they use your personal data before you submit any personal data to these websites or use these services.
                                </p>
                            </section>

                            {/* The Data We Collect About You */}
                            <section className="mb-12">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">The Data We Collect About You</h2>
                                
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    We collect, use, store, and transfer different kinds of personal data about you.
                                </p>
                                
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    For example, when you register with us and through your transactions and interactions with us.
                                </p>
                                
                                <p className="text-gray-700 leading-relaxed mb-8">
                                    We may also obtain additional information about you from other sources, such as social media and websites associated with you. The App also uses common automatic information collection and tracking technologies, such as cookies and beacons, to collect information about you.
                                </p>

                                <h3 className="text-xl font-semibold text-gray-900 mb-6">Description of Categories of Personal Data</h3>
                                
                                <div className="space-y-4">
                                    <div className="border-l-4 border-blue-400 pl-4">
                                        <p className="text-gray-700"><strong>Identity Data:</strong> first name, last name, title, date of birth and Profile Data.</p>
                                    </div>
                                    <div className="border-l-4 border-blue-400 pl-4">
                                        <p className="text-gray-700"><strong>Contact Data:</strong> first name, last name, contact address, email address and telephone numbers, your communication preferences and copies of the communications between you and us.</p>
                                    </div>
                                    <div className="border-l-4 border-blue-400 pl-4">
                                        <p className="text-gray-700"><strong>Profile Data:</strong> your email address, username and password.</p>
                                    </div>
                                    <div className="border-l-4 border-blue-400 pl-4">
                                        <p className="text-gray-700"><strong>Transaction Data:</strong> billing and delivery addresses, payment card details, history of your payments, purchases, deliveries, returns and refunds and the applicable terms and conditions of your purchases.</p>
                                    </div>
                                    <div className="border-l-4 border-blue-400 pl-4">
                                        <p className="text-gray-700"><strong>Device Data:</strong> the type of device you use, your unique device identifier, mobile network information, your mobile operating system, the type of mobile browser you use, IP address, time zone setting.</p>
                                    </div>
                                    <div className="border-l-4 border-blue-400 pl-4">
                                        <p className="text-gray-700"><strong>Content Data:</strong> information that you store or generate in the App, being [photos, videos and associated metadata, check-ins, posts and messages].</p>
                                    </div>
                                    <div className="border-l-4 border-blue-400 pl-4">
                                        <p className="text-gray-700"><strong>Usage Data:</strong> logs and detail of your use of our Apps and Services, being the dates and times on which you download, access and update the App and our Services, any error or debugging information, and the resources that you access and the actions we and you take in relation to them and Cookies Data.</p>
                                    </div>
                                    <div className="border-l-4 border-blue-400 pl-4">
                                        <p className="text-gray-700"><strong>Security Data:</strong> information we collect about your use of the App, our Services and our Sites in order to ensure your and our other users' safety and security, being Usage Data, the Cookies Data and the information provided to us by our payment processing provider.</p>
                                    </div>
                                    <div className="border-l-4 border-blue-400 pl-4">
                                        <p className="text-gray-700"><strong>Cookies Data:</strong> the information collected through the cookies and similar technologies listed in our Cookies Notice.</p>
                                    </div>
                                    <div className="border-l-4 border-blue-400 pl-4">
                                        <p className="text-gray-700"><strong>Direct Marketing Data:</strong> your direct marketing preferences, consents for receiving direct marketing from us and/or our third parties and the history of the direct marketing communications we have sent to you.</p>
                                    </div>
                                    <div className="border-l-4 border-blue-400 pl-4">
                                        <p className="text-gray-700"><strong>Location Data:</strong> your current location as disclosed by GPS technology WiFi connections, your IP address for the time period where you have permitted us to collect it.</p>
                                    </div>
                                    <div className="border-l-4 border-blue-400 pl-4">
                                        <p className="text-gray-700"><strong>Connected Data:</strong> information stored on your Device that you permit the App to connect to, being Contacts lists, login information, and camera data.</p>
                                    </div>
                                    <div className="border-l-4 border-blue-400 pl-4">
                                        <p className="text-gray-700"><strong>Social Media Data:</strong> your social media account information.</p>
                                    </div>
                                    <div className="border-l-4 border-blue-400 pl-4">
                                        <p className="text-gray-700"><strong>Feedback Data:</strong> your feedback and survey responses.</p>
                                    </div>
                                    <div className="border-l-4 border-blue-400 pl-4">
                                        <p className="text-gray-700"><strong>Personalization Data:</strong> Cookies Data, Device Data, Content Data, Transaction Data, Connected Data, Social Media Data, Usage Data, Location Data, and the preferences we have inferred you have and use to personalize the App and Services, being the preferences noted in your account.</p>
                                    </div>
                                    <div className="border-l-4 border-blue-400 pl-4">
                                        <p className="text-gray-700"><strong>Competition Data:</strong> information about the competitions you enter with us, being your competition history, the applicable terms and conditions, associated third parties and any additional privacy notices.</p>
                                    </div>
                                </div>
                                
                                <div className="mt-8 space-y-4">
                                    <p className="text-gray-700 leading-relaxed">
                                        We do not intentionally collect any special categories of personal data about you (this includes details about your race or ethnicity, religious or philosophical beliefs, sex life, sexual orientation, political opinions, trade union membership, information about your health, and genetic and biometric data).
                                    </p>
                                    
                                    <p className="text-gray-700 leading-relaxed">
                                        We may collect data relating to criminal offences through the measures we take to secure and protect our App and users.
                                    </p>
                                </div>
                            </section>

                            {/* How We Collect Your Personal Data */}
                            <section className="mb-12">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">How We Collect Your Personal Data</h2>
                                
                                <p className="text-gray-700 leading-relaxed mb-6">We collect your personal data in the following ways:</p>
                                
                                <div className="space-y-4 mb-8">
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <p className="text-gray-700"><strong>Registration:</strong> we collect your Identity Data and Contact Data when you register your account with us.</p>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <p className="text-gray-700"><strong>Communications:</strong> when you communicate with us via email, one of our online forms or chat we collect your Contact Data.</p>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <p className="text-gray-700"><strong>Information you generate when using our App and Services:</strong> each time you access and use our App and Services we collect Content, Device, Cookies, Personalization and Usage Data.</p>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <p className="text-gray-700"><strong>Information we collect through monitoring:</strong> Each time you access and use our App and Services we collect information about that access and use.</p>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <p className="text-gray-700"><strong>Additional information we otherwise collect:</strong> where you provide your consent, we collect your Location Data on an ongoing basis while you have the App installed on your device.</p>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <p className="text-gray-700"><strong>Direct Marketing:</strong> we collect and record Direct Marketing Data when we add you to our marketing database.</p>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <p className="text-gray-700"><strong>Connected Data:</strong> we collect Connected Data when you choose to connect your connected device to your account.</p>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <p className="text-gray-700"><strong>Social Media Data:</strong> We collect Social Media Data when you choose to connect your social media account to your account.</p>
                                    </div>
                                </div>

                                <h3 className="text-xl font-semibold text-gray-900 mb-6">Information We Receive from Third Parties and Publicly Available Sources</h3>
                                
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    We will receive personal data about you from the third parties and public sources set out below:
                                </p>
                                
                                <ul className="list-disc list-inside space-y-2 text-gray-700">
                                    <li>Device and Cookies Data from analytics providers, including Google Analytics</li>
                                    <li>Contact, Financial and Transaction Data from providers of technical, payment and delivery services such as Stripe</li>
                                    <li>Identity and Contact Data from publicly available sources</li>
                                    <li>Social media sites, including Facebook and Instagram</li>
                                </ul>
                            </section>

                            {/* How We Use Your Personal Data */}
                            <section className="mb-12">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">How We Use Your Personal Data</h2>
                                
                                <p className="text-gray-700 leading-relaxed mb-6">
                                    We use your personal data to provide you with the services you request and other purposes, including:
                                </p>
                                
                                <div className="space-y-4 mb-8">
                                    <div className="border-l-4 border-green-400 pl-4 bg-green-50 p-4 rounded-r-lg">
                                        <p className="text-gray-700"><strong>Service Delivery:</strong> To operate the Social Gems App, process transactions, and provide customer support.</p>
                                    </div>
                                    <div className="border-l-4 border-green-400 pl-4 bg-green-50 p-4 rounded-r-lg">
                                        <p className="text-gray-700"><strong>Personalization:</strong> To tailor content and offers based on your Profile, Usage, and Social Media Data.</p>
                                    </div>
                                    <div className="border-l-4 border-green-400 pl-4 bg-green-50 p-4 rounded-r-lg">
                                        <p className="text-gray-700"><strong>Marketing:</strong> To send you updates or promotions, with your consent.</p>
                                    </div>
                                    <div className="border-l-4 border-green-400 pl-4 bg-green-50 p-4 rounded-r-lg">
                                        <p className="text-gray-700"><strong>Improvement:</strong> To analyze Usage and Feedback Data to enhance app features.</p>
                                    </div>
                                    <div className="border-l-4 border-green-400 pl-4 bg-green-50 p-4 rounded-r-lg">
                                        <p className="text-gray-700"><strong>Security and verification:</strong> To protect your account and verify user identities.</p>
                                    </div>
                                </div>

                                <h3 className="text-xl font-semibold text-gray-900 mb-6">Specific Use of Facebook and Instagram Data</h3>
                                
                                <div className="bg-blue-50 p-6 rounded-lg space-y-4">
                                    <p className="text-gray-700 leading-relaxed">
                                        <strong>Collection:</strong> When you add your Facebook or Instagram account during registration, we collect your name, email, profile details, verification status, follower count, and other Social Media Data via OAuth authentication.
                                    </p>
                                    
                                    <p className="text-gray-700 leading-relaxed">
                                        <strong>Use for Verification:</strong> We use this data to confirm account ownership, validate verification status, and confirm follower count to prevent fraud and maintain platform integrity.
                                    </p>
                                    
                                    <p className="text-gray-700 leading-relaxed">
                                        <strong>Additional Uses:</strong> Beyond verification, this data personalizes your experience and enhances social interactions within the app.
                                    </p>
                                    
                                    <p className="text-gray-700 leading-relaxed">
                                        <strong>Consent and Controls:</strong> You provide explicit consent during the login process and can withdraw consent or unlink your account at any time via your profile settings.
                                    </p>
                                </div>
                            </section>

                            {/* Sharing Your Personal Data */}
                            <section className="mb-12">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Sharing Your Personal Data</h2>
                                
                                <p className="text-gray-700 leading-relaxed mb-6">
                                    We may share your personal data with the following third parties:
                                </p>
                                
                                <ul className="list-disc list-inside space-y-3 text-gray-700">
                                    <li>Internal third parties: other companies in the Tek Juice Group</li>
                                    <li>External third parties: Your Appstore Provider and mobile network operator</li>
                                    <li>Service providers: IT and system administration services, hosting services, payment processing, etc.</li>
                                    <li>Professional advisors: lawyers, auditors, insurers, consultants</li>
                                    <li>Marketing and promotional partners</li>
                                    <li>Third parties in business transfers or mergers</li>
                                    <li>Law enforcement and regulatory authorities when required</li>
                                    <li>Facebook and Instagram: Data is shared back as part of the authentication process</li>
                                </ul>
                            </section>

                            {/* International transfers */}
                            <section className="mb-12">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">International Transfers</h2>
                                
                                <p className="text-gray-700 leading-relaxed">
                                    When we transfer your personal data outside the EEA, we ensure appropriate safeguards are in place to protect your data.
                                </p>
                            </section>

                            {/* Data security */}
                            <section className="mb-12">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Data Security</h2>
                                
                                <p className="text-gray-700 leading-relaxed">
                                    All information you provide is stored on secure servers. Payment transactions are encrypted using SSL technology. We have procedures in place to detect and respond to personal data breaches.
                                </p>
                            </section>

                            {/* Data retention */}
                            <section className="mb-12">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Data Retention</h2>
                                
                                <p className="text-gray-700 leading-relaxed">
                                    We retain your personal data only as long as necessary for the purposes outlined in this policy. You can request deletion of your data in certain circumstances.
                                </p>
                            </section>

                            {/* Your Legal Rights */}
                            <section className="mb-12">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Legal Rights</h2>
                                
                                <p className="text-gray-700 leading-relaxed mb-6">
                                    You have the following rights under data protection laws:
                                </p>
                                
                                <div className="space-y-3">
                                    <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-400">
                                        <p className="text-gray-700"><strong>Access:</strong> Request access to your personal data</p>
                                    </div>
                                    <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-400">
                                        <p className="text-gray-700"><strong>Correction:</strong> Request correction of inaccurate data</p>
                                    </div>
                                    <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-400">
                                        <p className="text-gray-700"><strong>Deletion:</strong> Request deletion of your personal data</p>
                                    </div>
                                    <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-400">
                                        <p className="text-gray-700"><strong>Objection:</strong> Object to processing of your personal data</p>
                                    </div>
                                    <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-400">
                                        <p className="text-gray-700"><strong>Restriction:</strong> Request restriction of processing</p>
                                    </div>
                                    <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-400">
                                        <p className="text-gray-700"><strong>Data portability:</strong> Request transfer of your data</p>
                                    </div>
                                    <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-400">
                                        <p className="text-gray-700"><strong>Withdraw consent:</strong> Withdraw consent at any time</p>
                                    </div>
                                    <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-400">
                                        <p className="text-gray-700"><strong>Complain:</strong> Make a complaint to the data protection regulator</p>
                                    </div>
                                </div>
                            </section>

                            {/* Contact Details */}
                            <section className="mb-12">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Details</h2>
                                
                                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border">
                                    <p className="text-gray-700 leading-relaxed mb-4">
                                        If you have any questions about this privacy notice or our data protection practices, please contact our data privacy manager:
                                    </p>
                                    
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <a 
                                            href="mailto:wensi@tekjuice.co.uk" 
                                            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors text-center"
                                        >
                                            wensi@tekjuice.co.uk
                                        </a>
                                        <a 
                                            href="mailto:Nobert@tekjuice.co.uk" 
                                            className="inline-block bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors text-center"
                                        >
                                            Nobert@tekjuice.co.uk
                                        </a>
                                    </div>
                                </div>
                            </section>

                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    );
}