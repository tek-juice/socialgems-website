'use client'
import { useState } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function PrivacyPolicy() {
    //const [accepted, setAccepted] = useState<boolean | null>(null);

    /*const handleAccept = () => {
        setAccepted(true);
        // Here you would typically send the acceptance to your backend
        console.log('Terms accepted');
    };

    const handleDecline = () => {
        setAccepted(false);
        // Handle decline logic (e.g., redirect or show message)
        console.log('Terms declined');
    };
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [ isModalOpenPolicy, setIsModalOpenPolicy ] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const openModalprivacy = () =>setIsModalOpenPolicy(true);
    const closeModalPrivacy = () => setIsModalOpenPolicy(false);
    const closeModal = () => setIsModalOpen(false);
    */
    return(
        <div className="min-h-screen flex flex-col bg-gray-100">
            <Navbar />
            <div className="flex-grow p-4 sm:p-6">
                <div className="max-w-4xl mx-auto bg-white p-4 sm:p-8 rounded-lg shadow-lg">
                <h1 className="text-xl sm:text-2xl font-bold text-gold mb-2 sm:mb-4">
                    Updated Cookie Policy - Social Gems 5.3.25 - Last Updated 2 April
                </h1>

                {/* Introduction */}
                <section className="mb-6 sm:mb-8">
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
                    <p className="text-sm sm:text-base text-gray-700 mb-4"></p>
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
                </section>

                {/* Updated Mobile app privacy notice- Social Gems 5.3.25 */}
                <section className="mb-6 sm:mb-8">
                    <h1 className="text-xl sm:text-2xl font-bold text-gold mb-2 sm:mb-4"> 
                        Updated Mobile app privacy notice- Social Gems 5.3.25
                    </h1> <br />
                    <p className="text-sm sm:text-base text-gray-700 mb-4">
                        This privacy notice applies to personal data Tek 
                        Juice Limited (<strong>Company</strong> or <strong>We </strong>) collects about you 
                        when you install, register or use the Social Gems(<strong>App</strong>) 
                        and explains how we use your information. 
                    </p>
                    <h2 className="text-xl sm:text-2xl font-bold text-gold mb-2 sm:mb-4">
                        Important information
                    </h2>
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
        
                </section>

                {/* Updated Mobile app Privacy Policy - Social Gems 5.3.25 */}
                <section className="mb-6 sm:mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gold mb-6"> Updated Mobile app Privacy Policy - Social Gems 5.3.25</h1>

                    <section className="mb-6 text-black">
                        <h2 className="text-xl font-bold text-gold mb-4">Introduction</h2>
                        <p className="mb-4">Last modified 4 March 2025</p>
                        <p className="mb-4">
                        This privacy notice describes how we will collect, use, share and otherwise process your personal data in connection with your use of:
                        </p>
                        <ul className="list-disc pl-6 mb-4">
                        <li>Social Gems mobile application software (<strong>App</strong>).</li>
                        <li>Any of our services that are accessible through the App (<strong>Services</strong>).</li>
                        </ul>
                        <p className="mb-4">
                        This App is not intended for children and we do not knowingly collect data relating to children.
                        </p>
                        <p>
                        Please read the following carefully to understand our practices regarding your personal data and how we will treat it.
                        </p>
                    </section>

                    <section className="mb-6 text-black">
                        <h2 className="text-xl font-bold text-gold mb-4">Important information and who we are</h2>
                        <p className="mb-4">
                        TEK JUICE LIMITED is the controller and is responsible for your personal data (<strong>we</strong>, <strong>us</strong> or <strong>our</strong> in this notice).
                        </p>
                        <p className="mb-4">
                        As a member of a group of companies, we will share your personal data with other members of our group as set out below.
                        </p>
                        <p>
                        We have appointed a data privacy manager. If you have any questions about this privacy notice, please contact them using the details set out below.
                        </p>
                    </section>

                    <section className="mb-6 text-black">
                        <h2 className="text-xl font-bold text-gold mb-4">Contact details</h2>
                        <p className="mb-4">Our full details are:</p>
                        <ul className="list-disc pl-6 mb-4">
                        <li>Full name of legal entity: TEK JUICE LIMITED</li>
                        <li>Email address: <a href="mailto:Wensi@tekjuice.co.uk" className="text-black">Wensi@tekjuice.co.uk</a></li>
                        <li>Postal address: 19 The Office Village, North Road, Loughborough, Leicestershire, England, LE11 1QJ</li>
                        </ul>
                        <p>
                        You have the right to make a complaint at any time to the Information Commissioner's Office (<strong>ICO</strong>), the UK regulator for data protection issues.
                        </p>
                    </section>

                    <section className="mb-6 text-black">
                        <h2 className="text-xl font-bold text-gold mb-4">Changes to the privacy notice and your duty to inform us of changes</h2>
                        <p className="mb-4">
                        We keep our privacy notice under regular review.
                        </p>
                        <p className="mb-4">
                        This version was last updated on the date stated at the beginning of the policy. It may change and, if it does, those changes will be posted on this page and notified to you when you next start the App or log onto your account. You may be required to read and acknowledge the changes to continue your use of the App or the Services.
                        </p>
                        <p>
                        It is important that the personal data we hold about you is accurate and current. Please keep us informed if your personal data changes during our relationship with you. Please visit the Profile section to update your details.
                        </p>
                    </section>

                    <section className="mb-6 text-black">
                        <h2 className="text-xl font-bold text-gold mb-4">Third party links and sites</h2>
                        <p className="mb-4">
                        Our App and Services may, from time to time, contain links to and from the websites of third parties. Please note that these websites (and any services accessible through them) are controlled by those third parties and are not covered by this privacy notice.
                        </p>
                        <p>
                        You should review their own privacy notices to understand how they use your personal data before you submit any personal data to these websites or use these services.
                        </p>
                    </section>

                    <section className="mb-6 text-black">
                        <h2 className="text-xl font-bold text-gold mb-4">The data we collect about you</h2>
                        <p className="mb-4">
                        We collect, use, store and transfer different kinds of personal data about you. To make it easier for you to use this privacy notice, we group these into the following categories. Each of these categories is described in more detail.
                        </p>
                        <ul className="list-disc pl-6 mb-4">
                        <li>Identity Data.</li>
                        <li>Contact Data.</li>
                        <li>Profile Data.</li>
                        <li>Transaction Data.</li>
                        <li>Device Data.</li>
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
                        <p className="mb-4">
                        We do not intentionally collect any special categories of personal data about you (this includes details about your race or ethnicity, religious or philosophical beliefs, sex life, sexual orientation, political opinions, trade union membership, information about your health, and genetic and biometric data).
                        </p>
                        <p>
                        We may collect data relating to criminal offences through the measures we take to secure and protect our App and users.
                        </p>
                    </section>

                    <section className="mb-6 text-black">
                        <h2 className="text-xl font-bold text-gold mb-4">How is your personal data collected?</h2>
                        <p className="mb-4">We collect your personal data in the following way:</p>
                        
                        <h3 className="font-bold mb-2">Registration</h3>
                        <p className="mb-4">
                        We collect your Identity Data and Contact Data when you register your account with us.
                        </p>

                        <h3 className="font-bold mb-2">Communications</h3>
                        <p className="mb-4">
                        When you communicate with us via email, one of our online forms or chat we collect your Contact Data. If you contact us through the App using the chat function, we also collect Device and Cookies Data to operate our chat function and respond to your messages. If the communication relates to an error or problem you are having with the App or one of our Services, we will also collect Usage Data for diagnosis and improvement.
                        </p>

                        <h3 className="font-bold mb-2">Information you generate when using our App and Services</h3>
                        <p className="mb-4">
                        Each time you access and use our App and Services we collect Content, Device, Cookies, Personalisation and Usage Data. We collect Content Data where you upload it to the App or interact with the content available on the App. We collect Device, Cookies, Personalisation and Usage Data by using cookies and other similar technologies. Please see our cookie notice [LINK] for further details.
                        </p>

                        <h3 className="font-bold mb-2">Information we collect through monitoring the use of our App, Sites and Services</h3>
                        <p className="mb-4">
                        Each time you access and use our App and Services we collect information about that access and use, being Device, Content, Cookies, and Usage Data.
                        </p>

                        <h3 className="font-bold mb-2">Additional information we otherwise collect through our App, Sites and Services where we have your consent to do so</h3>
                        <p className="mb-4">
                        Where you provide your consent, we collect your Location Data on an ongoing basis while you have the App installed on your device.
                        </p>

                        <h3 className="font-bold mb-2">Direct Marketing</h3>
                        <p className="mb-4">
                        We collect and record Direct Marketing Data when we add you to our marketing database, you request to change your direct marketing preferences, or you interact with our direct marketing communications, or we receive prospect information from our data broker partners.
                        </p>

                        <h3 className="font-bold mb-2">Connected Data</h3>
                        <p className="mb-4">
                        We collect Connected Data when you choose to connect your connected device to your account.
                        </p>

                        <h3 className="font-bold mb-2">Social Media Data</h3>
                        <p className="mb-4">
                        We collect Social Media Data when you choose to connect your social media account to your account.
                        </p>

                        <h3 className="font-bold mb-2">Information we receive from third parties and publicly available sources</h3>
                        <p className="mb-4">
                        We will receive personal data about you from the third parties and public sources set out below:
                        </p>
                        <ul className="list-disc pl-6 mb-4">
                        <li>Device and Cookies Data from the following parties: analytics providers, including Google Analytics; advertising networks; search information providers, including Google.</li>
                        <li>Contact, Financial and Transaction Data from providers of technical, payment and delivery services such as Stripe based inside the UK;</li>
                        <li>Identity and Contact Data from publicly available sources such as Companies House and the electoral register based inside your jurisdiction; and</li>
                        <li>Social media sites.</li>
                        </ul>
                    </section>

                    <section className="mb-6 text-black">
                        <h2 className="text-xl font-bold text-gold mb-4">Cookies</h2>
                        <p className="mb-4">
                        We use cookies (small files placed on your device) and other tracking technologies on the App and in our direct marketing emails to improve your experience and our development of the App and our Services. For detailed information on the cookies we use, the purposes for which we use them and how you can exercise your choices regarding our use of your cookies, see our cookie notice.
                        </p>
                    </section>

                    <section className="mb-6 text-black">
                        <h2 className="text-xl font-bold text-gold mb-4">How we use your personal data</h2>
                        <p className="mb-4">
                        We will only use your personal data when we have a lawful basis to do so. Our lawful basis for each purpose for which we use your personal data is specified below. Most commonly we will use your personal data in the following circumstances:
                        </p>
                        <ul className="list-disc pl-6 mb-4">
                        <li><strong>Consent.</strong> Where you have freely consented before the processing in a specific, informed and unambiguous indication of what you want. You can withdraw your consent at any time by contacting us.</li>
                        <li><strong>Performance of a contract.</strong> Where we need to process your personal data to perform a contract with you or where you ask us to take steps before we enter into a contract with you. Where we rely on performance of a contract and you do not provide the necessary information, we will be unable to perform your contract.</li>
                        <li><strong>Legitimate interests.</strong> Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests. We make sure we consider and balance any potential impact on you (both positive and negative) and your rights before we process your personal data for our legitimate interests. You can obtain further information about how we assess our legitimate interests against any potential impact on you in respect of specific activities by contacting us.</li>
                        <li><strong>Legal obligation.</strong> Where we need to use your personal data to comply with a legal or regulatory obligation. Where we rely on legal obligation and you do not provide the necessary information, we may be unable to fulfil a right you have or comply with our obligations to you, or we may need to take additional steps, such as informing law enforcement or a public authority or applying for a court order.</li>
                        </ul>

                        <h3 className="font-bold mb-2 mt-4">Delivery and improvement of our App and purchases</h3>
                        <div className="overflow-x-auto mb-4">
                        <table className="min-w-full border">
                            <thead>
                            <tr className="bg-gray-100">
                                <th className="border p-2">Purpose or activity</th>
                                <th className="border p-2">Type of personal data</th>
                                <th className="border p-2">Lawful basis for processing</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td className="border p-2">To permit you to install the App and register you as a new App user</td>
                                <td className="border p-2">Identity Contact Financial Device</td>
                                <td className="border p-2">Legitimate interests (delivering our App to you)</td>
                            </tr>
                            <tr>
                                <td className="border p-2">To take steps towards providing you with services at your request, to process and fulfil in-App campaigns and deliver services to you, including managing payments and sending you service communications</td>
                                <td className="border p-2">Identity Contact Transaction Device Location</td>
                                <td className="border p-2">Performance of a contract</td>
                            </tr>
                            <tr>
                                <td className="border p-2">To provide you with your membership benefits, fulfil campaigns or redemption of Gems within the App</td>
                                <td className="border p-2">Identity Contact Transaction</td>
                                <td className="border p-2">Performance of a contract</td>
                            </tr>
                            <tr>
                                <td className="border p-2">Enforce our terms and conditions, including to collect money owed to us</td>
                                <td className="border p-2">Identity</td>
                                <td className="border p-2">Legitimate interests (to recover debts due to us)</td>
                            </tr>
                            </tbody>
                        </table>
                        </div>

                        <h3 className="font-bold mb-2">Account management and profiling</h3>
                        <div className="overflow-x-auto mb-4">
                        <table className="min-w-full border">
                            <thead>
                            <tr className="bg-gray-100">
                                <th className="border p-2">Purpose or activity</th>
                                <th className="border p-2">Type of personal data</th>
                                <th className="border p-2">Lawful basis for processing</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td className="border p-2">Combining the information we collect about you into a single customer account profile</td>
                                <td className="border p-2">Contact Direct marketing</td>
                                <td className="border p-2">Legitimate Interests (to publicise and grow our business)</td>
                            </tr>
                            </tbody>
                        </table>
                        </div>

                        <h3 className="font-bold mb-2">Direct marketing</h3>
                        <div className="overflow-x-auto mb-4">
                        <table className="min-w-full border">
                            <thead>
                            <tr className="bg-gray-100">
                                <th className="border p-2">Purpose or activity</th>
                                <th className="border p-2">Type of personal data</th>
                                <th className="border p-2">Lawful basis for processing</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td className="border p-2">To send you direct marketing communications via email, text and/or push notification</td>
                                <td className="border p-2">Contact Device Direct Marketing</td>
                                <td className="border p-2">Consent Unless we can rely on the soft opt-in and you have not opted out, in which case we rely on Legitimate Interest (to publicise and grow our business)</td>
                            </tr>
                            <tr>
                                <td className="border p-2">To send you direct marketing communications by telephone or post or email</td>
                                <td className="border p-2">Contact Device Direct Marketing</td>
                                <td className="border p-2">Legitimate interests (to publicise and grow our business) Unless you have opted out, in which case we rely on Consent</td>
                            </tr>
                            </tbody>
                        </table>
                        </div>

                        <h3 className="font-bold mb-2">Troubleshooting, improvement and security</h3>
                        <div className="overflow-x-auto mb-4">
                        <table className="min-w-full border">
                            <thead>
                            <tr className="bg-gray-100">
                                <th className="border p-2">Purpose or activity</th>
                                <th className="border p-2">Type of personal data</th>
                                <th className="border p-2">Lawful basis for processing</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td className="border p-2">To administer, monitor and improve our business, Services and this App including troubleshooting, data analysis and system testing</td>
                                <td className="border p-2">Identity Contact Device</td>
                                <td className="border p-2">Legitimate interests (for running our business, provision of administration and IT services, network security, maintaining the security of our App and Services, providing a secure service to users and preventing fraudulent and other misuse of our App)</td>
                            </tr>
                            <tr>
                                <td className="border p-2">Applying security measures to our processing of your personal data, including processing in connection with the App</td>
                                <td className="border p-2">All personal data under this privacy notice</td>
                                <td className="border p-2">Legal obligation (applying appropriate technical and organisational measures under)</td>
                            </tr>
                            <tr>
                                <td className="border p-2">Otherwise monitoring use of the App and deploying appropriate security measures</td>
                                <td className="border p-2">Contact Security Transaction</td>
                                <td className="border p-2">Legitimate interests (running our business, provision of administration and IT services, network security, maintaining the security of our App and services, providing a secure service to users and preventing fraudulent and other misuse of our App)</td>
                            </tr>
                            </tbody>
                        </table>
                        </div>

                        <h3 className="font-bold mb-2">Rights and obligations</h3>
                        <div className="overflow-x-auto mb-4">
                        <table className="min-w-full border">
                            <thead>
                            <tr className="bg-gray-100">
                                <th className="border p-2">Purpose or activity</th>
                                <th className="border p-2">Type of personal data</th>
                                <th className="border p-2">Lawful basis for processing</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td className="border p-2">To comply with our other legal obligations, including compliance with tax legislation, judicial, law enforcement and government authorities' requests</td>
                                <td className="border p-2">All personal data under this privacy notice</td>
                                <td className="border p-2">Legal obligation (under laws of the UK, Uganda or relevant jurisdiction)</td>
                            </tr>
                            </tbody>
                        </table>
                        </div>

                        <h3 className="font-bold mb-2">Cookies and personalisation</h3>
                        <div className="overflow-x-auto mb-4">
                        <table className="min-w-full border">
                            <thead>
                            <tr className="bg-gray-100">
                                <th className="border p-2">Purpose or activity</th>
                                <th className="border p-2">Type of personal data</th>
                                <th className="border p-2">Lawful basis for processing</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td className="border p-2">To deploy and process personal data collected via Cookies that are , as set out in the cookies note.</td>
                                <td className="border p-2">Cookies</td>
                                <td className="border p-2">Legitimate interests (delivering and securing the App and our Services)</td>
                            </tr>
                            <tr>
                                <td className="border p-2">To deploy and process personal data collected via Cookies that are not strictly necessary, as set out in the cookies note.</td>
                                <td className="border p-2">Cookies</td>
                                <td className="border p-2">Consent</td>
                            </tr>
                            <tr>
                                <td className="border p-2">To deliver (personalised) advertisements to you</td>
                                <td className="border p-2">Personalisation</td>
                                <td className="border p-2">Consent</td>
                            </tr>
                            </tbody>
                        </table>
                        </div>

                        <h3 className="font-bold mb-2">Other communications</h3>
                        <div className="overflow-x-auto mb-4">
                        <table className="min-w-full border">
                            <thead>
                            <tr className="bg-gray-100">
                                <th className="border p-2">Purpose or activity</th>
                                <th className="border p-2">Type of personal data</th>
                                <th className="border p-2">Lawful basis for processing</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td className="border p-2">To notify you of changes to the App, Services, your purchases and our terms and conditions for ongoing contracts</td>
                                <td className="border p-2">Contact</td>
                                <td className="border p-2">For ongoing or prospective contracts, Performance of a contract Otherwise, Legitimate interests (in servicing our users and prospective users)</td>
                            </tr>
                            <tr>
                                <td className="border p-2">To notify you of updates to this privacy notice</td>
                                <td className="border p-2">Contact Transaction</td>
                                <td className="border p-2">Legal obligation (to inform you of our processing under Articles 13 and 14 of the UK GDPR [and the EU GDPR])</td>
                            </tr>
                            <tr>
                                <td className="border p-2">To respond to your requests to exercise your rights under this notice</td>
                                <td className="border p-2">As relevant to your request</td>
                                <td className="border p-2">Legal obligation (complying with data subject requests under Chapter 3 of the UK GDPR and the EU GDPR)</td>
                            </tr>
                            <tr>
                                <td className="border p-2">To enable you to participate in a prize draw or competition (where applicable, please also see the separate prize or competition privacy notice)</td>
                                <td className="border p-2">Contact Direct Marketing Competition</td>
                                <td className="border p-2">Legitimate interests (in growing and publicising our business) Unless you have previously opted out, where we will rely on Consent Performance of a contract (once you have entered)</td>
                            </tr>
                            <tr>
                                <td className="border p-2">To ask you to complete a survey and process your response (where applicable, please also see the separate privacy notice)</td>
                                <td className="border p-2">Contact</td>
                                <td className="border p-2">Legitimate interests (to analyse how users use our products or Services and to develop them and grow our business) Unless you have previously opted out, where we will rely on Consent</td>
                            </tr>
                            <tr>
                                <td className="border p-2">To otherwise respond to your enquiries, fulfil your requests and to contact you where necessary</td>
                                <td className="border p-2">As relevant to your enquiry or request</td>
                                <td className="border p-2">Legitimate interests (service our users and prospective users)</td>
                            </tr>
                            </tbody>
                        </table>
                        </div>

                        <h3 className="font-bold mb-2">Personal data sharing</h3>
                        <div className="overflow-x-auto mb-4">
                        <table className="min-w-full border">
                            <thead>
                            <tr className="bg-gray-100">
                                <th className="border p-2">Purpose or activity</th>
                                <th className="border p-2">Type of personal data</th>
                                <th className="border p-2">Lawful basis for processing</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td className="border p-2">Share personal data with our third-party providers for purposes not otherwise set out above</td>
                                <td className="border p-2">Identity Contact Transaction Device Location</td>
                                <td className="border p-2">Legitimate interests (for the purpose relevant to the recipient, as set out at "Disclosures of your personal data")</td>
                            </tr>
                            </tbody>
                        </table>
                        </div>

                        <h3 className="font-bold mb-2">Business contacts</h3>
                        <div className="overflow-x-auto mb-4">
                        <table className="min-w-full border">
                            <thead>
                            <tr className="bg-gray-100">
                                <th className="border p-2">Purpose or activity</th>
                                <th className="border p-2">Type of personal data</th>
                                <th className="border p-2">Lawful basis for processing</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td className="border p-2">Process personal data relating to staff members of our business contacts, including suppliers, customers and prospects</td>
                                <td className="border p-2">Contact</td>
                                <td className="border p-2">Legitimate interests (servicing and receiving products or services, to or from our business contacts and carry out our B2B business)</td>
                            </tr>
                            </tbody>
                        </table>
                        </div>

                        <h3 className="font-bold mb-2">Automated decision making and profiling</h3>
                        <p className="mb-4">
                        We do not make decisions based solely on automated processing or profiling that produce legal effects concerning you (or have similarly significant effects).
                        </p>
                    </section>

                    <section className="mb-6 text-black">
                        <h2 className="text-xl font-bold text-gold mb-4">Criminal offence data and special category data</h2>
                        <p className="mb-4">
                        We do not intentionally collect criminal offence data about you. However we may process data relating to criminal offences in monitoring the use of our App for security purposes, where we suspect you may have committed a crime, such as attempting to make a fraudulent purchase or claim or circumvent the security of the App or Services. In such circumstances we will provide that information to law enforcement and/or use it to establish, exercise or defend a legal claim. In those circumstances, according to the type of activity and purpose, we will rely on legitimate interests (protecting our business, employees and other users) and legal obligation (where required by legal, judicial or law enforcement to disclose or process that information).
                        </p>
                        <h3 className="font-bold mb-2">Special categories of personal data</h3>
                        <p>
                        We process the following special categories of personal data about you.
                        </p>
                    </section>

                    <section className="mb-6 text-black">
                        <h2 className="text-xl font-bold text-gold mb-4">Disclosures of your personal data</h2>
                        <p className="mb-4">We may share your personal data with the following third parties:</p>
                        <ul className="list-disc pl-6 mb-4">
                        <li><strong>Internal third parties</strong>. Other companies in the Tek Juice Group and other associated companies acting as processors who provide IT and system administration services and undertake leadership reporting.</li>
                        </ul>
                        <h3 className="font-bold mb-2">External third parties.</h3>
                        <p className="mb-4">Your Appstore Provider and mobile network operator to allow you to install the App.</p>
                        <ul className="list-disc pl-6 mb-4">
                        <li>Service providers acting as processors based in the UK, Uganda and other jurisdictions who provide IT and system administration services, hosting services for our App, delivery and logistics services, payment processing, fraud and identity verification providers, customer service support, email delivery and administration, and data storage and analysis.</li>
                        <li>Our professional advisors acting as controllers based in Uganda and the UK including lawyers, auditors, insurers, consultants and who provide legal, accounting, insurance and services.</li>
                        <li>Your service providers that you have appointed and we need to contact to fulfil your requests, such as your banking or payment card provider to process your transactions.</li>
                        <li>Marketing and promotional partners and co-operatives acting as processors or joint controllers with whom we share data to enhance our offerings and identify prospective customers.</li>
                        <li>Third party partners where you have subscribed to receive marketing from or with them.</li>
                        <li>Specific third parties listed in the table [Purposes for which we will use your personal data] above.</li>
                        <li>Third parties to whom we may choose to sell, transfer or merge parts of our business or our assets. Alternatively, we may seek to acquire other businesses or merge with them. If a change happens to our business, then the new owners may use your personal data in the same way as set out in this privacy notice.</li>
                        <li>HM Revenue and Customs, regulators, law enforcement, public authorities or other third parties based in the UK , Uganda or relevant jurisdiction where necessary to exercise our rights or comply with a legal obligation.</li>
                        </ul>
                    </section>

                    <section className="mb-6 text-black">
                        <h2 className="text-xl font-bold text-gold mb-4">International transfers</h2>
                        <p className="mb-4">
                        Whenever we transfer your personal data out of the EEA other than between our group companies, we ensure a similar degree of protection is afforded to it by ensuring at least one of the following safeguards is implemented:
                        </p>
                        <ul className="list-disc pl-6 mb-4">
                        <li>We will only transfer your personal data to countries that have been deemed to provide an adequate level of protection for personal data.</li>
                        <li>Where we use certain service providers located outside the EEA, we use specific contracts approved which give personal data the same protection it has in the EEA. For further details.</li>
                        </ul>
                        <p>
                        Please contact data privacy manager using the contact details above if you want further information on the specific mechanism used by us when transferring your personal data out of the EEA.
                        </p>
                    </section>

                    <section className="mb-6 text-black">
                        <h2 className="text-xl font-bold text-gold mb-4">Data security</h2>
                        <p className="mb-4">
                        All information you provide to us is stored on our secure servers. Any payment transactions carried out by us or our chosen third-party provider of payment processing services will be encrypted using Secured Sockets Layer (SSL) technology . Where we have given you (or where you have chosen) a password that enables you to access certain parts of our App or Services, you are responsible for keeping this password confidential. We ask you not to share a password with anyone.
                        </p>
                        <p className="mb-4">
                        Once we have received your information, we will use strict procedures and security features to protect your personal data from loss, unauthorised use or access.
                        </p>
                        <p className="mb-4">
                        Certain Services include social networking, chat room or forum features. Ensure when using these features that you do not submit any personal data that you do not want to be seen, collected or used by other users.
                        </p>
                        <p>
                        We have put in place procedures to detect and respond to personal data breaches and notify you and any applicable regulator when we are legally required to do so.
                        </p>
                    </section>

                    <section className="mb-6 text-black">
                        <h2 className="text-xl font-bold text-gold mb-4">Data retention</h2>
                        <p className="mb-4">
                        In some circumstances you can ask us to delete your data: see below for further information.
                        </p>
                        <p>
                        Once we no longer have a legal right to hold your personal data, we will delete or, in some circumstances, we will anonymise your personal data (so that it can no longer be associated with you) for research or statistical purposes, in which case we may use this information indefinitely without further notice to you.
                        </p>
                    </section>

                    <section className="mb-6 text-black">
                        <h2 className="text-xl font-bold text-gold mb-4">Your legal rights</h2>
                        <p className="mb-4">
                        You have the following rights under data protection laws in relation to your personal data.
                        </p>
                        <ul className="list-disc pl-6 mb-4">
                        <li>
                            <strong>Access.</strong> Request access to and/or a copy of the personal data we process about you (commonly known as a data subject access request). This enables you to check that we are lawfully processing it.
                        </li>
                        <li>
                            <strong>Correction.</strong> Request correction of any incomplete or inaccurate data we hold about you. (We may need to verify the accuracy of the new data you provide to us.)
                        </li>
                        <li>
                            <strong>Deletion.</strong> Request us to delete or remove personal data where there is no good reason for us continuing to process it. You also can ask us to delete or remove your personal data where you have successfully exercised your right to object to processing (see below), where we have processed your information unlawfully or where we need to erase your personal data to comply with law. (In some cases, we may need to continue to retain some of your personal data where required by law. If these apply, we will notify you at the time of our response.)
                        </li>
                        <li>
                            <strong>Objection.</strong> Object to us processing your personal data where (a) we are relying on legitimate interests as the lawful basis and you feel the processing impacts on your fundamental rights and freedoms, or (b) the processing is for direct marketing purposes. In some cases, we may refuse your objection if we can demonstrate that we have compelling legitimate grounds to continue processing your information which override your rights and freedoms.
                        </li>
                        <li>
                            <strong>Restriction.</strong> Request that we restrict or suspend our processing of your personal data:
                            <ul className="list-disc pl-6 mt-2">
                            <li>if you want us to establish the data's accuracy;</li>
                            <li>where our use of the data is unlawful, but you do not want us to erase it;</li>
                            <li>where we no longer require it, but you need us to hold onto it to establish, exercise or defend legal claims; or</li>
                            <li>you have objected to our use of your data, but we need to verify whether we have overriding legitimate grounds to use it.</li>
                            </ul>
                        </li>
                        <li>
                            <strong>Data portability.</strong> Request we transfer certain of your personal data to you or your chosen third party in a structured, commonly used, machine-readable format. This right only applies to information processed by automated means that we process on the lawful bases of consent or performance of a contract.
                        </li>
                        <li>
                            <strong>Withdraw consent.</strong> Withdraw your consent at any time where we are relying on consent to process your personal data. Please know that this does not affect the lawfulness of any processing carried out before you withdraw your consent, and after withdrawal, we may not be able to provide certain products or services to you. We will advise you if this is the case at the time you withdraw your consent.
                        </li>
                        <li>
                            <strong>Complain to the relevant data protection regulator.</strong> If you are unhappy with how we process your personal data, we ask that you contact us first using the details below so that we have the chance to put it right. However, you also have the right to make a complaint to the ICO or applicable data protection register at any time.
                        </li>
                        </ul>
                        <p>
                        You can exercise any of these rights at any time by contacting us.
                        </p>
                    </section>

                    <section className="mb-6 text-black">
                        <h2 className="text-xl font-bold text-gold mb-4">Description of categories of personal data</h2>
                        <ul className="list-disc pl-6 mb-4">
                        <li>
                            <strong>Identity Data: </strong> first name, last name, title, date of birth and Profile Data.
                        </li>
                        <li>
                            <strong>Contact Data: </strong> first name, last name, contact address, email address and telephone numbers, your communication preferences and copies of the communications between you and us.
                        </li>
                        <li>
                            <strong>Profile Data: </strong> your email address, username and password.
                        </li>
                        <li>
                            <strong>Transaction Data: </strong> billing and delivery addresses, payment card details, history of your payments, purchases, deliveries, returns and refunds and the applicable terms and conditions of your purchases. 
                        </li>
                        <li>
                            <strong>Device Data: </strong> the type of device you use, your unique device identifier, mobile network information, your mobile operating system, the type of mobile browser you use, IP address, time zone setting.
                        </li>
                        <li>
                            <strong> Content Data:</strong> information that you store or generate in the App, being [photos, videos and associated metadata, check-ins, posts and messages].
                        </li>
                        <li>
                            <strong> Usage Data: </strong> logs and detail of your use of our Apps and Services, being the dates and times on which you download, access and update the App and our Services, any error or debugging information, and the resources that you access and the actions we and you take in relation to them and Cookies Data.
                        </li>
                        <li>
                            <strong> Security Data:</strong> information we collect about your use of the App, our Services and our Sites in order to ensure your and our other users' safety and security, being Usage Data, the Cookies Data and the information provided to us by our payment processing provider.
                        </li>
                        <li>
                            <strong>Cookies Data: </strong>  the information collected through the cookies and similar technologies listed in our Cookies Notice.
                        </li>
                        <li>
                            <strong> Direct Marketing Data:</strong> your direct marketing preferences, consents for receiving direct marketing from us and/or our third parties and the history of the direct marketing communications we have sent to you.
                        </li>
                        <li>
                            <strong> Location Data:</strong> your current location as disclosed by GPS technology WiFi connections, your IP address for the time period where you have permitted us to collect it. 
                        </li>
                        <li>
                            <strong>Connected Data: </strong> information stored on your Device that you permit the App to connect to, being Contacts lists, login information, and camera data.
                        </li>
                        <li>
                            <strong> Social Media Data:</strong> your social media account information.
                        </li>
                        <li>
                            <strong> Feedback Data:</strong> your feedback and survey responses.
                        </li>
                        <li>
                            <strong> Personalisation Data:</strong> Cookies Data, Device Data, Content Data, Transaction Data, Connected Data, Social Media Data, Usage Data, Location Data, and the preferences we have inferred you have and use to personalise the App and Services, being the preferences noted in your account.
                        </li>
                        <li>
                            <strong> Competition Data:</strong> information about the competitions you enter with us, being your competition history, the applicable terms and conditions, associated third parties and any additional privacy notices.
                        </li>
                        </ul>
                    </section>
                </section>

                <section className="mb-6 sm:mb-8 text-black">
                    <h2 className="text-xl sm:text-2xl font-bold text-gold mb-2 sm:mb-4">
                        Updated Mobile application Terms of use - Social Gems 5.3.24
                    </h2>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gold mb-6">Terms of Use</h1>
                    <section className="mb-6">
                        <h2 className="text-xl font-bold text-gold mb-4">PLEASE READ THESE TERMS CAREFULLY</h2>
                        <p className="mb-4">
                            BY CLICKING ON THE "ACCEPT" BUTTON BELOW YOU AGREE TO THESE TERMS WHICH WILL BIND YOU.
                        </p>
                        <p className="mb-4">
                            IF YOU DO NOT AGREE TO THESE TERMS, CLICK ON THE "REJECT" BUTTON BELOW.
                        </p>
                    </section>

                    <section className="mb-6">
                        <h2 className="text-xl font-bold text-gold mb-4">Who we are and what this agreement does</h2>
                        <p className="mb-4">
                            We TEK JUICE LIMITED, a Company registered in England and Wales with Company Number 14997926, whose registered address is 19 The Office Village, North Road, Loughborough, Leicestershire, England, LE11 1QJ ("trading as Social Gems") license you to use:
                        </p>
                        <ul className="list-disc pl-6 mb-4">
                            <li>Social Gems mobile application software (App) and any updates or supplements to it.</li>
                            <li>The service you connect to via the App and the content we provide to you through it (Service).</li>
                        </ul>
                        <p>as permitted in these terms.</p>
                    </section>

                    <section className="mb-6">
                        <h2 className="text-xl font-bold text-gold mb-4">Your privacy</h2>
                        <p>
                            Under data protection legislation, we are required to provide you with certain information including who we are, how we process your personal data and for what purposes and your rights in relation to your personal data and how to exercise them. This information is provided in our Privacy Notice and it is important that you read that information.
                        </p>
                    </section>

                    <section className="mb-6">
                        <h2 className="text-xl font-bold text-gold mb-4">Other terms that may apply to you</h2>
                        <p className="mb-4">The following documents also form part of these terms:</p>
                        <ul className="list-disc pl-6 mb-4">
                            <li>Our Cookie Policy, which sets out information about the cookies used by the App.</li>
                            <li>Our Influencer or Business Agreements relating to applicable services provided through the App.</li>
                        </ul>
                    </section>

                    <section className="mb-6">
                        <h2 className="text-xl font-bold text-gold mb-4">Google Play and the APP Store's terms also apply</h2>
                        <p>
                            The ways in which you can use the App and Documentation may also be controlled by Google Pay or The App stores' rules and policies and those policies will apply instead of these terms where there are differences between the two.
                        </p>
                    </section>

                    <section className="mb-6">
                        <h2 className="text-xl font-bold text-gold mb-4">Operating system requirements</h2>
                        <p>
                            This App requires a [TYPE OF MOBILE PHONE OR HANDHELD DEVICE] device with a minimum of [AMOUNT OF MEMORY] of memory and the [TYPE OF OPERATING SYSTEM] operating system [VERSION OF OPERATING SYSTEM]. [INSERT OTHER REQUIREMENTS].
                        </p>
                    </section>

                    <section className="mb-6">
                        <h2 className="text-xl font-bold text-gold mb-4">Support for the App and how to tell us about problems</h2>
                        <h3 className="font-bold mb-2">Support.</h3>
                        <p className="mb-4">
                            If you want to learn more about the App or the Service or have any problems using them please take a look at our support resources.
                        </p>
                        <h3 className="font-bold mb-2">Contacting us (including with complaints).</h3>
                        <p className="mb-4">
                            If you think the App or the Services are faulty or misdescribed or wish to contact us for any other reason please email our customer service team at <a href="mailto:wensi@tekjuice.co.uk" className="text-gold">wensi@tekjuice.co.uk</a>.
                        </p>
                        <h3 className="font-bold mb-2">How we will communicate with you.</h3>
                        <p>
                            If we have to contact you we will do so by email, by SMS using the contact details you have provided to us.
                        </p>
                    </section>

                    <section className="mb-6">
                        <h2 className="text-xl font-bold text-gold mb-4">How you may use the App, including how many devices you may use it on</h2>
                        <p className="mb-4">
                            In return for your agreeing to comply with these terms you may:
                        </p>
                        <ul className="list-disc pl-6 mb-4">
                            <li>download or stream a copy of the App and view, use and display the App and the Service on such devices for your personal purposes only.</li>
                            <li>use any Documentation to support your permitted use of the App and the Service.</li>
                            <li>receive and use any free supplementary software code or update of the App incorporating "patches" and corrections of errors as we may provide to you.</li>
                        </ul>
                    </section>

                    <section className="mb-6">
                        <h2 className="text-xl font-bold text-gold mb-4">You must be 18 or have parental or guardian consent to accept these terms and buy the App</h2>
                        <p>
                            You must be 18 or over or have parental or guardian consent to accept these terms and utilise the App.
                        </p>
                    </section>

                    <section className="mb-6">
                        <h2 className="text-xl font-bold text-gold mb-4">You may not transfer the App to someone else</h2>
                        <p className="mb-4">
                            We are giving you personally the right to use the App and the Service as set out above, you may not otherwise transfer the App or the Service to someone else, whether for money, for anything else or for free. If you sell any device on which the App is installed, you must remove the App from it.
                        </p>
                    </section>

                    <section className="mb-6">
                        <h2 className="text-xl font-bold text-gold mb-4">Changes to these terms</h2>
                        <p className="mb-4">
                            We may need to change these terms to reflect changes in law or best practice or to deal with additional features which we introduce.
                        </p>
                        <p className="mb-4">
                            We will give you at least 30 days' notice of any change by sending you an SMS with details of the change or notifying you of a change when you next start the App.
                        </p>
                        <p>
                            If you do not accept the notified changes you will not be permitted to continue to use the App and the Service.
                        </p>
                    </section>

                    <section className="mb-6">
                        <h2 className="text-xl font-bold text-gold mb-4">Update to the App and changes to the Service</h2>
                        <p className="mb-4">
                            From time to time we may automatically update the App and change the Service to improve performance, enhance functionality, reflect changes to the operating system or address security issues. Alternatively we may ask you to update the App for these reasons.
                        </p>
                        <p className="mb-4">
                            If you choose not to install such updates or if you opt out of automatic updates you may not be able to continue using the App and the Services.
                        </p>
                        <p>
                            The App will always match the description of it provided to you when you bought it.
                        </p>
                    </section>

                    <section className="mb-6">
                        <h2 className="text-xl font-bold text-gold mb-4">If someone else owns the phone or device you are using</h2>
                        <p>
                            If you download or stream the App onto any phone or other device not owned by you, you must have the owner's permission to do so. You will be responsible for complying with these terms, whether or not you own the phone or other device.
                        </p>
                    </section>

                    <section className="mb-6">
                        <h2 className="text-xl font-bold text-gold mb-4">We are not responsible for other websites you link to</h2>
                        <p className="mb-4">
                            The App or any Service may contain links to other independent websites which are not provided by us. Such independent sites are not under our control, and we are not responsible for and have not checked and approved their content or their privacy policies (if any).
                        </p>
                        <p>
                            You will need to make your own independent judgement about whether to use any such independent sites, including whether to buy any products or services offered by them.
                        </p>
                    </section>

                    <section className="mb-6">
                        <h2 className="text-xl font-bold text-gold mb-4">Licence restrictions</h2>
                        <p className="mb-4">
                            You agree that you will:
                        </p>
                        <ul className="list-disc pl-6 mb-4">
                            <li>not rent, lease, sub-license, loan, provide, or otherwise make available, the App or the Services in any form, in whole or in part to any person without prior written consent from us;</li>
                            <li>not copy the App, Documentation or Services, except as part of the normal use of the App or where it is necessary for the purpose of back-up or operational security;</li>
                            <li>not translate, merge, adapt, vary, alter or modify, the whole or any part of the App, Documentation or Services nor permit the App or the Services or any part of them to be combined with, or become incorporated in, any other programs, except as necessary to use the App and the Services on devices as permitted in these terms;</li>
                            <li>
                            not disassemble, de-compile, reverse engineer or create derivative works based on the whole or any part of the App or the Services nor attempt to do any such things, except to the extent that (by virtue of sections 50B and 296A of the Copyright, Designs and Patents Act 1988) such actions cannot be prohibited because they are necessary to decompile the App to obtain the information necessary to create an independent program that can be operated with the App or with another program (Permitted Objective), and provided that the information obtained by you during such activities:
                            <ul className="list-disc pl-6 mt-2">
                                <li>is not disclosed or communicated without the Licensor's prior written consent to any third party to whom it is not necessary to disclose or communicate it in order to achieve the Permitted Objective; and</li>
                                <li>is not used to create any software that is substantially similar in its expression to the App;</li>
                                <li>is kept secure; and</li>
                                <li>is used only for the Permitted Objective;</li>
                            </ul>
                            </li>
                            <li>comply with all applicable technology control or export laws and regulations that apply to the technology used or supported by the App or any Service.</li>
                        </ul>
                    </section>

                    <section className="mb-6">
                        <h2 className="text-xl font-bold text-gold mb-4">Acceptable use restrictions</h2>
                        <p className="mb-4">
                            You must:
                        </p>
                        <ul className="list-disc pl-6 mb-4">
                            <li>not use the App or any Service in any unlawful manner, for any unlawful purpose, or in any manner inconsistent with these terms, or act fraudulently or maliciously, for example, by hacking into or inserting malicious code, such as viruses, or harmful data, into the App, any Service or any operating system;</li>
                            <li>not infringe our intellectual property rights or those of any third party in relation to your use of the App or any Service, including by the submission of any material] (to the extent that such use is not licensed by these terms);</li>
                            <li>not transmit any material that is defamatory, offensive or otherwise objectionable in relation to your use of the App or any Service;</li>
                            <li>not use the App or any Service in a way that could damage, disable, overburden, impair or compromise our systems or security or interfere with other users; and</li>
                            <li>not collect or harvest any information or data from any Service or our systems or attempt to decipher any transmissions to or from the servers running any Service.</li>
                        </ul>
                    </section>

                    <section className="mb-6">
                        <h2 className="text-xl font-bold text-gold mb-4">Intellectual property rights</h2>
                        <p>
                            All intellectual property rights in the App, the Documentation and the Services throughout the world belong to us [(or our licensors)] and the rights in the App and the Services are licensed (not sold) to you. You have no intellectual property rights in, or to, the App, the Documentation or the Services other than the right to use them in accordance with these terms.
                        </p>
                    </section>

                    <section className="mb-6">
                        <h2 className="text-xl font-bold text-gold mb-4">Our responsibility for loss or damage suffered by you</h2>
                        <p className="mb-4">
                            <strong>We are not responsible to you for non- foreseeable loss and damage caused by us.</strong> Loss or damage is foreseeable if either it is obvious that it will happen or if, at the time you accepted these terms, both we and you knew it was likely to happen.
                        </p>
                        <p className="mb-4">
                            <strong>We do not exclude or limit in any way our liability to you where it would be unlawful to do so.</strong> This includes liability for death or personal injury caused by our negligence or the negligence of our employees, agents or subcontractors or for fraud or fraudulent misrepresentation.
                        </p>
                        <p className="mb-4">
                            <strong>When we are liable for damage to your property.</strong> We will not be liable for damage that you could have avoided by following our advice to apply an update offered to you free of charge or for damage that was caused by you failing to correctly follow installation instructions or to have in place the minimum system requirements advised by us.
                        </p>
                        <p className="mb-4">
                            <strong>We are not liable for business losses.</strong> If you use the App for any commercial, business or resale purpose we will have no liability to you for any loss of profit, loss of business, business interruption, or loss of business opportunity.
                        </p>
                        <p className="mb-4">
                            <strong>Limitations to the App and the Services.</strong> The App and the Services are provided for general information and entertainment purposes only. They do not offer advice on which you should rely. You must obtain professional or specialist advice before taking, or refraining from, any action on the basis of information obtained from the App or the Service. Although we make reasonable efforts to update the information provided by the App and the Service, we make no representations, warranties or guarantees, whether express or implied, that such information is accurate, complete or up to date.
                        </p>
                        <p className="mb-4">
                            <strong>Please back-up content and data used with the App.</strong> We recommend that you back up any content and data used in connection with the App, to protect yourself in case of problems with the App or the Service.
                        </p>
                        <p className="mb-4">
                            <strong>Check that the App and the Services are suitable for you.</strong> The App and the Services have not been developed to meet your individual requirements. Please check that the facilities and functions of the App and the Services (as described on the appstore site and in the Documentation) meet your requirements.
                        </p>
                        <p>
                            <strong>We are not responsible for events outside our control.</strong> If our provision of the Services or support for the App or the Services is delayed by an event outside our control then we will contact you as soon as possible to let you know and we will take steps to minimise the effect of the delay. Provided we do this we will not be liable for delays caused by the event but if there is a risk of substantial delay you may contact us to end your contract with us and receive a refund for any Services you have paid for but not received.
                        </p>
                    </section>

                    <section className="mb-6">
                        <h2 className="text-xl font-bold text-gold mb-4">We may end your rights to use the App and the Services if you break these terms</h2>
                        <p className="mb-4">
                            We may end your rights to use the App and Services at any time by contacting you if you have broken these terms in a serious way. If what you have done can be put right we will give you a reasonable opportunity to do so.
                        </p>
                        <p className="mb-4">
                            If we end your rights to use the App and Services:
                        </p>
                        <ul className="list-disc pl-6 mb-4">
                            <li>You must stop all activities authorised by these terms, including your use of the App and any Services.</li>
                            <li>You must delete or remove the App from all devices in your possession and immediately destroy all copies of the App which you have and confirm to us that you have done this.</li>
                            <li>We may remotely access your devices and remove the App from them and cease providing you with access to the Services.</li>
                        </ul>
                    </section>

                    <section className="mb-6">
                        <h2 className="text-xl font-bold text-gold mb-4">We may transfer this agreement to someone else</h2>
                        <p>
                            We may transfer our rights and obligations under these terms to another organisation. We will always tell you in writing if this happens and we will ensure that the transfer will not affect your rights under the contract.
                        </p>
                    </section>

                    <section className="mb-6">
                        <h2 className="text-xl font-bold text-gold mb-4">You need our consent to transfer your rights to someone else</h2>
                        <p>
                            You may only transfer your rights or your obligations under these terms to another person if we agree in writing.
                        </p>
                    </section>

                    <section className="mb-6">
                        <h2 className="text-xl font-bold text-gold mb-4">No rights for third parties</h2>
                        <p>
                            This agreement does not give rise to any rights under the Contracts (Rights of Third Parties) Act 1999 to enforce any term of this agreement.
                        </p>
                    </section>

                    <section className="mb-6">
                        <h2 className="text-xl font-bold text-gold mb-4">If a court finds part of this contract illegal, the rest will continue in force</h2>
                        <p className="mb-4">
                            Each of the paragraphs of these terms operates separately. If any court or relevant authority decides that any of them are unlawful, the remaining paragraphs will remain in full force and effect.
                        </p>
                    </section>

                    <section className="mb-6">
                        <h2 className="text-xl font-bold text-gold mb-4">Even if we delay in enforcing this contract, we can still enforce it later</h2>
                        <p className="mb-4">
                            Even if we delay in enforcing this agreement, we can still enforce it later. If we do not insist immediately that you do anything you are required to do under these terms, or if we delay in taking steps against you in respect of your breaking this agreement, that will not mean that you do not have to do those things and it will not prevent us taking steps against you at a later date.
                        </p>
                    </section>

                    <section className="mb-6">
                        <h2 className="text-xl font-bold text-gold mb-4">Which laws apply to this agreement and where you may bring legal proceedings</h2>
                        <p>
                            These terms are governed by English law and the courts of England and Wales and Uganda shall have non-exclusive jurisdiction to settle any dispute or claim (including non-contractual disputes or claims) arising out of or in connection with this agreement or its subject matter or formation.
                        </p>
                    </section>
                </section>

                </div>
            </div>
            <Footer />
        </div>
    );
}