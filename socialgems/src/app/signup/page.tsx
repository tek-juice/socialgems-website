"use client";

import { useState } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Image from "next/image";

export default function SignUpPage() {
    
    //this interface defines the types of the data being submitted.
    interface formData {
        first_name: string;
        last_name: string;
        company_name: string;
        email: string;
        contact: string;
        social_media: string[]; // Ensure it's recognized as a string array
        expertise: string;
        message: string;
    }
    
    const [formData, setFormData] = useState<formData>({
        first_name: "",
        last_name: "",
        company_name: "",
        email: "",
        contact: "",
        social_media: [],
        expertise: "",
        message: "",
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            social_media: checked
                ? [...prevState.social_media, value] //add the platform to the array.
                : prevState.social_media.filter((platform) => platform !== value), //remoe the platform from the array
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        //convert social_media array to object for submission
        const socialMediaObject = formData.social_media.reduce((acc, platform) => {
            acc[platform.toLowerCase()] = platform; //covert to object{"facebook":"Facebook", etc}
            return acc;
        }, {} as { [key: string]: string });

        try {
            const res = await fetch("/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...formData,
                    social_media: socialMediaObject, //send the object instead of an array.
                    expertise: formData.expertise, //send expertise as plain string
                }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Something went wrong");

            setSuccess(true);
        } catch (err) {
            if (err instanceof Error) {//set instance of error
                setError(err.message);
            } else {
                setError("An unexpected error occured.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-r from-gold to-brown">
            <Navbar />
            <div className="flex flex-grow p-6 items-center justify-center">
                <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-2xl">
                    {/* New Text Section */}
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-[#1A1A1A] mb-4">
                            Find Niche Influencers Faster
                        </h1>
                        <p className="text-[#4A5568] text-lg">
                            Effortlessly discover niche creators who align with your business’s goals. No more guesswork; our smart tech pairs you with the right influencers, saving you time. We do the search for you so you can concentrate on perfecting your campaign.
                        </p>
                    </div>

                    {/* Form Section */}
                    <h1 className="text-2xl font-bold mb-4 text-[#1A1A1A]">Are you a Brand?</h1>
                    <h2 className="text-2xl font-bold mb-6 text-[#1A1A1A]">Sign Up with Social Gems</h2>

                    {success ? (
                        <p className="text-green-600 font-bold text-center">✅ Sign-up successful! We’ll contact you soon.</p>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-[#4A5568]">First Name</label>
                                    <input 
                                        name="first_name" 
                                        type="text" 
                                        placeholder="First Name" 
                                        required 
                                        className="w-full p-3 border border-[#E2E8F0] rounded-lg mt-1 placeholder-[#A0AEC0] text-[#1A1A1A] focus:ring-2 focus:ring-[#3182CE] focus:border-transparent"
                                        onChange={handleChange} 
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[#4A5568]">Last Name</label>
                                    <input 
                                        name="last_name" 
                                        type="text" 
                                        placeholder="Last Name" 
                                        required 
                                        className="w-full p-3 border border-[#E2E8F0] rounded-lg mt-1 placeholder-[#A0AEC0] text-[#1A1A1A] focus:ring-2 focus:ring-[#3182CE] focus:border-transparent"
                                        onChange={handleChange} 
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[#4A5568]">Company Name</label>
                                <input 
                                    name="company_name" 
                                    type="text" 
                                    placeholder="Company Name" 
                                    required 
                                    className="w-full p-3 border border-[#E2E8F0] rounded-lg mt-1 placeholder-[#A0AEC0] text-[#1A1A1A] focus:ring-2 focus:ring-[#3182CE] focus:border-transparent"
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[#4A5568]">Email</label>
                                <input 
                                    name="email" 
                                    type="email" 
                                    placeholder="Email" 
                                    required 
                                    className="w-full p-3 border border-[#E2E8F0] rounded-lg mt-1 placeholder-[#A0AEC0] text-[#1A1A1A] focus:ring-2 focus:ring-[#3182CE] focus:border-transparent"
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[#4A5568]">Contact</label>
                                <input 
                                    name="contact" 
                                    type="text" 
                                    placeholder="Contact" 
                                    required 
                                    className="w-full p-3 border border-[#E2E8F0] rounded-lg mt-1 placeholder-[#A0AEC0] text-[#1A1A1A] focus:ring-2 focus:ring-[#3182CE] focus:border-transparent"
                                    onChange={handleChange} 
                                />
                            </div>

                            {/* Social Media Checkboxes */}
                            <div>
                                <label className="block text-sm font-medium text-[#4A5568] mb-4">Preferred Social Media Platforms</label>
                                <div className="flex flex-wrap gap-4">
                                    {[
                                        { name: "Facebook", image: "/Facebook.webp" },
                                        { name: "Instagram", image: "/Instagram.webp" },
                                        { name: "X (Twitter)", image: "/x.webp" },
                                        { name: "TikTok", image: "/Tiktok.webp" },
                                        { name: "LinkedIn", image: "/LinkedIn.webp" },
                                        { name: "YouTube", image: "/YouTube.webp" }
                                    ].map((platform) => (
                                        <label key={platform.name} className="flex items-center space-x-3 p-3 border border-[#E2E8F0] rounded-lg hover:bg-[#F7FAFC] flex-1 min-w-[150px] max-w-[200px]">
                                            <input 
                                                type="checkbox" 
                                                value={platform.name} 
                                                onChange={handleCheckboxChange} 
                                                checked={formData.social_media.includes(platform.name)} 
                                                className="form-checkbox h-5 w-5 text-[#3182CE] rounded focus:ring-[#3182CE]"
                                            />
                                            <Image src={platform.image} alt={platform.name} width={24} height={24} className="w-6 h-6"/>
                                            <span className="text-[#4A5568] text-sm md:text-base">{platform.name}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[#4A5568]">Field of Expertise</label>
                                <input 
                                    name="expertise" 
                                    type="text" 
                                    placeholder="Expertise (Music, Travel...)" 
                                    required 
                                    className="w-full p-3 border border-[#E2E8F0] rounded-lg mt-1 placeholder-[#A0AEC0] text-[#1A1A1A] focus:ring-2 focus:ring-[#3182CE] focus:border-transparent"
                                    onChange={handleChange} 
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[#4A5568]">Message</label>
                                <textarea 
                                    name="message" 
                                    placeholder="Enter your message here" 
                                    required 
                                    className="w-full p-3 border border-[#E2E8F0] rounded-lg mt-1 placeholder-[#A0AEC0] text-[#1A1A1A] focus:ring-2 focus:ring-[#3182CE] focus:border-transparent"
                                    onChange={handleChange} 
                                />
                                {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
                            </div>

                            <button 
                                type="submit" 
                                disabled={loading} 
                                className="w-full bg-[#3182CE] text-white py-3 rounded-lg hover:bg-[#2C5282] transition duration-300"
                            >
                                {loading ? "Submitting..." : "Sign Up"}
                            </button>
                        </form>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}
