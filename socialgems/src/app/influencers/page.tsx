//page that collects influencers sign up information from the page

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
        email: string;
        contact: string;
        social_media: string[]; // Ensure it's recognized as a string array
        influence: string;
        message: string;
    }
    
    const [formData, setFormData] = useState<formData>({
        first_name: "",
        last_name: "",
        email: "",
        contact: "",
        social_media: [],
        influence: "",
        message: "",
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    //validate names
    const validateName = (name: string): boolean => {
        const regex = /^[A-Za-z\s]+$/; //allows letters and spaces
        return regex.test(name);
    };

    //validate email
    const validateEmail = (email: string): boolean => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email format validation
        return regex.test(email);
    }
    //validate country dial codes
    const countryDialCodes = [
        {code: "+1", name:"USA"},
        {code: "+44", name:"UK"},
        {code: "+256", name: "Uganda"},
        {code: "+254", name: "Kenya"},
        {code: "+97", name: "UAE"},
        {code: "+234", name: "Nigeria"},
        {code: "+27", name: "South Africa"},
        {code: "+143", name: "Senegal"},
        {code: "+233", name: "Ghana"},
    ];
    //add state for selected dial code
    const [dialCode, setDialCode] = useState("+256");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value } = e.target;
        //update name validation
        if(name === "first_name" || name ==="lats_name") {
            if(!validateName(value)) {
                setError("Names should only contain letters and spaces.");
                return;
            }
        }
        //update email
        if (name === "email") {
            if(!validateEmail(value)) {
                setError("Please enter a vlaid email address.")
                return;
            }
        }
        //validate contact
        if (name === "contact") {
            if (value.startsWith("0")) {
                setError("Contact number should not start with a zero");
                return;
            }
        }
        setFormData({ ...formData, [name]: value });
        setError("");//clear any previous errors.
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            social_media: checked
                ? [...prevState.social_media, value] //add the platform to the array.
                : prevState.social_media.filter((platform) => platform !== value), //remove the platform from the array
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        //validate social media selection
        if(formData.social_media.length === 0) {
            setError("Please select at least one social media platform")
            return;
        }
        //validate message
        if (!formData.message.trim()) {
            setError("Message cannot be left blank.");
            return;
        }
        //validate field of influence
        if (!formData.influence.trim()) {
            setError("Field of influence cannot be left blank.");
            return;
        }
        setLoading(true);
        setError("");

        //convert social_media array to object for submission
        const socialMediaObject = formData.social_media.reduce((acc, platform) => {
            acc[platform.toLowerCase()] = platform; //covert to object{"facebook":"Facebook", etc}
            return acc;
        }, {} as { [key: string]: string });

        try {
            const res = await fetch("/api/influencers", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...formData,
                    contact: `${dialCode}${formData.contact}`, //combines dial code and contact
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
        <div className="min-h-screen flex flex-col bg-gradient-to-r from-gold to-brown">
            <Navbar />
            <div className="flex flex-grow p-6 items-center justify-center">
                <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-2xl">
                    {/* New Text Section */}
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-[#1A1A1A] mb-4">
                            Join our influencer community
                        </h1>
                        <p className="text-[#4A5568] text-lg">
                            Social Gems is all about fueling creativity
                            in an industry that never stops evolving. 
                            From beauty, sports, gaming, or food, 
                            our African network of creators is breaking 
                            boundaries; and we want you in.
                            Want exclusive opportunities with top businesses?
                            We've got you covered. At Social Gems, finding campaigns, 
                            creating amazing content, and getting paid should be the easy part. 
                            We help you land more deals, grow your audience, 
                            and take your creative journey to the next level.
                        </p>
                    </div>

                    {/* Form Section */}
                    <h1 className="text-2xl font-bold mb-4 text-[#1A1A1A]">Are you an Influencer?</h1>
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
                                <select 
                                    value={dialCode} 
                                    onChange={(e) => setDialCode(e.target.value)}
                                    className="p-3 border border-[#E2E8F0] rounded-lg text-[#1A1A1A] focus:ring-2 focus:ring-[#3182CE] focus:border-transparent"
                                    >
                                    {countryDialCodes.map((country) => (
                                        <option key={country.code} value={country.code}>
                                            {country.name} ({country.code})
                                        </option>
                                    ))}
                                    </select>
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
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {[
                                        { name: "Facebook", image: "/Facebook.webp" },
                                        { name: "Instagram", image: "/Instagram.webp" },
                                        { name: "X (Twitter)", image: "/x.webp" },
                                        { name: "TikTok", image: "/Tiktok.webp" },
                                        { name: "LinkedIn", image: "/LinkedIn.webp" },
                                        { name: "YouTube", image: "/YouTube.webp" }
                                    ].map((platform) => (
                                        <label key={platform.name} className="flex items-center space-x-3 p-3 border border-[#E2E8F0] rounded-lg hover:bg-[#F7FAFC]">
                                            <input 
                                                type="checkbox" 
                                                value={platform.name} 
                                                onChange={handleCheckboxChange} 
                                                checked={formData.social_media.includes(platform.name)} 
                                                className="form-checkbox h-5 w-5 text-[#3182CE] rounded focus:ring-[#3182CE]"
                                            />
                                            <Image src={platform.image} alt={platform.name} width={24} height={24} />
                                            <span className="text-[#4A5568]">{platform.name}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[#4A5568]">Field of Influence</label>
                                <input 
                                    name="influence" 
                                    type="text" 
                                    placeholder="Field of Influence (Music, Travel...)" 
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
