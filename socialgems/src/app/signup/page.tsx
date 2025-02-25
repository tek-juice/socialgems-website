'use client';

import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Image from "next/image";

export default function SignUpPage(){
    return(
        <div className="min-h-screen flex flex-col bg-white">
            <Navbar />
            <div className="flex justify-center items-center flex-grow p-6">
                <div className="bg-white p-10 rounded shadow-md w-full max-w-lg bg-yellow-100">
                    <h1 className="text-2xl font-bold mb-4 text-gray-700">Are you a Brand?</h1>
                    <h2 className="text-2xl font-bold mb-3 text-gray-700">Sign Up with Social Gems</h2>
                    <form className="bg-white p-10 rounded shadow-md w-96">
                        <div className="mb-4">
                            <label className="block text-gray-700">First Name</label>
                            <input
                                type="text"
                                className="w-full p-2 border border-gray-300 rounded mt-1"
                                placeholder="Enter your first name"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Last Name</label>
                            <input
                                type="text"
                                className="w-full p-2 border border-gray-300 rounded mt-1"
                                placeholder="Enter your last name"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Company Name</label>
                            <input
                                type="text"
                                className="w-full p-2 border border-gray-300 rounded mt-1"
                                placeholder="Enter your company name"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Email</label>
                            <input
                                type="email"
                                className="w-full p-2 border border-gray-300 rounded mt-1"
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Contact</label>
                            <input
                                type="text"
                                className="w-full p-2 border border-gray-300 rounded mt-1"
                                placeholder="+256 778 406 122"
                                required
                            />
                        </div>
                        <div className="flex flex-col space-y-4">
                            <label className="block text-gray-700">Preferred Social Media Platforms</label>
                            <div className="social-media-options flex flex-wrap justify-between gap-4">
                                {[
                                    { name: "Facebook", image: "/Facebook.webp" },
                                    { name: "Instagram", image: "/Instagram.webp" },
                                    { name: "X (Twitter)", image: "/x.webp" },
                                    { name: "TikTok", image: "/Tiktok.webp" },
                                    { name: "LinkedIn", image: "/LinkedIn.webp" },
                                    { name: "YouTube", image: "/Youtube.webp" }
                                ].map((platform) => (
                                    <label key={platform.name} className="flex flex-col items-center text-gray-700">
                                        <input className="mb-2" type="checkbox" name="social-media" value={platform.name} /> 
                                        <Image src={platform.image} alt={platform.name} width={48} height={48} />
                                        {platform.name}
                                    </label>
                                ))}
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mt-3">Field of Expertise</label>
                            <input
                                type="text"
                                className="w-full p-2 border border-gray-300 rounded mt-1"
                                placeholder="Music, Dance, Fashion, Travel etc.."
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Message</label>
                            <textarea
                                className="w-full p-10 border border-gray-300 rounded mt-1"
                                placeholder="Enter your message here"
                                required
                            />
                        </div>
                        <button
                        type="submit"
                        className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
                        >
                        Sign Up
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
}