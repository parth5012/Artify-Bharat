import { useState } from 'react'
import Link from 'next/link'

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  })

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Login submitted:', formData)
    // Add your authentication logic here
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
                <h1 className="text-2xl font-bold text-[#3d3021]">Artify Bharat</h1>
                <p className="text-xs text-[#8b6f47] hidden sm:block">कारीगरों का बाज़ार</p>
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
      <div className="min-h-screen bg-gradient-to-br from-[#f8f6f3] via-[#faf8f5] to-[#f5f0e8] pt-24 pb-12 px-4 flex items-center justify-center">
        <div className="max-w-6xl w-full">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            
            {/* Left Side - Decorative */}
            <div className="hidden lg:block">
              <div className="relative">
                {/* Decorative Elements */}
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#c2794d]/10 rounded-full blur-2xl"></div>
                <div className="absolute bottom-12 right-8 w-32 h-32 bg-[#8b6f47]/10 rounded-full blur-3xl"></div>
                
                <div className="relative bg-gradient-to-br from-[#c2794d] to-[#8b6f47] rounded-3xl p-12 shadow-2xl">
                  <div className="space-y-6 text-white">
                    <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm">
                      ✨ Welcome Back
                    </div>
                    
                    <h2 className="text-4xl font-bold leading-tight">
                      Continue Your<br />Creative Journey
                    </h2>
                    
                    <p className="text-white/90 text-lg leading-relaxed">
                      Access your dashboard, manage your products, and connect with customers who value authentic craftsmanship.
                    </p>
                    
                    <div className="space-y-4 pt-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                          <span>📊</span>
                        </div>
                        <div>
                          <h3 className="font-semibold mb-1">Track Your Sales</h3>
                          <p className="text-white/80 text-sm">Monitor orders and revenue in real-time</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                          <span>💬</span>
                        </div>
                        <div>
                          <h3 className="font-semibold mb-1">Customer Messages</h3>
                          <p className="text-white/80 text-sm">Respond to inquiries and build relationships</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                          <span>🎨</span>
                        </div>
                        <div>
                          <h3 className="font-semibold mb-1">Manage Products</h3>
                          <p className="text-white/80 text-sm">Add, edit, and showcase your creations</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Decorative Pattern */}
                    <div className="pt-8 flex space-x-2 opacity-30">
                      {[...Array(8)].map((_, i) => (
                        <div key={i} className="w-2 h-2 bg-white rounded-full"></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="w-full max-w-md mx-auto lg:mx-0">
              <div className="bg-white rounded-3xl shadow-xl border-2 border-[#c2794d]/10 overflow-hidden">
                
                {/* Form Header */}
                <div className="p-8 lg:p-10 border-b-2 border-[#f5f0e8]">
                  <div className="text-center">
                    <div className="inline-block p-3 bg-gradient-to-br from-[#c2794d]/10 to-[#8b6f47]/5 rounded-2xl mb-4">
                      <span className="text-4xl">🔑</span>
                    </div>
                    <h2 className="text-3xl font-bold text-[#3d3021] mb-2">Welcome Back!</h2>
                    <p className="text-[#6d5a3d]/70">Login to continue your journey</p>
                  </div>
                </div>

                {/* Form Content */}
                <div className="p-8 lg:p-10">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    
                    <div>
                      <label className="block text-sm font-medium text-[#3d3021] mb-2">
                        Email Address
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
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Enter your password"
                        className="w-full px-4 py-3 rounded-xl border-2 border-[#e8dcc8] focus:border-[#c2794d] focus:outline-none transition-colors bg-[#faf8f5]"
                        required
                      />
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input 
                          type="checkbox" 
                          name="rememberMe"
                          checked={formData.rememberMe}
                          onChange={handleInputChange}
                          className="w-4 h-4 rounded border-[#c2794d] text-[#c2794d] focus:ring-[#c2794d]" 
                        />
                        <span className="text-[#6d5a3d]">Remember me</span>
                      </label>
                      <Link href="/forgot-password" className="text-[#c2794d] hover:text-[#8b6f47] font-medium">
                        Forgot password?
                      </Link>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 bg-gradient-to-r from-[#c2794d] to-[#8b6f47] text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
                    >
                      Login to Dashboard
                    </button>

                    {/* Divider */}
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t-2 border-[#f5f0e8]"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-white text-[#6d5a3d]/70">or continue with</span>
                      </div>
                    </div>

                    {/* Social Login */}
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        type="button"
                        className="flex items-center justify-center space-x-2 px-4 py-3 border-2 border-[#e8dcc8] rounded-xl hover:border-[#c2794d]/50 transition-all bg-[#faf8f5]"
                      >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                        <span className="text-sm font-medium text-[#6d5a3d]">Google</span>
                      </button>
                      
                      <button
                        type="button"
                        className="flex items-center justify-center space-x-2 px-4 py-3 border-2 border-[#e8dcc8] rounded-xl hover:border-[#c2794d]/50 transition-all bg-[#faf8f5]"
                      >
                        <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                        <span className="text-sm font-medium text-[#6d5a3d]">Facebook</span>
                      </button>
                    </div>
                  </form>
                </div>

                {/* Footer */}
                <div className="px-8 lg:px-10 pb-8">
                  <div className="text-center text-sm">
                    <p className="text-[#6d5a3d]">
                      Don't have an account?{' '}
                      <Link
                        href="/signup/signup"
                        className="text-[#c2794d] hover:text-[#8b6f47] font-semibold"
                      >
                        Sign up now
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
  )
}