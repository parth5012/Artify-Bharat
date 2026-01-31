import { useState,useEffect } from 'react'
import Link from 'next/link'
import { signup } from '@/utils/auth'
import { useRouter } from "next/router";

export default function Signup() {

  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const [userRole, setUserRole] = useState("artisan"); // 'artisan' or 'buyer'
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    craftSpecialty: "",
    experience: "",
    bio: "",
    interests: [],
  });
  useEffect(() => {
    setIsClient(true);
  }, []);

  
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  
  //   const handleSubmit = async (e) => {
    //     e.preventDefault();
    
//     try {
  //       // ✅ Send data to backend API
  //       const res = await fetch("http://localhost:5000/api/signup", {
    //         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
  //           ...formData,
  //           role: userRole,
  //         }),
  //       });
  
  //       const data = await res.json();
  
  //       if (res.ok) {
    //         alert("Account created successfully!");
    
    const handleSubmit = async (e) => { // 1. Added async here
    e.preventDefault();
    console.log('Form submitted:', { ...formData, role: userRole });

    try {
      // 2. Await the async signup function directly (Removed useEffect)
      await signup(formData, userRole); 

      // 3. Redirect based on the role
      if (userRole === "artisan") {
        router.push("/artisan/onboard");
      } else {
        router.push("/buyer/marketplace");
      }
    } catch (error) {
      console.error("Signup Error:", error);
      // This is where your 'Axios Network Error' will be caught if the backend is down
      alert("Registration failed. Please check if the server is online.");
    }
  };
  
  //as backend is not ready a temporary handleSubmit function
  

  const craftOptions = [
    "Pottery & Ceramics",
    "Textile & Weaving",
    "Wood Carving",
    "Metal Craft",
    "Jewelry Making",
    "Painting & Art",
    "Leather Craft",
    "Stone Carving",
    "Bamboo Craft",
    "Other",
  ];
  
  const interestOptions = [
    "Home Decor",
    "Fashion & Accessories",
    "Jewelry",
    "Art & Paintings",
    "Traditional Crafts",
    "Gifts & Occasions",
    "Furniture",
    "Textiles",
  ];
  
  const handleInterestToggle = (interest) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
      ? prev.interests.filter((i) => i !== interest)
      : [...prev.interests, interest],
    }));
  };
  
  if (!isClient) {
    return null; // Prevents the mismatch by not rendering until client-side
  }

  return (
    <>
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#8b6f47] via-[#c2794d] to-[#8b6f47] z-50"></div>

      <header className="fixed top-1 left-0 right-0 z-50 bg-[#f8f6f3]/98 backdrop-blur-md border-b-2 border-[#c2794d]/20">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-11 h-11 bg-gradient-to-br from-[#c2794d] to-[#8b6f47] rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                <span className="text-white font-bold text-xl">अ</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-[#3d3021]">
                  Artify Bharat
                </h1>
                <p className="text-xs text-[#8b6f47] hidden sm:block">
                  कारीगरों का बाज़ार
                </p>
              </div>
            </Link>

            <Link
              href="/"
              className="text-sm text-[#6d5a3d] hover:text-[#c2794d] transition-colors flex items-center space-x-2"
            >
              <span>←</span>
              <span>Back to Home</span>
            </Link>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <div className="min-h-screen bg-gradient-to-br from-[#f8f6f3] via-[#faf8f5] to-[#f5f0e8] pt-24 pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Left Side - Decorative */}
            <div className="hidden lg:block sticky top-28">
              <div className="relative">
                {/* Decorative Elements */}
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#c2794d]/10 rounded-full blur-2xl"></div>
                <div className="absolute bottom-12 right-8 w-32 h-32 bg-[#8b6f47]/10 rounded-full blur-3xl"></div>

                <div className="relative bg-gradient-to-br from-[#c2794d] to-[#8b6f47] rounded-3xl p-12 shadow-2xl">
                  <div className="space-y-6 text-white">
                    <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm">
                      ✨ AI-Powered Platform
                    </div>

                    {userRole === "artisan" ? (
                      <>
                        <h2 className="text-4xl font-bold leading-tight">
                          Join the Future of
                          <br />
                          Handmade
                        </h2>

                        <p className="text-white/90 text-lg leading-relaxed">
                          Connect with customers worldwide, powered by AI that
                          understands your craft and amplifies your artisan
                          story.
                        </p>

                        <div className="space-y-4 pt-4">
                          <div className="flex items-start space-x-3">
                            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                              <span>🎯</span>
                            </div>
                            <div>
                              <h3 className="font-semibold mb-1">
                                Verified Artisan Badge
                              </h3>
                              <p className="text-white/80 text-sm">
                                Get recognized with our authenticity
                                certification
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start space-x-3">
                            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                              <span>🌍</span>
                            </div>
                            <div>
                              <h3 className="font-semibold mb-1">
                                Global Marketplace
                              </h3>
                              <p className="text-white/80 text-sm">
                                Reach 10M+ customers across India and beyond
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start space-x-3">
                            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                              <span>🤖</span>
                            </div>
                            <div>
                              <h3 className="font-semibold mb-1">
                                AI Story Generation
                              </h3>
                              <p className="text-white/80 text-sm">
                                Let AI help tell your craft's unique story
                              </p>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <h2 className="text-4xl font-bold leading-tight">
                          Discover Authentic
                          <br />
                          Handmade Treasures
                        </h2>

                        <p className="text-white/90 text-lg leading-relaxed">
                          Shop directly from verified Indian artisans. Every
                          purchase preserves tradition and supports livelihoods.
                        </p>

                        <div className="space-y-4 pt-4">
                          <div className="flex items-start space-x-3">
                            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                              <span>✅</span>
                            </div>
                            <div>
                              <h3 className="font-semibold mb-1">
                                100% Authentic Products
                              </h3>
                              <p className="text-white/80 text-sm">
                                Every item verified by AI and human experts
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start space-x-3">
                            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                              <span>📜</span>
                            </div>
                            <div>
                              <h3 className="font-semibold mb-1">
                                Digital Passport
                              </h3>
                              <p className="text-white/80 text-sm">
                                Know the story behind every handmade piece
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start space-x-3">
                            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                              <span>💝</span>
                            </div>
                            <div>
                              <h3 className="font-semibold mb-1">
                                Support Artisans
                              </h3>
                              <p className="text-white/80 text-sm">
                                Your purchase directly impacts artisan families
                              </p>
                            </div>
                          </div>
                        </div>
                      </>
                    )}

                    {/* Decorative Pattern */}
                    <div className="pt-8 flex space-x-2 opacity-30">
                      {[...Array(8)].map((_, i) => (
                        <div
                          key={i}
                          className="w-2 h-2 bg-white rounded-full"
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Signup Form */}
            <div className="w-full">
              <div className="bg-white rounded-3xl shadow-xl border-2 border-[#c2794d]/10 overflow-hidden">
                {/* Form Header */}
                <div className="p-8 lg:p-10 border-b-2 border-[#f5f0e8]">
                  <div className="text-center">
                    <div className="inline-block p-3 bg-gradient-to-br from-[#c2794d]/10 to-[#8b6f47]/5 rounded-2xl mb-4">
                      <span className="text-4xl">✨</span>
                    </div>
                    <h2 className="text-3xl font-bold text-[#3d3021] mb-2">
                      Create Your Account
                    </h2>
                    <p className="text-[#6d5a3d]/70">
                      Start your journey with Artify Bharat
                    </p>
                  </div>
                </div>

                {/* Form Content */}
                <div className="p-8 lg:p-10">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Role Selection */}
                    <div>
                      <label className="block text-sm font-medium text-[#3d3021] mb-3">
                        I want to join as *
                      </label>
                      <div className="grid grid-cols-2 gap-4">
                        <button
                          type="button"
                          onClick={() => setUserRole("artisan")}
                          className={`p-4 rounded-xl border-2 transition-all ${
                            userRole === "artisan"
                              ? "border-[#c2794d] bg-gradient-to-br from-[#c2794d]/10 to-[#8b6f47]/5"
                              : "border-[#e8dcc8] hover:border-[#c2794d]/50"
                          }`}
                        >
                          <div className="flex flex-col items-center space-y-2">
                            <span className="text-3xl">🎨</span>
                            <span
                              className={`font-semibold ${userRole === "artisan" ? "text-[#c2794d]" : "text-[#6d5a3d]"}`}
                            >
                              Artisan
                            </span>
                            <span className="text-xs text-[#6d5a3d]/70">
                              Sell your creations
                            </span>
                          </div>
                        </button>

                        <button
                          type="button"
                          onClick={() => setUserRole("buyer")}
                          className={`p-4 rounded-xl border-2 transition-all ${
                            userRole === "buyer"
                              ? "border-[#c2794d] bg-gradient-to-br from-[#c2794d]/10 to-[#8b6f47]/5"
                              : "border-[#e8dcc8] hover:border-[#c2794d]/50"
                          }`}
                        >
                          <div className="flex flex-col items-center space-y-2">
                            <span className="text-3xl">🛍️</span>
                            <span
                              className={`font-semibold ${userRole === "buyer" ? "text-[#c2794d]" : "text-[#6d5a3d]"}`}
                            >
                              Buyer
                            </span>
                            <span className="text-xs text-[#6d5a3d]/70">
                              Discover unique items
                            </span>
                          </div>
                        </button>
                      </div>
                    </div>

                    {/* Personal Information */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-[#3d3021] mb-2">
                          First Name *
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          placeholder="Rajesh"
                          className="w-full px-4 py-3 rounded-xl border-2 border-[#e8dcc8] focus:border-[#c2794d] focus:outline-none transition-colors bg-[#faf8f5]"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-[#3d3021] mb-2">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          placeholder="Kumar"
                          className="w-full px-4 py-3 rounded-xl border-2 border-[#e8dcc8] focus:border-[#c2794d] focus:outline-none transition-colors bg-[#faf8f5]"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#3d3021] mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your@example.com"
                        className="w-full px-4 py-3 rounded-xl border-2 border-[#e8dcc8] focus:border-[#c2794d] focus:outline-none transition-colors bg-[#faf8f5]"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#3d3021] mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-3 rounded-xl border-2 border-[#e8dcc8] focus:border-[#c2794d] focus:outline-none transition-colors bg-[#faf8f5]"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#3d3021] mb-2">
                        Password *
                      </label>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Create a strong password"
                        className="w-full px-4 py-3 rounded-xl border-2 border-[#e8dcc8] focus:border-[#c2794d] focus:outline-none transition-colors bg-[#faf8f5]"
                        required
                      />
                      <p className="mt-1 text-xs text-[#6d5a3d]/70">
                        Minimum 8 characters with letters and numbers
                      </p>
                    </div>

                    {/* Conditional Fields Based on Role */}
                    {userRole === "artisan" ? (
                      <>
                        {/* Location Details for Artisan */}
                        <div className="pt-4 border-t-2 border-[#f5f0e8]">
                          <h3 className="text-lg font-semibold text-[#3d3021] mb-4">
                            Location Details
                          </h3>

                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-[#3d3021] mb-2">
                                Address *
                              </label>
                              <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                placeholder="Street address, village name"
                                className="w-full px-4 py-3 rounded-xl border-2 border-[#e8dcc8] focus:border-[#c2794d] focus:outline-none transition-colors bg-[#faf8f5]"
                                required
                              />
                            </div>

                            <div className="grid sm:grid-cols-3 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-[#3d3021] mb-2">
                                  City *
                                </label>
                                <input
                                  type="text"
                                  name="city"
                                  value={formData.city}
                                  onChange={handleInputChange}
                                  placeholder="Jaipur"
                                  className="w-full px-4 py-3 rounded-xl border-2 border-[#e8dcc8] focus:border-[#c2794d] focus:outline-none transition-colors bg-[#faf8f5]"
                                  required
                                />
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-[#3d3021] mb-2">
                                  State *
                                </label>
                                <input
                                  type="text"
                                  name="state"
                                  value={formData.state}
                                  onChange={handleInputChange}
                                  placeholder="Rajasthan"
                                  className="w-full px-4 py-3 rounded-xl border-2 border-[#e8dcc8] focus:border-[#c2794d] focus:outline-none transition-colors bg-[#faf8f5]"
                                  required
                                />
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-[#3d3021] mb-2">
                                  Pincode *
                                </label>
                                <input
                                  type="text"
                                  name="pincode"
                                  value={formData.pincode}
                                  onChange={handleInputChange}
                                  placeholder="302001"
                                  className="w-full px-4 py-3 rounded-xl border-2 border-[#e8dcc8] focus:border-[#c2794d] focus:outline-none transition-colors bg-[#faf8f5]"
                                  required
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Craft Details for Artisan */}
                        <div className="pt-4 border-t-2 border-[#f5f0e8]">
                          <h3 className="text-lg font-semibold text-[#3d3021] mb-4">
                            Your Craft
                          </h3>

                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-[#3d3021] mb-2">
                                Craft Specialty *
                              </label>
                              <select
                                name="craftSpecialty"
                                value={formData.craftSpecialty}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 rounded-xl border-2 border-[#e8dcc8] focus:border-[#c2794d] focus:outline-none transition-colors bg-[#faf8f5]"
                                required
                              >
                                <option value="">Select your main craft</option>
                                {craftOptions.map((craft) => (
                                  <option key={craft} value={craft}>
                                    {craft}
                                  </option>
                                ))}
                              </select>
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-[#3d3021] mb-2">
                                Years of Experience *
                              </label>
                              <input
                                type="number"
                                name="experience"
                                value={formData.experience}
                                onChange={handleInputChange}
                                placeholder="10"
                                min="0"
                                className="w-full px-4 py-3 rounded-xl border-2 border-[#e8dcc8] focus:border-[#c2794d] focus:outline-none transition-colors bg-[#faf8f5]"
                                required
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-[#3d3021] mb-2">
                                Brief Bio
                              </label>
                              <textarea
                                name="bio"
                                value={formData.bio}
                                onChange={handleInputChange}
                                placeholder="Tell us about your craft journey, techniques you specialize in, and what makes your work unique..."
                                rows="4"
                                className="w-full px-4 py-3 rounded-xl border-2 border-[#e8dcc8] focus:border-[#c2794d] focus:outline-none transition-colors bg-[#faf8f5] resize-none"
                              ></textarea>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        {/* Buyer Specific Fields */}
                        <div className="pt-4 border-t-2 border-[#f5f0e8]">
                          <h3 className="text-lg font-semibold text-[#3d3021] mb-4">
                            Delivery Information
                          </h3>

                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-[#3d3021] mb-2">
                                Delivery Address
                              </label>
                              <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                placeholder="House/Flat No, Street, Locality"
                                className="w-full px-4 py-3 rounded-xl border-2 border-[#e8dcc8] focus:border-[#c2794d] focus:outline-none transition-colors bg-[#faf8f5]"
                              />
                            </div>

                            <div className="grid sm:grid-cols-3 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-[#3d3021] mb-2">
                                  City
                                </label>
                                <input
                                  type="text"
                                  name="city"
                                  value={formData.city}
                                  onChange={handleInputChange}
                                  placeholder="Mumbai"
                                  className="w-full px-4 py-3 rounded-xl border-2 border-[#e8dcc8] focus:border-[#c2794d] focus:outline-none transition-colors bg-[#faf8f5]"
                                />
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-[#3d3021] mb-2">
                                  State
                                </label>
                                <input
                                  type="text"
                                  name="state"
                                  value={formData.state}
                                  onChange={handleInputChange}
                                  placeholder="Maharashtra"
                                  className="w-full px-4 py-3 rounded-xl border-2 border-[#e8dcc8] focus:border-[#c2794d] focus:outline-none transition-colors bg-[#faf8f5]"
                                />
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-[#3d3021] mb-2">
                                  Pincode
                                </label>
                                <input
                                  type="text"
                                  name="pincode"
                                  value={formData.pincode}
                                  onChange={handleInputChange}
                                  placeholder="400001"
                                  className="w-full px-4 py-3 rounded-xl border-2 border-[#e8dcc8] focus:border-[#c2794d] focus:outline-none transition-colors bg-[#faf8f5]"
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Shopping Interests for Buyer */}
                        <div className="pt-4 border-t-2 border-[#f5f0e8]">
                          <h3 className="text-lg font-semibold text-[#3d3021] mb-2">
                            What interests you?
                          </h3>
                          <p className="text-sm text-[#6d5a3d]/70 mb-4">
                            Select categories you'd like to explore (optional)
                          </p>

                          <div className="grid grid-cols-2 gap-3">
                            {interestOptions.map((interest) => (
                              <button
                                key={interest}
                                type="button"
                                onClick={() => handleInterestToggle(interest)}
                                className={`px-4 py-3 rounded-xl border-2 transition-all text-sm font-medium ${
                                  formData.interests.includes(interest)
                                    ? "border-[#c2794d] bg-gradient-to-br from-[#c2794d]/10 to-[#8b6f47]/5 text-[#c2794d]"
                                    : "border-[#e8dcc8] hover:border-[#c2794d]/50 text-[#6d5a3d]"
                                }`}
                              >
                                {interest}
                              </button>
                            ))}
                          </div>
                        </div>
                      </>
                    )}

                    {/* Terms */}
                    <div className="flex items-start space-x-3 pt-4">
                      <input
                        type="checkbox"
                        id="terms"
                        className="w-5 h-5 rounded border-[#c2794d] text-[#c2794d] focus:ring-[#c2794d] mt-0.5"
                        required
                      />
                      <label htmlFor="terms" className="text-sm text-[#6d5a3d]">
                        I agree to the{" "}
                        <a
                          href="#"
                          className="text-[#c2794d] hover:text-[#8b6f47] font-medium"
                        >
                          Terms of Service
                        </a>{" "}
                        and{" "}
                        <a
                          href="#"
                          className="text-[#c2794d] hover:text-[#8b6f47] font-medium"
                        >
                          Privacy Policy
                        </a>
                      </label>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 bg-gradient-to-r from-[#c2794d] to-[#8b6f47] text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
                    >
                      {userRole === "artisan"
                        ? "Create Artisan Account"
                        : "Create Buyer Account"}
                    </button>
                  </form>
                </div>

                {/* Footer */}
                <div className="px-8 lg:px-10 pb-8">
                  <div className="text-center text-sm">
                    <p className="text-[#6d5a3d]">
                      Already have an account?{" "}
                      <Link
                        href="/login/login"
                        className="text-[#c2794d] hover:text-[#8b6f47] font-semibold"
                      >
                        Login here
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Decoration */}
      <div className="h-2 bg-gradient-to-r from-[#8b6f47] via-[#c2794d] to-[#8b6f47]"></div>
    </>
  );
}
