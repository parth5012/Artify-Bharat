import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import ArtifyLogo from './ArtifyLogo'
import Footer from './Footer'

export default function AppLayout({ children, currentPage }) {
  const [showMobileSearch, setShowMobileSearch] = useState(false)

  return (
    <div className="min-h-screen bg-[#f8f6f3]">
      {/* Top Decorative Border */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#8b6f47] via-[#c2794d] to-[#8b6f47] z-50"></div>

      {/* Mobile Search Overlay */}
      {showMobileSearch && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 md:hidden">
          <div className="flex items-center justify-center min-h-screen p-4">
            <div className="w-full max-w-md">
              <div className="relative bg-white/90 backdrop-blur-xl border-2 border-white/40 rounded-2xl shadow-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-artistic font-bold text-[#3d3021]">Search Crafts</h3>
                  <button
                    onClick={() => setShowMobileSearch(false)}
                    className="w-8 h-8 bg-red-500/20 hover:bg-red-500/30 text-red-600 rounded-full flex items-center justify-center transition-colors"
                  >
                    ×
                  </button>
                </div>

                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search for handmade treasures..."
                    className="w-full px-4 py-3 pl-12 bg-white/80 border-2 border-white/40 rounded-xl focus:outline-none focus:border-[#d4af37]/60 text-[#3d3021] placeholder-[#8b6f47]/60 font-handwritten"
                  />
                  <div className="absolute left-3 top-1/2 -translate-y-1/2">
                    <div className="w-6 h-6 bg-gradient-to-br from-[#d4af37] to-[#c2794d] rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">🔍</span>
                    </div>
                  </div>
                </div>

                <button className="w-full mt-4 py-3 bg-gradient-to-r from-[#d4af37] to-[#c2794d] text-white rounded-xl hover:shadow-lg transition-all duration-300 font-modern font-semibold">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* App Header */}
      <header className="fixed top-1 left-0 right-0 z-40 bg-[#f8f6f3]/98 backdrop-blur-md border-b-2 border-[#d4c5b0]/40 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group cursor-pointer">
              <ArtifyLogo size="lg" showText={true} useImage={true} className="group-hover:scale-105 transition-transform duration-300" />
            </Link>

            {/* Enhanced Aesthetic Search Bar */}
            <div className="flex-1 max-w-2xl mx-8 hidden md:block">
              <div className="relative group">
                {/* Glow effect background */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#d4af37]/20 via-[#c2794d]/20 to-[#8b6f47]/20 rounded-2xl blur-lg opacity-0 group-focus-within:opacity-100 transition-opacity duration-500"></div>

                {/* Main search container */}
                <div className="relative bg-white/80 backdrop-blur-xl border-2 border-white/40 rounded-2xl shadow-soft hover:shadow-warm transition-all duration-300 group-focus-within:border-[#d4af37]/60">
                  <input
                    type="text"
                    placeholder="Discover authentic handmade treasures..."
                    className="w-full px-6 py-4 pl-14 pr-20 bg-transparent rounded-2xl focus:outline-none text-[#3d3021] placeholder-[#8b6f47]/60 font-handwritten text-lg"
                  />

                  {/* Search icon with glow */}
                  <div className="absolute left-4 top-1/2 -translate-y-1/2">
                    <div className="w-8 h-8 bg-gradient-to-br from-[#d4af37] to-[#c2794d] rounded-full flex items-center justify-center shadow-lg group-focus-within:scale-110 transition-transform duration-300">
                      <span className="text-white text-sm">🔍</span>
                    </div>
                  </div>

                  {/* Decorative search button */}
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-gradient-to-r from-[#d4af37] to-[#c2794d] text-white rounded-xl hover:shadow-lg transition-all duration-300 font-modern text-sm font-semibold">
                    Search
                  </button>

                  {/* Floating craft elements */}
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-[#d4af37] to-[#c2794d] rounded-full opacity-60 animate-pulse"></div>
                  <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-gradient-to-br from-[#8b6f47] to-[#a0522d] rounded-full opacity-40 animate-pulse" style={{ animationDelay: '1s' }}></div>
                </div>
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* Mobile Search Toggle */}
              <button
                onClick={() => setShowMobileSearch(true)}
                className="md:hidden p-3 bg-white/80 backdrop-blur-xl border-2 border-white/40 rounded-2xl hover:border-[#d4af37]/60 transition-all duration-300 shadow-soft hover:shadow-warm"
              >
                <div className="w-6 h-6 bg-gradient-to-br from-[#d4af37] to-[#c2794d] rounded-lg flex items-center justify-center shadow-lg">
                  <span className="text-white text-sm">🔍</span>
                </div>
              </button>

              {/* Enhanced Cart Icon */}
              <div className="relative group">
                <button className="relative p-3 bg-white/80 backdrop-blur-xl border-2 border-white/40 rounded-2xl hover:border-[#d4af37]/60 transition-all duration-300 shadow-soft hover:shadow-warm group-hover:scale-105">
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#d4af37]/10 to-[#c2794d]/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <div className="relative w-6 h-6 bg-gradient-to-br from-[#d4af37] to-[#c2794d] rounded-lg flex items-center justify-center shadow-lg">
                    <span className="text-white text-sm">🛒</span>
                  </div>

                  {/* Cart count badge */}
                  <div className="absolute -top-2 -right-2 w-5 h-5 bg-gradient-to-br from-red-400 to-red-500 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                    <span className="text-white text-xs font-bold">3</span>
                  </div>
                </button>
              </div>

              {/* Enhanced Aesthetic Profile Dropdown */}
              <div className="relative group">
                {/* Profile button with enhanced aesthetics */}
                <button className="relative flex items-center space-x-3 px-5 py-3 bg-white/80 backdrop-blur-xl border-2 border-white/40 rounded-2xl hover:border-[#d4af37]/60 transition-all duration-300 shadow-soft hover:shadow-warm group-hover:scale-105">
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#d4af37]/10 to-[#c2794d]/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Enhanced profile avatar */}
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#d4af37] via-[#c2794d] to-[#8b6f47] rounded-full flex items-center justify-center shadow-lg group-hover:shadow-warm transition-shadow duration-300">
                      <span className="text-white text-lg">👤</span>
                    </div>
                    {/* Status indicator */}
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-full border-2 border-white shadow-sm animate-pulse"></div>
                  </div>

                  <div className="hidden md:block">
                    <div className="text-left">
                      <p className="text-sm font-artistic font-semibold text-[#3d3021]">Profile</p>
                      <p className="text-xs font-handwritten text-[#8b6f47]/80">Artisan</p>
                    </div>
                  </div>

                  {/* Enhanced dropdown arrow */}
                  <div className="w-6 h-6 bg-gradient-to-br from-[#d4af37]/20 to-[#c2794d]/20 rounded-full flex items-center justify-center group-hover:rotate-180 transition-transform duration-300">
                    <span className="text-[#8b6f47] text-xs">▼</span>
                  </div>
                </button>

                {/* Enhanced Aesthetic Dropdown Menu */}
                <div className="absolute right-0 mt-3 w-64 bg-white/90 backdrop-blur-xl border-2 border-white/40 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  {/* Decorative header */}
                  <div className="p-4 border-b border-[#d4c5b0]/30">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#d4af37] via-[#c2794d] to-[#8b6f47] rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-white text-xl">👤</span>
                      </div>
                      <div>
                        <p className="font-artistic font-bold text-[#3d3021]">Welcome Back!</p>
                        <p className="text-xs font-handwritten text-[#8b6f47]">Artisan Dashboard</p>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced menu items */}
                  <div className="p-2">
                    <Link href="/buyer/profile" className="flex items-center gap-3 px-4 py-3 text-sm text-[#3d3021] hover:bg-gradient-to-r hover:from-[#d4af37]/10 hover:to-[#c2794d]/10 rounded-xl transition-all duration-200 font-modern group/item">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-400/20 to-blue-500/20 rounded-lg flex items-center justify-center group-hover/item:scale-110 transition-transform">
                        <span>👤</span>
                      </div>
                      <span>My Profile</span>
                    </Link>

                    <Link href="/buyer/orders" className="flex items-center gap-3 px-4 py-3 text-sm text-[#3d3021] hover:bg-gradient-to-r hover:from-[#d4af37]/10 hover:to-[#c2794d]/10 rounded-xl transition-all duration-200 font-modern group/item">
                      <div className="w-8 h-8 bg-gradient-to-br from-green-400/20 to-green-500/20 rounded-lg flex items-center justify-center group-hover/item:scale-110 transition-transform">
                        <span>📦</span>
                      </div>
                      <span>My Orders</span>
                    </Link>

                    <Link href="/buyer/wishlist" className="flex items-center gap-3 px-4 py-3 text-sm text-[#3d3021] hover:bg-gradient-to-r hover:from-[#d4af37]/10 hover:to-[#c2794d]/10 rounded-xl transition-all duration-200 font-modern group/item">
                      <div className="w-8 h-8 bg-gradient-to-br from-pink-400/20 to-pink-500/20 rounded-lg flex items-center justify-center group-hover/item:scale-110 transition-transform">
                        <span>❤️</span>
                      </div>
                      <span>Wishlist</span>
                    </Link>

                    <div className="my-2 h-px bg-gradient-to-r from-transparent via-[#d4c5b0]/40 to-transparent"></div>

                    <Link href="/artisan/dashboard" className="flex items-center gap-3 px-4 py-3 text-sm text-[#3d3021] hover:bg-gradient-to-r hover:from-[#d4af37]/10 hover:to-[#c2794d]/10 rounded-xl transition-all duration-200 font-modern group/item">
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-400/20 to-purple-500/20 rounded-lg flex items-center justify-center group-hover/item:scale-110 transition-transform">
                        <span>🎨</span>
                      </div>
                      <span>Artisan Dashboard</span>
                    </Link>

                    <div className="my-2 h-px bg-gradient-to-r from-transparent via-[#d4c5b0]/40 to-transparent"></div>

                    <button
                      onClick={() => {
                        localStorage.clear()
                        window.location.href = '/login/login'
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100 rounded-xl transition-all duration-200 font-modern group/item"
                    >
                      <div className="w-8 h-8 bg-gradient-to-br from-red-400/20 to-red-500/20 rounded-lg flex items-center justify-center group-hover/item:scale-110 transition-transform">
                        <span>🚪</span>
                      </div>
                      <span>Logout</span>
                    </button>
                  </div>

                  {/* Decorative elements */}
                  <div className="absolute -top-2 right-6 w-4 h-4 bg-white/90 backdrop-blur-xl border-l-2 border-t-2 border-white/40 rotate-45"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex pt-20">
        {/* Main Content Area - Full Width */}
        <main className="flex-1 w-full">
          {children}
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}