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
        <div className="min-h-screen flex flex-col bg-gray-100">
            <Navbar />
            <div className="flex-grow p-4 sm:p-6">
                <div className="max-w-4xl mx-auto bg-white p-4 sm:p-8 rounded-lg shadow-lg">
                <h1 className="text-2xl sm:text-3xl font-bold text-gold mb-4 sm:mb-6">
                    Privacy Policy
                </h1>

                {/* Introduction */}
                <section className="mb-6 sm:mb-8">
                    <h2 className="text-xl sm:text-2xl font-bold text-gold mb-2 sm:mb-4">
                    Updated Cookie Policy - Social Gems 5.3.25
                    </h2>
                    <p className="text-sm sm:text-base text-gray-700 mb-4">
                        Our APP uses cookies to distinguish you from other users. 
                        This helps us to provide you with a good experience when 
                        you browse our APP and also allows us to improve our service.
                    </p>
                    <p className="text-sm sm:text-base text-gray-700 mb-4">
                        A cookie is a small file of letters and numbers that 
                        we store on your device if you agree. Cookies contain 
                        information that is transferred to your device’s hard 
                        drive.
                    </p>
                </section>

                {/* Important Information */}
                <section className="mb-6 sm:mb-8">
                    <h2 className="text-xl sm:text-2xl font-bold text-gold mb-2 sm:mb-4">
                    We use the following cookies:
                    </h2>
                    <p className="text-sm sm:text-base text-gray-700 mb-4">
                        <ul className="text-sm sm:text-base text-gray-700 mb-4 list-disc list-inside">
                            <li>
                                <strong>Strictly necessary cookies. </strong> 
                                These are cookies that are required for the operation
                                of our APP. These essential cookies are always enabled
                                because our APP won’t work properly without them. 
                                They include, for example, cookies that enable you to 
                                log into sour APP, access a campaign or make use of 
                                e-billing services. 
                            </li>
                            <li>
                                <strong>Analytical or performance cookies.</strong>
                                These allow us to recognise and count the number of 
                                visitors and to see how visitors move around our APP 
                                when they are using it. This helps us to improve the 
                                way our APP works, for example, by ensuring that users 
                                are finding what they are looking for easily.
                            </li>
                            <li>
                                <strong>Functionality cookies.</strong>
                                These are used to recognise you when you 
                                return to our APP. This enables us to 
                                personalise our content for you, greet 
                                you by name and remember your preferences
                                (for example, your choice of language or region).
                            </li>
                            <li>
                                <strong>Targeting cookies.</strong>
                                These cookies record your visit to our APP, 
                                the pages you have visited and the links you 
                                have followed. We will use this information 
                                to make our APP and the advertising displayed on 
                                it more relevant to your interests. We may also 
                                share this information with third parties for this 
                                purpose so that they can serve you with relevant 
                                advertising on their websites or APPs.
                            </li>
                        </ul>
                    </p>
                    <p className="text-sm sm:text-base text-gray-700 mb-4">
                        You can find more here!{" "}
                        <button 
                        onClick={openModal}
                        className="text-blue-500 hover:underline focus:outline-none">
                            Read More
                        </button>
                    </p>
                    {/* Modal */}
                    {isModalOpen && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full mx-4 max-h-[80vh] overflow-hidden flex flex-col">
                            <h2 className="text-xl sm:text-2xl font-bold text-gold mb-2 sm:mb-4">
                                Detailed Cookies Policy
                            </h2>
                            <div className="overflow-y-auto flex-1">
                            <p className="text-sm sm:text-base text-gray-700 mb-4">
                                You can find more information about the individual 
                                cookies we use and the purposes for which we use 
                                them in the table below:
                            </p>
                            {/* Table */}
                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-white border border-gray-300">
                                <thead>
                                    <tr className="bg-gray-200">
                                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                                    Cookie Title<br />
                                    Cookie Name

                                    </th>
                                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                                        Purpose 
                                    </th>
                                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                                        More information
                                    </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b border-gray-200">
                                    <td className="px-4 py-2 text-sm text-gray-700">
                                        _TekJuice.Auth
                                    </td>
                                    <td className="px-4 py-2 text-sm text-gray-700">
                                        This cookie ensures the security and integrity of user accounts by: <br />

                                        1.	Managing user authentication.<br />
                                        2.	Allowing users to securely log in and access their accounts,<br />
                                        3.	Enabling users to navigate restricted areas and perform actions available only to authenticated users. 

                                    </td>
                                    <td className="px-4 py-2 text-sm text-gray-700">
                                         N/A
                                    </td>
                                    </tr>
                                    <tr className="border-b border-gray-200">
                                    <td className="px-4 py-2 text-sm text-gray-700">
                                        _ga_GG0RMYYQ0B, _ga
                                    </td>
                                    <td className="px-4 py-2 text-sm text-gray-700">
                                        Google Analytics uses cookies for various purposes
                                        related to tracking and analysing traffic and user 
                                        behaviour. Here are the primary purposes of cookies 
                                        used by Google Analytics for GDPR compliance: <br />
                                        
                                        1.	Analytics and Performance: Google Analytics cookies 
                                        are primarily utilized to collect information about how 
                                        visitors interact with a website. They track and report data 
                                        on website traffic, such as the number of visitors, their source, 
                                        pages visited, time spent on the site, and other related statistics. 
                                        This data helps website owners understand and improve their site's 
                                        performance and user experience.<br />
                                        2.	User Experience Improvement: The cookies help in understanding 
                                        user preferences and behavior, allowing website owners to optimize 
                                        content, design, and usability to enhance the overall user experience.<br />
                                        3.	Marketing and Advertising: Google Analytics cookies may also be 
                                        used to provide insights for targeted marketing and advertising strategies. 
                                        These cookies can track user behavior across various websites, allowing for more 
                                        targeted and personalized advertising campaigns.<br />
                                        4.	Customization and Personalization: By tracking user interactions, 
                                        Google Analytics cookies contribute to creating a more personalized experience
                                        for website visitors. This can include providing tailored content or 
                                        recommendations based on users' browsing history and interests.<br />
                                        5.	Conversion Tracking: These cookies assist in measuring 
                                        and tracking specific user actions on a website, such as purchases, 
                                        form submissions, or other conversions, helping website owners 
                                        understand the effectiveness of their marketing and site content.<br />

                                    </td>
                                    <td className="px-4 py-2 text-sm text-gray-700">
                                        N/A
                                    </td>
                                    </tr>
                                </tbody>
                                </table>
                            </div>
                            <p className="text-sm sm:text-base text-gray-700  mt-4 mb-4">
                                Please note that third parties may also use cookies, 
                                over which we have no control. These named third parties 
                                may include, for example, advertising networks and providers 
                                of external services like web traffic analysis services. 
                                These third party cookies are likely to be analytical 
                                cookies or performance cookies or targeting cookies:
                            </p>
                            <p className="text-sm sm:text-base text-gray-700 mb-4">
                                To deactivate the use of third party advertising cookies, 
                                you may visit the relevant consumer page to manage the use 
                                of these types of cookies
                            </p>
                            <p className="text-sm sm:text-base text-gray-700 mb-4">
                                To opt out of being tracked by Google Analytics 
                                across all websites, visit http://tools.google.com/dlpage/gaoptout.
                            </p>
                            <p className="text-sm sm:text-base text-gray-700 mb-4">
                                However, if you use your settings to block all 
                                cookies (including essential cookies) you may not be 
                                able to access all or parts of our APP.
                                Except for essential cookies.
                            </p>
                            <p className="text-sm sm:text-base text-gray-700 mb-4">
                                If you have any questions or concerns about our use of cookies, please send us an email at wensi@tekjuice.co.uk.		
                            </p>
                            {/* Add more content here if needed */}
                            </div>
                            <button
                            onClick={closeModal}
                            className="mt-4 px-4 py-2 bg-gold text-white rounded-lg hover:bg-brown transition-colors self-end"
                            >
                            Close
                            </button>
                        </div>
                        </div>
                    )}
                </section>

                {/* Privacy policy */}
                <section className="mb-6 sm:mb-8">
                    <h2 className="text-xl sm:text-2xl font-bold text-gold mb-2 sm:mb-4">
                        Privacy notice
                    </h2>
                    <p className="text-sm sm:text-base text-gray-700 mb-4">
                        This privacy notice applies to personal data Tek 
                        Juice Limited (Company or We) collects about you 
                        when you install, register or use the Social Gems(App) 
                        and explains how we use your information. 
                    </p>
                    <p className="text-sm sm:text-base text-gray-700 mb-4">
                        Visit here to{" "}
                        <button 
                        onClick={openModalprivacy}
                        className="text-blue-500 hover:underline focus:outline-none">
                            Read More
                        </button>
                    </p>
                    {/* Modal */}
                    {isModalOpenPolicy && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full mx-4 max-h-[80vh] overflow-hidden flex flex-col">
                            <h2 className="text-xl sm:text-2xl font-bold text-gold mb-2 sm:mb-4">
                                Important information
                            </h2>
                            <div className="overflow-y-auto flex-1">
                                <p className="text-sm sm:text-base text-gray-700 mb-4">
                                    More detailed information on how we collect and 
                                    process your personal data in conjunction with 
                                    the App is in our app privacy notice. 
                                </p>
                                <h2 className="text-xl sm:text-2xl font-bold text-gold mb-2 sm:mb-4">
                                    The data we collect about you
                                </h2>
                         
                                <p className="text-sm sm:text-base text-gray-700  mt-4 mb-4">
                                    We collect, use, store and transfer different kinds of 
                                    personal data about you, for example when you register 
                                    with us, and through your transactions and interactions 
                                    with us. We may also obtain additional information about 
                                    you from other sources, such as social media and websites 
                                    associated with you. The App also uses common automatic 
                                    information collection and tracking technologies, such as 
                                    cookies and beacons, to collect information about you.<br /> 
                                    The types of information we collect are: 

                                </p>
                                <ul className="list-disc list-inside text-sm sm:text-base text-gray-700 mb-4">
                                    <li>
                                        Identity Data.
                                    </li>
                                    <li>
                                        Contact Data.
                                    </li>
                                    <li>
                                        Profile Data.
                                    </li>
                                    <li>
                                        Transaction Data.
                                    </li>
                                    <li>
                                        Device Data.
                                    </li>
                                    <li>Content Data.</li>
                                    <li>Usage Data.</li>
                                    <li>Security Data.</li>
                                    <li>Cookies Data.</li>
                                    <li>Marketing and Communications Data.</li>
                                    <li>Location Data.</li>
                                    <li>Connected Data.</li>
                                    <li>Social Media Data.</li>
                                    <li>Feedback Data.</li>
                                    <li>Personalisation Data.</li>
                                    <li>Competition Data.</li>
                                </ul>
                            <p className="text-sm sm:text-base text-gray-700 mb-4">
                                To deactivate the use of third party advertising cookies, 
                                you may visit the relevant consumer page to manage the use 
                                of these types of cookies
                            </p>
                            <p className="text-sm sm:text-base text-gray-700 mb-4">
                                To opt out of being tracked by Google Analytics 
                                across all websites, visit http://tools.google.com/dlpage/gaoptout.
                            </p>
                            <p className="text-sm sm:text-base text-gray-700 mb-4">
                                However, if you use your settings to block all 
                                cookies (including essential cookies) you may not be 
                                able to access all or parts of our APP.
                                Except for essential cookies.
                            </p>
                            <p className="text-sm sm:text-base text-gray-700 mb-4">
                                If you have any questions or concerns about our use of cookies, please send us an email at wensi@tekjuice.co.uk.		
                            </p>
                            <h2 className="text-xl sm:text-2xl font-bold text-gold mb-2 sm:mb-4">
                                How we use your personal data
                            </h2>
                            <p className="text-sm sm:text-base text-gray-700 mb-4">
                               
                                We use your personal data to provide you with the 
                                services you request and other purposes which are 
                                explained in our APP privacy notice, including to 
                                provide offers and information regarding our products 
                                and services. We will share your information with other 
                                companies in our group and with external third parties 
                                that we hire to help us provide products and services to you.
                            </p>
                            <h2 className="text-xl sm:text-2xl font-bold text-gold mb-2 sm:mb-4">
                                International transfers
                            </h2>
                            <p className="text-sm sm:text-base text-gray-700 mb-4">
                                We may transfer, store and process your personal data outside the EEA. 
                            </p>
                            <h2 className="text-xl sm:text-2xl font-bold text-gold mb-2 sm:mb-4">
                                Your legal rights
                            </h2> 
                            <p className="text-sm sm:text-base text-gray-700 mb-4">
                                You may create or change your privacy preferences by 
                                editing your profile settings.<br />
                                You may request removal from our database by 
                                emailing us at wensi@tekjuice.co.uk<br />
                                For details of your rights under data protection 
                                laws, including the right to receive a copy of the 
                                personal data we hold about you and the right to make 
                                a complaint at any time please see our full App privacy notice.

                            </p>
                            <h2 className="text-xl sm:text-2xl font-bold text-gold mb-2 sm:mb-4">
                                Contact details
                            </h2>
                            <p className="text-sm sm:text-base text-gray-700 mb-4">
                                We have appointed a data privacy manager. 
                                If you have any questions about this privacy 
                                notice or our data protection practices, 
                                please contact the data privacy manager. 
                                Our contact details are wensi@tekjuice.co.uk.
                            </p>
                            </div>
                            <button
                            onClick={closeModalPrivacy}
                            className="mt-4 px-4 py-2 bg-gold text-white rounded-lg hover:bg-brown transition-colors self-end"
                            >
                            Close
                            </button>
                        </div>
                        </div>
                    )}
                </section>

                {/* REST OF THE PRIVACY POLICIES */}
                <section className="mb-6 sm:mb-8">
                    <h2 className="text-xl sm:text-2xl font-bold text-gold mb-2 sm:mb-4">
                        Preview The Updated Mobile app Privacy Policy Social Gems 5.3.25
                    </h2>
                    <iframe
                        src="/Updated-Mobile-app-Privacy-Policy-Social-Gems-5.3.25.pdf"
                        className="w-full h-96 border border-gray-300 rounded-lg"
                        title="Updated Mobile Policy Preview"
                    />
                    <p className="text-sm sm:text-base text-gray-700 mt-4">
                        To download the full Updated Mobile App Policy, click the button below:
                    </p>
                    <a
                        href="/Updated-Mobile-app-Privacy-Policy-Social-Gems-5.3.25.pdf"
                        download="Updated-Mobile-app-Privacy-Policy-Social-Gems-5.3.25.pdf"
                        className="inline-block px-6 py-2 bg-gold text-white rounded-lg hover:bg-brown transition-colors mt-2"
                    >
                        Download Full Privacy Policy (PDF)
                    </a>
                </section>
                <section className="mb-6 sm:mb-8">
                    <h2 className="text-xl sm:text-2xl font-bold text-gold mb-2 sm:mb-4">
                        Preview The Updated Mobile application Terms of use Social Gems 5.3.24
                    </h2>
                    <iframe
                        src="/Updated-Mobile-application-terms-of-Use-Social-Gems-5.3.24.pdf"
                        className="w-full h-96 border border-gray-300 rounded-lg"
                        title="Updated Mobile Application Terms of Use Preview"
                    />
                    <p className="text-sm sm:text-base text-gray-700 mt-4">
                        To download the full Updated Mobile Application Terms Of Use Policy, click the button below:
                    </p>
                    <a
                        href="/Updated-Mobile-application-terms-of-Use-Social-Gems-5.3.24.pdf"
                        download="Updated-Mobile-application-terms-of-Use-Social-Gems-5.3.24.pdf"
                        className="inline-block px-6 py-2 bg-gold text-white rounded-lg hover:bg-brown transition-colors mt-2"
                    >
                        Download Full Privacy Policy (PDF)
                    </a>
                </section>

                </div>
            </div>
            <Footer />
        </div>
    );
}