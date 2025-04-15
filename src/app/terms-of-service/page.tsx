'use client'
import { useState } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function TermsofService() {

    return(
        <div className="min-h-screen flex flex-col bg-gray-100">
            <Navbar />
            <div className="flex-grow p-4 sm:p-6">
                <div className="max-w-4xl mx-auto bg-white p-4 sm:p-8 rounded-lg shadow-lg">
                    <section className="mb-6 sm:mb-8 text-black">
                    {/* <h2 className="text-xl sm:text-2xl font-bold text-gold mb-2 sm:mb-4">
                            Updated Mobile application Terms of use - Social Gems 5.3.24
                        </h2> */}
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