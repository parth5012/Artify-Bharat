import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navigation = [
    { name: 'Marketplace', href: '/buyer/marketplace', icon: '🛍️' },
    { name: 'Categories', href: '#categories', icon: '🎨' },
    { name: 'Digital Passport', href: '/product/demo', icon: '📜' },
    { name: 'How It Works', href: '#how', icon: '⚡' },
  ]

  return (
    <>
      {/* Top Decorative Border */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#8b6f47] via-[#c2794d] to-[#8b6f47] z-50"></div>

      <header
        className={`fixed top-1 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#f8f6f3]/98 backdrop-blur-md shadow-warm border-b-2 border-earth-300/40'
            : 'bg-[#f8f6f3]/95 backdrop-blur-sm'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-11 h-11 bg-gradient-to-br from-[#c2794d] to-[#8b6f47] rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                  <span className="text-white font-bold text-xl font-hindi">अ</span>
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-[#3d3021] font-display">Artify Bharat</h1>
                <p className="text-xs text-[#8b6f47] font-hindi hidden sm:block">कारीगरों का बाज़ार</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="px-4 py-2 text-sm font-medium text-[#6d5a3d] hover:text-[#c2794d] rounded-lg hover:bg-earth-200/60 transition-all duration-200 flex items-center space-x-2 group relative"
                >
                  <span className="text-base group-hover:scale-110 transition-transform">{item.icon}</span>
                  <span>{item.name}</span>
                  <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-[#c2794d] scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                </Link>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center space-x-3">
              <Link
                href="/artisan/onboard"
                className="px-5 py-2.5 text-sm font-medium text-[#c2794d] hover:text-[#8b6f47] rounded-lg hover:bg-earth-200/60 transition-all duration-200 border border-earth-300/50 bg-white/80"
              >
                login
              </Link>
              <Link
                href="/signup/signup"
                className="px-6 py-2.5 bg-gradient-to-r from-[#c2794d] to-[#8b6f47] text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
              >
                <span></span>
                <span>Signup</span>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-earth-200/60 transition-colors border border-earth-300/50"
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <span className={`w-full h-0.5 bg-earth-800 rounded transition-all ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                <span className={`w-full h-0.5 bg-earth-800 rounded transition-all ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`w-full h-0.5 bg-earth-800 rounded transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
              </div>
            </button>
          </div>

          {/* Mobile Menu */}
          <div
            className={`lg:hidden overflow-hidden transition-all duration-300 ${
              isMenuOpen ? 'max-h-96 pb-6' : 'max-h-0'
            }`}
          >
            <div className="pt-4 space-y-2 bg-white/60 rounded-2xl p-4 mt-2 border border-earth-300/50">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-3 px-4 py-3 text-[#6d5a3d] hover:text-[#c2794d] hover:bg-earth-200/60 rounded-lg transition-all duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="font-medium">{item.name}</span>
                </Link>
              ))}
              <div className="pt-3 space-y-2 border-t border-earth-300/40">
                <Link
                  href="/artisan/onboard"
                  className="flex items-center justify-center space-x-2 px-6 py-3 text-[#c2794d] font-medium rounded-lg border border-earth-300/50 bg-white/80 hover:bg-earth-200/60 transition-all"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span>🎯</span>
                  <span>Join as Artisan</span>
                </Link>
                <Link
                  href="/admin/review-queue"
                  className="flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-[#c2794d] to-[#8b6f47] text-white font-semibold rounded-lg shadow-warm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span>👑</span>
                  <span>Admin Panel</span>
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Decorative bottom border */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#c2794d]/40 to-transparent"></div>
      </header>
    </>
  )
}