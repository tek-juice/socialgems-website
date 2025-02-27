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
        <div className="min-h-screen flex flex-col bg-white">
            <Navbar />
            <div className="flex justify-center items-center flex-grow p-6">
                <div className="bg-white p-10 rounded shadow-md w-full max-w-lg bg-yellow-100">
                    <h1 className="text-2xl font-bold mb-4 text-gray-700">Are you a Brand?</h1>
                    <h2 className="text-2xl font-bold mb-3 text-gray-700">Sign Up with Social Gems</h2>

                    {success ? (
                        <p className="text-green-500 font-bold">✅ Sign-up successful! We’ll contact you soon.</p>
                    ) : (
                        <form onSubmit={handleSubmit} className="bg-white p-10 rounded shadow-md w-96">
                            <div className="mb-4">
                                <label className="block text-gray-700">First Name</label>
                                <input 
                                    name="first_name" 
                                    type="text" 
                                    placeholder="First Name" 
                                    required className="w-full p-2 border border-gray-300 rounded mt-1 placeholder-gray-400 text-black"
                                    onChange={handleChange} 
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Last Name</label>
                                    <input 
                                        name="last_name" 
                                        type="text" 
                                        placeholder="Last Name" 
                                        required 
                                        className="w-full p-2 border border-gray-300 rounded mt-1 placeholder-gray-400 text-black"
                                        onChange={handleChange} 
                                    />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Company Name</label>
                                    <input 
                                        name="company_name" 
                                        type="text" 
                                        placeholder="Company Name" 
                                        required 
                                        className="w-full p-2 border border-gray-300 rounded mt-1 placeholder-gray-400 text-black"
                                        onChange={handleChange}
                                    />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Email</label>
                                    <input 
                                        name="email" 
                                        type="email" 
                                        placeholder="Email" 
                                        required 
                                        className="w-full p-2 border border-gray-300 rounded mt-1 placeholder-gray-400 text-black"
                                        onChange={handleChange}
                                    />
                             </div>
                             <div className="mb-4">
                                <label className="block text-gray-700">Contact</label>
                                    <input 
                                        name="contact" 
                                        type="text" 
                                        placeholder="Contact" 
                                        required 
                                        className="w-full p-2 border border-gray-300 rounded mt-1 placeholder-gray-400 text-black"
                                        onChange={handleChange} 
                                    />
                            </div>

                            {/* Social Media Checkboxes */}
                            <div className="flex flex-col space-y-4">
                                <label className="block text-gray-700">Preferred Social Media Platforms</label>
                                <div className="social-media-options flex flex-wrap justify-between gap-4">
                                    {[
                                        { name: "Facebook", image: "/Facebook.webp" },
                                        { name: "Instagram", image: "/Instagram.webp" },
                                        { name: "X (Twitter)", image: "/x.webp" },
                                        { name: "TikTok", image: "/Tiktok.webp" },
                                        { name: "LinkedIn", image: "/LinkedIn.webp" },
                                        { name: "YouTube", image: "/YouTube.webp" }
                                    ].map((platform) => (
                                        <label key={platform.name} className="flex flex-col items-center text-gray-700">
                                            <input 
                                                type="checkbox" 
                                                value={platform.name} 
                                                onChange={handleCheckboxChange} 
                                                checked={formData.social_media.includes(platform.name)} 
                                            />
                                            <Image src={platform.image} alt={platform.name} width={48} height={48} />
                                            {platform.name}
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 mt-3">Field of Expertise</label>
                                    <input 
                                        name="expertise" 
                                        type="text" 
                                        placeholder="Expertise (Music, Travel...)" 
                                        required 
                                        className="w-full p-2 border border-gray-300 rounded mt-1 placeholder-gray-400 text-black"
                                        onChange={handleChange} 
                                    />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Message</label>

                                <textarea 
                                    name="message" 
                                    placeholder="Enter your message here" 
                                    required className="w-full p-10 border border-gray-300 rounded mt-1 placeholder-gray-400 text-black"
                                    onChange={handleChange} 
                                />
                                
                                {error && <p className="text-red-500">{error}</p>}
                            </div>
                            <button type="submit" disabled={loading} className="w-full bg-black text-white py-2 rounded hover:bg-gray-800">
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
