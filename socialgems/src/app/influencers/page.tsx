//page that collects influencers sign up information from the page

"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Image from "next/image";

const BackgroundImageSwitcher = () => {
    const [currentImage, setCurrentImage] = useState(0);
    const images = [ "/background2.webp"]; // Add your image paths
  
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentImage((prev) => (prev + 1) % images.length);
      }, 5000); // Switch every 3 seconds
  
      return () => clearInterval(interval); // Cleanup interval on unmount
    }, [images.length]);
  
    return (
      <div className="relative h-[850px] w-full rounded-md overflow-hidden">
        {/* Background Images */}
        {images.map((src, index) => (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImage ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={src}
              alt={`Background ${index + 1}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
  
        {/* Text Overlay */}
        <div className="absolute inset-0 flex flex-col justify-center p-8 bg-black/10 text-gold">
          <h1 className="text-4xl font-bold mb-4">
            Join our influencer community
          </h1>
          <p className="text-lg font-bold">
            Social Gems is all about fueling creativity in an industry that never
            stops evolving. From beauty, sports, gaming, or food, our African
            network of creators is breaking boundaries; and we want you in. Want
            exclusive opportunities with top businesses? We've got you covered. At
            Social Gems, finding campaigns, creating amazing content, and getting
            paid should be the easy part. We help you land more deals, grow your
            audience, and take your creative journey to the next level.
          </p>
        </div>
      </div>
    );
  };
  
  const EmailBanner = () => {
    return (
      <div className="bg-white p-6 text-center text-white rounded-md mt-4">

        <a
          href="/contact"
          className="bg-gold text-black px-6 py-2 rounded-lg hover:text-black hover:bg-white hover:border-2 hover:border-[#FFD700] hover:bg-opacity-90 transition duration-300"
        >
          Have a question? Send us an email.
        </a>
      </div>
    );
  };
  

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
        {code: "+1", name:"USA", flag: "🇺🇸" },
        { code: "+44", name: "UK", flag: "🇬🇧" },
        { code: "+256", name: "Uganda", flag: "🇺🇬" },
        { code: "+254", name: "Kenya", flag: "🇰🇪" },
        { code: "+971", name: "UAE", flag: "🇦🇪" },
        { code: "+234", name: "Nigeria", flag: "🇳🇬" },
        { code: "+27", name: "South Africa", flag: "🇿🇦" },
        { code: "+221", name: "Senegal", flag: "🇸🇳" },
        { code: "+233", name: "Ghana", flag: "🇬🇭" },
    ];
    //add state for selected dial code
    const [dialCode, setDialCode] = useState("+256");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value } = e.target;
        //update name validation
        if(name === "first_name" || name ==="last_name") {
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
        <div className="min-h-screen flex flex-col bg-white">
          <Navbar />
          <div className="flex-grow p-6">
            <div className="container mx-auto">
              <div className="flex flex-col lg:flex-row gap-8 items-stretch">
                {/* Form Section (Left) */}
                <div className="bg-white shadow-[0_0_20px_rgba(0,0,0,0.3)] p-8 rounded-xl w-full lg:w-1/2">
                  <h1 className="text-2xl font-bold mb-4 text-[#CC9813]">Are you an Influencer?</h1>
                  <h2 className="text-2xl font-bold mb-6 text-[#CC9813]">Sign Up with Social Gems</h2>
      
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
                        <div className="flex gap-2">
                            {/* Dial Code Dropdown with Flag */}
                            <div className="flex items-center border border-[#E2E8F0] rounded-lg focus:ring-2 focus:ring-[#3182CE] focus:border-transparent">
                            <select
                                value={dialCode}
                                onChange={(e) => setDialCode(e.target.value)}
                                className="p-3 text-[#1A1A1A] bg-transparent outline-none"
                            >
                                {countryDialCodes.map((country) => (
                                <option key={country.code} value={country.code}>
                                    {country.flag} {country.code} {country.name}
                                </option>
                                ))}
                            </select>
                            </div>

                            {/* Contact Input */}
                            <input
                            name="contact"
                            type="text"
                            placeholder="757xxxxxx"
                            required
                            className="flex-1 p-3 border border-[#E2E8F0] rounded-lg placeholder-[#A0AEC0] text-[#1A1A1A] focus:ring-2 focus:ring-[#3182CE] focus:border-transparent"
                            onChange={handleChange}
                            />
                        </div>
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
                              <Image src={platform.image} alt={platform.name} width={24} height={24} className="w-6 h-6" />
                              <span className="text-[#4A5568] text-sm md:text-base">{platform.name}</span>
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
                        className="w-full bg-gold text-black px-6 py-2 rounded-lg hover:text-black hover:bg-white hover:border-2 hover:border-[#FFD700] hover:bg-opacity-90 transition duration-300"
                      >
                        {loading ? "Submitting..." : "Register"}
                      </button>
                    </form>
                  )}
                </div>
                  
                  {/*Text and Images section (Right) */}
                <div className="w-full lg:w-1/2 flex flex-col rounded-md shadow-[0_0_20px_rgba(0,0,0,0.3)]">
                  <BackgroundImageSwitcher />

                   {/*contact banner section */}
                   <EmailBanner />
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
    );
}
