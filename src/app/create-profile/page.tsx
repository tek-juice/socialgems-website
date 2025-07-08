//this is page where user creates a profile.
'use client';
 //add all importations
import { useState, useEffect } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { useRouter } from 'next/navigation';
import { FaUser, FaEye, FaEyeSlash } from 'react-icons/fa';
import PhoneInput, { Value } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
 
 interface ProfileForm {
    fname: string;
    lname: string;
    email: string;
    phone: string;
    password: string;
    repeat_password: string;
    image: File | null;
    role: 'brand' | 'influencer' | '';
}

export default function CreateProfilePage() {
    const [ showPassword, setShowPassword] = useState(false);
    const [ showRepeatPassword, setShowRepeatPassword] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    const [repeatPasswordError, setRepeatPasswordError] = useState('');
    const [fnameError, setFnameError] = useState('');
    const [lnameError, setLnameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [formData, setFormData] = useState<ProfileForm>({
        fname: '',
        lname: '',
        email: '',
        phone: '',
        password: '',
        repeat_password: '',
        image: null,
        role: '',
    });
    const [ imageError, setImageError ] = useState('');
    const [ error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [messageType, setMessageType] = useState<'success' | 'error' | null>(null);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [imageSizeWarning, setImageSizeWarning] = useState('');
    const router = useRouter();

    const validatePassword = (password: string) => {
        const length = password.length >= 8;
        const uppercase = /[A-Z]/.test(password);
        const lowercase = /[a-z]/.test(password);
        const number = /[0-9]/.test(password);
        const special = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        return length && uppercase && lowercase && number && special;
    };

    const validateImageSize = (file: File) => { 
        const maxSize = 420 * 1024; // 420KB in bytes
        if (file.size > maxSize) {
            return `Image size (${(file.size / 1024).toFixed(1)}KB) exceeds the maximum allowed size of 420KB. Please choose a smaller image.`;
        }
        return '';
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            const file = files && files[0];
            if (file) {
                const sizeError = validateImageSize(file);
                if (sizeError) {
                    setImageSizeWarning(sizeError);
                    setFormData({ ...formData, image: null });
                    // Clear the file input
                    e.target.value = '';
                } else {
                    setImageSizeWarning('');
                    setFormData({ ...formData, image: file });
                }
            } else {
                setFormData({ ...formData, image: null });
                setImageSizeWarning('');
            }
        } else {
            setFormData({ ...formData, [name]: value });
            if (name === 'fname') {
                if (value.length < 4) {
                    setFnameError('First name must be at least 4 characters long.');
                } else {
                    setFnameError('');
                }
            }
            if (name === 'lname') {
                if (value.length < 4) {
                    setLnameError('Last name must be at least 4 characters long.');
                } else {
                    setLnameError('');
                }
            }
            if (name === 'email') {
                if (!value.includes('@')) {
                    setEmailError('Email must include @ character.');
                } else {
                    setEmailError('');
                }
            }
            if (name === 'password') {
                if (!validatePassword(value)) {
                    setPasswordError('Password must be at least 8 characters, include an uppercase letter, a lowercase letter, a number, and a special character.');
                } else {
                    setPasswordError('');
                }
                if (formData.repeat_password && value !== formData.repeat_password) {
                    setRepeatPasswordError('Passwords do not match');
                } else {
                    setRepeatPasswordError('');
                }
            }
            if (name === 'repeat_password') {
                if (formData.password && value !== formData.password) {
                    setRepeatPasswordError('Passwords do not match');
                } else {
                    setRepeatPasswordError('');
                }
            }
            if (name === 'image') {
                if (!value) {
                    setImageError('Provide a professional profile picture')
                }
            }
        }
    };
    const handlePhoneChange = (value: Value) => {
        setFormData({ ...formData, phone: value || '' });
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Final validation before submit
        let valid = true;
        if (formData.fname.length < 4) {
            setFnameError('First name must be at least 4 characters long.');
            valid = false;
        }
        if (formData.lname.length < 4) {
            setLnameError('Last name must be at least 4 characters long.');
            valid = false;
        }
        if (!formData.email.includes('@')) {
            setEmailError('Email must include @ character.');
            valid = false;
        }
        if (!validatePassword(formData.password)) {
            setPasswordError('Password must be at least 8 characters, include an uppercase letter, a lowercase letter, a number, and a special character.');
            valid = false;
        }
        if (formData.password !== formData.repeat_password) {
            setRepeatPasswordError('Passwords do not match');
            valid = false;
        }
        if (!formData.image) {
            setImageError('Please provide a profile picture');
            valid = false;
        }
        if (imageSizeWarning) {
            valid = false;
        }
        if (!valid) return;
        // Add profile creation logic here
        const form = new FormData();
        form.append('fname', formData.fname);
        form.append('lname', formData.lname);
        form.append('email', formData.email);
        form.append('phone', formData.phone);
        form.append('password', formData.password);
        form.append('role', formData.role);
        if (formData.image) {
            form.append('image', formData.image);
        }

        try {
            setIsLoading(true);
            const response = await fetch('/api/create-profile', {
                method: 'POST',
                body: form,
            });
            if (response.ok) {
                setSuccess('Profile created successfully');
            } else {
                const errorData = await response.json();
                setError(errorData.error || 'Failed to create profile');
            }
        } catch (error) {
            console.error('Error creating profile:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        let timeout: NodeJS.Timeout;
        if (success) {
            setShowSuccessModal(true);
            timeout = setTimeout(() => setShowSuccessModal(false), 120000); // 2 minutes
        } else if (error) {
            setShowMessage(true);
            setMessageType('error');
            timeout = setTimeout(() => setShowMessage(false), 4000);
        }
        return () => clearTimeout(timeout);
    }, [success, error]);

    useEffect(() => {
        if (!showMessage) {
            setTimeout(() => {
                setSuccess('');
                setError('');
                setMessageType(null);
            }, 500);
        }
    }, [showMessage]);

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />
            <div className="flex-1 flex items-center justify-center pt-28 pb-8">
                <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                    <h2 className="text-2xl text-black font-bold text-center mb-6">Create Profile</h2>
                    {showMessage && (
                        <p
                            className={`text-center mb-4 transition-opacity duration-500 ${messageType === 'success' ? 'text-green-500' : 'text-red-500'} ${showMessage ? 'opacity-100' : 'opacity-0'}`}
                        >
                            {messageType === 'success' ? success : error}
                        </p>
                    )}
                    
                    {/* Success Modal */}
                    {showSuccessModal && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                            <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 text-center">
                                <div className="mb-6">
                                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-bold text-green-600 mb-2">Profile Created Successfully!</h3>
                                    <p className="text-gray-600 mb-6">Thank you for creating your profile. You can now sign in to access your account.</p>
                                </div>
                                <div className="space-y-3">
                                    <a
                                        href="/sign-in"
                                        className="block w-full bg-brown text-white py-3 px-6 rounded-lg font-medium hover:bg-brown/90 transition-colors"
                                    >
                                        Sign In Now
                                    </a>
                                    <button
                                        onClick={() => setShowSuccessModal(false)}
                                        className="block w-full bg-gray-200 text-gray-700 py-2 px-6 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-black mb-1">Register as</label>
                            <div className="flex gap-6">
                                <label className="flex items-center text-black">
                                    <input
                                        type="radio"
                                        name="role"
                                        value="brand"
                                        checked={formData.role === 'brand'}
                                        onChange={handleChange}
                                        required
                                        className="mr-2 accent-gold"
                                    />
                                    Brand
                                </label>
                                <label className="flex items-center text-black">
                                    <input
                                        type="radio"
                                        name="role"
                                        value="influencer"
                                        checked={formData.role === 'influencer'}
                                        onChange={handleChange}
                                        required
                                        className="mr-2 accent-gold"
                                    />
                                    Influencer
                                </label>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="fname" className="block text-sm font-medium text-black">First Name</label>
                            <input
                                type="text"
                                id="fname"
                                name="fname"
                                value={formData.fname}
                                onChange={handleChange}
                                className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gold text-black"
                                placeholder="Enter your first name"
                                required
                            />
                            {fnameError && <p className="text-red-600 text-xs mt-1">{fnameError}</p>}
                        </div>
                        <div>
                            <label htmlFor="lname" className="block text-sm font-medium text-black">Last Name</label>
                            <input
                                type="text"
                                id="lname"
                                name="lname"
                                value={formData.lname}
                                onChange={handleChange}
                                className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gold text-black"
                                placeholder="Enter your last name"
                                required
                            />
                            {lnameError && <p className="text-red-600 text-xs mt-1">{lnameError}</p>}
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-black">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gold text-black"
                                placeholder="Enter your email"
                                required
                            />
                            {emailError && <p className="text-red-600 text-xs mt-1">{emailError}</p>}
                        </div>
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-black">Phone</label>
                            {/* Contact Input */}
                          <PhoneInput
                            international
                            defaultCountry="UG"
                            value={formData.phone}
                            onChange={handlePhoneChange}
                            placeholder="Enter Phone Number"
                            className="flex-1 block p-3 border border-[#E2E8F0] rounded-lg placeholder-[#A0AEC0] text-black focus:ring-2 focus:ring-[#3182CE] focus:border-transparent"
                            style={{
                                '--PhoneInputCountryFlag-height': '1em', // Adjust flag height
                                '--PhoneInputCountryFlag-width': '1.5em', // Adjust flag width
                                '--PhoneInputCountrySelectArrow-color': '#3182CE', // Customize dropdown arrow color
                            }}
                            required
                          />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-black">Password</label>
                            <div className="relative mt-1">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full pl-3 pr-10 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gold text-black"
                                    placeholder="Enter your password"
                                    required
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gold focus:outline-none"
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    tabIndex={-1}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                            {passwordError && <p className="text-red-600 text-xs mt-1">{passwordError}</p>}
                        </div>
                        <div>
                            <label htmlFor="repeat_password" className="block text-sm font-medium text-black">Repeat Password</label>
                            <div className="relative mt-1">
                                <input
                                    type={showRepeatPassword ? 'text' : 'password'}
                                    id="repeat_password"
                                    name="repeat_password"
                                    value={formData.repeat_password}
                                    onChange={handleChange}
                                    className="w-full pl-3 pr-10 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gold text-black"
                                    placeholder="Repeat your password"
                                    required
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gold focus:outline-none"
                                    onClick={() => setShowRepeatPassword((prev) => !prev)}
                                    tabIndex={-1}
                                >
                                    {showRepeatPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                            {repeatPasswordError && <p className="text-red-600 text-xs mt-1">{repeatPasswordError}</p>}
                        </div>
                        <div>
                            <label htmlFor="image" className="block text-sm font-medium text-black">Profile Picture</label>
                            <div className="mt-1">
                                <input
                                    type="file"
                                    id="image"
                                    name="image"
                                    accept="image/*"
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gold text-black"
                                    required
                                />
                                <p className="text-xs text-gray-500 mt-1">Maximum file size: 420KB</p>
                            </div>
                            {imageSizeWarning && <p className="text-orange-600 text-xs mt-1">{imageSizeWarning}</p>}
                            {imageError && <p className="text-red-600 text-xs mt-1">{imageError}</p>}
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-gold text-brown font-bold py-2 px-4 rounded-lg hover:bg-yellow-300 transition-colors"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Creating Profile...' : 'Create Profile'}
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
}