import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import AppLayout from '@/components/AppLayout'

export default function BuyerProfile() {
    const router = useRouter()
    const { welcome } = router.query
    const [isEditing, setIsEditing] = useState(false)
    const [showWelcome, setShowWelcome] = useState(false)
    const [profile, setProfile] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        profileImage: null,
        address: {
            street: '',
            city: '',
            state: '',
            pincode: '',
            landmark: ''
        }
    })

    useEffect(() => {
        loadProfile()
        // Check if coming from signup
        if (welcome === 'true') {
            setIsEditing(true)
            setShowWelcome(true)
            // Remove query param from URL
            setTimeout(() => {
                router.replace('/buyer/profile', undefined, { shallow: true })
            }, 100)
        }
    }, [welcome])

    const loadProfile = async () => {
        // Load from localStorage first
        const savedProfile = localStorage.getItem('buyer_profile')

        if (savedProfile) {
            setProfile(JSON.parse(savedProfile))
        } else {
            // Fallback to basic user data
            const userData = {
                firstName: localStorage.getItem('user_first_name') || '',
                lastName: localStorage.getItem('user_last_name') || '',
                email: localStorage.getItem('user_email') || '',
                phone: '',
                profileImage: null,
                address: {
                    street: '',
                    city: '',
                    state: '',
                    pincode: '',
                    landmark: ''
                }
            }
            setProfile(userData)
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        if (name.startsWith('address.')) {
            const addressField = name.split('.')[1]
            setProfile({
                ...profile,
                address: { ...profile.address, [addressField]: value }
            })
        } else {
            setProfile({ ...profile, [name]: value })
        }
    }

    const handleImageUpload = (e) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setProfile({ ...profile, profileImage: reader.result })
            }
            reader.readAsDataURL(file)
        }
    }

    const handleSave = async () => {
        // TODO: Save to API
        console.log('Saving profile:', profile)

        // Save to localStorage for now (replace with API call later)
        localStorage.setItem('buyer_profile', JSON.stringify(profile))

        setIsEditing(false)
        setShowWelcome(false)
        alert('Profile updated successfully!')
    }

    const isProfileComplete = () => {
        return (
            profile.firstName &&
            profile.lastName &&
            profile.phone &&
            profile.address.street &&
            profile.address.city &&
            profile.address.state &&
            profile.address.pincode
        )
    }

    const handleLogout = () => {
        localStorage.clear()
        router.push('/login/login')
    }

    return (
        <AppLayout currentPage="profile">
            <div className="min-h-screen p-4 md:p-8 bg-gradient-to-br from-[#f8f6f3] to-[#faf8f5]">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        {showWelcome && (
                            <div className="mb-6 p-6 bg-gradient-to-r from-[#c2794d]/10 to-[#8b6f47]/10 border-2 border-[#c2794d]/30 rounded-xl">
                                <h2 className="text-xl font-bold text-[#3d3021] mb-2">🎉 Welcome to Artify Bharat!</h2>
                                <p className="text-[#6d5a3d] mb-4">Complete your profile to get personalized recommendations and faster checkout.</p>
                                {isProfileComplete() && (
                                    <button
                                        onClick={() => router.push('/buyer/marketplace')}
                                        className="px-6 py-3 bg-gradient-to-r from-[#c2794d] to-[#8b6f47] text-white font-semibold rounded-lg hover:shadow-lg transition-all flex items-center space-x-2"
                                    >
                                        <span>🛍️</span>
                                        <span>Browse Products</span>
                                    </button>
                                )}
                                {!isProfileComplete() && (
                                    <p className="text-sm text-[#6d5a3d] italic">
                                        ℹ️ Please fill all required fields to start browsing
                                    </p>
                                )}
                            </div>
                        )}
                        <h1 className="text-3xl font-bold text-[#3d3021] mb-2">My Profile</h1>
                        <p className="text-[#6d5a3d]">Manage your account and delivery preferences</p>
                    </div>

                    {/* Profile Card */}
                    <div className="bg-white rounded-2xl border-2 border-[#d4c5b0]/50 shadow-lg overflow-hidden">
                        {/* Cover Section */}
                        <div className="h-32 bg-gradient-to-r from-[#c2794d] to-[#8b6f47]"></div>

                        {/* Profile Info */}
                        <div className="px-8 pb-8">
                            {/* Profile Picture */}
                            <div className="flex flex-col md:flex-row md:items-end md:justify-between -mt-16 mb-6">
                                <div className="relative">
                                    <div className="w-32 h-32 rounded-full border-4 border-white bg-[#f8f6f3] overflow-hidden shadow-lg">
                                        {profile.profileImage ? (
                                            <img src={profile.profileImage} alt="Profile" className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-5xl text-[#6d5a3d]">
                                                👤
                                            </div>
                                        )}
                                    </div>
                                    {isEditing && (
                                        <label className="absolute bottom-0 right-0 w-10 h-10 bg-[#c2794d] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#8b6f47] transition-colors shadow-lg">
                                            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                                            <span className="text-white text-xl">📷</span>
                                        </label>
                                    )}
                                </div>

                                {/* Action Buttons */}
                                <div className="flex space-x-3 mt-4 md:mt-0">
                                    {isEditing ? (
                                        <>
                                            <button
                                                onClick={handleSave}
                                                className="px-6 py-2 bg-gradient-to-r from-[#c2794d] to-[#8b6f47] text-white font-semibold rounded-lg hover:shadow-lg transition-all"
                                            >
                                                Save Changes
                                            </button>
                                            <button
                                                onClick={() => setIsEditing(false)}
                                                className="px-6 py-2 bg-white border-2 border-[#d4c5b0]/50 text-[#3d3021] font-semibold rounded-lg hover:bg-[#f8f6f3] transition-all"
                                            >
                                                Cancel
                                            </button>
                                        </>
                                    ) : (
                                        <button
                                            onClick={() => setIsEditing(true)}
                                            className="px-6 py-2 bg-gradient-to-r from-[#c2794d] to-[#8b6f47] text-white font-semibold rounded-lg hover:shadow-lg transition-all"
                                        >
                                            Edit Profile
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Personal Information */}
                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-xl font-bold text-[#3d3021] mb-4 flex items-center space-x-2">
                                        <span>👤</span>
                                        <span>Personal Information</span>
                                    </h2>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-[#3d3021] mb-2">First Name</label>
                                            <input
                                                type="text"
                                                name="firstName"
                                                value={profile.firstName}
                                                onChange={handleInputChange}
                                                disabled={!isEditing}
                                                className="w-full px-4 py-3 rounded-lg border-2 border-[#d4c5b0]/50 focus:border-[#c2794d] focus:outline-none transition-colors bg-[#faf8f5] disabled:bg-gray-100"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-[#3d3021] mb-2">Last Name</label>
                                            <input
                                                type="text"
                                                name="lastName"
                                                value={profile.lastName}
                                                onChange={handleInputChange}
                                                disabled={!isEditing}
                                                className="w-full px-4 py-3 rounded-lg border-2 border-[#d4c5b0]/50 focus:border-[#c2794d] focus:outline-none transition-colors bg-[#faf8f5] disabled:bg-gray-100"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-[#3d3021] mb-2">Email</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={profile.email}
                                                onChange={handleInputChange}
                                                disabled
                                                className="w-full px-4 py-3 rounded-lg border-2 border-[#d4c5b0]/50 bg-gray-100 text-[#6d5a3d]"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-[#3d3021] mb-2">Phone Number</label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={profile.phone}
                                                onChange={handleInputChange}
                                                disabled={!isEditing}
                                                placeholder="+91 XXXXX XXXXX"
                                                className="w-full px-4 py-3 rounded-lg border-2 border-[#d4c5b0]/50 focus:border-[#c2794d] focus:outline-none transition-colors bg-[#faf8f5] disabled:bg-gray-100"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Delivery Address */}
                                <div>
                                    <h2 className="text-xl font-bold text-[#3d3021] mb-4 flex items-center space-x-2">
                                        <span>📍</span>
                                        <span>Delivery Address</span>
                                    </h2>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-[#3d3021] mb-2">Street Address</label>
                                            <input
                                                type="text"
                                                name="address.street"
                                                value={profile.address.street}
                                                onChange={handleInputChange}
                                                disabled={!isEditing}
                                                placeholder="House no., Building name, Street"
                                                className="w-full px-4 py-3 rounded-lg border-2 border-[#d4c5b0]/50 focus:border-[#c2794d] focus:outline-none transition-colors bg-[#faf8f5] disabled:bg-gray-100"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-[#3d3021] mb-2">Landmark (Optional)</label>
                                            <input
                                                type="text"
                                                name="address.landmark"
                                                value={profile.address.landmark}
                                                onChange={handleInputChange}
                                                disabled={!isEditing}
                                                placeholder="Near..."
                                                className="w-full px-4 py-3 rounded-lg border-2 border-[#d4c5b0]/50 focus:border-[#c2794d] focus:outline-none transition-colors bg-[#faf8f5] disabled:bg-gray-100"
                                            />
                                        </div>
                                        <div className="grid md:grid-cols-3 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-[#3d3021] mb-2">City</label>
                                                <input
                                                    type="text"
                                                    name="address.city"
                                                    value={profile.address.city}
                                                    onChange={handleInputChange}
                                                    disabled={!isEditing}
                                                    className="w-full px-4 py-3 rounded-lg border-2 border-[#d4c5b0]/50 focus:border-[#c2794d] focus:outline-none transition-colors bg-[#faf8f5] disabled:bg-gray-100"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-[#3d3021] mb-2">State</label>
                                                <input
                                                    type="text"
                                                    name="address.state"
                                                    value={profile.address.state}
                                                    onChange={handleInputChange}
                                                    disabled={!isEditing}
                                                    className="w-full px-4 py-3 rounded-lg border-2 border-[#d4c5b0]/50 focus:border-[#c2794d] focus:outline-none transition-colors bg-[#faf8f5] disabled:bg-gray-100"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-[#3d3021] mb-2">Pincode</label>
                                                <input
                                                    type="text"
                                                    name="address.pincode"
                                                    value={profile.address.pincode}
                                                    onChange={handleInputChange}
                                                    disabled={!isEditing}
                                                    placeholder="000000"
                                                    className="w-full px-4 py-3 rounded-lg border-2 border-[#d4c5b0]/50 focus:border-[#c2794d] focus:outline-none transition-colors bg-[#faf8f5] disabled:bg-gray-100"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="pt-6 border-t-2 border-[#d4c5b0]/40">
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <button
                                            onClick={() => router.push('/buyer/marketplace')}
                                            className="flex-1 px-8 py-3 bg-gradient-to-r from-[#c2794d] to-[#8b6f47] text-white font-semibold rounded-lg hover:shadow-lg transition-all flex items-center justify-center space-x-2"
                                        >
                                            <span>🛍️</span>
                                            <span>Browse Products</span>
                                        </button>
                                        <button
                                            onClick={handleLogout}
                                            className="px-8 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-all flex items-center justify-center space-x-2"
                                        >
                                            <span>🚪</span>
                                            <span>Logout</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}
